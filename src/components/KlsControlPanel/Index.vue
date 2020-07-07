<template>
  <div id="dw-control-panel">
    <!-- 最上面的按钮 -->
    <div v-if="insertdHtml" class="genaration-panel" align="right">
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
      </div>
      <div class="panel-rows">
        换图：
        <el-input v-model="selectedImg.imgName" size="mini" placeholder="图片src" style="width:75%" />
        <el-button
          size="mini"
          type="primary"
          :disabled="!selectedImg.imgSrc"
          style="margin-left:16px"
          @click="changeImg"
        >换图</el-button>
      </div>
      <div class="panel-rows">
        换视频：
        <el-input
          v-model="selectedImg.imgVideo"
          size="mini"
          placeholder="视频src"
          style="width:70%"
        />
        <el-button size="mini" type="primary" style="margin-left:16px" @click="changeVideo">换视频</el-button>
      </div>
      <div class="panel-rows">
        添加：
        <el-input v-model="addImg.imgSrc" size="mini" placeholder="需要添加的图片src" style="width:33%" />
        <el-input
          v-model="addImg.imgVideo"
          size="mini"
          placeholder="需要添加的视频src"
          style="width:33%;margin-left:8px"
        />
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
        <el-button size="mini" type="danger" @click="deleteAnImg">删除</el-button>
        <el-button
          size="mini" type="primary"
          style="marginLeft:40px"
          @click="editTags">编辑a标签</el-button>
      </div>
    </div>

    <!-- 编辑a标签面板 -->
    <ATagPanel
      :visible="aDialogVisible"
      :imgSrc="selectedImg.imgSrc"
      :aTags="selectedImg.aTags"
      @setNewATags="setNewATags"
      @closeATagPanel="closeATagPanel"
    />

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
import ATagPanel from '@c/ATagPanel/Index'

