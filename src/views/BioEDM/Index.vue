<template>
  <div id="BioEDM">
    <div class="left-section">
      <div class="codeInputWrapper">
        <CodeInput @getCode="setCode" toolsname="EDM" />
      </div>
    </div>
    <div class="middle-section">
      <ControlPanel ref="ControlPanel" @getPreviewCode="setPreviewCode" />
    </div>
  </div>
</template>

<script>
import CodeInput from '@c/BioEDMCodeInput/Index'
import ControlPanel from '@c/BioEDMControlPanel/Index'
// import ConverToHtml from '@c/EDMChangeToHtml/Index'

export default {
  name: 'BioEDM',
  components: {
    CodeInput,
    ControlPanel
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
    },
    setPreviewCode (val) {
    }
  },
  created () {
  }
}
</script>

<style lang="stylus" scoped>
#BioEDM {
  position relative
  width: 100%;
  height: 100%;

  .left-section {
    position: absolute;
    flex: 0 0 7%;
    width: 7%;
  }

  .middle-section {
    position: absolute;
    flex: 0 0 25%;
    width: 80%;
    left: 13.5%
    margin: 0 4% 0 1%;
  }

  .right-section {
    flex: 0 0 60%;
    width: 60%;
  }
}
</style>
