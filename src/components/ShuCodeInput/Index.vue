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
      @click="showCreatePdpDialog"
    > 新建 </el-button>
    <h2>{{toolsname}}</h2>

     <!-- 新建SHU PDP dialog -->
    <el-dialog title="新建SHU PDP" :visible.sync="createPdpdialogVisible" width="30%" :before-close="handleClose">
      <div>
        <h5 style="color: #f13b3b">文件夹路径 如：/pdp/SHU00084/</h5>
        <el-input v-model="pdpUrlInput" size="mini" placeholder="请输入文件夹路径" />
        <h5 style="color: #f13b3b">图片名称请输入序号前的名称 所有图片序号必须从01开始递增</h5>
        <h5 style="color: #f13b3b">pc端图片名称 如：pc01.jpg 则输入pc</h5>
        <h5 style="color: #f13b3b">mb端图片名称 如：mb01.jpg 则输入mb</h5>
        <el-input v-model="pdpPcImgName" size="mini" placeholder="请输入pc端图片名称" style="margin-top: 10px; width: 48.5%" />
        <el-input v-model="pdpMobImgName" size="mini" placeholder="请输入mb端图片名称" style="margin-top: 10px; margin-left: 2.5%; width: 48.5%" />
      </div>
      <h5 style="color: #f13b3b; margin-bottom: 0px">选择数量，将从01开始递增生成图片</h5>
      <span>pc:</span>
      <el-input-number v-model="pcImgCounts" :min="1" :max="100" size="mini" style="margin-top: 15px; margin-left: 5px"></el-input-number>
      <span style="margin-left: 15px">mb:</span>
      <el-input-number v-model="mbImgCounts" :min="1" :max="100" size="mini" style="margin-top: 15px; margin-left: 5px"></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="createShuPdp">确定</el-button>
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
      pcImgCounts: 1,
      mbImgCounts: 1,
      pdpPcImgName: '',
      pdpMobImgName: '',
      createStatus: false,
      createPdpdialogVisible: false,
      pdpUrlInput: '',
      codeInput: ''
    }
  },
  computed: {
    pdpTemplate () {
      return `<link rel="stylesheet" href="lib/shuuemura-landingpagecommon.css?$staticlink$">
<!-- 1.Internal Image : <img src="xxx.jpg?$staticlink$"/> -->
<!-- 2.Category landing page: <a href="$url('Search-Show','cgid','makeup')$"></a> -->
<!-- 3.Product Detail page ：<a href="$url('Product-Show','pid','SHU100001')$"></a> -->
<!-- 4.Content Asset ： <a href="$url('Page-Show','cid','how-to-use')$"></a> -->
<!-- 5.Content library： <a href="$url('Search-Show','fdid','learn-howto')$"></a> -->
<!-- 6.External link： <a href="external URL"></a> -->
<p class="pdp-title">产品详情</p>
<!--landing_pc -->
<div class="LPpc landingpage-pc">
</div>

<!--landing_mobile -->
 <div class="LPmob landingpage-mob">
  </div>`
    }
  },
  methods: {
    sendCode () {
      this.createStatus = false
      this.$emit('getCode', {
        code: this.codeInput.trim()
      })
    },
    showCreatePdpDialog () {
      this.createPdpdialogVisible = true
    },
    handleClose () {
      this.pdpUrlInput = ''
      this.pdpPcImgName = ''
      this.pdpMobImgName = ''
      this.pcImgCounts = 1
      this.mbImgCounts = 1
      this.createPdpdialogVisible = false
      this.createStatus = false
    },
    createShuPdp () {
      this.createStatus = true
      this.$emit('getCode', {
        code: this.pdpTemplate.trim(),
        urlPrefix: this.pdpUrlInput,
        pcImgCounts: this.pcImgCounts,
        mbImgCounts: this.mbImgCounts,
        createStatus: this.createStatus,
        pdpUrlInput: this.pdpUrlInput,
        pdpPcImgName: this.pdpPcImgName,
        pdpMobImgName: this.pdpMobImgName
      })
      this.handleClose()
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
