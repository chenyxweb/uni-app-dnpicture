// 前四个分页器公用组件
<template>
  <view class="video-main">
    <view class="video-wrapper">
      <view
        class="video-item"
        v-for="item in list"
      >
        <image
          :src="item.img"
          mode="aspectFill"
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