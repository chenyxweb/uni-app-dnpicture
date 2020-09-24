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

<uni-segmented-control
    :values="items.map(v=>v.title)"
    :current="current"
    @clickItem="onClickItem"
    style-type="text"
    active-color="#d4237a"
></uni-segmented-control>

      items: 
        { title: "推荐",... }, // 可以放其他数据
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" } 
      ],
```

- image

```vue
// 高度自适应
<image :src="item.thumb" mode="widthFix"></image>

// mode='aspectFill'
// 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。

// image 的几种显示模式 常用 : widthFix , aspectFill
// 技巧  
// 不定高大图片使用 widthFix 高度自适应
// 直接给图片定死宽高rpx使用 aspectFill 让展示时, 短了的边完全展示出来, 会有裁切效果
```

- scroll-view 组件

```
@scrolltolower 触底事件

<scroll-view scroll-y @scrolltolower="scrolltolower" class="scroll-view"></scroll-view>

// 注意 : 必须设置scroll-y 纵向滚动; 必须设置容器固定高度; tab栏不算入视图高度中
```

#### 分类

- 首页分类

```
HomeCategory
```

- 图片分类

```
ImgCategory
```

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
####  2.3.1 封装超链接组件  

> 组件功能: 组件包裹图片, 接收图片列表和当前图片的索引,点击组件后,将数据存入globalData中,并且跳转到图片详情页

```
// 点击要跳转到图片详情页的image标签都被此组件包裹
// list 当前图片所在的图片数组,当前图片的索引
<go-detail :list="list" :index="index"></go-detail>

// 点击该组件,将图片数组存储到全局,并且跳转到图片详情页
App.vue中定义globalData
获取或设置 : getApp().globalData
```

```vue
// goDetail.vue

// 超链接组件--点击要跳转到图片详情页的image标签都被此组件包裹
<template>
  <view @click="handleClick">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    // 图片列表
    list: {
      type: Array,
      default: []
    },
    // 当前图片索引
    index: {
      type: Number,
      default: -1
    }
  },
  // mounted() {
  //   console.log(this.list)
  //   console.log(this.index)
  // },

  methods: {
    handleClick() {
      // 将list和index存入全局数据
      // console.log(this.list, this.index)
      getApp().globalData.list = this.list
      getApp().globalData.index = this.index
      // 跳转到图片详情页
      uni.navigateTo({ url: '/pages/ImgDetail/index' })
    }
  }

}
</script>

<style>
</style>
```

####  2.3.2 图片详情页组件

```
// imgDetail.vue

// 时间格式化momnet.js
fromNow()
moment("20111031", "YYYYMMDD").fromNow(); // 9 年前
moment("20120620", "YYYYMMDD").fromNow(); // 8 年前
moment().startOf('day').fromNow();        // 18 小时前
moment().endOf('day').fromNow();          // 6 小时内
moment().startOf('hour').fromNow();       // 34 分钟前

// main.js 
// moment 本地化
import moment from 'moment'
moment.locale('zh-cn')

```

####  **2.3.3 封装手势滑动组件**

> 组件功能: 组件包裹图片, 滑动组件时, 通过触发父组件事件向外暴露用户滑动的方向

```vue
// SwiperAction.vue

// 滑动操作组件
// 组件包裹图片, 滑动组件时, 通过触发父组件事件向外暴露用户滑动的方向
<template>
  <view
    @touchstart="handleTouchstart"
    @touchend="handleTouchend"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {

  data() {
    return {
      startX: 0, //开始触摸点clientX
      startY: 0,
      endX: 0,
      endY: 0,
      startTime: 0, //触摸开始时间
      endTime: 0, // 触摸结束时间

    }
  },

  methods: {
    // 触摸开始
    handleTouchstart(e) {
      // console.log('触摸开始', e)
      this.startX = e.changedTouches[0].clientX
      this.startY = e.changedTouches[0].clientY
      this.startTime = +new Date()
    },
    // 触摸结束
    handleTouchend(e) {
      // console.log('触摸结束', e)
      this.endX = e.changedTouches[0].clientX
      this.endY = e.changedTouches[0].clientY
      this.endTime = +new Date()

      // 时间间隔小于2s
      if (this.endTime - this.startTime > 2000) return

      // 滑动距离>10
      if (Math.abs(this.endX - this.startX) < 10) return

      // 角度小于 +- 30°  |x|> 根号 3*|y| , 防止上下滑动页面产生切换图片的效果
      if (Math.abs(this.endX - this.startX) <= Math.abs(this.startY - this.endY) * Math.sqrt(3)) return

      let direction = (this.endX - this.startX) > 0 ? 'right' : 'left'
      // console.log(direction)

      // 触发父组件自定义事件,将滑动方向传递给父组件
      this.$emit('swiper', direction)
      // return direction

    }
  }

}
</script>

<style>
</style>
```

#### 2.3.4 下载图片

```
两个aip

downloadFile  // 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径(临时缓存)

saveImageToPhotosAlbum // 保存图片到系统相册
```

```
// 先将图片缓存到app, 再下载到系统相册

```

### 2.4 精美视频

- 首页

```
// 分段器
// scroll-view

// 前四个公用一个组件
VideoMain
// 最后一个视频分类用一个组件
VideoCategory
```

- 播放页

```
// 视频播放
```



## 99 总结

- 微信开发者工具 左下角可以切换页面参数, 页面路径等, 查看页面相关信息
- 微信开发工具内查看页面数据: 调试器->AppData
- 修改底部tabbar

```
uni.setTabBarItem(OBJECT)
```



