<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          @click="$router.push('/search')"
          icon="search"
          round
          size="small"
          block
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab
        v-for="item in channel"
        :key="item.id"
        :title="item.name"
        class="articre"
      >
        <ArtList :id="item.id"></ArtList>
      </van-tab>
      <span class="toutiao toutiaogengduo" @click="isshow = true"></span>
    </van-tabs>
    <van-popup
      v-model="isshow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        v-if="isshow"
        @changeactive=";[(active = $event), (isshow = false)]"
        :mychannel="channel"
        @delchannel="delchannel"
        @addchannel="addchannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import ArtList from '@/views/Home/components/Artlist.vue'
import channelEdit from '@/views/Home/components/channelEdit.vue'
import { getChannelAPI, delChannelAPI, addchannelAPI } from '@/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ArtList,
    channelEdit
  },
  data() {
    return {
      active: 0,
      channel: [],
      isshow: false
    }
  },
  created() {
    this.initChannel()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannel() {
      if (this.isLogin) {
        this.getChannel()
      } else {
        if (this.$store.state.mychannels.length === 0) {
          this.getChannel()
        } else {
          this.channel = this.$store.state.mychannels
        }
      }
    },
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
    },
    async delchannel(id) {
      const newArr = this.channel.filter((item) => item.id !== id)
      try {
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(newArr)
        }
        this.$toast.success('删除成功')
        this.channel = newArr
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登陆后删除')
        } else {
          throw error
        }
      }
    },
    async addchannel(value) {
      try {
        if (this.isLogin) {
          await addchannelAPI(value.id, this.channel.length)
        } else {
          this.SET_MY_CHANNELS([...this.channel, value])
        }
        this.channel.push(value)
        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登陆后添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.articre {
  height: calc(100vh - 100px - 82px - 93px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 5px;
  }
}
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
