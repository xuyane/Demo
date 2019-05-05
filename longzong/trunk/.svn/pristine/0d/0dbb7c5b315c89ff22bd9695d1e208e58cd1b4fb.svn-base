<style>

</style>
<template>
  <Row>
    <Col span="24">
        <Row class-name="current-position">
          当前位置：数据管理&nbsp;&nbsp;>>&nbsp;&nbsp;补缺						
        </Row>
		</Col>
    <Col span="24" class="search-form">
      <Form :label-width="100">
        <Row>
          <Col span="6">
            <FormItem label="日期：">
              <DatePicker type="daterange"  placeholder="请输入日期" :clearable='clearableValue' style="width: 300px" v-model="dataTime" @on-change="changeData"></DatePicker>
            </FormItem>    
          </Col>
          <Col span="6" style="margin-bottom:20px;">
            <FormItem label="排除时间:" :label-width="100">
                <Checkbox v-model="isWeekT">周末</Checkbox>
                <Checkbox v-model="isHolidayT">节假日</Checkbox>
            </FormItem>
          </Col>
           <Col span="6" class="text-left" style="margin-bottom:20px;">
            <Button type="primary" @click="search()" style="margin-right:20px;">查询</Button>
            <Button @click="reset()">重置</Button>
          </Col>
          <Col span="6" class="text-right" style="margin-bottom:20px;">
            <span>共{{total}}条记录&nbsp;&nbsp;&nbsp;</span>
            <!-- <Button type="error" @click="deleteData">一键删除</Button> -->
          </Col>
        </Row>           
      </Form>      
    </Col>
    <Col span="24" class="table-con">
      <Table :columns="columns" :data="tabledata" 
        @on-selection-change = "selectionChange"></Table>
    </Col>
  </Row>
