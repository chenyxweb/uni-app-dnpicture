// 推荐
<template>
  <view class="recommend">推荐</view>
</template>

<script>
export default {
  name: "HomeRecommend",
  mounted() {
    // 请求数据
    this.request({
      url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
      data: {
        limit: 30,
        order: 'hot',
        skip: 0
      }
    }).then(res => console.log(res))
  }
}
</script>

<style lang="scss" scoped>
</style>