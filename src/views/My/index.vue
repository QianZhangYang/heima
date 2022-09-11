<template>
  <div class="profile">
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userinfo.photo"
              />
              <span class="mobile">{{ userinfo.name }}</span></van-row
            >
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5"
            ><van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
              ><van-button round size="mini" class="edit-btn"
                >编辑按钮</van-button
              ></van-row
            ></van-col
          >
        </van-row>
        <van-row
          ><van-grid class="grid" :border="false">
            <van-grid-item text="头条"
              ><template #icon>{{
                userinfo.art_count
              }}</template></van-grid-item
            >
            <van-grid-item text="粉丝"
              ><template #icon>{{
                userinfo.fans_count
              }}</template></van-grid-item
            >
            <van-grid-item text="关注"
              ><template #icon>{{
                userinfo.follow_count
              }}</template></van-grid-item
            >
            <van-grid-item text="获赞"
              ><template #icon>{{
                userinfo.like_count
              }}</template></van-grid-item
            >
          </van-grid></van-row
        >
      </div>

      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <div class="text">登录 / 注册</div>
      </div>
    </header>
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏"
          ><template #icon>
            <span class="toutiao toutiaoshoucang"></span></template
        ></van-grid-item>
        <van-grid-item text="历史"
          ><template #icon> <span class="toutiao toutiaolishi"></span></template
        ></van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <footer>
      <van-button style="color: red" block v-if="isLogin" @click="logout"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import { getuserinfo } from '@/api'
export default {
  name: 'my',
  computed: {
    ...mapGetters(['isLogin'])
  },
  data() {
    return {
      mobileSrc,
      userinfo: {}
    }
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头疼',
        message: '是否确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getinfo() {
      if (!this.isLogin) return
      try {
        const { data } = await getuserinfo()
        console.log(data)
        this.userinfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('参数错误')
        } else {
          throw error
        }
      }
    }
  },
  created() {
    this.getinfo()
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiaoshoucang {
    color: red;
  }
  .toutiaolishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.3333rem;
  background: url('@/assets/images/banner.png') no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666666;
  }
  :deep(.grid) {
    color: #fff;
    font-size: 30px;
    .van-grid-item__content {
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
