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

## 修改 react-17.0.2 文件 react 源码

- react-17.0.2/packages/react-reconciler/src/ReactFiberHostConfig.js

```js
// invariant(false, 'This module must be shimmed by a specific renderer.');
+ export * from './forks/ReactFiberHostConfig.dom'

```

- react-17.0.2/packages/react-reconciler/src/ReactFiberWorkLoop.new.js
- react-17.0.2/packages/react-reconciler/src/ReactFiberWorkLoop.old.js

  ```js
  // import * as Scheduler from 'scheduler';
  import * as Scheduler from 'scheduler/unstable_mock';
  ```

- react-17.0.2/packages/shared/invariant.js

```js
export default function invariant(condition, format, a, b, c, d, e, f) {
+ if (condition) return; // sy 加上这个

  throw new Error(
    "Internal React error: invariant() is meant to be replaced at compile " +
      "time. There is no runtime version."
  );
}
```

- react-17.0.2/packages/shared/ReactSharedInternals.js

```js

// import React from 'react';
// const ReactSharedInternals =
//   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

+ import ReactSharedInternals  from 'react/src/ReactSharedInternals'
```

- react-17.0.2/packages/scheduler/unstable_mock.js

  ```js
  export {
    unstable_flushAllWithoutAsserting,
    unstable_flushNumberOfYields,
    unstable_flushExpired,
    unstable_clearYields,
    unstable_flushUntilNextPaint,
    unstable_flushAll,
    unstable_yieldValue,
    unstable_advanceTime, //} from './src/SchedulerHostConfig.js';
  } from './src/forks/SchedulerHostConfig.mock';
  ```
