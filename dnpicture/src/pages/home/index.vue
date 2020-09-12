<template>
  <view>首页
    <text class="iconfont iconvideocamera"></text>
    <uni-badge text="1"></uni-badge>
  </view>
</template>

<script>
import { uniBadge } from '@dcloudio/uni-ui'
export default {
  components: { uniBadge },
  data() {
    return {

    }
  },
  onLoad() {
    wx.request({
      url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
      success(res) {
        console.log(res)
      }
    })

    uni.request({ url: 'http://157.122.54.189:9088/image/v3/homepage/vertical' }).then(res => console.log(res))
  },
  methods: {

  }
}
</script>

<style lang="scss">
</style>
