<template>
  <div id="app-index">
    <div class="left-section">
      <div class="codeInputWrapper">
        <CodeInput @getCode="setCode" />
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
import CodeInput from '@/components/codeInput/Index'
import ControlPanel from '@/components/controlPanel/Index'
import ConverToHtml from '@/components/changeToHtml/Index'

export default {
  name: 'Home',
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
#app-index {
  display: flex;

  .left-section {
    flex: 1;
  }

  .middle-section {
    flex: 4;
  }

  .right-section {
    flex: 8;
  }
}
</style>
