<template>
  <div id="app-conver-to-html">
    <div v-if="insertdHtml" v-html="insertdHtml" />
  </div>
</template>

<script>
export default {
  name: 'ConverToHtml',
  components: {},
  data () {
    return {
      insertdHtml: ''
    }
  },
  created () {
    this.onJqHandler()
  },
  beforeDestroy () {
    this.offJqHandler()
  },
  methods: {
    setHtml (val) {
      this.insertdHtml = val.code
    },
    onJqHandler () {
      $('body').on('click', '#app-conver-to-html .landtab .span1', function () {
        const indexv = $(this).index()
        $('#app-conver-to-html .landtabwrap .tab1').hide().eq(indexv).fadeIn()
      })
      $('body').on('click', '#app-conver-to-html .landtab .span2', function () {
        const indexv = $(this).index()
        $('#app-conver-to-html .landtabwrap .tab2').hide().eq(indexv).fadeIn()
        $('#app-conver-to-html .landtabwrap .tabTwo').hide().eq(indexv).fadeIn()
      })
    },
    offJqHandler () {
      $('body').off('click', '#app-conver-to-html .landtab .span1', function () {
        const indexv = $(this).index()
        $('#app-conver-to-html .landtabwrap .tab1').hide().eq(indexv).fadeIn()
      })
      $('body').off('click', '#app-conver-to-html .landtab .span2', function () {
        const indexv = $(this).index()
        $('#app-conver-to-html .landtabwrap .tab2').hide().eq(indexv).fadeIn()
        $('#app-conver-to-html .landtabwrap .tabTwo').hide().eq(indexv).fadeIn()
      })
    }
  }
}
</script>

<style>
</style>
