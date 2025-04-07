---
title: Other
date: 2025-03-12
categories: 
    - [Coding]

tags: 

# 摘要
excerpt: false

mathjax: true
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

### 费马小定理
- 如果p是一个质数，而整数a不是p的倍数，则有$a^{p-1} \equiv 1 \pmod{p} $
- 模的逆元：$a \times b \equiv 1 \pmod{p} $
- 除法取模：$c \div a \equiv c \times b \pmod{p} $
- 在满足费马小定理时，可通过快速模幂求逆元：$a \times a^{p-2} \equiv 1 \pmod{p}$


### 裴蜀定理
- 对于不全为零的任意整数a和b，一定存在整数x和y，使得$a x + b y = \gcd(a, b) $
- 推论：a和b互质的充分必要条件是存在整数x和y，使的$a x + b y = 1 $

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