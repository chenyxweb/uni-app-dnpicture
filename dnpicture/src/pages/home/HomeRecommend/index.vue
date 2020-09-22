// 推荐
<template>
  <view
    class="recommend"
    v-if="recommendList.length"
  >
    <scroll-view
      scroll-y
      @scrolltolower="scrolltolower"
      class="scroll-view"
    >
      <!-- 推荐列表 -->
      <view class="recommend-list">
        <navigator
          class="recommend-item"
          v-for="item in recommendList"
          :key="item.id"
          :url="`/pages/AlbumInfo/index?id=${item.target}`"
        >
          <image
            :src="item.thumb"
            mode="widthFix"
          ></image>
        </navigator>
      </view>

      <!-- “月份” 列表 -->
      <view class="month">

        <!-- 标题 -->
        <view class="title">
          <view class="left">
            <view class="date">
              <text>{{monthInfo.DD}}</text>
              /{{monthInfo.MM}}月
            </view>
            <view class="lang"> {{monthInfo.title}} </view>
          </view>
          <view class="more"> 更多> </view>
        </view>

        <!-- 内容 -->
        <view class="content">
          <view
            class="image-wrapper"
            v-for="(item,index) in monthInfo.items"
            :key="item.id"
          >
            <go-detail
              :list="monthInfo.items"
              :index="index"
            >
              <image
                :src="item.img + item.rule.replace('$<Height>',360)"
                mode="aspectFill"
              ></image>
            </go-detail>
          </view>

        </view>
      </view>

      <!-- “热门” 列表 -->
      <view class="hot">
        <view class="title">热门</view>
        <view class="content">
          <view
            class="image-wrapper"
            v-for="(item,index) in hot"
            :key="item.id"
          >
            <go-detail
              :list="hot"
              :index="index"
            >
              <image
                :src="item.thumb"
                mode="widthFix"
              ></image>
            </go-detail>
          </view>
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script>
import moment from 'moment'
import GoDetail from '../../../components/GoDetail/index.vue'

export default {
  name: "HomeRecommend",
  components: {
    GoDetail
  },
  data() {
    return {
      recommendList: [], // 推荐列表
      monthInfo: {},  // 月份数据
      hot: [], // 热门
      param: { // 请求列表参数
        limit: 30,
        order: 'hot',
        skip: 0 // 跳过条数
      },
      hasMore: true, // 是否还有数据
    }
  },
  mounted() {
    console.log('mounted')
    this.getList()
    // 设置页面标题
    uni.setNavigationBarTitle({ title: '推荐' })

  },
  methods: {
    // 触底事件
    scrolltolower() {
      console.log('到底了')

      if (!this.hasMore) return uni.showToast({ title: '没有数据了', icon: 'none' })

      // 修改skip
      this.param.skip = this.param.skip + this.param.limit
      // 请求数据
      this.getList()
    },
    // 获取列表数据
    getList() {
      // 请求数据
      this.request({
        url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
        data: this.param
      }).then(res => {
        console.log(res)
        const { homepage, vertical } = res?.res

        if (this.recommendList.length === 0) {
          // 第一次请求数据
          this.recommendList = homepage[1].items || []
          this.monthInfo = homepage[2]
          this.monthInfo = { ...this.monthInfo, MM: moment(homepage[2].stime).format('MM'), DD: moment(homepage[2].stime).format('DD') }
        }

        if (vertical.length === 0) {
          // 没数据了
          this.hasMore = false
          uni.showToast({ title: '没有数据了', icon: null })
        } else {
          this.hot = [...this.hot, ...vertical]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  .scroll-view {
    // 设置高度
    height: calc(100vh - 36 * 2rpx);

    .recommend-list {
      display: flex;
      flex-wrap: wrap;

      .recommend-item {
        width: 50%;
        border: 3rpx solid #fff;
      }
    }

    .month {
      // 标题
      .title {
        display: flex;
        justify-content: space-between;
        padding: 10rpx;
        align-items: center;
        font-weight: 700;

        .left {
          display: flex;
          align-items: center;

          .date {
            color: $color;

            text {
              font-size: 36rpx;
            }
          }

          .lang {
            padding-left: 10rpx;
            font-size: 30rpx;
          }
        }

        .more {
          color: $color;
        }
      }

      // 内容'
      .content {
        display: flex;
        flex-wrap: wrap;

        .image-wrapper {
          width: 33.33%;
        }
      }
    }

    // 热门
    .hot {
      .title {
        padding: 10rpx;
      }

      .content {
        display: flex;
        flex-wrap: wrap;

        .image-wrapper {
          width: 33.33%;
        }
      }
    }
  }
}
</style>