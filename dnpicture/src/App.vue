<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  // 全局共享数据
  globalData: {
    // 图片列表缓存
    list: [],
    // 当前图片index
    index: -1
  }
}
</script>

<style>
/*每个页面公共css */
/* 引入字体图标 */
@import "./styles/iconfont.wxss";
/* 引入base样式 */
@import "./styles/base.wxss";
</style>
