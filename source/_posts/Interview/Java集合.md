---
title: Java集合
date: 2025-03-16
categories: 
    - [Interview]

tags: 

# 摘要
excerpt: false
---

## Java集合
### 集合
List
    - Vector（线程安全）
    - ArrayList（非线程安全，数组结构）
    - LinkedList（非线程安全，双向链表结构）

Set
    - HashSet（哈希表结构）
    - TreeSet（红黑树结构）

Map
    - HashMap（非线程安全，哈希表结构）
    - CurrentHashMap（线程安全，哈希表结构）
    - TreeMap（红黑树结构）

### ArrayList
未指定初始化大小时，第一次扩容为默认大小10，之后每次扩容为原来的1.5倍。

### Array和List之间的转换
- Array转为List
    - Arrays.asList(array)
    - 未进行数组的复制。修改list中的元素，会影响数组中的元素。
- List转为Array
    - list.toArray()
    - 进行了数组的浅复制。修改list中的元素，不会影响数组中的元素。

### 红黑树
- 树的节点要么是红色，要么是黑色。
- 根节点是黑色。
- 叶子结点都是黑色的空节点。
- 红色节点的子节点都是黑色节点。（红色节点不能连续）
- 从任一节点到叶子结点的所有路径都包含相同数目的黑色节点。

### HashMap
- 默认初始化大小为16。存储的键值对数量超过扩容阈值时进行扩容，每次扩容为原来的2倍。
- 数组的长度为2的n次幂。插入或扩容时计算下标的效率更高。
- hash值相同的key，则存储在同一个桶中，桶中使用链表或红黑树存储。
- 寻址算法：
    1. 调用对象的hashCode()方法，得到hash值。
    2. 使用hash()进行二次哈希，让哈希值分布更均匀。
    3. 计算`hash&(capacity-1)`，得到数组下标。
- java1.7多线程死循环问题
    - 使用头插法进行扩容
    - 线程1和线程2同时准备扩容


### concurrentHashMap
- jdk1.7中
    - 使用分段的数组+链表实现。
    - 采用Segment分段加锁，底层使用ReentrantLock。
- jdk1.8
    - 与HashMap1.8的结构相同，使用数组、链表或红黑树实现。
    - 采用CAS添加新节点。
    - 采用synchronized锁住链表的首节点或红黑树的根节点。