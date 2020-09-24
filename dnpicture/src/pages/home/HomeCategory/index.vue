// 分类
<template>
  <scroll-view
    class="category-wrapper"
    scroll-y
  >
    <view class="category">
      <view
        class="category-item"
        v-for="item in category"
        :key="item.id"
        @click="handleClickCategory(item.id)"
      >
        <image
          :src="item.cover"
          mode="aspectFill"
        ></image>
        <text class="text">{{item.name}}</text>
      </view>
    </view>

  </scroll-view>
</template>

<script>
export default {
  name: "HomeCategory",

  data() {
    return {
      category: [], // 图片分类数组
    }
  },

  mounted() {
    // 设置页面标题
    uni.setNavigationBarTitle({ title: '分类' })

    // 获取列表数据
    this.getList()
  },

  methods: {

    // 获取列表数据
    async getList() {
      const res = await this.request({ url: 'http://157.122.54.189:9088/image/v1/vertical/category', })
      console.log(res)
      this.category = res.res?.category || []
    },

    // 点击分类
    handleClickCategory(id) {
      // 跳转图片分类页
      uni.navigateTo({ url: `/pages/ImgCategory/index?id=${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.category-wrapper {
  height: calc(100vh - 36 * 2rpx);

  .category {
    display: flex;
    flex-wrap: wrap;

    .category-item {
      width: 33.33%;
      border: 3rpx solid #fff;
      position: relative;

      image {
        height: 240rpx;
      }

      .text {
        position: absolute;
        left: 10rpx;
        bottom: 10rpx;
        font-size: 32rpx;
        color: #fff;
        font-weight: 600;
      }
    }
  }
}
</style>