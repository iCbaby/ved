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
  name: 'KlsSubEntrance',
  components: {},
  data () {
    return {
      tools: [
        {
          name: 'PDP',
          path: '/KlsPdp'
        },
        {
          name: 'EDM',
          path: '/KlsEDM'
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
