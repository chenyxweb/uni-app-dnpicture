// 专辑详情页
<template>
  <view class="album-info">
    <view class="image">
      <image
        :src="album.cover"
        mode="widthFix"
      ></image>
      <view class="btn">关注专辑</view>
      <view class="name">{{album.name}}</view>
    </view>
    <!-- 用户评论 -->
    <view class="comment">
      <view class="top">
        <view class="profile">
          <image :src="album.user.avatar"></image>
          <view class="name">{{album.user.name}}</view>
        </view>
        <view class="desc">{{album.desc}}</view>
      </view>
      <view class="content">
        <image
          :src="item.thumb + item.rule.replace('$<Height>','240')"
          v-for="item in wallpaper"
          :key="item.id"
          mode="aspectFill"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {

  data() {
    return {
      id: -1,//专辑id
      album: {}, // 专辑信息
      wallpaper: [], // 展示图片
    }
  },

  onLoad(query) {
    console.log(query)

    this.id = query.id

    // 获取详情信息
    this.queryAlbumInfo()

  },
  methods: {
    queryAlbumInfo() {
      this.request({ url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`, data: { limit: 30, order: 'new', skip: 0, first: 1 } }).then(res => {
        console.log(res)
        const { album, wallpaper } = res?.res
        this.album = album || {}
        this.wallpaper = wallpaper || []

      })
    }
  }

}
</script>

<style lang="scss" scoped>
.album-info {
  .image {
    position: relative;

    .btn {
      position: absolute;
      right: 10rpx;
      bottom: 10rpx;
      background-color: #d52a7e;
      width: 152rpx;
      height: 60rpx;
      border-radius: 10rpx;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .name {
      position: absolute;
      left: 10rpx;
      bottom: 10rpx;
      font-size: 40rpx;
      color: white;
    }
  }

  // 用户评论
  .comment {
    .top {
      padding: 10rpx;

      .profile {
        display: flex;
        align-items: center;
        padding: 10rpx 0;

        image {
          width: 50rpx;
          height: 50rpx;
        }
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;

      image {
        width: 33.33%;
        border: 3rpx solid #fff;
        height: 160rpx;
      }
    }
  }
}
</style>