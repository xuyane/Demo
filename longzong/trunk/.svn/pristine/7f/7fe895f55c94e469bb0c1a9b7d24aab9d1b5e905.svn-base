<template>
    <div>
        <Modal v-model="indexModalVisible" title="信息单元" width="750">
            <Row>
                <Col span='24'>
                    <Row>
                        <div class="unit">
                            <div class="unit_title">
                                <span>信息单元</span>
                            </div>
                            <div class="unit_content">
                                <div class="unit_content_left">
                                    <div class="unit_s_left">信息单元编码：</div>
                                    <div class="unit_s_right">{{rowList.informationUnitCode}}</div>
                                </div>
                                <div class="unit_content_left no_line">
                                    <div class="unit_s_left">信息单元名称：</div>
                                    <div class="unit_s_right no-right-border">{{rowList.informationUnitName}}</div>
                                </div>
                            </div>
                            <div class="btn-modal unit_content">
                              <Button @click="showBasicModal(rowList)">基本信息</Button>
                              <Button @click="showContactModal(rowList)">联系人信息</Button>
                              <Button @click="showRelavantModal(rowList)">相关信息单元</Button>
                              <Button @click="showPublishModal(rowList)">已发布信息</Button>
                            </div>
                        </div>
                        <div class="unit">
                            <div class="unit_title">
                                <span>信息单元</span>
                            </div>
                            <Button style='margin-top: 10px' class="btn" @click="copyLastDayInfo">复制上一个工作日信息</Button>
                            <div style='margin-top: 10px' class="table-content" v-for="(titem,tindex) in tables" :key="tindex">
                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                      <thead>
                                        <tr v-for="rindex in titem.thRows" :key="rindex">
                                          <td width="120" v-for="(item,index) in titem.tableData[rindex-1]" :key="index" :class="item.class" :rowspan="item.rowspan" :colspan="item.colspan">
                                            <div style="min-width:120px;">{{item.val}}</div>

                                          </td>
                                          <td width="100" :rowspan="titem.thRows" v-if="rindex == 1"><div style="min-width:100px;">操作</div></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="(item,index) in titem.tableData" :key="index" v-if="index>=titem.thRows">
                                          <td v-for="(item1,index1) in item" :key="index1" :rowspan="item1.rowspan" :colspan="item1.colspan" :class="item1.class" :id="item1.id">
                                            <template v-if="item1.class == 'type3'">
                                              <Input v-if="item1.isDisabled" disabled/>
                                              <Input v-else v-model="item1.val"/>
                                            </template>
                                            <template v-else-if="item1.class == 'type1'">
                                              <template v-if="tabelType[tindex] == '4'">
                                                <Input class="infor-table-input" v-if="item1.isDisabled" disabled/>
                                                <Input class="infor-table-input" v-else v-model="item1.section.val1" :maxlength="16" @on-blur="changeTimeData(tindex,index,index1,item1.section.val1,item1.section.id1,1)"/>
                                                <span class="infor-table-line"> - </span>
                                                <Input class="infor-table-input" v-if="item1.isDisabled" disabled/>
                                                <Input class="infor-table-input" v-else v-model="item1.section.val2" :maxlength="16" @on-blur="changeTimeData(tindex,index,index1,item1.section.val2,item1.section.id2,2)"/>
                                              </template>
                                              <!-- <template v-else-if="tabelType[tindex] == '5'">
                                              <Input v-if="item1.isDisabled" disabled/>
                                              <Input v-else v-model="item1.val" :maxlength="16"/>
                                              </template> -->
                                              <template v-else>
                                              <Input v-if="item1.isDisabled" disabled/>
                                              <Input v-else v-model="item1.val" :maxlength="16" @on-blur="changeTimeData(tindex,index,index1,item1.val,item1.id)"/>
                                              </template>
                                            </template>
                                            <template v-else-if="item1.class == 'type2' && tabelType[tindex] == '5'">
                                              <!-- <span>{{ruleCount(item1.rule,item1.ruleBase,item1.id,tindex,index)}}</span> -->
                                              <template v-if="item1.isHB">
                                                  <span v-if="item1.val > 0" style="color:red;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                                  <span v-else-if="item1.val < 0" style="color:green;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                                  <span v-else>{{item1.val}}</span>
                                                </template>
                                                <template v-else>
                                                  <span v-if="item1.val > 0" style="color:red;">{{item1.val}}</span>
                                                  <span v-else-if="item1.val < 0" style="color:green;">{{item1.val}}</span>
                                                  <span v-else>{{item1.val}}</span>
                                                </template>
                                            </template>
                                            <template v-else-if="item1.class == 'type2' && !(RegExp(/[合计,总计]/).test(item[0].val))">
                                              <template v-if="tabelType[tindex] == '3'">
                                              <span v-if="item1.val > 0" style="color:red;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                              <span v-else-if="item1.val < 0" style="color:green;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                              <span v-else>{{item1.val}}</span>
                                              </template>
                                              <template v-else-if="tabelType[tindex] == '4'">
                                                <span v-if="item1.section.val1 > 0" style="color:red;">{{item1.section.val1}}</span>
                                                <span v-else-if="item1.section.val1 < 0" style="color:green;">{{item1.section.val1}}</span>
                                                <span v-else>{{item1.section.val1}}</span>
                                                -
                                                <span v-if="item1.section.val2 > 0" style="color:red;">{{item1.section.val2}}</span>
                                                <span v-else-if="item1.section.val2 < 0" style="color:green;">{{item1.section.val2}}</span>
                                                <span v-else>{{item1.section.val2}}</span>
                                              </template>
                                              <template v-else>
                                                <template v-if="operateFun == '(a-b)/b'">
                                                <span v-if="item1.val > 0" style="color:red;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                                <span v-else-if="item1.val < 0" style="color:green;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                                <span v-else>{{item1.val}}</span>
                                                </template>
                                                <template v-else>
                                                <span v-if="item1.val > 0" style="color:red;">{{item1.val}}</span>
                                                <span v-else-if="item1.val < 0" style="color:green;">{{item1.val}}</span>
                                                <span v-else>{{item1.val}}</span>
                                                </template>
                                              </template>
                                            </template>
                                            <template v-else-if="item1.class == 'type2' && RegExp(/合计,总计/).test(item[0].val)">
                                              <template v-if="item1.isSum || (tabelType[tindex]=='3'&&index1!=item.length-1)">
                                                <span>{{item1.val}}</span>
                                              </template>
                                              <template v-else>
                                                <span v-if="item1.val > 0" style="color:red;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                                <span v-else-if="item1.val < 0" style="color:green;">{{(item1.val*100).toFixed(2) + '%'}}</span>
                                                <span v-else>{{item1.val}}</span>
                                              </template>
                                            </template>
                                            <template v-else-if="item1.class == 'type4' && tabelType[tindex] == '4'">
                                              <span>{{item1.section.val1}}</span>
                                              -
                                              <span>{{item1.section.val2}}</span>
                                            </template>
                                            <template v-else>
                                              {{item1.val}}
                                            </template>
                                          </td>
                                          <template v-if="tabelType[tindex] == '3' && RegExp(/合计/).test(item[0].val)">
                                            <td></td>
                                          </template>
                                          <template v-else>
                                            <td v-if="item[0].isDisabled"><a @click="openInput(tindex,index)" href="javascript:;">重发数据</a></td>
                                            <td v-else><a @click="publishModalOpen(tindex,index)" href="javascript:;">发布</a>　　<a @click="closeInput(tindex,index)" href="javascript:;">无数据</a></td>
                                          </template>
                                        </tr>
                                      </tbody>
                                    </table>
                            </div>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Modal>

        <basic-modal ref="basicModal" @hide-modal="hideBasicModal"/>

        <contact-modal ref="cantactModal" @hide-modal="hideContactModal"/>

        <relavant-modal ref="relavantModal" @hide-modal="hideRelavantModal"/>

        <publish-modal ref="publishModal" @hide-modal="hidePublishModal"/>

        <message-modal ref="messageModal" @hide-modal="hideMessageModal"/>

        <Modal v-model="publishZBModal" title="指标发布">
        <Row class="f14" v-for="(item,index) in pubValue1" :key="index">
            <Col span="18">{{pubLabel1}}{{item.title}}：</Col>
            <Col span="6">{{item.val}}</Col>
        </Row>
        <Row class="f14" v-for="(item, index) in pubValue2" :key="index">
            <Col span="18">{{item.name}}：</Col>
            <template v-if="pubtabelType == '3' || item.isHB">
            <Col span="6" v-if="item.val>0" style="color:red">{{(item.val*100).toFixed(2) + '%'}}</Col>
            <Col span="6" v-else-if="item.val<0" style="color:green">{{(item.val*100).toFixed(2) + '%'}}</Col>
            <Col span="6" v-else>{{item.val}}</Col>
            </template>
            <template v-else>
            <Col span="6" v-if="item.val>0" style="color:red">{{item.val}}</Col>
            <Col span="6" v-else-if="item.val<0" style="color:green">{{item.val}}</Col>
            <Col span="6" v-else>{{item.val}}</Col>
            </template>
        </Row>
        <Form ref="publishFormValidate" :rules="publishValidate" :model="publishForm">
          <FormItem label="备注 ：" :label-width="180"><span class="f14">{{pubValue3}}</span></FormItem>
          <FormItem label="数据保存方式 ：" :label-width="180">
            <Select v-model="publishForm.typeId" @on-change="changePublishType">
              <Option v-for="(option, index) in indexTypeList" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="修改原因 ：" v-show='publishForm.typeId == 1' :label-width="180" prop="updateReason">
            <Input type="textarea" v-model="publishForm.updateReason" placeholder="请输入修改原因" />
          </FormItem>
        </Form>
        <div slot="footer">
          <i-button type="primary" @click="publishFun('publishFormValidate')">确定</i-button>
          <i-button @click="publishZBModal=false">取消</i-button>
        </div>
      </Modal>
    </div>
