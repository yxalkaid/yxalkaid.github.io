---
title: info
date: 2025-03-12
categories: 
    - [Coding]

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
- 快速模幂
    ```Python
    def power(a, n, m):
        res = 1
        a = a % m
        while n > 0:
            if (n & 1) == 1:
                res = (res * a) % m
            a = (a * a) % m
            n //=2
        return res
    ```
- Floyd判圈算法
    - 判断是否有环：在起点设置快慢指针，慢指针每前进一步，快指针前进两步。若二者相遇，则说明有环。
    - 环的长度：相遇后，固定慢指针，快指针每次前进一步，统计再次相遇经过的步数。
    - 环的起点：相遇后，固定慢指针，将快指针移到起点，二者每次前进一步，直到再次相遇。
- 滑动窗口
    - 扩展右边界：逐步移动右指针，扩大窗口，直到满足特定条件。
    - 收缩左边界：当窗口不满足条件时，移动左指针缩小窗口，直至再次满足条件。
- 裴蜀定理
- 扩展欧几里得算法
    - gcd(a, b)：计算a和b的最大公约数。
        ```C++
        int gcd(int a, int b)
        {
            while(b!=0)
            {
                int temp=a % b;
                a=b;
                b=temp;
            }
            return a;
        }
        ```
    - exgcd(a, b, x, y)：
        ```C++
        int exgcd(int a, int b, int &x, int &y)
        {
            if (b == 0)
            {
                x = 1;
                y = 0;
                return a;
            }
            int d=exgcd(b, a % b, x, y);
            int temp=x-(a/b)*y;
            x=y;
            y=temp;
            return d;
        }
        ```

## 排序
- 选择排序
- 冒泡排序
- 插入排序
- 归并排序
    - 自顶向下
    - 自底向上
- 快速排序
    - 拓展：快速选择算法
    - [数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array?envType=problem-list-v2&envId=wCzTUYLE)
- 堆排序
- 桶排序
    - 基本思想：将待排序元素分配到有限数量的“桶”中，每个桶内的元素再单独排序，最后将各个桶中的元素按顺序合并。
- 基数排序
    - 基本思想：按照元素的每一位（从最低位到最高位）进行排序，每次排序基于当前位的值，最终得到有序序列。



## 数据结构
### 栈
- 单调栈
    - 基本思想：元素入栈前，首先需要弹出栈顶元素，直到栈顶元素不小于（不大于）当前元素，然后再将当前元素入栈。
    - 例：寻找数组元素左边最近的大于当前元素的数

### 前缀数组
- 前缀和

### 队列
- 单调队列
    - 使用双端队列，高效维护滑动窗口中的极值
    - 基本思想：
        1. 维持滑动窗口。如果队首元素不在窗口内，则将其弹出。重复操作直到队首元素在窗口内。
        2. 维持单调性。类似于单调栈，元素入队前，首先需要弹出队尾元素，直到队尾元素不小于（不大于）当前元素，然后再将当前元素入队。

### 链表
- [相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists?envType=problem-list-v2&envId=wCzTUYLE)

### 堆
- 大根堆、小根堆
- 优先队列
    - 查询：直接返回堆顶元素。
    - 插入：插入到末尾，然后向上调整。
    - 删除：堆顶元素与末尾元素交换，然后向下调整。
    - 修改：修改目标元素值，然后向上调整。

### ST表
- 高效查询静态区间的最值
- 预处理：`st[i][j]`表示从位置i开始，长度为2的j次方的区间内的最值。
    - 递推式`st[i][j] = max(st[i][j-1], st[i + 2**(j-1)][j-1])`
- 查询：
    - 查询区间[L,R]的最值，首先计算`k=floor(log2(R-L+1))`
    - 再获取结果为`max(st[L][k],st[R-2**j+1][k])`

### 树状数组
- 快速查询某个区间的和
    - 单点修改、区间查询
- lowbit(x)：`x & (-x)`，非负二进制整数x的最低位的1及其后面的0所构成的数。
- add和query：
    ```Python
    def add(i,k):
        if i <= 0: return
        n=len(nums)
        while i <= n:
            nums[i] += k
            i += lowbit(i)
    def query(i):
        res=0
        while i > 0:
            res += nums[i]
            i -= lowbit(i)
        return res
    ```
- 离散化树状数组
    - [计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self?envType=problem-list-v2&envId=wCzTUYLE)

### 线段树


### Trie树
Trie树（前缀树）用于高效地存储和检索字符串数据集中的键。
实现方式：数组、映射

### 并查集
- 查找
    ```Python
    def find(x):
        # 查找
        px=x
        while px != parent[x]:
            px = parent[x]
        
        # 路径压缩
        while x != px:
            temp=parent[x]
            parent[x]=px
            x=temp
    ```
- 合并
    ```Python
    def union(x,y):
        px=find(x)
        py=find(y)
        if px != py:
            if rank[px] > rank[py]:
                parent[py]=px
            elif rank[px] < rank[py]:
                parent[px]=py
            else:
                parent[py]=px
                rank[px]+=1
    ```

### 平衡树

### 树链剖分

### 二维/动态开点线段树

{% folding grey::拓展 %}

- 可持久化数据结构
- 树套树
- 动态树

{% endfolding %}

---
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
