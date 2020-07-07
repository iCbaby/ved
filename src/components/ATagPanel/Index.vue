<template>
  <el-dialog
    id="a-tag-panel"
    title="编辑a标签"
    :visible="visible"
    width="35%"
    top="5vh"
    :before-close="closeATagPanel"
  >
    <div class="a-img">
      <img :src="imgSrc" />
      <!-- 下面用 .sync 是偷懒的写法-->
      <AtagEle
        v-for="item in aTagList"
        :key="item.id"
        :aId="item.id"
        :styleObject.sync="item.styleObject"
        :dataObject.sync="item.dataObject"
        @deleteATag="deleteATag"
        @copyATag="copyATag"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" style="margin-right:16px;" @click="addDounbleTag">增加双a 标签</el-button>
      <el-button type="success" style="margin-right:16px;" @click="addATag">增加a 标签</el-button>
      <el-button type="primary" @click="mapObjToATag">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import AtagEle from '@c/ATagEle/Index'
import { copyObj } from '@u/'

export default {
  name: 'ATagPanel',
  components: { AtagEle },
  props: ['visible', 'imgSrc', 'aTags'], // aTags是jq元素集合
  data () {
    return {
      aTagList: []
    }
  },
  watch: {
    aTags: {
      handler (val) {
        this.aTagList = this.mapATagToObj(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    mapATagToObj (list) {
      // list是jq元素集合
      const _self = this
      if (!list.length) return []

      const aList = []
      list.each(function () {
        let {
          position = 'absolute',
          zIndex = 10,
          top = '8%',
          left = '8%',
          width = '8%',
          height = '8%'
        } = $(this)[0].style // 获取已有的样式

        if (!position) position = 'absolute'
        if (!zIndex) zIndex = 10
        if (!top) top = '8%'
        if (!left) left = '8%'
        if (!width) width = '8%'
        if (!height) height = '8%'

        aList.push({
          id: $(this).attr('data-ichihiroid'),
          styleObject: { position, zIndex, top, left, width, height },
          dataObject: {
            classValue: $(this).hasClass('js-button_shop_now') ? 'js-button_shop_now' : '',
            url: _self.resolveUrl($(this))
          }
        })
      })
      return aList
    },
    resolveUrl (aTag) {
      // aTag是jq 元素
      const urlObj = {}
      urlObj.aInput = aTag.attr('data-ainput') ?? ''
      urlObj.gsqname = aTag.attr('gsqname') ?? ''
      urlObj.value = aTag.attr('href') ?? ''
      urlObj.aSelectedValue = aTag.attr('data-aselectedvalue') ?? ''
      return urlObj
    },
    addATag () {
      this.aTagList.push({
        id: new Date().getTime(),
        styleObject: {
          position: 'absolute',
          zIndex: 10,
          top: '8%',
          left: '8%',
          width: '8%',
          height: '8%'
        },
        dataObject: {
          classValue: '',
          video: '',
          url: {
            aSelectedValue: '',
            aInput: '',
            value: '',
            gsqname: ''
          }
        }
      })
    },
    addDounbleTag () {
      const a1 = {
        id: new Date().getTime(),
        styleObject: {
          position: 'absolute',
          zIndex: 10,
          top: '3%',
          left: '25%',
          width: '50%',
          height: '40%'
        },
        dataObject: {
          classValue: '',
          video: '',
          url: {
            aSelectedValue: '商品详情页',
            aInput: '',
            value: '',
            gsqname: ''
          }
        }
      }
      const a2 = {
        id: new Date().getTime() + 1,
        styleObject: {
          position: 'absolute',
          zIndex: 10,
          top: '70%',
          left: '35%',
          width: '30%',
          height: '20%'
        },
        dataObject: {
          classValue: 'js-button_shop_now',
          video: '',
          url: {
            aSelectedValue: '商品详情页',
            aInput: '',
            value: '',
            gsqname: ''
          }
        }
      }
      this.aTagList.push(a1)
      this.aTagList.push(a2)
    },
    deleteATag ({ aId }) {
      const index = this.aTagList.findIndex(item => item.id === aId)
      this.aTagList.splice(index, 1)
    },
    copyATag ({ aId }) {
      const target = this.aTagList.find(item => item.id === aId)
      const newATag = copyObj(target)
      newATag.id = new Date().getTime()
      this.aTagList.push(newATag)
      this.$message.success('复制成功！')
    },
    mapObjToATag () {
      // this.aTagList映射回a 标签
      let aStr = ''
      this.aTagList.forEach(item => {
        const {
          id,
          styleObject: { position, zIndex, top, left, width, height },
          dataObject: {
            classValue,
            video,
            url: { aSelectedValue, aInput, value, gsqname }
          }
        } = item

        const classStr = classValue ? classValue + ' bcric' : 'bcric'
        aStr += `<a
          class="${classStr}"
          href="${value}"
          data-ichihiroid="${id}"
          data-toolcreateid="bcric"
          data-ainput="${aInput}"
          gsqname="${gsqname}"
          ${video || ''}
          data-aselectedvalue="${aSelectedValue}"
          style="position:${position};z-index:${zIndex};top:${top};left:${left};width:${width};height:${height};"
        ></a>`
      })
      this.$emit('setNewATags', { aStr })
      this.$emit('closeATagPanel')
    },
    closeATagPanel () {
      this.$emit('closeATagPanel')
    }
  }
}
</script>

<style lang="stylus" scoped>
// #a-tag-panel {
//   position relative;
// }

.a-img {
  position: relative;
  width: 100%;

  img {
    display: block;
    width: 100%;
    user-select: none;
  }
}
</style>
