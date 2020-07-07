<template>
  <div id="dwControlPanel">
    <!-- 最上面的按钮 -->
    <div v-if="insertdHtml" class="genaration-panel" align="right">
      <el-button size="mini" type="success" @click="showgenerateTagsPanel">批量生成a 标签</el-button>
      <el-button size="mini" type="primary" @click="preView">预览</el-button>
      <el-button size="mini" type="success" style="marginLeft:24px" @click="genarateCode">生成代码</el-button>
    </div>

    <!-- 底部显示的图片 -->
    <div v-if="insertdHtml" v-html="insertdHtml" class="control-panel" />

    <!-- 编辑图片面板 -->
    <div v-if="showPanel && handleSuccess" class="img-panel" :style="styleObject">
      <div>
        <el-button size="mini" type="primary" @click="putBeforePosition">向上移动一格</el-button>
        <el-button size="mini" type="primary" @click="putNextPosition">向下移动一格</el-button>
        <el-select size="mini" v-model="selectedImg.imgRegion" style="margin-left: 10px; width: 80px" placeholder="语言">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input size="mini" v-model="selectedImg.imgFolder" placeholder="图片文件夹" style="margin-left: 10px; width: 35%;" />
      </div>
      <div class="panel-rows">
        换图：
        <el-input v-model="selectedImg.imgName" size="mini" placeholder="图片src" style="width:62%" />
        <el-button
          size="mini"
          type="primary"
          :disabled="!selectedImg.imgSrc"
          style="margin-left:16px"
          @click="changeImg"
        >换图</el-button>
      </div>
      <div class="panel-rows">
        <!-- 添加图片 -->
        <el-select v-model="selectedImg.imgType" placeholder="请选择" size="mini" style="width: 20%">
          <el-option
            v-for="item in imgTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="addImg.imgSrc" size="mini" placeholder="需要添加的图片src" style="width:54%;margin-left:12px" />
        <el-button
          size="mini"
          type="primary"
          :disabled="!addImg.imgSrc"
          style="margin-left:12px"
          @click="addAnImg('prev')"
        >上</el-button>
        <el-button
          size="mini"
          type="primary"
          :disabled="!addImg.imgSrc"
          style="margin-left:12px"
          @click="addAnImg('next')"
        >下</el-button>
      </div>
      <div class="panel-rows">
        为父元素添加id:
        <el-input v-model="selectedImg.markId" size="mini" placeholder="标识选项卡要跳到的位置" style="width:40%" />
        <el-button
          size="mini"
          type="primary"
          style="margin-left:16px"
          @click="addParentId"
        >确定</el-button>
      </div>
      <div class="panel-rows">
        <span class="panel-tip">若要添加视频/选项卡，请在编辑a标签处进行修改</span>
      </div>
      <div class="panel-rows">
        <el-button size="mini" type="danger" @click="deleteAnImg">删除</el-button>
        <el-button
          size="mini" type="primary"
          style="marginLeft:40px"
          @click="editTags">编辑a/hover标签</el-button>
        <el-button
          size="mini" type="success"
          style="marginLeft:40px"
          @click="addSwiper">添加轮播图</el-button>
      </div>
    </div>

    <!-- 编辑a/hover标签面板 -->
    <ATagPanel
      :visible="aDialogVisible"
      :imgSrc="selectedImg.imgSrc"
      :aTags="selectedImg.aTags"
      :hoverTags="selectedImg.hoverTags"
      @setNewATags="setNewATags"
      @setNewHoverTags="setNewHoverTags"
      @closeATagPanel="closeATagPanel"
    />

    <!-- 批量生成a标签面板 -->
    <GenerateTagsPanel
      :visible="asDialogVisible"
      @generateTags="generateTags"
      @closeGenerateTagsPanel="closeGenerateTagsPanel"
    />

     <!-- 添加轮播 dialog -->
    <el-dialog title="本弹窗只是针对全结构LP中的添加轮播，如果是修改LP要添加轮播图的话可以选择换图下面的选项卡“轮播图”" :visible.sync="swiperDialogVisible" top="5vh" width="30%" :before-close="handleClose">
      <div class="sku-input">
        <el-input
          type="textarea"
          :rows="18"
          placeholder="01.jpg/sku;02.jpg/sku"
          v-model="swiperInputStr"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="createSwiperStruct('prev')">上</el-button>
        <el-button type="primary" @click="createSwiperStruct('next')">下</el-button>
      </span>
    </el-dialog>

    <!-- 最后处理代码面板 -->
    <div v-if="converHtml" v-html="converHtml" class="conver-html"></div>

    <!-- 生产代码dialog -->
    <el-dialog title="生成的代码" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-input v-model="dialogCode" type="textarea" :rows="10" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ATagPanel from '@c/DwLpATagPanel/Index'
