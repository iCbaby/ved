<template>
  <div id="dw-cla-entrance">
    <el-button
      v-for="item in tools"
      :key="item.name" type="success"
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
          name: 'EDM',
          path: '/ClaEDM'
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
#dw-cla-entrance {
  padding: 8px;
  .toolsBtns {
    margin: 16px;
  }
}
</style>
