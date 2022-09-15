<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in newoptions"
      :key="index"
      @click="$emit('changeKey', options[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: String
  },
  data() {
    return {
      options: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestion'
    }
  },
  computed: {
    newoptions() {
      const Reg = new RegExp(this.keywords, 'ig')
      return this.options.map((item) =>
        item.replace(Reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  },
  methods: {
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSuggestionAPI(this.keywords)
        this.options = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
