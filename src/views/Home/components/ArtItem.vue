<template>
  <div>
    <van-cell v-if="art.cover.type === 0" :title="art.title" :label="label" />
    <van-cell
      v-else-if="art.cover.type === 1"
      :title="art.title"
      :label="label"
    >
      <template>
        <van-image width="100" height="100" :src="art.cover.images[0]" />
      </template>
    </van-cell>
    <van-cell v-else :title="art.title">
      <template #label>
        <van-image
          width="100"
          height="100"
          :src="item"
          v-for="(item, index) in art.cover.images"
          :key="index"
        />
        <p>{{ label }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utiles/dayjs'
export default {
  props: {
    art: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {},
  computed: {
    label() {
      return `${this.art.aut_name} ${this.art.comm_count}评论 ${dayjs(
        this.art.pubdate
      ).fromNow()}`
    }
  }
}
</script>

<style></style>
