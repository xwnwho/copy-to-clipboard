# copy-to-clipboard2

> 配置和代码基本和[copy-to-clipboard](https://www.npmjs.com/package/copy-to-clipboard)一致，解决document.execCommand('copy')引起的页面卡顿和延迟

> 复制后不会恢复页面原来的高亮

## 使用
```ts
import copy from 'copy-to-clipboard2';
 
copy('Text');
 
// Copy with options
copy('Text', {
  debug: true,
  format: 'default'
});

```

## ⚠ 使用警告

提供的是未转译的版本:

针对 **Vue CLI 3+**, 需要这样:

```js
module.exports = {
  transpileDependencies: [
    'copy-to-clipboard',
  ]
}
```

针对 **Vue CLI 2** 需要这样:

```diff
      {
        test: /\.js$/,
        loader: 'babel-loader',
-       include: [resolve('src'), resolve('test')]
+       include: [
+         resolve('src'),
+         resolve('test'),
+         resolve('node_modules/axios-package2'),
+         resolve('node_modules/query-string')
+       ]
      }
```