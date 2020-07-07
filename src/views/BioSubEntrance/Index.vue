<template>
  <div id="bioSubEntrance">
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
  name: 'BioSubEntrance',
  components: {},
  data () {
    return {
      tools: [
        {
          name: 'PDP',
          path: '/BioPdp'
        },
        {
          name: 'EDM',
          path: '/BioEDM'
        }
      ]
    }
  },
  methods: {
    navigateTo (path) {
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="stylus" scoped>
#bioSubEntrance {
  padding: 8px;
}
</style>
