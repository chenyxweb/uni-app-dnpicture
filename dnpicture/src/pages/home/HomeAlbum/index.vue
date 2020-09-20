// 专辑
<template>
  <scroll-view class="album" scroll-y @scrolltolower="scrolltolower">
    <!-- 轮播 -->
    <swiper indicator-dots autoplay :interval="2000" circular class="swiper">
      <swiper-item v-for="item in swiper" :key="item.id">
        <image :src="item.thumb"></image>
      </swiper-item>
    </swiper>
    <!-- 图片展示 -->
    <view class="album-list">
      <view class="list-item" v-for="item in albumList" :key="item.id">
        <view class="left">
          <image :src="item.cover" mode="aspectFill"></image>
        </view>
        <view class="right">
          <view class="title">{{item.name}}</view>
          <view class="desc">{{item.desc}}</view>
          <view class="btn-wrapper">
            <view class="btn"> + 关注 </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: "HomeAlbum",
  data() {
    return {
      swiper: [], // 轮播
      albumList: [], // 图片列表
      param: { // 请求列表参数
        limit: 30,
        order: 'hot',
        skip: 0 // 跳过条数
      },
      hasMore: true, // 是否还有数据
    }
  },
  mounted() {
    // 获取列表数据
    this.getList()
    // 设置页面标题
    uni.setNavigationBarTitle({ title: '专辑' })
  },
  methods: {
    // 获取列表
    getList() {
      this.request({
        url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
        data: this.param
      }).then(res => {
        console.log(res)
        const { banner, album } = res?.res
        // 保存数据
        this.swiper = banner || []
        this.albumList = [...this.albumList, ...album || []]

        if (album.length === 0) {
          this.hasMore = false
        }
      })
    },
    // 下拉触底
    scrolltolower() {
      // 是否还有列表数据
      if (!this.hasMore) return uni.showToast({ title: '没有数据了', icon: 'none' })
      // 修改 skip
      this.param = { ...this.param, skip: this.param.skip + this.param.limit }
      // 请求数据
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.album {
  height: calc(100vh - 36 * 2rpx);

  .swiper {
    height: 750 * 248 / 640 rpx;

    image {
      height: 100%;
    }
  }

  .album-list {
    .list-item {
      display: flex;
      padding: 10rpx;

      .left {
        flex: 1;

        image {
          height: 240rpx;
        }
      }

      .right {
        flex: 2;
        padding: 10rpx 10rpx 10rpx 20rpx;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .title {
          font-size: 32rpx;
          padding: 10rpx 0;
          font-weight: 700;
        }

        .desc {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .btn-wrapper {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;

          .btn {
            border: 2rpx solid $uni-color-error;
            width: 120rpx;
            height: 60rpx;
            border-radius: 2rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            color: $uni-color-error;
          }
        }
      }
    }
  }
}
</style>