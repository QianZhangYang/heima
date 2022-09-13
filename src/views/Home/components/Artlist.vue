<template>
  <div class="main">
    <van-pull-refresh v-model="refreshing" @refresh="getNextPage">
      <van-list
        :immediate-check="false"
        v-model="loading"
        offset="100"
        @load="getNextPage"
        :finished="finished"
        :error.sync="error"
        error-text="点击加载"
        finished-text="没有更多文章了~~"
      >
        <art-item
          v-for="item in artlists"
          :key="item.art_id"
          :art="item"
        ></art-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArt } from '@/api'
import ArtItem from '@/views/Home/components/ArtItem.vue'
export default {
  name: 'artlist',
  props: {
    id: [String, Number]
  },
  data() {
    return {
      artlists: [],
      loading: false,
      pageNub: 0,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  components: { ArtItem },
  created() {
    this.getFristPage()
  },
  methods: {
    async getFristPage() {
      try {
        const { data } = await getArt(this.id, +new Date())
        this.artlists = data.data.results
        this.pageNub = data.data.pre_timestamp
        console.log(data)
      } catch (error) {
        if (!error.response || error.response?.status === 507) {
          throw error
        } else {
          if (error.response.status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPage() {
      try {
        const { data } = await getArt(this.id, this.pageNub)
        if (this.loading) {
          this.artlists.push(...data.data.results)
        } else {
          this.artlists.unshift(...data.data.results)
        }
        if (!data.data.pre_timestamp) return (this.finished = true)
        this.pageNub = data.data.pre_timestamp
        console.log(data)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
