## 前言

一个学习 react 源码的配置教程

- react 版本 17.0.2
- 时间：2022.03.28

## 初始化

### 修改 webpack.common.js

配置别名

```js
 resolve: {
    alias: {
      react: path.join(__dirname, '../react-17.0.2/packages/react'),
      shared: path.join(__dirname, '../react-17.0.2/packages/shared'),
      'react-dom': path.join(__dirname, '../react-17.0.2/packages/react-dom'),
      scheduler: path.join(__dirname, '../react-17.0.2/packages/scheduler'),
      'react-reconciler': path.join(
        __dirname,
        '../react-17.0.2/packages/react-reconciler'
      ),
    },
  },
```

支持 flow 语法

```js
 module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-flow'],// 支持 flow 语法
        },
      },
    ],
  },
```

设置环境变量

```js
 plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
      __PROFILE__: true,
      __EXPERIMENTAL__: true,
      __VARIANT__: true,
    }),
  ],
```

## 修改 react 源码

找到 react-17.0.2 文件
SchedulerHostConfig.js

```github
// invariant(false, 'This module must be shimmed by a specific renderer.');
+ export * from './forks/ReactFiberHostConfig.dom'

```
