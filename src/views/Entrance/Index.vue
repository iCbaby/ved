<template>
  <div id="appEntrance">
    <el-button
      v-for="item in brands"
      :key="item.name"
      :type="item.name === 'LP' ? 'danger' : 'primary'"
      class="brands-btns"
      @click="navigateTo(item.path)">{{item.name}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'AppEntrance',
  components: {},
  data () {
    return {
      brands: [
        {
          name: 'LP',
          path: '/DwLp'
        },
        {
          name: 'YSL',
          path: '/YslSubEntrance'
        },
        {
          name: 'SHU',
          path: '/ShuSubEntrance'
        },
        {
          name: 'BIO',
          path: '/BioSubEntrance'
        },
        {
          name: 'GA',
          path: '/GaSubEntrance'
        },
        {
          name: 'KLS',
          path: '/KlsSubEntrance'
        },
        {
          name: 'CLA',
          path: '/ClaSubEntrance'
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
#appEntrance {
  padding: 8px;
}
</style>
