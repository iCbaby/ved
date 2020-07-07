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

     <!-- 新建KLS PDP dialog -->
    <el-dialog title="新建KLS PDP" :visible.sync="createPdpdialogVisible" width="30%" :before-close="handleClose">
      <div>
        <h5 style="color: #f13b3b">文件夹路径 如：/detailkie/1/KLS00011/</h5>
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
      codeInput: `<link rel="stylesheet" type="text/css" href="lib/css/kiehls-landingpagecommon.css?$staticlink$">
<link rel="stylesheet" type="text/css" href="detailkie/1/KLS00011/KLS00011.css?$staticlink$">
<!-- 1.Internal Image : <img src="xxx.jpg?$staticlink$"/> -->
<!-- 2.Category landing page: <a href="$url('Search-Show','cgid','makeup')$"></a> -->
<!-- 3.Product Detail page ：<a href="$url('Product-Show','pid','SHU100001')$"></a> -->
<!-- 4.Content Asset ： <a href="$url('Page-Show','cid','how-to-use')$"></a> -->
<!-- 5.Content library： <a href="$url('Search-Show','fdid','learn-howto')$"></a> -->
<!-- 6.External link： <a href="external URL"></a> -->

<!-- <div class="mask"></div>
<div class="videowrapper">
    <a href="javascript:;" class="closeVideoBtn">
        <img class="closeimg" src="lib/css/popclose.png?$staticlink$" alt="">
    </a>
    <div id="popupvideo"></div>
</div> -->

<!-- PC -->
<div class="LPpc landingpage" id="pcsrc">
    <div class="pc-block part1">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc01.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part2">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc02.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part3">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc03.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part4">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc04.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part5">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc05.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part6-1">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc06-1.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part6-2">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc06-2.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part7">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc07-1.jpg?$staticlink$" alt="">
    </div>
    <div class="pc-block part8">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc08.jpg?$staticlink$" alt="">
        <a class="alink alink1" href="$url('Product-Show','pid','KLS00007')$" target="_blank"></a>
        <a class="alink btn1 js-button_shop_now" href="$url('Product-Show','pid','KLS00007')$"></a>
    </div>
    <div class="pc-block part9">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc09.jpg?$staticlink$" alt="">
        <a class="alink alink1" href="$url('Product-Show','pid','KLS00014')$" target="_blank"></a>
        <a class="alink btn1 js-button_shop_now" href="$url('Product-Show','pid','KLS00014')$"></a>
    </div>
    <div class="pc-block part10">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc10.jpg?$staticlink$" alt="">
        <a class="alink alink1" href="$url('Product-Show','pid','KLS00025')$" target="_blank"></a>
        <a class="alink btn1 js-button_shop_now" href="$url('Product-Show','pid','KLS00025')$"></a>
    </div>
    <div class="pc-block part11">
        <img class="changesrc" pc-src="detailkie/1/KLS00011/pc11.jpg?$staticlink$" alt="">
    </div>
</div>

<!-- MOB -->
<div class="LPmob landingpage">
    <div class="mobile-block mpart1">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb01.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart2">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb02.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart3">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb03.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart4">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb04.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart5">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb05.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart6-1">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb06-1.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart6-2">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb06-2.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart7">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb07-1.jpg?$staticlink$" alt="">
    </div>
    <div class="mobile-block mpart8">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb08.jpg?$staticlink$" alt="">
        <a class="alink alink1" href="$url('Product-Show','pid','KLS00007')$" target="_blank"></a>
        <a class="alink btn1 js-button_shop_now" href="$url('Product-Show','pid','KLS00007')$"></a>
    </div>
    <div class="mobile-block mpart9">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb09.jpg?$staticlink$" alt="">
        <a class="alink alink1" href="$url('Product-Show','pid','KLS00014')$" target="_blank"></a>
        <a class="alink btn1 js-button_shop_now" href="$url('Product-Show','pid','KLS00014')$"></a>
    </div>
    <div class="mobile-block mpart10">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb10.jpg?$staticlink$" alt="">
        <a class="alink alink1" href="$url('Product-Show','pid','KLS00025')$" target="_blank"></a>
        <a class="alink btn1 js-button_shop_now" href="$url('Product-Show','pid','KLS00025')$"></a>
    </div>
    <div class="mobile-block mpart11">
        <img class="changesrc" mb-src="detailkie/1/KLS00011/mb11.jpg?$staticlink$" alt="">
    </div>
</div>`
    }
  },
  computed: {
    pdpTemplate () {
      return `<link rel="stylesheet" type="text/css" href="lib/css/kiehls-landingpagecommon.css?$staticlink$">
<!-- 1.Internal Image : <img src="xxx.jpg?$staticlink$"/> -->
<!-- 2.Category landing page: <a href="$url('Search-Show','cgid','makeup')$"></a> -->
<!-- 3.Product Detail page ：<a href="$url('Product-Show','pid','SHU100001')$"></a> -->
<!-- 4.Content Asset ： <a href="$url('Page-Show','cid','how-to-use')$"></a> -->
<!-- 5.Content library： <a href="$url('Search-Show','fdid','learn-howto')$"></a> -->
<!-- 6.External link： <a href="external URL"></a> -->
<!--landing_pc -->
<div class="LPpc landingpage">
</div>

<!--landing_mobile -->
 <div class="LPmob landingpage">
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
