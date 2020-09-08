<template>
  <view class="content">
    <!-- 2 使用数据 {{ msg }}  -->
    <view>{{msg}}</view>
    <view>{{money}}</view>
    <view>{{isRich}}</view>
    <view>{{person.name}}</view>
    <view>{{person.skill}}</view>

    <!-- 在标签上 通过属性的方式来使用数据 -->
    <view :data-color="color">color</view>

    <view>==================</view>
    <view>
      <!-- list 通过view标签来显示  -->
      <view
        v-for="(item,index) in  list"
        :key="item.id"
        v-if="item.id<=0"
      >
        {{ item.id }} -- {{item.text}} -- {{index}}
      </view>
    </view>

    <view>-------------------------</view>
    <view>
      <view v-if="false">v-if</view>
      <view v-show="false">v-show</view>
    </view>

    <view> ￥ {{money}} </view>
    <view> {{cnMoney}} </view>

    <view>
      <view
        v-for="item in filterList"
        :key="item.id"
      >
        {{item.text}}
      </view>
    </view>
  </view>
</template>
 
<script>
export default {
  // 1 data 定义数据
  data() {
    return {
      // 存放数据
      msg: "黑马程序员-广州中心",
      // 数字
      money: 10000,
      // bool类型
      isRich: false,
      // 对象
      person: {
        name: "孙悟空",
        skill: "72变"
      },
      // 颜色
      color: "aqua",
      // 数组
      list: [
        {
          id: 0,
          text: "苹果"
        },
        {
          id: 1,
          text: "🍌"
        },
        {
          id: 2,
          text: "🍒"
        }
      ]
    };
  },
  // 2 计算属性
  computed: {
    // 把 cnMoney 看成是在data中的普通的数据一样来使用即可
    cnMoney() {
      // ￥ 1000
      return "￥" + this.money;
    },
    // 过滤数组
    filterList() {
      // 只要id >0 都不要显示
      return this.list.filter(v => v.id <= 0);
    }
  }
};
</script>

<style lang="scss" >
</style>
