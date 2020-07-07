<template>
  <div id="yslSubEntrance">
    <el-button
      v-for="item in tools"
      :key="item.name"
      :type="item.name === 'EDM' ? 'success' : 'primary'"
      class="brands-btns"
      @click="navigateTo(item.path)">{{item.name}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'YslSubEntrance',
  components: {},
  data () {
    return {
      tools: [
        {
          name: 'PDP',
          path: '/YslPdp'
        },
        {
          name: 'EDM',
          path: '/YslEDM'
        }
      ]
    }
  },
  methods: {
    navigateTo (path) {
      this.$router.push({ path })
    }
  },
  created () {}
}
</script>

<style lang="stylus" scoped>
#yslSubEntrance {
  padding: 8px;
}
</style>
