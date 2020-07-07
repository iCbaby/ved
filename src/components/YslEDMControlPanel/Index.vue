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
      <el-button
        size="mini"
        type="primary"
      >{{this.selectedImg.imgStruts === 'single' ? '单张' : '组合'}}</el-button>
      <div class="panel-rows">
        换图：
        <el-input v-model="selectedImg.imgName" size="mini" placeholder="图片src" style="width:75%" />
        <el-button
          size="mini"
          type="primary"
          :disabled="!selectedImg.imgName"
          style="margin-left:16px"
          @click="changeImg"
        >换图</el-button>
      </div>
      <div class="panel-rows">
        宽高：
        <el-input v-model="selectedImg.imgWidth" size="mini" placeholder="图片宽度设置" style="width:37%" />
        <el-input v-model="selectedImg.imgHeight" size="mini" placeholder="图片高度设置" style="width:37%; margin-left: 8px" />
        <el-button
          size="mini"
          type="primary"
          :disabled="!selectedImg.imgWidth && !selectedImg.imgHeight"
          style="margin-left:16px"
          @click="changeImgHW"
        >修改</el-button>
      </div>
      <div class="panel-rows">
        链接：
        <el-input v-model="selectedImg.sku" :disabled="selectedImg.isLinkImg && !recordSku && !!recordTrack" size="mini" placeholder="商品sku(若链接存在)" style="width:75%;" />
        <el-button
          v-if="selectedImg.isLinkImg"
          size="mini"
          type="primary"
          :disabled="!selectedImg.sku && !selectedImg.isLinkImg || selectedImg.isLinkImg && !recordSku && !!recordTrack"
          style="margin-left:16px"
          @click="changeSku"
        >修改</el-button>
        <el-button
          v-else
          size="mini"
          type="primary"
          :disabled="!selectedImg.sku && !selectedImg.isLinkImg || selectedImg.isLinkImg && !recordSku && !!recordTrack"
          style="margin-left:16px"
          @click="addSku"
        >添加</el-button>
      </div>
      <div class="panel-rows">
        监测：
        <el-input v-model="selectedImg.imgTrack" size="mini" placeholder="链接监测(若链接存在)" style="width:75%; margin-left: 1px" />
        <el-button
          v-if="selectedImg.isLinkImg"
          size="mini"
          type="primary"
          :disabled="!selectedImg.imgTrack && !selectedImg.isLinkImg"
          style="margin-left:16px"
          @click="changeTrack"
        >修改</el-button>
        <el-button
          v-else
          size="mini"
          type="primary"
          :disabled="!selectedImg.imgTrack && !selectedImg.isLinkImg"
          style="margin-left:16px"
          @click="addTrack"
        >添加</el-button>
      </div>
      <div class="panel-rows">
        <!-- 添加图片 -->
        <el-select v-model="addImgWay" placeholder="请选择" size="mini" style="width: 18%; margin-bottom: 5px; margin-left: 8px">
          <el-option
            v-for="item in wayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="addImgPosition" placeholder="请选择" :disabled="selectedImg.imgStruts === 'single'" size="mini" style="width: 18%; margin-bottom: 5px; margin-left: 8px">
          <el-option
            v-for="item in positionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
          <!-- 添加组合 -->
          <div>
            <div class="panel-rows">
              <el-input v-model="addImg.imgSrc" size="mini" placeholder="需要添加的图片src" style="width:28%; margin-left: 8px" />
              <el-input
                v-model="addImg.sku"
                size="mini"
                placeholder="链接的sku(若需添加链接)"
                style="width:28%;margin-left:8px"
              />
              <!-- <el-select v-model="addImgUrl" placeholder="请选择" size="mini" style="width: 18%; margin-bottom: 5px; margin-left: 8px">
                <el-option
                  v-for="item in urlOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select> -->
              <el-input
                v-model="addImg.imgTrack"
                size="mini"
                placeholder="链接的监测(若需添加链接)"
                style="width:28%;margin-left:8px"
              />
            </div>
            <div class="panel-rows">
              <el-input v-model="addImg.width" size="mini" placeholder="图片宽度" style="width:20%; margin-left: 8px" />
              <el-input v-model="addImg.height" size="mini" placeholder="图片高度" style="width:20%; margin-left: 8px" />
            </div>
            <div class="panel-rows">
              <el-button
                size="mini"
                type="primary"
                :disabled="!addImg.imgSrc"
                style="margin-left:12px"
                @click="addAnImg('prev')"
              >{{addImgPosition === 'inside' ? '左' : '上'}}</el-button>
              <el-button
                size="mini"
                type="primary"
                :disabled="!addImg.imgSrc"
                style="margin-left:12px"
                @click="addAnImg('next')"
              >{{addImgPosition === 'inside' ? '右' : '下'}}</el-button>
            </div>
          </div>
        </div>
      <div class="panel-rows">
        <el-button size="mini" type="danger" @click="deleteAnImg">删除</el-button>
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
      recordSku: '', // 事件发生后记录sku,用于input框与button的状态设置
      recordTrack: '', // 事件发生后记录sku,用于input框与button的状态设置
      addImgWay: 'addSingle',
      wayOptions: [
        {
          value: 'addSingle',
          label: '添加单张'
        },
        {
          value: 'addMultiple',
          label: '添加组合'
        }
      ],
      // addImgUrl: 'product',
      // urlOptions: [
      //   {
      //     value: 'product',
      //     label: '产品详情'
      //   },
      //   {
      //     value: 'landingPage',
      //     label: 'LP页面'
      //   }
      // ],
      addImgPosition: 'outside',
      positionOptions: [
        {
          value: 'inside',
          label: '内部'
        },
        {
          value: 'outside',
          label: '外部'
        }
      ],
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
      aDialogVisible: false,
      converHtml: '',
      trackName: 'utm_source=ysl-edm&utm_medium=email&utm_campaign'
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
        this.modifyEle()
      })
    },
    async modifyEle () {
      const _self = this
      // 替换img src
      await this.$nextTick()
      $('img').each(function (index) {
        const _this = $(this) // jq

        const src = _this.attr('src')
        const imgName = src.split('/')[2].split('.')[0]
        const imgType = src.split('/')[2].split('.')[1]

        if (src.indexOf('./img') !== -1) {
          const url = _self.getImg(imgName, imgType)
          _this.attr({
            src: url
          })
        }
      })
      // 同步预览
      this.preView()
    },
    // 请求图片
    getImg (imgName, imgType) {
      const img = require(`../../assets/edmImages/${imgName}.${imgType}`)
      return img
    },
    onShowButton () {
      const _self = this // vue
      // img
      $('body').on('click mouseenter', '#dw-control-panel .control-panel img', function (e) {
        const _this = $(this)
        const hashImgName = _this[0].src.split('/')[_this[0].src.split('/').length - 1] // 经过编译的图片名称
        const hashValue = _this[0].src.split('/')[_this[0].src.split('/').length - 1].split('.')[1] // 获取图片哈希值
        const imgName = hashImgName.replace(`${hashValue}.`, '') // 图片原名称
        const imgWidth = _this.attr('width') || ''
        const imgHeight = _this.attr('height') || ''
        let isLinkImg = false
        let sku = _this.parent().attr('href') // 链接sku
        let imgTrack = _this.parent().attr('href') // 链接监测信息
        if (imgTrack) {
          isLinkImg = true
          imgTrack = imgTrack.split(`${_self.trackName}=`)[1]
          sku = sku.split('?')[0].split('/')[sku.split('?')[0].split('/').length - 1].split('.')[0]
        }
        this.recordSku = sku
        this.recordTrack = imgTrack
        // 判断当前图片是单张还是组合
        let imgStruts = ''
        if (_this.parent().attr('href')) {
          imgStruts = _this.parent().parent().parent().parent()[0].localName === 'table' && _this.parent().parent().parent().parent().parent()[0].localName === 'td' ? 'multile' : 'single'
        } else {
          imgStruts = _this.parent().parent().parent()[0].localName === 'table' && _this.parent().parent().parent().parent()[0].localName === 'td' ? 'multile' : 'single'
        }
        // 若当前图片是单张
        if (imgStruts === 'single') {
          _self.addImgPosition = 'outside'
        }
        _self.selectedImg = {
          img: _this,
          imgName: imgName,
          imgSrc: _this[0].src,
          imgTrack: imgTrack,
          sku: sku,
          isLinkImg: isLinkImg, // 记录当前图片是否存在a链接
          imgStruts: imgStruts,
          imgWidth: imgWidth,
          imgHeight: imgHeight,
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
    async changeImg () {
      // 请求图片
      const imgName = this.selectedImg.imgName.split('.')[0]
      const imgType = this.selectedImg.imgName.split('.')[1]
      const url = this.getImg(imgName, imgType)
      this.selectedImg.img.attr({
        src: url
      })
      // 修改链接sku
      if (this.selectedImg.sku && this.selectedImg.img.parent().attr('href')) {
        const href = this.selectedImg.img.parent().attr('href')
        const oldSku = href.split('?')[0].split('/')[href.split('?')[0].split('/').length - 1].split('.')[0]
        const newHref = href.replace(oldSku, this.selectedImg.sku)
        this.selectedImg.img.parent().attr({
          href: newHref
        })
      } else if (this.selectedImg.sku && !this.selectedImg.img.parent().attr('href')) {
        const a = $(`<a href="https://www.yslbeautycn.com/item/${this.selectedImg.sku}.html?${this.trackName}=" target="_blank"></a>`)
        this.selectedImg.img.wrap(a)
      }
      await this.$nextTick()
      // 获取添加图片的实际宽高
      const img = new Image()
      img.src = url
      // 判断是否有缓存
      if (img.complete) {
        // 设置img的高样式
        this.selectedImg.img.attr('width', img.width)
        this.selectedImg.img.attr('height', img.height)
      } else {
        img.onload = function () {
          this.selectedImg.img.attr('width', img.width)
          this.selectedImg.img.attr('height', img.height)
        }
      }
      this.$message.success('换图成功')
    },
    // 添加图片链接
    addSku () {
      this.recordSku = this.selectedImg.sku
      this.selectedImg.imgTrack = ''
      const a = $(`<a href="https://www.yslbeautycn.com/item/${this.selectedImg.sku}.html?${this.trackName}=" target="_blank"></a>`)
      this.selectedImg.img.wrap(a)
      this.selectedImg.isLinkImg = true
      this.$message.success(`已添加新链接，跳转至${this.selectedImg.sku}产品详情页`)
    },
    // 修改图片链接sku
    changeSku () {
      this.recordSku = this.selectedImg.sku
      if (this.selectedImg.sku) {
        const href = this.selectedImg.img.parent().attr('href')
        const oldSku = href.split('?')[0].split('/')[href.split('?')[0].split('/').length - 1].split('.')[0]
        const newHref = href.replace(oldSku, this.selectedImg.sku)
        this.selectedImg.img.parent().attr({
          href: newHref
        })
        this.$message.success('修改成功')
      } else {
        // sku为空时删除链接
        const td = this.selectedImg.img.parent().parent()
        const img = this.selectedImg.img.clone()
        this.selectedImg.img.parent().remove()
        this.selectedImg.isLinkImg = false
        this.selectedImg.imgTrack = ''
        td.append(img)
        this.selectedImg.img = img // 重新为当前选中图片绑定
        this.$message.success('链接已删除')
      }
    },
    // 添加首页链接与监测信息
    addTrack () {
      this.recordTrack = this.selectedImg.imgTrack
      this.selectedImg.sku = ''
      const homePage = $(`<a href="https://www.yslbeautycn.com/?${this.trackName}=${this.selectedImg.imgTrack}" target="_blank"></a>`)
      this.selectedImg.img.wrap(homePage)
      this.selectedImg.isLinkImg = true
      this.$message.success('已添加新链接，跳转至官网首页')
    },
    // 修改监测信息
    changeTrack () {
      this.recordTrack = this.selectedImg.imgTrack
      this.recordSku = this.selectedImg.sku
      if (!this.selectedImg.sku && !this.selectedImg.imgTrack && this.selectedImg.isLinkImg) {
        // sku与监测信息同时为空时，删除链接
        const td = this.selectedImg.img.parent().parent()
        const img = this.selectedImg.img.clone()
        this.selectedImg.img.parent().remove()
        this.selectedImg.isLinkImg = false
        td.append(img)
        this.selectedImg.img = img // 重新为当前选中图片绑定
        this.$message.success('链接已删除')
      } else {
        const href = this.selectedImg.img.parent().attr('href').split(`${this.trackName}=`)[0] + this.trackName + '=' + this.selectedImg.imgTrack
        this.selectedImg.img.parent().attr('href', href)
        this.$message.success('修改成功')
      }
    },
    // 修改图片宽高
    changeImgHW () {
      if (this.selectedImg.imgWidth) {
        this.selectedImg.img.attr({
          width: this.selectedImg.imgWidth
        })
      }
      if (this.selectedImg.imgHeight) {
        this.selectedImg.img.attr({
          height: this.selectedImg.imgHeight
        })
      }
      this.$message.success('修改成功')
    },
    changeVideo () {
      this.$message.warning('还未开发此功能！')
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
    async addAnImg (flag) {
      const thisTr = this.selectedImg.img.parent()[0].localName === 'a' ? this.selectedImg.img.parent().parent().parent() : this.selectedImg.img.parent().parent()
      const thisTd = this.selectedImg.img.parent()[0].localName === 'a' ? this.selectedImg.img.parent().parent() : this.selectedImg.img.parent()
      const newImg = this.selectedImg.img.clone()
      const imgName = this.addImg.imgSrc.split('.')[0]
      const imgType = this.addImg.imgSrc.split('.')[1]
      const url = this.getImg(imgName, imgType)
      let newStruct = ''
      newImg.attr({
        src: url
      })

      // 若用户有输入宽高，则按用户输入为准
      if (this.addImg.width) {
        newImg.attr('width', this.addImg.width)
      } else {
        await this.setImg(url, newImg, 'width')
      }
      if (this.addImg.height) {
        newImg.attr('height', this.addImg.height)
      } else {
        await this.setImg(url, newImg, 'height')
      }
      // 添加单张 外部图片时 创建tr结构
      if (this.addImgWay === 'addSingle' && this.addImgPosition === 'outside') {
        newStruct = this.createSingleTr(this.addImg.sku, this.addImg.imgTrack, newImg, this.addImgWay)
      } else if (this.addImgWay === 'addSingle' && this.addImgPosition === 'inside') {
        // 添加单张 内部图片 创建td结构
        newStruct = this.createSingleTd(this.addImg.sku, this.addImg.imgTrack, newImg)
      } else {
        // 添加组合图片 创建组合结构
        newStruct = this.createaddMultipleTr(this.addImg.sku, this.addImg.imgTrack, newImg)
      }
      // 判断是组合中添加图片还是组合外添加图片
      if (this.addImgPosition === 'inside') {
        // 组合内添加
        if (flag === 'prev') {
          thisTd.before(newStruct)
        } else if (flag === 'next') {
          thisTd.after(newStruct)
        }
      } else {
        // 组合外添加
        // 判断当前图片是否是组合图片
        if (this.selectedImg.imgStruts === 'single') {
          // 当前图片为单张
          if (flag === 'prev') {
            thisTr.before(newStruct)
          } else if (flag === 'next') {
            thisTr.after(newStruct)
          }
        } else {
          // 当前图片为组合
          if (flag === 'prev') {
            thisTr.parent().parent().parent().before(newStruct)
          } else if (flag === 'next') {
            thisTr.parent().parent().parent().after(newStruct)
          }
        }
      }
      this.$message.success('添加成功')
      this.clearData()
    },
    // 获取图片实际宽高并进行设置
    setImg (url, newImg, position) {
      const img = new Image()
      img.src = url
      // 判断是否有缓存
      if (img.complete) {
        // 设置img的宽/高样式
        switch (position) {
          case 'width':
            newImg.attr(position, img.width)
            break
          case 'height':
            newImg.attr(position, img.height)
            break
          default:
            break
        }
      } else {
        img.onload = function () {
          switch (position) {
            case 'width':
              newImg.attr(position, img.width)
              break
            case 'height':
              newImg.attr(position, img.height)
              break
            default:
              break
          }
        }
      }
    },
    // 创建多张的td
    createSingleTd (sku, imgTrack, newImg) {
      const td = $('<td></td>')
      const productALink = $(`<a href="https://www.yslbeautycn.com/item/${sku}.html?${this.trackName}=${imgTrack}" target="_blank"></a>`)
      const homePage = $(`<a href="https://www.yslbeautycn.com/?${this.trackName}=${imgTrack}" target="_blank"></a>`)
      if (sku) {
        // 若填写了sku 则跳转到产品详情页
        productALink.append(newImg)
        td.append(productALink)
      } else if (sku === '' && imgTrack) {
        // 若填只写了监测信息 则跳转官网首页
        homePage.append(newImg)
        td.append(homePage)
      } else {
        td.append(newImg)
      }
      return td
    },
    // 创建单张的tr
    createSingleTr (sku, imgTrack, newImg, addImgWay) {
      const tr = $('<tr></tr>')
      let td = $('<td align="center"></td>')
      if (addImgWay === 'addMultiple') {
        td = $('<td></td>')
      }
      const productALink = $(`<a href="https://www.yslbeautycn.com/item/${sku}.html?${this.trackName}=${imgTrack}" target="_blank"></a>`)
      const homePage = $(`<a href="https://www.yslbeautycn.com/?${this.trackName}=${imgTrack}" target="_blank"></a>`)
      if (sku) {
        // 若填写了sku 则跳转到产品详情页
        productALink.append(newImg)
        td.append(productALink)
      } else if (sku === '' && imgTrack) {
        // 若填只写了监测信息 则跳转官网首页
        homePage.append(newImg)
        td.append(homePage)
      } else {
        td.append(newImg)
      }
      tr.append(td)
      return tr
    },
    // 创建多张的tr
    createaddMultipleTr (sku, imgTrack, newImg) {
      const outsideTr = $('<tr></tr>')
      const outsideTd = $('<td></td>')
      const table = $('<table width="550" border="0" cellpadding="0" cellspacing="0" align="center"></table>')
      const insideTr = $('<tr></tr>')
      const insieTd = $('<td></td>')
      const productALink = $(`<a href="https://www.yslbeautycn.com/item/${sku}.html?${this.trackName}=${imgTrack}" target="_blank"></a>`)
      const homePage = $(`<a href="https://www.yslbeautycn.com/?${this.trackName}=${imgTrack}" target="_blank"></a>`)
      if (sku) {
        // 若填写了sku 则跳转到产品详情页
        productALink.append(newImg)
        insieTd.append(productALink)
      } else if (sku === '' && imgTrack) {
        // 若填只写了监测信息 则跳转官网首页
        homePage.append(newImg)
        insieTd.append(homePage)
      } else {
        insieTd.append(newImg)
      }
      insideTr.append(insieTd)
      table.append(insideTr)
      outsideTd.append(table)
      outsideTr.append(outsideTd)
      return outsideTr
    },
    async deleteAnImg () {
      try {
        await this.$confirm('确定删这张图？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 判断当前是否是组合图片
        if (this.selectedImg.imgStruts === 'single') {
          // 单张图片
          // 判断是否有a链接
          if (this.selectedImg.img.parent()[0].localName === 'a') {
            this.selectedImg.img.parent().parent().parent().remove()
          } else {
            this.selectedImg.img.parent().parent().remove()
          }
        } else {
          // 组合图片
          // 判断是否为最后一张 若为最后一张则删除组合结构
          // 判断是否有a链接
          if (this.selectedImg.img.parent()[0].localName === 'a') {
            // 有a链接
            if (this.selectedImg.img.parent().parent().parent().parent().parent().parent().find('img').length === 1) {
              // 若为最后一张
              this.selectedImg.img.parent().parent().parent().parent().parent().parent().remove()
            } else {
              this.selectedImg.img.parent().parent().remove()
            }
          } else {
            // 无a链接
            if (this.selectedImg.img.parent().parent().parent().parent().parent().find('img').length === 1) {
              // 若为最后一张
              this.selectedImg.img.parent().parent().parent().parent().parent().remove()
            } else {
              this.selectedImg.img.parent().remove()
            }
          }
        }
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
      // const RegExp1 = new RegExp(this.urlPrefix, 'ig')
      const RegExp2 = new RegExp('tools-red-icbaby-border', 'ig')
      const RegExp3 = new RegExp('tools-pc-blue-border', 'ig')
      const RegExp4 = new RegExp('tools-mb-red-border', 'ig')
      const returnHtml = finishedHtml
        // .replace(RegExp1, '')
        .replace(RegExp2, '')
        .replace(RegExp3, '')
        .replace(RegExp4, '')
      return returnHtml
    },
    genarateCode () {
      this.converHtml = this.preView()
      this.$nextTick(() => {
        $('.conver-html').find('img').each(function () {
          if ($(this).attr('src').indexOf('img') === 0) {
            const hashValue = $(this).attr('src').split('.')[1]
            const removeHash = $(this).attr('src').replace(`${hashValue}.`, '')
            $(this).attr({
              src: './' + removeHash
            })
          }
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
        sku: '',
        imgTrack: '',
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
  min-width: 600px;
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
</style>
