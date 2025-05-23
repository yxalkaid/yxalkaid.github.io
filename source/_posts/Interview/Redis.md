---
title: Redis
date: 2025-03-16
categories: 
    - [Interview]

tags: 

# 摘要
excerpt: false
---

## Redis
- 使用场景
    - 缓存
        - 穿透、击穿、雪崩
        - 双写一致性、持久化
        - 数据过期、淘汰策略
    - 分布式锁
        - setnx、redisson
    - 计数器
    - 保存token
    - 消息队列
    - 延迟队列

- Redis基本数据类型
    - String
    - List
    - Hash
    - Set
    - ZSet

- 布隆过滤器
    - 多个独立的哈希函数
    - 数组越大，误判率越小，内存消耗越高。

- 缓存穿透
查询不存在的数据时，数据库查询不到也不直接写入缓存，导致每次请求都查询数据库。
    - 缓存空数据
    - 布隆过滤器
        - 预热缓存时，同时预热布隆过滤器。
        - 访问缓存前，先经过布隆过滤器判断。
        - 实现复杂，存在误判

- 缓存击穿
当某一个缓存数据过期时，需要查询数据库，重建缓存。
在重建缓存期间，大量对该数据请求由于缓存未命中而直接访问数据库。
    - 互斥锁：强一致，性能差
        1. 查询缓存，若命中，则直接返回。
        2. 若未命中，先获取互斥锁，再查询数据库，重建缓存。
        3. 若获取锁失败，则重试第1步和第2步。
    - 逻辑过期：高可用，性能高
        0. 不设置过期时间，在缓存数据中设置逻辑过期时间。
        1. 查询缓存，若数据未过期，则直接返回。
        2. 若数据过期，先获取互斥锁，再开启一个用于查询数据库、重建缓存的新线程，最后直接返回旧缓存数据。
        3. 若获取锁失败，直接返回旧缓存数据。
    - 多级缓存

- 缓存雪崩
同一时段大量的缓存数据同时失效或Redis服务宕机，导致大量请求访问数据库。
    - 给不同key的TTL添加随机值
    - 使用多级缓存
    - 使用Redis集群：哨兵模式、集群模式
    - 添加降级限流策略

- 双写一致性
当修改了数据库的数据后，也要同时更新缓存的数据，保持缓存和数据库的数据一致。
    - 旁路缓存
        - 读操作时，先读缓存，若不存在，再查询数据库，重建缓存。
        - 写操作时，先写数据库，再删除缓存。
    - 延时双删
        - 写操作时，先删除缓存数据，再修改数据库，延时后删除缓存数据
        - 缺点：延时的时长难以控制。
    - 一致性要求高时
        - 使用redisson提供的读写锁
    - 允许延时一致时：采用异步通知
        - 使用MQ中间件，更新数据后，通知删除缓存。
        - 使用canal中间件，读取数据库的binlog，更新缓存。

- Redis持久化
    - RDB（Redis数据备份文件）：定时对内存进行快照
        执行原理：fork出一个子进程，子进程共享父进程的内存数据，读取数据并写入RDB文件。父进程修改时，进行写时复制。
        - 主动备份：save（主进程执行RDB）、bgsave（子进程执行RDB）
        - 被动触发：redis.conf中设置触发机制
    - AOF（追加文件）：记录每一次执行的写命令
        - redis.conf中设置触发机制
        - Always、everysec、no
        - 文件体积大、宕机恢复速度慢、数据完整性高
    - 混合持久化
        - AOF重写时会把Redis的持久化数据，以RDB的格式写入到AOF文件的开头，之后的数据再以AOF的格式化追加到文件的末尾。

- Redis数据删除策略
针对过期的数据
惰性删除和定期删除配合使用
    - 惰性删除
        - 使用时检测缓存是否过期，过期则删除。
    - 定期删除
        - SLOW模式：执行频率固定
        - FAST模式：执行频率不固定

- Redis数据淘汰策略
当内存不足时，执行数据淘汰策略。
    - noeviction（默认）：不淘汰数据，不允许写入新数据。
    - volatile-ttl：淘汰设置了TTL的键中的TTL值最小的数据。
    - allkeys-lru、allkeys-lfu、allkeys-random
    - volatile-lru、volatile-lfu、volatile-random

- 分布式锁
    - setnx命令`set lock 1 nx ex 10`
        - 设置过期时间，防止加锁期间系统宕机造成锁不释放。
        - 释放时，使用lua脚本删除锁，防止误删除。
        - 可能存在的问题：业务未完成而锁过期。
        - 可能存在的问题：锁过期后误将被其他线程所获得的锁释放。
    - redisson分布式锁
        - 可重入
        - 提供看门狗机制
        - 不能解决主从一致性问题。
            - 可以使用redisson提供的红锁解决，但性能低。
            - 使用zookeeper实现的分布式锁。

- Redis集群方案——主从同步
解决高并发读问题
主节点有唯一的replid，从节点继承主节点的replid。
主节点负责写数据，从节点负责读数据。
    - 全量与增量
        1. 从节点建立连接，发送replid和offset，请求数据同步。
        2. 主节点判断是否为第一次同步（replid是否一致）。
        3. 若是第一次同步，进行全量同步，否则进行增量同步。
    - 全量同步
        1. 主节点发送数据版本信息，从节点接受信息并保存。
        2. 主节点执行bgsave，生成RDB文件，并发送给从节点。
        3. 从节点清空数据，并加载RDB文件。
        4. 主节点将生成RDB期间的所有命令记录到repl_baklog中。
        5. 主节点将repl_baklog中的命令发送给从节点。
        6. 从节点执行repl_baklog中的命令。
    - 增量同步
        1. 主节点从repl_baklog获取offset后的数据，并发送给从节点。
        2. 从节点执行命令。

- Redis集群方案——哨兵模式
解决高可用问题
<!-- TODO -->
    - 监控
    - 自动故障恢复
    - 通知

- Redis集群方案——分片集群
解决海量数据存储和高并发写的问题
    - 使用多个主节点，保存不同的数据
    - 每个主节点有多个从节点
    - 主节点间使用心跳机制监测彼此健康
数据的读写
    - 16*1024个哈希槽
    - 每个主节点绑定一定范围的哈希槽
    - 读写数据时，将key的有效部分计算哈希值并取余，决定目标槽，进而确定目标节点。

- Redis是单线程的，但为什么还那么快？
<!-- TODO -->
    - 纯内存操作，执行速度快，性能瓶颈是网络延迟。
    - 单线程的优势：避免不必要的上下文切换和资源争用。
    - 使用IO多路复用模型，非阻塞IO。
        - 实现了高效的网络请求。
    - 高效的数据结构

- Redis的底层数据结构
<!-- TODO -->