# 开发

如果没安装parcel，先安装：
```
yarn global add parcel-bundler
```
开发阶段输入：
```
parcel src/index.html
```

## 创建 build 命令

1. 先创建一个脚本

```
yarn init -y
```
输入上面代码后，在package.json文件中添加下面代码：
```
"scripts": {
    "build": "rm -rf dist && parcel build src/index.html --no-minify --public-url ./"
  },
```

2. build 命令

每次修改完代码，在终端输入：
```
yarn build
```


