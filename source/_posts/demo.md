---
title: Demo
date: 2024-10-01
categories: 
    - 示例

tags: 

# 摘要
excerpt: "这是一个使用示例"

# 封面
cover: "/images/home.jpg"

# 首页缩略图
thumbnail: false

# 过期时间
expires: false

# 置顶权重
sticky: 99

# 评论
comment: true

---

# H1 标题

## H2 标题

### H3 标题

#### H4标题

##### H5 标题

###### H6 标题

**加粗***斜体*~~删除线~~这是一段文本`行内代码`
- 站外链接：[bilibili](https://www.bilibili.com)
- 站内文章链接：{% post_link 'demo' '自定义文本' %}
- 站内文章链接：{% post_link 'Coding/Other' %}

```
代码块
```

```python
print("代码高亮")
```

{% video http://video-assets.soutushenqi.com/live_wp/1386093061214805a985a3d1cf3ee6b5.mp4 %}

![Screen Shot 2022-10-02 at 9.26.37 PM](https://assets.ohevan.com/img/d4fe8bc5f18fc77cb2064c99c64dc227.png)

# 功能展示

## Font Awesome Pro v6.2.1

**Solid:**
<i class="fa-solid fa-house"></i>
<i class="fa-solid fa-envelope"></i>
<i class="fa-solid fa-camera-retro"></i>
<i class="fa-solid fa-cart-shopping"></i>

**Regular:**
<i class="fa-regular fa-house"></i>
<i class="fa-regular fa-envelope"></i>
<i class="fa-regular fa-camera-retro"></i>
<i class="fa-regular fa-cart-shopping"></i>

## Callout 提示块
{% button center large::提示模块文档::https://redefine-docs.ohevan.com/zh/docs/modules/callout::fa-solid fa-book %}

{% callout default::自定义标题 %}
默认 提示块标签
{% endcallout %}

{% callout default  %}
default 提示块标签
{% endcallout %}

{% callout primary  %}
primary 提示块标签
{% endcallout %}

{% callout success  %}
success 提示块标签
{% endcallout %}

{% callout info  %}
info 提示块标签
{% endcallout %}

{% callout warning  %}
warning 提示块标签
{% endcallout %}

{% callout danger  %}
danger 提示块标签
{% endcallout %}

{% callout red fa-bolt%}
自定义提示块标签
{% endcallout %}

## Folding 折叠模块

{% button center large::Folding 折叠模块文档::https://redefine-docs.ohevan.com/zh/docs/modules/folding::fa-solid fa-book %}

{% folding blue::Folding 测试： 点击查看更多 %}

更多内容

{% callout danger  %}
danger 提示块标签
{% endcallout %}

{% callout tip  %}
tip 提示块标签
{% endcallout %}

{% endfolding %}

## Tabs 分栏模块

{% button center large::Tabs 分栏模块文档::https://redefine-docs.ohevan.com/zh/docs/modules/tabs::fa-solid fa-book %}

{% tabs 1%}
<!-- tab 分栏一 -->
**This is Tab 1.**

<!-- tab 分栏二 -->
**This is Tab 2.**

This is Tab 2.

<!-- tab 分栏三 -->
**This is Tab 3.**

This is Tab 3.

This is Tab 3.

{% endtabs %}

## Button 按钮模块

不设置任何参数的 {% button 按钮:: # %} 适合融入段落中。

regular 按钮适合独立于段落之外：

{% button regular::示例博客::https://www.ohevan.com::fa-solid fa-play-circle %}

{% button regular::示例博客::https://www.ohevan.com::fa-solid fa-play-circle %}

large 按钮更具有强调作用，建议搭配 center 使用：

{% button center large::Button 按钮模块 开始使用::https://redefine-docs.ohevan.com/zh/docs/modules/buttons::fa-solid fa-book %}