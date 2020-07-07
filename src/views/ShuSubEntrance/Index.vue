<template>
  <div id="dwSubEntrance">
    <el-button
      v-for="item in tools"
      :key="item.name"
      :type="item.name === 'EDM' ? 'success' : 'primary'"
      class="brands-btns"
      @click="navigateTo(item.path)">{{item.name}}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'ShuSubEntrance',
  components: {},
  data () {
    return {
      tools: [
        {
          name: 'PDP',
          path: '/ShuPdp'
        },
        {
          name: 'EDM',
          path: '/ShuEDM'
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
#dwSubEntrance {
  padding: 8px;
}
</style>