</template>
<script>
import {dclossdatapriceGetlossdatalist,dclossdatapriceAddlostdata,} from "../../components/axios/dataCenter.js";
import  ColumsJs  from "./columsfilljs.js";
import { formData,formatStamp,formatTime,formatTime2} from "../../../assets/js/common.js";
export default {
  data(){
    return {
      clearableValue:false,
      startTimeOne:'',
      endTimeTwo:'',
      selectionData:[],
      selectionDataVal:0,
      dataTime:[],
      tabledata:[],
      total: 10, 
      showSizer: true,
      pageSizeOpts: [10,15,20,40,50,100,200],
      params:{
        pageNum:1,
				pageSize:10,
      },
      isWeekT:false,
      isHolidayT:false,
       form:{
            isWeek:0,
            isHoliday:0
        }                               
    }
  },
  created(){
    this.tableListOne()
    this.tableList();
  },
  computed:{
    columns() {
      let type = this.$route.query.indexType || '';
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
										this.save(data);
									}
								}
							},
							"保存"
            )
            
					]);
				}
      }
      let array = [ ...ColumsJs[type], operation];


      return array
    }
  },
  methods:{
    search(){
      this.tableList();

    },
    reset(){
      this.dataTime = [formatTime2(this.$route.query.startTime),formatTime2(this.$route.query.endTime)];
      this.isWeekT = false,
      this.isHolidayT = false
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
    save(data){
      console.log(data);
      console.log('保存',data);
      let array = [];
      let array_one = [];
      let params = {};
      if(this.$route.query.indexType == 1){
        if(data.row.priceValue || data.row.remark){
          params = {
          id:data.row.id,
          remark:data.row.remark,
          priceValue:data.row.priceValue,
          publishTime:data.row.publishTime,
          indexType:data.row.indexType,
          
          }
          dclossdatapriceAddlostdata(params).then(res=>{
          this.$Message.success('保存成功');
          this.tableList();
          })
        }else{
           this.$Message.error('输入不能为空');
        }
        
       
      }
      if(this.$route.query.indexType == 2){
        if(data.row.priceValue || data.row.remark){
          params = {
          id:data.row.id,
          remark:data.row.remark,
          priceValue:data.row.priceValue,
          publishTime:data.row.publishTime,
          indexType:data.row.indexType,
        
          }
          dclossdatapriceAddlostdata(params).then(res=>{
          this.$Message.success('保存成功');
          this.tableList();
          })

        }else{
          this.$Message.error('输入不能为空');
        }
      }
      if(this.$route.query.indexType == 3){
        if(data.row.middlePrice||data.row.lowEndPrice||data.row.higPrice || data.row.remark){
            params = {
            id:data.row.id,
            remark:data.row.remark,
            middlePrice:data.row.middlePrice,
            lowEndPrice:data.row.lowEndPrice,
            higPrice:data.row.higPrice,
            publishTime:data.row.publishTime,
            indexType:data.row.indexType,
          
          }
          dclossdatapriceAddlostdata(params).then(res=>{
          this.$Message.success('保存成功');
          this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }
       
      }
      if(this.$route.query.indexType == 4){
        if(data.row.middlePrice||data.row.lowEndPrice||data.row.higPrice||data.row.rmbPrice || data.row.remark){
          params = {
          id:data.row.id,
          remark:data.row.remark,
          middlePrice:data.row.middlePrice,
          lowEndPrice:data.row.lowEndPrice,
          higPrice:data.row.higPrice,
          publishTime:data.row.publishTime,
          indexType:data.row.indexType,
          rmbPrice:data.row.rmbPrice,
        
          }
          dclossdatapriceAddlostdata(params).then(res=>{
          this.$Message.success('保存成功');
          this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }
        
      }
      if(this.$route.query.indexType == 5){
        if(data.row.oilPrice||data.row.petrifiedPrice || data.row.remark){
          params = {
          id:data.row.id,
          remark:data.row.remark,
          oilPrice:data.row.oilPrice,
          petrifiedPrice:data.row.petrifiedPrice,
          publishTime:data.row.publishTime,
          indexType:data.row.indexType,
          
           }
          dclossdatapriceAddlostdata(params).then(res=>{
          this.$Message.success('保存成功');
          this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }

      }
      if(this.$route.query.indexType == 6){
        if(data.row.risePrice||data.row.tonPrice || data.row.remark){
          params = {
          id:data.row.id,
          remark:data.row.remark,
          risePrice:data.row.risePrice,
          tonPrice:data.row.tonPrice,
          publishTime:data.row.publishTime,
          indexType:data.row.indexType,
        
          }
          dclossdatapriceAddlostdata(params).then(res=>{
          this.$Message.success('保存成功');
          this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }
       

      }
      if(this.$route.query.indexType == 7){
        if(data.row.priceValue || data.row.remark){
           params = {
          id:data.row.id,
          remark:data.row.remark,
          priceValue:data.row.priceValue,
          publishTime:data.row.publishTime,
          indexType:data.row.indexType,
        
          }
          dclossdatapriceAddlostdata(params).then(res=>{
          this.$Message.success('保存成功');
          this.tableList();
          })
        }else{
          this.$Message.error('输入不能为空');
        }
        
      }
      
    },
    changeData(data){
      this.startTimeOne = formatTime(new Date(data[0]).setHours(0, 0, 0, 0));
      this.endTimeTwo =formatTime(new Date(data[1]).setHours(23, 59, 59, 59));
    },
    tableListOne(){
      this.dataTime = [formatTime2(this.$route.query.startTime),formatTime2(this.$route.query.endTime)]
      // this.startTimeOne = formatTime(new Date(this.dataTime[0]).setHours(0, 0, 0, 0));
      // this.endTimeTwo = formatTime(new Date(this.dataTime[1]).setHours(23, 59, 59, 59));
      this.startTimeOne = formatTime(Number(this.$route.query.startTime));
      this.endTimeTwo = formatTime(Number(this.$route.query.endTime));
    },
    tableList(){
      if(this.isWeekT){
        this.form.isWeek = 1;
      }else{
          this.form.isWeek = 0;
      }
      if(this.isHolidayT){
        this.form.isHoliday = 1;
      }else{
          this.form.isHoliday = 0;
      }
      
      let params = {
        indexType: parseInt(this.$route.query.indexType),
        endTime: this.endTimeTwo,
        id: this.$route.query.id || '',
        startTime: this.startTimeOne,
        isWeek:this.form.isWeek,
        isHoliday:this.form.isHoliday
      }
      dclossdatapriceGetlossdatalist(params).then(res=>{
        //this.tabledata = res.response;
        this.tabledata = res.response.map(item => {
          return {...item, isEdit: false};
        });
        this.total = res.response.length;
        console.log(this.tabledata);
      })
    }
    
  }

}
</script>


