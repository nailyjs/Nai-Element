#### 一些可以公开的情报

- 本项目所有接口均限流，每个接口每分钟最多只能调用 300 次，超过限制会返回 429 Too Many Requests 错误；
- 本项目需要鉴权的接口均需要携带 `Authorization` 头，其值为 `Bearer <access_token>`，其中 `<access_token>` 为通过登录接口获取的JWT令牌；
- 本项目的 JWT 令牌有效期为 30 天，过期后需要重新登录；
- 本页面支持直接测试已登录接口，点击下面的`Authorize`按钮，输入您的JWT令牌即可直接测试接口（不需要携带`Bearer `）。
