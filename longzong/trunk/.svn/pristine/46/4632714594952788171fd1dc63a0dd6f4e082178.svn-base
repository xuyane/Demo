<style>

</style>
<template>
  <Row>
    <Col span="24">
					<Row class-name="current-position">
						当前位置：数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;历史数据
					</Row>
		</Col>
    <Col span="24" class="search-form">
      <Form :label-width="100">
        <Row>
          <Col span="8">
            <FormItem label="日期：">
              <DatePicker type="daterange"  placeholder="请输入日期" :clearable='clearableValue' style="width: 300px" v-model="dataTime" @on-change="changeData"></DatePicker>
            </FormItem>
          </Col>
          <Col span="8" class="text-left" style="margin-bottom:20px;">
            <Button type="primary" @click="search()" style="margin-right:20px;">查询</Button>
            <Button @click="reset()">重置</Button>
          </Col>
          <Col span="8" class="text-right" style="margin-bottom:20px;">
            <span>选择{{selectionDataVal}}条数据&nbsp;&nbsp;&nbsp;</span>
            <Button type="error" @click="deleteData">一键删除</Button>
          </Col>
        </Row>
      </Form>
    </Col>
    <Col span="24" class="table-con">
      <Table :columns="columns" :data="tabledata"
        @on-selection-change = "selectionChange"></Table>
      <oil-page
        :total="total"
        :page-num="params.pageNum"
        :page-size="params.pageSize"
        @page-change="pageChange"
        :page-size-opts="pageSizeOpts"
        :show-sizer="showSizer">
      </oil-page>
    </Col>
  </Row>
