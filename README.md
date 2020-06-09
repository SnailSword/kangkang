https://github.com/SnailSword/kangkang

# kangkang 
查看npm包的多级依赖(让我康康你到底依赖了啥)。

## usage
```
npm i
npm run build

node ./dist/index.js [packagename] # 查看某个发布了的npm包的依赖
node ./dist/index.js -h # 查看帮助
node ./dist/index.js cache clean # 清除缓存文件
```

## todos

- [ ] `-p`支持查看某个包到某个包的依赖路径
- [ ] 预热缓存
- 优化缓存结构
    - [ ] 支持选择缓存清理方式 可以只清理低频使用的
    - [ ] 依赖特别多时的优化
- [ ] 循环依赖和重复依赖加个交互 可以自定义拉取
- [ ] 优化处理
- 同一个包不同版本的智能拉取
    - [ ] 支持同一个包拉取尽量少的版本数
    - [ ] `-m`支持传`npm`或者`yarn`等参数 以不同方式选择版本
- [ ] 更新检查
- [ ] 缓存数据损坏的话让用户选择是否重建
- [ ] `-d`支持自定义层级
- [ ] 不传参数的话解析当前目录下的`package.json`
- [ ] 可视化
- [ ] 爬取和分析几种使用场景下的高频依赖 设置对应的预置缓存文件
- [ ] 单测
- [ ] 计时
