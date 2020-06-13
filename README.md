https://github.com/SnailSword/npm-shovel

# npm-shovel 
查看npm包的依赖树。

## 如何使用

### 方法1：npx 查看react的依赖树

```
npx npm-shovel react
```

output:

```
react's dependencies:

||--react
|  |--loose-envify@^1.1.0
|    |--js-tokens@^3.0.0 || ^4.0.0
|  |--object-assign@^4.1.1
|  |--prop-types@^15.6.2
|    |--loose-envify@^1.4.0
|      |--js-tokens@^3.0.0 || ^4.0.0 *
|    |--object-assign@^4.1.1 *
|    |--react-is@^16.8.1
```

### 方法2：全局安装

```
npm i npm-shovel -g  # install

```

查看`npm-shovel`的依赖树：
```
npm-shovel npm-shovel
```

输出：
```
npm-shovel's dependencies:

||--npm-shovel
|  |--commander@^5.1.0
|  |--fs-extra@^9.0.1
|    |--at-least-node@^1.0.0
|    |--graceful-fs@^4.2.0
|    |--jsonfile@^6.0.1
|      |--universalify@^1.0.0
|      |--graceful-fs@^4.1.6
|    |--universalify@^1.0.0 *
|  |--babel-runtime@^6.26.0
|    |--core-js@^2.4.0
|    |--regenerator-runtime@^0.11.0
|  |--lodash@^4.17.15
```

## API

```
npm-shovel <packagename> # 查看某个npm包的依赖
npm-shovel a b # 查看a到b的依赖路径
npm-shovel cache clean # 清除缓存文件
npm-shovel -h # 查看帮助
```


## [todo](./todo.md)
