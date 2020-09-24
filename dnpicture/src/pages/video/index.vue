// 精美视频
<template>
  <view class="video">
    <!-- tab栏 -->
    <view class="tab">
      <view class="segment">
        <!-- 分段器:用作不同视图的显示 -->
        <uni-segmented-control
          :current="current"
          :values="items.map(item=>item.title)"
          style-type="text"
          active-color="#d4237a"
          @clickItem="handleClickItem"
        ></uni-segmented-control>
      </view>
      <!-- 搜索icon -->
      <text class="iconfont iconsearch"></text>
    </view>

    <!-- 内容区 -->
    <scroll-view
      class="content-wrapper"
      scroll-y
      refresher-enabled
      :refresher-triggered="trigger"
      @refresherrefresh="handleRefresherrefresh"
      @scrolltolower="handleScrolltolower"
    >
      <view class="content">
        <!-- 0~3 -->
        <view v-show="current<=3">
          <video-main :list="mainList"></video-main>
        </view>

        <!-- 4 -->
        <view v-show="current===4">
          <video-category :list="categoryList"></video-category>
        </view>

      </view>
    </scroll-view>
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'
import VideoMain from './VideoMain/index.vue'
import VideoCategory from './VideoCategory/index.vue'

export default {
  components: {
    uniSegmentedControl,
    VideoMain,
    VideoCategory
  },

  data() {
    return {
      items: [
        {
          title: '推荐',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
          param: {
            limit: 30,
            skip: 0,
            order: 'hot'
          }
        },
        {
          title: '娱乐',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
          param: {
            limit: 30,
            skip: 0,
            order: 'new'
          }
        },
        {
          title: '最新',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
          param: {
            limit: 30,
            skip: 0,
            order: 'new'
          }
        },
        {
          title: '热门',
          url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
          param: {
            limit: 30,
            skip: 0,
            order: 'hot'
          }
        },
        { title: '分类', url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category' }
      ], // 选项数组
      current: 0, // 当前选中的tab索引值
      mainList: [], // 前四个视频列表数据
      categoryList: [], // 分类视频列表数据
      param: { // 请求参数
        limit: 30,
        skip: 0,
        order: 'hot'
      },
      hasMore: true, // 是否有更多数据
      trigger: false, // 下拉刷新被触发
    }
  },

  mounted() {
    // 获取列表数据
    this.getList()

  },

  methods: {

    // 点击tab栏
    handleClickItem(e) {
      this.current = e.currentIndex
      // 初始化请求数据
      if (this.current <= 3) {
        this.param = { ...this.items[this.current].param }
        this.hasMore = true
        this.mainList = []
        // 获取列表数据

        this.getList()
      }
    },

    // 获取列表数据
    async getList() {

      if (!this.hasMore) return uni.showToast({ title: '没有更多数据了~', icon: "none" })

      const url = this.items[this.current].url
      const res = await this.request({ url, data: this.param })
      console.log(res)
      const videowp = res.res?.videowp || []

      if (videowp.length === 0) {
        this.hasMore = false
        return uni.showToast({ title: '没有更多数据了~', icon: "none" })
      }

      this.mainList = [...this.mainList, ...videowp]
      this.trigger = false
    },

    // 触底事件
    handleScrolltolower() {
      // 修改入参
      this.param.skip += this.param.limit

      this.getList()
    },

    // 下拉刷新被触发
    handleRefresherrefresh() {
      if (this.current <= 3) {
        console.log('下拉刷新')
        this.trigger = true
        // 初始化数据
        this.param = { ...this.items[this.current].param }
        this.hasMore = true
        this.mainList = []

        this.getList()
      }
      if (this.current === 4) {
        this.trigger = true
        setTimeout(() => {
          this.trigger = false
        }, 3000);
      }

    },


  }

}
</script>

<style lang="scss" scoped>
.video {
  .tab {
    position: relative;

    .segment {
      width: 70%;
      margin: 0 auto;
    }

    .iconfont {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translate(-50%, -50%);
    }
  }

  .content-wrapper {
    height: calc(100vh - 72rpx);
  }
}
</style>

