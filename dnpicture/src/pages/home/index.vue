<template>
  <view class="index">
    <!-- tab栏 -->
    <view class="tab">
      <view class="segment">
        <!-- 分段器:用作不同视图的显示 -->
        <uni-segmented-control
          :current="current"
          :values="items"
          style-type="text"
          active-color="#d4237a"
          @clickItem="handleClickItem"
        ></uni-segmented-control>
      </view>
      <!-- 搜索icon -->
      <text class="iconfont iconsearch"></text>
    </view>

    <!-- 内容区 -->
    <view class="content">
      <view v-if="current === 0">
        <!-- 推荐 -->
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <!-- 分类 -->
        <home-category></home-category>
      </view>
      <view v-if="current === 2">
        <!-- 最新 -->
        <home-new></home-new>
      </view>
      <view v-if="current === 3">
        <!-- 专辑 -->
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'
import HomeRecommend from './HomeRecommend'
import HomeCategory from './HomeCategory'
import HomeNew from './HomeNew'
import HomeAlbum from './HomeAlbum'
// console.log({ [HomeAlbum.name]: HomeAlbum })

export default {
  components: {
    uniSegmentedControl,
    HomeRecommend,
    HomeCategory,
    HomeNew,
    HomeAlbum,
    // [HomeAlbum.name]: HomeAlbum,  // 不能使用 ???
    // HomeAlbum: HomeAlbum,
  },
  data() {
    return {
      items: ['推荐', '分类', '最新', '专辑'], // 选项数组
      current: 0, //当前选中的tab索引值
    }
  },
  onLoad() {
  },
  methods: {
    // 点击tab栏
    handleClickItem(e) {
      this.current = e.currentIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .tab {
    position: relative;

    .segment {
      width: 60%;
      margin: 0 auto;
    }

    .iconfont {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translate(-50%, -50%);
    }
  }

  .content {
  }
}
</style>
