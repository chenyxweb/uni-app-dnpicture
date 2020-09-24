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
    <swiper-action @swiper="handleSwiper">
      <image
        :src="imgDetail.thumb"
        v-if="imgDetail.thumb"
        mode="widthFix"
      ></image>
    </swiper-action>

    <!-- 点赞&收藏 -->
    <view class="fav">
      <view class="like"> <text class="iconfont icondianzan"></text> {{imgDetail.rank}} </view>
      <view class="collect"> <text class="iconfont iconshoucang"></text> 收藏 </view>
    </view>

    <!-- 下载 -->
    <view
      class="download"
      @click="handleDownload"
    >下载图片</view>
  </view>
</template>

<script>
import moment from 'moment'
import SwiperAction from '../../components/SwiperAction'

export default {
  components: {
    SwiperAction
  },

  data() {
    return {
      imgDetail: {}, // 当前显示图片信息
      list: [], // 图片数组
      index: 0, // 当前图片索引
    }
  },

  mounted() {
    // console.log(getApp().globalData)
    // 获取全局数据
    // list 图片列表
    // index 当前图片索引
    const { list, index } = getApp().globalData
    this.imgDetail = list[index]
    this.list = list
    this.index = index

    console.log(this.imgDetail, this.list, this.index)

    // 获取图片评论信息
    this.getPicComment(this.imgDetail.id)
  },
  methods: {
    // 获取图片评论信息
    getPicComment(id) {
      console.log('id', id)
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      }).then(res => {
        // 接口挂了
        // console.log(res)
      })

    },

    // 处理滑动
    handleSwiper(direction) {
      console.log('direction: ', direction);

      if (direction === 'left' && this.index < this.list.length - 1) {
        // 左滑++
        this.index++
      } else if (direction === 'right' && this.index > 0) {
        // 右滑--
        this.index--
      }

      this.imgDetail = this.list[this.index]

    },

    // 下载图片
    handleDownload() {
      console.log(this.imgDetail)
      const url = this.imgDetail.thumb


      // 1. 将图片缓存到app
      uni.downloadFile({
        url,
        success(res) {
          console.log(res)
          const { tempFilePath } = res

          // 2. 下载到本地
          uni.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success() {
              uni.showToast({ title: '图片下载成功' })
            },
            fail() {
              uni.showToast({ title: '图片下载失败', icon: 'none' })
            }
          })

        },
        fail() {
          uni.showToast({ title: '图片缓存失败', icon: 'none' })
        }
      })
    }
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
    border-top: 1px solid #ccc;
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