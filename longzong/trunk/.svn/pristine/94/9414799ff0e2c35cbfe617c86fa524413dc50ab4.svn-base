<style lang="less" scoped>
.top-btn {
  position: absolute;
  top: 70px;
  right: 20px;
}
.card-container {
  width: 100%;
  background: #fff;
  .row {
    position: relative;
    display: flex;
    height: 50px;
    line-height: 46px;
    text-align: center;
    .th {
      flex: 0 0 200;
      width: 200px;
      height: 100%;
      background: #eeeff4;
      overflow: hidden;
    }
    .td {
      flex: 1;
      padding: 0 10px;
      height: 100%;
      overflow: hidden;
    }
  }
  .row-title {
    border-top: 1px solid #bbb;
    font-size: 16px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .text-a {
    color: #145edb;
    cursor: pointer;
  }
}
.title-name {
  font-size: 16px;
  color: #000;
  margin: 0 0 12px 20px;
  background: #fff;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;我的用户
      </Row>
    </Col>
    <tab-header :tab-index="1"></tab-header>
    <Button v-if="isEdit" type="primary" class="search-btn top-btn" @click="changeEdit">编辑</Button>
    <Button v-else type="primary" class="search-btn top-btn" @click="update">更新</Button>
    <Col span="24" class="card-container" v-if="isEdit">
      <table width="100%" border="1" cellspacing="0">
        <Col span="24" class="row-title">
          <div class="text-center">公司基本信息</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">公司全称:</th>
            <td class="td">{{userData.memberNameCn}} 
              <span class="text-a" v-if="userData.memberNameCn" @click="checkRecord">查看合并记录</span>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">公司简称:</th>
            <td class="td">{{userData.shortNameCn}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">企业类型:</th>
            <td class="td">{{formatTypeName(this.userData.companyType)}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">企业性质:</th>
            <td class="td">{{formatNatureName(this.userData.companyNature)}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">主营品种:</th>
            <td class="td">
              <span v-for="breed in userData.breedIds" :key="breed.id"> {{ breed.name }} </span>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">所在城市:</th>
            <td class="td">{{userData.areaName}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">街道地址:</th>
            <td class="td">{{userData.address}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">邮政编码:</th>
            <td class="td">{{userData.postcode}}</td>
          </Col>
        </Row>
        <Col span="24" class="row-title">
          <div class="text-center">公司联系方式</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">公司电话:</th>
            <td class="td">{{userData.phone || '无'}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">公司传真:</th>
            <td class="td">{{userData.fax || '无'}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">公司网址:</th>
            <td class="td">{{userData.website}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">公司邮箱:</th>
            <td class="td">{{userData.email}}</td>
          </Col>
        </Row>
        <Col span="24" class="row-title">
          <div class="text-center">注册来源</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">注册IP:</th>
            <td class="td">{{userData.regIp}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">归属:</th>
            <td class="td">{{userData.belongTo}}</td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">注册来源:</th>
            <td class="td">{{formatRegName(userData.regSource)}}</td>
          </Col>
          <Col span="12" class="row">
            <th class="th">注册时间:</th>
            <td class="td">{{userData.regTime}}</td>
          </Col>
        </Row>
      </table>
    </Col>
    <Col span="24" class="card-container" v-else>
      <table width="100%" border="1" cellspacing="0">
        <Col span="24" class="row-title">
          <div class="text-center">公司基本信息</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">公司全称:</th>
            <td class="td">
             <Input type="text" v-model="userData.memberNameCn" class="search-input" placeholder="请输入公司全称"></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">公司简称:</th>
            <td class="td">
              <Input type="text" v-model="userData.shortNameCn" class="search-input" placeholder="请输入公司简称"></Input>
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">企业类型:</th>
            <td class="td">
              <Select v-model="userData.companyType" class="search-input select-box" placeholder="请选择企业类型">
                <Option v-for="item in companyTypes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">企业性质:</th>
            <td class="td">
              <Select v-model="userData.companyNature" class="search-input select-box" placeholder="请选择企业性质">
                <Option v-for="item in companyNatures" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">主营品种:</th>
            <td class="td">
              <Input v-model="breeds" class="search-input" placeholder="请选择主营品种" @on-focus="showTreeModal" readonly></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">所在城市:</th>
            <td class="td">
              <Input type="text" v-model="userData.areaName" class="search-input" placeholder="请输入所在城市"></Input>
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">街道地址:</th>
            <td class="td">
              <Input type="text" v-model="userData.address" class="search-input" placeholder="请输入街道地址"></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">邮政编码:</th>
            <td class="td">
              <Input type="text" v-model="userData.postcode" class="search-input" placeholder="请输入邮政编码"></Input>
            </td>
          </Col>
        </Row>
        <Col span="24" class="row-title">
          <div class="text-center">公司联系方式</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">公司电话:</th>
            <td class="td">
               <Input type="text" v-model="userData.phone" class="search-input" placeholder="请输入公司电话"></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">公司传真:</th>
            <td class="td">
              <Input type="text" v-model="userData.fax" class="search-input" placeholder="请输入公司传真"></Input>
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">公司网址:</th>
            <td class="td">
              <Input type="text" v-model="userData.website" class="search-input" placeholder="请输入公司网址"></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">公司邮箱:</th>
            <td class="td">
              <Input type="text" v-model="userData.email" class="search-input" placeholder="请输入公司邮箱"></Input>
            </td>
          </Col>
        </Row>
        <Col span="24" class="row-title">
          <div class="text-center">注册来源</div>
        </Col>
        <Row>
          <Col span="12" class="row">
            <th class="th">注册IP:</th>
            <td class="td">
              <Input type="text" v-model="userData.regIp" class="search-input" placeholder="请输入注册IP"></Input>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">归属:</th>
            <td class="td">
              <Input type="text" v-model="userData.belongTo" class="search-input" placeholder="请输入注册归属"></Input>
            </td>
          </Col>
        </Row>
        <Row>
          <Col span="12" class="row">
            <th class="th">注册来源:</th>
            <td class="td">
              <Select v-model="userData.regSource" class="search-input select-box" placeholder="请选择注册来源">
                <Option v-for="item in userResoure" :value="item.value" :key="item.value">{{ item.desc }}</Option>
              </Select>
            </td>
          </Col>
          <Col span="12" class="row">
            <th class="th">注册时间:</th>
            <td class="td">
              <DatePicker v-model="userData.regTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择注册时间" class="search-input"></DatePicker>
            </td>
          </Col>
        </Row>
      </table>
    </Col>
    <Col span="24" class="card-container">
      <div class="title-name">联系人信息</div>
      <Row type="flex" justify="space-between">
        <tab :tab="tab" :tab-list="tabList" @tab="tabChange"></tab>
        <Button type="primary" class="btn" @click="add">添加联系人</Button>
      </Row>
      <Table class="tableCommon mar-t-10"
        :data="tableData"
        :columns="columns"
        ref="dragTable"
        :stripe="true"
        :border="true">
      </Table>
      <div class="text-center mar-t-20 mar-b-20">
        <Button class="search-btn" @click="back">返回</Button>
      </div>
    </Col>
    <Modal
      width="1000"
      v-model="addModal"
      :title="title"
      @on-cancel="cancel">
      <Row>
        <Col span="24">
          <Form ref="formItem" :model="formItem" :rules="ruleForm" :label-width="100">
            <Row type="flex" justify="space-between">
              <Col span="11">
                <FormItem label="姓名:" prop="realName">
                  <Input v-model="formItem.realName" class="search-input" placeholder="请输入姓名"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="用户名:">
                  <Input v-model="formItem.userName" class="search-input" disabled placeholder="请输入用户名"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span="11">
                <FormItem label="业务员洽谈人:">
                  <RadioGroup v-model="formItem.isNegotiator">
                    <Radio label="是"></Radio>
                    <Radio label="否"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="职位:" prop="title">
                  <Input v-model="formItem.title" class="search-input" placeholder="请输入职位"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span="11">
                <FormItem label="手机:" prop="mobile">
                  <Input v-model="formItem.mobile" class="search-input" placeholder="请输入手机"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="电话:">
                  <Input v-model="formItem.phone" class="search-input" placeholder="请输入电话"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span="11">
                <FormItem label="邮箱:" prop="email">
                  <Input v-model="formItem.email" class="search-input" placeholder="请输入邮箱"></Input>
                </FormItem>
              </Col>
              <Col span="11">
                <FormItem label="传真:">
                  <Input v-model="formItem.fax" class="search-input" placeholder="请输入传真"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span="24">
                <FormItem label="地址:">
                  <Input v-model="formItem.address" class="search-input" placeholder="请输入地址"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="space-between">
              <Col span="11">
                <FormItem label="业务员:">
                  <Input v-model="formItem.creatorName" class="search-input" readonly placeholder="请输入业务员"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="ok">确定</i-button>
        <i-button @click="cancel">取消</i-button>
      </div>
    </Modal>
    <Modal
     v-model="treeModal"
     title="请选择品种"
     @on-ok="breedOk"
     @on-cancel="breedCancel">
      <Tree
        :data="breedData"
        show-checkbox
        :load-data="pzloadData"
        @on-check-change="treeChange">
      </Tree>
    </Modal>
  </Row>
</template>
<script>
import TabHeader from "./tabHeader";
import Tab from "../../../components/tab/tab.vue";
import {
  getUserDetail,
  getContactsList,
  addContact,
  deleteContact,
  getContactInfo,
  updateContactInfo,
  queryCompanyTypeSelectList,
  queryCompanyNatureSelectList,
  getUserResource,
  updateBaseInfo,
  queryBreedTree,
  queryLoginInfo
} from "../../../components/axios/crm.js";
import {
  formatTime2,
  formData,
  formatStamp
} from "../../../../assets/js/common.js";
import dial from "@/assets/js/linkDial.js";
export default {
  name: "basicInfo",
  data() {
    const validateMobile = (rule, value, callback) => {
      if (value) {
        const reg = /^1[0-9]{10}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      hadchooseData:[],
      isEdit: true,
      checkOrEdit: window.localStorage.getItem("checkOrEdit"),
      userId: window.localStorage.getItem("lzUserId"),
      memberId: window.localStorage.getItem("lzMemberId"),
      adminId: null,
      tab: 1,
      addModal: false,
      treeModal: false,
      userData: {},
      tabList: [],
      tableList: [],
      companyTypes: [],
      companyNatures: [],
      userResoure: [],
      breedData: [],
      editOrAdd: "",
      contactId: "",
      title: "",
      breeds: "",
      creatorName: "",
      formItem: {
        realName: "",
        isNegotiator: "是" ? 1 : 0,
        title: "",
        mobile: "",
        phone: "",
        email: "",
        fax: "",
        address: "",
        creatorName: ""
      },
      ruleForm: {
        email: [{ type: "email", message: "邮箱格式错误", trigger: "change" }],
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        title: [{ required: false, message: "请输入职位", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { validator: validateMobile, trigger: "change" }
        ]
      },
      tableData: [],
      columns: [
        {
          key: "realName",
          title: "姓名",
          minWidth: 80
        },
        {
          key: "userName",
          title: "用户名",
          minWidth: 80,
          render: (h, data) => {
            return h("span", {}, data.row.userName || "无");
          }
        },
        {
          key: "title",
          title: "职位",
          minWidth: 80
        },
        {
          key: "mobile",
          title: "手机",
          minWidth: 80,
          render: (h, data) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.onDial(data.row.mobile);
                  }
                }
              },
              data.row.mobile
            );
          }
        },
        {
          key: "phone",
          title: "电话",
          minWidth: 80
        },
        {
          key: "email",
          title: "邮箱",
          minWidth: 80
        },
        {
          key: "fax",
          title: "传真",
          minWidth: 80
        },
        {
          key: "address",
          title: "地址",
          minWidth: 160
        },
        {
          title: "操作",
          minWidth: 180,
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#145edb",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.delete(data.row.contactId);
                    }
                  }
                },
                "删除"
              ),
              h(
                "span",
                {
                  style: {
                    marginRight: "8px",
                    color: "#145edb",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.edit(data.row.contactId);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {
    TabHeader,
    Tab
  },
  created() {
    this.getUserDetail();
    this.getContactsList();
    this.getCompanyTypes();
    this.getCompanyNatures();
    this.getUserResoure();
    this.getLoginInfo();
  },
  methods: {
    changeEdit() {
      this.isEdit = false;
    },
    // 更新
    update() {
      this.$Spin.show();
      let params = {
        userId: this.userId || "",
        memberId: this.memberId || "",
        memberNameCn: this.userData.memberNameCn,
        shortNameCn: this.userData.shortNameCn,
        companyType: this.userData.companyType,
        companyNature: this.userData.companyNature,
        // breed: this.userData.breed,
        breedIds:this.userData.breedIds,
        areaName: this.userData.areaName,
        address: this.userData.address,
        postcode: this.userData.postcode,
        phone: this.userData.phone,
        fax: this.userData.fax,
        website: this.userData.website,
        email: this.userData.email,
        regIp: this.userData.regIp,
        // belongTo: this.userData.belongTo,
        regSource: this.userData.regSource,
        regTime: formatStamp(this.userData.regTime)
      };
      updateBaseInfo(params).then(res => {
        this.$Message.success("更新成功");
        this.isEdit = true;
        this.$Spin.hide();
        this.getUserDetail()
      });
    },
    // 查看合并记录
    checkRecord() {
      this.$router.push({
        name: "recordMergeDetail",
        query: {
          id: this.userData.id
        }
      });
    },
    // 显示品种弹窗
    showTreeModal() {
      this.treeModal = true;
      this.getTreeData();
    },
    getTreeData() {
      let params = {
        parentCode: ""
      };
      queryBreedTree(params).then(res => {
        this.breedData = res.response.map(option => {
          if (option.type != 0) {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              disableCheckbox: true,
              children: [],
              type: option.type,
              loading: false
            };
          } else {
            return {
              title: option.nodeName,
              value: option.nodeCode,
              id: option.nodeId,
              type: option.type
            };
          }
        });
      });
    },
    breedCancel() {
      this.treeModal = false;
    },
    breedOk() {
      this.userData.breedIds=this.hadchooseData.map(item=>{
        return {id:item.id}
      });
      let list=this.hadchooseData.map(item=>{
        return item.title
      });
      this.breeds=list.join(',')
    },
    pzloadData(item, callback) {
      setTimeout(() => {
        let msg = {
          parentCode: item.value
        };
        queryBreedTree(msg).then(resp => {
          const data = resp.response.map(option => {
            if (option.type != 0) {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                id: option.nodeId,
                disableCheckbox: true,
                children: [],
                type: option.type,
                loading: false
              };
            } else {
              return {
                title: option.nodeName,
                value: option.nodeCode,
                id: option.nodeId,
                type: option.type
              };
            }
          });
          callback(data);
        });
      }, 1000);
    },
    treeChange(data) {
      this.hadchooseData=data
    },
    // 获取会员基础信息
    getUserDetail() {
      let params = {
        userId: this.userId || "",
        memberId: this.memberId || ""
      };
      this.$Spin.show();
      getUserDetail(params).then(res => {
        let str = [];
        this.userData = res.response;
        this.userData.regTime = formatTime2(this.userData.regTime) || "";
        if(res.response.breedIds){
          res.response.breedIds.map(item => {
          str.push(item.name);
        });
        }
        
        this.breeds = str.join(",");
        this.$Spin.hide();
      });
    },
    // 获取所有联系人信息
    getContactsList() {
      this.$Spin.show();
      getContactsList(this.memberId + "?date=" + new Date().getTime()).then(
        res => {
          this.tabList = [];
          res.response.map((item, index) => {
            this.tabList.push({
              tab: index + 1,
              title: item.adminName,
              adminId: item.adminId
            });
          });
          this.tableList = res.response;
          this.tableData = res.response[this.tab - 1].list;
          this.adminId = res.response[this.tab - 1].adminId;
          this.$Spin.hide();
        }
      );
    },
    // 获取用户来源
    getUserResoure() {
      getUserResource().then(res => {
        this.userResoure = res.response;
      });
    },
    // 获取企业类型
    getCompanyTypes() {
      queryCompanyTypeSelectList().then(res => {
        this.companyTypes = res.response;
      });
    },
    // 获取企业性质
    getCompanyNatures() {
      queryCompanyNatureSelectList().then(res => {
        this.companyNatures = res.response;
      });
    },
    // id换desc
    formatTypeName(id) {
      let name = "";
      this.companyTypes.map(item => {
        if (item.value == id) {
          name = item.desc;
          return;
        }
      });
      return name;
    },
    formatNatureName(id) {
      let name = "";
      this.companyNatures.map(item => {
        if (item.value === id) {
          name = item.desc;
          return;
        }
      });
      return name;
    },
    formatRegName(id) {
      let name = "";
      this.userResoure.map(item => {
        if (item.value === id) {
          name = item.desc;
          return;
        }
      });
      return name;
    },

    // 切换tab
    tabChange(tab) {
      this.tab = tab;
      this.adminId = this.tabList[tab - 1].adminId;
      this.tableData = this.tableList[tab - 1].list;
    },
    // 删除
    delete(id) {
      let params = {
        concatId: id
      };
      this.$Modal.confirm({
        title: "删除联系人",
        content: "<p>确定删除此联系人?</p>",
        onOk: () => {
          deleteContact(formData(params)).then(res => {
            this.$Message.success("删除成功");
            this.getContactsList();
          });
        },
        onCancel: () => {
        }
      });
    },
    getLoginInfo() {
      queryLoginInfo().then(res => {
        this.creatorName = res.response.name;
      });
    },
    // 编辑
    edit(id) {
      this.addModal = true;
      this.editOrAdd = "edit";
      this.title = "编辑联系人";
      this.contactId = id;
      getContactInfo(id).then(res => {
        let data = res.response;
        this.formItem = {
          realName: data.realName || "",
          isNegotiator: data.isNegotiator === 1 ? "是" : "否",
          title: data.title || "",
          mobile: data.mobile || "",
          phone: data.phone || "",
          email: data.email || "",
          fax: data.fax || "",
          address: data.address || "",
          creatorName: data.creatorName || ""
        };
      });
    },
    // 添加
    add() {
      this.addModal = true;
      this.editOrAdd = "add";
      this.title = "添加联系人";
      this.formItem = {
        creatorName: this.creatorName
      };
    },
    ok() {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          if (this.editOrAdd === "add") {
            let params = {
              // userId: this.userId,
              memberId: this.memberId,
              adminId: this.adminId
            };
            this.formItem.isNegotiator =
              this.formItem.isNegotiator === "是" ? 1 : 0;
            Object.assign(params, this.formItem);
            addContact(params).then(res => {
              this.$Message.success(res.message);
              this.getContactsList();
              this.addModal = false;
            });
          } else {
            let params = {
              userId: this.userId,
              memberId: this.memberId,
              contactId: this.contactId
            };
            this.formItem.isNegotiator =
              this.formItem.isNegotiator === "是" ? 1 : 0;
            Object.assign(params, this.formItem);
            updateContactInfo(params).then(res => {
              this.$Message.success("更新成功");
              this.getContactsList();
              this.addModal = false;
            });
          }
        }
      });
    },
    cancel() {
      this.addModal = false;
      this.$refs.formItem.resetFields();
    },
    back() {
      this.$router.push({
        name: "allUser"
      });
    },
    //呼出
    onDial(phone) {
      dial(phone, res => {
        this.$Notice.success({ title: "呼叫成功：" + phone });
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == "/allUser") {
      to.meta.keepAlive = true;
      to.meta.isBack = false;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  }
};
</script>