</template>
<script>
import axios from "axios";
import basicModal from "./modalList/basicModal.vue";
import contactModal from "./modalList/contactModal.vue";
import relavantModal from "./modalList/relavantModal.vue";
import publishModal from "./modalList/publishModal.vue";
import messageModal from "./modalList/messageModal.vue";
import {
  showEditQuotaPage,
  publishQuota
} from "../unitmangement/api/infoDiffusion";
import { formData, formatTime } from "../../../assets/js/common.js";
export default {
  name: "editList",
  components: {
    basicModal,
    contactModal,
    relavantModal,
    publishModal,
    messageModal
  },
  data() {
    return {
      tableRow: 0,
      publishForm: {
        typeId: 0,
        updateReason: ""
      },
      indexModalVisible: false,
      tableHtml: "",
      basicModalVisible: false,
      cantactModalVisible: false,
      relavantModalVisible: false,
      publishModalVisible: false,
      publishZBModal: false,
      operateFun: {},
      indexTypeList: [
        { label: "新增数据", value: 0 },
        { label: "修改数据", value: 1 }
      ],
      publishValidate: {
        updateReason: [
          { required: false, message: "请输入修改原因", trigger: "blur" }
        ]
      },
      pubLabel1: "",
      pubLabel2: "",
      pubValue1: "",
      pubValue2: [],
      pubValue3: "",
      tables: [],
      tabelType: [],
      pubTabelType:"",
      hasLastOperate:false,
      rowList: {}
    };
  },
  created() {},
  watch: {
    publishZBModal(val) {
      if (val == false) {
        this.pubLabel1 = "";
        this.pubLabel2 = "";
        this.pubValue1 = "";
        this.pubValue2 = "";
        this.pubValue3 = "";
        this.publishForm = {
          typeId: 0,
          updateReason: ""
        };
      }
    }
  },
  methods: {
    changePublishType() {
      if (this.publishForm.typeId == 1) {
        this.publishValidate.updateReason = [
          { required: true, message: "请输入修改原因", trigger: "blur" }
        ];
      } else {
        this.publishValidate.updateReason = [
          { required: false, message: "请输入修改原因", trigger: "blur" }
        ];
      }
      this.$refs["publishFormValidate"].validate();
    },
    showEditQuotaPageFunction(data) {
      this.rowList = data;
      this.indexModalVisible = true;
      var that = this;
      let params = {
        informationUnitId: data.informationUnitId
      };
      axios({
        url: "/information/unit/show_edit_quota_page",
        method: "post",
        data: formData(params)
      }).then(res => {
       if (res.status == "200") {
          console.log("test~",res)
          var res = res.data
          let string = res.response.content;
          this.tabelType = res.response.tabelType ? res.response.tabelType.split(",") : [];

          let jsStr = res.response.javaScript;
          jsStr = jsStr ? jsStr.replace(/\r\n/g, "") : "";
          if(jsStr == "(a-c)/c"){
              jsStr = '(a-b)/b'
          }
          this.operateFun = jsStr;
          string = string ? string.replace(/\r\n/g, "") : "";
          var myNodeList = this.parseDom(string);
          this.tables = [];
          for (var i = 0; i < myNodeList.length; i++) {
            if(res.response.tabelType == 5){
              this.tabelType[i] = 5;
            }
            var mytable = myNodeList[i];
            let result = this.getTableContent(mytable,i);
            this.tables.push({
              tableData: result.data,
              rowspanData: result.rowspan,
              thRows: mytable
                .getElementsByTagName("thead")[0]
                .getElementsByTagName("tr").length
            });
          }
        }
      }).catch(err => {
        console.log(err)
      });
    },
    //字符串转换成nodelist
    parseDom(arg) {
      var objE = document.createElement("div");
      objE.innerHTML = arg;
      return objE.getElementsByTagName("table");
    },
    getTableContent(mytable,n) {
      var data = [],
        rowspan = [],
        result = {};
      for (var i = 0, rows = mytable.rows.length; i < rows; i++) {
        let cells = mytable.rows[i].cells;
        for (var j = 0; j < cells.length; j++) {
          if (!data[i]) {
            data[i] = new Array();
          }
          if (cells[j].getAttribute("rowspan")) {
            rowspan.push({
              columnIndex: j,
              rowIndex: i,
              value: cells[j].getAttribute("rowspan")
            });
          }
          let classEle = cells[j].getAttribute("class");
          if(this.tabelType[n] == '4' && (classEle == 'type1' || classEle == 'type2' || classEle == 'type4')){
            let spEle = cells[j].getElementsByTagName("span");
            data[i][j] = {
                val:'',
                section:{
                  val1:spEle[0] ? spEle[0].innerHTML : "",
                  val2:spEle[1] ? spEle[1].innerHTML : "",
                  id1:spEle[0] ? spEle[0].getAttribute("data-min") : "",
                  id2:spEle[1] ? spEle[1].getAttribute("data-max") : ""
                },
                class: classEle,
                colspan: cells[j].getAttribute("colspan")
                  ? cells[j].getAttribute("colspan")
                  : "",
                rowspan: cells[j].getAttribute("rowspan")
                  ? cells[j].getAttribute("rowspan")
                  : "",
                id: cells[j].getAttribute("id") ? cells[j].getAttribute("id") : "",
                isDisabled:false
            };
          }else if(this.tabelType[n] == '5'){
            let rule = cells[j].getAttribute("data-rule"),ruleBase=cells[j].getAttribute("data-base");
            if(rule == "(a-b)*100%"){
              rule = '(a-b)/b'
            }
            data[i][j] = {
              val: cells[j].getElementsByTagName("b")[0]
                ? cells[j].getElementsByTagName("b")[0].innerText
                : cells[j].innerText,
              class: classEle,
              colspan: cells[j].getAttribute("colspan")
                ? cells[j].getAttribute("colspan")
                : "",
              rowspan: cells[j].getAttribute("rowspan")
                ? cells[j].getAttribute("rowspan")
                : "",
              id: cells[j].getAttribute("id") ? cells[j].getAttribute("id") : "",
              isDisabled:false,
              rule:rule?rule:'',
              ruleBase:ruleBase?ruleBase:'',
              isHB:rule == '(a-b)/b' ? true : false
            };
          }else{
            data[i][j] = {
              val: cells[j].getElementsByTagName("b")[0]
                ? cells[j].getElementsByTagName("b")[0].innerText
                : cells[j].innerText,
              class: classEle,
              colspan: cells[j].getAttribute("colspan")
                ? cells[j].getAttribute("colspan")
                : "",
              rowspan: cells[j].getAttribute("rowspan")
                ? cells[j].getAttribute("rowspan")
                : "",
              id: cells[j].getAttribute("id") ? cells[j].getAttribute("id") : "",
              isDisabled:false
            };
          }

        }
      }
      result = {
        data: data,
        rowspan: rowspan
      };
      return result;
    },
    publishModalOpen(tindex, index) {
      this.pubtabelType = tindex;
      this.tableRow = {
        tindex: tindex,
        index: index
      };
      const time = formatTime(new Date());
      let trEle = this.tables[tindex].tableData[index];
      let thEle = this.tables[tindex].tableData[this.tables[tindex].thRows - 1];
      let thLeng = this.tables[tindex].thRows;
      console.log(thLeng);
      console.log(thEle);
      console.log(trEle);
      let pubLabel1 = "",
        label1 = "",
        label2 = "";
      this.pubValue1 = [];
      this.pubValue2 = [];
      this.pubValue3 = "";
      for (var i = 0; i < trEle.length; i++) {
        // if (
        //   trEle[i].class != "type1" &&
        //   trEle[i].class != "type2" &&
        //   trEle[i].class != "type3" &&
        //   trEle[i].class != "type4" &&
        //   trEle[i].class != "type4 hidden" &&
        //   trEle[i].class != "type5"
        // ) {
        //   pubLabel1 += trEle[i].val;
        // }
        label1 = "";
        if (trEle[i].class == "type1") {
          if (thLeng > 1) {
            let th0 = this.tables[tindex].tableData[0],
              th0Arr = [];
            for (var j = 0; j < th0.length; j++) {
              if(th0[j].colspan){
                for(var m=0;m<parseInt(th0[j].colspan);m++){
                  th0Arr.push(th0[j].val)
                }
              }else{
                th0Arr.push(th0[j].val)
              }
            }
            label1 = th0Arr[i];
          }
          if(thEle[thEle.length - (trEle.length - i)] && !(thEle.length == 1 && thEle[thEle.length - (trEle.length - i)].colspan > 0)){
            label1 += thEle[thEle.length - (trEle.length - i)].val;
          }else if (
              trEle[i-1].class != "type1" &&
              trEle[i-1].class != "type2" &&
              trEle[i-1].class != "type3" &&
              trEle[i-1].class != "type4" &&
              trEle[i-1].class != "type4 hidden" &&
              trEle[i-1].class != "type5"
          ){
            label1 += trEle[i-1].val;
          }
          let pubishval = 0;
          if (this.tabelType[tindex] == "4") {
            pubishval = trEle[i].section.val1 + ' ~ ' + trEle[i].section.val2
          }else{
            pubishval = trEle[i].val
          }
          this.pubValue1.push({
            title: label1,
            val: pubishval
          });
        }
        if (trEle[i].class == "type2") {
          if(thEle[thEle.length - (trEle.length - i)] && !(thEle.length == 1 && thEle[thEle.length - (trEle.length - i)].colspan > 0)){
            label2 = thEle[thEle.length - (trEle.length - i)].val;
          }else if (
              trEle[i-1].class != "type1" &&
              trEle[i-1].class != "type2" &&
              trEle[i-1].class != "type3" &&
              trEle[i-1].class != "type4" &&
              trEle[i-1].class != "type4 hidden" &&
              trEle[i-1].class != "type5"
          ){
            label2 = trEle[i-1].val;
          }

          let pubishval1 = 0;
          if (this.tabelType[tindex] == "4") {
            pubishval1 = trEle[i].section.val1 + ' ~ ' + trEle[i].section.val2
          }else if (this.tabelType[tindex] == "3") {
            pubishval1 = trEle[i].val ? parseFloat(trEle[i].val).toFixed(2) ? (parseFloat(trEle[i].val)*100).toFixed(2)+'%' : 0 : 0;
          }else{
            pubishval1 = trEle[i].val;
          }
          let isHB = false;
          if(this.operateFun == '(a/b)*100%' || this.operateFun == '(a-b)/b'){
            isHB = true
          }
          this.pubValue2.push({name:pubLabel1 + label2,val:pubishval1,isHB:trEle[i].isHB ? trEle[i].isHB : isHB});
        }
        if (trEle[i].class == "type3") {
          this.pubValue3 = trEle[i].val;
        }
      }
      this.pubLabel1 = pubLabel1;
      this.publishZBModal = true;
    },
    publishFun(name) {
      this.$refs[name].validate(valid => {
        if (valid || this.publishForm.typeId != 1) {
          let tindex = this.tableRow.tindex;
          let index = this.tableRow.index;
          let params = {};
          let contents = [],
            codes = [],
            des = "";
          let trEle = this.tables[tindex].tableData[index];
          for (var i = 0; i < trEle.length; i++) {
            if (trEle[i].class == "type1") {
              if (this.tabelType[tindex] == "4") {
                codes.push({
                  code: trEle[i].section.id1,
                  val: trEle[i].section.val1
                });
                codes.push({
                  code: trEle[i].section.id2,
                  val: trEle[i].section.val2
                });
              }else{
                codes.push({
                  code: trEle[i].id,
                  val: trEle[i].val
                });
              }
            }
            if (trEle[i].class == "type2") {
              if (this.tabelType[tindex] == "4") {
                codes.push({
                  code: trEle[i].section.id1,
                  val: trEle[i].section.val1
                });
                codes.push({
                  code: trEle[i].section.id2,
                  val: trEle[i].section.val2
                });
              }else{
                codes.push({
                  code: trEle[i].id,
                  val: trEle[i].val
                });
              }
            }
            if (trEle[i].class == "type3") {
              des = trEle[i].val;
            }
          }
          for (var i = 0; i < codes.length; i++) {
            contents.push({
              code: codes[i].code,
              date: formatTime(new Date()),
              des: des,
              value: codes[i].val,
              updateReason: this.publishForm.updateReason,
              status:this.publishForm.typeId
            });
          }
          params.contents = JSON.stringify(contents);
          publishQuota(formData(params)).then(res => {
            if (res.response == true) {
              this.$Message.success("发布成功！");
              this.publishZBModal = false;
            } else {
              this.$Message.error(res.response);
            }
          });
        }
      });
    },
    countRender(tindex,index,index1,newId){
      let tdEle = this.tables[tindex].tableData[index][index1];
      let base = tdEle.ruleBase.split(","),rule=tdEle.rule,id=tdEle.id;
          let baseArr = [];
          for(var i=0;i<base.length;i++){
            if(base[i].indexOf("id_") != -1){
              let id1 = base[i].replace(/id_/g, "");
              id1 = id1.replace(/\s+/g,"");
              let item = this.findIdItem(id1,tindex,index);
              if(item.val && (item.val).indexOf("%") != -1){
                item.val = parseFloat((item.val).replace(/%/g, "")) * 100;
              }
              baseArr.push(item.val ? parseFloat(item.val) ? parseFloat(item.val) : 0 : 0)
            }else{
              if(base[i] && base[i].indexOf("%") != -1){
                base[i] = parseFloat(base[i].replace(/%/g, "")) * 100;
              }
              baseArr.push(base[i] ? parseFloat(base[i]) ? parseFloat(base[i]) : 0 : 0)
            }
          }
          // let rule1 = rule.replace(/[\+\-\*\/\(\)]/g, "");
          // let rule1Arr = [];
          // for(var i=0;i<rule1.length;i++){
          //   if(rule1Arr.indexOf(rule1[i]) == -1){
          //     rule1Arr.push(rule1[i])
          //   }
          // }
          let count = 0;
          if(rule == "sum"){
            for(var i=0;i<baseArr.length;i++){
              count += baseArr[i]
            }
          }else if(rule == "average"){
            let c=0;
            for(var i=0;i<baseArr.length;i++){
              c += baseArr[i]
            }
            c = c / baseArr.length;
            c = c==Infinity ? 0 : c==-Infinity ? 0 : c;
            c = c || c == 0 ? c.toFixed(2) : "";
            count = c;
          }else if(rule == "copy"){
            count = tdEle.ruleBase;
          }else{
            let a = baseArr[0],b = baseArr[1];
            let c;

            if(rule == '(a/b)*100%'){
              c = b ? a/b : '';
            }else{
              let tt2 = new Function("a","b", "{return " + rule + "}");
              c = tt2(a, b);
            }
            c = c==Infinity ? 1 : c==-Infinity ? -1 : c;
            c = c || c == 0 ? c.toFixed(2) : "";
            if(rule == '(a/b)*100%'){
              c = c ? (c * 100).toFixed(2)+'%' : '';
            }
            count = c;
            if(a && b && (a-b)/b > 0.3){
              this.$Message.warning('较上一次记录超30%！');
            }
          }
          this.tables[tindex].tableData[index][index1].val = count ? count : 0;

          let trArr = this.tables[tindex].tableData;
          for(var i=0;i<trArr.length;i++){
              for(var j=0;j<trArr[i].length;j++){
                let base = trArr[i][j].ruleBase ? trArr[i][j].ruleBase.split(",") : [];
                if(trArr[i][j].class=="type2" && base.indexOf("id_"+newId) != -1){
                  this.countRender(tindex,i,j,trArr[i][j].id)
                }
              }
          }
    },
    findIdItem(id,tindex,index){
      let trArr = this.tables[tindex].tableData;
      //先到index传入的行去查找是否有该id，没有的话，再到tindex对应的整个表去查
      let isIndex = false;
      if(index){
        for(var i=0;i<trArr[index].length;i++){
          if(trArr[index][i].id == id){
            isIndex = true;
            return trArr[index][i]
          }
        }
      }
      if(!isIndex){
        for(var i=0;i<trArr.length;i++){
          for(var j=0;j<trArr[i].length;j++){
            if(trArr[i][j].id == id){
              return trArr[i][j]
            }
          }
        }
      }
    },
    changeTimeData(i1, i2, i3, val, id,type) {
      if (this.tabelType[i1] == "1") {
          let a = val;
          let trArr = this.tables[i1].tableData[i2];
          let b = 0,
            count = "";
          for (var i = 0; i < trArr.length; i++) {
            if (trArr[i].class == "type4" || trArr[i].class == "type4 hidden") {
              b = trArr[i].val;
            }
          }
          if(a && a.indexOf("%") != -1){
              a = parseFloat(a.replace(/%/g, "")) * 100;
          }
          if(b && b.indexOf("%") != -1){
              b = parseFloat(b.replace(/%/g, "")) * 100;
          }
          a = a ? parseFloat(a) ? parseFloat(a) : 0 : 0;
          b = b ? parseFloat(b) ? parseFloat(b) : 0 : 0;
          let tt2 = new Function("a", "b", "{return " + this.operateFun + "}");
          let c;
          if(this.operateFun == '(a/b)*100%'){
            c = b ? a/b : '';
          }else{
            c = tt2(a, b);
          }
          c = c==Infinity ? 1 : c==-Infinity ? -1 : c;
          c = c || c == 0 ? c.toFixed(2) : "";
          if(this.operateFun == '(a/b)*100%'){
            c = c ? (c * 100).toFixed(2)+'%' : '';
          }
          if(a && b && (a-b)/b > 0.3){
            this.$Message.warning('较上一次记录超30%！');
          }
          let id1 = "";
          if(i2 < this.tables[i1].tableData.length-1){
            let arr = this.tables[i1].tableData[i2 + 1];
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].class == "type2") {
                this.tables[i1].tableData[i2 + 1][i].val = c;
                id1 = this.tables[i1].tableData[i2 + 1][i].id
              }
            }
          }
        return;
      }
      if (this.tabelType[i1] == "3") {
        let a = val;
        let arr = this.tables[i1].tableData[i2];
        let b = 0,
          count = "",
          id1 = "",
          c = "";
        let isHasType2 = false;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].class == "type4" || arr[i].class == "type4 hidden") {
            b = arr[i].val;
          }
          if (arr[i].class == "type2") {
            count = i;
            id1 = arr[i].id;
            isHasType2 = true;
          }
        }
        if (isHasType2) {
          if (a == "") {
            this.tables[i1].tableData[i2][count].val = 0;
          } else if (b == "") {
            this.tables[i1].tableData[i2][count].val = "";
          } else {
            if(a && a.indexOf("%") != -1){
              a = parseFloat(a.replace(/%/g, "")) * 100;
            }
            if(b && b.indexOf("%") != -1){
                b = parseFloat(b.replace(/%/g, "")) * 100;
            }
            a = a ? parseFloat(a) ? parseFloat(a) : 0 : 0;
            b = b ? parseFloat(b) ? parseFloat(b) : 0 : 0;
            let tt2 = new Function(
              "a",
              "b",
              "{return " + this.operateFun + "}"
            );
            if(this.operateFun == '(a/b)*100%'){
              c = b ? a/b : '';
            }else{
              c = tt2(a, b);
            }
            c = c==Infinity ? 1 : c==-Infinity ? -1 : c;
            c = c || c == 0 ? c.toFixed(2) : "";
            if(this.operateFun == '(a/b)*100%'){
              c = c ? (c * 100).toFixed(2)+'%' : '';
            }
            if(a && b && (a-b)/b > 0.3){
              this.$Message.warning('较上一次记录超30%！');
            }
            this.tables[i1].tableData[i2][count].val = c;
          }
        }
        let trArr = this.tables[i1].tableData,
          sum = 0;
        for (var i = 0; i < trArr.length - 1; i++) {
          for (var j = 0; j < trArr[i].length; j++) {
            if (trArr[i][j].class == "type1") {
              sum += trArr[i][j].val ? parseFloat(trArr[i][j].val) ? parseFloat(trArr[i][j].val) : 0 : 0;
            }
          }
        }
        let arr1 = this.tables[i1].tableData[this.tables[i1].tableData.length - 1],id2="",id3="";
        let a1 = sum,b1 = 0,c1 = 0;
        for (var i = 0; i < arr1.length; i++) {
          if (arr1[i].class == "type5") {
            b1 = arr1[i].val
          }
          if (arr1[i].class == "type2") {
            if(this.operateFun && this.operateFun != "-"){
              id3 = id2 ? arr1[i].id : "";
              id2 = id2 ? id2 : arr1[i].id;
              if(id2 && !id3){
                arr1[i].val = sum;
                arr1[i].isSum = true;
              }
              if(id2 && id3){
                if(a1 && a1.indexOf("%") != -1){
                  a1 = parseFloat(a1.replace(/%/g, "")) * 100;
                }
                if(b1 && b1.indexOf("%") != -1){
                    b1 = parseFloat(b1.replace(/%/g, "")) * 100;
                }
                a1 = a1 ? parseFloat(a1) ? parseFloat(a1) : 0 : 0;
                b1 = b1 ? parseFloat(b1) ? parseFloat(b1) : 0 : 0;
                let tt1 = new Function("a", "b", "{return "+this.operateFun+"}");
                if(this.operateFun == '(a/b)*100%'){
                  c1 = b1 ? a1/b1 : '';
                }else{
                  c1 = tt1(a1,b1);
                }
                c1 = c1==Infinity ? 1 : c1==-Infinity ? -1 : c1;
                c1 = c1 || c1 == 0 ? c1.toFixed(2) : "";
                if(this.operateFun == '(a/b)*100%'){
                  c1 = c1 ? (c1 * 100).toFixed(2)+'%' : '';
                }
                arr1[i].val = c1;
              }
            }else{
              let sum1 = 0;
              for (var j = 0; j < trArr.length-1; j++) {
                let m = i;
                for(var n=0;n<trArr[j].length;n++){
                  if(n < i && trArr[j][n].rowspan){
                    m = i + 1;
                  }
                }
                sum1 += trArr[j][m].val ? parseFloat(trArr[j][m].val) ? parseFloat(trArr[j][m].val) : 0 : 0;
              }
              arr1[i].val = sum1;
              arr1[i].isSum = true;
            }
          }
        }
        return;
      }
      if (this.tabelType[i1] == "4") {
        let a = val;
        let arr = this.tables[i1].tableData[i2];
        let b = 0,
          count = "";
        let isHasType2 = false,id1="",val1="";
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].class == "type4" || arr[i].class == "type4 hidden") {
            b = type == 1 ? arr[i].section.val1 :  arr[i].section.val2;
          }
          if (arr[i].class == "type2") {
            count = i;
            isHasType2 = true;
            id1 = type == 1 ? arr[i].section.id1 :  arr[i].section.id2;
          }
        }
        if (isHasType2) {
          if (a == "") {
            if(type == 1){
              this.tables[i1].tableData[i2][count].section.val1 = 0;
            }else{
              this.tables[i1].tableData[i2][count].section.val2 = 0;
            }
          } else if (b == "") {
            if(type == 1){
              this.tables[i1].tableData[i2][count].section.val1 = "";
            }else{
              this.tables[i1].tableData[i2][count].section.val2 = "";
            }
          } else {
            if(a && a.indexOf("%") != -1){
              a = parseFloat(a.replace(/%/g, "")) * 100;
            }
            if(b && b.indexOf("%") != -1){
                b = parseFloat(b.replace(/%/g, "")) * 100;
            }
            a = a ? parseFloat(a) ? parseFloat(a) : 0 : 0;
            b = b ? parseFloat(b) ? parseFloat(b) : 0 : 0;
            var c = a - b;
            c = c || c == 0 ? c.toFixed(2) : "";
            if(type == 1){
              this.tables[i1].tableData[i2][count].section.val1 = c;
            }else{
              this.tables[i1].tableData[i2][count].section.val2 = c;
            }
            val1 = c;
            if(b && c && c/b > 0.3){
              this.$Message.warning('较上一次记录超30%！');
            }
          }
        }

        return
      }
      if (this.tabelType[i1] == "5") {
        let trArr = this.tables[i1].tableData;
        for(var i=0;i<trArr.length;i++){
            for(var j=0;j<trArr[i].length;j++){
              let base = trArr[i][j].ruleBase ? trArr[i][j].ruleBase.split(",") : [];
              if(trArr[i][j].class=="type2" && base.indexOf("id_"+id) != -1){
                this.countRender(i1,i,j,trArr[i][j].id)
              }
            }
        }
        return;
      }
      let a = val;
      let arr = this.tables[i1].tableData[i2];
      let b = 0,
        count = "";
      let isHasType2 = false,id1="",val1="";
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].class == "type4" || arr[i].class == "type4 hidden") {
          b = arr[i].val;
        }
        if (arr[i].class == "type2") {
          count = i;
          isHasType2 = true;
          id1 = arr[i].id;
          val1 = arr[i].val;
        }
      }
      if (isHasType2) {
        if (a == "") {
          this.tables[i1].tableData[i2][count].val = 0;
          val1 = "";
        } else if (b == "") {
          this.tables[i1].tableData[i2][count].val = "";
          val1 = "";
        } else {
          if(a && a.indexOf("%") != -1){
              a = parseFloat(a.replace(/%/g, "")) * 100;
          }
          if(b && b.indexOf("%") != -1){
              b = parseFloat(b.replace(/%/g, "")) * 100;
          }
          a = a ? parseFloat(a) ? parseFloat(a) : 0 : 0;
          b = b ? parseFloat(b) ? parseFloat(b) : 0 : 0;
          var c = a - b;
          c = c || c == 0 ? c.toFixed(2) : "";
          this.tables[i1].tableData[i2][count].val = c;
          val1 = c;
          if(b && c && c/b > 0.3){
            this.$Message.warning('较上一次记录超30%！');
          }
        }
      }
    },
    closeInput(tindex,index,throws) {
      let arr = this.tables[tindex].tableData[index];
      for (var i = 0; i < arr.length; i++) {
          arr[i].isDisabled = true;
          if (arr[i].class == "type1") {
            if(this.tabelType[tindex] == '4'){
              arr[i].section.val1 = "";
              arr[i].section.val2 = "";
              this.changeTimeData(tindex, index, i, "", arr[i].section.id1,1);
              this.changeTimeData(tindex, index, i, "", arr[i].section.id2,3);
            }else{
              arr[i].val = "";
              this.changeTimeData(tindex, index, i, "", arr[i].id);
            }
          }
      }
    },
    openInput(tindex,index) {
      let trEle = this.tables[tindex].tableData[index];
      for(var i=0;i<trEle.length;i++){
        trEle[i].isDisabled = false;
      }
    },
    copyLastDayInfo() {
      for (var i = 0; i < this.tables.length; i++) {
        if (this.tabelType[i] == "5") {
          let trArr = this.tables[i].tableData;
          for(var i1=0;i1<trArr.length;i1++){
              for(var j=0;j<trArr[i1].length;j++){
                if(trArr[i1][j].class=="type1" && trArr[i1][j].rule == 'copy'){
                  this.countRender(i,i1,j,trArr[i1][j].id)
                }
              }
          }
        }else{
          for (var j = 0; j < this.tables[i].tableData.length; j++) {
            let arr = this.tables[i].tableData[j],type1Index="",newVal = 0,id="",hasType4=false;;
            if(!arr[0].isDisabled){
              for(var n=0;n<arr.length;n++){
                if(arr[n].class=="type1"){
                  type1Index = n;
                  id = arr[n].id;
                }
                if(arr[n].class=="type4"){
                  newVal = arr[n].val;
                  hasType4 = true;
                }
              }
              if(type1Index && hasType4){
                arr[type1Index].val = newVal;
                this.changeTimeData(i, j, type1Index, newVal, id)
              }
            }

          }
        }

      }
    },
    hideIndexModel() {
      this.indexModalVisible = false;
    },
    showBasicModal(row) {
      this.$refs.basicModal.showModal();
      this.$refs.basicModal.showBasicInfo(row);
    },
    showContactModal(row) {
      this.$refs.cantactModal.showModal();
      this.$refs.cantactModal.showContactInfo(row);
    },
    showRelavantModal(row) {
      this.$refs.relavantModal.showModal();
      this.$refs.relavantModal.showRelavantInfo(row);
    },
    showPublishModal(row) {
      if (row.displayType == 1) {
        this.$refs.publishModal.showModal();
        this.$refs.publishModal.showPublishInfo(row);
      } else if (row.displayType == 2) {
        this.$refs.messageModal.showModal();
        this.$refs.messageModal.showMessageInfo(row, "短信");
      } else {
        this.$refs.messageModal.showModal();
        this.$refs.messageModal.showMessageInfo(row, "短讯通");
      }
    },
    hideBasicModal() {
      this.$refs.basicModal.hideModal();
    },
    hideContactModal() {
      this.$refs.cantactModal.hideModal();
    },
    hideRelavantModal() {
      this.$refs.relavantModal.hideModal();
    },
    hidePublishModal() {
      this.$refs.publishModal.hideModal();
    },
    hideMessageModal() {
      this.$refs.messageModal.hideModal();
    }
  }
};
</script>

