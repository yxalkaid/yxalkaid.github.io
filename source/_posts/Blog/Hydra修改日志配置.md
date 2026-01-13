---
title: Hydra修改日志配置
date: 2026-01-14
categories:
  - [ Blog ]

tags:

# 摘要
excerpt: false
---

## 问题描述

在使用[ Hydra 框架](https://hydra.cc/)开发过程中，为了自定义日志的时间格式和日志文件编码规则， 通过logging.basicConfig方法进行配置，但实际运行后发现这些配置均未生效。

```python
import logging
import hydra
from omegaconf import DictConfig

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s][%(name)s][%(levelname)s] - %(message)s',
    datefmt="%H:%M:%S",
    encoding="utf-8"
)
log = logging.getLogger()
log.info("Test")

@hydra.main(version_base=None, config_path="configs", config_name="config")
def main(cfg: DictConfig):
    log.info(f"{cfg.task.name}")
    log.info(f"{cfg.task.name}")

if __name__ == "__main__":
    main()
```

运行结果如下：

```plaintext
[06:52:53][root][INFO] - Test
[2026-01-14 06:52:53,475][root][INFO] - Test
[2026-01-14 06:52:53,475][root][INFO] - Test
```

## 问题解析

Hydra默认的日志配置定义在`hydra/conf/hydra/job_logging/default.yaml`中，内容如下：

```yaml
# python logging configuration for tasks
version: 1
formatters:
  simple:
    format: '[%(asctime)s][%(name)s][%(levelname)s] - %(message)s'
handlers:
  console:
    class: logging.StreamHandler
    formatter: simple
    stream: ext://sys.stdout
  file:
    class: logging.FileHandler
    formatter: simple
    # absolute file path
    filename: ${hydra.runtime.output_dir}/${hydra.job.name}.log
root:
  level: INFO
  handlers: [ console, file ]

disable_existing_loggers: false
```

Hydra内部会通过`hydra/core/utils.py`文件中的`configure_log`函数，调用`logging.config.dictConfig(conf)`重新配置root logger。
根据Python logging模块的特性，`dictConfig`会清空root logger原有的所有Handler并重建配置，因此提前通过`basicConfig`
设置的日志规则会被完全覆盖。

## 解决方案

### 方案1：自定义yaml文件完全覆盖默认配置

根据[Hydra官方文档](https://hydra.cc/docs/configure_hydra/logging/)说明，可通过自定义yaml配置文件完全替换默认的日志规则，操作步骤如下：

1. 在项目目录下新建`hydra/job_logging/custom.yaml`文件，参考默认配置编写自定义日志规则（如调整日志格式、修改输出级别等）；
2. 在项目主配置文件中，通过`defaults`字段指定使用该自定义日志配置：

```yaml
defaults:
  - override hydra/job_logging: custom
```

### 方案2：主配置文件选择性覆盖配置项

若仅需修改默认配置中的个别参数（如日期格式、文件编码），可直接在主配置文件中针对性覆盖，示例配置如下：

```yaml
hydra:
  job_logging:
    formatters:
      simple:
        datefmt: '%H:%M:%S' # 仅覆盖日期显示格式
    handlers:
      file:
        encoding: utf-8 # 仅为文件Handler添加编码配置
```

### 方案3：运行时动态修改Handler

可在`@hydra.main`装饰的函数内部，直接操作root logger的Handler对象，实现日志配置的动态调整。示例代码如下：

```python
import logging
import hydra
from omegaconf import DictConfig

log = logging.getLogger()

@hydra.main(version_base=None, config_path="configs", config_name="config")
def main(cfg: DictConfig):
    log.info(f"{cfg.task.name}")
    root_logger = logging.getLogger()
    for handler in root_logger.handlers:
        current_fmt = handler.formatter._fmt
        # 修改日期显示格式
        formatter = logging.Formatter(current_fmt, datefmt="%H:%M:%S")
        handler.setFormatter(formatter)
    log.info(f"{cfg.task.name}")

if __name__ == "__main__":
    main()
```