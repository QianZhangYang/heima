<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        class="search"
        @search="onsearch"
        @focus="isshowresult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <component
      :is="componentName"
      :keywords="keywords"
      @changeKey="onsearch"
    ></component>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import searchhistroy from '@/views/search/components/searchhistroy.vue'
import searchresult from '@/views/search/components/searchresult.vue'
import searchsuggestion from '@/views/search/components/searchsuggestion.vue'
export default {
  components: {
    searchhistroy,
    searchresult,
    searchsuggestion
  },
  data() {
    return {
      keywords: '',
      isshowresult: false
    }
  },
  computed: {
    ...mapState(['historys']),
    componentName() {
      if (this.keywords && this.isshowresult) return 'searchresult'
      if (this.keywords) return 'searchsuggestion'
      return 'searchhistroy'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTROYS']),
    onsearch(keywords) {
      this.keywords = keywords
      this.isshowresult = true
      this.SET_HISTROYS([...new Set([keywords, ...this.historys])])
    }
  }
}
</script>

<style scoped lang="less">
[role='button'] {
  color: #fff;
}
</style>
