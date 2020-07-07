<template>
  <div id="klsPdp">
    <div class="left-section">
      <div class="codeInputWrapper">
        <CodeInput @getCode="setCode" toolsname="KLS-PDP" />
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
import CodeInput from '@c/KlsCodeInput/Index'
import ControlPanel from '@c/KlsControlPanel/Index'
import ConverToHtml from '@c/DwChangeToHtml/Index'

export default {
  name: 'KlsPdp',
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
#klsPdp {
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