import GenerateTagsPanel from '@c/DwLpGenerateTags/Index'

export default {
  name: 'DwControlPanel',
  components: { ATagPanel, GenerateTagsPanel },
  data () {
    return {
      handleSuccess: true,
      insertdHtml: '',
      showPanel: false,
      styleObject: {
        position: 'absolute',
        zIndex: 100,
        top: 0,
        left: 0
      },
      selectedImg: this.initSelectedImg(),
      addImg: this.initAddImg(),
      dialogVisible: false,
      dialogCode: '',
      skuCode: '',
      urlPrefix: '',
      aDialogVisible: false,
      // 添加轮播dialog
      swiperDialogVisible: false,
      // swiperInputStr: this.createswiperImg(),
      swiperInputStr: '',
      swiperClassList: [],
      converHtml: '',
      options: [
        {
          value: 'default',
          label: '默认'
        },
        {
          value: 'zh_CN',
          label: '中文'
        }
      ],
      folder: '',
      regionValue: 'default',
      imgTypeOptions: [
        {
          value: 'swiperImg',
          label: '轮播图'
        },
        {
          value: 'ordinaryPicture',
          label: '普通图片'
        }
      ],
      pcSwiperCounts: 0,
      mobSwiperCounts: 0,
      asDialogVisible: false // 批量生成a标签面板显示
    }
  },
  created () {
    this.onShowButton()
  },
  beforeDestroy () {
    this.offShowButton()
  },
  methods: {
    async setHtml (val) {
      this.insertdHtml = ''
      this.skuCode = val.skuCode
      this.urlPrefix = val.urlPrefix

      await this.$nextTick()
      // 生成html
      this.insertdHtml = val.code
      // 修改dom结构
      this.modifyEle()
    },
    async modifyEle () {
      await this.$nextTick()

      // 为swiper重新排序
      this.orderSwiper()

      await this.$nextTick()

      // pc、mb端swiper数量
      this.pcSwiperCounts = $('#dwControlPanel .pc-block .swiper-container').length
      this.mobSwiperCounts = $('#dwControlPanel .mobile-block .swiper-container').length

      const _self = this // vue
      const imgs = $('#dwControlPanel img') // img的jq集合
      let isSwiperImg = 0

      imgs.each(function (index) {
        const _this = $(this) // img的jq元素
        const parent = _this.parent() // img父级div的jq元素

        if (!_this.hasClass('ved-show-min-height')) {
          // 为每个图片添加一个最小高度 防止图片路径错误时 无法删除
          _this.addClass('ved-show-min-height')
        }

        // 先区分是否是轮播图
        isSwiperImg = _this.parent().hasClass('swiper-slide') ? 1 : 0

        // 设置路径、样式
        let findSrc = _this.attr('src') ??
          _this.attr('data-src') ?? // 适应SHU的LP
          _this.attr('pcsrc') ??
          _this.attr('pc-src') ??
          _this.attr('data-pcsrc') ??
          _this.attr('msrc') ??
          _this.attr('data-msrc')

        // 补全路径
        if (findSrc.indexOf('/') !== 0) findSrc = '/' + findSrc

        const srcStr = _self.urlPrefix + _self.regionValue + findSrc
        _this.attr('src', srcStr).css({ display: 'block', width: '100%' })

        // 非轮播图
        if (!isSwiperImg) {
          if (parent.hasClass('pc-block')) {
            _this.attr({
              src: srcStr,
              pcsrc: srcStr,
              'data-src': srcStr, // 适应SHU的LP
              'data-pcsrc': srcStr
            })
          } else if (parent.hasClass('mobile-block') || parent.hasClass('mb-block') || parent.hasClass('mob-block')) {
            _this.attr({
              src: srcStr,
              msrc: srcStr,
              'data-src': srcStr, // 适应SHU的LP
              'data-msrc': srcStr
            })
          }
          // 添加位置属性 非轮播图
          if (parent.hasClass('pc-block') && !parent.hasClass('LPpc') && !parent.hasClass('landingpage-pc')) {
            parent.removeClass().addClass('pc-block').css({ position: 'relative', width: '100%' })
          }
          if ((parent.hasClass('mobile-block') || parent.hasClass('mb-block') || parent.hasClass('mob-block')) && !parent.hasClass('LPmob') && !parent.hasClass('landingpage-mob')) {
            parent.removeClass().addClass('mobile-block').css({ position: 'relative', width: '100%' })
          }
        } else { // 轮播图
          parent.addClass('tools-green-border') // tools-green-border之后记得删
          const blockParent = parent.parent().parent().parent()
          if (blockParent.hasClass('pc-block')) {
            _this.attr({
              src: srcStr,
              pcsrc: srcStr,
              'data-pcsrc': srcStr
            })
          } else if (blockParent.hasClass('mobile-block') || blockParent.hasClass('mb-block') || blockParent.hasClass('mob-block')) {
            _this.attr({
              src: srcStr,
              msrc: srcStr,
              'data-msrc': srcStr
            })
          }
          // 添加位置属性 轮播图
          if (blockParent.hasClass('pc-block')) {
            blockParent.removeClass().addClass('pc-block').css({ position: 'relative', width: '100%' })
          }
          if (blockParent.hasClass('mobile-block') || blockParent.hasClass('mb-block') || blockParent.hasClass('mob-block')) {
            blockParent.removeClass().addClass('mobile-block').css({ position: 'relative', width: '100%' })
          }
          // 为轮播图父div添加位置属性
          parent.css({ position: 'relative', width: '100%' })
        }

        // 帮每个a 标签标记一下，后面做a 标签的映射
        parent.find('a').each(function () {
          if (!$(this).attr('data-ichihiroid')) {
            $(this).attr('data-ichihiroid', $(this).attr('href') + Math.random())
          }
          // 为满足条件的a标签添加显示样式
          let isConform = 1
          let styleCount = 0
          if ($(this)[0].style.top && $(this)[0].style.top !== 'auto') {
            styleCount++
            isConform = $(this)[0].style.top.indexOf('%') !== -1 ? isConform : 0
          }
          if ($(this)[0].style.left && $(this)[0].style.left !== 'auto') {
            styleCount++
            isConform = $(this)[0].style.left.indexOf('%') !== -1 ? isConform : 0
          }
          if ($(this)[0].style.bottom && $(this)[0].style.bottom !== 'auto') {
            styleCount++
            isConform = $(this)[0].style.bottom.indexOf('%') !== -1 ? isConform : 0
          }
          if ($(this)[0].style.right && $(this)[0].style.right !== 'auto') {
            styleCount++
            isConform = $(this)[0].style.right.indexOf('%') !== -1 ? isConform : 0
          }
          if ($(this)[0].style.width) {
            styleCount++
            isConform = $(this)[0].style.width.indexOf('%') !== -1 ? isConform : 0
          }
          if ($(this)[0].style.height) {
            styleCount++
            isConform = $(this)[0].style.height.indexOf('%') !== -1 ? isConform : 0
          }
          if (styleCount && isConform && $(this).attr('class').indexOf('bcric') === -1) {
            $(this).attr('class', $(this).attr('class') + ' bcric')
            $(this).css('z-index', 10)
            $(this).css('position', 'absolute')
          }
        })
        // 标记元素有a 标签
        if (parent.find('a').length) parent.addClass('tools-red-icbaby-border') // tools-red-icbaby-boeder之后记得删
        // 标记元素有hover 标签
        if (parent.find('.bcrjw').length) parent.addClass('tools-yellow-icbaby-border') // tools-red-icbaby-boeder之后记得删
      })
      this.preView()
    },
    onShowButton () {
      const _self = this // vue
      // img
      $('body').on('click mouseenter', '#dwControlPanel .control-panel img', function () {
        const _this = $(this)
        const imgRegion = _this[0].src.replace(_self.urlPrefix, '').split('/')[0]
        const imgName = _this[0].src.split('?$staticlink$')[0].split('/')[_this[0].src.split('?$staticlink$')[0].split('/').length - 1]
        const imgFolder = _this[0].src.split('?$staticlink$')[0].replace(imgName, '').replace(_self.urlPrefix + imgRegion, '')
        const imgType = _this.parent().hasClass('swiper-slide') ? 'swiperImg' : 'ordinaryPicture'
        const imgParentId = _this.parent().attr('id')

        _self.selectedImg = {
          img: _this,
          imgSrc: _this[0].src,
          imgRegion: imgRegion,
          imgFolder: imgFolder,
          imgName: imgName,
          imgType: imgType,
          markId: imgParentId,
          // imgVideo: _this[0].dataset.video
          aTags: _this.parent().find('a'), // aTags是jq元素集合
          hoverTags: _this.parent().find('.bcrjw') // hoverTags
        }

        const offset = _this.offset()
        _self.styleObject.top = offset.top + 'px'
        _self.styleObject.left = offset.left + 'px'
        _self.showPanel = true
      })
    },
    offShowButton () {
      const _self = this // vue
      // img
      $('body').off('click mouseenter', '#dwControlPanel .control-panel img', function () {
        const _this = $(this)
        const imgRegion = _this[0].src.replace(_self.urlPrefix, '').split('/')[0]
        const imgName = _this[0].src.split('?$staticlink$')[0].split('/')[_this[0].src.split('?$staticlink$')[0].split('/').length - 1]
        const imgFolder = _this[0].src.split('?$staticlink$')[0].replace(imgName, '').replace(_self.urlPrefix + imgRegion, '')
        const imgParentId = _this.parent().attr('id')
        _self.selectedImg = {
          img: _this,
          imgSrc: _this[0].src,
          imgRegion: imgRegion,
          imgFolder: imgFolder,
          imgName: imgName,
          markId: imgParentId,
          // imgVideo: _this[0].dataset.video
          aTags: _this.parent().find('a'), // aTags是jq元素集合
          hoverTags: _this.parent().find('.bcrjw') // hoverTags是jq元素集合
        }

        const offset = _this.offset()
        _self.styleObject.top = offset.top + 'px'
        _self.styleObject.left = offset.left + 'px'
        _self.showPanel = true
      })
    },
    changeImg () {
      const url = this.urlPrefix + this.selectedImg.imgRegion + this.selectedImg.imgFolder + this.selectedImg.imgName + '?$staticlink$'
      if (this.selectedImg.img.parent().hasClass('pc-block') || this.selectedImg.img.parent().hasClass('swiper-slide')) {
        this.selectedImg.img.attr({
          src: url,
          'data-src': url,
          'data-pcsrc': url,
          'pc-src': url,
          pcsrc: url
        })
      }
      if (this.selectedImg.img.parent().hasClass('mb-block') || this.selectedImg.img.parent().hasClass('mobile-block') || this.selectedImg.img.parent().hasClass('mob-block') || this.selectedImg.img.parent().hasClass('swiper-slide')) {
        this.selectedImg.img.attr({
          src: url,
          'data-src': url,
          'data-msrc': url,
          'm-src': url,
          msrc: url
        })
      }
      this.$message.success('换图成功')
    },
    changeVideo () {
      this.$message.warning('还未开发此功能！')
      // if (this.selectedImg.imgVideo) {
      //   this.selectedImg.img.attr('data-video', this.selectedImg.imgVideo)
      //   this.selectedImg.img.addClass('events-video-dialog')
      //   this.$message.success('换视频成功')
      // } else {
      //   this.selectedImg.img.removeAttr('data-video')
      //   this.selectedImg.img.removeClass('events-video-dialog')
      //   this.$message.success('删视频成功')
      // }
    },
    putBeforePosition () {
      const parent = this.selectedImg.img.parent()
      if (!parent.prev().length) return this.$message.error('上面没图可以移动')
      const prevImg = parent.prev()
      prevImg.insertAfter(parent)
      this.clearData()
    },
    putNextPosition () {
      const parent = this.selectedImg.img.parent()
      if (!parent.next().length) return this.$message.error('下面没图可以移动')
      const nextImg = parent.next()
      parent.insertAfter(nextImg)
      this.clearData()
    },
    addAnImg (flag) {
      const pcBlock = $('<div class="pc-block" style="position:relative"></div>')
      const mobBlock = $('<div class="mobile-block" style="position:relative"></div>')
      const swiperSlide = $('<div class="swiper-slide" style="position:relative"></div>')
      const thisParent = this.selectedImg.img.parent()
      const url = this.urlPrefix + this.selectedImg.imgRegion + this.selectedImg.imgFolder + this.addImg.imgSrc + '?$staticlink$'
      const newParent = thisParent.clone()
      swiperSlide.addClass('tools-green-border') // tools-green-border之后记得删
      // 先判断是否添加轮播图
      if (this.selectedImg.imgType === 'swiperImg') {
        const newImg = this.selectedImg.img.clone()
        // 判断当前图片是否已在轮播
        if (!thisParent.hasClass('swiper-slide')) { // 否
          // 判断是pc还是mb 创建新的轮播结构
          // pc端
          if (thisParent.hasClass('pc-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-pcsrc': url,
              pcsrc: url
            })
            if (flag === 'prev') {
              thisParent.before(this.createSwiper('pc', newImg))
            } else if (flag === 'next') {
              thisParent.after(this.createSwiper('pc', newImg))
            }
            this.orderSwiper()
            // mob 端
          } else if (thisParent.hasClass('mobile-block') || thisParent.hasClass('mb-block') || thisParent.hasClass('mob-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-msrc': url,
              msrc: url
            })
            if (flag === 'prev') {
              thisParent.before(this.createSwiper('mb', newImg))
            } else if (flag === 'next') {
              thisParent.after(this.createSwiper('mb', newImg))
            }
            this.orderSwiper()
          }
        } else {
          // 添加一个slide
          // pc
          if (thisParent.parent().parent().parent().hasClass('pc-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-pcsrc': url,
              pcsrc: url
            })
            // mb
          } else if (thisParent.parent().parent().parent().hasClass('mobile-block') || thisParent.parent().parent().parent().hasClass('mb-block') || thisParent.parent().parent().parent().hasClass('mob-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-msrc': url,
              msrc: url
            })
          }
          swiperSlide.append(newImg)
          if (flag === 'prev') {
            thisParent.before(swiperSlide)
          } else if (flag === 'next') {
            thisParent.after(swiperSlide)
          }
        }
      } else {
        // 判断当前图片是否是轮播图
        // 是
        if (thisParent.hasClass('swiper-slide')) {
          const newImg = this.selectedImg.img.clone()
          const topParent = thisParent.parent().parent().parent()
          // 判断是pc还是mob
          // pc
          if (topParent.hasClass('pc-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-pcsrc': url,
              pcsrc: url
            })
            pcBlock.append(newImg)
            if (flag === 'prev') {
              topParent.before(pcBlock)
            } else if (flag === 'next') {
              topParent.after(pcBlock)
            }
            // mb
          } else if (topParent.hasClass('mobile-block') || topParent.hasClass('mb-block') || topParent.hasClass('mob-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-msrc': url,
              msrc: url
            })
            mobBlock.append(newImg)
            if (flag === 'prev') {
              topParent.before(mobBlock)
            } else if (flag === 'next') {
              topParent.after(mobBlock)
            }
          }
          // 否
        } else {
          const newImg = newParent.find('img').eq(0)
          if (thisParent.hasClass('pc-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-pcsrc': url,
              pcsrc: url
            })
          } else if (thisParent.hasClass('mobile-block') || thisParent.hasClass('mb-block') || thisParent.hasClass('mob-block')) {
            newImg.attr({
              src: url,
              'data-src': url,
              'data-msrc': url,
              msrc: url
            })
          }
          if (flag === 'prev') {
            thisParent.before(newParent)
          } else if (flag === 'next') {
            thisParent.after(newParent)
          }
        }
      }

      // if (this.addImg.imgVideo) {
      //   newImg.data('video', this.addImg.imgVideo)
      //   this.selectedImg.img.addClass('events-video-dialog')
      // } else {
      //   newImg.removeAttr('data-video')
      //   this.selectedImg.img.removeClass('events-video-dialog')
      // }

      this.clearData()
    },
    // 创建轮播结构
    createSwiper (type, newImg) {
      const pcBlock = $('<div class="pc-block"></div>')
      const mobBlock = $('<div class="mobile-block"></div>')
      const swiperContainer = $('<div class="swiper-container"></div>')
      const swiperWrapper = $('<div class="swiper-wrapper"></div>')
      const swiperSlide = $('<div class="swiper-slide"></div>')
      const swiperPagination = $('<div class="swiper-pagination"></div>')

      pcBlock.css({ position: 'relative', width: '100%' })
      mobBlock.css({ position: 'relative', width: '100%' })
      swiperSlide.css({ position: 'relative', width: '100%' })
      swiperSlide.addClass('tools-green-border') // tools-green-border之后记得删
      swiperSlide.append(newImg)
      swiperWrapper.append(swiperSlide)
      swiperContainer.append(swiperWrapper)
      swiperContainer.append(swiperPagination)

      if (type === 'pc') {
        pcBlock.append(swiperContainer)
        swiperContainer.addClass(`swiper-outing${++this.pcSwiperCounts}`)
        return pcBlock
      } else if (type === 'mb') {
        mobBlock.append(swiperContainer)
        swiperContainer.addClass(`swiper-outing-mb${++this.mobSwiperCounts}`)
        return mobBlock
      }
    },
    // 重新排序swiper
    orderSwiper () {
      // 获取所有swiper
      const pcSwipers = $('#dwControlPanel .pc-block .swiper-container')
      const mbSwipers = $('#dwControlPanel .mobile-block .swiper-container') ?? $('#dwControlPanel .mb-block .swiper-container') ?? $('#dwControlPanel .mob-block .swiper-container')
      // 为swiper重新排序
      if (pcSwipers) {
        pcSwipers.each(function (index) {
          const _this = $(this)
          const originClass = _this.attr('class').split(' ')
          const savedClass = []
          originClass.forEach(item => {
            if (!item.includes('swiper-outing')) savedClass.push(item)
          })
          _this.removeClass().addClass('swiper-container').addClass(`swiper-outing${++index} ${savedClass.join(' ').trim()}`)
        })
      }
      if (mbSwipers) {
        mbSwipers.each(function (index) {
          const _this = $(this)
          const originClass = _this.attr('class').split(' ')
          const savedClass = []
          originClass.forEach(item => {
            if (!item.includes('swiper-outing')) savedClass.push(item)
          })
          _this.removeClass().addClass('swiper-container').addClass(`swiper-outing-mb${++index} ${savedClass.join(' ').trim()}`)
        })
      }
    },
    async deleteAnImg () {
      try {
        await this.$confirm('确定删这张图？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 判断是否删除轮播图
        // 是
        if (this.selectedImg.img.parent().hasClass('swiper-slide')) {
          // 判断是否是最后一张
          if (this.selectedImg.img.parent().parent().find('img').length === 1) {
            // 是
            this.selectedImg.img.parent().parent().parent().parent().remove()
            // 重新排序swiper
            this.orderSwiper()
          } else {
            // 否
            this.selectedImg.img.parent().remove()
          }
          // 否
        } else {
          this.selectedImg.img.parent().remove()
        }
        this.clearData()
      } catch { }
    },
    addParentId () {
      this.selectedImg.img.parent().attr('id', this.selectedImg.markId)
    },
    editTags () {
      this.aDialogVisible = true
    },
    closeATagPanel () {
      this.aDialogVisible = false
    },

    // 添加输入类型轮播
    addSwiper () {
      this.swiperDialogVisible = true
    },
    createSwiperStruct (flag) {
      this.mapStrToSwiStructure(flag)
      this.swiperClassList = []
      this.handleClose()
      this.clearData()
    },
    mapStrToSwiStructure (flag) {
      // 将输入的文字映射为对象aTag
      const aTag = {}
      // pc
      if (this.swiperInputStr) {
        const pcATag = {}
        const pcPagesAList = this.swiperInputStr.trim().split('\n')
        pcPagesAList.forEach((item, index) => {
          // if (item.includes('轮播')) {
          // 轮播图
          if (this.selectedImg.img.parent().hasClass('pc-block')) {
            pcATag[index + 1] = this.convertSwiperObj('pc', index + 1, item, flag)
          } else if (this.selectedImg.img.parent().hasClass('mobile-block')) {
            pcATag[index + 1] = this.convertSwiperObj('mb', index + 1, item, flag)
          }
          // }
        })
        // this.swiperInputStr = ''
        aTag.pc = pcATag
      }
      return aTag
    },
    // 添加LP轮播图 + a标签处理
    convertSwiperObj (type, num, item, flag) {
      const infoArr = item.split(';')
      let swiperStr = ''
      const seImgName = this.selectedImg.imgName
      const imgNameSplit = seImgName.split('.')[0]
      const preImg = imgNameSplit.substr(0, imgNameSplit.length - 2)
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
            // const src = this.fullUrlInput + (type === 'pc' ? this.fullPcImgName : this.fullMbImgName) + item + '?$staticlink$'
            const src = this.urlPrefix + this.selectedImg.imgRegion + this.selectedImg.imgFolder + preImg + item + '?$staticlink$'
            // const src = this.selectedImg.imgFolder + preImg + item + '?$staticlink$'

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
                target="_blank"
                style="position:absolute;z-index:10;width:46%;height:80%;top:10%;left:2%;bottom:auto;right:auto;"
              ></a>`
              singleSwiperImg += `<a
                class="js-button_shop_now bcric"
                href="$url('Product-Show','pid','${item}')$"
                data-ichihiroid="${Math.random()}"
                data-toolcreateid="bcric"
                data-ainput="${item}"
                data-aselectedvalue="商品详情页"
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
        swiperStr += `<div class="swiper-slide tools-green-border" style="position:relative;">${singleSwiperImg}</div>`
      })

      // 轮播图中所有图处理完，最后包装
      swiperStr = `<div class="${type === 'pc' ? 'pc-block' : 'mobile-block'}" style="position:relative;width:100%;">` +
        `<div class="swiper-container ${'swiper-' + type}">` +
        `<div class="swiper-wrapper">${swiperStr}</div>` +
        `<div class="swiper-pagination ${'swiper-pagination-' + type}"></div>` +
        `<div class="swiper-button-prev ${'swiper-prev-' + type}"></div>` +
        `<div class="swiper-button-next ${'swiper-next-' + type}"></div>` +
        '</div>' +
        '</div>'
      this.swiperClassList.push(type + '-' + num) // 记录有哪些swiper
      const swiperWrap = this.selectedImg.img.parent()
      if (flag === 'prev') {
        swiperWrap.before(swiperStr)
      } else if (flag === 'next') {
        swiperWrap.after(swiperStr)
      }
      return swiperWrap
    },
    showgenerateTagsPanel () {
      this.asDialogVisible = true
    },
    generateTags (aTag) {
      this.closeGenerateTagsPanel()
      // 生成pc a标签
      if (aTag?.pc) {
        Object.keys(aTag.pc).forEach(item => {
          $('#dwControlPanel .control-panel').find('.pc-block').eq(item - 1).append(aTag.pc[item])
        })
        if ($('#dwControlPanel .control-panel').find('a').length) {
          $('#dwControlPanel .control-panel .pc-block').find('a').parent('.pc-block').addClass('tools-red-icbaby-border')
        }
      }

      // 生成mb a标签
      if (aTag?.mb) {
        Object.keys(aTag.mb).forEach(item => {
          $('#dwControlPanel .control-panel').find('.mobile-block').eq(item - 1).append(aTag.mb[item])
        })
        if ($('#dwControlPanel .control-panel .mobile-block').find('a').length) {
          $('#dwControlPanel .control-panel').find('a').parent('.mobile-block').addClass('tools-red-icbaby-border')
        }
      }
    },
    closeGenerateTagsPanel () {
      this.asDialogVisible = false
    },
    async setNewATags ({ aStr }) {
      const parent = this.selectedImg.img.parent()
      // 清所有的a
      parent.find('a').each(function () {
        $(this).remove()
      })
      await this.$nextTick()
      parent.append(aStr)
      await this.$nextTick()
      if (parent.find('a').length) parent.addClass('tools-red-icbaby-border')
      parent.find('a').each(function () {
        const _this = $(this)
        const dataVideo = _this.attr('data-videoid')
        if (parent.hasClass('pc-block') || parent.hasClass('swiper-slide')) {
          if (!dataVideo) {
            _this.attr('target', '_blank')
          }
        }

        // 添加device
        if (parent.hasClass('pc-block')) {
          _this.attr('device', 'PC')
        }
        if (parent.hasClass('mobile-block')) {
          _this.attr('device', 'MB')
        }
      })
    },
    async setNewHoverTags ({ hoverStr }) {
      const parent = this.selectedImg.img.parent()
      // 清所有的a
      parent.find('.bcrjw').each(function () {
        $(this).remove()
      })
      await this.$nextTick()
      parent.append(hoverStr)
      await this.$nextTick()
      if (parent.find('.bcrjw').length) parent.addClass('tools-yellow-icbaby-border')
    },
    preView () {
      const finishedHtml = $('#dwControlPanel .control-panel').html().trim()
      this.$emit('getPreviewCode', {
        code: finishedHtml
      })
      const RegExp1 = new RegExp(this.urlPrefix + this.regionValue, 'ig')
      const RegExp2 = new RegExp('tools-red-icbaby-border', 'ig')
      const RegExp3 = new RegExp('tools-green-border', 'ig')
      const RegExp4 = new RegExp('tools-yellow-icbaby-border', 'ig')
      const returnHtml = finishedHtml
        .replace(RegExp1, '')
        .replace(RegExp2, '')
        .replace(RegExp3, '')
        .replace(RegExp4, '')
      return returnHtml
    },
    async genarateCode () {
      this.converHtml = this.preView()
      await this.$nextTick()
      $('.conver-html').find('a').each(function () {
        $(this).removeAttr('data-ichihiroid')
        $(this).removeAttr('data-ichihiroid')
        $(this).addClass('bcric')
        if ($(this).hasClass('js-button_shop_now')) {
          $(this).removeAttr('target')
        }
        const dataSelect = $(this).attr('data-aselectedvalue')
        if (dataSelect === '选项卡') {
          $(this).removeAttr('target')
        }
        // kls监测类
        // const _thisParent = $(this).parent()
        // if (_thisParent.hasClass('pc-block')) {
        //   $(this).addClass('gaTrackPc')
        // } else if (_thisParent.hasClass('mobile-block')) {
        //   $(this).addClass('gaTrackMob')
        // }
      })
      // 处理hover图的问题，用的是蠢方法，之后再改
      $('.conver-html').find('.bcr-hover-img').each(function (index) {
        if (index % 2 === 0) {
          $(this).css('display', 'block')
        } else {
          $(this).css('display', 'none')
        }
      })
      await this.$nextTick()
      this.dialogCode = $('.conver-html').html()

      this.dialogVisible = true
      this.converHtml = ''
    },
    handleClose () {
      this.dialogVisible = false
      this.dialogCode = ''
      this.swiperDialogVisible = false
    },
    initSelectedImg () {
      return {
        img: null,
        imgSrc: '',
        imgRegion: '',
        imgName: '',
        imgFolder: '',
        imgVideo: '',
        markId: '',
        aTags: [],
        hoverTags: []
      }
    },
    initAddImg () {
      return {
        imgSrc: '',
        imgVideo: '',
        aTags: [],
        hoverTags: []
      }
    },
    clearData () {
      this.selectedImg = this.initSelectedImg()
      this.addImg = this.initAddImg()
      // this.swiperInputStr = this.createswiperImg()
      this.$message.success('操作成功')
      this.handleSuccess = false
      setTimeout(() => {
        this.handleSuccess = true
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
#dwControlPanel {
  width: 100%;
}

#dwControlPanel >>> .pc-block {
  width: 100%;
}

#dwControlPanel >>> .pc-block > img {
  position: relative;
  z-index: 2;
  width: 100%;
  border-bottom: 1px solid #333;
}

