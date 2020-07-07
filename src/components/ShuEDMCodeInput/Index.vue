<template>
  <div id="app-code-input">
    <el-input
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 6}"
      placeholder="请输入内容"
      v-model="codeInput"
    />
    <el-button
      class="confirm-btn"
      type="primary"
      :disabled="!codeInput.length"
      @click="sendCode"
    >修改</el-button>
    <el-button
      class="confirm-btn"
      type="primary"
      @click="createShuPdp"
    > 新建 </el-button>
    <h2>{{toolsname}}</h2>
  </div>
</template>

<script>
export default {
  name: 'CodeInput',
  props: {
    toolsname: {
      type: String,
      default: 'EDM'
    }
  },
  data () {
    return {
      codeInput: ''
    }
  },
  computed: {
    pdpTemplate () {
      return `<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="user-scalable=no,width=device-width, initial-scale=1, maximum-scale=1">
<table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="700">
  <tbody>
    <tr>
      <td style="font-family: 宋">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="700">
          <tbody>
            <tr>
              <td align="center"><img alt="" border="0" height="223" src="./img/01.jpg" style="display: block;"
                  width="700"></td>
            </tr>
            <tr>
              <td align="center"><img alt="" border="0" height="286" src="./img/SHU_template.jpg" style="display: block;"
                  width="700"></td>
            </tr>
            <tr>
              <td align="center"><img alt="" border="0" height="240" src="./img/05.jpg" style="display: block;"
                  width="700"></td>
            </tr>
          </tbody>
        </table>
       
      </td>
    </tr>
  </tbody>
</table>`
    }
  },
  methods: {
    sendCode () {
      this.$emit('getCode', {
        code: this.codeInput.trim()
      })
    },
    createShuPdp () {
      this.$emit('getCode', {
        code: this.pdpTemplate.trim()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.confirm-btn {
  width: 100%;
  margin: 16px 0 0 0 !important;
}
</style>
