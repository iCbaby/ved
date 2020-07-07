<template>
  <div id="dwLpCodeInput">
    <el-input
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 6}"
      placeholder="请输入内容"
      v-model="codeInput"
    />
    <el-select size="mini" v-model="brands" style="margin: 30px 0; width: 100%" placeholder="品牌" @change="setBrandScript">
      <el-option
        v-for="item in brandoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <!-- 修改LP -->
    <el-button
      class="btn"
      type="primary"
      :disabled="!codeInput.length || !brands.length"
      @click="sendCode"
    >
      修改LP
    </el-button>

    <!-- 新建LP -->
    <el-button
      class="btn"
      type="primary"
      @click="showCreateLpDialog"
    >
      新建LP
    </el-button>

    <!-- 新建全结构LP -->
    <el-button
      class="btn"
      type="primary"
      @click="showFullLpDialog"
    >
      新建全结构LP
    </el-button>

    <!-- 修改CLA PDP -->
    <el-button
      class="btn cla-btn"
      type="primary"
      @click="changeClaPdp"
    >
      修改CLA PDP
    </el-button>

    <!-- 新建CLA PDP -->
    <el-button
      class="btn cla-btn"
      type="primary"
      @click="showCreateClaDialog"
    >
      新建CLA PDP
    </el-button>
    <h2>{{toolsname}}</h2>

    <!-- 新建LP dialog -->
    <el-dialog title="新建LP" :visible.sync="dialogVisible" top="5vh" width="30%" :before-close="handleClose">
      <div class="alert-text">图片路径如 /landing/2020/20200317whitevd</div>
      <div class="alert-text">图片名如果是 pc01.jpg mb01.jpg，那就写 pc mb 就好，其他自动会填充</div>
      <el-select size="mini" v-model="brands" style="margin:0 16px 16px 0;width:31%" placeholder="品牌">
        <el-option
          v-for="item in brandoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="urlInput" size="mini" placeholder="图片路径(不带图名的数字和后缀)" />
      <el-input v-model="lpPcImgName" size="mini" style="width:70%;margin-top:16px;" placeholder="PC图片名(不带数字和后缀)" />
      <el-input-number v-model="lpPcNum" size="mini" style="width:25%;margin-left:16px;" :min="1" :max="99"/>
      <el-input v-model="lpMbImgName" size="mini" style="width:70%;margin-top:16px;" placeholder="MB图片名(不带数字和后缀)" />
      <el-input-number v-model="lpMbNum" size="mini" style="width:25%;margin-left:16px;" :min="1" :max="99"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="createLp">确定</el-button>
      </span>
    </el-dialog>

    <!-- 新建全结构LP dialog -->
    <el-dialog title="新建全结构LP" :visible.sync="fullDialogVisible" top="5vh" width="80%" :before-close="handleClose">
      <div class="alert-text">图片路径如 /landing/2020/20200317whitevd/</div>
      <div class="alert-text">图片名如果是 pc01.jpg mb01.jpg，那就写 pc mb 就好，其他自动会填充</div>
      <div class="alert-text show-use-img" @click="showHowToUse">还是不会用？点我看看</div>
      <el-select class="full-dialog-input" size="mini" v-model="brands" style="width:12%" placeholder="品牌">
        <el-option
          v-for="item in brandoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input class="full-dialog-input" v-model="fullUrlInput" size="mini" placeholder="图片路径(不带图名的数字和后缀)" style="width:43%" />
      <el-input class="full-dialog-input" v-model="fullPcImgName" size="mini" style="width:20%;" placeholder="PC图片名(不带数字和后缀)" />
      <el-input class="full-dialog-input" v-model="fullMbImgName" size="mini" style="width:20%;" placeholder="MB图片名(不带数字和后缀)" />
      <div class="sku-input">
        <el-input
          type="textarea"
          :rows="18"
          placeholder="PC端结构"
          v-model="pcInputStr"
        >
        </el-input>
        <el-input
          type="textarea"
          :rows="18"
          placeholder="MB端结构"
          v-model="mbInputStr"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="createFullLp">确定</el-button>
      </span>
    </el-dialog>

    <!-- 新建CLA PDP dialog -->
    <el-dialog title="新建CLA PDP" :visible.sync="createClaPdpdialogVisible" width="30%" :before-close="handleClose">
      <div class="alert-text">路径在 /pdp/ 后直接写sku号，sku号后面不用加 /</div>
      <div class="alert-text">图片名称如果是 a.jpg，那就写 a 就好，其他自动会填充</div>
      <el-input v-model="claPdpUrlInput" size="mini" style="width:60%" placeholder="目录路径"/>
      <el-input v-model="claPdpImgName" size="mini" style="width:30%;margin-left:16px;" placeholder="图名(不带数字和后缀)"/>
      <el-input-number v-model="claPdpNum" size="mini" style="margin-top:16px" :min="1" :max="99"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="!claPdpUrlInput || !claPdpImgName" @click="createClaPdp('DIY')">DIY</el-button>
        <el-button type="primary" :disabled="!claPdpUrlInput || !claPdpImgName" @click="createClaPdp('SET')">SET</el-button>
      </span>
    </el-dialog>

    <!-- 教程 dialog -->
    <el-dialog title="怎么用" :visible.sync="howDialogVisible" top="2vh" append-to-body width="60%" :before-close="closeHowToUse">
      <img :src="howToUseImgSrc" style="display:block;width:100%;" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeHowToUse">ic哥我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import howToUseImg from '@assets/img/howToUse.jpg'

