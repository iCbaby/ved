<template>
  <div
    :style="styleObject"
    :class="['hover-tag-ele', {'bgc-size': changeSize}]"
    draggable="true"
    @dragstart="dragStart"
    @dragend="dragEnd"
  >
    <div class="size-dot" @dblclick="dblclickSize" />
    <i class="del-dot el-icon-error" @click="delHoverTag" />
    <i class="copy-dot el-icon-circle-plus" @click="copyHoverTag" />
  </div>
</template>

<script>
export default {
  name: 'HoverTagEle',
  props: ['aId', 'styleObject'],
  data () {
    return {
      positionX: 0,
      positionY: 0,
      offsetX: 0,
      offsetY: 0,
      changeSize: false
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
    async delHoverTag () {
      try {
        await this.$confirm('确认删除？')
        this.$emit('deleteHoverTag', { aId: this.aId })
      } catch {}
    },
    copyHoverTag () {
      this.$emit('copyHoverTag', { aId: this.aId })
    }
  }
}
</script>

<style lang="stylus" scoped>
.hover-tag-ele {
  position: relative;
  background-color: rgba(138,0,255,.5);
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
</style>
