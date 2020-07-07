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
      return `<html>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
</head>

<body>
  <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF"
    style="font-size:12px;">
    <tr>
      <td height="30" align="left" valign="middle" bgcolor="#fff"
        style="color:#999;font-family:Arial,sans-serif; padding-left:10px;background:#fff">
        <a href="https://www.giorgioarmanibeauty.cn?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314&utm_content=textlink"
          target="_blank" style="color:red;text-decoration:none">

          如果您无法预览邮件，
        </a>
        <a href="$mirrorUrl$" target="_blank" style="color:#999;text-decoration:underline;">请点击这里</a>
      </td>
    </tr>
    <tr>
      <td align="left" valign="middle" bgcolor="#fff">
        <img src="http://file.splio4.com/7Ay/pP/wNnk/top.jpg" title="GIORGIO ARMANI beauty" alt="GIORGIO ARMANI beauty"
          style="display:block;" />
      </td>
    </tr>

    <tr>
      <td bgcolor="#000000" height="60">
        <table width="700" border="0" cellpadding="0" cellspacing="0" align="center" style="font-size:18px;"
          bgcolor="#000000">
          <tr>
            <td width="175" height="60" align="center" valign="middle">
              <a style="color:#fff;text-decoration:none"
                href="https://www.giorgioarmanibeauty.cn/make_up/?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314&utm_content=musthaves"
                target="_blank">彩妆专区</a>
            </td>
            <td width="175" height="60" align="center" valign="middle">
              <a style="color:#fff;text-decoration:none"
                href="https://www.giorgioarmanibeauty.cn/skincare/?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314&utm_content=skincare"
                target="_blank">护肤专区</a>
            </td>
            <td width="175" height="60" align="center" valign="middle">
              <a style="color:#fff;text-decoration:none"
                href="https://www.giorgioarmanibeauty.cn/fragrances/?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314&utm_content=makeup"
                target="_blank">香水专区</a>
            </td>
            <td width="175" height="60" align="center" valign="middle">
              <a style="color:#fff;text-decoration:none"
                href="https://www.giorgioarmanibeauty.cn/landing-pages/170606courtesy.html?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314&utm_content=fragrances"
                target="_blank">官方礼遇</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- kv -->
    <tr>
      <td width="700">
        <a href="https://www.giorgioarmanibeauty.cn/landing-pages/20200314vd.html?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314"
          target="_blank">
          <img src="./img/GA_KV_01_template.jpg" width="700" height="395" alt="" border="0" />
        </a>
      </td>
    </tr>
    <tr>
      <td width="700">
        <a href="https://www.giorgioarmanibeauty.cn/landing-pages/20200314vd.html?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314"
          target="_blank">
          <img src="./img/GA_KV_02_template.jpg" width="700" height="391" alt="" border="0" />
        </a>
      </td>
    </tr>
    <!-- /kv -->
    <!-- 商品 -->
    <tr>
      <td width="700">
        <a href="https://www.giorgioarmanibeauty.cn/product/GAC30083.html?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314" target="_blank">
          <img src="./img/GA_template.jpg" width="700" height="769" alt="" border="0" />
        </a>
      </td>
    </tr>
    <tr>
      <td width="700">
        <a href="https://www.giorgioarmanibeauty.cn/?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314"
          target="_blank">
          <img src="./img/GA_footer_template.jpg" width="700" height="119" alt="" border="0" />
        </a>
      </td>
    </tr>
  </table>
  <!--尾部-->
  <table width="700" border="0" cellpadding="0" cellspacing="0" align="center">
    <tr>
      <td width="700" height="119">
        <a title="100%官方正品保证,所有订单免运费,在线独家精美礼品,全国范围送货支持货到付款,全国贵宾热线400-820-4888"
          href="https://www.giorgioarmanibeauty.cn?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314"
          target="_blank">
          <img style="display:block;" src="http://file.splio4.com/7Fb/FX/4WhL/icon2.jpg"
            alt="100%官方正品保证,所有订单免运费,在线独家精美礼品,全国范围送货支持货到付款,全国贵宾热线400-820-4888" width="700" height="138" border="0" />
        </a>
      </td>
    </tr>
    <tr>
      <td height="80" align="center" valign="middle"
        style="color:#999;font-size:12px;line-height:18px;font-family:Arial,sans-serif;" bgcolor="#FFFFFF">
        如果您有任何问题，请拨打免费订购咨询热线：
        <span style="color:red;">400 820 4888</span>
        ，联系我们或
        <a href="https://www.giorgioarmanibeauty.cn?utm_source=gac-edm&utm_medium=email&utm_campaign=armani-edm-whitevd20200314"
          target="_blank" style="color:red;text-decoration:none;">登录我们的网站</a>
        <br />
        如果您不愿再收到本讯息，
        <a href="$unsubUrl$" target="_blank" style="color:red;text-decoration:underline;">请点击此处</a>
        <a title="开心网" href="https://www.kaixin001.com/giorgioarmani" target="_blank"></a>
        <a title="新浪微博" href="https://weibo.com/giorgioarmanibeauty" target="_blank"></a>
      </td>
    </tr>
  </table>
</body>

</html>`
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
