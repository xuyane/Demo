<style lang="less" scoped>
</style>
<template>
  <Row>
    <Form ref="secondForm">
      <!-- 频道 -->
      <Row style="height: 200px">
        <Col>
        <div class="info-title">
          
          <p><span style="color:#ed4014">*&nbsp;</span>频道</p>
          <Button type="primary" style="width: 160px" @click="showChannelModal">请选择</Button>
        </div>
        </Col>
        <Col span="16">
        <div class="info-detail">
          <p>选中频道:</p>
          <p v-for="(item,index) in selectChannel" :key="item.id">
            <span>{{item.route}}</span>
            <b class="icon-delete mar-l-30 pull-right" @click="deleteChannel(index)"></b>
          </p>
        </div>
        </Col>
      </Row>
      <!-- 栏目 -->
      <Row style="height: 200px">
        <Col>
        <div class="info-title">
          <p>栏目</p>
          <Button type="primary" style="width: 160px" @click="showColumnModal">请选择</Button>
        </div>
        </Col>
        <Col span="16">
        <div class="info-detail">
          <p>选中栏目:</p>
          <p v-for="(item,index) in selectColumn" :key="item.id">
            <span>{{item.route}}</span>
            <b class="icon-delete mar-l-30 pull-right" @click="deleteColumn(index)"></b>
          </p>
        </div>
        </Col>
      </Row>
      <!-- 信息分类 -->
      <Row style="height: 200px">
        <Col>
        <div class="info-title">
          <p>信息分类</p>
          <Button type="primary" style="width: 160px" @click="showTypeModal">请选择</Button>
        </div>
        </Col>
        <Col span="16">
        <div class="info-detail">
          <p>选中分类:</p>
          <p v-for="(item,index) in selectInfo" :key="item.id">
            <span>{{item.route}}</span>
            <b class="icon-delete mar-l-30 pull-right" @click="deleteInfo(index)"></b>
          </p>
        </div>
        </Col>
      </Row>
      <!-- 品种选择 -->
      <Row class="mar-t-20">
        <Col>
        <div class="info-title">
                    
          <p><span style="color:#ed4014">*&nbsp;</span>品种</p>
          <Button type="primary" style="width: 160px" @click="typeModal = true">请选择</Button>
        </div>
        </Col>
        <Col span="16">
        <div class="info-detail">
          <p>选中品种:</p>
          <p v-for="(item, index) in selectedBreed" :key="item.breedId" ref="selectedBreed">
            <span>{{item.route}}</span>
            <b class="icon-delete mar-l-30 pull-right" @click="deleteBreed(index)"></b>
          </p>
        </div>
        </Col>
      </Row>
      <!-- 城市选择 -->
      <Row class="mar-t-20">
        <Col>
        <div class="info-title">
          <p>城市</p>
          <Button type="primary" style="width: 160px" @click="showCityModal">请选择</Button>
        </div>
        </Col>
        <Col span="16">
        <div class="info-detail">
          <p>选中城市：</p>
          <p v-for="(item,index) in selectCity" :key="item.id">
            <span>{{item.route}}</span>
            <b class="icon-delete mar-l-30 pull-right" @click="deleteCity(index)"></b>
          </p>
        </div>
        </Col>
      </Row>
      <!-- 企业选择 -->
      <Row class="mar-t-20" v-if="productClassify == '002001' || productClassify == '002002'">
        <Col>
        <div class="info-title">
          <p>企业</p>
          <Button type="primary" style="width: 160px" @click="companyModal = true">请选择</Button>
        </div>
        </Col>
        <Col span="16">
        <div class="info-detail">
          <p>选中企业：</p>
          <p v-for="(item, index) in selectedCompany" :key="index">
            <span>{{item.memeberName}}</span>
            <b class="icon-delete mar-l-30 pull-right" @click="deleteCompany(index)"></b>
          </p>
        </div>
        </Col>
      </Row>
      <Row class="mar-t-15">
        <Col span="24" style="text-align: center">
        <FormItem>
          <Button type="primary" @click="preStep">上一步</Button>
          <Button type="primary" style="margin-left: 20px" @click="validateData('productForm')">下一步</Button>
          <Button style="width: 68px; margin-left: 20px" @click="cancelNext">取消</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <!-- 频道 -->
    <Modal v-model="channelModal" title="频道选择" @on-cancel="cancel">
      <p class="text-right">
        <span class="pointer">
          <i class="icon-remove" @click="clearChannel"></i>
          <span class="mar-r-20" @click="clearChannel">清空所选</span>
        </span>
        <span class="pointer">
          <i class="icon-frash" @click="getChannelData"></i>
          <span class="mar-r-20" @click="getChannelData">重新加载</span>
        </span>
      </p>
      <div style="max-height: 300px;overflow: auto">
        <Tree :data="channelList" ref="channelRef" :load-data="loadChannelData" show-checkbox></Tree>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="channelOk">确定</Button>
      </div>
    </Modal>
    <!-- 栏目 -->
    <Modal v-model="columnModal" title="栏目选择" @on-cancel="cancel">
      <p class="text-right">
        <span class="pointer">
          <i class="icon-remove" @click="clearColumn"></i>
          <span class="mar-r-20" @click="clearColumn">清空所选</span>
        </span>
        <span class="pointer">
          <i class="icon-frash" @click="getColumnData"></i>
          <span class="mar-r-20" @click="getColumnData">重新加载</span>
        </span>
      </p>
      <div style="max-height: 300px;overflow: auto">
        <Tree :data="columnList" :load-data="getColumnData" ref="columnRef" show-checkbox></Tree>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="columnOk">确定</Button>
      </div>
    </Modal>
    <!-- 信息分类弹框 -->
    <Modal v-model="infoModal" title="产品选择" @on-ok="ok" @on-cancel="cancel">
      <p class="text-right">
        <span class="pointer">
          <i class="icon-remove" @click="clearInfo"></i>
          <span class="mar-r-20" @click="clearInfo">清空所选</span>
        </span>
        <span class="pointer">
          <i class="icon-frash" @click="getInfoData"></i>
          <span class="mar-r-20" @click="getInfoData">重新加载</span>
        </span>
      </p>
      <Tree :data="infoData" ref="infoRef" :load-data="loadInfoData" @on-check-change="checkedInfoChange" show-checkbox></Tree>
    </Modal>
    <!-- 品种选择弹框 -->
    <Modal v-model="typeModal" title="品种选择" @on-ok="breedOk" @on-cancel="cancel">
      <p class="text-right">
        <span class="pointer">
          <i class="icon-remove" @click="clearBreedData"></i>
          <span class="mar-r-20" @click="clearBreedData">清空所选</span>
        </span>
        <span class="pointer">
          <i class="icon-frash" @click="getBreedDataList"></i>
          <span class="mar-r-20" @click="getBreedDataList">重新加载</span>
        </span>
      </p>
      <Tree :data="breedList" ref="breedRef" :load-data="loadBreedDataList" @on-check-change="checkedBreedChange" show-checkbox></Tree>
    </Modal>
    <!-- 城市选择弹框 -->
    <Modal v-model="cityModal" title="城市选择" @on-ok="cityOk" @on-cancel="cancel">
      <p class="text-right">
        <span class="pointer">
          <i class="icon-remove" @click="clearCityData"></i>
          <span class="mar-r-20" @click="clearCityData">清空所选</span>
        </span>
        <span class="pointer">
          <i class="icon-frash" @click="getCityData"></i>
          <span class="mar-r-20" @click="getCityData">重新加载</span>
        </span>
      </p>
      <Tree :data="cityData" ref="cityRef" :load-data="loadCityData" @on-check-change="checkedCityChange" show-checkbox></Tree>
    </Modal>
    <!-- 企业选择弹框 -->
    <Modal v-model="companyModal" title="企业选择" @on-ok="companyOk" @on-cancel="cancel">
      <Select v-model="companyModel" filterable remote :remote-method="remoteMethod1" :loading="loading" class="mar-t-20 mar-b-40"
        placeholder="请输入公司名称">
        <Option v-for="(option, index) in companyList" :value="option" :key="index">{{option.memeberName}}</Option>
      </Select>
    </Modal>
  </Row>
