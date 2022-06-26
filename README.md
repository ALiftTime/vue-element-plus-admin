# 介绍

## 目录结构

```text
  .
  ├── mock   # 自定义 mock 数据及配置
  ├── public # 静态资源
  ├── src    # 项目代码
  │   ├── api           # api 接口管理
  │   ├── assets        # 静态文件
  │   ├── config        # 配置后台主题, 和配置常量
  │   ├── hooks         # hooks
  │   ├── layout        # layout
  │   ├── plugins       # plugins
  │   ├── router        # 路由
  │   ├── store         # 全局状态管理
  │   ├── styles        # styles
  │   ├── utils         # 工具
  │   ├── views         # 页面
  │   │   ├── system    # 系统页面
  │   │   └── template  # 模板
  │   ├── .env.*        # 环境变量
  │   ├── App.vue
  │   ├── main.js
  │   └── permission.ts # 路由拦截
  ├── .browserslistrc   # 要兼容的浏览器
  ├── .eslintignore     # eslint 忽略文件
  ├── .eslintrc.js      # eslint 配置文件
  ├── .gitignore        # git 忽略文件
  ├── babel.config.js   # bable 配置文件
  ├── jsconfig.json     # js 配置文件
  ├── package.json      # 依赖包
  ├── vue.config.js     # vue 配置文件
  └── windi.config.js   # windicss 配置
```

## 布局

> 介绍
  
  1. 框架支持多种布局
  2. 内置布局 3 种, pc布局, 顶部布局, 主副双菜单布局
  3. 如果改变布局,可通过提供的多种的组件,组合其他的新布局
  
## 路由

> 功能

* 除了基础路由外,其他路由都是动态添加
* 动态添加支持两种方式
  1. 在本地创建路由,添加后,可以通过路由白名单形式,过滤路由
  2. 后端权限过滤后的路由

> 配置

  路由的配置地址 /src/router/json

> 细节

  1. '/' 代表当前是一个全新的路由, 而不是当前的子路由
  2. 因为采用的都是动态路由,所以`前端本身是没有路由信息的`,但是为了解决开发需要路由的问题, 使用 mock 接口对/src/router/json文件夹下的所有json,进行加载

## 状态管理

  使用 pinia 存储全局组件状态,使用 pinia-plugin-persist 缓存处理全局状态,避免页面刷新数据不存在问题

## 环境变量

  环境类别: development (开发)  uat(测试) gray(灰度)  production (生产)  

## 全局自定义插件

> 交互

  对toast,loading,alert,confirmBox 进行了二次封装, 避免重复调用问题,全局进行管理

> 存储

  使用 web-storage-cache ,进行存储处理, 默认存储地址 localStorage  
  ***对于 localStorage 和 eventBus 的全局命名必须在 config/constant 中声明**

> http 请求

  1. 使用 axios 二次封装 http 请求
  2. 增加请求 loading 加载状态
  3. 对于异常状态进行处理 { 406(账户锁定) 404(请求不存在), 403(未注册), 402(验证失败), 401(登陆失效), 50*(服务端报错)}
  4. 请求可自定义配置,请求内容(尽量查看 request.js 后在做处理)

> eventBus

  vue3 移除 eventBus, 但本项目提供 eventBus 功能

  ```js
    this.g_busEvent.on('test', () => {
      console.log('监听 test')
    })
    this.g_busEvent.emit('test') // 触发 test
    this.g_busEvent.off('test')  // 移除 test
  ```

## mock

> 功能

  1. 支持 JSON, js 类型mock
  2. 配置简单

> 怎么使用mock?

  在 mock 文件夹内创建文件  
  例如: 我创建了 `文件夹 auth-tree 和 index.json`  
  请求路径 `hhttp://localhost:8080/mock/auth-tree/index`

> 创建 json 文件

  默认是 get 请求

> 创建 js 文件

  1. 直接导出函数, 默认是 get 请求
  2. 导出对象, 可配置 methods(请求方式)

> 怎么获取请求的参数?

  现支持 get 请求获取参数,在导出的函数中, 第一个参数是一个 request, 可 request.query 获取

> 注意事项

1. 每次更改mock, 都要重启测试服务
2. 默认请求类型是 get
3. 只在开发环境下使用
4. 不采用 mock.js 的原因是本地开发看不到请求参数和响应结果

## 图标库

使用类型传入,element字符串

参考文档: <https://icon-sets.iconify.design/ep/>

## style

 1. 支持 less
 2. 支持 windicss 通过 class 进行布局

windicss 参考文档: <https://windicss.org/utilities/layout/tables.html>

## 问题

1. 面包屑在一个路由被隐藏时,可能有问题
2. 暂不能使用 Iconify 图标, Iconify 在cli中无法动态生成图标
3. 顶部布局时,当内容超过appview 容器高度时,会发生内容截取
