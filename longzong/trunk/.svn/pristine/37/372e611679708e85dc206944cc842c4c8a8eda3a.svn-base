<template>
  <div class="process_detail">
    <span class="bread-crumb">当前位置：工作流管理&nbsp;&nbsp;>>&nbsp;&nbsp;统计查询&nbsp;&nbsp;>>&nbsp;&nbsp;待办任务</span>

    <Card dis-hover class="f_card">
      <span slot="title">流程图</span>
      <div class="content">
        <div class="process_img" v-show="imgInfo.processId">
          <img :src="img_path" />
          <div class="current_process" ref="current_process"></div>
        </div>

        <div class="tip" style="margin: 30px 0;">
          <div>
            <strong>温馨提示：</strong>
            <span>用于设置决定流程走向的变量值：流程中没有不需要填写！如果只有一个key为msg可以只填单个值即可！</span>
          </div>
          <div>
            <Input placeholder="多个key格式为：msg1=v1&msg2=v2&msg3=v3" />
          </div>
        </div>

        <Steps :current="currentStep">
          <Step v-for="item in testStep" :key="item.role" :title="item.role" :content="item.admin" ></Step>
        </Steps>

        <Table :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" ></Table>

        <div class="ivu-modal-footer">
          <div>
            <Button type="primary" style="margin-top: 30px;" class="search-btn" @click="openPass" >通过</Button>
            <Button type="error" class="search-btn" style="margin-top: 30px;" @click="openRejet" >驳回</Button>
            <Button style="margin-left: 8px;margin-top: 30px;" onclick="javascript:history.go(-1);" >返回</Button>
          </div>
        </div>
      </div>
    </Card>
          <Modal v-model="showPass"  title="通过意见" @on-ok="doProcess(true)"  @on-cancel="closeShowModel" width="570">
            <Form ref="addForm" :model="addForm" :label-width="120">
              <FormItem>
                <Input v-model="addForm.opinion" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="通过"></Input>
              </FormItem>
            </Form>
          </Modal>

          <Modal v-model="showRejet"  title="驳回意见" @on-ok="doProcess(false)"  @on-cancel="closeShowModel" width="570">
            <Form ref="addForm" :model="addForm" :label-width="120">
              <FormItem>
                <Input v-model="addForm.opinion" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="驳回"></Input>
              </FormItem>
            </Form>
          </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import { statusZero } from '../../components/axios/workflow.js'
