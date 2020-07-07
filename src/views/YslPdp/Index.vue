<template>
  <div id="yslPdp">
    <div class="left-section">
      <div class="codeInputWrapper">
        <CodeInput @getCode="setCode" toolsname="YSL-PDP" />
      </div>
    </div>
    <div class="middle-section">
      <ControlPanel ref="ControlPanel" @getPreviewCode="setPreviewCode" />
    </div>
    <div class="right-section">
      <ConverToHtml ref="ChangeToHtml" />
    </div>
  </div>
</template>

<script>
import CodeInput from '@c/CodeInput/Index'
import ControlPanel from '@c/ControlPanel/Index'
import ConverToHtml from '@c/ChangeToHtml/Index'

export default {
  name: 'YslPdp',
  components: {
    CodeInput,
    ControlPanel,
    ConverToHtml
  },
  data () {
    return {
      originHtml: '',
      finalHtml: ''
    }
  },
  methods: {
    setCode (val) {
      this.$refs.ControlPanel.setHtml({ ...val })
      this.$refs.ChangeToHtml.setHtml({ ...val })
    },
    setPreviewCode (val) {
      this.$refs.ChangeToHtml.setHtml({ ...val })
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
#yslPdp {
  display: flex;

  .left-section {
    flex: 0 0 7%;
    width: 7%;
  }

  .middle-section {
    flex: 0 0 25%;
    width: 25%;
    margin: 0 4% 0 1%;
  }

  .right-section {
    flex: 0 0 60%;
    width: 60%;
  }
}
</style>
