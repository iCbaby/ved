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
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="user-scalable=no,width=device-width, initial-scale=1, maximum-scale=1">
</head>
<body style="margin: 0px;">
  <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="770">
    <tr>
      <td style="font-family: &#x5B8B;">
        <!-- massage bar -->
        <table bgcolor="#f7f7f7" border="0" cellpadding="0" cellspacing="0" height="36"
          style="color: #8c8573; font: normal 12px/1.5 &#x5B8B;" width="770">
          <tr height="10">
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>
              <table bgcolor="#f7f7f7" border="0" cellpadding="0" cellspacing="0" align="center" width="96%">
                <tr>
                  <td style="color: rgb(239, 149, 13);font-size:12px"> 宠爱大放送，至高臻享7件礼 <a
                      href="https://www.clarisonic.cn/landing/activelp.html?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                      style="color: rgb(239, 149, 13); text-decoration: underline;" target="_blank">立即进入>></a></td>
                  <td align="right" style="font-size:12px">订购/咨询热线： 400-820-4575</td>
                </tr>
                <tr>
                  <td style="font-size:12px">如果您无法阅读此邮件<a href="$mirrorUrl$"
                      style="color: #aba698; text-decoration: underline;" target="_blank">请点击此处！</a></td>
                  <td align="right" style="color: rgb(239, 149, 0);font-size:12px">全场免运费</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr height="10">
            <td>&nbsp;</td>
          </tr>
        </table>
        <!-- massage bar -->
        <!-- logo bar -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="770">
          <tr>
            <td><a
                href="http://www.clarisonic.cn?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                target="_blank" title=""><img alt="" border="0" height="124"
                  src="http://file.splio3.fr/7D2/zI/Vkms/toplogo.jpg" style="display: block;" width="770" /></a></td>
          </tr>
        </table>
        <!-- logo bar -->
        <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" height="60"
          style="font-size: 14px; text-align: left;" width="770">
          <tr>
            <td><img alt="&#x673A;&#x5668;" border="0" height="43" src="http://file.splio4.com/73G/0b/MkEW/cc_01.jpg"
                style="display: block;" width="84" /></td>
            <td><a
                href="https://www.clarisonic.cn/devices/?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                style="color: #9b998d; text-decoration: none;" target="_blank"> <img alt="&#x673A;&#x5668;" border="0"
                  height="43" src="http://file.splio4.com/73G/0b/MkEW/cc_02.jpg" style="display: block;" width="127" />
              </a>
            </td>
            <td><a
                href="https://www.clarisonic.cn/search/?cgid=FaceMaster&utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                style="color: #9b998d; text-decoration: none;" target="_blank"> <img alt="&#x673A;&#x5668;" border="0"
                  height="43" src="http://file.splio4.com/73G/0b/MkEW/cc_03.jpg" style="display: block;" width="119" />
              </a>
            </td>
            <td><a
                href="https://www.clarisonic.cn/brush-heads/?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                style="color: #9b998d; text-decoration: none;" target="_blank"> <img alt="&#x673A;&#x5668;" border="0"
                  height="43" src="http://file.splio4.com/73G/0b/MkEW/cc_04.jpg" style="display: block;" width="117" />
              </a>
            </td>
            <td><a
                href="https://www.clarisonic.cn/get-started/clarisonic-video-library/what-is-clarisonic-video-library.html?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                style="color: #9b998d; text-decoration: none;" target="_blank"> <img alt="&#x673A;&#x5668;" border="0"
                  height="43" src="http://file.splio4.com/73G/0b/MkEW/cc_05.jpg" style="display: block;" width="109" />
              </a>
            </td>
            <td><a
                href="https://www.clarisonic.cn/get-started/how-to-use-clarisonic/clarisonic-owners-how-to-use-clarisonic.html?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                style="color: #9b998d; text-decoration: none;" target="_blank"> <img alt="&#x673A;&#x5668;" border="0"
                  height="43" src="http://file.splio4.com/73G/0b/MkEW/cc_06.jpg" style="display: block;" width="110" />
              </a>
            </td>
            <td><img alt="&#x673A;&#x5668;" border="0" height="43" src="http://file.splio4.com/73G/0b/MkEW/cc_07.jpg"
                style="display: block;" width="104" /></td>
          </tr>
        </table>


        <!-- Web Slices -->
        <table border="0" cellpadding="0" cellspacing="0" height="" width="770">
          <tr>
            <td align="center">
              <a href="https://www.clarisonic.cn/product/CLAGWT1002.html?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                target="_blank">
                <img alt="" src="./img/CLA_template.jpg" style="display:block;border:0;" title="" width="770" height="907" />
              </a>
            </td>
          </tr>
        </table>


        <table border="0" cellpadding="0" cellspacing="0" style="background:#f2f2f2;color: #9e9a8e; font-size: 14px;"
          width="770">
          <tbody>
            <tr>
              <td width="35">
              </td>
              <td align="center" height="57" width="108"><a
                  href="http://www.clarisonic.cn?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                  target="_blank"> <img alt="&#x5168;&#x573A;&#x514D;&#x8FD0;&#x8D39;" border="0" height="57"
                    src="http://file.splio4.com/6uT/KN/249s/E_Clarisonic_edm-bottom_20151223_01.jpg"
                    style="display: block;" width="108" /> </a></td>
              <td height="57" width="104"><a
                  href="http://www.clarisonic.cn?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                  style="color: #9e9a8e; text-decoration: none;" target="_blank">全场免运费</a>
              </td>
              <td height="57" width="112"><a
                  href="http://www.clarisonic.cn?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                  target="_blank"> <img alt="&#x591A;&#x79CD;&#x4ED8;&#x6B3E;&#x65B9;&#x5F0F;" border="0" height="57"
                    src="http://file.splio4.com/6uT/KN/249s/E_Clarisonic_edm-bottom_20151223_03.jpg"
                    style="display: block;" width="112" /> </a></td>
              <td height="57" width="91"><a
                  href="http://www.clarisonic.cn?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                  style="color: #9e9a8e; text-decoration: none;" target="_blank">多种付款方式</a></td>
              <td height="57" width="112"><a
                  href="http://www.clarisonic.cn?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                  target="_blank"> <img alt="100%&#x539F;&#x88C5;&#x8FDB;&#x53E3;" border="0" height="57"
                    src="http://file.splio4.com/6uT/KN/249s/E_Clarisonic_edm-bottom_20151223_05.jpg"
                    style="display: block;" width="112" /> </a></td>
              <td height="57" width="173"><a
                  href="http://www.clarisonic.cn?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                  style="color: #9e9a8e; text-decoration: none;" target="_blank">100%原装进口</a></td>
              <td width="25">
              </td>
            </tr>
          </tbody>
        </table>
        <table bgcolor="#fafafa" border="0" cellpadding="0" cellspacing="0" width="770">
          <tbody>
            <tr>
              <td align="center" height="56" style="text-align: center;" width="700"><a
                  href="http://weibo.com/clarisonicchina" target="_blank" title="新浪微博"><img alt="新浪微博" border="0"
                    height="56" src="http://file.splio4.com/6uT/KN/249s/E_Clarisonic-edm-20150814-smartlove_10_01.jpg"
                    style="display: block;" title="新浪微博" width="700"></a></td>
            </tr>
            <tr>
              <td style="text-align: center;font-size:12px"><a
                  href="http://www.clarisonic.cn/landing/activelp.html?utm_source=clarisonic-edm&utm_medium=email&utm_campaign=CLA-20200316"
                  style="color: #999; font: normal 12px/1.5 宋 text-decoration：underline;"
                  target="_blank">您收到此邮件是由于购买过欧莱雅集团旗下品牌高档化妆品*</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="color: #999; font: normal 12px/1.5 宋; text-align:center;font-size:12px"
                valign="bottom">
                如果您不愿再收到本讯息，<a href="$unsubUrl$" style="color: rgb(239, 149, 0); text-decoration: underline;"
                  target="_blank">请点击此处</a></td>
            </tr>
            <tr height="10">
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <!-- bottom -->
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
