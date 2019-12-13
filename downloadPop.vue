<style lang="less">
@import "../../CRM/userRegister.less";
</style>
<template>
  <div>
   <Modal  v-model="isShow" title="详情" width="1000" :mask-closable="true" >
      <Row>
        <Col span="24" style="text-align: center;padding-left:199px">
            <Row class="nav-step">
              <Col
                span="8"
                v-for="(item,index) in nav"
                style="cursor:pointer"
                :class="{'innav':index ==checkindex }"
                :key="index"
              >
                <div @click="toggle(index)">{{item}}</div>
              </Col>
          </Row>
        </Col>
        <Col span="24">
            <Row v-show="showstep1">
                <Col span="24">
                  <Col span="8" style="margin-right:20px;margin-left:40px;">
                    <DatePicker type="daterange" v-model="validityTime" class="search-input" split-panels placeholder="请选择下载数据日期范围" @on-change="changeData"></DatePicker>
                  </Col>
                  <Col span="8" style="margin-right:20px">
                    <Select v-model="indexType" class="search-input" placeholder="全部">
                      <Option
                        v-for="item in isShowList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </Col>
                  <Col span="2" style="margin-right:26px">
                    <Button type="success" @click="downLoadSubmit" :loading="loading">确定下载</Button>
                  </Col>
                  <Col span="3">
                    <Button type="error" icon="ios-trash-outline" @click="clearData">清空全部</Button>
                  </Col>
                </Col>
                <Col span="24">
                  <div style="margin-top:20px;max-height:500px;overflow-y:auto;">
                    <Table :columns="columnsOne" :data="dataTableOne" ></Table>
                  </div>
                </Col>
            </Row>
        </Col>
      </Row>
      <div slot="footer">
        
      </div>
    </Modal>
  </div>
