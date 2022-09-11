<template>
  <div>
    <van-nav-bar title="登录" class="nav-bar" />
    <van-form @submit="onSubmit" class="from" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRule"
      >
        <template #label>
          <span class="toutiao toutiaoshouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRule"
      >
        <template #label>
          <span class="toutiao toutiaoyanzhengma"></span>
        </template>

        <template #button>
          <van-button
            class="btn"
            type="default"
            round
            size="small"
            v-if="isshow"
            @click="codeyz"
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            class="daojishi"
            :time="3 * 1000"
            @finish="isshow = true"
            format="ss秒"
            v-else
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { codeRule, mobileRule } from '@/views/login/rules'
import { login, sendCode } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRule,
      mobileRule,
      isshow: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true,
        duration: 0
      })
    },
    async codeyz() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCode(this.mobile)
        this.$toast.success('短信验证码发送成功')
        this.isshow = false
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.from) {
  .van-cell__value {
    flex: 20;
  }
  .van-cell__title {
    flex: 1;
  }
  .toutiao {
    font-size: 40px;
  }
  .btn {
    color: '#eeeeee';
    height: 0.62rem;
    background-color: #eee;
  }
  .van-count-down {
    height: 0.64rem;
  }
}
</style>
