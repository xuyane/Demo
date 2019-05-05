<style lang="less">
.add-instance{
  .breadcrumb{
      font-size:14px;color:#605f5f;margin-bottom:20px;
  }
  .form_wrap{
    .form_item{
      .item_control{
        width: 380px;
      }
    }

    table{
      width: 100%;
      margin: 0 auto;
      text-align: center;
      font-size: 14px;
      border-collapse:collapse;
      tr{
        height:50px;
        line-height: 50px;
        th{
          width: 100px;
          &.variable_key{
            width: 200px;
          }
          &.variable_val{
            width: 400px;
          }
        }
        td{
          border:1px solid #ddd;
          .table_control{
            width: 90%;
            /*margin: 0 auto;*/
          }
          .checkbox{
            width: 23px;
            height:23px;
          }
        }
      }

      thead tr{
        background-color: #eee;
      }
    }
  }
}
</style>

<template>
    <div class="add-instance">
      <Row class-name='breadcrumb'>
       <Col span="24">
        当前位置：工作流&nbsp;&nbsp;>>&nbsp;&nbsp;流程实例&nbsp;&nbsp;>>&nbsp;&nbsp;启动流程实例
       </Col>
      </Row>
      <Card dis-hover>
        <h2 slot="title">启动流程实例</h2>
        <div class="form_wrap">
          <Form ref="deploy_form" inline :label-width="80">
            <Row>
              <i-col span="8">
                <FormItem label="流程KEY:" class="form_item">
                  <Input class='item_control' v-model="processDefKey"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="业务ID:" class="form_item">
                  <Input class='item_control' v-model="businessId"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="业务KEY:" class="form_item">
                  <Input class='item_control' v-model="businessKey"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="短信内容:" class="form_item">
                  <Input class='item_control' v-model="sms"></Input>
                </FormItem>
              </i-col>
              <i-col span="8">
                <FormItem label="通知标题:" class="form_item">
                  <Input class='item_control' v-model="notice"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="12">
                <FormItem label="提交人备注:" class="form_item" :label-width="90">
                  <Input class='item_control' type="textarea" v-model="remark"></Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="16">
                <table>
                  <thead>
                  <tr>
                    <th class="variable_key">变量KEY</th>
                    <th class="variable_val">变量值</th>
                    <th>协作</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(vars,varsIndex) in varform" :key="varsIndex">
                    <td>
                      <Input class="table_control" placeholder="流程变量key 例如: user1" v-model="vars.varKey"/>
                    </td>
                    <td>
                      <Input class="table_control" placeholder="流程变量值或（办理人ID多个ID用,间隔并勾选协作）" v-model="vars.varValue"/>
                    </td>
                    <td>
                      <Checkbox class="checkbox" v-model="vars.varType"></Checkbox>
                    </td>
                    <td>
                      <ButtonGroup>
                        <Button type="primary" icon="ios-add" size="small" @click="addvar"></Button>
                        <Button type="error" icon="ios-remove" size="small" @click="prune(varsIndex)"></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </i-col>
            </Row>
            <Row type="flex" justify="end" >
              <i-col span="4">
                <FormItem>
                  <ButtonGroup>
                    <Button type="primary" @click="addButton">启动流程</Button>
                    <Button @click="reset">重置</Button>
                  </ButtonGroup>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </div>
      </Card>
    </div>
</template>

<script>
import axios from "axios";
import { addInstance } from '../../components/axios/workflow.js'
import {  formData } from "../../../assets/js/common.js";
export default {
  name: "addInstance",
  data() {
    return {
      processDefKey:'',//流程key
      businessId:'',//业务id
      businessKey:'',//业务key
      sms:'',//短信内容
      notice:'',//通知标题
      remark:'',//提交人备注
      varKey:[], //变量key
      varValue:[], //变量值
      varType:[], //变量类型
      varform:[
        {
          varKey:'',//变量key
          varValue:'',//变量值
          varType:false//变量类型
        }
      ]  
    }
  },
  methods: {
    addButton() {
      let that = this
      that.varKey = [];
      that.varValue = [];
      that.varType = [];
      for(var i=0;i<that.varform.length;i++){
        that.varKey.push(that.varform[i].varKey)
        that.varValue.push(that.varform[i].varValue)
        that.varType.push(that.varform[i].varType)
      } 
      let datas = { id:'admin1',processDefKey:that.processDefKey,businessId:that.businessId,businessKey:that.businessKey,sms:that.sms,notice:that.notice,remark:that.remark,varKey:that.varKey,varValue:that.varValue,varType:that.varType}
      addInstance(formData(datas))
      .then((res)=>{
        console.log(res)
        if(res.status=='200'){
          this.$router.push({path:'/instanceDetail',query:{id:res.instanceId}})
        }
      })
      .catch((error)=>{
        console.log('启动失败了')
      })
    },
    addvar(){ //增加一条变量
      this.varform.push({
          varKey:'',
          varValue:'',
          varType:false
      })
    },
    prune(index){ //删除本条变量
      this.varform.splice(index,index)
    },
    reset(){ //重置
      this.processDefKey = '',
      this.businessId = '',
      this.businessKey = '',
      this.sms = '',
      this.notice = '',
      this.remark = '',
      this.varform = [
          {
            varKey:'',
            varValue:'',
            varType:false
          }
        ]  
    }
  }
};
</script>



