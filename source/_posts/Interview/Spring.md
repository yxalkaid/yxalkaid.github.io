---
title: Spring
date: 2025-03-16
categories: 
    - [Interview]

tags: 

# 摘要
excerpt: false
---

## Spring
- Spring中的Bean
Bean默认是单例的，不是线程安全的。
    - 一般情况下注入的Bean是无状态对象，没有线程安全问题。
    - 如果在Bean中定义了可修改的成员变量，则需要考虑线程安全问题。

- AOP（面向切面编程）
减少系统中的重复代码，降低模块间的耦合度，提高系统的可维护性。
    - 规则定义：@Pointcut
    - 逻辑执行：@Before、@After、@AfterReturning、@AfterThrowing、@Around

- Spring的事务
通过AOP功能，对方法前后进行拦截，在执行方法前开启事务，在执行方法后提交事务或回滚。
    - 编程式事务控制
    - 声明式事务管理

- Spring事务失效的场景
    - 异常捕获处理
        - 在方法内使用try-catch处理了异常而未将异常交给事务通知处理，导致事务失效。
    - 抛出检查异常
        - Spring默认回滚非检查异常。
        - 可通过rollbackFor属性指定回滚的异常类型。
    - 非public方法
        - Spring为方法创建代理、添加事务通知的前提是该方法是public的
    - 同一个类中的非事务方法调用事务方法

- Spring的Bean的生命周期
    1. 通过BeanDefinition获取Bean的定义信息。
    2. 构造函数
    3. 属性注入
    4. Aware接口的子接口方法
        - BeanNameAware
        - BeanFactoryAware
        - ApplicationContextAware
    5. 初始化方法
        1. BeanPostProcessor接口的预初始化函数
        2. @PostConstruct注解方法
        3. InitializingBean接口方法
        4. init-method
        5. BeanPostProcessor接口的后初始化函数
    6. 可使用
    7. 销毁方法
        1. @PreDestroy注解方法
        2. DisposableBean接口方法
        3. destroy-method

- Spring解决循环依赖
构造函数的循环依赖：使用@Lazy注解
三级缓存
    - 一级缓存：单例池，已经完成初始化的Bean对象
    - 二级缓存：缓存早期的Bean对象（尚未完成初始化）
    - 三级缓存：缓存ObjectFactory（用于创建对象的对象工厂）

- Springboot的自动配置原理
    - Springboot引导类上的@SpringBootApplication注解
        - @SpringBootConfiguration
        - @EnableAutoConfiguration
            - 使用@Import导入配置选择器
            - 读取项目和引用的jar包中的META-INF/spring.factories文件中
            - 根据条件注解所指定的条件决定是否将Bean导入到Spring容器中。
        - @ComponentScan

- Mybatis的缓存
基于perpetualCache的HashMap本地缓存。但当作用域进行增删改后，会清空该作用域的全部缓存。
    - 一级缓存（默认开启）
        - 作用域为Session
        - 当Session进行flush或close时，会清除缓存。
    - 二级缓存
        - 作用域为namespace和mapper
        - 当Session进行flush或close时，一级缓存转到二级缓存中。