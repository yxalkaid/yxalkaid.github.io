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
- 在满足费马小定理时，可通过快速模幂求逆元：$a \times a^{p-2} \equiv 1 \pmod{p}$


### 裴蜀定理
- 对于不全为零的任意整数a和b，一定存在整数x和y，使得$a x + b y = \gcd(a, b) $
- 推论：a和b互质的充分必要条件是存在整数x和y，使的$a x + b y = 1 $

### 欧几里得算法
- gcd(a, b)：计算a和b的最大公约数。
    ```Python
    def gcd(a, b):
        while b != 0:
            a, b = b, a % b
        return a
    ```

- exgcd(a, b)：计算a和b的最大公约数以及一个可行解。
    ```Python
    def exgcd(a, b):
        if b == 0:
            return (a, 1, 0)
        else:
            d, x, y = exgcd(b, a % b)
            return (d, y, x - (a // b) * y)

    def solve(a, b, c):
        d, x, y = exgcd(a, b)
        if c % d == 0:
            x = x * (c // d)
            y = y * (c // d)
            return (d, x, y)
        else:
            return None
    
    def mod_inverse(a, m):
        d, x, y = exgcd(a, m)
        if d == 1:
            xs = m // d
            x = (x % xs + xs) % xs
            return x
        else:
            return None
    ```

### 质因数分解
```Python
def prime_factors(n):
    import math

    i = 2
    res = dict()
    for i in range(2, 1 + int(math.sqrt(n))):
        while n % i == 0:
            if i not in res:
                res[i] = 1
            else:
                res[i] += 1
            n = n // i
        if n == 1:
            break
    if n > 1:
        res[n] = 1
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