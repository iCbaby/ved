<template>
  <div id="app-code-input">
    <el-input
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 6}"
      placeholder="请输入内容"
      v-model="codeInput"
    />
    <el-button class="confirm-btn" type="primary" :disabled="!codeInput.length" @click="sendCode">修改</el-button>
    <el-button class="confirm-btn" type="primary" @click="showCreatePdpDialog">新增</el-button>
    <h2>{{toolsname}}</h2>

    <!-- 新建YSL PDP dialog -->
    <el-dialog title="新建YSL PDP" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <div class="alert-text">多图片就换行！左边PC，右边MB！</div>
      <el-input v-model="createPcInput" class="input-area" type="textarea" :rows="8" placeholder="PC图片路径"/>
      <el-input v-model="createMbInput" class="input-area" type="textarea" :rows="8" placeholder="MB图片路径"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :disabled="!createPcInput || !createMbInput" @click="createPdp">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CodeInput',
  props: {
    toolsname: {
      type: String,
      default: 'PDP'
    }
  },
  data () {
    return {
      codeInput: '',
      dialogVisible: false,
      createPcInput: '',
      createMbInput: '',
      pcStr: '',
      mbStr: ''
    }
  },
  computed: {
    createTemplate () {
      const str = `<title></title>
<icicic id="pdp-cms-video-dialog" type="text/template">
    <div class="dialog">
      <div class="dialog-container">
        <div class="pdp-cms-video-box">
        </div>
      </div>
    </div>
</icicic>
<div class="img-box none-sm">${this.pcStr}</div>
<div class="img-box none block-sm">${this.mbStr}</div>
<icicic>
  $('.landtab .span1').click(function () {
    var indexv = $(this).index();
    $('.landtabwrap .tab1').hide().eq(indexv).fadeIn();
  });
  $('.landtab .span2').click(function () {
    var indexv = $(this).index();
    $('.landtabwrap .tab2').hide().eq(indexv).fadeIn();
  });
</icicic>`
      return str.replace(/icicic/g, 'script').trim()
    }
  },
  methods: {
    sendCode () {
      this.$emit('getCode', {
        code: this.codeInput.trim()
      })
    },
    // converCode (val) {
    //   const scriptReg = /<script(([\s\S])*?)<\/script>/g
    //   return {
    //     code: val.replace(scriptReg, '').trim()
    //   }
    // },
    showCreatePdpDialog () {
      this.dialogVisible = true
    },
    createPdp () {
      const createPcImgList = this.createPcInput.split('\n')
      const createMbImgList = this.createMbInput.split('\n')
      let pcStr = ''
      let mbStr = ''
      createPcImgList.forEach(item => {
        pcStr += '<img alt="" src="' + item + '" style="width:inherit;max-width:100%;display:block;margin:0 auto;" />'
      })
      createMbImgList.forEach(item => {
        mbStr += '<img alt="" src="' + item + '" style="width:inherit;max-width:100%;display:block;margin:0 auto;" />'
      })
      this.pcStr = pcStr
      this.mbStr = mbStr

      this.$emit('getCode', {
        code: this.createTemplate
      })
      this.handleClose()
    },
    handleClose () {
      this.dialogVisible = false
      this.createPcInput = ''
      this.createMbInput = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.confirm-btn {
  width: 100%;
  margin: 16px 0 0 0 !important;
}

.alert-text {
  margin-bottom: 16px;
  font-size: 18px;
  color: red;
}

.input-area {
  width: 49%;
}

.input-area + .input-area {
  margin-left: 2%;
}
</style>
