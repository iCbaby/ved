<template>
  <div id="app-code-input">
    <el-input
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 6}"
      placeholder="请输入内容"
      v-model="codeInput"
    />
    <el-button class="confirm-btn" type="primary" :disabled="!codeInput.length" @click="sendCode">确定</el-button>
  </div>
</template>

<script>
export default {
  name: 'CodeInput',
  data () {
    return {
      codeInput: ''
    }
  },
  methods: {
    sendCode () {
      // const renderCode = this.converCode(this.codeInput)
      // this.$emit('getCode', renderCode)
      this.$emit('getCode', {
        code: this.codeInput.trim()
      })
    },
    converCode (val) {
      const scriptReg = /<script(([\s\S])*?)<\/script>/g
      return {
        code: val.replace(scriptReg, '').trim()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.confirm-btn {
  width: 100%;
  margin-top: 16px;
}
</style>
