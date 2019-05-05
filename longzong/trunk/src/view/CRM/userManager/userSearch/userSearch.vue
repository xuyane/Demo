<style lang="less" scoped>
.userSearchProducts .search-input {
  width: 400px;
}
.userSearchProducts .button {
  padding-left: 200px;
}
.userSearchProducts .products {
  width: 400px;
}
.userSearchProducts .products .ivu-select-selection {
  height: auto !important;
}
</style>
<template>
  <Row class="userSearchProducts">
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;用户搜索
      </Row>
    </Col>
    <Col span="12" class-name="search-form">
      <Form :model="formItem" ref="formValidate" :label-width="120" :rules="ruleValidate">
        <Col>
          <FormItem label="用户ID:" prop='userId'>
            <Input v-model="formItem.userId" class="search-input" placeholder="请输入用户ID"></Input>
          </FormItem>
        </Col>
         <Col>
          <FormItem label="用户名:">
            <Input v-model="formItem.userName" class="search-input" placeholder="请输入用户名"></Input>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="所在地区:">
            <Select v-model="formItem.provice" style="width:130px"  @on-change="getCitySelect">
              <Option v-for="item in proviceList" :value="item.code" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="formItem.city" style="width:130px"  @on-change="getAreaSelect">
              <Option v-for="item in cityList" :value="item.code" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select v-model="formItem.area" clearable ref="inputs" style="width:130px" >
              <Option v-for="item in areaList" :value="item.code" :key="item.value">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="公司名称:">
             <Select
                v-model="formItem.memberName"
                ref="input1"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod2"
                @on-query-change="emptyQuery"
                :loading="loading">
                <Option v-for="(option, index) in options2" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="注册时间:">
            <DatePicker
              v-model="regTime"
              type="daterange"
              placeholder="请选择注册时间"
              class="search-input"></DatePicker>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="分配时间:">
            <DatePicker
              v-model="disTime"
              type="daterange"
              placeholder="请选择分配时间"
              class="search-input"></DatePicker>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="最后服务时间:">
            <DatePicker
              v-model="serveTime"
              type="daterange"
              placeholder="请选择服务时间"
              class="search-input"></DatePicker>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="产品权限:">
            <Select
            class="products"
            v-model="productIds"
            multiple
            filterable
            remote
            :remote-method="remoteMethod3"
            :loading="loading">
            <Option v-for="(option, index) in options3" :value="option.id" :key="index">{{option.name}}</Option>
        </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="业务员:">
            <Select
                v-model="formItem.adminId"
                ref="input1"
                class="search-input"
                filterable
                remote
                :remote-method="remoteMethod1"
                @on-query-change="emptyAdminId"
                :loading="loading">
                <Option v-for="(option, index) in options1" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="业务员部门:">
            <select-department class="search-input" @data-list="getDepData" :emptyModel='departId'></select-department>
          </FormItem>
        </Col>
        <Col >
          <FormItem>
            <Button type="primary" class="search-btn" @click="search">搜索用户</Button>
          </FormItem>
        </Col>
      </Form>
      
    </Col>
  </Row>
</template>
<script>
import {
  getAdminList,
  memberSelectList,
  getProvice,
  getCity,
  getArea,
  queryProduct,
  getUserSearch
} from "../../../components/axios/crm.js";
import {
  formData,
  formatStamp,
  formatTime
} from "../../../../assets/js/common.js";
import SelectDepartment from "../../../components/crm/departMent.vue";
import OilPage from "../../../components/page/page.vue";
export default {
  components: {
    SelectDepartment,
    OilPage
  },
  data() {
    return {
      productIds: [],
      proviceList: [],
      cityList: [],
      areaList: [],
      options1: [],
      options2: [],
      options3: [],
      departId: "",
      loading: false,
      regTime: [],
      disTime: [],
      serveTime: [],
      formItem: {},
      ruleValidate: {
        userId: [
          {
            required: false,
            pattern: "^[0-9]*$",
            message: "请输入纯数字的用户ID",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getProviceSelect();
  },
  methods: {
    // 获取省
    getProviceSelect() {
      let params = {
        parentCode: "01",
        type: 1
      };
      getProvice(params).then(res => {
        this.proviceList = res.response;
      });
    },
    // 获取市
    getCitySelect() {
      this.formItem.city = "";
      let params = {
        parentCode: this.formItem.provice
      };
      getCity(params).then(res => {
        this.cityList = res.response;
      });
    },
    // 获取区
    getAreaSelect() {
      this.$refs.inputs.clearSingleSelect();
      let params = {
        parentCode: this.formItem.city
      };
      getArea(params).then(res => {
        this.areaList = res.response;
      });
    },
    // 清空公司
    emptyQuery(query) {
      if (query == "") {
        this.formItem.memberName = "";
        return;
      }
    },
    // 清空业务员
    emptyAdminId(query) {
      if (query == "") {
        this.formItem.adminId = "";
        return;
      }
    },
    // 业务员下拉搜索
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          adminName: query
        };
        setTimeout(() => {
          this.loading = false;
          getAdminList(params).then(res => {
            // console.log(res)
            this.options1 = res.response;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    //获取所在部门部门树
    getDepData(deptLabel, deptId, deptCode) {
      console.log(deptLabel, deptId, deptCode);
      this.departId = deptId ? deptId : null;
      console.log(this.departId);
    },
    // 获取公司名称下拉搜索
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          memberName: query
        };
        setTimeout(() => {
          this.loading = false;
          memberSelectList(params).then(res => {
            this.options2 = res.response;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    // 根据产品名称模糊搜索
    remoteMethod3(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          productName: query
        };
        setTimeout(() => {
          this.loading = false;
          queryProduct(params).then(res => {
            this.options3 = res.response;
          });
        }, 200);
      } else {
        this.options3 = [];
      }
    },
    // 查看
    search() {
      // console.log(111)
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          console.log(this.departId);
          let startRegisterTime = formatStamp(this.regTime[0]);
          let endRegisterTime = formatStamp(this.regTime[1]);
          let startDistributionTime = formatStamp(this.disTime[0]);
          let endDistributionTime = formatStamp(this.disTime[1]);
          let startServiceTime = formatStamp(this.serveTime[0]);
          let endServiceTime = formatStamp(this.serveTime[1]);
          this.$router.push({
            name: "searchResult",
            query: {
              areaCode: this.formItem.area || "",
              userId: this.formItem.userId || "",
              userName: this.formItem.userName || "",
              memberId: this.formItem.memberName || "",
              startRegisterTime: startRegisterTime || "",
              endRegisterTime: endRegisterTime || "",
              startDistributionTime: startDistributionTime || "",
              endDistributionTime: endDistributionTime || "",
              startServiceTime: startServiceTime || "",
              endServiceTime: endServiceTime || "",
              productIds: this.productIds || "",
              deptId: this.departId || "",
              adminId: this.formItem.adminId || ""
            }
          });
        } else {
        }
      });
    },
    // 监听分页
    pageChange(page, pageSize) {
      if (page) {
        this.pageNum = page;
      }
      if (pageSize) {
        this.pageSize = pageSize;
      }
      this.getListPage();
    }
  }
};
</script>
