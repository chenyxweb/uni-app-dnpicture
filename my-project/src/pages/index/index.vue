<template>
  <view class="content">
    <!-- 数据展示 -->
    <text :data-title="msg">{{msg}}</text>
    <!-- 遍历 -->
    <text
      v-for="(item,index) in list"
      :key="item.id"
    >{{index}} -- {{item.name}}</text>
    <!-- 条件渲染 -->
    <view v-if="true">123</view>
    <view v-else>456</view>
    <view v-show="false">456</view>
    <!-- 计算属性 -->
    <view>{{name}}</view>

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

<script>
export default {
  data() {
    return {
      msg: 'Hello uin-app',
      list: [
        { id: 1, name: 'zs' },
        { id: 2, name: 'ww' },
        { id: 3, name: 'ls' },
      ],
      firstName: 'chen',
      lastName: 'YX'
    }
  },
  onLoad(query) {

  },
  methods: {
    handleClick(val, e) {
      console.log('click', val, e)
      // 访问标签绑定数据
      console.log(e.currentTarget.dataset.index)
    }
  },
  computed: {
    name() {
      return this.firstName + this.lastName
    }
  }
}
</script>

<style lang="scss">
</style>
