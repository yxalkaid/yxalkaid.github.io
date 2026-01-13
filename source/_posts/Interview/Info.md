---
title: Interview-Info
date: 2025-03-16
categories: 
    - [Interview]

tags: 

# 摘要
excerpt: false
---


## MySQL
{% post_link 'Interview/MySQL' %}

## Java集合
{% post_link 'Interview/Java集合' %}

## 多线程
{% post_link 'Interview/多线程' %}

## Redis
{% post_link 'Interview/Redis' %}

## Spring
{% post_link 'Interview/Spring' %}

## JVM
{% post_link 'Interview/JVM' %}

## 缓存
{% post_link 'Interview/缓存' %}

## 消息队列
- RabbitMQ——如何保证消息不丢失？
    - 生产者确认
    - 持久化（MQ默认是内存存储消息）
        - 交换机持久化
        - 队列持久化
        - 消息持久化
    - 消费者确认
    - 消费者失败重试机制，多次重试失败后将消息投递到异常交换机

- RabbitMQ——如何解决消息的重复消费问题？
    - 每条消息设置一个唯一的消息ID
    - 重启后，消费消息前，在数据库中查询数据是否存在

- RabbitMQ——延迟队列
    - 死信
        - 消费者使用reject或nack声明消费失败，并且参数的requeue参数为false
        - 消息过期
        - 要投递的队列已满，最早的消息可能成为死信
    - 死信交换机
        - 死信被转移到死信交换机
    - 延迟队列
        - 队列或消息设置TTL
        - 消息过期后投递到死信交换机

- RabbitMQ——消息堆积怎么处理？
    - 增加消费者
    - 使用线程池
    - 扩大队列容积
        - 惰性队列：消息存储在磁盘

- RabbitMQ——高可用机制
<!-- TODO -->
    - 普通集群
    - 镜像集群：本质是主从模式
        - 交换机、队列、队列中的消息会在各个MQ的镜像节点之间同步备份。
    - 仲裁队列

## 计算机网络
- HTTP
    - HTTP/1.1
    - HTTP/2
        - 头部压缩
        - 全面采用二进制格式
        - 并发传输
        - 服务器主动推送
- HTTPS
    - 在TCP和HTTP网络层之间加入了SSL/TLS安全协议，使得报文能够加密传输。
    - TLS四次握手

- TCP拥塞控制
    - 慢启动
    - 拥塞避免
    - 快速恢复

## 设计模式
- 简单工厂模式、工厂模式、抽象工厂模式
- 策略模式
- 责任链模式

## 技术场景
- 单点登录（SSO）
    - JWT
    - OAuth2
- 权限认证
    - RBAS（基于角色的访问控制）
        - 用户表、角色表、权限表、用户角色中间表、角色权限中间表
    - 权限框架
        - spring security
- 数据安全性
    - 非对称密钥
        - 安全性更高
        - 加解密速度慢
    - 对称密钥
        - 加密速度快，效率高
        - 相对不太安全

- Linux查看日志
    - 实时监控日志的变化
        - tail -n 100 -f xx.log
    - 按照行号查询
        - head -n 100 xx.log
        - tail -n 100 xx.log
        - cat -n xx.log | tail -n +100 | head -n 100
    - 按照关键字查找
        - cat -n xx.log | grep -C 10 'debug'
    - 按照日期查询
        - sed -n '/2019-09-01/,/2019-09-02/p' xx.log

- 生产问题怎么排查？
    - 分析日志
    - 远程debug（一般不允许）

- 怎么快速定位系统的瓶颈？
    - 压力测试
    - 监控工具
    - 线上诊断工具Arthas

- 可能遇到的问题？
    - 设计模式
    - 线上BUG
    - 调优
    - 组件封装

## C++
- new和malloc的区别
    - new
        - 类型安全，支持类型推导
        - 调用构造函数（针对对象类型），支持重载
        - 使用delete释放，调用析构函数（针对对象类型）
    - malloc
        - 需要手动类型转换
        - 仅分配内存，不进行初始化
        - 使用free释放，不会调用析构函数

- 智能指针
    - std::unique_ptr（独占）
    - std::shared_ptr（共享）
    - std::weak_ptr（弱引用）