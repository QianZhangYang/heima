<template>
  <div>
    <router-view></router-view>
    <van-tabbar class="tabbar" :route="true">
      <van-tabbar-item to="/ "
        >首页
        <template #icon><span class="toutiao toutiaoshouye"></span></template
      ></van-tabbar-item>
      <van-tabbar-item to="/video"
        >视频
        <template #icon><span class="toutiao toutiaoshipin"></span></template
      ></van-tabbar-item>
      <van-tabbar-item to="/qa"
        >问答
        <template #icon><span class="toutiao toutiaowenda"></span></template
      ></van-tabbar-item>
      <van-tabbar-item to="/profile"
        >{{ isLogin ? '我的' : '未登录' }}
        <template #icon><span class="toutiao toutiaowode"></span></template
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
:deep(.tabbar) {
  .toutiao {
    font-size: 40px;
  }
  .van-tabbar-item {
    font-size: 30px;
  }
}
</style>
