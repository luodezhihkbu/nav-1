如果没安装parcel，先安装：
```
yarn global add parcel-bundler
```

## 1. 开发阶段

输入下面代码，打开 http://localhost:1234 预览
```
parcel src/index.html
```

## 2. 发布阶段

### 2.1 用脚本创建 build 命令

```
yarn init -y
```

输入上面代码后，在package.json文件中添加下面代码：
```
"scripts": {
    "build": "rm -rf dist && parcel build src/index.html --no-minify --public-url ./"
  },
```

### 2.2 使用 build 命令

每次修改完代码要发布时，输入下面代码：
```
yarn build
```


