# uni-app

## 1 基础知识

### 概念

> uni-app 是一款基于vue语法的 全端开发框架

### uni-app 初体验

1.[安装使用](https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)

```
npm install -g @vue/cli

vue create -p dcloudio/uni-preset-vue my-project
选择默认模板

npm run dev:mp-weixin //运行项目

微信开发者工具->导入项目->选择my-project\dist\dev\mp-weixin

```

### 项目结构

### 样式和sass

- 单位

```
rpx   屏幕宽度=750rpx
vw	屏幕宽度=100vw
vh	屏幕高度度-100vh
```

- sass

```
// 安装
yarn add node-sass sass-loader
```





### 基本语法

- 数据展示

```vue
<text :data-title="msg">{{msg}}</text> // data- : 在标签中存放数据
```

- 循环遍历

```vue
<text v-for="(item,index) in list" :key="item.id">{{index}} -- {{item.name}}</text>
```

- 条件渲染

```vue
<view v-if="true">123</view>
<view v-else>456</view>
<view v-show="false">456</view>
```

- 计算属性

```vue
computed: {
    name() {
      return this.firstName + this.lastName
    }
  }
```

### 事件

```vue
<template>
  <view class="content">
    <!-- 事件 -->
    <button
      data-index="0"
      @click="handleClick(1,$event)"
    >按钮1</button>
    <button
      data-index="1"
      @click="handleClick(2,$event)"
    >按钮2</button>
  </view>
</template>

export default{
  methods: {
    handleClick(val, e) {
      console.log('click', val, e)
      // 访问标签绑定数据
      console.log(e.currentTarget.dataset.index)
    }
  },
}

```



### 组件

### 生命周期



## 2 项目-懂你找图

