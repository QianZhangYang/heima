<template>
  <div>
    <art-item
      v-for="item in artlists"
      :key="item.art_id"
      :art="item"
    ></art-item>
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
      artlists: []
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
    }
  }
}
</script>

<style></style>