</template>
<script>
import axios from 'axios'
import {
  downloadindexinfo,
  downloaddata
} from '../../components/axios/dataCenter.js'
import { formData } from '../../../assets/js/common.js'
const paramsStringify = (params) => {
  console.log('str123',params);
  let str = Object.keys(params).reduce((accumulator, key) => {
    return accumulator + '&' + key + '=' + params[key]
  }, '')
  console.log('str12',str);
  str = str.slice(1);
  console.log('str',str);
   return encodeURI(str)
}
export default {
  props: {
    clickDown: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading:false,
      dataTableOne:[],
      isShow: this.clickDown,
      nav: ['数据下载', '下载记录'],
      checkindex: 0, // 初始化第一个栏块高亮
      showstep1: true,
      showstep2: false,
      sessionData:"",
      indexType:0,
      validityTime:'',
      columnsOne:[
        {
            title: "序号",
            type: "index",
            align: "center",
            width: 50
          },
          {
            title: '指标类型',
            key: 'businessType',
            align: 'center',
            width: 100,
            render: (h, data) => {
              var label = '';
            if(data.row.businessType == 1){
               label = '国际原油'
            }
            if(data.row.businessType == 2){
               label = '企业出厂价'
            }
            if(data.row.businessType == 3){
               label = '国内市场价'
            }
            if(data.row.businessType == 4){
               label = '国际市场价'
            }
            if(data.row.businessType == 5){
               label = '主营批发价'
            }
            if(data.row.businessType == 6){
               label = '主营零售价'
            }
            if(data.row.businessType == 7){
               label = '基准价'
            }
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                }
              },
              label
            );
          }
          },
          {
            title: '指标ID',
            key: 'businessId',
            align: 'center',
            width: 100,
          },
          {
            title: '数据信息',
            key: 'businessInfo',
            align: 'center'
          },
          {
              title: '操作',
              width: 100,
              align: 'center',
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.remove(params)
                              }
                          }
                      }, '删除')
                  ]);
              }
          }
      ],
      isShowList: [
        {
          label: '每日报价',
          value: 0
        },
        {
          label: '周均价',
          value: 1
        },
        {
          label: '月均价',
          value: 3
        },
        {
          label: '年均价',
          value: 5
        }
      ],
      startDate:'',
      endDate:''
    }
  },
  watch: {
    clickDown(val) {
      this.isShow = val;
      if(val == true){
        this.validityTime = [];
        this.one();
      }
    },
    isShow(val) {
      this.$emit('update:clickDown', val)
    }
  },
  created(){
    this.one()
  },
  methods:{
    one(message){
      let session = sessionStorage.getItem('paramsDown');
      session = JSON.parse(session);
      console.log(session);
      if(session){
        let array = [];
        array = session.map(item => {
          return {
            businessType:item.bussinessType,
            businessId: item.id
          }
        })
        this.sessionData = array;
        this.showstepOneData();
      }else{
        this.sessionData = [];
        this.showstepOneData();
      }

      if(message){
        this.$Message.success("删除成功");
      }

    },
    changeData(data){
      if(data){
        this.startData =data[0].replace(/-/g, "");
        this.endDate =data[1].replace(/-/g, "")
      }
    },
    toggle(key){
      console.log('key',key);
      this.checkindex = key;
      if(key == 0){
        this.showstep1 = true;
        this.showstep2 = false;
        this.showstepOneData();
      }
      if(key == 1){
        this.showstep1 = false;
        this.showstep2 = true;
      }
    },
    showstepOneData(){
      this.$Spin.show();
      downloadindexinfo(this.sessionData).then(res => {
          //console.log('res',res);
          if(res.response){
            this.dataTableOne = res.response;
            this.$Spin.hide();
          }
      })
    },
    clearData(){
      window.sessionStorage.removeItem('paramsDown');
      this.$emit('queryData');
      this.one();
      this.$Message.success("清除成功");
    },
    remove(data){
      console.log('data',data);
      let nextData = sessionStorage.getItem('paramsDown');
      nextData = JSON.parse(nextData);
      nextData = nextData.filter((item) => {
        return !(
          item.bussinessType == data.row.businessType &&
          item.id == data.row.businessId
        )
      })
      console.log('nextData',nextData)
      sessionStorage.setItem('paramsDown', JSON.stringify(nextData));
      this.$emit('queryData');
      this.one('删除成功');
    },
    downfile(downloadURL, filename){
        var that = this;
        var req;
        if (window.XMLHttpRequest)
        {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            req = new XMLHttpRequest();
        }
        else
        {
            // IE6, IE5 浏览器执行代码
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        req.open("get", downloadURL, true);
        req.responseType = "blob";
        req.onreadystatechange = function ()
        {
            if (req.readyState === 4 && req.status === 200)
            {
                if (typeof window.chrome !== 'undefined')
                {
                    // Chrome version
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(req.response);
                    link.download = filename;
                    link.click();
                }
                else if (typeof window.navigator.msSaveBlob !== 'undefined')
                {
                    // IE version
                    var blob = new Blob([req.response],
                        {
                            type: 'application/force-download'
                        }
                        );
                    window.navigator.msSaveBlob(blob, filename);
                }
                else
                {
                    // Firefox version
                    var file = new File([req.response], filename,
                        {
                            type: 'application/force-download'
                        }
                        );
                    window.open(URL.createObjectURL(file));
                }
            }
        };
        setTimeout(function()  {
            that.$Spin.hide();
           that.loading = false;
        }, 500);

        req.send();
    },
    downLoadSubmit(){
      if(this.startData && this.endDate){
        let that = this;
        let nextDataOne = sessionStorage.getItem('paramsDown');
        if(nextDataOne){
          this.loading = true;
          nextDataOne = JSON.parse(nextDataOne);
          var fileNameOne =  this.getDownLoadFileName(nextDataOne);
          this.$Spin.show();
          const businessInformation = this.handleTransformSession();
          let paramsOne = {
            startDate:this.startData,
            endDate:this.endDate,
            indexType:this.indexType,
            fileName:fileNameOne,
            businessInformation:JSON.stringify(businessInformation).replace(/"/g,'')
            // startDate:20181225,
            // endDate:20191227,
            // indexType:0,
            // fileName:'国际原油20191213112325133.xlsx',
            // businessInformation:'[{businessType:1,varietiesId:110,businessIdList:[7652]}]'
          }
          var downloadURL = "/datacenter/dataManager/downloaddata?startDate="+this.startData+"&endDate="+this.endDate+"&indexType="
        		+this.indexType+"&businessInformation="+encodeURIComponent(JSON.stringify(businessInformation))
        		+"&fileName="+encodeURIComponent(fileNameOne);
          this.downfile(downloadURL, fileNameOne);
          // downloaddata(paramsOne).then(res => {
          //     console.log('res',res);
          // })
          // console.log('123',paramsOne);${bussinessType}-${varietiesId}`
          //  
          // axios({
          //   url:"/datacenter/dataManager/downloaddata",
          //   method: "get",
          //   params: paramsOne,
          //   paramsSerializer:paramsStringify,
          //   headers: {responseType: 'blob'}
				  // }) .then(function (res) {
          //   console.log('res',res);
          //   that.loading = false;
          //   const blob = new Blob([res.data], { type: res.headers['content-type'] });
          //   const downloadElement = document.createElement('a');
          //   const href = window.URL.createObjectURL(blob); 
          //   downloadElement.style.display = 'none';
          //   downloadElement.href = href;
          //   downloadElement.download = fileNameOne; 
          //   document.body.appendChild(downloadElement);
          //   downloadElement.click(); 
          //   document.body.removeChild(downloadElement); 
          //   window.URL.revokeObjectURL(href); 
          // }).catch((err) => {
          //   console.log('下载失败')
          // })


          // window.location.href = "/datacenter/dataManager/downloaddata?startDate=" + this.startData + "&endDate=" +this.endDate + "&indexType="+this.indexType + "&fileName = " + fileNameOne + "&businessInformation=" + JSON.stringify(businessInformation).replace(/"/g,'');
        }else{
          this.$Message.info("暂无下载数据");
        }
      }else{
        this.$Message.info("请选择日期范围");
      }
      
     
    },
    getDownLoadFileName(keyone){
        var isZipFile =  this.isZipFile(keyone);
        if(isZipFile){
            return this.dateFormat("yyyyMMddhhmmss", new Date()) + ".zip";
        }else{
          var downLoadTime = this.dateFormat("yyyyMMddhhmmss", new Date()) + this.randomNum(100, 999);
          var bussinessType = keyone[0].bussinessType;
          var fileName = '';
          switch (bussinessType)
            {
            case 1:
                fileName = "国际原油" + downLoadTime + ".xlsx";
                break;
            case 2:
                fileName = "企业出厂价" + downLoadTime + ".xlsx";
                break;
            case 3:
                fileName = "国内市场价" + downLoadTime + ".xlsx";
                break;
            case 4:
                fileName = "国际市场价" + downLoadTime + ".xlsx";
                break;
            case 5:
                fileName = "主营批发价" + downLoadTime + ".xlsx";
                break;
            case 6:
                fileName = "主营零售价" + downLoadTime + ".xlsx";
                break;
            case 7:
                fileName = "基准价" + downLoadTime + ".xlsx";
                break;
            default:
                break;
            }
            return fileName;
        }

    },
    isZipFile(keyone){
      if(keyone.length == 1){
        return false
      }
      var unqKey = keyone[0].bussinessType +"_"+ keyone[0].varietiesId;
      for(var i = 1; i< keyone.length;i++){
      var bus = keyone[i];
      var newunqKey = bus.bussinessType +"_"+ bus.varietiesId;
        if(unqKey != newunqKey){
          return true;
        }
      }
      return false;
    },
    handleTransformSession() {
      let session = sessionStorage.getItem('paramsDown');
      let res = [];
      if (session) {
        session = JSON.parse(session);
        const obj = {};
        session.forEach((item) => {
          const { bussinessType, varietiesId, id } = item;
          const key = `${bussinessType}-${varietiesId}`;
          if (obj[key]) {
            obj[key]['businessIdList'].push(id)
          } else {
            obj[key] = {
              businessType:bussinessType,
              varietiesId:varietiesId,
              businessIdList: [id],
            }
          }
        })

        res = Object.keys(obj).map((key) => obj[key]);
      }
      return res;
    },
    dateFormat(formater, dt){ 
        if (dt)
        {
            if ((typeof dt) == "string")
            {
                dt = dt.replace(/-/g, "/"); //将-替换成/，避免ie和safari下报错
            }
            var date = new Date(dt);
            var o =
            {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(formater))
            {
                formater = formater.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(formater))
                {
                    formater = formater.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return formater;
        }
        return "";
    },
    //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum){
        switch (arguments.length)
        {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
            break;
        default:
            return 899;
            break;
        }
    }
  }
}
</script>