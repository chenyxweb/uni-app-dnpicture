<template>
<!-- 把 props中的src看成是 data中的变量一样 来使用 -->
  <image @click="handleClick" class="img-border" :src="src"></image>
</template>

<script>
export default {
  //   声明一下要接收的 父组件传递过来的属性
  props:{
    src:String
  },
  methods:{
    handleClick(){
      // console.log("超人救人的时候为什么都要穿紧身衣？？ 救人要紧！！");

      // 子向父 传递数据  通过触发事件
      // this.$emit("自定义的事件名称","要传递的参数");
      this.$emit("srcChange",this.src);

    }
  }
}
</script>

<style>
.img-border{
  border-radius: 50%;
}
</style>