

## 初始化

lerna init



## 增加模块

```
yarn plop
```

## 给全局模块添加公共依赖

```
yarn add -W 
yarn add -W -D 

```

## 给特定模块添加依赖
```
yarn workspace ** add element-plus   --dev
yarn workspace ** remove element-plus   --dev
```

## lerna操作命令

```
lerna bootstrap
lerna add module-1 --scope module-2

//给所有包添加
lerna add vue
```

