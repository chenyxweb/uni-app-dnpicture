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