<style lang="less" scoped>
.f14 {
  font-size: 14px;
}
.plant-content {
  background: #fff;
  padding: 0 20px;
}
.unit {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}
.unit .unit_title {
  padding-top: 20px;
}

.unit .unit_title span {
  height: 43px;
  width: 100%;
  background: #ebf2fe;
  border: 1px solid #bbbbbb;
  display: block;
  color: #000000;
  font-size: 16px;
  line-height: 43px;
  padding-left: 10px;
}
.step-container {
  padding: 30px 0 20px;
}
.step-container .step2 {
  width: 198px;
}
.title {
  margin-bottom: 20px;
}
.unit_content {
  height: 59px;
  line-height: 59px;
  border-left: 1px solid #bbbbbb;
  border-right: 1px solid #bbbbbb;
  border-bottom: 1px solid #bbbbbb;
}
.unit_content .unit_content_left {
  height: 59px;
  float: left;
  width: 50%;
}
.unit_content .no_line {
  border-right: none;
}
.unit_content .unit_s_left,
.unit_content .unit_s_right {
  font-size: 14px;
  width: 38%;
  color: #000000;
  height: 58px;
  line-height: 59px;
  text-align: center;
  border-right: 1px solid #bbbbbb;
  float: left;
  background: #e9eaef;
}
.unit_content .unit_s_right {
  width: 62%;
}
.unit_content .no-right-border {
  border-right: 0;
}

.btn-modal .btn {
  margin-left: 10px;
}
.btn_upload {
  width: 100px;
  border: #427fe9;
  background-color: #427fe9;
  color: #fff;
  padding: 7px 20px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.table-content {
  height: 210px;
  overflow: auto;
}
.table-content table td {
  border: 1px solid #eee;
  height: 20px;
  padding: 3px 5px;
}
.table-content table input {
  border: 1px solid #ddd;
}
.table-content .hidden {
  display: none;
}
</style>



