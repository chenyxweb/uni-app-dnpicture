// 视频播放页面

<template>
  <view class="video-play">
    <!-- 声音和分享 -->
    <view class="share">
      <view
        :class="['iconfont', muted ? 'iconjingyin':'iconshengyin']"
        @click="toggleMuted"
      ></view>
      <view class="iconfont iconzhuanfa share-btn">
        <!-- 分享功能按钮 -->
        <button open-type="share">按钮</button>
      </view>
    </view>

    <!-- 视频 -->
    <!-- :poster="video.img" -->
    <view class="video">
      <video
        :src="video.video"
        objectFit="fill"
        show-progress
        enable-play-gesture
        :title="video.name"
        :muted="muted"
      ></video>
    </view>

    <!-- 下载 -->
    <view class="download">
      <view
        class="btn"
        @click="download"
      >下载视频</view>
    </view>

    <!-- 背景 -->
    <image
      :src="video.img"
      class="bg-img"
      mode="aspectFill"
    ></image>

  </view>
</template>

<script>
export default {
  data() {
    return {
      video: {}, // 视频数据
      muted: false, //是否静音
    }
  },

  onLoad() {
    // 拿到appData中的数据
    this.video = getApp().globalData.video
    console.log('video数据: ', this.video)
  },

  methods: {
    // 是否静音
    toggleMuted() {
      this.muted = !this.muted

    },

    // 下载视频
    async download() {
      uni.showLoading({ title: '视频下载中...' })

      // uni.downloadFile({
      //   url: this.video.video,
      //   success(res) {
      //     console.log(res)
      //     uni.hideLoading()
      //     const tempFilePath = res.tempFilePath

      //     uni.saveVideoToPhotosAlbum({
      //       filePath: tempFilePath,
      //       success() {
      //         uni.showToast({ title: '视频保存成功' })
      //       }
      //     })
      //   },
      // })

      // 缓存到app
      const res = await uni.downloadFile({ url: this.video.video })
      console.log(res)
      uni.hideLoading()
      const tempFilePath = res[1].tempFilePath

      // 下载到相册
      await uni.saveVideoToPhotosAlbum({ filePath: tempFilePath })
      uni.showToast({ title: '视频保存成功' })

    }
  }

}
</script>

<style lang="scss" scoped>
.video-play {
  .share {
    display: flex;
    justify-content: flex-end;
    padding: 10rpx 0;

    view {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      background-color: rgba($color: #000000, $alpha: 0.2);
      margin-right: 15rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 48rpx;
      color: #ffffff;
      font-weight: 700;
    }

    .share-btn {
      position: relative;

      button {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
  }

  // 视频
  .video {
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      width: 480rpx;
      height: 800rpx;
    }
  }

  // 下载
  .download {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15rpx;

    .btn {
      width: 360rpx;
      height: 80rpx;
      border-radius: 40rpx;
      background-color: rgba($color: #000000, $alpha: 0.6);
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  // 背景图片
  .bg-img {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    //  滤镜效果, 模糊
    filter: blur(20rpx);
  }
}
</style>