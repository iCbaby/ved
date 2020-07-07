<template>
  <div id="appControlPanel">
    <div v-if="insertdHtml" class="genaration-panel" align="right">
      <el-button size="mini" type="primary" @click="preView">预览</el-button>
      <el-button size="mini" type="success" style="marginLeft:24px" @click="genarateCode">生成代码</el-button>
    </div>
    <div v-if="handleSuccess">
      <div v-if="showPanel" class="img-panel" :style="styleObject">
        <div>
          <el-button size="mini" type="primary" @click="putBeforePosition">向上移动一格</el-button>
          <el-button size="mini" type="primary" @click="putNextPosition">向下移动一格</el-button>
        </div>
        <div class="panel-rows">
          换图：
          <el-input v-model="selectedImg.imgSrc" size="mini" placeholder="图片src" style="width:75%" />
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
          <!-- 添加图片 -->
          <el-select v-model="selectedImg.imgType" size="mini" placeholder="请选择" style="width: 15%">
            <el-option
              v-for="item in imgTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        <div class="panel-rows" style="margin-bottom: 50px;">
          <el-button size="mini" type="danger" @click="deleteAnImg">删除</el-button>
        </div>
      </div>
    </div>
    <div v-if="insertdHtml" v-html="insertdHtml" class="control-panel" />
    <el-dialog title="生成的代码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input v-model="dialogCode" type="textarea" :rows="10" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ControlPanel',
  components: {},
  data () {
    return {
      handleSuccess: true,
      insertdHtml: '',
      showPanel: false,
      styleObject: {
        position: 'absolute',
        zIndex: 1000,
        top: 0,
        left: 0
      },
      selectedImg: this.initSelectedImg(),
      addImg: this.initAddImg(),
      dialogVisible: false,
      dialogCode: '',
      isTab: '',
      imgTypes: [
        {
          value: 'ordinaryPicture',
          label: '普通图片'
        },
        {
          value: 'tab',
          label: '选项卡'
        }
      ]
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
      this.$nextTick(() => {
        this.insertdHtml = val.code
        this.modifyEle()
      })
    },
    async modifyEle () {
      await this.$nextTick()
      $('img').each(function (index) {
        const _this = $(this) // jq
        if (!_this.hasClass('ved-show-min-height')) {
          // 为每个图片添加一个最小高度 防止图片路径错误时 无法删除
          _this.addClass('ved-show-min-height')
        }
      })
    },
    onShowButton () {
      const _self = this // vue vm
      // img
      $('body').on('click mouseenter', '#appControlPanel .control-panel img', function (e) {
        const _this = $(this)
        const imgType = _this.parent().hasClass('tab1') || _this.parent().hasClass('tab2') ? 'tab' : 'ordinaryPicture'
        _self.selectedImg = {
          img: _this,
          imgSrc: _this[0].src,
          imgType: imgType,
          imgVideo: _this[0].dataset.video
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
      $('body').off('click mouseenter', '#appControlPanel .control-panel img', function (e) {
        const _this = $(this)
        if (!_this.hasClass('ved-show-min-height')) {
          // 为每个图片添加一个最小高度 防止图片路径错误时 无法删除
          _this.addClass('ved-show-min-height')
        }
        _self.selectedImg = {
          img: _this,
          imgSrc: _this[0].src,
          imgVideo: _this[0].dataset.video
        }
        const offset = _this.offset()
        _self.styleObject.top = offset.top + 'px'
        _self.styleObject.left = offset.left + 40 + 'px'
        _self.showPanel = true
      })
    },
    // 判断是否是选项卡
    handleIsTab (img) {
      const parent = img.parent()
      if (parent.hasClass('tab1')) {
        this.isTab = 'tab1'
      } else if (parent.hasClass('tab2')) {
        this.isTab = 'tab2'
      } else this.isTab = false
      return this.isTab
    },
    changeImg () {
      this.selectedImg.img.attr('src', this.selectedImg.imgSrc)
      this.$message.success('换图成功')
    },
    changeVideo () {
      if (this.selectedImg.imgVideo) {
        this.selectedImg.img.attr('data-video', this.selectedImg.imgVideo)
        this.selectedImg.img.addClass('events-video-dialog')
        this.$message.success('换视频成功')
      } else {
        this.selectedImg.img.removeAttr('data-video')
        this.selectedImg.img.removeClass('events-video-dialog')
        this.$message.success('删视频成功')
      }
    },
    putBeforePosition () {
      if (!this.selectedImg.img.prev().length) return this.$message.error('上面没图可以移动')
      const prevImg = this.selectedImg.img.prev()
      const selectedImg = this.selectedImg.img
      prevImg.insertAfter(selectedImg)
      this.clearData()
    },
    putNextPosition () {
      if (!this.selectedImg.img.next().length) return this.$message.error('下面没图可以移动')
      if (!this.selectedImg.img.next().attr('src')) return this.$message.error('下面不是图，不能移动')
      const nextImg = this.selectedImg.img.next()
      const selectedImg = this.selectedImg.img
      selectedImg.insertAfter(nextImg)
      this.clearData()
    },
    addAnImg (flag) {
      const parent = this.selectedImg.img.parent()
      const tab1 = $('<div class="tab1" style="display: none;"></div>')
      const tab2 = $('<div class="tab2" style="display: none;"></div>')
      const pcLandtab = $('<div class="landtab" style="position: absolute;top:0px;left:0.00px;width:100%;height:150.00px">')
      const mbLandtab = $('<div class="landtab" style="position: absolute;top:0px;left:0.00px;width:100%;height:90.00px">')
      const span1 = $('<span class="span1" style="display: block;width: 25%;height: 100%;position: absolute;top: 0;left: 0%;cursor: pointer;"></span>')
      const span2 = $('<span class="span2" style="display: block;width: 25%;height: 100%;position: absolute;top: 0;left: 0%;cursor: pointer;"></span>')
      const newImg = this.selectedImg.img.clone()
      newImg.attr('src', this.addImg.imgSrc)
      // 判断是否是添加选项卡
      if (this.selectedImg.imgType === 'tab') {
        // 添加选项卡
        // 判断当前图片是否是选项卡图片
        if (parent.hasClass('tab1')) {
          // 是
          tab1.append(newImg)
          if (flag === 'prev') {
            parent.before(tab1)
          } else if (flag === 'next') {
            parent.after(tab1)
          }
          this.addSpan(tab1, span1)
        } else if (parent.hasClass('tab2')) {
          tab2.append(newImg)
          if (flag === 'prev') {
            parent.before(tab2)
          } else if (flag === 'next') {
            parent.after(tab2)
          }
          this.addSpan(tab2, span2)
        } else {
          // 否
          // 创建选项卡结构
          if (parent.hasClass('none-sm')) {
            // pc
            tab1.append(newImg)
            if (flag === 'prev') {
              this.selectedImg.img.before(this.createTabStructure(tab1, pcLandtab))
            } else if (flag === 'next') {
              this.selectedImg.img.after(this.createTabStructure(tab1, pcLandtab))
            }
            this.addSpan(tab1, span1)
          } else if (parent.hasClass('block-sm')) {
            // mb
            tab2.append(newImg)
            if (flag === 'prev') {
              this.selectedImg.img.before(this.createTabStructure(tab2, mbLandtab))
            } else if (flag === 'next') {
              this.selectedImg.img.after(this.createTabStructure(tab2, mbLandtab))
            }
            this.addSpan(tab2, span2)
          }
        }
      } else {
        // 添加普通图片
        // 判断当前图片是否为选项卡图片
        // 若是选项卡
        if (parent.hasClass('tab1') || parent.hasClass('tab2')) {
          if (flag === 'prev') {
            parent.parent().parent().before(newImg)
          } else if (flag === 'next') {
            parent.parent().parent().after(newImg)
          }
        } else {
          // 若为普通图片
          if (flag === 'prev') {
            this.selectedImg.img.before(newImg)
          } else if (flag === 'next') {
            this.selectedImg.img.after(newImg)
          }
        }
      }
      // 添加视频
      if (this.addImg.imgVideo) {
        newImg.data('video', this.addImg.imgVideo)
        this.selectedImg.img.addClass('events-video-dialog')
      } else {
        newImg.removeAttr('data-video')
        this.selectedImg.img.removeClass('events-video-dialog')
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
        // 判断是否是选项卡
        if (this.selectedImg.img.parent().hasClass('img-box')) {
          // 否
          this.selectedImg.img.remove()
        } else {
          // 是
          // 判断是否是最后一张
          // 若是则删除整个选项卡结构
          if (this.selectedImg.img.parent().siblings().length === 1) {
            // 删除选项卡结构
            this.selectedImg.img.parent().parent().parent().remove()
          } else {
            await this.$nextTick()
            this.deleteSpan(this.selectedImg.img.parent())
            this.selectedImg.img.parent().remove()
          }
        }
        this.clearData()
      } catch { }
    },
    createTabStructure (tab, landtab) {
      const div = $('<div style="position: relative;"></div>')
      const landtabwrap = $('<div class="landtabwrap"></div>')
      tab.css('display', 'block')
      landtabwrap.append(tab)
      landtabwrap.append(landtab)
      div.append(landtabwrap)
      return div
    },
    async addSpan (tab, span) {
      const tabNum = tab.siblings().length
      const pcLandtabs = $('#appControlPanel .none-sm .landtab')
      let pcLandtab = pcLandtabs
      const mbLandtabs = $('#appControlPanel .block-sm .landtab')
      let mbLandtab = mbLandtabs
      if (pcLandtabs.length > 1) {
        pcLandtab = pcLandtabs.eq(0)
      }
      if (mbLandtabs.length > 1) {
        mbLandtab = mbLandtabs.eq(0)
      }
      if (tab.hasClass('tab1')) {
        pcLandtab.append(span)
        await this.$nextTick()
        pcLandtab.find('span').each(function (index) {
          if ($(this).hasClass('span1')) {
            $(this).css('width', `${100 / tabNum}%`)
            $(this).css('left', `${(100 / tabNum) * (parseInt(index))}%`)
          }
        })
      } else if (tab.hasClass('tab2')) {
        mbLandtab.append(span)
        await this.$nextTick()
        mbLandtab.find('span').each(function (index) {
          if ($(this).hasClass('span2')) {
            $(this).css('width', `${100 / tabNum}%`)
            $(this).css('left', `${(100 / tabNum) * (parseInt(index))}%`)
          }
        })
      }
    },
    async deleteSpan (tab) {
      const tabNum = tab.siblings().length - 1
      const pcLandtab = $('#appControlPanel .none-sm .landtab')
      const mbLandtab = $('#appControlPanel .block-sm .landtab')
      if (tab.hasClass('tab1')) {
        pcLandtab.find('span').eq(0).remove()
        await this.$nextTick()
        pcLandtab.find('span').each(function (index) {
          if ($(this).hasClass('span1')) {
            $(this).css('width', `${100 / tabNum}%`)
            $(this).css('left', `${(100 / tabNum) * (parseInt(index))}%`)
          }
        })
      } else if (tab.hasClass('tab2')) {
        mbLandtab.find('span').eq(0).remove()
        await this.$nextTick()
        mbLandtab.find('span').each(function (index) {
          if ($(this).hasClass('span2')) {
            $(this).css('width', `${100 / tabNum}%`)
            $(this).css('left', `${(100 / tabNum) * (parseInt(index))}%`)
          }
        })
      }
    },
    preView () {
      const finishedHtml = $('#appControlPanel .control-panel').html().trim()
      this.$emit('getPreviewCode', {
        code: finishedHtml
      })
      const RegExp1 = new RegExp('https://res.yslbeautycn.com/resources/', 'ig')
      const RegExp2 = new RegExp('https://res-stage.yslbeautycn.com/resources/', 'ig')
      const returnHtml = finishedHtml
        .replace(RegExp1, '')
        .replace(RegExp2, '')
      return returnHtml
    },
    genarateCode () {
      this.dialogCode = this.preView()
      this.dialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
      this.dialogCode = ''
    },
    initSelectedImg () {
      return {
        img: null,
        imgSrc: '',
        imgVideo: ''
      }
    },
    initAddImg () {
      return {
        imgSrc: '',
        imgVideo: ''
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
#appControlPanel >>> img {
  position: relative;
  z-index: 999;
  width: 100% !important;
  border-bottom: 1px solid #333;
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

#appControlPanel >>> .ved-show-min-height {
  min-height: 50px;
}
</style>
