<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>count的十倍{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点我count++</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
console.log(mapState(['count', 'bigNum']))
export default {
  methods: {
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapGetters(['bigNum']),
    ...mapState(['count'])
  }
}
</script>

<style scoped lang="less">
.box {
  width: 700px;
  height: 80px;
  background-color: aqua;
}
</style>