#dwControlPanel >>> .mobile-block > img {
  position: relative;
  z-index: 2;
  width: 100%;
  border-bottom: 1px solid #333;
}

#dwControlPanel .control-panel >>> a.bcric {
  background-color: rgba(255,0,0,.5);
}

#dwControlPanel .control-panel >>> .bcrjw {
  background-color: rgba(138,0,255,0.5);
}

#dwControlPanel >>> .LPmob {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 5px solid red;
}

.genaration-panel {
  border-bottom: 1px solid #333;
  padding: 12px 40px;
}

.img-panel {
  background-color: rgba(255, 255, 255, 0.93);
  padding-top: 10px;
  padding-bottom: 20px;
  border-left: 2px solid #409eff;
}
.panel-tip{
  color: #f56c6c;
  font-size: 14px;
}

.panel-rows {
  margin-top: 16px;
}

#dwControlPanel >>> .tools-red-icbaby-border {
  border: 3px dotted red;
}

#dwControlPanel >>> .tools-green-border {
  border: 3px dotted green;
  // margin-top: 5px;
  // margin-bottom: 5px;
}

#dwControlPanel >>> .tools-yellow-icbaby-border {
  border: 3px dotted yellow;
}

#dwControlPanel .conver-html {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 1px;
  height: 1px;
  opacity: 0;
}

#dwControlPanel >>> .landingpage-pc,
#dwControlPanel >>> .landingpage-mob {
  width: 100% !important;
  display: block !important;
}

#dwControlPanel >>> .ved-show-min-height {
  min-height: 50px;
}

#dwControlPanel >>> .tab-men { // 适应 BIO LP 修改
  display: block !important
}
</style>
