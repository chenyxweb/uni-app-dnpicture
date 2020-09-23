// 图片详情组件
<template>
  <view class="img-detail">
    <!-- profile -->
    <view class="profile">
      <!-- 头像 -->
      <view class="image">
        <image
          :src="imgDetail.user.avatar"
          mode="aspectFill"
        ></image>
      </view>
      <!-- 文字 -->
      <view class="text">
        <view class="title">{{imgDetail.user.name}}</view>
        <view class="time">{{imgDetail.atime | formatTimeDifference}}</view>
      </view>
    </view>

    <!-- 图片 -->
    <image
      :src="imgDetail.thumb + imgDetail.rule.replace('$<Height>',360)"
      v-if="imgDetail.thumb"
      mode="widthFix"
    ></image>

    <!-- 点赞&收藏 -->
    <view class="fav">
      <view class="like"> <text class="iconfont icondianzan"></text> {{imgDetail.rank}} </view>
      <view class="collect"> <text class="iconfont iconshoucang"></text> 收藏 </view>
    </view>

    <!-- 下载 -->
    <view class="download">下载图片</view>
  </view>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      imgDetail: {}, // 当前显示图片信息

    }
  },

  mounted() {
    console.log(getApp().globalData)
    // 获取全局数据
    // list 图片列表
    // index 当前图片索引
    const { list, index } = getApp().globalData
    this.imgDetail = { ...list[index] }
    console.log(this.imgDetail)
  },

  // 过滤器
  filters: {
    //  求时间差
    formatTimeDifference(value) {
      // console.log('value: ', value, moment);
      return moment(value * 1000).fromNow()
    }
  }

}
</script>

<style lang="scss" scoped>
.img-detail {
  .profile {
    padding: 15rpx 20rpx;
    display: flex;
    align-items: center;

    .image {
      width: 88rpx;
      height: 88rpx;

      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .text {
      flex: 1;
      padding-left: 10rpx;

      .title {
        font-weight: 700;
        padding-bottom: 10rpx;
      }
      .time {
        font-size: 20rpx;
        color: #ccc;
      }
    }
  }

  .fav {
    display: flex;
    font-size: 32rpx;
    border-bottom: 1px solid #ccc;
    text-align: center;

    .like {
      flex: 1;
      padding: 20rpx;
      // border-right: 1px solid #ccc;
    }

    .collect {
      flex: 1;
      padding: 20rpx;
    }
  }

  .download {
    background-color: #d52a7e;
    color: #fff;
    font-size: 48rpx;
    font-weight: 700;
    margin: 10rpx;
    padding: 15rpx;
    text-align: center;
    border-radius: 5rpx;
  }
}
</style>