<style lang="less">
  @import "../../../assets/css/main.less";
  @import "../../../assets/css/common.less";
  .phone-center-modal{
    .up{
      .extras{
        width: 220px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn{
          font-size: 14px;
        }
      }

      .table_wrap{
        width: 620px;
        margin: 0 auto;
      }

      .form{
        width: 480px;
        margin: 55px auto;
        .form-item{
          width: 400px;
          text-align: center;
          .input{
            width: 290px;
          }

        }
      }
    }
    .divider{
      font-size: 18px;
      font-weight: bold;
      &:before, &:after{
        border-top-color: #999;
      }
    }
    .down{
      .msg_wrap{
        width: 580px;
        margin: 0 auto;
        .msg_item{
          display: flex;
          align-items: center;
          padding-bottom: 10px;
          margin-bottom: 13px;
          border-bottom: 1px solid #e8eaec;
          .info{
            margin-left: 8px;
            font-size: 14px;
            span{
              display: block;
              b{
                color: #2d8cf0;
              }
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="phone-center-modal">
   <div class="up">
     <Tabs @on-click="onTabClick">
       <TabPane label="呼叫">
         <Form class="form" inline>
           <FormItem label="请输入外呼电话" class="form-item">
             <Input clearable class="input" v-model.number="phoneNumber" />
           </FormItem>
           <FormItem>
             <Button type="primary" @click="onDial(phoneNumber)">确定</Button>
             <!--<Button style="margin-left: 80px" size="large">取消</Button>-->
           </FormItem>
         </Form>
       </TabPane>
       <TabPane label="拨入记录" name="1">
         <div class="table_wrap">
           <Table :columns="columns" :data="callInRecord"></Table>
         </div>
       </TabPane>
       <TabPane label="拨出记录" name="2">
         <div class="table_wrap">
           <Table :columns="columns" :data="callOutRecord"></Table>
         </div>
       </TabPane>

       <div class="extras" slot="extra">
         <!--:disabled="!calling"-->
         <Button type="error" icon="ios-call" ghost class="btn" @click="hangUp">挂断</Button>
         <i-switch size="large" :value="has_connected" @on-change="onSwitchChange">
           <span slot="open">ON</span>
           <span slot="close">OFF</span>
         </i-switch>
         <span>{{connectedStatusText}}</span>
       </div>
     </Tabs>
   </div>
    <Divider class="divider">消息中心</Divider>

    <div class="down" v-if="phoneMsgRecord.length">
      <div class="msg_wrap">
        <div class="msg_item" v-for="item in phoneMsgRecord" :key="item.time">
          <!--<Avatar size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />-->
          <div class="info">
            <span>当前用户：<b>{{item.callTypeDesc}}</b> {{item.otherCode}}</span>
            <span class="time">{{item.time}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'phoneCenterModal',
    props: {
      // 是否已连接
      has_connected: {
        type: Boolean,
        default: false
      },

      // 是否正在打电话
      calling: {
        type: Boolean,
        default: false
      },

      // 呼入记录
      callInRecord: {
        type: Array,
        required: true
      },
      // 呼出记录
      callOutRecord: {
        type: Array,
        required: true
      },

      // 消息记录
      phoneMsgRecord: {
        type: Array,
        default: []
      }
    },
    data(){
      return{
        phoneNumber: '',
        // 当前激活的tab名称
        currentTabName: 1,
        columns: [
          {
            title: '时间',
            key: 'createTimeDesc'
          },
          {
            title: '事项',
            key: 'callTypeDesc'
          },
          {
            title: '时长',
            key: 'connectTimeLenDesc'
          },
          {
            title: '拨入号码',
            key: 'otherCode',
            render: (h, params) => {
              return  h('span', {
                style: {
                  color: '#2d8cf0',
                  cursor: 'pointer',
                  'text-decoration': 'underline'
                },
                on: {
                  click: () => {
                    this.onDial(params.row.otherCode);
                  }
                }
              }, params.row.otherCode);
            }
          }
        ]
      }
    },

    computed: {
      connectedStatusText() {
        return this.has_connected ? '已连接服务' : '已断开服务';
      }
    },


    methods: {
      // 外呼
      onDial(phoneNumber){
        /*if (phoneNumber.length > 4 && phoneNumber.charAt(0) !== '0'){
          phoneNumber = '0' + phoneNumber;
        }*/
        if(phoneNumber) {
          this.$emit('on-dial', phoneNumber);
        }else {
          this.$Message.error({
            content: '请输入电话号码',
            duration: 3
          })
        }
      },

      // 切换连接状态
      onSwitchChange(status){
        this.$emit('change-connect', status);
      },

      // 挂断
      hangUp() {
        this.$emit('on-hang-up');
      },

      onTabClick(name) {
        if (Number(name) === this.currentTabName) return;
        this.currentTabName = Number(name);
        this.columns.find(item => item.key === 'otherCode').title = this.currentTabName === 1 ? '拨入号码' : '拨出号码';
      }
    }
  }
</script>
