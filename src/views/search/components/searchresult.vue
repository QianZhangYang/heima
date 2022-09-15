<template>
  <div class="result">
    <van-list
      @load="getResult"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        @click="
          $router.push({
            path: '/detail',
            query: { artticleId: item.art_id }
          })
        "
        v-for="item in results"
        :title="item.title"
        :key="item.art_id"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      loading: false,
      page: 1,
      prePage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResult() {
      try {
        if (Math.random() < 0.5) {
          throw new Error()
        }
        const { data } = await getResultAPI(
          this.page++,
          this.prePage,
          this.keywords
        )
        if (data.data.results.length === 0) {
          this.finished = true
        }
        this.results.push(...data.data.results)
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
