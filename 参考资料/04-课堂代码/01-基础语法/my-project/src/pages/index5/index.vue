<template>
  <view class="content">
    <!-- 4 使用组件 -->
    <!-- <imgBorder></imgBorder> -->
    <view> 
      子组件传递过来的路径:{{src}}
    </view>
    <img-border @srcChange="handleSrcChange" :src="src1" ></img-border>
    <img-border @srcChange="handleSrcChange" :src="src2" ></img-border>
  </view>
</template>
 
<script>
// 2 引入自定义组件
import imgBorder from "@/components/img-border";
export default {
  data(){
    return {
      src:"",
      src1:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579239184865&di=baf9e09d575b059aea0d5ae174d683a9&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20%2F720%2Fw1920h1200%2F20180324%2F1c34-fysnevm7014244.jpg",
      src2:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579239193423&di=fa972bcd0caf295cc995b6a3c2f42bc4&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F23%2F20151023144158_jn3P4.jpeg"
    }
  },
  // 3 注册组件
  components: {
    imgBorder
  },
  methods:{
    handleSrcChange(e){
      // console.log("父组件的自定义事件被触发了");
      // console.log(e);
      this.src=e;
    }
  },
  // onLoad  页面加载完毕就会触发 生命周期
  onLoad(){
    console.log(this.baseurl);
    // 获取 globaldata
    
    console.log(getApp().globalData.base);
    // getApp().globalData.base=123;
  }
};
</script>

<style lang="scss" >
</style>
