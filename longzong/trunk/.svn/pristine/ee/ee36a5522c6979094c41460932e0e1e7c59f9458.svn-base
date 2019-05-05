<template>
  <!-- 关联信息单元 -->
  <Row>
    <Modal v-model="RelatedModal" title="关联信息单元" @on-cancel="resetRelationTask" width="650">
            <Form ref="relationTask" :label-width="120">
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <Row type="flex" justify="space-between">
                        <Col span="24">
                        <FormItem label="添加信息单元:" prop="taskIdList">
                            <Button type="primary" @click="addTaskModalOne">添加信息单元</Button>
                        </FormItem>
                        </Col>
                    </Row>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Table class="tableCommon" :data="tableData_addTask" :columns="columns_task" :stripe="true" :border="true">
                    </Table>
                </Row>
            </Form>
            <div slot="footer">
              <i-button  class="search-btn" type="primary" @click="handleRelationTask()">确定</i-button>
              <i-button  class="search-btn" @click="resetRelationTask()">取消</i-button>
            </div>
        </Modal>
        <!-- 关联信息单元结束 -->
         <Modal v-model="addTaskModal" title="添加信息单元" width="650" @on-cancel="resetTask">
            <Form ref="addTaskform" :model="addTaskform" :label-width="120" :rules="ruleCustom">
                <Row type="flex" justify="space-between">
                    <Col span="24">
                    <FormItem label="信息单元名称:" prop="name">
                        <Select v-model="addTaskform.taskId" filterable remote @on-change="select_task" label-in-value ref="AddName" @on-query-change="getTask">
                            <Option v-for="(option, index) in optionstask" :value="option.value" :key="index">{{option.label}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
              <i-button  class="search-btn" type="primary" @click="saveTask()">确定</i-button>
              <i-button  class="search-btn" @click="resetTask()">取消</i-button>
            </div>
        </Modal>
  </Row>
        
</template>
<script>
import axios from "axios";
import { formData } from "../../../assets/js/common.js";
import {taskSelect,detailContacts,RelationTask} from "../unitmangement/api/unitManageMent"
export default {
  name: 'shenheModal',
  props: {
        showUnitModal: Boolean,
        UnitData: Object
  },
  data(){
    const validateName = (rule, value, callback) => {
      this.tableDataArray = [] ;
        if(this.$refs.AddName.query == ''){
          callback(new Error('请输入信息单元名称'));
          return;
        }
        if(this.optionstask && this.optionstask.length>0){
          this.optionstask.map(item => {
            console.log('123',item.label,this.$refs.AddName.query);
            if(item.label == this.$refs.AddName.query){
              console.log('124',item.label,this.$refs.AddName.query);
              this.tableDataArray = item;
              if(!this.duplicateRemoval(item.value)){
                console.log('125');
                callback(new Error('信息单元名称已重复'));
                return ;
              }else {
                console.log('126',item.label,this.$refs.AddName.query);
                console.log(4)
                callback();
              }
            }else{
              console.log(1)
              callback(new Error('信息单元名称不存在'));
              return ;
            }
          })
        }else{
          console.log(2)
          callback(new Error('信息单元名称不存在'));
          return;
        }

        // if(!this.addTaskform.taskId){
        //   callback(new Error('信息单元名称不存在'));
        //   return;
        // }
        // console.log(this.addTaskform.taskId);
    };
    return {
      InfoShow:false,
      RelatedModal:false,
      addTaskModal:false,
      NewUnitData:{},
      tableData_addTask: [],
      tableData_addTaskOne:{},
      tableDataArray:[],
      addTaskform:{
        taskId:''
      },
      optionstask:[],
      ruleCustom:{
        name: [
            { validator: validateName, trigger: 'blur' }
        ],
      },
      columns_task: [
        {
          key: "name",
          title: "信息单元",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, data) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "5px",
                    color: "#145edb",
                    textDecoration: "underline",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      console.log(data);
                      this.deleteTask(data);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
    }
  },
  methods:{
    duplicateRemoval(data){
      var test = true;
      if(this.tableData_addTask && this.tableData_addTask.length >0){
        for(var i =0 ; i < this.tableData_addTask.length;i++){
          if(this.tableData_addTask[i].id == data){
            test = false;
            return false;
          }
        }
      }
      return test
    },
    addTaskModalOne(){
      this.optionstask = [];
      this.addTaskModal = true;
      this.addTaskform.taskId = '';
      this.$refs.AddName.query = '';
      this.$refs.addTaskform.resetFields();
    },
    resetRelationTask(){
      this.RelatedModal = false ;
      this.$emit('hide-modal');
    },
     // 选择信息单元
    select_task(id) {
      if (id != "" && id != undefined) {
        this.addTaskform.taskId = id.value;
        this.addTaskform.taskName = id.label;
      }
    },
    handleRelationTask(){
      console.log(this.tableData_addTask);
      let one = [];
      if(this.tableData_addTask && this.tableData_addTask.length >0){
        this.tableData_addTask.map(item => {
          one.push(item.id)
          console.log('itemone',one)
        })
      }
      let params = {
        id:this.NewUnitData.row.id,
        taskIdList:one
      }
      RelationTask(formData(params)).then(res => {
        this.RelatedModal = false;
        this.$emit('hide-modal');
        this.$Message.success('关联信息单元成功!');
        this.$emit('getUnitList');
      })
    },
    saveTask(){
      this.$refs.addTaskform.validate((valid) => {
          if (valid) {
            this.tableData_addTaskOne = {}
            this.optionstask.map(item => {
            if(item.label == this.$refs.AddName.query){
              this.tableData_addTaskOne = {
                id:item.value,
                name:item.label
              }
              this.tableData_addTask.push(this.tableData_addTaskOne);
            }
          })
          this.addTaskModal = false;
          } else {
              // this.$Message.error('Fail!');
          }
      })
    },
    resetTask(){
      this.addTaskModal = false;
      this.addTaskform.taskId = '';
    },
    InfoId(data){
      console.log(data);
      let params = {
        id:data.row.id
      }
      detailContacts(formData(params)).then(res => {
        console.log(res)
        if(res.response.taskTaskContacts){
          this.tableData_addTask = res.response.taskTaskContacts
        }else{
          this.tableData_addTask = []
        }
          
      });
    },
    deleteTask(data){
      this.tableData_addTask.splice(data.index,1)
    },
    // 信息单元搜索
    getTask(query) {
      let self = this;
      console.log("搜索信息单元名称", query);
      if (query !== "") {
        self.loading1 = true;
        let params = {
          name: query
        };
        taskSelect(formData(params)).then(res => {
          const list1 = res.response.map(item => {
          return {
              value: item.id,
              label: item.text
            };
          });
          self.optionstask = list1;
        });
        self.loading1 = false;
      } else {
        self.optionstask = [];
        this.addTaskform.taskId = ''
      }
    },
  },
  watch:{
    showUnitModal (newV, oldV){
      this.RelatedModal = newV
    }, 
    UnitData(newV, oldV){
        this.NewUnitData = newV;
        console.log('NewUnitData',this.NewUnitData);
        this.InfoId(this.NewUnitData);
    },
  }
}
</script>

