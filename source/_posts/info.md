---
title: info
date: 2025-03-12
categories: 

tags: 

# 摘要
excerpt: false
---

## 基本
- 枚举
- 贪心
- 模拟
- 二分
- 高精度

## Other
- 单调栈
- 前缀数组
- 二次快速幂
- Floyd判圈算法
    - 判断是否有环：在起点设置快慢指针，慢指针每前进一步，快指针前进两步。若二者相遇，则说明有环。
    - 环的长度：相遇后，固定慢指针，快指针每次前进一步，统计再次相遇经过的步数。
    - 环的起点：固定慢指针，将快指针移到起点，二者每次前进一步，直到再次相遇。

## 排序
- 冒泡排序
- 选择排序
- 插入排序
- 归并排序
    - 自顶向下
    - 自底向上
- 快速排序
    - 拓展：快速选择算法
    - [数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array?envType=problem-list-v2&envId=wCzTUYLE)
- 堆排序
    - 拓展：优先队列
- 桶排序
    - 基本思想：将待排序元素分配到有限数量的“桶”中，每个桶内的元素再单独排序，最后将各个桶中的元素按顺序合并。
- 基数排序
    - 基本思想：按照元素的每一位（从最低位到最高位）进行排序，每次排序基于当前位的值，最终得到有序序列。



## 数据结构
- 栈
- 队列
- 链表
    - [相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists?envType=problem-list-v2&envId=wCzTUYLE)
- 堆
- ST表
- 树状数组
    - lowbit(x)：`x & (-x)`，非负二进制整数x的最低位的1及其后面的0所构成的数。
    - 单点修改、区间查询
    - 拓展：离散化树状数组
    - [计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self?envType=problem-list-v2&envId=wCzTUYLE)
- 线段树
- Trie树
- 并查集
- 平衡树
- 树链剖分
- 二维/动态开点线段树

{% folding grey::拓展 %}

- 可持久化数据结构
- 树套树
- 动态树

{% endfolding %}


## 搜索
- 深度优先搜索DFS
- 广度优先搜索BFS
    - 双向BFS 
- 剪枝
- 记忆化搜索
- 迭代加深搜索
- 启发式搜索

## 动态规划
- 一维DP
    - 自底向上
    - 自顶向下
- 背包DP
- 树形DP
- 状态压缩DP
- 数位DP
- DP的常见优化

## 字符串
- 哈希
- KMP
    - 拓展KMP
- manacher
- AC自动机

{% folding grey::拓展 %}

- 后缀数组
- 后缀自动机
- 回文自动机

{% endfolding %}



## 图论
- 欧拉回路
- 最小生成树
- 单源最短路径及差分约束系统
- 拓扑序列
- 二分图匹配
- 图的连通性问题（割点、桥、强连通分量）
- DFS序
- 最近共同祖先

{% folding grey::拓展 %}

- 网络流
- 一般图匹配

{% endfolding %}



## 数学
- 排列组合
- 二项式定理
- 容斥原理
- 模意义下的逆元
- 矩阵运算
- 高斯消元

{% folding grey::拓展 %}

- 生成函数
- 莫比乌斯反演
- 快速傅里叶变换

{% endfolding %}



## 计算几何
- 基础计算和基本位置关系判定
- 概率论
- 博弈论