</template>
<script>
  import { msgCategoryList, selectAreaList, memberList, getProductTreeList, breedTypeList, selectChannelList, selectColumnList } from '../components/axios/productCenter.js'
  import { loadBreedData, breedMap, arrQC, columnQC } from '../components/productCenter/productCenter.js'
  import bus from '../../store/bus/eventBus.js'
  export default {
    props: ['listData'],
    data() {
      return {
        productClassify: '',
        productData: '',
        companyModel: '',
        breedModel: '',
        breedIds: [],
        selectedBreed: [],
        selectedBreedList: [],
        selectedCompany: [],
        columnList: [],
        channelList: [],
        companyIds: [],
        loading: false,
        infoModal: false,
        typeModal: false,
        cityModal: false,
        companyModal: false,
        channelModal: false,
        columnModal: false,
        infoId: '',
        cityId: '',
        cityName: '',
        cityData: [],
        infoData: [],
        typeData: [],
        companyList: [],
        selectInfo: [],
        selectedInfo: [],
        selectedCity: [],
        selectCity: [],
        breedList: [],
        selectChannel: [],
        selectColumn: [],
        siteId: '',
        channelRoute: '',
      }
    },
    created() {
      this.getCityData()
    },
    mounted() {
      bus.$on('isSms', res => {
        this.productClassify = res.productClassifyCode
        this.siteId = res.siteId
        this.getInfoData()
        this.getBreedDataList()
      })
    },
    watch: {
      listData(newVal, oldVal) {
        let iindex=""
        this.productData = newVal
        this.selectedBreed = this.productData.breedList.map(item => {
          this.productData.propertionList.forEach(function (value, index) {
            if (value.breedId == item.id) { item.percent = value.percent }
          });
          return {
            breedId: item.id,
            route: item.name,
            breedName: item.name,
            percent: item.percent
          }
        })
        this.selectedCompany = this.productData.memberList.map(item => {
          return {
            memberId: item.id,
            memeberName: item.name
          }
        })
        this.selectInfo = this.productData.messageCatagoryList.map(item => {
          return {
            id: item.id,
            route: item.name
          }
        })
        this.selectCity = this.productData.areaList.map(item => {
          return {
            id: item.id,
            route: item.name
          }
        })
       
        for (let i = 0; i < this.selectCity.length; i++) {
          if (this.selectCity[i].id == '10001') {
           iindex=this.selectCity[i].id;
          }
          if (this.selectCity[i].id == "10002") {
            iindex=this.selectCity[i].id;            
          }
        }
        this.selectCity = this.selectCity.filter(
          item =>
            item.id != iindex
        );
        this.selectColumn = this.productData.itemList.map(item => {
          return {
            id: item.id,
            ifcolumn: 1,
            route: item.name
          }
        })
        this.selectChannel = this.productData.channelList.map(item => {
          return {
            id: item.id,
            title: item.name,
            ifcolumn: 0,
            route: item.name
          }
        })
      }
    },
    methods: {
      //获取频道
      getChannelData() {
        selectChannelList({
          siteId: this.siteId,
          channelId: ''
        }).then(res => {
          this.channelList = res.response.map(item => {
            let getSingle = true
            for (let i = 0; i < this.selectChannel.length; i++) {
              if (this.selectChannel[i].id == item.channelId) {
                getSingle = false
              }
            }
            if (getSingle) {
              if (item.isLeaf == 0) {
                return {
                  checked: false,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  route: item.channelName,
                  children: [],
                  isLeaf: item.isLeaf,
                  loading: false
                }
              } else {
                return {
                  checked: false,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  isLeaf: item.isLeaf,
                  route: item.channelName
                }
              }
            } else {
              if (item.isLeaf == 0) {
                return {
                  checked: true,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  route: item.channelName,
                  isLeaf: item.isLeaf,
                  children: [],
                  loading: false
                }
              } else {
                return {
                  checked: true,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  route: item.channelName,
                  isLeaf: item.isLeaf
                }
              }
            }
          })
        })
      },
      //获取频道动态加载
      loadChannelData(items, callback) {
        this.channelRoute = items.route
        selectChannelList({
          siteId: this.siteId,
          channelId: items.id
        }).then(res => {
          let channelList = res.response.map(item => {
            let getSingle = true
            for (let i = 0; i < this.selectChannel.length; i++) {
              if (this.selectChannel[i].id == item.channelId) {
                getSingle = false
              }
            }
            if (getSingle) {
              if (item.isLeaf == 0) {
                return {
                  checked: false,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  route: this.channelRoute + ' -> ' + item.channelName,
                  children: [],
                  isLeaf: item.isLeaf,
                  loading: false
                }
              } else {
                return {
                  checked: false,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  isLeaf: item.isLeaf,
                  route: this.channelRoute + ' -> ' + item.channelName
                }
              }
            } else {
              if (item.isLeaf == 0) {
                return {
                  checked: true,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  route: this.channelRoute + ' -> ' + item.channelName,
                  isLeaf: item.isLeaf,
                  children: [],
                  loading: false
                }
              } else {
                return {
                  checked: true,
                  id: item.channelId,
                  title: item.channelName,
                  ifcolumn: 0,
                  route: this.channelRoute + ' -> ' + item.channelName,
                  isLeaf: item.isLeaf
                }
              }
            }
          })
          callback(channelList)
        })
      },
      // 显示频道对话框
      showChannelModal() {
        this.getChannelData()
        this.channelModal = true
      },
      //选中频道
      channelOk() {
        this.selectChannel = this.$refs.channelRef.getCheckedNodes()
        this.channelModal = false
      },
      //删除频道
      deleteChannel(index) {
        this.selectChannel.splice(index, 1)
      },
      //频道 清空所选
      clearChannel() {
        this.channelList = this.channelList.map(item => {
          return {
            checked: false,
            id: item.id,
            title: item.title,
            ifcolumn: item.ifcolumn,
            route: item.route
          }
        })
      },
      // 显示栏目对话框
      showColumnModal() {
        if (this.selectChannel.length > 0) {
          // this.getColumnData()
          this.columnList = this.selectChannel.map(item => {
            return {
              checked: false,
              id: item.id,
              title: item.title,
              route: item.route,
              ifcolumn: item.ifcolumn,
              loading: false,
              children: []
            }
          })
          this.columnModal = true
        } else {
          this.$Message.warning("请选择频道")
        }
      },
      //获取栏目
      getColumnData(item, callback) {
        selectColumnList({
          channelIdList: item.id
        }).then(res => {
          let columnList = res.response.map(item => {
            let getSingle = true
            for (let i = 0; i < this.selectColumn.length; i++) {
              if (this.selectColumn[i].id == item.columnId) {
                getSingle = false
              }
            }
            if (getSingle) {
              return {
                checked: false,
                id: item.columnId,
                title: item.columnName,
                ifcolumn: 1,
                route: item.channelPath + '->' + item.columnName
              }
            } else {
              return {
                checked: true,
                id: item.columnId,
                title: item.columnName,
                ifcolumn: 1,
                route: item.channelPath + '->' + item.columnName
              }
            }
          })
          callback(columnList)
        })
      },
      //删除栏目
      deleteColumn(index) {
        this.selectColumn.splice(index, 1)
      },
      //栏目 清空所选
      clearColumn() {
        this.columnList = this.columnList.map(item => {
          return {
            checked: false,
            id: item.id,
            ifcolumn: item.ifcolumn,
            title: item.title,
            route: item.route
          }
        })
      },
      //选中栏目
      columnOk() {
        let columns = [];
        this.$refs.columnRef.getCheckedNodes().map(item => {//选中的栏目
          if (item.ifcolumn == 1) {
            columns.push(item)
          }
        })
        let channelIds = [];
        this.$refs.columnRef.getCheckedNodes().map(item => {//选中的频道
          if (item.ifcolumn == 0) {
            channelIds.push(item.id)
          }
        })
        if (channelIds.length > 0) {
          selectColumnList({
            channelIdList: channelIds.join(',')
          }).then(res => {
            let columnList = res.response.map(item => {
              return {
                checked: false,
                id: item.columnId,
                title: item.columnName,
                ifcolumn: 1,
                route: item.channelPath + '->' + item.columnName
              }
            })
            let concatArr = columnList.concat(columns)
            this.selectColumn = columnQC(concatArr)
          })
        } else {
          this.selectColumn = columns
        }
        this.columnModal = false
      },
      getBreedIds(list) {
        let arr = []
        for (let i = 0; i < list.length; i++) {
          arr.push(list[i].breedId)
        }
        return arr
      },
      getMemberId(list) {
        let arr = []
        for (let i = 0; i < list.length; i++) {
          arr.push(Number(list[i].memberId))
        }
        return arr
      },
      breedOk() {
        let breedArr = [];
        let breedIdArr = [];
        for (let i = 0; i < this.$refs.breedRef.getCheckedNodes().length; i++) {
          if (this.$refs.breedRef.getCheckedNodes()[i].breedId) {
            breedArr.push(this.$refs.breedRef.getCheckedNodes()[i])
          } else {
            breedIdArr.push(this.$refs.breedRef.getCheckedNodes()[i].nodeId)
          }
        }
        breedTypeList({
          breedTypeIdList: breedIdArr
        }).then(res => {
          let BreedNameList = res.response.map(item => {
            return {
              checked: false,
              breedId: item.nodeId,
              nodeCode: item.nodeCode,
              type: item.type,
              title: item.nodeName,
              route: item.nodeName,
              breedName: item.nodeName,
              percent: 0
            }
          })
          let concatArr = breedArr.concat(BreedNameList)
          let concatArray = concatArr.concat(this.selectedBreed)
          this.selectedBreed = arrQC(concatArray)
        })
      },
      ok() {
        this.selectInfo = this.$refs.infoRef.getCheckedNodes()
      },
      cityOk() {
        this.selectCity = this.$refs.cityRef.getCheckedNodes()
      },
      companyOk() {
        if (this.companyModel) {
          if (this.selectedCompany) {
            let arr = this.getMemberId(this.selectedCompany)
            if (arr.indexOf(this.companyModel.memberId) === -1) {
              this.selectedCompany.push(this.companyModel)
            }
          } else {
            this.selectedCompany.push(this.companyModel)
          }
        }
      },
      cancel() {
        this.channelModal = false;
        this.columnModal = false;
        this.infoModal = false;
        this.typeModal = false;
        this.cityModal = false;
        this.companyModal = false;
      },
      // 信息分类选择触发事件
      checkedInfoChange(data) {
        this.selectedInfo = data
      },
      // 城市选择触发事件
      checkedCityChange(data) {
        this.selectedCity = data
      },
      // 删除某个信息分类
      deleteInfo(index) {
        this.selectInfo.splice(index, 1)
      },
      // 删除某个品类
      deleteBreed(index) {
        this.selectedBreed.splice(index, 1)
      },
      // 删除某个城市
      deleteCity(index) {
        this.selectCity.splice(index, 1)
      },
      // 删除某个企业
      deleteCompany(index) {
        this.selectedCompany.splice(index, 1)
      },
      // 显示信息分类对话框
      showTypeModal() {
        // this.getInfoData()
        this.infoModal = true
      },
      // 显示城市列表对话框
      showCityModal() {
        // this.getCityData()
        this.cityModal = true
      },
      // 获取信息分类
      getInfoData() {
        this.$Spin.show();
        let form = {
          id: '',
          siteId: this.siteId
        }
        msgCategoryList(form).then(res => {
          this.infoData = res.response.map(item => {
            let getSingle = true
            for (let i = 0; i < this.selectInfo.length; i++) {
              if (this.selectInfo[i].id == item.id) {
                getSingle = false
              }
            }
            if (getSingle) {
              if (item.isLeaf === 1) {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.path
                }
              } else {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  route: item.path
                }
              }
            } else {
              if (item.isLeaf === 1) {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.path
                }
              } else {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  route: item.path
                }
              }
            }
          })
          this.$Spin.hide();
        })
      },
      // 异步加载
      loadInfoData(item, callback) {
        let form = {
          id: item.id,
          siteId: this.siteId
        }
        msgCategoryList(form).then(res => {
          let infoData = res.response.map(item => {
            let getSingle = true
            for (let i = 0; i < this.selectInfo.length; i++) {
              if (this.selectInfo[i].id == item.id) {
                getSingle = false
              }
            }
            if (getSingle) {
              if (item.isLeaf === 1) {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.path
                }
              } else {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  route: item.path
                }
              }
            } else {
              if (item.isLeaf === 1) {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.path
                }
              } else {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  route: item.path
                }
              }
            }
          })
          callback(infoData)
        })
      },
      // 获取城市信息
      getCityData() {
        this.$Spin.show();
        let form = {
          id: ''
        }
        selectAreaList(form).then(res => {
          this.cityData = res.response.map(item => {
            let getSingle = true
            for (let i = 0; i < this.selectCity.length; i++) {
              if (this.selectCity[i].id == item.id) {
                getSingle = false
              }
            }
            if (getSingle) {
              if (item.isLeaf === 1) {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.name
                }
              } else {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  route: item.name
                }
              }
            } else {
              if (item.isLeaf === 1) {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.name
                }
              } else {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  route: item.name
                }
              }
            }
          })
          this.$Spin.hide();
        })
      },
      loadCityData(item, callback) {
        let form = {
          id: item.id
        }
        selectAreaList(form).then(res => {
          let cityData = res.response.map(item => {
            let getSingle = true
            for (let i = 0; i < this.selectCity.length; i++) {
              if (this.selectCity[i].id == item.id) {
                getSingle = false
              }
            }
            if (getSingle) {
              if (item.isLeaf === 1) {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.name
                }
              } else {
                return {
                  checked: false,
                  id: item.id,
                  title: item.name,
                  route: item.name
                }
              }
            } else {
              if (item.isLeaf === 1) {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  loading: false,
                  children: [],
                  route: item.name
                }
              } else {
                return {
                  checked: true,
                  id: item.id,
                  title: item.name,
                  route: item.name
                }
              }
            }
          })
          callback(cityData)
        })
      },
      // 搜索企业
      remoteMethod1(query) {
        const self = this
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let form = {
              memberName: query
            }
            memberList(form).then(res => {
              self.companyList = res.response
            })
          }, 50);
        } else {
          this.companyList = [];
        }
      },
      loadBreedDataList(item, callback) {
        loadBreedData(item, callback, this.selectedBreed)
      },
      // 获取品种树
      getBreedDataList() {
        let form = {
          breedCode: ''
        }
        getProductTreeList(form).then(res => {
          this.breedList = breedMap(res.response)
        })
      },
      // 品种选择触发事件
      checkedBreedChange(data) {
        this.selectedBreedList = data
      },
      // 清空信息分类
      clearInfo() {
        this.infoData = this.infoData.map(item => {
          if (item.children) {
            return {
              id: item.id,
              title: item.title,
              loading: false,
              children: [],
              route: item.route,
              checked: false
            }
          } else {
            return {
              id: item.id,
              title: item.title,
              route: item.route,
              checked: false
            }
          }
        })
        this.selectedInfo = []
      },
      // 清空品种
      clearBreedDigui(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].children) {
            data[i].checked = false;
            this.clearBreedDigui(data[i].children)
          } else {
            data[i].checked = false
          }
        }
        return data
      },
      clearBreedData() {
        this.breedList = this.clearBreedDigui(this.breedList)
        this.selectedBreedList = []
      },
      // 清空城市信息
      clearCityData() {
        this.cityData = this.cityData.map(item => {
          if (item.children) {
            return {
              checked: false,
              id: item.id,
              title: item.title,
              loading: false,
              children: [],
              route: item.route
            }
          } else {
            return {
              checked: false,
              id: item.id,
              title: item.title,
              route: item.route
            }
          }
        })
        this.selectedCity = []
      },
      // 校验数据
      validateData(name) {
        if (this.selectedBreed.length < 1) {
          this.$Message.warning("请选择品种")
        } else if ((this.productClassify == '002002' || this.productClassify == '002003' || this.productClassify == '001') && this.selectChannel.length == 0) {
          this.$Message.warning("请选择频道")
        } else {
          this.$emit('step', 3);
          bus.$emit('breeds', this.selectedBreed)
        }
      },
      preStep() {
        this.$emit('step', 1)
      },
      // 取消，返回产品管理页面
      cancelNext() {
        this.$router.push({
          name: 'productManager'
        })
      }
    }
  }
</script>