export default {
  name: 'DwControlPanel',
  components: { ATagPanel },
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
      urlPrefix: 'https://staging-cn-loreal.demandware.net/on/demandware.static/-/Sites-kiehls-cn-Library/default',
      aDialogVisible: false,
      converHtml: ''
    }
  },
  created () {
    this.onShowButton()
  },
  beforeDestroy () {
    this.offShowButton()
  },
  methods: {
    setHtml (val) {
      this.insertdHtml = ''
      this.skuCode = val.skuCode

      this.$nextTick(() => {
        // 生成html
        this.insertdHtml = val.code
        if (val.createStatus) {
          this.createImgs({
            pcImgCounts: val.pcImgCounts,
            mbImgCounts: val.mbImgCounts,
            pdpUrlInput: val.pdpUrlInput,
            pdpPcImgName: val.pdpPcImgName,
            pdpMobImgName: val.pdpMobImgName
          })
        }
        this.modifyEle()
      })
    },
    // 生成指定数量图片
    createImgs (data) {
      const imgCounts = data.pcImgCounts > data.mbImgCounts ? data.pcImgCounts : data.mbImgCounts
      this.$nextTick(() => {
        for (let i = 1; i <= imgCounts; i++) {
          const pcblock = $('<div class="pc-block" style="position: relative;">')
          const mbblock = $('<div class="mobile-block" style="position: relative;">')
          const pcImg = $('<img class="lazyload">')
          const mbImg = $('<img class="lazyload">')
          if (i <= data.pcImgCounts) {
            if (i < 10) {
              pcImg.attr('data-src', `${data.pdpUrlInput}${data.pdpPcImgName}0${i}.jpg?$staticlink$`)
            } else {
              pcImg.attr('data-src', `${data.pdpUrlInput}${data.pdpPcImgName}${i}.jpg?$staticlink$`)
            }
            pcblock.append(pcImg)
            $('#dw-control-panel .LPpc').append(pcblock)
          }
          if (i <= data.mbImgCounts) {
            if (i < 10) {
              mbImg.attr('data-src', `${data.pdpUrlInput}${data.pdpMobImgName}0${i}.jpg?$staticlink$`)
            } else {
              mbImg.attr('data-src', `${data.pdpUrlInput}${data.pdpMobImgName}${i}.jpg?$staticlink$`)
            }
            mbblock.append(mbImg)
            $('#dw-control-panel .LPmob').append(mbblock)
          }
        }
      })
    },
    modifyEle () {
      const _self = this // vue
      // 替换img src
      this.$nextTick(() => {
        $('img').each(function (index) {
          const _this = $(this) // jq
          if (!_this.hasClass('ved-show-min-height')) {
          // 为每个图片添加一个最小高度 防止图片路径错误时 无法删除
            _this.addClass('ved-show-min-height')
          }
          _this.css('width', '100%')
          let src = _this.attr('data-src') || _this.attr('src') || _this.attr('pc-src') || _this.attr('mb-src')
          // 补全路径
          if (src.indexOf('/') !== 0) src = '/' + src
          // 获取sku号
          // if (index === 0) {
          //   _self.skuCode = src.split('/')[2]
          //   _self.$message.warning('你在修改sku号：' + _self.skuCode)
          // }
          // 设置src data-src
          const url = _self.urlPrefix + src
          _this.attr({
            src: url,
            'data-src': url
          })
          // 清className
          const parent = _this.parent()
          if (parent.hasClass('pc-block') && !parent.hasClass('LPpc') && !parent.hasClass('landingpage')) {
            parent.css({ position: 'relative' }).removeClass().addClass('pc-block')
          }
          if (parent.hasClass('mobile-block') && !parent.hasClass('LPmob') && !parent.hasClass('landingpage')) {
            parent.css({ position: 'relative' }).removeClass().addClass('mobile-block')
          }
          // 帮每个a 标签标记一下，后面做a 标签的映射
          parent.find('a').each(function () {
            if (!$(this).attr('data-ichihiroid')) {
              $(this).attr('data-ichihiroid', $(this).attr('href') + Math.random())
            }
          })
          // 标记元素有a 标签
          if (parent.find('a').length) parent.addClass('tools-red-icbaby-border') // tools-red-icbaby-boeder之后记得删
        })
        // 为pc、mb设置分界
        $('#dw-control-panel .LPpc').addClass('tools-pc-blue-border')
        $('#dw-control-panel .LPmob').addClass('tools-mb-red-border')
        // 同步预览
        this.preView()
      })
    },
    onShowButton () {
      const _self = this // vue
      // img
      $('body').on('click mouseenter', '#dw-control-panel .control-panel img', function (e) {
        const _this = $(this)
        const imgName = _this[0].src.split('?$staticlink$')[0].split('/')[_this[0].src.split('?$staticlink$')[0].split('/').length - 1]
        _self.selectedImg = {
          img: _this,
          imgName: imgName,
          imgSrc: _this[0].src,
          // imgVideo: _this[0].dataset.video
          aTags: _this.parent().find('a') // aTags是jq元素集合
        }

        const offset = _this.offset()
        _self.styleObject.top = offset.top + 'px'
        _self.styleObject.left = offset.left + 'px'
        _self.showPanel = true
      })
    },
    offShowButton () {
      const _self = this // vue vm
      // img
      $('body').off('click mouseenter', '#dw-control-panel .control-panel img', function (e) {
        const _this = $(this)
        _self.selectedImg = {
          img: _this,
          imgSrc: _this[0].src,
          // imgVideo: _this[0].dataset.video,
          aTags: _this.parent().find('a')
        }
        const offset = _this.offset()
        _self.styleObject.top = offset.top + 'px'
        _self.styleObject.left = offset.left + 40 + 'px'
        _self.showPanel = true
      })
    },
    changeImg () {
      const url = this.urlPrefix + '/pdp/' + this.skuCode + '/' + this.selectedImg.imgName + '?$staticlink$'
      this.selectedImg.img.attr({
        src: url,
        'data-src': url
      })
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
      const thisParent = this.selectedImg.img.parent()
      const newParent = thisParent.clone()
      const newImg = newParent.find('img').eq(0)
      const url = this.urlPrefix + '/pdp/' + this.skuCode + '/' + this.addImg.imgSrc + '?$staticlink$'
      newImg.attr({
        src: url,
        'data-src': url
      })

      // if (this.addImg.imgVideo) {
      //   newImg.data('video', this.addImg.imgVideo)
      //   this.selectedImg.img.addClass('events-video-dialog')
      // } else {
      //   newImg.removeAttr('data-video')
      //   this.selectedImg.img.removeClass('events-video-dialog')
      // }

      if (flag === 'prev') {
        thisParent.before(newParent)
      } else if (flag === 'next') {
        thisParent.after(newParent)
      }
      this.clearData()
    },
    async deleteAnImg () {
      try {
        await this.$confirm('确定删这张图？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.selectedImg.img.parent().remove()
        this.clearData()
      } catch { }
    },
    editTags () {
      this.aDialogVisible = true
    },
    closeATagPanel () {
      this.aDialogVisible = false
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
        if (parent.hasClass('pc-block')) {
          $(this).attr('target', '_blank')
        }
      })
    },
    preView () {
      const finishedHtml = $('#dw-control-panel .control-panel').html().trim()
      this.$emit('getPreviewCode', {
        code: finishedHtml
      })
      const RegExp1 = new RegExp(this.urlPrefix, 'ig')
      const RegExp2 = new RegExp('tools-red-icbaby-border', 'ig')
      const RegExp3 = new RegExp('tools-pc-blue-border', 'ig')
      const RegExp4 = new RegExp('tools-mb-red-border', 'ig')
      const returnHtml = finishedHtml
        .replace(RegExp1, '')
        .replace(RegExp2, '')
        .replace(RegExp3, '')
        .replace(RegExp4, '')
      return returnHtml
    },
    genarateCode () {
      this.converHtml = this.preView()
      this.$nextTick(() => {
        $('.conver-html').find('img').each(function () {
          $(this).removeAttr('pc-src').removeAttr('mb-src').removeAttr('alt')
        })

        $('.conver-html').find('a').each(function () {
          $(this).removeAttr('data-ichihiroid')
        })

        this.$nextTick(() => {
          this.dialogCode = $('.conver-html').html()
          this.dialogVisible = true
          this.converHtml = ''
        })
      })
    },
    handleClose () {
      this.dialogVisible = false
      this.dialogCode = ''
    },
    initSelectedImg () {
      return {
        img: null,
        imgSrc: '',
        imgName: '',
        imgVideo: '',
        aTags: []
      }
    },
    initAddImg () {
      return {
        imgSrc: '',
        imgVideo: '',
        aTags: []
      }
    },
    clearData () {
      this.selectedImg = this.initSelectedImg()
      this.addImg = this.initAddImg()
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
#dw-control-panel {
  width: 100%;
}

#dw-control-panel >>> .pc-block > img,
#dw-control-panel >>> .mobile-block > img {
  position: relative;
  z-index: 2;
  width: 100%;
  border-bottom: 1px solid #333;
}

#dw-control-panel .control-panel >>> a.bcric {
  background-color: rgba(255,0,0,.5);
}

#dw-control-panel >>> .landingpage-mob {
  margin-top: 20px;
  border-top: 5px solid red;
}

.genaration-panel {
  border-bottom: 1px solid #333;
  padding: 12px 40px;
}

.img-panel {
  background-color: rgba(255, 255, 255, 0.93);
}

.panel-rows {
  margin-top: 16px;
}

#dw-control-panel >>> .tools-red-icbaby-border {
  border: 3px dotted red;
}

#dw-control-panel >>> .tools-pc-blue-border {
  border: 2px solid #0990d8;
}

#dw-control-panel >>> .tools-mb-red-border {
  border: 2px solid red;
}

#dw-control-panel .conver-html {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 1px;
  height: 1px;
  opacity: 0;
}

#dw-control-panel >>> .ved-show-min-height {
  min-height: 50px;
}
</style>
