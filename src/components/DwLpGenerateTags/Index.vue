<template>
  <el-dialog
    id="generateTagsPanel"
    title="批量创建a标签"
    :visible="visible"
    width="40%"
    top="2vh"
    :before-close="closeTagsPanel"
  >
    <p style="color:red">左边PC右边MB<br/>如果PC端第一张图有sku：KLS001、KLS002，第三张图有sku：KLS003、KLS004<br/>则写为：<br/>1/KLS001/KLS002<br/>3/KLS003/KLS004<br/>每张图占一行，用的是英文符号：/</p>
    <div class="sku-input">
      <el-input
        type="textarea"
        :rows="18"
        placeholder="PC端a标签"
        v-model="pcInputStr">
      </el-input>
      <el-input
        type="textarea"
        :rows="18"
        placeholder="MB端a标签"
        v-model="mbInputStr">
      </el-input>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button style="margin-right:16px;" @click="closeTagsPanel">取消</el-button>
      <el-button type="primary" @click="mapStrToObj">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'GenerateTagsPanel',
  data () {
    return {
      pcInputStr: '',
      mbInputStr: ''
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    mapStrToObj () {
      // 将输入的文字映射为对象aTag
      const aTag = {}

      // pc
      if (this.pcInputStr) {
        const pcATag = {}
        const pcPagesAList = this.pcInputStr.trim().split('\n')
        pcPagesAList.forEach(item => {
          const aList = item.split('/')
          const pageIndex = aList.shift() // 第几张图加a标签
          pcATag[pageIndex] = this.convertObj(aList) // 已经转为可以生成a标签的字符串
        })
        this.pcInputStr = ''
        aTag.pc = pcATag
      }

      // mb
      if (this.mbInputStr) {
        const mbATag = {}
        const mbPagesAList = this.mbInputStr.trim().split('\n')
        mbPagesAList.forEach(item => {
          const aList = item.split('/')
          const pageIndex = aList.shift() // 第几张图加a标签
          mbATag[pageIndex] = this.convertObj(aList) // 已经转为可以生成a标签的字符串
        })
        this.mbInputStr = ''
        aTag.mb = mbATag
      }

      this.$emit('generateTags', aTag)
    },
    convertObj (aList) {
      let aStr = ''
      const aCount = aList.length
      aList.forEach((item, index) => {
        const left = (100 / aCount) * 0.1 // 生成a标签的离左边的距离
        const width = (100 / aCount) * 0.8 // 生成a标签的宽度
        aStr += `<a
          class="bcric"
          href="$url('Product-Show','pid','${item}')$"
          data-ichihiroid="${Math.random()}"
          data-toolcreateid="bcric"
          data-ainput="${item}"
          data-aselectedvalue="商品详情页"
          style="position:absolute;z-index:10;top:3%;left:${(left * (index * 2 + 1) + index * width) + '%'};width:${width + '%'};height:40%;bottom:auto;right:auto;"
        ></a>`
        aStr += `<a
          class="js-button_shop_now bcric"
          href="$url('Product-Show','pid','${item}')$"
          data-ichihiroid="${Math.random()}"
          data-toolcreateid="bcric"
          data-ainput="${item}"
          data-aselectedvalue="商品详情页"
          style="position:absolute;z-index:10;top:70%;left:${(left * (index * 2 + 1) + index * width) + '%'};width:${width + '%'};height:20%;bottom:auto;right:auto;"
        ></a>`
      })
      return aStr
    },
    closeTagsPanel () {
      this.$emit('closeGenerateTagsPanel')
    }
  }
}
</script>

<style lang="stylus" scoped>
#generateTagsPanel .sku-input {
  display: flex;
  justify-content: space-between;
}

#generateTagsPanel .sku-input >>> el-input {
  flex: 0 0 48%
}

#generateTagsPanel >>> .el-dialog__body {
  padding: 0 20px 30px;
}
</style>
