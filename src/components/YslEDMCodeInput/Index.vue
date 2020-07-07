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
      return `<!DOCTYPE hmtl>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1, maximum-scale=1">
</head>

<body bgcolor="#000000">
    <table border="0" cellpadding="0" cellspacing="0" width="550" align="center" bgcolor="#000000"
        style="font-family: '宋体',sans-serif;">
        <tr>
            <td>
                <!-- header -->
                <table border="0" cellpadding="0" cellspacing="0" width="550" height="24" align="center"
                    bgcolor="#000000">
                    <tr>
                        <td width="550" style="color:#ffffff;font-size:12px;">
                            以爱为妆，尽显锋芒<br />8.2-8.4每日19:00起前十名下单七夕限定礼盒加赠限量反转巴黎香薰蜡烛，<br />满520即享刻字礼遇 <a
                                href="https://www.yslbeautycn.com/landingpage/2019-CVD-lip?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                target="_blank" style="font-size: 12px;color:#ffffff;">立即购买>></a>
                        </td>
                    </tr>
                </table>
                <!-- navigation -->
                <table border="0" cellpadding="0" cellspacing="0" width="550" align="center" bgcolor="#000000">
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="550" height="10" align="center"
                                bgcolor="#000000">
                                <tr>
                                    <td width="550" height="10"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <table border="0" cellpadding="0" cellspacing="0" width="550" height="20" align="center"
                            bgcolor="#000000">
                            <tr>
                                <td width="137" align="center" style="border-right: 1px solid #808080;">
                                    <a href="https://www.yslbeautycn.com/makeup/?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                        target="_blank"
                                        style="font-size: 12px;color: #ffffff;text-decoration: none;">彩妆</a>
                                </td>
                                <td width="137" align="center" style="border-right: 1px solid #808080;">
                                    <a href="https://www.yslbeautycn.com/skincare/?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                        target="_blank"
                                        style="font-size: 12px;color: #ffffff;text-decoration: none;">护肤</a>
                                </td>
                                <td width="137" align="center" style="border-right: 1px solid #808080;">
                                    <a href="https://www.yslbeautycn.com/fragrance/?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                        target="_blank"
                                        style="font-size: 12px;color: #ffffff;text-decoration: none;">香水</a>
                                </td>
                                <td width="136" align="center">
                                    <a href="https://www.yslbeautycn.com/gifts/?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                        target="_blank"
                                        style="font-size: 12px;color: #ffffff;text-decoration: none;">尊贵礼盒</a>
                                </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="550" height="10" align="center"
                                bgcolor="#000000">
                                <tr>
                                    <td width="550" height="10"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- content -->
                <table border="0" cellpadding="0" cellspacing="0" width="550" align="center">
                    <tr>
                        <td width="550">
                            <a href="https://www.yslbeautycn.com/item/00337YSL?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                target="_blank">
                                <img src="./img/YSL_template.png" alt=""
                                    width="550" height="688" style="display: block;border: none;">
                            </a>
                        </td>
                    </tr>
                </table>

                <!-- footer -->
                <table border="0" cellpadding="0" cellspacing="0" width="550" align="center">
                    <tr>
                      <td width="550">
                        <table border="0" cellpadding="0" cellspacing="0" width="550" align="center">
                          <tr>
                            <td width="550">
                                <a href="https://www.yslbeautycn.com/?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                    target="_blank">
                                    <img src="http://www.i4sp.cn/YSL/nurun/20141014-open/08v2.jpg"
                                        alt="100%官方正品 免费试用装 多种支付方式 官方网购独享" width="550" height="108"
                                        style="display: block;border: none;">
                                </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="550" height="84" align="center"
                    bgcolor="#1a1a1a">
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="156" align="left">
                                <tr>
                                    <td width="156" height="64">
                                        <a href="https://www.yslbeautycn.com/?utm_source=ysl-edm&utm_medium=email&utm_campaign=E_YSL-edm-20190731-CVD-LIP"
                                            target="_blank">
                                            <img src="http://www.i4sp.cn/YSL/images/YSL_07007_15_02.jpg"
                                                alt="YVESSAINTLAURENT" width="156" height="64"
                                                style="display: block;border: none;">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" width="394" align="right">
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" width="190" align="left">
                                            <tr>
                                                <td width="190" height="30"></td>
                                            </tr>
                                            <tr>
                                                <td width="190" height="24"
                                                    style="font-size: 12px;color: #666666;text-align: right">
                                                    关注我们了解更多圣罗兰信息:</td>
                                            </tr>
                                            <tr>
                                                <td width="190" height="30"></td>
                                            </tr>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="171" align="right">
                                            <tr>
                                                <td width="38" height="64">
                                                    <a href="https://weibo.com/yslbeauty" target="_blank">
                                                        <img src="http://www.i4sp.cn/YSL/images/YSL_07007_19.jpg"
                                                            alt="微博" width="38" height="64"
                                                            style="display: block;border: none;">
                                                    </a>
                                                </td>
                                                <td width="41" height="64">
                                                    <img src="http://www.i4sp.cn/YSL/images/YSL_07007_20.jpg" alt="微信"
                                                        width="41" height="64" style="display: block;border: none;">
                                                </td>
                                                <td width="92" height="84">
                                                    <img src="http://www.i4sp.cn/YSL/nurun/20150313-touche-eclat/ysl_09.jpg"
                                                        alt="二维码" width="92" height="84"
                                                        style="display: block;border: none;">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="550" align="center" bgcolor="#000000"
                    style="color: #656565;font-size: 12px;">
                    <tr>
                        <td height="20" align="center"></td>
                    </tr>
                    <tr>
                        <td height="20" align="center">联系我们：客服 866-725-6791 邮箱 <a href="mailto:ysl@cs.yslbeautycn.com"
                                target="_blank" style="color: #656565;text-decoration: none;">ysl@cs.yslbeautycn.com</a>
                        </td>
                    </tr>
                    <tr>
                        <td height="20" align="center">(工作日 9am - 6pm 周末 10am-4pm)</td>
                    </tr>
                    <tr>
                        <td height="20" align="center">本邮件由圣罗兰美妆官网系统自动发出，请勿直接回复！</td>
                    </tr>
                    <tr>
                        <td height="20" align="center">为了确保您能收到来自圣罗兰美妆的最新资讯，</td>
                    </tr>
                    <tr>
                        <td height="20" align="center">我们建议您将 <a href="mailto:ysl@cs.yslbeautycn.com"
                                style="color: #656565;">ysl@cs.yslbeautycn.com</a> 加入您的收件人名单</td>
                    </tr>
                    <tr>
                        <td height="20" align="center">如果您对我们的邮件不感兴趣，您可以通过 <a href="$unsubUrl$" target="_blank"
                                style="color: #656565;">点击此处</a> 进行退订</td>
                    </tr>
                    <tr>
                        <td height="20" align="center"></td>
                    </tr>
                    <tr>
                        <td height="20" align="center">Copyright ©️ 欧莱雅（中国）有限公司. 圣罗兰美妆有限公司版权所有</td>
                    </tr>
                    <tr>
                        <td height="20" align="center">沪ICP证08100043号</td>
                    </tr>
                    <tr>
                        <td height="20" align="center"></td>
                    </tr>
                </table>
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
