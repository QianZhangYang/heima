<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" round size="small" block>搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
        <ArtList :id="item.id"></ArtList>
      </van-tab>
      <span class="toutiao toutiaogengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import ArtList from '@/views/Home/components/Artlist.vue'
import { getChannelAPI } from '@/api'
export default {
  components: {
    ArtList
  },
  data() {
    return {
      active: 2,
      channel: []
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channel = data.data.channels
        console.log(data)
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          error.response.status === 507 && this.$toast.fail('请刷新页面')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
    .van-button {
      width: 7.4rem;
      background-color: #5babfb;
      border: unset;
    }
  }
}
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiaogengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
