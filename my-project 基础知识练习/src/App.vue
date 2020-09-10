// 相当于小程序中的app.js
<script>
export default {
  onLaunch: function () {
    console.log('App Launch，app启动')
  },
  onShow: function () {
    console.log('App Show，app展现在前台')
  },
  onHide: function () {
    console.log('App Hide，app不再展现在前台')
  },
  // 定义全局使用的数据
  globalData: {
    base: 'www.base.com'
  }
}
</script>

<style>
/*每个页面公共css */
</style>
