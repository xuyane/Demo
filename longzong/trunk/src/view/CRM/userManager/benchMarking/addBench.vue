<style lang="less" scoped>
  .search-input {
    width: 500px;
    height: auto;
  }
  .button {
    padding-left: 200px;
  }
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        当前位置：用户关系管理&nbsp;&nbsp;>>&nbsp;&nbsp;新增对标
      </Row>
    </Col>
    <Col span="12" class-name="search-form">
      <Form :model="formItem" ref="formValidate" :rules="ruleValidate" :label-width="120">
        <Col>
          <FormItem label="公司名称:" prop="member">
            <Select
              ref="selectMethod"
              v-model="formItem.member"
              class="search-input"
              filterable
              remote
              :remote-method="remoteMethod2"
              @on-change="onChange"
              :loading="loading"
              placeholder="请输入公司名称">
              <Option v-for="(option, index) in companyList" :value="option" :key="index">{{option.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="联系人:" prop="user">
            <Select v-model="formItem.user" class="search-input" placeholder="请选择联系人">
              <Option v-for="item in realNames" :value="item" :key="item.id">{{ item.realName }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="对标服务商:" prop="compareCompany">
            <Select v-model="formItem.compareCompany" class="search-input" placeholder="请选择对标服务商">
              <Option v-for="item in compareCompanys" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="服务期限:" prop="serviceTime">
            <Select v-model="formItem.serviceTime" class="search-input" placeholder="请选择服务期限">
              <Option v-for="item in serviceTimes" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="关注产品:" prop="attent">
            <Select
              v-model="formItem.attent"
              ref="productInput"
              class="search-input"
              filterable
              clearable 
              remote
              :remote-method="remoteMethod"
              :loading="loading">
              <Option v-for="(option, index) in productList" :value="option.id" :key="index">{{option.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="优点:" prop="advantage" class="selectBox">
            <Select v-model="formItem.advantage" multiple class="search-input" placeholder="请选择优点">
              <Option v-for="item in advantages" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="缺点:" prop="disadvantage" class="selectBox">
            <Select v-model="formItem.disadvantage" multiple class="search-input" placeholder="请选择缺点">
              <Option v-for="item in disadvantages" :value="item.value" :key="item.value">{{ item.desc }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="备注:" prop="note">
            <Input v-model="formItem.note" class="search-textarea" type="textarea" :rows="4" style="width: 500px" placeholder="请输入备注"></Input>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="附件:">
            <Upload
              :before-upload = "handleUpload"
              :data = "form"
              :on-success = "uploadSuccess"
              :on-remove = "removeUrl"
              :max-size = 20480
              action="/crm/usercompare/upload">
              <Button icon="ios-cloud-upload-outline">上传附件</Button>
            </Upload>
          </FormItem>
        </Col>
      </Form>
      <Col class="button">
        <Button type="primary" class="search-btn" @click="submit">提交</Button>
        <Button class="search-btn" @click="cancel">取消</Button>
      </Col>
    </Col>
   
  </Row>
</template>
<script>
import {
  getAllAdvantage,
  getAllDisadvantage,
  getAllSevers,
  getAllYears,
  saveUserCompare,
  uploadUserCompare,
  memberSelectList,
  getUserById,
  queryProductSelectList
} from '../../../components/axios/crm'
import {
  formData, formatStamp
} from '../../../../assets/js/common'
export default {
  data() {
    return {
      loading: false,
      formItem: {
        attachment: []
      },
      fileroad: '',
      form: {
        attachment: ''
      },
      productList: [],
      ruleValidate: {
        member: [
          { required: true, type: 'object', message: '请输入公司名称', trigger: 'change' }
        ],
        user:  [
          { required: true, type: 'object', message: '请选择联系人', trigger: 'change' }
        ],
        compareCompany: [
          { required: true, message: '请选择对标服务商', trigger: 'change' }
        ],
        serviceTime: [
          { required: true, message: '请选择服务期限', trigger: 'change' }
        ],
        attent: [
          { required: true, type: 'number', message: '请输入关注产品', trigger: 'change' }
        ],
        advantage: [
          { required: true, type: 'array', message: '请选择优点', trigger: 'change' }
        ],
        disadvantage: [
          { required: true, type: 'array', message: '请选择缺点', trigger: 'change' }
        ],
        note: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ]
      },
      disadvantages: [],
      advantages: [],
      compareCompanys: [],
      serviceTimes: [],
      companyList: [],
      realNames: []
    }
  },
  created() {
    this.getAllAdvantage()
    this.getAllDisadvantage()
    this.getAllSevers()
    this.getAllYears()
  },
  methods: {
    //上传文件
    handleUpload (file){
      console.log('a', this.fileroad)
      if (this.fileroad) {
        this.$Message.warning("只能上传一个文件")
        return false
      } else {
        this.form.attachment = file
      }
    },
    // 上传成功后调用
    uploadSuccess (res){
      this.fileroad = res.response
    },
    // 点击上传成功后的文件地址
    getUrl (data){
      console.log(data)
    },
    //点击删除文件地址
    removeUrl (file, fileList){
      this.fileroad = ""
    },
    // 获取所有优点
    getAllAdvantage() {
      getAllAdvantage().then(res => {
        this.advantages = res.response.list
      })
    },
    // 获取所有缺点
    getAllDisadvantage() {
      getAllDisadvantage().then(res => {
        this.disadvantages = res.response.list
      })
    },
    // 获取所有服务商
    getAllSevers() {
      getAllSevers().then(res => {
        this.compareCompanys = res.response.list
      })
    },
    // 获取所有年限
    getAllYears() {
      getAllYears().then(res => {
        this.serviceTimes = res.response.list
      })
    },
    onChange() {
      let params = {
        memberId: this.formItem.member.id
      }
      console.log('mer', this.formItem.member)
      getUserById(params).then(res => {
        console.log('ids', res)
        this.realNames = res.response.list
      })
    },
     // 查询产品信息
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        let params = {
          productName: query
        };
        setTimeout(() => {
          this.loading = false;
          queryProductSelectList(params).then(res => {
            this.productList = res.response;
          });
        }, 200);
      } else {
        this.productList = [];
      }
    },
    // 公司名称
    remoteMethod2(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          memberName: query
        }
        memberSelectList(params).then(res => {
          this.companyList = res.response;
        })
      } else {
        this.companyList = []
      }
    },
    submit() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          let params = {
            memberId: this.formItem.member.id,
            memberNameCn: this.formItem.member.name,
            userId: this.formItem.user.id,
            realName: this.formItem.user.realName,
            compareCompany: this.formItem.compareCompany,
            serviceTime: this.formItem.serviceTime,
            attent: this.formItem.attent,
            advantage: this.formItem.advantage.join(','),
            disadvantage: this.formItem.disadvantage.join(','),
            note: this.formItem.note,
            attachment: this.fileroad
          }
          saveUserCompare(formData(params)).then(res => {
            console.log('dddd', res)
            this.$Message.success('新增成功！')
            this.$router.push({
              name: 'benchMarking'
            })
          })
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    // 取消
    cancel() {
      this.$router.push({
        name: 'benchMarking'
      })
    }
    
  }
}
</script>