export default {
    data () {
        return{
          imgInfo: {
            processId: '',
            coordinate: {}
          },
          auditProcess: {},
          tableData: [],

          testStep: [],

          currentStep: 0,


            showPass : false,
            showRejet : false,
//            completeUrl : '', //跳转路径
//            redirectUrl : '',
            coordinate : '', // 当前审批节点对象
            tableData: [],
            showSizer: true,
            dataCount: 0,
            pageSize: 2,
            pageNum: 1,
            pageSizeOpt: [2, 5, 10, 20],
            imageSrc: '',  // 图片地址
            value1 : '',
            value2 : '',
            value3 : '',
            value4 : '',
            value5 : '',
            processObj: '',
            taskObj : '',
            html : '',
          columns: [
            {
              key: "auditor",
              align: "center",
              title: "审批人",
            },
            {
              // key: "pass",
              align: "center",
              title: "状态",
              render: (h, data) => {
                return h('div', data.row.pass == true ? '通过' : '驳回')
              }
            },
            {
              key: "auditTime",
              align: "center",
              title: "审批时间",
              render: (h, data) => {

                var date = new Date();
                date.setTime(data.row.auditTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;

                var hour = date.getHours();
                hour = hour < 10 ? ('0' + hour) : hour;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;

                return  h('div', y + '-' + m + '-' + d +'  '+hour+':'+minute+':'+second );
              }
            },
            {
              key: "content",
              align: "center",
              title: "意见",
            }
          ],

          addForm:{
            taskId: '',
            businessId: '',
            opinion :'',
            pass:''
          }
        }
    },

      created() {
        this.getDetail();
      },

  computed: {
      id() {
        return this.$route.query.id;
      },
    instanceId() {
      return this.$route.query.instanceId;
    },
    businessId() {
      return this.$route.query.businessId;
    },
    img_path() {
        return '/mysteel/workflow/process/image?id=' + this.imgInfo.processId;
    }
  },

    methods:{
      reset() {

      },

        openPass() {
            this.showPass = true;
        },
        openRejet() {
            this.showRejet = true;
        },
        closeShowModel() {
            this.showPass = false;
            this.showRejet = false;
        },

        //  审批 通过|驳回
        doProcess(pass) {
            this.addForm.pass = pass;
            if(this.addForm.opinion == null || this.addForm.opinion == ''){
                if(pass){
                    this.addForm.opinion = '通过';
                }else{
                    this.addForm.opinion = '驳回';
                }
            }

            axios({
                url:'/mysteel/workflow/task/complete',
                method: 'post',
                params:this.addForm
            }).then(resp => {
                statusZero(resp.data.status)
                this.$Message.success('操作成功');
                // 刷新页面
                this.$router.push({path: '/processing'})

            }).catch(err => {
                console.log(err);
            })
            this.showPass = false;
            this.showRejet = false;
        },

     getDetail() {
         this.$Spin.show();
         axios.get('/mysteel/workflow/task/detail', {
           params: {
             id: this.id,
             instanceId : this.instanceId,
             businessId : this.businessId
           }
         }).then(resp => {
           statusZero(resp.data.status)
           const data = resp.data;
//           console.log(data);
           this.tableData = data.auditMsg;
           this.auditProcess = JSON.parse(data.auditProcess);
           this.imgInfo.processId = data.processId;
           this.imgInfo.coordinate = data.coordinate;

           this.$refs['current_process'].style.cssText =
             `width: ${this.imgInfo.coordinate.width}px;
              height: ${this.imgInfo.coordinate.height}px;
              top: ${this.imgInfo.coordinate.y}px;
              left: ${this.imgInfo.coordinate.x}px;`;

           this._makeSteps();

            // 通过驳回操作
//           this.addForm.taskId = resp.data.taskId;
//           this.addForm.businessId = resp.data.businessId;
//           this.completeUrl = resp.data.completeUrl;
//           this.redirectUrl = resp.data.redirectUrl;
           this.$Spin.hide();
            }).catch(err => {
                console.log(err);
                this.$Spin.hide();
            })
      },

      /*getImage(id) {

        var that = this;
        that.$Spin.show();
        let imgUrl = '/mysteel/workflow/process/image?id='+id;
        that.$refs.myImg.src = imgUrl;
        let top = 0;
        let left = 0;
        let width = 0;
        let height = 0;
        var imgHeight = that.$refs.myImg.height;
        if(that.coordinate){
            if(imgHeight == null || imgHeight =='undifined' || imgHeight == ''){
                imgHeight = 0;
            }
            top = that.coordinate.y - imgHeight;
            left = that.coordinate.x;
            width = that.coordinate.width;
            height = that.coordinate.height;
        }
            that.$refs.myTask.style='top : '+ top +'px ; left: '+left +'px; width: '+ width +'px; height: '+ height +'px; position: relative;border: 2px solid blue;';
            that.$Spin.hide();
        },*/

      _makeSteps() {
        const msg = this.auditProcess.taskMap;
        this.testStep[0] = msg.start;
        for(let a = 0; a <= this.testStep.length - 1; a++) {
          const attr = this.testStep[a].nexts[0].id;
          if (attr && msg[attr]) {
            this.testStep.push(msg[attr]);
          }
        }
        const currentIndex = this.testStep.findIndex(item => !item.audited);
        this.currentStep = currentIndex === -1 ? this.testStep.length : currentIndex;
      },

/*        getProcess(data) {
        //  var that = this;
         this.$Spin.show();
         var process = data;
         var processObj;
         var _length = 0;
            if (process) {
                processObj= JSON.parse(process);
                this.processObj = processObj;

                if (processObj) {
                    var taskObj = processObj.taskMap;
                    this.taskObj = taskObj;
                    var task = taskObj.start;
                    this.getTask(task, 0, 1);
                }
            } else {
                $('#wf_div').hide();
                console.warn('未获取到流程进度条信息...By LiJingTang');
                this.$Spin.hide();
            }

            	if (_length > 8) { /!* 节点大于8个出现滚动条 *!/
                    this.$refs.curprogressRef.width(128.4 * _length).parent().css('overflow-x', 'auto').css('padding-bottom', '50px');
                }

                this.$Spin.hide();
        },*/

       /* getTask(task, type, index){
                var _length = 0;
                //var html = '';
                if (task) {
                    if (task.nexts && task.nexts.length > 1) { /!* 有分支 *!/
                        type = 1;
                    }

                    _length = Math.max(_length, index);
                    this.html += this.htmlBar(task, type, index, this.processObj.createTime);

                    if (!task.nexts) { /!* 流程结束 *!/
                        return;
                    }

                    if (task.nexts.length > 1) { /!* 有分支 *!/
                        var firstObj = task.nexts[0];
                        var firstTask = this.taskObj[firstObj.id];
                        this.html += '<div class="col-md-2 col-xs-6 y-step-parent" style="width: 15%; left: -10%;">';

                        for (var i = 1; i < task.nexts.length; i++) {
                            var obj = task.nexts[i];
                            var tk = this.taskObj[obj.id];
                            this.html += this.htmlBranch((i > 1 ? 2 : 1), tk.audited, obj.name, firstObj.name);
                            this.getTask(tk, 0, index + 1);
                            this.html += '</div></div>';
                        }

                        this.html += '</div>';
                        this.getTask(firstTask, 2, index + 1); /!* 分支第一行 *!/
                    } else { /!* 单个流程 *!/
                        var obj = task.nexts[0];
                        this.getTask(this.taskObj[obj.id], type, index + 1);
                    }
            }
        },*/

      /*  htmlBranch(i, audited, cond, firstCond){
            return '<div class=" step' + i + ' hg">' +
                    '<div class="y-step-ver ' + (audited ? 'bg-success' : '') + '"></div>' +
                        '<span class="cond fCond">' + firstCond + '</span>' +
                        '<div class="y-step-ver1">' +
                            '<div class="col-md-2 col-xs-6 y-step-parent" style="width: 16%">' +
                                '<div class="well y-step ' + (audited ? 'bg-success' : '') + ' "></div>' +
                                '<span class="cond sCond">' + cond + '</span>' +
                            '</div>';
        },
        htmlBar(task, type, index, createTime){
            var style1 = '';
            var style2 = '';

            switch (type) {
                case 0: style1 = ' style="width: 12%;"'; break; /!* 正常 *!/
                case 1: style2 = ' style="width: 108%;"'; break; /!* 有分支 *!/
                case 2: style1 = ' style="width: 12%; left: -12.5%;"'; break; /!* 分支的第一行节点 *!/
            }

            var succ = task.audited ? 'success' : '';
            var bg_succ = task.audited ? 'bg-success' : '';
            var last_bg_succ = task.audited && task.nexts ? 'bg-success' : '';
            var createTime = (1 == index) && createTime ? ('<br />' + createTime) : '';
            var cond = (task.nexts && task.nexts.length == 1) ? ('<span class="cond pCond ' + succ + '">' + task.nexts[0].name + '</span>') : '';
            if (task.admin.length < 3) {
                task.admin = '&nbsp;&nbsp;&nbsp;' + task.admin;
            }

            return  '<div class="col-md-2 col-xs-6 y-step-parent"' + style1 + '>' + cond +
                        '<div class="well y-step '+ last_bg_succ + '"' + style2 + '>' +
                            '<div class="step-name '+ succ + '">' + task.role + '</div>' +
                            '<div class="step-info '+ succ + '">' + task.admin + createTime + '</div>' +
                            '<div class="circle ' + bg_succ + '">' + index + '</div>' +
                        '</div>' +
                    '</div>';
        },
*/


    }

}
</script>

