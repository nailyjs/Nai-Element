# public

存放全局公共静态配置资源的目录
第一层目录代表会被加载的环境

```bash
public
├─ README.md
├─ production               代表生产环境
│  ├─ wechat_private.key
│  └─ wechat_public.key
└─ development              代表开发环境
   ├─ wechat_private.key
   └─ wechat_public.key
   # 内部文件夹外层文件则为所有环境都能访问的公共资源
```
