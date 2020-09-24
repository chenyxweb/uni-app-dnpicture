// 前四个分页器公用组件
<template>
  <view class="video-main">
    <view class="video-wrapper">
      <view
        class="video-item"
        v-for="item in list"
        @click="handleClick(item)"
      >
        <image
          :src="item.img"
          mode="aspectFill"
          lazy-load
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {

  props: {
    list: {
      type: Array,
      default: []
    }
  },

  watch: {
    list() {
      console.log(this.list)
    }
  },
  methods: {
    // 点击图片
    handleClick(item) {
      // 保存当前点击项数据到appData
      getApp().globalData.video = item
      // 跳转到视频播放页
      uni.navigateTo({ url: '/pages/VideoPlay/index' })
    }
  }

}
</script>

<style lang="scss" scoped>
.video-main {
  .video-wrapper {
    display: flex;
    flex-wrap: wrap;

    .video-item {
      width: 33.33%;
      border: 3rpx solid #fff;

      image {
        height: 380rpx;
      }
    }
  }
}
</style>