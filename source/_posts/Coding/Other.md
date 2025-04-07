---
title: Other
date: 2025-03-12
categories: 
    - [Coding]

tags: 

# 摘要
excerpt: false
---

### 快速模幂
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

### Floyd判圈算法
- 判断是否有环：在起点设置快慢指针，慢指针每前进一步，快指针前进两步。若二者相遇，则说明有环。
- 环的长度：相遇后，固定慢指针，快指针每次前进一步，统计再次相遇经过的步数。
- 环的起点：相遇后，固定慢指针，将快指针移到起点，二者每次前进一步，直到再次相遇。

### 滑动窗口
- 扩展右边界：逐步移动右指针，扩大窗口，直到满足特定条件。
- 收缩左边界：当窗口不满足条件时，移动左指针缩小窗口，直至再次满足条件。

### 子集遍历
```Python
s = mask # 掩码
while s > 0:
    s = mask & (s - 1)

```

### 裴蜀定理

### 扩展欧几里得算法
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