</template>
<script>
import {dataManagerHistoryPageList,dataManagerDeleteHistoryData,dataManagerUpdateHistoryData} from "../../components/axios/dataCenter.js";
import OilPage from "../../components/page/page.vue";
import  ColumsJs  from "../../../assets/js/columsJs.js";
import { formData,formatStamp,formatTime,formatTime2} from "../../../assets/js/common.js";
export default {
  components:{
    OilPage,
  },
  data(){
    return {
      clearableValue:false,
      startTimeOne:this.$route.query.startTime,
      endTimeTwo:this.$route.query.endTime,
      selectionData:[],
      selectionDataVal:0,
      dataTime:[formatTime2(this.$route.query.startTime), formatTime2(this.$route.query.endTime)],
      tabledata:[],
      total: 10,
      showSizer: true,
      pageSizeOpts: [10,15,20,40,50,100,200],
      params:{
        pageNum:1,
				pageSize:10,
      },
      // columns:[]
    }
  },
  created(){
    console.log('columns', this.columns);
    this.tableListOne();
    this.tableList();
  },
  computed:{
    columns() {
      let type = this.$route.query.type || '';
      let index = {
          type: 'selection',
          width: 60,
          align: 'center'
      };
      let operation = {
				title: "操作",
				align: "center",
				width: 115,
				render: (h, data) => {
					return h("div", [
						h(
							"a",
							{
								style: {
									marginRight: "5px",
									textDecoration: "none",
								},
								on: {
									click: () => {
                    console.log(data.row);
										this.save(data);
									}
								}
							},
							"保存"
            ),
            h(
							"a",
							{
								style: {
									marginRight: "5px",
									textDecoration: "none",
								},
								on: {
									click: () => {
                    console.log(data.row);
										this.dataManagerDelete(data);
									}
								}
							},
							"删除"
						)
					]);
				}
      }
      // console.log('123',ColumsJs[1]);
      let array = [index, ...ColumsJs[type], operation];
      // array = ColumsJs[1];
      // array.unshift(index);
      // console.log(array);
      // array.push(operation);
      // console.log(array);
      // this.columns = array;

      return array
    }
  },
  methods:{
    search(){
      this.tableList();
    },
    reset(){
      this.dataTime = [formatTime2(this.$route.query.startTime),formatTime2(this.$route.query.endTime)];
    },
    selectionChange(data){
      console.log('11',data);
      this.selectionData = data;
      if(data.length > 0){
        this.selectionDataVal = data.length
      }else{
        this.selectionDataVal =0;
      }
      console.log('selectionData',this.selectionData)
    },
    deleteData(){
      let array = [];
      let array_one = [];
      let params = {};
      if(this.selectionData.length>0){
        for(var i = 0;i<this.selectionData.length;i++){
          if(this.$route.query.type == 1){
            params = {
              tableId:this.selectionData[i].indexTableId,
              tableName:this.selectionData[i].indexTableName
            }
            array.push(params);
          }
          if(this.$route.query.type == 2){
            params = {
              tableId:this.selectionData[i].indexTableId,
              tableName:this.selectionData[i].indexTableName
            }
            array.push(params);
          }
          if(this.$route.query.type == 3){
            console.log(123);
            array_one = [
              {
              tableId:this.selectionData[i].indexTableId,
              tableName:this.selectionData[i].indexTableName
              },
              {
                tableId:this.selectionData[i].lpriceId,
                tableName:this.selectionData[i].lpriceTableName
              },
              {
                tableId:this.selectionData[i].gpriceId,
                tableName:this.selectionData[i].gpriceTableName
              }
            ]
            array.push.apply(array,array_one);
          }
          if(this.$route.query.type == 4){
            // debugger;
            array_one = [
              {
              tableId:this.selectionData[i].indexTableId,
              tableName:this.selectionData[i].indexTableName
              },
              {
                tableId:this.selectionData[i].lpriceId,
                tableName:this.selectionData[i].lpriceTableName
              },
              {
                tableId:this.selectionData[i].gpriceId,
                tableName:this.selectionData[i].gpriceTableName
              },
              {
                tableId:this.selectionData[i].rpriceId,
                tableName:this.selectionData[i].rpriceTableName
              }
            ]
            array.push.apply(array,array_one);
          }
          if(this.$route.query.type == 5){
            array_one = [
              {
              tableId:this.selectionData[i].indexTableId,
              tableName:this.selectionData[i].indexTableName
              },
              {
                tableId:this.selectionData[i].oilpriceId,
                tableName:this.selectionData[i].oilpriceTableName
              },
              {
                tableId:this.selectionData[i].petrifiedpriceId,
                tableName:this.selectionData[i].petrifiedpriceTableName
              }
            ]
            array.push.apply(array,array_one);
          }
          if(this.$route.query.type == 6){
            array_one = [
              {
              tableId:this.selectionData[i].rindexValueId,
              tableName:this.selectionData[i].rindexValueTableName
              },
              {
                tableId:this.selectionData[i].tindexValueId,
                tableName:this.selectionData[i].tindexValueTableName
              }
            ]
            array.push.apply(array,array_one);
          }
          if(this.$route.query.type == 7){
            array_one = [
              {
              tableId:this.selectionData[i].indexTableId,
              tableName:this.selectionData[i].indexTableName
              }
            ]
            array.push.apply(array,array_one);
          }
        }
        console.log('array',array);
        let that = this;
        this.$Modal.confirm({
          title: "信息",
          content: "是否确认要删除?",
          onOk: () => {
            dataManagerDeleteHistoryData(array).then(res => {
              that.$Message.success('删除成功');
              this.selectionDataVal =0;
              that.tableList();
            })
          },
          onCancel: () => {
            this.$Message.info("取消操作");
          }
        });
      }else{
        this.$Message.success('请选择数据');
        return;
      }

    },
    save(data){
      console.log(data);
      console.log('保存',data);
      // debugger;
      let array = [];
      let array_one = [];
      let params = [];
      if(this.$route.query.type == 1){
        if(data.row.indexValue||data.row.remark){
          params = {};
          params = {
            id:data.row.indexTableId,
            remake:data.row.remark,
            value:data.row.indexValue,
            tableName:data.row.indexTableName
          }
          array = [];
          array.push(params);
          dataManagerUpdateHistoryData(array).then(res=>{
            this.$Message.success('保存成功');
            this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }
       
      }
      if(this.$route.query.type == 2){
        if(data.row.indexValue||data.row.remark){
          params = {};
          params = {
          id:data.row.indexTableId,
          remake:data.row.remark,
          value:data.row.indexValue,
          tableName:data.row.indexTableName
          }
        array = [];
        array.push(params);
        dataManagerUpdateHistoryData(array).then(res=>{
            this.$Message.success('保存成功');
            this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }
        
      }
      if(this.$route.query.type == 3){
        if(data.row.indexValue||data.row.lprice||data.row.gprice||data.row.remark){
            array = [];
            array_one = [];
            array_one = [
              {
                id:data.row.indexTableId,
                remake:data.row.remark,
                value:data.row.indexValue,
                tableName:data.row.indexTableName
              },
              {
                id:data.row.lpriceId,
                remake:data.row.remark,
                value:data.row.lprice,
                tableName:data.row.lpriceTableName
              },
              {
                id:data.row.gpriceId,
                remake:data.row.remark,
                value:data.row.gprice,
                tableName:data.row.gpriceTableName
              }
            ]
            for(var i = 0 ;i<array_one.length;i++){
              array.push(array_one[i]);
            }
           dataManagerUpdateHistoryData(array).then(res=>{
            this.$Message.success('保存成功');
            this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }

      }
      if(this.$route.query.type == 4){
        if(data.row.indexValue||data.row.lprice||data.row.gprice||data.row.rprice||data.row.remark){
             array = [];
          array_one = [];
          array_one = [
            {
              id:data.row.indexTableId,
              remake:data.row.remark,
              value:data.row.indexValue,
              tableName:data.row.indexTableName
            },
            {
              id:data.row.lpriceId,
              remake:data.row.remark,
              value:data.row.lprice,
              tableName:data.row.lpriceTableName
            },
            {
              id:data.row.gpriceId,
              remake:data.row.remark,
              value:data.row.gprice,
              tableName:data.row.gpriceTableName
            },
            {
              id:data.row.rpriceId,
              remake:data.row.remark,
              value:data.row.rprice,
              tableName:data.row.rpriceTableName
            }
          ]
          for(var i = 0 ;i<array_one.length;i++){
            array.push(array_one[i]);
          }
           dataManagerUpdateHistoryData(array).then(res=>{
            this.$Message.success('保存成功');
            this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }
       
      }
      if(this.$route.query.type == 5){
        if(data.row.oilprice||data.row.petrifiedprice||data.row.remark){
            array = [];
            array_one = [];
            array_one = [
          {
            id:data.row.oilpriceId,
            remake:data.row.remark,
            value:data.row.oilprice,
            tableName:data.row.oilpriceTableName
          },
          {
            id:data.row.petrifiedpriceId,
            remake:data.row.remark,
            value:data.row.petrifiedprice,
            tableName:data.row.petrifiedpriceTableName
          }
        ]
        for(var i = 0 ;i<array_one.length;i++){
          array.push(array_one[i]);
        }
           dataManagerUpdateHistoryData(array).then(res=>{
            this.$Message.success('保存成功');
            this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }

      }
      if(this.$route.query.type == 6){
        if(data.row.rindexValue||data.row.tindexValue||data.row.remark){
              array = [];
              array_one = [];
              array_one = [
              {
                id:data.row.rindexValueId,
                remake:data.row.remark,
                value:data.row.rindexValue,
                tableName:data.row.rindexValueTableName
              },
              {
                id:data.row.tindexValueId,
                remake:data.row.remark,
                value:data.row.tindexValue,
                tableName:data.row.tindexValueTableName
              }
            ]
            for(var i = 0 ;i<array_one.length;i++){
              array.push(array_one[i]);
            }
           dataManagerUpdateHistoryData(array).then(res=>{
            this.$Message.success('保存成功');
            this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }

      }
      if(this.$route.query.type == 7){
        if(data.row.indexValue||data.row.remark){
              array = [];
              array_one = []
              array_one = [{
              id:data.row.indexTableId,
              remake:data.row.remark,
              value:data.row.indexValue,
              tableName:data.row.indexTableName
            }]
            for(var i = 0 ;i<array_one.length;i++){
              array.push(array_one[i]);
            }
            dataManagerUpdateHistoryData(array).then(res=>{
            this.$Message.success('保存成功');
            this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }

      }
      
    },
    changeData(){
      console.log('changData',this.dataTime);
      this.startTimeOne = new Date(this.dataTime[0]).setHours(0, 0, 0, 0) ;
      this.endTimeTwo = new Date(this.dataTime[1]).setHours(23, 59, 59, 59) ;
    },
    tableListOne(){
      this.startTimeOne = this.$route.query.startTime;
      this.endTimeTwo = this.$route.query.endTime;
    },
    tableList(){
      console.log('dataTime0', this.dataTime[0]);
//      console.log(this.startTimeOne,this.endTimeTwo)
    //  this.startTimeOne = new Date(this.dataTime[0]).setHours(0, 0, 0, 0);
    //  this.endTimeTwo = new Date(this.dataTime[1]).setHours(23, 59, 59, 59) ;
//      console.log('startTimeOne', this.startTimeOne);
      let params = {
        businessType: this.$route.query.type || '',
        endTime: this.endTimeTwo,
        id: this.$route.query.id || '',
        indexCode: this.$route.query.indexCode || '',
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize,
        startTime: this.startTimeOne
      }
//      console.log('aaa', params);
      dataManagerHistoryPageList(params).then(res=>{
        // debugger;
        // console.log('99',res.pageInfo.list);
        this.tabledata = res.pageInfo.list;
        this.total = res.pageInfo.total;
        // this.tabledata = res.pageInfo.list.map(item => {
        //   item['isEdit'] = false;
        //   return item;
        // })
        console.log(this.tabledata);
      })
    },
    pageChange(page,size){
		  if (page) {
        this.params.pageNum = page;
      }
      if (size) {
        this.params.pageSize = size;
      }
			this.tableList();
    },
    dataManagerDelete(data){
      console.log('删除',data);
      let array = [];
      let array_one = [];
      let params = {};
      if(this.$route.query.type == 1){
        params = {};
        params = {
          tableId:data.row.indexTableId,
          tableName:data.row.indexTableName
        }
        array = [];
        array.push(params);
      }
      if(this.$route.query.type == 2){
        params = {};
        params = {
          tableId:data.row.indexTableId,
          tableName:data.row.indexTableName
        }
        array = [];
        array.push(params);
      }
      if(this.$route.query.type == 3){
        array = [];
        array_one = [];
        array_one = [
          {
            tableId:data.row.indexTableId,
            tableName:data.row.indexTableName
          },
          {
            tableId:data.row.lpriceId,
            tableName:data.row.lpriceTableName
          },
          {
            tableId:data.row.gpriceId,
            tableName:data.row.gpriceTableName
          }
        ]
        for(var i = 0 ;i<array_one.length;i++){
          array.push(array_one[i]);
        }
      }
      if(this.$route.query.type == 4){
        array = [];
        array_one = [];
        array_one = [
          {
            tableId:data.row.indexTableId,
            tableName:data.row.indexTableName
          },
          {
            tableId:data.row.lpriceId,
            tableName:data.row.lpriceTableName
          },
          {
            tableId:data.row.gpriceId,
            tableName:data.row.gpriceTableName
          },
          {
            tableId:data.row.rpriceId,
            tableName:data.row.rpriceTableName
          }
        ]
        for(var i = 0 ;i<array_one.length;i++){
          array.push(array_one[i]);
        }
      }
      if(this.$route.query.type == 5){
        array = [];
        array_one = [];
        array_one = [
          {
            tableId:data.row.indexTableId,
            tableName:data.row.indexTableName
          },
          {
            tableId:data.row.oilpriceId,
            tableName:data.row.oilpriceTableName
          },
          {
            tableId:data.row.petrifiedpriceId,
            tableName:data.row.petrifiedpriceTableName
          }
        ]
        for(var i = 0 ;i<array_one.length;i++){
          array.push(array_one[i]);
        }
      }
      if(this.$route.query.type == 6){
        array = [];
        array_one = []
        array_one = [
          {
            tableId:data.row.rindexValueId,
            tableName:data.row.rindexValueTableName
          },
          {
            tableId:data.row.tindexValueId,
            tableName:data.row.tindexValueTableName
          }
        ]
        for(var i = 0 ;i<array_one.length;i++){
          array.push(array_one[i]);
        }
      }
      if(this.$route.query.type == 7){
        array = [];
        array_one = [];
        array_one = [{
          tableId:data.row.indexTableId,
          tableName:data.row.indexTableName
        }]
        for(var i = 0 ;i<array_one.length;i++){
          array.push(array_one[i]);
        }
      }
      console.log('array',array);
      let that = this;
      this.$Modal.confirm({
        title: "信息",
        content: "是否确认要删除?",
        onOk: () => {
          dataManagerDeleteHistoryData(array).then(res => {
            that.$Message.success('删除成功');
            this.selectionDataVal =0;
            that.tableList();
          })
        },
        onCancel: () => {
          this.$Message.info("取消操作");
        }
      });
    }
  }

}
</script>


