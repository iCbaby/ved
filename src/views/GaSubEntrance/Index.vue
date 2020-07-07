<template>
  <div id="dw-sub-entrance">
    <el-button
      v-for="item in tools"
      :key="item.name"
      :type="item.name === 'EDM' ? 'success' : 'primary'"
      class="toolsBtns"
      @click="navigateTo(item.path)">{{item.name}}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'GaSubEntrance',
  components: {},
  data () {
    return {
      tools: [
        {
          name: 'PDP',
          path: '/GaPdp'
        },
        {
          name: 'EDM',
          path: '/GaEDM'
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
#dw-sub-entrance {
  padding: 8px;
  .toolsBtns {
    margin: 16px;
  }
}
</style>
