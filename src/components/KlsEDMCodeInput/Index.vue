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
      // eslint-disable-next-line no-use-before-define
      const lastname = 'Dear' + '{' + 'SPLIO IF $lastname$ != ""' + '}' + '$lastname$' + '{' + 'SPLIO ELSE' + '}' + '顾客' + '{' + 'SPLIO ENDIF' + '}'
      return `<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
    <body style="margin:0;padding:0">
        <!-- header -->
        <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
            <tr>
                <td>
                    <table width="100%" height="30" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="font-size:12px" align="left">
                                <a href="http://www.kiehls.com.cn/?utm_source=kiehls-edm&utm_content=top&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank" style="color:#000000">科颜氏官网祝您生日月快乐！订单满300元，即可领取“舒缓绣花3件组”生日礼>></a>
                            </td>
                            <td style="font-size:12px" align="right">如果您无法阅读本邮件，请<a href="$mirrorUrl$" style="color:#000000" target="_blank">点击查看</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="700" border="0" cellspacing="0" cellpadding="0" style="font-size:12px;">
                        <tr>
                            <td width="448" height="80">
                                <a href="http://www.kiehls.com.cn/?utm_source=kiehls-edm&utm_content=homepage&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/logo.jpg" width="260" height="80" alt="科颜氏官方网站暨网上商城" title="科颜氏官方网站暨网上商城" style="display:block;border:none" />
                                </a>
                            </td>
                            <td width="252" align="right">
                                <img src="http://file.splio4.com/6gL/LH/CcnR/top.jpg" width="252" height="80" alt="关注官方微信" title="关注官方微信" style="display:block;border:none;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td width="700" height="36">
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="107" height="36">
                                <a href="http://www.kiehls.com.cn/justarrived/?utm_source=kiehls-edm&utm_content=whatsnew&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/menu1.jpg" width="107" height="36" alt="最新活动" style="display:block;border:none;" />
                                </a>
                            </td>
                            <td width="103" height="36">
                                <a href="http://www.kiehls.com.cn/skincare-face/?utm_source=kiehls-edm&utm_content=face&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/menu2.jpg" width="103" height="36" alt="面部护理" style="display:block;border:none;" />
                                </a>
                            </td>
                            <td width="101" height="36">
                                <a href="http://www.kiehls.com.cn/body/?utm_source=kiehls-edm&utm_content=body&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/menu3.jpg" width="101" height="36" alt="身体护理" style="display:block;border:none;" />
                                </a>
                            </td>
                            <td width="101" height="36">
                                <a href="http://www.kiehls.com.cn/mens-2/?utm_source=kiehls-edm&utm_content=men&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/menu4.jpg" width="101" height="36" alt="男士护理" style="display:block;border:none;" />
                                </a>
                            </td>
                            <td width="102" height="36">
                                <a href="http://www.kiehls.com.cn/hair/?utm_source=kiehls-edm&utm_content=hair&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/menu5.jpg" width="102" height="36" alt="头发护理" style="display:block;border:none;" />
                                </a>
                            </td>                 
                            <td width="104" height="36">
                                <a href="http://www.kiehls.com.cn/product/KLS00032.html?utm_source=kiehls-edm&utm_content=sun&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/menu6.jpg" width="104" height="36" alt="防晒护理" style="display:block;border:none;" />
                                </a>
                            </td>
                            <td width="82" height="36">
                                <a href="http://www.kiehls.com.cn/gifts-for-all/?utm_source=kiehls-edm&utm_content=giftsnew&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                                    <img src="http://file.splio4.com/6gL/LH/CcnR/menu7.jpg" width="82" height="36" alt="礼盒" style="display:block;border:none;" />
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!--body-->
        <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
            <tr>
                <td>
                    <a href="http://www.kiehls.com.cn/?utm_source=kiehls-edm&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                        <img src="http://file.splio4.com/72X/nh/Szri/kv.jpg" width="700" height="227" border="0" title="Happy Birthday!" alt="Happy Birthday!" style="display:block;" />
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
                        <tr>
                            <td>
                                <img src="http://file.splio4.com/72X/nh/Szri/a_01.jpg" width="50" height="50" border="0" title="Happy Birthday!" alt="Happy Birthday!" style="display:block;" />
                            </td>
                            <td width="600" height="50" align="center" style="font-size:20px;font-weight:bold;overflow:hidden;color:#000000;font-family:微软雅黑">${lastname}</td>
                            <td>
                                <img src="http://file.splio4.com/72X/nh/Szri/a_03.jpg" width="50" height="50" border="0" title="Happy Birthday!" alt="Happy Birthday!" style="display:block;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.kiehls.com.cn?utm_source=kiehls-edm&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                        <img src="http://file.splio4.com/7fW/7D/TS6U/b.jpg" width="700" height="500" border="0" title="Happy Birthday!" alt="Happy Birthday!" style="display:block;" />
                    </a>
                </td>
            </tr>
        </table>
        <!--footer-->
        <table width="700" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF">
            <tr>
                <td width="700" height="181">
                    <a title="选择科颜氏官网的理由" href="http://www.kiehls.com.cn/?utm_source=kiehls-edm&utm_content=reason&utm_medium=email&utm_campaign=E_kiehls-edm-202002-birthday" target="_blank">
                        <img src="http://file.splio4.com/6gL/LH/CcnR/why2.jpg" alt="选择科颜氏官网的理由" width="700" height="181" border="0" style="display:block;" />
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <table width="700" align="center"  border="0" cellspacing="0" cellpadding="0" style="font-size:12px;">
                        <tr>
                            <td width="457" align="left" style="font-size:12px;">本邮件由系统自动发送，请勿直接回复</td>
                            <td width="243" align="right" style="font-size:12px;">
                                <a href="http://weibo.com/kiehlschina" title="新浪微博" target="_blank">
                                    <img src="http://file.splio4.com/6mE/NB/n8J5/wb.jpg"  alt="新浪微博" border="0" style="display:block;" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td width="457" align="left" style="font-size:12px;line-height:19px;">详询官网 400-820-5433<br/>
                            </td>
                            <td width="243" align="right" style="font-size:12px;">感谢您的阅读！如需退订，<a href="$unsubUrl$" target="_blank" style="color:#000000;text-decoration:underline;">请点击此处</a> 
                            </td>
                        </tr>
                    </table> 
                    <table width="700" align="center" border="0" cellspacing="0" cellpadding="0" style="font-size:12px;">
                        <tr>
                            <td align="left" style="font-size:12px;line-height:19px;">为确保能收到我们的邮件，请添加<a href="mailto:newsletter@news.kiehls.com.cn" style="text-decoration:underline;font-size:12px;color:#000">newsletter@news.kiehls.com.cn</a> 到联系人列表
                            </td>
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