export default {
  name: 'DwLpCodeInput',
  props: {
    toolsname: {
      type: String,
      default: 'Lp'
    }
  },
  data () {
    return {
      codeInput: '',
      brands: '',
      brandoptions: [
        {
          value: 'armani',
          label: 'GA'
        },
        {
          value: 'biotherm',
          label: 'BIO'
        },
        {
          value: 'clarisonic',
          label: 'CLA'
        },
        {
          value: 'kiehls',
          label: 'KLS'
        },
        {
          value: 'shubeauty',
          label: 'SHU'
        }
      ],
      brandScript: '',
      dialogVisible: false,
      urlInput: '',
      lpPcNum: 1,
      lpMbNum: 1,
      lpPcBlockStr: '',
      lpMbBlockStr: '',
      lpPcImgName: '',
      lpMbImgName: '',

      // 新建全结构LP
      fullDialogVisible: false,
      fullUrlInput: '',
      fullPcImgName: '',
      fullMbImgName: '',
      pcInputStr: this.createFullStructureImg(),
      mbInputStr: this.createFullStructureImg(),
      swiperClassList: [],
      howToUseImgSrc: howToUseImg,
      howDialogVisible: false,

      // 修改CLA PDP
      claUrl: 'https://staging-cn-loreal.demandware.net/on/demandware.static/-/Sites-clarisonic-cn-Library/',
      // 创建CLA PDP
      createClaPdpdialogVisible: false,
      claPdpUrlInput: '/pdp/',
      claPdpImgName: '',
      claBlockStr: '',
      claPdpNum: 1,
      claPdpType: 'DIY'
    }
  },
  computed: {
    urlPrefix () {
      return `https://staging-cn-loreal.demandware.net/on/demandware.static/-/Sites-${this.brands}-cn-Library/`
    },
    createTemplate () {
      const str = `
      <link rel="stylesheet" type="text/css" href="lib/css/${this.brands}-landingpage-common.css?$staticlink$">
      <link rel="stylesheet" type="text/css" href="lib/css/swiper-3.4.2.min.css?$staticlink$">
        <!-- 1.Internal Image : <img src="xxx.jpg?$staticlink$"/> -->
<!-- 2.Category landing page: <a href="$url('Search-Show','cgid','makeup')$"></a> -->
<!-- 3.Product Detail page ：<a href="$url('Product-Show','pid','SHU100001')$"></a> -->
<!-- 4.Content Asset ： <a href="$url('Page-Show','cid','how-to-use')$"></a> -->
<!-- 5.Content library： <a href="$url('Search-Show','fdid','learn-howto')$"></a> -->
<!-- 6.External link： <a href="external URL"></a> -->
<div class="lpContainer landing_wrap">
  <!-- PC -->
  <div class="LPpc landingpage-pc">${this.lpPcBlockStr}</div>
  <!-- MOB -->
  <div class="LPmob landingpage-mob">${this.lpMbBlockStr}</div>
</div>
${this.brandScript}
<icicic type="text/javascript" src="lib/js/jquery.js?$staticlink$"></icicic>
<icicic type="text/javascript" src="lib/js/swiper.jquery.min.js?$staticlink$"></icicic>
<icicic type="text/javascript" src="lib/js/${this.brands}common-newmark.js?$staticlink$"></icicic>
<icicic>
  $(function () {
    // pc
    var mySwiper_pc1 = new Swiper('.swiper-outing1', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing1 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc2 = new Swiper('.swiper-outing2', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing2 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc3 = new Swiper('.swiper-outing3', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing3 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc4 = new Swiper('.swiper-outing4', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing4 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc5 = new Swiper('.swiper-outing5', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing5 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc6 = new Swiper('.swiper-outing6', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing6 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc7 = new Swiper('.swiper-outing7', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing7 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc8 = new Swiper('.swiper-outing8', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing8 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc9 = new Swiper('.swiper-outing9', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing9 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_pc10 = new Swiper('.swiper-outing10', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing10 .swiper-pagination',
      paginationClickable: true,
    })
    // mob
    var mySwiper_mb1 = new Swiper('.swiper-outing-mb1', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb1 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb2 = new Swiper('.swiper-outing-mb2', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb2 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb3 = new Swiper('.swiper-outing-mb3', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb3 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb4 = new Swiper('.swiper-outing-mb4', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb4 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb5 = new Swiper('.swiper-outing-mb5', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb5 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb6 = new Swiper('.swiper-outing-mb6', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb6 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb7 = new Swiper('.swiper-outing-mb7', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb7 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb8 = new Swiper('.swiper-outing-mb8', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb8 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb9 = new Swiper('.swiper-outing-mb9', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb9 .swiper-pagination',
      paginationClickable: true,
    })
    var mySwiper_mb10 = new Swiper('.swiper-outing-mb10', {
      autoplay: 5000,
      autoplayDisableOnInteraction: false,
      speed: 300,
      pagination: '.swiper-outing-mb10 .swiper-pagination',
      paginationClickable: true,
    })
  })
</icicic>
      `
      return str.replace(/icicic/g, 'script').trim()
    },
    createClaPdpTemplate () {
      return `
        <link rel="stylesheet" type="text/css" href="lib/css/prodetail.css?$staticlink$" />

<!-- 1.Internal Image : <img src="xxx.jpg?$staticlink$"/> -->
<!-- 2.Category landing page: <a href="$url('Search-Show','cgid','makeup')$"></a> -->
<!-- 3.Product Detail page ：<a href="$url('Product-Show','pid','SHU100001')$"></a> -->
<!-- 4.Content Asset ： <a href="$url('Page-Show','cid','how-to-use')$"></a> -->
<!-- 5.Content library： <a href="$url('Search-Show','fdid','learn-howto')$"></a> -->
<!-- 6.External link： <a href="external URL"></a> -->

<div class="lpContainer">
  <div class="LPpc landingpage-pc">
    <div class="pc-block" style="position:relative;width:100%;">
      <img src="/PDP-content/offer/PDP_${this.claPdpType}.jpg?$staticlink$" alt="" style="display: block; width: 100%;"/>
    </div>
    ${this.claBlockStr}
  </div>
</div>
      `
    }
  },
  methods: {
    sendCode () {
      this.$emit('getCode', {
        code: this.codeInput.trim(),
        urlPrefix: this.urlPrefix
      })
    },
    showCreateLpDialog () {
      this.dialogVisible = true
    },
    showFullLpDialog () {
      this.fullDialogVisible = true
    },
    createLp () {
      let pcBlockStr = ''
      let mbBlockStr = ''
      for (let i = 0; i < this.lpPcNum; i++) {
        const url = this.urlInput.trim() + '/' + this.lpPcImgName.trim() + (i < 9 ? '0' : '') + (i + 1)
        pcBlockStr += `
        <div class="pc-block" style="position:relative;width:100%;">
          <img src="${url}.jpg?$staticlink$" data-pcsrc="${url}.jpg?$staticlink$" pcsrc="${url}.jpg?$staticlink$" alt="" style="display: block; width: 100%;"/>
        </div>`
      }

      for (let i = 0; i < this.lpMbNum; i++) {
        const url = this.urlInput.trim() + '/' + this.lpMbImgName.trim() + (i < 9 ? '0' : '') + (i + 1)
        mbBlockStr += `
          <div class="mb-block" style="position: relative; width: 100%;">
            <img src="${url}.jpg?$staticlink$" data-msrc="${url}.jpg?$staticlink$" msrc="${url}.jpg?$staticlink$" alt="" style="display: block; width: 100%;"/>
          </div>`
      }

      this.lpPcBlockStr = pcBlockStr
      this.lpMbBlockStr = mbBlockStr
      this.$emit('getCode', {
        code: this.createTemplate.trim(),
        urlPrefix: this.urlPrefix
      })
      this.handleClose()
    },
    createFullLp () {
      const aTag = this.mapStrToFullStructure()
      // this.pcInputStr = this.mbInputStr = this.createFullStructureImg()
      this.$emit('getCode', {
        code: this.createFullStructureHtmlStr(aTag),
        urlPrefix: this.urlPrefix
      })

      this.swiperClassList = []
      this.handleClose()
    },
    mapStrToFullStructure () {
      // 将输入的文字映射为对象aTag
      const aTag = {}

      // pc
      if (this.pcInputStr) {
        const pcATag = {}
        const pcPagesAList = this.pcInputStr.trim().split('\n')
        pcPagesAList.forEach((item, index) => {
          if (item.includes('轮播')) {
            // 轮播图
            pcATag[index + 1] = this.convertSwiperObj('pc', index + 1, item)
          } else if (item.includes('换图')) {
            pcATag[index + 1] = this.convertHoverObj('pc', index + 1, item)
          } else {
            // 冇轮播图，纯静态
            pcATag[index + 1] = this.convertStaticObj('pc', item) // 已经转为可以生成a标签的字符串
          }
        })
        // this.pcInputStr = ''
        aTag.pc = pcATag
      }

      // mb
      if (this.mbInputStr) {
        const mbATag = {}
        const mbPagesAList = this.mbInputStr.trim().split('\n')
        mbPagesAList.forEach((item, index) => {
          if (item.includes('轮播')) {
            // 轮播图
            mbATag[index + 1] = this.convertSwiperObj('mb', index + 1, item)
          } else if (item.includes('换图')) {
            mbATag[index + 1] = this.convertHoverObj('mb', index + 1, item)
          } else {
            // 冇轮播图，纯静态
            mbATag[index + 1] = this.convertStaticObj('mb', item) // 已经转为可以生成a标签的字符串
          }
        })
        // this.mbInputStr = ''
        aTag.mb = mbATag
      }
      return aTag
    },
    // 全结构LP轮播图 + a标签处理
    convertSwiperObj (type, num, item) {
      const infoArr = item.replace('轮播;', '').split(';')
      let swiperStr = ''
      // 这是整个输入的第二行处理，即整个轮播图
      infoArr.forEach(item => {
        // item有可能因为多打;而为空
        if (!item) return

        // 对轮播图中每张图处理
        const imgList = item.split('/')
        let singleSwiperImg = ''
        const len = imgList.length - 1
        const left = (100 / len) * 0.1 // 生成a标签的离左边的距离
        const width = (100 / len) * 0.8 // 生成a标签的宽度
        imgList.forEach((item, index) => {
          if (!index) {
            // 第一个一定是img src
            const src = this.fullUrlInput + (type === 'pc' ? this.fullPcImgName : this.fullMbImgName) + item + '?$staticlink$'
            if (type === 'pc') {
              singleSwiperImg += `<img src=${src} data-src="${src}" pc-src="${src}" pcsrc="${src}" style="display:block;width:100%;"/>`
            } else {
              singleSwiperImg += `<img src=${src} data-msrc="${src}" m-src="${src}" msrc="${src}" style="display:block;width:100%;"/>`
            }
          } else {
            // 之后都是sku
            if (type === 'pc' && len === 1) {
              // pc端，而且sku只有一个，则生成的a标签是左右布局
              singleSwiperImg += `<a
                class="bcric"
                href="$url('Product-Show','pid','${item}')$"
                data-ichihiroid="${Math.random()}"
                data-toolcreateid="bcric"
                data-ainput="${item}"
                data-aselectedvalue="商品详情页"
                style="position:absolute;z-index:10;width:46%;height:80%;top:10%;left:2%;bottom:auto;right:auto;"
              ></a>`
              singleSwiperImg += `<a
                class="js-button_shop_now bcric"
                href="$url('Product-Show','pid','${item}')$"
                data-ichihiroid="${Math.random()}"
                data-toolcreateid="bcric"
                data-ainput="${item}"
                data-aselectedvalue="商品详情页"
                target="_blank"
                style="position:absolute;z-index:10;width:30%;height:30%;top:35%;left:60%;bottom:auto;right:auto;"
              ></a>`
            } else {
              singleSwiperImg += `<a
              class="bcric"
              href="$url('Product-Show','pid','${item}')$"
              data-ichihiroid="${Math.random()}"
              data-toolcreateid="bcric"
              data-ainput="${item}"
              data-aselectedvalue="商品详情页"
              target="_blank"
              style="position:absolute;z-index:10;top:3%;left:${(left * ((index - 1) * 2 + 1) + (index - 1) * width) + '%'};width:${width + '%'};height:40%;bottom:auto;right:auto;"
            ></a>`
              singleSwiperImg += `<a
              class="js-button_shop_now bcric"
              href="$url('Product-Show','pid','${item}')$"
              data-ichihiroid="${Math.random()}"
              data-toolcreateid="bcric"
              data-ainput="${item}"
              data-aselectedvalue="商品详情页"
              style="position:absolute;z-index:10;top:70%;left:${(left * ((index - 1) * 2 + 1) + (index - 1) * width) + '%'};width:${width + '%'};height:20%;bottom:auto;right:auto;"
            ></a>`
            }
          }
        })
        swiperStr += `<div class="swiper-slide" style="position:relative;">${singleSwiperImg}</div>`
      })

      // 轮播图中所有图处理完，最后包装
      swiperStr = `<div class="${type === 'pc' ? 'pc-block' : 'mobile-block'}" style="position:relative;width:100%;">` +
        `<div class="swiper-container ${'swiper-' + type + '-' + num}">` +
        `<div class="swiper-wrapper">${swiperStr}</div>` +
        `<div class="swiper-pagination ${'swiper-pagination-' + type + '-' + num}"></div>` +
        `<div class="swiper-button-prev ${'swiper-prev-' + type + '-' + num}"></div>` +
        `<div class="swiper-button-next ${'swiper-next-' + type + '-' + num}"></div>` +
        '</div>' +
        '</div>'
      this.swiperClassList.push(type + '-' + num) // 记录有哪些swiper
      return swiperStr
    },
    // 全结构LP hover图 + a标签
    convertHoverObj (type, num, item) {
      const infoArr = item.replace('换图@', '').split('@')
      // hover图只有两张
      let hoverStr = ''
      const src1 = this.fullUrlInput + (type === 'pc' ? this.fullPcImgName : this.fullMbImgName) + infoArr[0] + '?$staticlink$'
      const src2 = this.fullUrlInput + (type === 'pc' ? this.fullPcImgName : this.fullMbImgName) + infoArr[1] + '?$staticlink$'
      // infoArr[2]是用户写的数字，代表多少个可点击的区域
      if (type === 'pc') {
        hoverStr = '<div class="pc-block" style="position:relative;width:100%;">' +
          `<img class="bcr-hover-img" src=${src1} data-src="${src1}" pc-src="${src1}" pcsrc="${src1}" style="display:block;width:100%;"/>` +
          `<img class="bcr-hover-img" src=${src2} data-src="${src2}" pc-src="${src2}" pcsrc="${src2}" style="display:block;width:100%;"/>` +
          this.createHoverAStr(infoArr[2], type) +
          '</div>'
      } else {
        hoverStr = '<div class="mobile-block" style="position:relative;width:100%;">' +
          `<img class="bcr-hover-img" src=${src1} data-msrc="${src1}" m-src="${src1}" msrc="${src1}" style="display:block;width:100%;"/>` +
          `<img class="bcr-hover-img" src=${src2} data-msrc="${src2}" m-src="${src2}" msrc="${src2}" style="display:block;width:100%;"/>` +
          this.createHoverAStr(infoArr[2], type) +
          '</div>'
      }
      return hoverStr
    },
    // hover 区域
    createHoverAStr (num, type) {
      let str = ''
      const left = (100 / num) * 0.1 // 生成a标签的离左边的距离
      const width = (100 / num) * 0.8 // 生成a标签的宽度
      for (let index = 0; index < num; index++) {
        str += `<div
          class="bcrjw bcr-hover-${type}-a"
          data-ichihiroid="${Math.random()}"
          data-toolcreateid="bcric"
          style="position:absolute;z-index:10;top:30%;left:${(left * (index + 1) + index * width) + '%'};width:${width + '%'};height:30%;bottom:auto;right:auto;"
          ></div>`
      }
      return str
    },
    // 全结构LP静态图 + a标签处理
    convertStaticObj (type, item) {
      const infoArr = item.split('/')
      let imgStr = ''
      const len = infoArr.length - 1 // sku数目
      const left = (100 / len) * 0.1 // 生成a标签的离左边的距离
      const width = (100 / len) * 0.8 // 生成a标签的宽度
      // 直接对图和sku处理
      infoArr.forEach((item, index) => {
        if (!index) {
          // 第一个一定是图
          const src = this.fullUrlInput + (type === 'pc' ? this.fullPcImgName : this.fullMbImgName) + item + '?$staticlink$'
          if (type === 'pc') {
            imgStr += `<img src=${src} data-src="${src}" pc-src="${src}" pcsrc="${src}" style="display:block;width:100%;"/>`
          } else {
            imgStr += `<img src=${src} data-msrc="${src}" m-src="${src}" msrc="${src}" style="display:block;width:100%;"/>`
          }
        } else {
          // 后面是sku
          if (type === 'pc' && len === 1) {
            // pc端，而且sku只有一个，则生成的a标签是左右布局
            imgStr += `<a
              class="bcric"
              href="$url('Product-Show','pid','${item}')$"
              data-ichihiroid="${Math.random()}"
              data-toolcreateid="bcric"
              data-ainput="${item}"
              data-aselectedvalue="商品详情页"
              style="position:absolute;z-index:10;width:46%;height:80%;top:10%;left:2%;bottom:auto;right:auto;"
            ></a>`
            imgStr += `<a
              class="js-button_shop_now bcric"
              href="$url('Product-Show','pid','${item}')$"
              data-ichihiroid="${Math.random()}"
              data-toolcreateid="bcric"
              data-ainput="${item}"
              data-aselectedvalue="商品详情页"
              style="position:absolute;z-index:10;width:30%;height:30%;top:35%;left:60%;bottom:auto;right:auto;"
            ></a>`
          } else {
            // 其余都是上下布局
            imgStr += `<a
              class="bcric"
              href="$url('Product-Show','pid','${item}')$"
              data-ichihiroid="${Math.random()}"
              data-toolcreateid="bcric"
              data-ainput="${item}"
              data-aselectedvalue="商品详情页"
              style="position:absolute;z-index:10;top:3%;left:${(left * ((index - 1) * 2 + 1) + (index - 1) * width) + '%'};width:${width + '%'};height:40%;bottom:auto;right:auto;"
            ></a>`
            imgStr += `<a
              class="js-button_shop_now bcric"
              href="$url('Product-Show','pid','${item}')$"
              data-ichihiroid="${Math.random()}"
              data-toolcreateid="bcric"
              data-ainput="${item}"
              data-aselectedvalue="商品详情页"
              style="position:absolute;z-index:10;top:70%;left:${(left * ((index - 1) * 2 + 1) + (index - 1) * width) + '%'};width:${width + '%'};height:20%;bottom:auto;right:auto;"
            ></a>`
          }
        }
      })
      // 包装
      imgStr = `<div class="${type === 'pc' ? 'pc-block' : 'mobile-block'}" style="position:relative;width:100%;">${imgStr}</div>`
      return imgStr
    },
    // 生成全结构LP的HTML string
    createFullStructureHtmlStr (aTag) {
      let pcHtmlStr = ''
      if (aTag?.pc) {
        Object.keys(aTag.pc).forEach(item => {
          pcHtmlStr += aTag.pc[item]
        })
      }
      let mbHtmlStr = ''
      if (aTag?.mb) {
        Object.keys(aTag.mb).forEach(item => {
          mbHtmlStr += aTag.mb[item]
        })
      }
      const mySwiper = `
var mySwiperpc = new Swiper('.swiper-pc', {
  loop: true, // 循环模式选项
  autoplay: true, // 自动播放
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination-pc',
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-next-pc',
    prevEl: '.swiper-prev-pc',
  }
})
var mySwipermb = new Swiper('.swiper-mb', {
  loop: true, // 循环模式选项
  autoplay: true, // 自动播放
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination-mb',
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-next-mb',
    prevEl: '.swiper-prev-mb',
  }
})`
      let str = `
<link rel="stylesheet" type="text/css" href="lib/css/${this.brands}-landingpage-common.css?$staticlink$">
<link rel="stylesheet" type="text/css" href="lib/css/swiper.v5.min.css?$staticlink$">
<!-- 1.Internal Image : <img src="xxx.jpg?$staticlink$"/> -->
<!-- 2.Category landing page: <a href="$url('Search-Show','cgid','makeup')$"></a> -->
<!-- 3.Product Detail page ：<a href="$url('Product-Show','pid','SHU100001')$"></a> -->
<!-- 4.Content Asset ： <a href="$url('Page-Show','cid','how-to-use')$"></a> -->
<!-- 5.Content library： <a href="$url('Search-Show','fdid','learn-howto')$"></a> -->
<!-- 6.External link： <a href="external URL"></a> -->
<div class="lpContainer landing_wrap">
  <!-- PC -->
  <div class="LPpc landingpage-pc">${pcHtmlStr}</div>
  <!-- MOB -->
  <div class="LPmob landingpage-mob">${mbHtmlStr}</div>
</div>
${this.brandScript}
${this.brands.includes('kiehls') ? '<icicic type="text/javascript" src="lib/js/jquery.min.v3.5.0.js?$staticlink$"></icicic>' : ''}
<icicic type="text/javascript" src="lib/js/swiper.min.v5.3.6.js?$staticlink$"></icicic>
<icicic type="text/javascript" src="lib/js/${this.brands}common-newmark.js?$staticlink$"></icicic>
<icicic>

$('.bcr-hover-pc-a').mouseenter(function () {
  var img1 = $(this).parent('.pc-block').find('img').eq(0)
  var img2 = $(this).parent('.pc-block').find('img').eq(1)
  img1.css('display', 'none')
  img2.css('display', 'block')
})
$('.bcr-hover-pc-a').mouseleave(function () {
  var img1 = $(this).parent('.pc-block').find('img').eq(0)
  var img2 = $(this).parent('.pc-block').find('img').eq(1)
  img2.css('display', 'none')
  img1.css('display', 'block')
})
$('.bcr-hover-mb-a').on('click', function () {
  var img1 = $(this).parent('.mobile-block').find('img').eq(0);
  var img2 = $(this).parent('.mobile-block').find('img').eq(1);
  if (img1.is(':hidden')) {
    img2.hide()
    img1.css('display', 'block').show()
  } else {
    img1.hide()
    img2.css('display', 'block').show()
  }
})
${mySwiper}

</icicic>`
      // ${this.brands.includes('biotherm') || this.brands.includes('clarisonic') ? '' : mySwiper}
      // 根据轮播图生成对应的script，没有swiper则不生成
      let swiperScriptStr = ''
      this.swiperClassList.forEach(item => {
        swiperScriptStr += '<icicic>' +
`var ${'mySwiper' + item.split('-').join('_')} = new Swiper ('${'.swiper-' + item}', {
  loop: true, // 循环模式选项
  autoplay: true, // 自动播放
  // 如果需要分页器
  pagination: {
    el: '${'.swiper-pagination-' + item}',
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '${'.swiper-next-' + item}',
    prevEl: '${'.swiper-prev-' + item}',
  },
})` + '</icicic>'.trim()
      })
      str = (str + swiperScriptStr).replace(/icicic/g, 'script').trim()
      return str
    },
    setBrandScript () {
      const str = `
        <brandbrand type="text/javascript" src="landing/js/index.0.9.js?$staticlink$"></brandbrand>
        <brandbrand>
          $('.lpContainer a').click(function () {
            var brandCategory = "CLA_冬日护肤",
              trackCode = $(this).attr('trackcode'),
              type = ($('#showflag').is(':visible')) ? "PC" : "MOB";

            if (typeof (trackCode) != 'undefined') {
              trackCode = type + trackCode;
              landing_trackhtml(brandCategory, type, trackCode);
            }

            function landing_trackhtml(category, action, label) {
              gaTracker('clientTracker.send', 'event', category, action, label);
              console.log('Success:' + category + '_' + action + '_' + label);
            }
          });
        </brandbrand>`
      if (this.brands === 'clarisonic') {
        this.brandScript = str.replace(/brandbrand/g, 'script').trim()
      }
    },
    handleClose () {
      this.dialogVisible = false
      this.createClaPdpdialogVisible = false
      this.urlInput = ''
      this.lpPcNum = 1
      this.lpMbNum = 1
      this.lpPcBlockStr = ''
      this.lpMbBlockStr = ''
      this.lpPcImgName = ''
      this.lpMbImgName = ''
      this.claPdpUrlInput = '/pdp/'
      this.fullDialogVisible = false
      this.howDialogVisible = false
    },
    changeClaPdp () {
      this.$emit('getCode', {
        code: this.codeInput.trim(),
        urlPrefix: this.claUrl
      })
    },
    showCreateClaDialog () {
      this.createClaPdpdialogVisible = true
    },
    createClaPdp (type) {
      this.claPdpType = type
      let blockStr = ''
      for (let i = 0; i < this.claPdpNum; i++) {
        blockStr += `<div class="pc-block" style="position:relative;width:100%;">
          <img src="${this.claPdpUrlInput.trim() + '/' + this.claPdpImgName.trim() + (i < 9 ? '0' : '') + (i + 1)}.jpg?$staticlink$" alt="" style="display: block; width: 100%;"/>
        </div>`
      }
      this.claBlockStr = blockStr
      this.$emit('getCode', {
        code: this.createClaPdpTemplate.trim(),
        urlPrefix: this.claUrl
      })
      this.handleClose()
    },
    createFullStructureImg () {
      let str = ''
      for (let i = 0; i < 20; i++) {
        const num = i + 1
        str += `${i < 9 ? '0' + num : num}.jpg\n`
      }
      return str
    },
    showHowToUse () {
      this.howDialogVisible = true
    },
    closeHowToUse () {
      this.howDialogVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.full-dialog-input {
  margin-right: 12px;
}

.btn {
  width: 100%;
  margin: 16px 0 0 0 !important;
}

.alert-text {
  margin-bottom: 8px;
  color: red;
}
.cla-btn {
  padding: 12px 8px !important;
}

#dwLpCodeInput .sku-input {
  // display: flex;
  justify-content: space-between;
}

#dwLpCodeInput .sku-input >>> .el-textarea textarea {
  margin-top: 12px;
  font-size: 20px;
  font-family: Consolas, 'Courier New', monospace;
}

#dwLpCodeInput .show-use-img {
  cursor: pointer;
  text-decoration: underline;
}
</style>
