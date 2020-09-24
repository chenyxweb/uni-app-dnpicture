// 图片分类页
<template>
  <view class="img-category">
    <!-- 分页器 -->
    <view class="segment">
      <uni-segmented-control
        :current="current"
        :values="items"
        style-type="text"
        active-color="#d4237a"
        @clickItem="handleClickItem"
      ></uni-segmented-control>
      <!-- 搜索icon -->
      <text class="iconfont iconsearch"></text>
    </view>
    <!-- 图片容器 -->
    <scroll-view
      scroll-y
      class="img-wrapper"
      @scrolltolower="handleScrolltolower"
    >
      <view class="img">
        <view
          class="img-item"
          v-for="(item,index) in list"
        >
          <go-detail
            :list="list"
            :index="index"
          >
            <image
              :src="item.thumb"
              class="image"
              mode="aspectFill"
            ></image>
          </go-detail>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import GoDetail from '../../components/GoDetail/index.vue'
import { uniSegmentedControl } from '@dcloudio/uni-ui'

export default {

  components: {
    GoDetail,
    uniSegmentedControl
  },

  data() {
    return {
      id: 0,// 当前图片分类的id
      param: {
        limit: 30, // 获取多少条
        skip: 0,// 跳过多少条
        order: 'new', // 最新 new 热门 hot
      },
      items: ['最新', '热门'], // 选项数组
      current: 0, // 当前选中的tab索引值
      list: [], // 图片列表
      hasMore: true, //是否还有图片
    }
  },

  onLoad(query) {
    console.log('query: ', query);
    this.id = query.id

    // 根据id获取图片列表
    this.getList()
  },

  methods: {
    // 处理分段器点击
    handleClickItem(e) {
      this.current = e.currentIndex
      this.param = { ...this.param, skip: 0, order: this.current === 0 ? 'new' : 'hot' }
      this.list = []
      this.hasMore = true
      // 获取列表
      this.getList()
    },
    // 根据id获取图片列表
    async getList() {
      if (!this.hasMore) return uni.showToast({ title: '没有更多数据了', icon: 'none' })
      const id = this.id
      const res = await this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${id}/vertical`,
        data: this.param
      })

      console.log('res', res)

      const vertical = res.res?.vertical || []
      const arr = []

      if (vertical.length === 0) {
        // 没有数据了
        uni.showToast({ title: '没有更多数据了', icon: 'none' })
        this.hasMore = false
        return
      }

      this.list = [...this.list, ...vertical]

    },
    // 滚动触底事件
    handleScrolltolower() {
      console.log('触底')
      if (!this.hasMore) return uni.showToast({ title: '没有更多数据了', icon: 'none' })
      this.param.skip += 30
      this.getList()
    }
  }

}
</script>

<style lang="scss" scoped>
.img-category {
  .segment {
    // width: 60%;
    padding: 0 20%;
    height: 36 * 2rpx;
    margin: 0 auto;
    position: relative;

    .iconfont {
      position: absolute;
      top: 50%;
      right: 5%;
      transform: translate(-50%, -50%);
    }
  }

  .img-wrapper {
    height: calc(100vh - 36 * 2rpx);

    .img {
      display: flex;
      flex-wrap: wrap;

      .img-item {
        width: 33.33%;
        border: 3rpx solid #fff;

        .image {
          height: 480rpx;
        }
      }
    }
  }
}
</style>