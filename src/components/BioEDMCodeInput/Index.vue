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

<body>
    <!-- 顶部文字链 -->
    <table width="608" border="0" cellpadding="0" cellspacing="0" align="center">
      <tr>
        <td valign="middle" align="left" style="color:#808080; font-size:12px;line-height: 20px;">
            <a href="http://www.biotherm.com.cn/landing/2020319.html?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                style="text-decoration:underline;color:#808080;"
                target="_blank">【03.20-03.29店庆大促】全场顺丰包邮（付邮试用除外），精选礼盒限时抢购，TOP明星产品惊喜折价，可叠享无门槛礼及满赠周年礼包(至高价值745元)，立即前往官网了解更多>>>
            </a>
        </td>
      </tr>
      <tr>
          <td valign="middle" align="left" style="color:#808080;font-size:12px;">
              <span style="color:#808080; font-size:12px;">如果您无法预览邮件，</span>
              <a href="$mirrorUrl$" target="_blank"
                  style="text-decoration:underline;color:#3879BA;font-size:12px;">请点击此处</a>
          </td>
      </tr>
    </table>
    <table width="608" height="80" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td width="304" height="80">
            <a href="http://www.biotherm.com.cn?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                target="_blank">
                <img src="http://file.splio4.com/6zE/Bc/eoBB/logoLeft.jpg" width="304" height="80" alt="欢迎访问碧欧泉官网"
                    title="欢迎访问碧欧泉官网" border="0" style="display:block;" />
            </a>
          </td>
          <td width="304" height="80">
            <a href="http://www.biotherm.com.cn?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                target="_blank">
                <img src="http://file.splio4.com/6zE/Bc/eoBB/logoRight.jpg" width="304" height="80" alt="欢迎访问碧欧泉官网"
                    title="欢迎访问碧欧泉官网" border="0" style="display:block;" />
            </a>
          </td>
        </tr>
    </table>
    <table width="608" height="32" border="0" cellpadding="0" cellspacing="0" align="center"
        style="font-size:12px;text-align:center;background:#ffffff;">
        <tr>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/landing/trybuysamples.html?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">免费试用</a>
            </td>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/category/women-bycategory/?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">脸部护理</a>
            </td>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/category/body-bycategory/?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">身体护理</a>
            </td>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/category/bycategory1/?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">防晒隔离</a>
            </td>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/category/mostloved-1/?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">明星产品</a>
            </td>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/category/price-sets/?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">超值礼赞</a>
            </td>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/landing/giftcenter.html?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">特惠礼遇</a>
            </td>
            <td height="32" valign="middle" style="line-height: 32px;">
                <a href="http://www.biotherm.com.cn/landing/men.html?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                    target="_blank" style="color:#535355;text-decoration:none;">碧欧泉男士</a>
            </td>
        </tr>
    </table>
    <!--头部结束-->

    <!-- Web Slices -->
    <table width="608" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td>
            <a href="http://www.biotherm.com.cn/landing/2020319.html?utm_source=bio-edm&utm_medium=email&utm_campaign=biotherm-edm-0320anniversary"
                target="_blank">
              <img src="./img/BIO_template.jpg" width="608" height="795" alt="" title=""
                    border="0" style="display:block;" />
            </a>
          </td>
        </tr>
    </table>
    <!--底部开始-->
    <table width="608" height="180" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
            <td>
                <img src="http://file.splio4.com/6zE/Bc/eoBB/footerLeft.jpg" width="304" height="180"
                    alt="官方正品保证 官网独家礼赠 在线支付免运费 线上线下积分共享 扫一扫加入碧欧泉官方WeChat "
                    title="官方正品保证 官网独家礼赠 在线支付免运费 线上线下积分共享 扫一扫加入碧欧泉官方WeChat" border="0" style="display:block;" />
            </td>
            <td>
                <img src="http://file.splio4.com/6zE/Bc/eoBB/footerRight.jpg" width="304" height="180"
                    alt="官方正品保证 官网独家礼赠 在线支付免运费 线上线下积分共享 扫一扫加入碧欧泉官方WeChat "
                    title="官方正品保证 官网独家礼赠 在线支付免运费 线上线下积分共享 扫一扫加入碧欧泉官方WeChat" border="0" style="display:block;" />
            </td>
        </tr>
    </table>
    <table width="608" border="0" cellpadding="0" cellspacing="0" align="center"
        style="font-size:12px; background:#edf1f5">
        <tr>
            <td width="608" height="50" align="center" style="color:#808080;font-size:12px; line-height:20px;">
                为确保能收到我们的邮件，请把
                <a href="mailto:newsletter@news.biotherm.com.cn"
                    style="text-decoration:underline;font-size:12px;color:#e73525">noreply@news.biotherm.com.cn</a>添加到联系人列表
                <br> 本邮件由系统自动发送，请勿直接回复
                <br>如果您不愿再收到本讯息，
                <a href="$unsubUrl$" target="_blank"
                    style="text-decoration:underline;font-size:12px;color:#e73525">请点击此处</a>
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
