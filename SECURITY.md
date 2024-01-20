# 心电账户安全策略

## 账户安全

本仓库不允许设置为`public`，本后端本身不允许开源，某一些模块如果想开源，需要经过企业微信众人审批后开源。

本仓库属于`Naily`所有，不允许转让给其他人。

## 代码安全

本仓库除了`application.yml`和`application-*.yml`文件外，其他的文件不允许包含任何敏感信息，包括但不限于：

- 任何数据库连接信息
- 任何第三方服务的连接信息
- 任何第三方服务的`token`或者`secret`等信息

如果有需要，请在`application.yml`或者`application-*.yml`文件中进行配置，然后在代码中使用`配置服务注入`再使用。

## 代码规范

本仓库使用各种工具进行代码规范检查，包括但不限于：

- `eslint`代码检查
- `prettier`代码格式化
- `commitlint`提交规范检查
- `husky`git钩子
- `lint-staged`针对暂存区的代码检查
- `changeset`生成`changelog`和`release`版本

等全套工具链。如果没有按照要求，请不要提交到本仓库。
