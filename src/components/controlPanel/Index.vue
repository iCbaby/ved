<template>
  <div id="app-control-panel">
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
      dialogCode: ''
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
      })
    },
    onShowButton () {
      const _self = this // vue vm
      // img
      $('body').on('click mouseenter', '#app-control-panel .control-panel img', function (e) {
        const _this = $(this)
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
    offShowButton () {
      const _self = this // vue vm
      // img
      $('body').off('click mouseenter', '#app-control-panel .control-panel img', function (e) {
        const _this = $(this)
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
      const newImg = this.selectedImg.img.clone()
      newImg.attr('src', this.addImg.imgSrc)

      if (this.addImg.imgVideo) {
        newImg.data('video', this.addImg.imgVideo)
        this.selectedImg.img.addClass('events-video-dialog')
      } else {
        newImg.removeAttr('data-video')
        this.selectedImg.img.removeClass('events-video-dialog')
      }

      if (flag === 'prev') {
        this.selectedImg.img.before(newImg)
      } else if (flag === 'next') {
        this.selectedImg.img.after(newImg)
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
        this.selectedImg.img.remove()
        this.clearData()
      } catch { }
    },
    preView () {
      const finishedHtml = $('#app-control-panel .control-panel').html().trim()
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
#app-control-panel >>> img {
  position: relative;
  z-index: 999;
  width: 60% !important;
  padding: 16px 30% 16px 10% !important;
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
</style>
