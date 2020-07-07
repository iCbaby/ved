<template>
  <div
    :style="styleObject"
    :class="['a-tag-ele', {'bgc-size': changeSize}]"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd"
  >
    <div class="size-dot" @dblclick="dblclickSize" />
    <div class="link-dot" @click="clickLink" />
    <i class="del-dot el-icon-error" @click="delATag" />
    <i class="copy-dot el-icon-circle-plus" @click="copyATag" />
    <div v-if="dataObject.url.length" class="text">{{aSelectedValue}}：{{aInput}}。{{dataObject.classValue ? '弹框' : ''}}</div>
    <el-dialog
      title="编辑a标签跳转"
      :visible.sync="aDetailDialogVisible"
      width="60%"
      append-to-body
    >
      <div>
        <el-select v-model="aSelectedValue" placeholder="请选择" size="small" style="width:16%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="classValue"
          placeholder="请选择"
          size="small"
          style="width:16%;marginLeft:2%"
          :disabled="aSelectedValue !== '商品详情页' && aSelectedValue !== '视频'"
        >
          <el-option
            v-for="item in classOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="aInput" placeholder="请输入" size="small" style="width:20%;marginLeft:2%" />
        <el-input v-model="gsqname" placeholder="请输入gsqname" size="small" style="width:20%;marginLeft:2%" />
        <el-button type="primary" :disabled="!aSelectedValue.length || !aInput.length" @click="setALink" style="marginLeft:2%">确定</el-button>
      <div class="video-tips">
        <h5 style="color: #f13b3b">当选择视频时，后面输入视频链接的id</h5>
        <h5 style="color: #f13b3b">例如视频链接为：https://v.youku.com/v_show/id_XNDM1MTMyNDcwMA==.html, 则输入<span style="color:#3296fa">XNDM1MTMyNDcwMA</span></h5>
        <h5 style="color: #f13b3b">当选择选项卡时，后面输入的则是href的值，务必记住自己输入的值，即如果在这里输入pcmen，则在外面要跳到的图片那里就输入id（pcmen）。</h5>
        <h5>例如：BIO的男士/女士按钮点击跳到对应的男士/女士位置，如果是男士按钮编辑a标签的时候输入的是pcmen,那么在男士区域的第一张图片的id处输入pcmen。</h5>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'aTagEle',
  props: ['aId', 'styleObject', 'dataObject'],
  data () {
    return {
      positionX: 0,
      positionY: 0,
      offsetX: 0,
      offsetY: 0,
      changeSize: false,
      aDetailDialogVisible: false,
      options: [
        {
          value: '商品列表页',
          label: '商品列表页'
        }, {
          value: '商品详情页',
          label: '商品详情页'
        }, {
          value: 'LD',
          label: 'LD'
        }, {
          value: '不常用',
          label: '不常用'
        }, {
          value: '外部链接',
          label: '外部链接'
        }, {
          value: '视频',
          label: '视频'
        }, {
          value: '选项卡',
          label: '选项卡'
        }

      ],
      classOptions: [
        {
          value: '直接跳转',
          label: '直接跳转'
        }, {
          value: '弹框',
          label: '弹框'
        }, {
          value: '优酷视频',
          label: '优酷视频'
        }, {
          value: '腾讯视频',
          label: '腾讯视频'
        }
      ],
      classValue: this.dataObject.classValue === 'js-button_shop_now' ? '弹框' : '',
      aSelectedValue: this.dataObject.url.aSelectedValue,
      aInput: this.dataObject.url.aInput,
      gsqname: this.dataObject.url.gsqname
      // value: this.dataObject.url.value
    }
  },
  created () {
    this.onChangeSize()
  },
  methods: {
    dragStart (e) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'

      const _this = $(e.target)
      // 距离父元素的距离 px
      this.positionX = _this.position().left
      this.positionY = _this.position().top
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    },
    dragEnd (e) {
      // X Y 拖动距离
      const diffX = e.offsetX - this.offsetX
      const diffY = e.offsetY - this.offsetY

      // 停止拖动后的 X Y
      const endX = this.positionX + diffX
      const endY = this.positionY + diffY

      // 计算top left 新的百分比，并赋值
      const _this = $(e.target)
      const endXPer = (endX / _this.parent().width() * 100).toFixed(2)
      const endYPer = (endY / _this.parent().height() * 100).toFixed(2)
      this.styleObject.top = endYPer + '%'
      this.styleObject.left = endXPer + '%'
    },
    dragOver (e) {
      e.preventDefault() // 规定写法
    },
    dblclickSize () {
      this.changeSize = !this.changeSize
    },
    onChangeSize (e) {
      const _self = this // vue
      $(document).keydown(function (e) {
        if (_self.changeSize) {
          const size = 3
          switch (e.keyCode) {
            case 87:
              _self.styleObject.height = (parseInt(_self.styleObject.height.split('%')[0]) - size) + '%'
              break
            case 83:
              _self.styleObject.height = (parseInt(_self.styleObject.height.split('%')[0]) + size) + '%'
              break
            case 65:
              _self.styleObject.width = (parseInt(_self.styleObject.width.split('%')[0])) - size + '%'
              break
            case 68:
              _self.styleObject.width = (parseInt(_self.styleObject.width.split('%')[0])) + size + '%'
              break
            default:
              break
          }
        }
      })
    },
    clickLink () {
      this.aDetailDialogVisible = true
    },
    setALink () {
      this.dataObject.url.aSelectedValue = this.aSelectedValue
      this.dataObject.classValue = ''
      this.dataObject.url.aInput = this.aInput
      this.dataObject.url.gsqname = this.gsqname

      switch (this.aSelectedValue) {
        case '商品列表页':
          this.dataObject.url.value = `$url('Search-Show','cgid','${this.aInput}')$`
          break
        case '商品详情页':
          this.dataObject.classValue = this.classValue === '弹框' ? 'js-button_shop_now' : ''
          this.dataObject.url.value = `$url('Product-Show','pid','${this.aInput}')$`
          break
        case 'LD':
          this.dataObject.url.value = `$url('Page-Show','cid','${this.aInput}')$`
          break
        case '不常用':
          this.dataObject.url.value = `$url('Search-Show','fdid','${this.aInput}')$`
          break
        case '外部链接':
          this.dataObject.url.value = this.aInput
          break
        case '视频':
          this.dataObject.classValue = this.classValue === '腾讯视频' ? 'tencent_video' : ''
          this.dataObject.url.value = 'javascript:;'
          this.dataObject.video = `data-videoid=${this.aInput}`
          break
        case '选项卡':
          this.dataObject.url.value = '#' + this.aInput
          break
        default:
          break
      }
      // 父组件用了.sync，所以不用$emit，直接关dialog
      this.aDetailDialogVisible = false
    },
    async delATag () {
      try {
        await this.$confirm('确认删除此链接？')
        this.$emit('deleteATag', { aId: this.aId })
      } catch {}
    },
    copyATag () {
      this.$emit('copyATag', { aId: this.aId })
    }
  }
}
</script>

<style lang="stylus" scoped>
.a-tag-ele {
  position: relative;
  background-color: rgba(255,0,0,.5);
}

.bgc-size {
  background-color: rgba(0,255,255,.5);
}

.size-dot {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 20px;
  height: 20px;
  z-index 2;
  background-color: rgba(0,255,255,.5);
}

.link-dot {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 20px;
  height: 20px;
  z-index 2;
  border-radius: 50%;
  background-color: rgba(255,255,0,.5);
}

.del-dot {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 20px;
  height: 20px;
  z-index 2;
  border-radius: 50%;
  color: rgba(255,0,0,.5);
  font-size 20px;
}

.copy-dot {
  position: absolute;
  bottom: -20px;
  left: -20px;
  width: 20px;
  height: 20px;
  z-index 2;
  border-radius: 50%;
  color: rgba(255,0,255,.5);
  font-size 20px;
}

.text {
  position: absolute;
  bottom: -85px;
  left: 0;
  z-index: 2;
  display: block;
  background-color red;
}
.panel-content{
  padding: 30px 20px 0 20px !important;
}
.video-tips {
  margin-top: 10px;
}
</style>
