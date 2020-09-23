// 滑动操作组件
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

      // 滑动距离>20
      if (Math.abs(this.endX - this.startX) < 20) return

      let direction = (this.endX - this.startX) > 0 ? 'right' : 'left'
      // console.log(direction)

      // 触发父组件自定义事件
      this.$emit('swiper', direction)

      // return direction

    }
  }

}
</script>

<style>
</style>