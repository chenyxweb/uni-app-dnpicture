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
// 第一步:安装
yarn add node-sass sass-loader

// 第二步
<style lang="scss">
</style>
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

- 创建组件
- 组件传参
- 全局共享数据

```
// 1.通过vue的原型共享数据
Vue.prototype.baseURL='http://www.baidu.com' // 定义
this.baseURL // 组件中访问

// 2.通过globalData
// App.vue 中定义 
export default {
    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
},
globalData:{
  base:'www.base.com'
}
}

getApp().globalData.base // 访问,  函数用于获取当前应用实例可读可写
```

- 组件插槽

### [生命周期](https://uniapp.dcloud.io/collocation/frame/lifecycle)

#### 应用生命周期

```
// App.vue

<script>  
    export default {  
        onLaunch: function() {  
            console.log('App Launch，app启动')  
        },  
        onShow: function() {  
            console.log('App Show，app展现在前台')  
        },  
        onHide: function() {  
            console.log('App Hide，app不再展现在前台')  
        }  
    }  
</script>
```

#### 页面生命周期

```
onLoad // 监听页面加载
onShow // 监听页面显示
onReady // 监听页面初次渲染完成
onPullDownRefresh // 监听用户下拉动作，一般用于下拉刷新
// ...
```

#### 组件生命周期

```
mounted // 挂载到实例上去之后调用
updated // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子
```

## 2 项目-懂你找图

### 2.1 准备工作
####  1 创建项目

```
vue create -p dcloudio/uni-preset-vue dnpicture

yarn add node-sass sass-loader
```

#### 2 创建页面

![image-20200910195945532](.\images\image-20200910195945532.png)

#### 3 创建tabBar

> https://uniapp.dcloud.io/collocation/pages?id=tabbar

#### 4 字体图标

- 引入

```
// App.vue
<style>
  /*每个页面公共css */
  /* 引入字体图标 */
  @import './styles/iconfont.wxss';
</style>

// 使用
<text class="iconfont iconvideocamera"></text>
```

#### 5 uni-ui的使用

> https://www.npmjs.com/package/@dcloudio/uni-ui#%E6%96%B9%E5%BC%8F%E4%BA%8C%EF%BC%88cli%EF%BC%89

```
// 安装
yarn add @dcloudio/uni-ui

// script
import {uniBadge} from '@dcloudio/uni-ui'
//import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue' //也可使用此方式引入组件
export default {
    components: {uniBadge}
}

// template
<uni-badge text="1"></uni-badge>
```

#### 6 uni-api的使用

```
// 请求示例
onLoad() {
    wx.request({
      url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
      success(res) {
        console.log(res)
      }
    })

uni.request({ url: 'http://157.122.54.189:9088/image/v3/homepage/vertical' }).then(res => console.log(res))
  },
```

**封装请求,挂载到Vue原型中**

```
// 封装promise请求
// 原因 : 微信原生请求不支持promise, uni请求没有加载中状态

const request = params => {
  // loading
  uni.showLoading({ title: '正在加载', mask: true })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        // 关闭loading
        uni.hideLoading()
      },
    })
  })
}

export default request



import request from './utils/request'
Vue.prototype.request = request

```

#### 7 接口文档

https://www.showdoc.com.cn/414855720281749?page_id=3678621017219602

### 2.2 首页

#### 推荐

- 分段器组件(tab栏)

```js
import { uniSegmentedControl } from '@dcloudio/uni-ui'	
```

- image

```vue
// 高度自适应
<image :src="item.thumb" mode="widthFix"></image>

// mode='aspectFill'
// 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。

// image 的几种显示模式 常用:widthFix , aspectFill
// 技巧  直接给图片定死宽高rpx
// 不定高大图片 widthFix 高度自适应
// aspectFill 让展示时, 短了的边完全展示出来, 会有裁切效果
```

- scroll-view 组件

```
@scrolltolower 触底事件

<scroll-view scroll-y @scrolltolower="scrolltolower" class="scroll-view"></scroll-view>

// 注意 : 必须设置scroll-y 纵向滚动; 必须设置容器固定高度; tab栏不算入视图高度中
```

#### 分类

#### 最新

#### 专辑

- 功能分析

```
1. 修改页面标题 : uni.setNavigationBarTitle
2. swiper组件
	swiper高度不会被内容撑开,需要手动设置
3. scroll-view组件实现分页
4. 点击跳转到专辑详情页
	navigator组件 或
	uni.navigateTo方法
```

- 专辑详情

```
onReachBottom 和 scroll-view 区别?
onReachBottom 整个页面滚动时使用
scroll-view 页面某区域滚动时使用
```

### 2.3 图片详情页
- 封装超链接组件 goDetail.vue

```
// 点击要跳转到图片详情页的image标签都被此组件包裹
// list 当前图片所在的图片数组,当前图片的索引
<go-detail :list="list" :index="index"></go-detail>

// 点击该组件,将图片数组存储到全局,并且跳转到图片详情页
App.vue中定义globalData
获取或设置 : getApp().globalData
```


- 图片详情页组件imgDetail.vue







## 99 总结

- 微信开发者工具 左下角可以切换页面参数, 页面路径等, 查看页面相关信息

