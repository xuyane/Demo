<template>
  <div class="formStyle editCss">
    <Row>
      <Col span="24">
        <Row class-name="current-position">
          当前位置：
          <router-link to="/plantIndex" class="link-css">信息发布管理</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <router-link to="/myInformationUnit" class="link-css">我的信息单元</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
          <a @click="goto" class="link-css">信息发布</a>
        </Row>
      </Col>
      <Col span="24" class-name="search-form">
        <Row>
          <div class="changePages">
            <span class="btnformstyle tab-active">表单方式</span>
            <span class="btneditstyle" @click="tabChange">文本编辑方式</span>
          </div>

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

          <div class="unit" v-if="tables.length > 0">
            <div class="unit_title">
              <span>信息单元</span>
            </div>
            <Button style="margin-top: 10px" class="btn" @click="copyLastDayInfo">复制上一个工作日信息</Button>
            <Button
              style="margin-top: 10px;margin-left:10px;"
              class="btn"
              type="primary"
              @click="publishMore"
            >一键发布</Button>
            <div
              style="margin-top: 10px;overflow:auto;"
              class="table-content"
              v-for="(titem,tindex) in tables"
              :key="tindex"
            >
              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                <thead>
                  <tr v-for="rindex in titem.thRows" :key="rindex">
                    <td width="30" :rowspan="titem.thRows" v-if="rindex == 1">
                      <!-- <Checkbox :checked.sync="checkAll" @on-change="handleCheckAll(tindex)"></Checkbox> -->
                      <input
                        class="checkbox"
                        type="checkbox"
                        :checked="checkAll[tindex]"
                        @change="handleCheckAll(tindex)"
                      >
                    </td>
                    <td
                      width="120"
                      v-for="(item,index) in titem.tableData[rindex-1]"
                      :key="index"
                      :class="item.class"
                      :rowspan="item.rowspan"
                      :colspan="item.colspan"
                    >
                      <div style="min-width:120px;">{{item.val}}</div>
                    </td>
                    <td width="100" :rowspan="titem.thRows" v-if="rindex == 1">
                      <div style="min-width:100px;">状态</div>
                    </td>
                    <td width="120" :rowspan="titem.thRows" v-if="rindex == 1">
                      <div style="min-width:100px;">操作</div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item,index) in titem.tableData"
                    :key="index"
                    v-if="index>=titem.thRows"
                  >
                    <td width="30">
                      <!-- <Checkbox :checked.sync="item[0].isChecked" @on-change="handleCheckSingle(tindex,index)"></Checkbox> -->
                      <input
                        :disabled="item[0].isDisabled"
                        class="checkbox"
                        type="checkbox"
                        :checked="item[0].isChecked"
                        @change="handleCheckSingle(tindex,index)"
                      >
                    </td>
                    <td
                      v-for="(item1,index1) in item"
                      :key="'item4' + index1"
                      :rowspan="item1.rowspan"
                      :colspan="item1.colspan"
                      :class="item1.class"
                      :id="item1.id"
                    >
                      <template v-if="item1.class == 'type3'">
                        <Input v-if="item1.isDisabled" disabled v-model="item1.val"/>
                        <Input
                          v-else
                          v-model="item1.val"
                          @on-blur="changeInputData(tindex,index,index1,item1.val,item1.id,titem.thRows)"
                        />
                      </template>
                      <template v-else-if="item1.class == 'type1'">
                        <template v-if="tabelType[tindex] == '4'">
                          <Input
                            class="infor-table-input"
                            v-if="item1.isDisabled"
                            disabled
                            value="-"
                          />
                          <Input
                            class="infor-table-input"
                            v-else
                            v-model="item1.section.val1"
                            :maxlength="16"
                            @on-blur="changeTimeData(tindex,index,index1,item1.section.val1,item1.section.id1,1)"
                          />
                          <span class="infor-table-line">-</span>
                          <Input
                            class="infor-table-input"
                            v-if="item1.isDisabled"
                            disabled
                            value="-"
                          />
                          <Input
                            class="infor-table-input"
                            v-else
                            v-model="item1.section.val2"
                            :maxlength="16"
                            @on-blur="changeTimeData(tindex,index,index1,item1.section.val2,item1.section.id2,2)"
                          />
                        </template>
                        <!-- <template v-else-if="tabelType[tindex] == '5'">
                              <Input v-if="item1.isDisabled" disabled/>
                              <Input v-else v-model="item1.val" :maxlength="16"/>
                        </template>-->
                        <template v-else>
                          <Input v-if="item1.isDisabled" disabled value="-"/>
                          <Input
                            v-else
                            v-model="item1.val"
                            :maxlength="16"
                            @on-blur="changeTimeData(tindex,index,index1,item1.val,item1.id)"
                          />
                        </template>
                      </template>
                      <template v-else-if="item1.class == 'type2' && tabelType[tindex] == '5'">
                        <!-- <span>{{ruleCount(item1.rule,item1.ruleBase,item1.id,tindex,index)}}</span> -->
                        <template v-if="item1.isHB">
                          <span
                            v-if="item1.val > 0"
                            style="color:red;"
                          >{{(item1.val*100).toFixed(2) + '%'}}</span>
                          <span
                            v-else-if="item1.val < 0"
                            style="color:green;"
                          >{{(item1.val*100).toFixed(2) + '%'}}</span>
                          <span v-else>{{item1.val}}</span>
                        </template>
                        <template v-else>
                          <span v-if="item1.val > 0" style="color:red;">{{item1.val}}</span>
                          <span v-else-if="item1.val < 0" style="color:green;">{{item1.val}}</span>
                          <span v-else>{{item1.val}}</span>
                        </template>
                      </template>
                      <template
                        v-else-if="item1.class == 'type2' && !(RegExp(/[合计,总计]/).test(item[0].val))"
                      >
                        <template v-if="tabelType[tindex] == '3'">
                          <span
                            v-if="item1.val > 0"
                            style="color:red;"
                          >{{(item1.val*100).toFixed(2) + '%'}}</span>
                          <span
                            v-else-if="item1.val < 0"
                            style="color:green;"
                          >{{(item1.val*100).toFixed(2) + '%'}}</span>
                          <span v-else>{{item1.val}}</span>
                        </template>
                        <template v-else-if="tabelType[tindex] == '4'">
                          <span
                            v-if="item1.section.val1 > 0"
                            style="color:red;"
                          >{{item1.section.val1}}</span>
                          <span
                            v-else-if="item1.section.val1 < 0"
                            style="color:green;"
                          >{{item1.section.val1}}</span>
                          <span v-else>{{item1.section.val1}}</span>
                          -
                          <span
                            v-if="item1.section.val2 > 0"
                            style="color:red;"
                          >{{item1.section.val2}}</span>
                          <span
                            v-else-if="item1.section.val2 < 0"
                            style="color:green;"
                          >{{item1.section.val2}}</span>
                          <span v-else>{{item1.section.val2}}</span>
                        </template>
                        <template v-else>
                          <template v-if="operateFun == '(a-b)/b'">
                            <span
                              v-if="item1.val > 0"
                              style="color:red;"
                            >{{(item1.val*100).toFixed(2) + '%'}}</span>
                            <span
                              v-else-if="item1.val < 0"
                              style="color:green;"
                            >{{(item1.val*100).toFixed(2) + '%'}}</span>
                            <span v-else>{{item1.val}}</span>
                          </template>
                          <template v-else>
                            <span v-if="item1.val > 0" style="color:red;">{{item1.val}}</span>
                            <span v-else-if="item1.val < 0" style="color:green;">{{item1.val}}</span>
                            <span v-else>{{item1.val}}</span>
                          </template>
                        </template>
                      </template>
                      <template
                        v-else-if="item1.class == 'type2' && RegExp(/合计,总计/).test(item[0].val)"
                      >
                        <template
                          v-if="item1.isSum || (tabelType[tindex]=='3'&&index1!=item.length-1)"
                        >
                          <span>{{item1.val}}</span>
                        </template>
                        <template v-else>
                          <span
                            v-if="item1.val > 0"
                            style="color:red;"
                          >{{(item1.val*100).toFixed(2) + '%'}}</span>
                          <span
                            v-else-if="item1.val < 0"
                            style="color:green;"
                          >{{(item1.val*100).toFixed(2) + '%'}}</span>
                          <span v-else>{{item1.val}}</span>
                        </template>
                      </template>
                      <template v-else-if="item1.class == 'type4' && tabelType[tindex] == '4'">
                        <span>{{item1.section.val1}}</span>
                        -
                        <span>{{item1.section.val2}}</span>
                      </template>
                      <template v-else>{{item1.val}}</template>
                    </td>
                    <template v-if="tabelType[tindex] == '3' && RegExp(/合计/).test(item[0].val)">
                      <td></td>
                      <td></td>
                    </template>
                    <template v-else>
                      <td class="green" v-if="item[0].isTodayPublish == '1'">已发布</td>
                      <td class="red" v-else-if="item[0].isTodayPublish == '0'">未发布</td>
                      <td v-else></td>
                      <td v-if="item[0].isDisabled">
                        <a @click="openInput(tindex,index)" href="javascript:;">重发数据</a>
                        <a @click="detailModalOpen(tindex,index)" href="javascript:;">查看</a>
                        <a @click="modifyPrice(tindex,index)" href="javascript:;">调价</a>
                      </td>
                      <td v-else>
                        <a @click="publishModalOpen(tindex,index)" href="javascript:;">发布</a>
                        <a @click="closeInput(tindex,index)" href="javascript:;">无数据</a>
                        <a @click="detailModalOpen(tindex,index)" href="javascript:;">查看</a>
                        <a @click="modifyPrice(tindex,index)" href="javascript:;">调价</a>
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-for="(item,index) in mainData" :key="item.id">
            <div v-if="item.displayType == 1">
              <div class="unit" style="position: relative">
                <div class="unit_title">
                  <span>信息单元{{index+1}}</span>
                </div>
                <i-switch class="checkStatus" size="large" v-model="item.publishStatus">
                  <span slot="open">发布</span>
                  <span slot="close">不发布</span>
                </i-switch>
              </div>
              <div>
                <Form :label-width="100" :ref="'unit'+index">
                  <FormItem label="文章标题:" class="tips">
                    <Input
                      v-model="item.title"
                      :maxlength="100"
                      :ref="'title'+index"
                      @on-blur="showTips('title',item.title,index)"
                      placeholder="请输入文章标题"
                    ></Input>
                  </FormItem>
                  <FormItem label="标题图片:">
                    <Col span="24">
                      <Upload
                        :ref="'upload'+index"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="5120"
                        :headers="{'index':index}"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        multiple
                        type="drag"
                        action="/information/unit/upload_image"
                        style="display: inline-block;width:50px;"
                      >
                        <div style="width: 50px;height:40px;line-height: 45px;">
                          <img
                            v-if="item.titlePictureUrl"
                            :src="'//mfs.oilchem.net/'+item.titlePictureUrl"
                            style="width: 100%"
                          >
                          <Icon v-else type="ios-cloud-upload" size="20"></Icon>
                        </div>
                      </Upload>
                    </Col>
                  </FormItem>
                  <FormItem label="文章内容:" class="tips">
                    <UE
                      :defaultMsg="item.content"
                      :config="config"
                      :index="index"
                      :ref="'ue'+index"
                      @contentChanged="contentChange"
                      class="ue-editor"
                    ></UE>
                  </FormItem>
                  <FormItem label="关键字:">
                    <Input
                      v-model="item.keyword"
                      :maxlength="500"
                      placeholder="请输入文章关键字"
                      :ref="'keyword'+index"
                      @on-blur="showTips('keyword', item.keyword, index)"
                    ></Input>
                  </FormItem>
                  <FormItem label="摘要:">
                    <Input
                      v-model="item.summary"
                      :maxlength="600"
                      placeholder="请输入文章摘要"
                      type="textarea"
                      :rows="4"
                      :ref="'summary'+index"
                      @on-blur="showTips('summary', item.summary, index)"
                    />
                  </FormItem>
                  <Row>
                    <Col span="10">
                      <FormItem label="是否置顶:">
                        <Select v-model="item.isStick">
                          <Option
                            v-for="item in typeList"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="10" offset="4">
                      <FormItem label="是否开启推荐:">
                        <Select v-model="item.isRecommend">
                          <Option
                            v-for="item in typeList"
                            :value="item.value"
                            :key="'typeList1' + item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="10">
                      <FormItem label="信息来源:" class="tips">
                        <Input
                          v-model="item.source"
                          :maxlength="100"
                          :ref="'source'+index"
                          @on-blur="showTips('source',item.source,index)"
                          placeholder="请输入文章信息来源"
                        ></Input>
                      </FormItem>
                    </Col>
                    <Col span="10" offset="4">
                      <FormItem label="发布人:" class="tips">
                        <associate-Search
                          @query-list="editArticlePersonFunction"
                          :index="index"
                          :dataUrl="urlPublishPerson"
                          :ref="'editArticlePersonRef'+index"
                        ></associate-Search>
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
            <div v-if="item.displayType == 2">
              <div class="unit" style="position: relative">
                <div class="unit_title">
                  <span>信息单元{{index+1}}</span>
                </div>
                <i-switch class="checkStatus" size="large" v-model="item.publishStatus">
                  <span slot="open">发布</span>
                  <span slot="close">不发布</span>
                </i-switch>
              </div>
              <div>
                <Form :label-width="100" :ref="'unit'+index">
                  <FormItem label="短信内容:" class="tips">
                    <Input
                      type="textarea"
                      :autosize="{minRows: 5,maxRows: 8}"
                      v-model="item.content"
                      :maxlength="360"
                      :ref="'messageContent'+index"
                      @on-blur="showMessageTips(item.content,index)"
                      placeholder="请输入短信内容"
                    ></Input>
                  </FormItem>
                  <FormItem label=" ">
                    <div class="btn-diaoyong">
                      <Button @click="showMessageModal(item)">已发布短信</Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
            <div v-if="item.displayType == 3">
              <div class="unit" style="position: relative">
                <div class="unit_title">
                  <span>信息单元{{index+1}}</span>
                </div>
                <i-switch class="checkStatus" size="large" v-model="item.publishStatus">
                  <span slot="open">发布</span>
                  <span slot="close">不发布</span>
                </i-switch>
              </div>
              <div>
                <Form :label-width="100" :ref="'unit'+index">
                  <FormItem label="短讯通标题:" class="tips">
                    <Input
                      v-model="item.title"
                      :maxlength="100"
                      :ref="'flashTitle'+index"
                      @on-blur="showTips('flashTitle',item.title,index)"
                      placeholder="请输入短讯通标题"
                    ></Input>
                  </FormItem>
                  <FormItem label="短讯通内容:" class="tips">
                    <Input
                      type="textarea"
                      :autosize="{minRows: 5,maxRows: 8}"
                      v-model="item.content"
                      :maxlength="1000"
                      :ref="'flashContent'+index"
                      @on-blur="showFlashTips(item.content,index)"
                      placeholder="请输入短讯通内容"
                    ></Input>
                  </FormItem>
                  <FormItem label=" ">
                    <div class="btn-diaoyong">
                      <Button @click="showFlashModal(item)">已发布短讯通短信</Button>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
        </Row>
      </Col>

      <Col span="24">
        <Row class-name="current-position">
          <div class="btn-dibu">
            <Button :disabled="isSave" @click="save">暂存</Button>
            <Button :disabled="isPreview" @click="preview">预览</Button>
            <Button @click="cancel">返回列表</Button>
          </div>
        </Row>
      </Col>

      <basic-modal ref="basicModal" @hide-modal="hideBasicModal"/>

      <contact-modal ref="cantactModal" @hide-modal="hideContactModal"/>

      <relavant-modal ref="relavantModal" @hide-modal="hideRelavantModal"/>

      <publish-modal ref="publishModal" @hide-modal="hidePublishModal"/>

      <message-modal ref="messageModal" @hide-modal="hideMessageModal"/>

      <flash-modal ref="flashModal" @hide-modal="hideFlashModal"/>

      <Modal v-model="publishZBModal" title="指标发布">
        <Row class="f14" v-for="(item,index) in pubValue1" :key="'pubValue1' + index">
          <Col span="18">{{pubLabel1}}{{item.title}}：</Col>
          <Col span="6">{{item.val}}</Col>
        </Row>
        <Row class="f14" v-for="(item, index) in pubValue2" :key="'pubValue2' + index">
          <Col span="18">{{item.name}}：</Col>
          <template v-if="pubtabelType == '3' || item.isHB">
            <Col span="6" v-if="item.val>0" style="color:red">{{(item.val*100).toFixed(2) + '%'}}</Col>
            <Col
              span="6"
              v-else-if="item.val<0"
              style="color:green"
            >{{(item.val*100).toFixed(2) + '%'}}</Col>
            <Col span="6" v-else>{{item.val}}</Col>
          </template>
          <template v-else>
            <Col span="6" v-if="item.val>0" style="color:red">{{item.val}}</Col>
            <Col span="6" v-else-if="item.val<0" style="color:green">{{item.val}}</Col>
            <Col span="6" v-else>{{item.val}}</Col>
          </template>
        </Row>
        <Form ref="publishFormValidate" :rules="publishValidate" :model="publishForm">
          <FormItem label="备注 ：" :label-width="180">
            <span class="f14">{{pubValue3}}</span>
          </FormItem>
          <!-- <FormItem label="数据保存方式 ：" :label-width="180">
            <Select v-model="publishForm.typeId" @on-change="changePublishType">
              <Option
                v-for="(option, index) in indexTypeList"
                :value="option.value"
                :key="index"
              >{{option.label}}</Option>
            </Select>
          </FormItem>-->
          <FormItem
            label="修改原因 ："
            v-show="publishForm.typeId == 1"
            :label-width="180"
            prop="updateReason"
          >
            <Input type="textarea" v-model="publishForm.updateReason" placeholder="请输入修改原因"/>
          </FormItem>
        </Form>
        <div slot="footer">
          <i-button type="primary" @click="publishFun('publishFormValidate')" :loading="loading">确定</i-button>
          <i-button @click="publishZBModal=false">取消</i-button>
        </div>
      </Modal>
      <Modal v-model="showDetailModal" title="历史数据" width="1000">
        <Row type="flex" justify="space-between" style="margin-bottom:20px">
          <Col span="7">
            <DatePicker
              type="daterange"
              :options="options1"
              placeholder="请选择时间"
              :clearable="false"
              style="width: 200px"
              class="search-input"
              v-model="historicalDataValue"
              @on-change="historicalDataValueChange"
            ></DatePicker>
          </Col>
          <Col span="7" class="text-left">
            <Button type="primary" @click="historicalDataQuery">查询</Button>
            <Button style="margin-left: 8px" @click="clearHistoricalDataQuery">重置</Button>
          </Col>
        </Row>
        <Row class="table-content">
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <thead>
              <tr>
                <td v-for="(item,index) in detailHead" :key="index">{{item}}</td>
                <!-- <td>操作</td> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in detailBody" :key="index">
                <template v-if="isTodayArr[index]">
                  <td v-for="(item1,index1) in item" :key="'item1' + index1">
                    <span v-if="index1>1&&index1<item.length-1">{{detailBody[index][index1].value}}</span>
                    <span v-else-if="index1==item.length-1">{{detailBody[index][index1]}}</span>
                    <span v-else>{{item1}}</span>
                  </td>
                  <!-- <td><a href="javascript:;" style="color:#2D8CF0" @click="saveDetailBody(index)">保存</a> </td> -->
                </template>
                <template v-else>
                  <td v-for="(item1,index1) in item" :key="'item2' + index1">
                    <span v-if="index1>1&&index1<item.length-1">{{item1.value}}</span>
                    <span v-else>{{item1}}</span>
                  </td>
                </template>
              </tr>
              <tr v-if="detailBody.length == 0" style="text-align:center">
                <td :colspan="detailHead.length+1">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <oil-page
            :total="modalTotal"
            :page-num="modalParams.pageNum"
            :page-size="modalParams.pageSize"
            @page-change="modalParamsChange"
            :show-sizer="false"
          ></oil-page>
        </Row>
        <div slot="footer">
          <i-button @click="showDetailModal=false">关闭</i-button>
        </div>
      </Modal>
      <Modal v-model="ParamsModifyPriceModal" title="调价数据" width="1000">
        <Row class="table-content">
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <thead>
              <tr>
                <td v-for="(item,index) in detailHeadPrice" :key="index">{{item}}</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in detailBodyPrice" :key="index">
                <!-- <td v-for="(item1,index1) in item" :key="index1">{{item1}}</td> -->
                <td v-for="(item1,index1) in item" :key="'item3' + index1">
                  <Input
                    v-if="index1>1&&index1<item.length-1"
                    v-model="detailBodyPrice[index][index1].value"
                    class="search-input"
                  ></Input>
                  <Input
                    v-else-if="index1==item.length-1"
                    v-model="detailBodyPrice[index][index1]"
                    class="search-input"
                  ></Input>
                  <span v-else>{{item1}}</span>
                </td>
                <td>
                  <a href="javascript:;" style="color:#2D8CF0" @click="priceSave(index)">保存</a>
                  <a
                    href="javascript:;"
                    style="color:red"
                    @click="priceDelete(index,detailBodyPrice.length)"
                  >删除</a>
                </td>
              </tr>
              <tr v-if="detailBodyPrice.length == 0" style="text-align:center">
                <td :colspan="detailHeadPrice.length+1">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <oil-page
            :total="modalParamsModifyPriceTotal"
            :page-num="modalParamsModifyPrice.pageNum"
            :page-size="modalParamsModifyPrice.pageSize"
            @page-change="modalParamsModifyPriceChange"
            :show-sizer="false"
          ></oil-page>
        </Row>
        <div slot="footer">
          <i-button @click="ParamsModifyPriceModal=false">关闭</i-button>
        </div>
      </Modal>
      <Modal v-model="isSubmitMoreModal" title="提示">
        <p>是否确认一键发布？</p>
        <div slot="footer">
          <i-button type="primary" @click="publishMoreFun">确定</i-button>
          <i-button @click="isSubmitMoreModal=false">取消</i-button>
        </div>
      </Modal>
    </Row>
  </div>
</template>
<script>
import axios from "axios";
import OilPage from "../../components/page/page.vue";
import basicModal from "./modalList/basicModal.vue";
import contactModal from "./modalList/contactModal.vue";
import relavantModal from "./modalList/relavantModal.vue";
import publishModal from "./modalList/publishModal.vue";
import messageModal from "./modalList/messageModal.vue";
import flashModal from "./modalList/flashModal.vue";
import associateSearch from "./associateSearch.vue";
import UE from "./UE.vue";
import {
  showPublishPage,
  publishQuota,
  getIstodayPublish,
  getLastDesc,
  getUnitCodeLog,
  getUnitCodePrice,
  updateDuota,
  removeQuota,
  getUpRemake
} from "../unitmangement/api/infoDiffusion";
import {
  formData,
  formatTime,
  richTest,
  checkSensitive
} from "../../../assets/js/common.js";
import { types } from "util";
import { setTimeout } from "timers";
export default {
  name: "formStyle",
  components: {
    UE,
    basicModal,
    contactModal,
    relavantModal,
    publishModal,
    messageModal,
    associateSearch,
    flashModal,
    OilPage
  },
  computed: {},
  data() {
    return {
      loading: false,
      numValue: 0,
      options1: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      tindexValue: "",
      indexValue: "",
      responseValueDelete: [],
      responseValue: [],
      historicalDataValue: [],
      isTodayArr: [],
      priceArr: [],
      showDetailModal: false,
      isSubmitMoreModal: false,
      ParamsModifyPriceModal: false,
      modalParams: {
        code: [],
        heads: [],
        pageSize: 10,
        pageNum: 1,
        startTime: "",
        endTime: ""
      },
      modalParamsModifyPrice: {
        code: [],
        heads: [],
        pageSize: 10,
        pageNum: 1
      },
      modalParamsModifyPriceTotal: 0,
      modalTotal: 0,
      detailHead: [],
      detailHeadPrice: [],
      detailBody: [],
      detailBodyPrice: [],
      checkAll: [],
      tableRow: {},
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
          {
            required: false,
            message: "请输入修改原因",
            trigger: "blur"
          }
        ]
      },
      pubLabel1: "",
      pubLabel2: "",
      pubValue1: [],
      pubValue2: [],
      pubValue3: "",
      urlPublishPerson: "/information/select/employee",
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350,
        allowDivTransToP: false
      },
      rowList: {},
      mainData: [],
      typeList: [
        {
          label: "是",
          value: 0
        },
        {
          label: "否",
          value: 1
        }
      ],
      tableColumns: [],
      tableData: [],
      tables: [],
      tabelType: [],
      pubtabelType: "",
      hasLastOperate: false,
      isSave: false,
      isPreview: false
    };
  },
  created() {
    this.rowList = JSON.parse(this.$route.query.item);
    this.showEditQuotaPageFunction(this.rowList);
    this.initData();
    this.historicalDataValueDefault();
  },
  watch: {
    publishZBModal(val) {
      if (val == false) {
        this.pubLabel1 = "";
        this.pubLabel2 = "";
        this.pubValue1 = [];
        this.pubValue2 = [];
        this.pubValue3 = "";
        this.publishForm = {
          typeId: 0,
          updateReason: ""
        };
      }
    }
  },
  methods: {
    saveDetailBody(index) {
      let paramsArray = [];
      let array = this.detailBody[index].filter(item => item.code);
      let length = this.detailBody[index].length - 1;
      let xinArray = [];
      for (var i = 0; i < array.length; i++) {
        xinArray.push({
          code: array[i].code,
          value: array[i].value,
          des: this.detailBody[index][length],
          status: 1
        });
      }
      paramsArray.contents = JSON.stringify(xinArray);
      publishQuota(formData(paramsArray)).then(res => {
        // debugger;
        if (res.status == 200) {
          // debugger;
          let statusNew = res.response ? res.response : [];
          let errorCount = 0,
            errorTips = "";
          for (var i = 0; i < statusNew.length; i++) {
            if (statusNew[i] == 0) {
            } else if (statusNew[i] == 1) {
              errorCount++;
              errorTips += "相同数据不可重复发布!";
            } else if (statusNew[i] == 2) {
              errorCount++;
              errorTips += "数据只可修改不能新增!";
            } else if (statusNew[i] == 3) {
              errorCount++;
              errorTips += "无数据提交备注不能为空!";
            }
          }
          if (errorCount > 0) {
            this.$Message.error(errorTips);
            setTimeout(() => {
              this.showEditQuotaPageFunction(this.rowList);
            }, 1000);
            // this.initData();
          } else {
            this.$Message.success("历史数据发布成功！");
            // this.rowList = JSON.parse(this.$route.query.item);
            setTimeout(() => {
              this.showEditQuotaPageFunction(this.rowList);
            }, 1000);
          }
        } else {
          this.$Message.error(res.response);
        }
      });
    },
    priceSave(index) {
      this.numValue = 0;
      this.responseValue = [];
      let paramsArray = [];
      let array = this.detailBodyPrice[index].filter(item => item.code);
      let length = this.detailBodyPrice[index].length - 1;
      let xinArray = {};
      let arrayOne = [];
      let errorTips = "",
        errorCount = 0;
      for (var i = 0; i < array.length; i++) {
        xinArray = {
          code: array[i].code,
          value: array[i].value,
          des: this.detailBodyPrice[index][length],
          id: array[i].id || -1,
          createTime: array[i].createTime
        };
        let obj = "";
        obj = array[i].value.replace(/\s/g, "");
        if (obj == "" && this.detailBodyPrice[index][length] == "") {
          errorCount++;
          errorTips +=
            "<p>第" + (i + 1) + "个指标不能保存,无数据提交备注不能为空!</p>";
        } else {
          this.updateDuotaFun(xinArray, i, array.length);
        }
      }
      if (errorCount > 0) {
        this.$Modal.warning({
          title: "提示",
          content:
            "其中" + errorCount + "条保存失败！请查看对应状态：" + errorTips
        });
        setTimeout(() => {
          this.showEditQuotaPageFunction(this.rowList);
        }, 1000);
      } else {
      }
    },
    updateDuotaFun(xinArray, i, arrayLength) {
      let that = this;
      that.numValue++;
      updateDuota(formData(xinArray)).then(res => {
        that.responseValue.push(res.response);
        var num = 0;
        if (i == arrayLength - 1) {
          for (var j = 0; j < that.responseValue.length; j++) {
            if (!that.responseValue[j]) {
              num++;
            }
          }
          if (num > 0) {
            that.$Message.error("其中有" + num + "项保存失败");
            setTimeout(() => {
              that.showEditQuotaPageFunction(this.rowList);
            }, 1000);
          } else {
            if (that.numValue == arrayLength) {
              that.$Message.success("保存成功");
            }
            setTimeout(() => {
              that.showEditQuotaPageFunction(this.rowList);
            }, 1000);
          }
        }
      });
    },
    priceDelete(index, lengthOne) {
      if (lengthOne > 1) {
        this.responseValueDelete = [];
        let paramsArray = [];
        let array = this.detailBodyPrice[index].filter(item => item.code);
        let length = this.detailBodyPrice[index].length - 1;
        let xinArray = {};
        let arrayOne = [];
        for (var i = 0; i < array.length; i++) {
          xinArray = {
            code: array[i].code,
            id: array[i].id || -1,
            createTime: array[i].createTime
          };
          this.deleteDuotaFun(xinArray, i, array.length);
        }
      } else {
        this.$Message.error("最后一条数据不能删除");
        return;
      }
    },
    deleteDuotaFun(xinArray, i, arrayLength) {
      let that = this;
      removeQuota(formData(xinArray)).then(res => {
        that.responseValueDelete.push(res.response);
        var num = 0;
        if (i == arrayLength - 1) {
          for (var j = 0; j < that.responseValueDelete.length; j++) {
            if (!that.responseValueDelete[j]) {
              num++;
            }
          }
          if (num > 0) {
            that.$Message.error("其中有" + num + "项删除失败");
            setTimeout(() => {
              that.modifyPrice(this.tindexValue, this.indexValue);
              that.showEditQuotaPageFunction(this.rowList);
            }, 1000);
          } else {
            that.$Message.success("删除成功");
            setTimeout(() => {
              that.modifyPrice(this.tindexValue, this.indexValue);
              that.showEditQuotaPageFunction(this.rowList);
            }, 1000);
          }
        }
      });
    },
    goto() {
      window.reload();
    },

    findIdItem(id, tindex, index) {
      let trArr = this.tables[tindex].tableData;
      //先到index传入的行去查找是否有该id，没有的话，再到tindex对应的整个表去查
      let isIndex = false;
      if (index) {
        for (var i = 0; i < trArr[index].length; i++) {
          if (trArr[index][i].id == id) {
            isIndex = true;
            return trArr[index][i];
          }
        }
      }
      if (!isIndex) {
        for (var i = 0; i < trArr.length; i++) {
          for (var j = 0; j < trArr[i].length; j++) {
            if (trArr[i][j].id == id) {
              return trArr[i][j];
            }
          }
        }
      }
    },
    changePublishType() {
      if (this.publishForm.typeId == 1) {
        this.publishValidate.updateReason = [
          {
            required: true,
            message: "请输入修改原因",
            trigger: "blur"
          }
        ];
      } else {
        this.publishValidate.updateReason = [
          {
            required: false,
            message: "请输入修改原因",
            trigger: "blur"
          }
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
      })
        .then(res => {
          if (res.status == "200") {
            var res = res.data;
            let string = res.response.content;
            this.tabelType = res.response.tabelType
              ? res.response.tabelType.split(",")
              : [];

            let jsStr = res.response.javaScript;
            jsStr = jsStr ? jsStr.replace(/\r\n/g, "") : "";
            if (jsStr == "(a-c)/c") {
              jsStr = "(a-b)/b";
            }
            this.operateFun = jsStr;
            string = string ? string.replace(/\r\n/g, "") : "";
            var myNodeList = this.parseDom(string);
            this.tables = [];
            this.checkAll = [];
            for (var i = 0; i < myNodeList.length; i++) {
              if (res.response.tabelType == 5) {
                this.tabelType[i] = 5;
              }
              var mytable = myNodeList[i];
              let result = this.getTableContent(mytable, i);
              this.checkAll.push(false);
              this.tables.push({
                tableData: result.data,
                rowspanData: result.rowspan,
                thRows: mytable
                  .getElementsByTagName("thead")[0]
                  .getElementsByTagName("tr").length
              });
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //字符串转换成nodelist
    parseDom(arg) {
      var objE = document.createElement("div");
      objE.innerHTML = arg;
      return objE.getElementsByTagName("table");
    },
    statusFun(n, row, code) {
      //根据指标获取当日发布状态并返回(0-未发布,1-已发布)
      let params = {
        code: code
      };
      getIstodayPublish(formData(params)).then(res => {
        this.tables[n].tableData[row][0].isTodayPublish =
          res.status && res.status == "200" ? res.response : "";
      });
    },
    remarksFun(n, row, code) {
      let params = {
        code: code
      };
      getUpRemake(formData(params)).then(res => {
        for (var i = 0; i < this.tables[n].tableData[row].length; i++) {
          if (this.tables[n].tableData[row][i].class == "type3") {
            this.tables[n].tableData[row][i].val = res.response || "";
          }
        }
      });
    },
    getTableContent(mytable, n) {
      var data = [],
        rowspan = [],
        result = {};
      let isFirstCode = true,
        code1 = "";
      for (var i = 0, rows = mytable.rows.length; i < rows; i++) {
        let cells = mytable.rows[i].cells;
        isFirstCode = true;
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
          if (
            this.tabelType[n] == "4" &&
            (classEle == "type1" || classEle == "type2" || classEle == "type4")
          ) {
            let spEle = cells[j].getElementsByTagName("span");
            data[i][j] = {
              val: "",
              section: {
                val1: spEle[0] ? spEle[0].innerHTML : "",
                val2: spEle[1] ? spEle[1].innerHTML : "",
                id1: spEle[0] ? spEle[0].getAttribute("data-min") : "",
                id2: spEle[1] ? spEle[1].getAttribute("data-max") : ""
              },
              class: classEle,
              colspan: cells[j].getAttribute("colspan")
                ? cells[j].getAttribute("colspan")
                : "",
              rowspan: cells[j].getAttribute("rowspan")
                ? cells[j].getAttribute("rowspan")
                : "",
              id: cells[j].getAttribute("id")
                ? cells[j].getAttribute("id")
                : "",
              isDisabled: false,
              isTodayPublish: "",
              isChecked: false,
              isRemarks: ""
            };
          } else if (this.tabelType[n] == "5") {
            let rule = cells[j].getAttribute("data-rule"),
              ruleBase = cells[j].getAttribute("data-base");
            if (rule == "(a-b)*100%") {
              rule = "(a-b)/b";
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
              id: cells[j].getAttribute("id")
                ? cells[j].getAttribute("id")
                : "",
              isDisabled: false,
              rule: rule ? rule : "",
              ruleBase: ruleBase ? ruleBase : "",
              isHB: rule == "(a-b)/b" ? true : false,
              isTodayPublish: "",
              isChecked: false,
              isRemarks: ""
            };
          } else {
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
              id: cells[j].getAttribute("id")
                ? cells[j].getAttribute("id")
                : "",
              isDisabled: false,
              isTodayPublish: "",
              isChecked: false,
              isRemarks: ""
            };
          }

          if (cells[j].getAttribute("class") == "type1" && isFirstCode) {
            let code = cells[j].getAttribute("id");
            this.statusFun(n, i, code);
            this.remarksFun(n, i, code);
            isFirstCode = false;
          }
          if (cells[j].getAttribute("class") == "type2" && isFirstCode) {
            code1 = cells[j].getAttribute("id");
          }
          if (j == cells.length - 1 && isFirstCode && code1) {
            this.statusFun(n, i, code1);
            this.remarksFun(n, i, code1);
          }
        }
      }
      result = {
        data: data,
        rowspan: rowspan
      };
      return result;
    },
    handleCheckAll(tindex) {
      let tbEle = this.tables[tindex].tableData;
      this.checkAll[tindex] = !this.checkAll[tindex];
      for (var i = 0; i < tbEle.length; i++) {
        tbEle[i][0].isChecked = tbEle[i][0].isDisabled
          ? false
          : this.checkAll[tindex];
      }
    },
    handleCheckSingle(tindex, index) {
      let tbEle = this.tables[tindex].tableData;
      let trEle = this.tables[tindex].tableData[index];
      let thRows = this.tables[tindex].thRows;
      trEle[0].isChecked = !trEle[0].isChecked;

      let countCheck = 0;
      for (var i = 0; i < tbEle.length; i++) {
        if (tbEle[i][0].isChecked) {
          countCheck++;
        }
      }
      if (countCheck == tbEle.length - thRows) {
        this.checkAll[tindex] = true;
      } else {
        this.checkAll[tindex] = false;
      }
    },
    modifyPrice(tindex, index) {
      this.tindexValue = tindex;
      this.indexValue = index;
      this.modalParamsModifyPrice.code = [];
      this.modalParamsModifyPrice.heads = [];
      let codes = [],
        heads = [];
      let trEle = this.tables[tindex].tableData[index];
      let thEle = this.tables[tindex].tableData[0];
      for (var i = 0; i < trEle.length; i++) {
        if (trEle[i].class == "type1") {
          codes.push(trEle[i].id);
          heads.push(thEle[i].val);
        }
      }

      this.modalParamsModifyPrice.code = codes;
      this.modalParamsModifyPrice.heads = heads;
      this.modalParamsModifyPrice.pageNum = 1;
      this.modalParamsModifyPriceTotal = 0;
      this.detailTableFunPrice();
      this.ParamsModifyPriceModal = true;
    },
    detailModalOpen(tindex, index) {
      this.modalParams.code = [];
      this.modalParams.heads = [];
      let codes = [],
        heads = [];
      let trEle = this.tables[tindex].tableData[index];
      let thEle = this.tables[tindex].tableData[0];

      for (var i = 0; i < trEle.length; i++) {
        if (trEle[i].class == "type1") {
          codes.push(trEle[i].id);
          heads.push(thEle[i].val);
        }
      }
      this.modalParams.code = codes;
      this.modalParams.heads = heads;
      this.modalParams.pageNum = 1;
      this.modalTotal = 0;
      this.detailTableFun();
      this.showDetailModal = true;
    },
    historicalDataQuery() {
      this.modalParams.pageNum = 1;
      this.detailTableFun();
    },
    historicalDataValueDefault() {
      this.modalParams.startTime =
        new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;
      this.modalParams.endTime = new Date().setHours(23, 59, 59, 59);
      this.historicalDataValue = [
        formatTime(this.modalParams.startTime),
        formatTime(this.modalParams.endTime)
      ];
    },
    historicalDataValueChange(data) {
      this.modalParams.startTime = new Date(data[0]).setHours(0, 0, 0, 0);
      this.modalParams.endTime = new Date(data[1]).setHours(23, 59, 59, 59);
    },
    clearHistoricalDataQuery() {
      this.modalParams.startTime =
        new Date().setHours(0, 0, 0, 0) - 30 * 24 * 60 * 60 * 1000;
      this.modalParams.endTime = new Date().setHours(23, 59, 59, 59);
      this.historicalDataValue = [
        formatTime(this.modalParams.startTime),
        formatTime(this.modalParams.endTime)
      ];
    },
    detailTableFun() {
      getUnitCodeLog(formData(this.modalParams)).then(res => {
        if (res.status == "200") {
          let list = res.response ? res.response.list : [];
          if (list.length > 0) {
            this.detailHead = list[0];
            let arr = list;
            arr.splice(0, 1);
            this.isTodayArr = [];
            this.detailBody = [];
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < arr[i].length; j++) {
                if (j > 1 && j < arr[i].length - 1) {
                  arr[i][j] = JSON.parse(arr[i][j]);
                }
                if (j == 1) {
                  if (this.dateConversion(arr[i][j])) {
                    this.isTodayArr.push(true);
                  } else {
                    this.isTodayArr.push(false);
                  }
                }
              }
              this.detailBody.push(arr[i]);
            }
          } else {
            this.detailHead = [];
            this.detailBody = [];
          }
          this.modalTotal = res.response.total;
        } else {
          this.$Message.error(res.response);
        }
      });
    },
    dateConversion(data) {
      const s = new Date(data).setHours(0, 0, 0, 0);
      const c = new Date().setHours(0, 0, 0, 0);

      return s === c;
    },
    detailTableFunPrice() {
      getUnitCodePrice(formData(this.modalParamsModifyPrice)).then(res => {
        if (res.status == "200") {
          let list = res.response ? res.response.list : [];
          if (list.length > 0) {
            this.detailHeadPrice = list[0];
            let arr = list;
            arr.splice(0, 1);
            this.detailBodyPrice = [];
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < arr[i].length; j++) {
                if (j > 1 && j < arr[i].length - 1) {
                  arr[i][j] = JSON.parse(arr[i][j]);
                }
              }
              this.detailBodyPrice.push(arr[i]);
            }
          } else {
            this.detailHeadPrice = [];
            this.detailBodyPrice = [];
          }
          this.modalParamsModifyPriceTotal = res.response.total;
        } else {
          this.$Message.error(res.response);
        }
      });
    },
    modalParamsChange(page, pageSize) {
      if (page) {
        this.modalParams.pageNum = page;
      }
      if (pageSize) {
        this.modalParams.pageSize = pageSize;
      }
      this.detailTableFun();
    },
    modalParamsModifyPriceChange(page, pageSize) {
      if (page) {
        this.modalParamsModifyPrice.pageNum = page;
      }
      if (pageSize) {
        this.modalParamsModifyPrice.pageSize = pageSize;
      }
      this.detailTableFunPrice();
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
      let pubLabel1 = "",
        label1 = "",
        label2 = "";

      this.pubValue1 = [];
      this.pubValue2 = [];
      this.pubValue3 = "";

      for (var i = 0; i < trEle.length; i++) {
        label1 = "";
        if (trEle[i].class == "type1") {
          if (thLeng > 1) {
            let th0 = this.tables[tindex].tableData[0],
              th0Arr = [];
            for (var j = 0; j < th0.length; j++) {
              if (th0[j].colspan) {
                for (var m = 0; m < parseInt(th0[j].colspan); m++) {
                  th0Arr.push(th0[j].val);
                }
              } else {
                th0Arr.push(th0[j].val);
              }
            }
            label1 = th0Arr[i];
          }

          if (
            thEle[thEle.length - (trEle.length - i)] &&
            !(
              thEle.length == 1 &&
              thEle[thEle.length - (trEle.length - i)].colspan > 0
            )
          ) {
            label1 += thEle[thEle.length - (trEle.length - i)].val;
          } else if (
            trEle[i - 1].class != "type1" &&
            trEle[i - 1].class != "type2" &&
            trEle[i - 1].class != "type3" &&
            trEle[i - 1].class != "type4" &&
            trEle[i - 1].class != "type4 hidden" &&
            trEle[i - 1].class != "type5"
          ) {
            label1 += trEle[i - 1].val;
          }
          let pubishval = 0;
          if (this.tabelType[tindex] == "4") {
            pubishval = trEle[i].section.val1 + " ~ " + trEle[i].section.val2;
          } else {
            pubishval = trEle[i].val;
          }
          this.pubValue1.push({
            title: label1,
            val: pubishval
          });
        }

        if (trEle[i].class == "type2") {
          if (
            thEle[thEle.length - (trEle.length - i)] &&
            !(
              thEle.length == 1 &&
              thEle[thEle.length - (trEle.length - i)].colspan > 0
            )
          ) {
            label2 = thEle[thEle.length - (trEle.length - i)].val;
          } else if (
            trEle[i - 1].class != "type1" &&
            trEle[i - 1].class != "type2" &&
            trEle[i - 1].class != "type3" &&
            trEle[i - 1].class != "type4" &&
            trEle[i - 1].class != "type4 hidden" &&
            trEle[i - 1].class != "type5"
          ) {
            label2 = trEle[i - 1].val;
          }

          let pubishval1 = 0;

          if (this.tabelType[tindex] == "4") {
            pubishval1 = trEle[i].section.val1 + " ~ " + trEle[i].section.val2;
          } else if (this.tabelType[tindex] == "3") {
            pubishval1 = trEle[i].val
              ? parseFloat(trEle[i].val).toFixed(2)
                ? (parseFloat(trEle[i].val) * 100).toFixed(2) + "%"
                : 0
              : 0;
          } else {
            pubishval1 = trEle[i].val;
          }

          let isHB = false;
          if (this.operateFun == "(a/b)*100%" || this.operateFun == "(a-b)/b") {
            isHB = true;
          }

          this.pubValue2.push({
            name: pubLabel1 + label2,
            val: pubishval1,
            isHB: trEle[i].isHB ? trEle[i].isHB : isHB
          });
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
        this.loading = true;
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
              } else {
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
              } else {
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
              status: this.publishForm.typeId
            });
          }
          params.contents = JSON.stringify(contents);
          publishQuota(formData(params)).then(res => {
            if (res.status == "200") {
              let statusNew = res.response ? res.response : [];
              let errorCount = 0,
                errorTips = "";
              for (var i = 0; i < statusNew.length; i++) {
                if (statusNew[i] == 0) {
                  this.tables[tindex].tableData[index][0].isTodayPublish = 1;
                } else if (statusNew[i] == 1) {
                  errorCount++;
                  errorTips += "相同数据不可重复发布!";
                } else if (statusNew[i] == 2) {
                  errorCount++;
                  errorTips += "数据只可修改不能新增!";
                } else if (statusNew[i] == 3) {
                  errorCount++;
                  errorTips += "无数据提交备注不能为空!";
                }
              }
              if (errorCount > 0) {
                this.$Message.error(errorTips);
              } else {
                this.loading = false;
                this.$Message.success("发布成功！");
              }
              this.publishZBModal = false;
              this.loading = false;
            } else {
              this.$Message.error(res.response);
            }
          });
        }
      });
    },
    publishMore() {
      let hasChecked = false;
      for (var i = 0; i < this.tables.length; i++) {
        for (var j = 0; j < this.tables[i].tableData.length; j++) {
          if (this.tables[i].tableData[j][0].isChecked) {
            hasChecked = true;
            break;
          }
        }
        if (hasChecked) {
          break;
        }
      }
      if (!hasChecked) {
        this.$Modal.error({
          title: "提示",
          content: "请至少选中一项！"
        });
      } else {
        this.isSubmitMoreModal = true;
        // this.$Modal.confirm({
        //   title: "提示",
        //   content: "是否确认一键发布？",
        //   onOk: () => {
        //       this.publishMoreFun();
        //   },
        //   onCancel: () => {

        //   }
        // });
      }
    },
    publishMoreFun() {
      this.isSubmitMoreModal = false;
      let params = {};
      let contents = [],
        statusArr = [];
      for (var m = 0; m < this.tables.length; m++) {
        for (var n = 0; n < this.tables[m].tableData.length; n++) {
          let trEle = this.tables[m].tableData[n];
          if (trEle[0].isChecked) {
            let codes = [],
              des = "",
              isFirstCode = true;
            for (var i = 0; i < trEle.length; i++) {
              if (trEle[i].class == "type1") {
                if (this.tabelType[m] == "4") {
                  codes.push({
                    code: trEle[i].section.id1,
                    val: trEle[i].section.val1
                  });
                  codes.push({
                    code: trEle[i].section.id2,
                    val: trEle[i].section.val2
                  });
                } else {
                  codes.push({
                    code: trEle[i].id,
                    val: trEle[i].val
                  });
                }
                if (isFirstCode) {
                  statusArr.push({
                    tindex: m,
                    index: n,
                    code: trEle[i].id
                  });
                  isFirstCode = false;
                }
              }
              if (trEle[i].class == "type2") {
                if (this.tabelType[m] == "4") {
                  codes.push({
                    code: trEle[i].section.id1,
                    val: trEle[i].section.val1
                  });
                  codes.push({
                    code: trEle[i].section.id2,
                    val: trEle[i].section.val2
                  });
                } else {
                  codes.push({
                    code: trEle[i].id,
                    val: trEle[i].val
                  });
                }
                if (isFirstCode) {
                  statusArr.push({
                    tindex: m,
                    index: n,
                    code: trEle[i].id
                  });
                  isFirstCode = false;
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
                updateReason: "",
                status: 0
              });
            }
          }
        }
      }
      params.contents = JSON.stringify(contents);
      publishQuota(formData(params)).then(res => {
        if (res.status == "200") {
          let statusNew = res.response ? res.response : [];
          let errorCount = 0,
            errorTips = "";
          for (var i = 0; i < statusNew.length; i++) {
            if (statusNew[i] == 0) {
              this.tables[statusArr[i].tindex].tableData[
                statusArr[i].index
              ][0].isTodayPublish = 1;
            } else if (statusNew[i] == 1) {
              errorCount++;
              errorTips +=
                "<p>选中的第" +
                (i + 1) +
                "条发布失败，相同数据不可重复发布!</p>";
            } else if (statusNew[i] == 2) {
              errorCount++;
              errorTips +=
                "<p>选中的第" +
                (i + 1) +
                "条发布失败，数据只可修改不能新增!</p>";
            } else if (statusNew[i] == 3) {
              errorCount++;
              errorTips +=
                "<p>选中的第" +
                (i + 1) +
                "条发布失败，无数据提交备注不能为空!</p>";
            }
          }
          if (errorCount > 0) {
            this.$Modal.warning({
              title: "提示",
              content:
                "其中" + errorCount + "条发布失败！请查看对应状态：" + errorTips
            });
          } else if (statusNew.length > 0) {
            this.$Message.success("全部发布成功！");
          } else {
            this.$Message.success("系统未检测到选中项！");
          }
          // for(var n=0;n<statusArr.length;n++){
          //   this.statusFun(statusArr[n].tindex,statusArr[n].index,statusArr[n].code);
          // }
        } else {
          this.$Message.error(res.response);
        }
      });
    },
    publishClose(tindex, index) {
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
          } else {
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
          } else {
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
          status: this.publishForm.typeId
        });
      }
      params.contents = JSON.stringify(contents);
      publishQuota(formData(params)).then(res => {
        if (res.status == "200") {
          let statusNew = res.response ? res.response : [];
          let errorCount = 0,
            errorTips = "";
          for (var i = 0; i < statusNew.length; i++) {
            if (statusNew[i] == 0) {
              this.tables[tindex].tableData[index][0].isTodayPublish = 1;
            } else if (statusNew[i] == 1) {
              errorCount++;
              errorTips += "相同数据不可重复发布!";
            } else if (statusNew[i] == 2) {
              errorCount++;
              errorTips += "数据只可修改不能新增!";
            } else if (statusNew[i] == 3) {
              errorCount++;
              errorTips += "无数据提交备注不能为空!";
            }
          }
          if (errorCount > 0) {
            this.$Message.error(errorTips);
          } else {
            this.$Message.success("无数据发布成功！");
          }
          this.publishZBModal = false;

          // let isFirstCode = true;
          // for(var n=0;n<trEle.length;n++){
          //   if((trEle[n].class == 'type1' || trEle[n].class == 'type2') && isFirstCode){
          //     let code = trEle[n].id;
          //     this.statusFun(tindex,index,code);
          //     isFirstCode = false;
          //   }
          // }
        } else {
          this.$Message.error(res.response);
        }
      });
    },
    changeInputData(i1, i2, i3, val, id, throws) {
      if (this.tabelType[i1] == "5") {
        this.renderMB(id, val);
      } else {
        this.mainData.forEach((ele, index) => {
          var objE = document.createElement("div");
          objE.innerHTML = this.mainData[index].content;
          var myNodeList = objE.getElementsByTagName("table");

          if (myNodeList.length !== 0) {
            let type3Obj = myNodeList[i1]
              .getElementsByTagName("tr")
              [i2].getElementsByClassName("type3");

            if (type3Obj.length > 1) {
              myNodeList[i1]
                .getElementsByTagName("tr")
                [i2].getElementsByTagName("td")[i3].innerHTML = val;
            } else {
              myNodeList[i1].getElementsByClassName("type3")[
                i2 - throws
              ].innerHTML = val;
            }
            this.mainData[index].content = objE.innerHTML;
            if (ele.displayType == "1") {
              this.$refs["ue" + index][0].resetContent(objE.innerHTML);
            } else {
            }
          }
        });
      }
    },
    countRender(tindex, index, index1, newId) {
      let isDisabledNew = false;
      if (
        this.tables[tindex].tableData[index].length > 0 &&
        this.tables[tindex].tableData[index][0].isDisabled
      ) {
        isDisabledNew = true;
      }
      let tdEle = this.tables[tindex].tableData[index][index1];
      let base = tdEle.ruleBase.split(","),
        rule = tdEle.rule,
        id = tdEle.id;
      let baseArr = [];
      for (var i = 0; i < base.length; i++) {
        if (base[i].indexOf("id_") != -1) {
          let id1 = base[i].replace(/id_/g, "");
          id1 = id1.replace(/\s+/g, "");
          let item = this.findIdItem(id1, tindex, index);
          item.val = item.val.toString();
          if (item.val && item.val.indexOf("%") != -1) {
            item.val = parseFloat(item.val.replace(/%/g, "")) * 100;
          }
          baseArr.push(
            item.val ? (parseFloat(item.val) ? parseFloat(item.val) : 0) : 0
          );
        } else {
          if (base[i] && base[i].indexOf("%") != -1) {
            base[i] = parseFloat(base[i].replace(/%/g, "")) * 100;
          }
          baseArr.push(
            base[i] ? (parseFloat(base[i]) ? parseFloat(base[i]) : 0) : 0
          );
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
      if (rule == "sum") {
        for (var i = 0; i < baseArr.length; i++) {
          count += baseArr[i];
        }
      } else if (rule == "average") {
        let c = 0;
        for (var i = 0; i < baseArr.length; i++) {
          c += baseArr[i];
        }
        c = c / baseArr.length;
        c = c == Infinity ? 0 : c == -Infinity ? 0 : c;
        c = c || c == 0 ? c.toFixed(2) : "";
        count = c;
      } else if (rule == "copy") {
        count = tdEle.ruleBase;
      } else {
        let a = baseArr[0],
          b = baseArr[1];
        let c;

        if (rule == "(a/b)*100%") {
          c = b ? a / b : "";
        } else {
          let tt2 = new Function("a", "b", "{return " + rule + "}");
          c = tt2(a, b);
        }
        c = c == Infinity ? 1 : c == -Infinity ? -1 : c;
        c = c || c == 0 ? c.toFixed(2) : "";
        if (rule == "(a/b)*100%") {
          c = c ? (c * 100).toFixed(2) + "%" : "";
        }
        count = c;
        if (a && b && (a - b) / b > 0.3) {
          this.$Message.warning("较上一次记录超30%！");
        }
        if (isDisabledNew) {
          count = "-";
        }
      }
      this.tables[tindex].tableData[index][index1].val = count ? count : 0;
      this.renderMB(
        id,
        count,
        this.tables[tindex].tableData[index][index1].isHB
      );

      let trArr = this.tables[tindex].tableData;
      for (var i = 0; i < trArr.length; i++) {
        for (var j = 0; j < trArr[i].length; j++) {
          let base = trArr[i][j].ruleBase
            ? trArr[i][j].ruleBase.split(",")
            : [];
          if (
            trArr[i][j].class == "type2" &&
            base.indexOf("id_" + newId) != -1
          ) {
            this.countRender(tindex, i, j, trArr[i][j].id);
          }
        }
      }
    },
    renderMB(id, val, isHB) {
      this.mainData.forEach((ele, index) => {
        var objE = document.createElement("div");
        objE.innerHTML = this.mainData[index].content;
        if (objE.getElementsByTagName("table").length == 0) {
          let objID = objE.getElementsByTagName("span");
          for (var i = 0; i < objID.length; i++) {
            if (objID[i].getAttribute("data-id") == id) {
              objID[i].innerHTML =
                val && val != "-"
                  ? isHB
                    ? (val * 100).toFixed(2) + "%"
                    : val
                  : "-";
            }
          }
        } else {
          let objID1 = objE.getElementsByTagName("td");
          for (var i = 0; i < objID1.length; i++) {
            if (objID1[i].getAttribute("data-id") == id) {
              objID1[i].innerHTML =
                val && val != "-"
                  ? isHB
                    ? (val * 100).toFixed(2) + "%"
                    : val
                  : "-";
            }
          }

          let objID2 = objE.getElementsByTagName("span");
          for (var i = 0; i < objID2.length; i++) {
            if (objID2[i].getAttribute("data-id") == id) {
              objID2[i].innerHTML =
                val && val != "-"
                  ? isHB
                    ? (val * 100).toFixed(2) + "%"
                    : val
                  : "-";
            }
          }
        }
        this.mainData[index].content = objE.innerHTML;
        if (ele.displayType == "1") {
          this.$refs["ue" + index][0].resetContent(objE.innerHTML);
        } else {
        }
      });
    },
    changeTimeData(i1, i2, i3, val, id, type) {
      let isDisabledNew = false;
      if (
        this.tables[i1].tableData[i2].length > 0 &&
        this.tables[i1].tableData[i2][0].isDisabled
      ) {
        isDisabledNew = true;
      }
      if (this.tabelType[i1] == "1") {
        //if (this.tables[i1].tableData.length - 2 == i2) {
        let a = val;
        let trArr = this.tables[i1].tableData[i2];
        let b = 0,
          count = "";
        for (var i = 0; i < trArr.length; i++) {
          if (trArr[i].class == "type4" || trArr[i].class == "type4 hidden") {
            b = trArr[i].val;
          }
        }
        if (a && a.indexOf("%") != -1) {
          a = parseFloat(a.replace(/%/g, "")) * 100;
        }
        if (b && b.indexOf("%") != -1) {
          b = parseFloat(b.replace(/%/g, "")) * 100;
        }
        a = a ? (parseFloat(a) ? parseFloat(a) : 0) : 0;
        b = b ? (parseFloat(b) ? parseFloat(b) : 0) : 0;
        let tt2 = new Function("a", "b", "{return " + this.operateFun + "}");
        let c;
        if (this.operateFun == "(a/b)*100%") {
          c = b ? a / b : "";
        } else {
          c = tt2(a, b);
        }
        c = c == Infinity ? 1 : c == -Infinity ? -1 : c;
        c = c || c == 0 ? c.toFixed(2) : "";
        if (this.operateFun == "(a/b)*100%") {
          c = c ? (c * 100).toFixed(2) + "%" : "";
        }
        if (a && b && (a - b) / b > 0.3) {
          this.$Message.warning("较上一次记录超30%！");
        }
        let id1 = "";
        if (i2 < this.tables[i1].tableData.length - 1) {
          let arr = this.tables[i1].tableData[i2 + 1];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].class == "type2") {
              this.tables[i1].tableData[i2 + 1][i].val = c;
              id1 = this.tables[i1].tableData[i2 + 1][i].id;
            }
          }
        }
        if (isDisabledNew) {
          val = "-";
          c = "-";
        }

        this.renderMB(id, val);
        this.renderMB(id1, c);
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
            if (a && a.indexOf("%") != -1) {
              a = parseFloat(a.replace(/%/g, "")) * 100;
            }
            if (b && b.indexOf("%") != -1) {
              b = parseFloat(b.replace(/%/g, "")) * 100;
            }
            a = a ? (parseFloat(a) ? parseFloat(a) : 0) : 0;
            b = b ? (parseFloat(b) ? parseFloat(b) : 0) : 0;
            let tt2 = new Function(
              "a",
              "b",
              "{return " + this.operateFun + "}"
            );
            if (this.operateFun == "(a/b)*100%") {
              c = b ? a / b : "";
            } else {
              c = tt2(a, b);
            }
            c = c == Infinity ? 1 : c == -Infinity ? -1 : c;
            c = c || c == 0 ? c.toFixed(2) : "";
            if (this.operateFun == "(a/b)*100%") {
              c = c ? (c * 100).toFixed(2) + "%" : "";
            }
            if (a && b && (a - b) / b > 0.3) {
              this.$Message.warning("较上一次记录超30%！");
            }
            if (isDisabledNew) {
              c = "-";
            }
            this.tables[i1].tableData[i2][count].val = c;
          }
        }
        let trArr = this.tables[i1].tableData,
          sum = 0;
        for (var i = 0; i < trArr.length - 1; i++) {
          for (var j = 0; j < trArr[i].length; j++) {
            if (trArr[i][j].class == "type1") {
              sum += trArr[i][j].val
                ? parseFloat(trArr[i][j].val)
                  ? parseFloat(trArr[i][j].val)
                  : 0
                : 0;
            }
          }
        }
        let arr1 = this.tables[i1].tableData[
            this.tables[i1].tableData.length - 1
          ],
          id2 = "",
          id3 = "";
        let a1 = sum,
          b1 = 0,
          c1 = 0;
        let sum1Arr = [],
          sumIds = [];
        for (var i = 0; i < arr1.length; i++) {
          if (arr1[i].class == "type5") {
            b1 = arr1[i].val;
          }
          if (arr1[i].class == "type2") {
            if (this.operateFun && this.operateFun != "-") {
              id3 = id2 ? arr1[i].id : "";
              id2 = id2 ? id2 : arr1[i].id;
              if (id2 && !id3) {
                arr1[i].val = sum;
                arr1[i].isSum = true;
              }
              if (id2 && id3) {
                if (a1 && a1.indexOf("%") != -1) {
                  a1 = parseFloat(a1.replace(/%/g, "")) * 100;
                }
                if (b1 && b1.indexOf("%") != -1) {
                  b1 = parseFloat(b1.replace(/%/g, "")) * 100;
                }
                a1 = a1 ? (parseFloat(a1) ? parseFloat(a1) : 0) : 0;
                b1 = b1 ? (parseFloat(b1) ? parseFloat(b1) : 0) : 0;
                let tt1 = new Function(
                  "a",
                  "b",
                  "{return " + this.operateFun + "}"
                );
                if (this.operateFun == "(a/b)*100%") {
                  c1 = b1 ? a1 / b1 : "";
                } else {
                  c1 = tt1(a1, b1);
                }
                c1 = c1 == Infinity ? 1 : c1 == -Infinity ? -1 : c1;
                c1 = c1 || c1 == 0 ? c1.toFixed(2) : "";
                if (this.operateFun == "(a/b)*100%") {
                  c1 = c1 ? (c1 * 100).toFixed(2) + "%" : "";
                }
                arr1[i].val = c1;
              }
            } else {
              let sum1 = 0;
              for (var j = 0; j < trArr.length - 1; j++) {
                let m = i;
                for (var n = 0; n < trArr[j].length; n++) {
                  if (n < i && trArr[j][n].rowspan) {
                    m = i + 1;
                  }
                }
                sum1 += trArr[j][m].val
                  ? parseFloat(trArr[j][m].val)
                    ? parseFloat(trArr[j][m].val)
                    : 0
                  : 0;
              }
              arr1[i].val = sum1;
              arr1[i].isSum = true;
              sumIds.push(arr1[i].id);
              sum1Arr.push(sum1);
            }
          }
        }

        this.mainData.forEach((ele, index) => {
          var objE = document.createElement("div");
          objE.innerHTML = this.mainData[index].content;
          let objID;
          if (objE.getElementsByTagName("td").length > 0) {
            objID = objE.getElementsByTagName("td");
          } else {
            objID = objE.getElementsByTagName("span");
          }
          for (var i = 0; i < objID.length; i++) {
            if (objID[i].getAttribute("data-id") == id) {
              objID[i].innerHTML = val;
            }
            if (objID[i].getAttribute("data-id") == id1) {
              objID[i].innerHTML = (c * 100).toFixed(2) + "%";
            }
            if (objID[i].getAttribute("data-id") == id2) {
              objID[i].innerHTML = sum;
            }
            if (objID[i].getAttribute("data-id") == id3) {
              objID[i].innerHTML = (c1 * 100).toFixed(2) + "%";
            }
            for (var j = 0; j < sumIds.length; j++) {
              if (objID[i].getAttribute("data-id") == sumIds[j]) {
                objID[i].innerHTML = sum1Arr[j];
              }
            }
          }
          this.mainData[index].content = objE.innerHTML;
          if (ele.displayType == "1") {
            this.$refs["ue" + index][0].resetContent(objE.innerHTML);
          } else {
          }
        });
        return;
      }
      if (this.tabelType[i1] == "4") {
        let a = val;
        let arr = this.tables[i1].tableData[i2];
        let b = 0,
          count = "";
        let isHasType2 = false,
          id1 = "",
          val1 = "";
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].class == "type4" || arr[i].class == "type4 hidden") {
            b = type == 1 ? arr[i].section.val1 : arr[i].section.val2;
          }
          if (arr[i].class == "type2") {
            count = i;
            isHasType2 = true;
            id1 = type == 1 ? arr[i].section.id1 : arr[i].section.id2;
          }
        }
        if (isHasType2) {
          if (a == "") {
            if (type == 1) {
              this.tables[i1].tableData[i2][count].section.val1 = 0;
            } else {
              this.tables[i1].tableData[i2][count].section.val2 = 0;
            }
          } else if (b == "") {
            if (type == 1) {
              this.tables[i1].tableData[i2][count].section.val1 = "";
            } else {
              this.tables[i1].tableData[i2][count].section.val2 = "";
            }
          } else {
            if (a && a.indexOf("%") != -1) {
              a = parseFloat(a.replace(/%/g, "")) * 100;
            }
            if (b && b.indexOf("%") != -1) {
              b = parseFloat(b.replace(/%/g, "")) * 100;
            }
            a = a ? (parseFloat(a) ? parseFloat(a) : 0) : 0;
            b = b ? (parseFloat(b) ? parseFloat(b) : 0) : 0;
            var c = a - b;
            c = c || c == 0 ? c.toFixed(2) : "";
            if (isDisabledNew) {
              c = "-";
            }
            if (type == 1) {
              this.tables[i1].tableData[i2][count].section.val1 = c;
            } else {
              this.tables[i1].tableData[i2][count].section.val2 = c;
            }
            val1 = c;
            if (b && c && c / b > 0.3) {
              this.$Message.warning("较上一次记录超30%！");
            }
          }
        }

        this.mainData.forEach((ele, index) => {
          var objE = document.createElement("div");
          objE.innerHTML = this.mainData[index].content;
          let objID = objE.getElementsByTagName("td");
          for (var i = 0; i < objID.length; i++) {
            let objSpan = objID[i].getElementsByTagName("span")[type - 1];
            if (objSpan) {
              if (
                objSpan.getAttribute("data-min") == id ||
                objSpan.getAttribute("data-max") == id
              ) {
                objSpan.innerHTML = val;
              }
              if (
                objSpan.getAttribute("data-min") == id1 ||
                objSpan.getAttribute("data-max") == id1
              ) {
                objSpan.innerHTML = val1;
              }
            }
          }
          this.mainData[index].content = objE.innerHTML;
          if (ele.displayType == "1") {
            this.$refs["ue" + index][0].resetContent(objE.innerHTML);
          } else {
          }
        });

        return;
      }
      if (this.tabelType[i1] == "5") {
        let trArr = this.tables[i1].tableData;
        for (var i = 0; i < trArr.length; i++) {
          for (var j = 0; j < trArr[i].length; j++) {
            let base = trArr[i][j].ruleBase
              ? trArr[i][j].ruleBase.split(",")
              : [];
            if (
              trArr[i][j].class == "type2" &&
              base.indexOf("id_" + id) != -1
            ) {
              this.countRender(i1, i, j, trArr[i][j].id);
            }
          }
        }
        this.renderMB(id, val, false);
        return;
      }
      let a = val;
      let arr = this.tables[i1].tableData[i2];
      let b = 0,
        count = "";
      let isHasType2 = false,
        id1 = "",
        val1 = "";
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
          this.tables[i1].tableData[i2][count].val = isDisabledNew ? "-" : 0;
          val1 = "";
        } else if (b == "") {
          this.tables[i1].tableData[i2][count].val = isDisabledNew ? "-" : "";
          val1 = "";
        } else {
          if (a && a.indexOf("%") != -1) {
            a = parseFloat(a.replace(/%/g, "")) * 100;
          }
          if (b && b.indexOf("%") != -1) {
            b = parseFloat(b.replace(/%/g, "")) * 100;
          }
          a = a ? (parseFloat(a) ? parseFloat(a) : 0) : 0;
          b = b ? (parseFloat(b) ? parseFloat(b) : 0) : 0;
          var c = a - b;
          c = c || c == 0 ? c.toFixed(2) : "";
          this.tables[i1].tableData[i2][count].val = c;
          val1 = c;
          if (b && c && c / b > 0.3) {
            this.$Message.warning("较上一次记录超30%！");
          }
        }
      }
      if (isDisabledNew) {
        val = "-";
        val1 = "-";
      }
      if (id) {
        this.renderMB(id, val);
      }
      if (id1) {
        this.renderMB(id1, val1);
      }
    },
    closeInput(tindex, index, throws) {
      let arr = this.tables[tindex].tableData[index];
      let hasMemo = false;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].class == "type3") {
          hasMemo = arr[i].val ? true : false;
        }
      }
      if (hasMemo) {
        arr[0].isChecked = false;
        for (var i = 0; i < arr.length; i++) {
          arr[i].isDisabled = true;
          if (arr[i].class == "type1") {
            if (this.tabelType[tindex] == "4") {
              arr[i].section.val1 = "-";
              arr[i].section.val2 = "-";
              this.changeTimeData(tindex, index, i, "", arr[i].section.id1, 1);
              this.changeTimeData(tindex, index, i, "", arr[i].section.id2, 3);
            } else {
              arr[i].val = "-";
              this.changeTimeData(tindex, index, i, "", arr[i].id);
            }
          }
          if (arr[i].class == "type3") {
            // arr[i].val = "";
            // if (this.tabelType[tindex] == "5") {
            //   this.renderMB(arr[i].id, "");
            // } else {
            //   let type3Arr = this.tables[tindex],
            //     cn = 0;
            //   for (var m = 0; m < type3Arr.length; m++) {
            //     for (var n = 0; n < type3Arr[m].length; n++) {
            //       if (m == index && n == i) {
            //         this.mainData.forEach((ele, index) => {
            //           var objE = document.createElement("div");
            //           objE.innerHTML = this.mainData[index].content;
            //           var myNodeList = objE.getElementsByTagName("table");
            //           if (myNodeList.length == 0) {
            //             objE.getElementsByClassName("type3")[cn].innerHTML = val;
            //           } else {
            //             myNodeList[tindex].getElementsByClassName("type3")[
            //               cn
            //             ].innerHTML = val;
            //           }
            //           this.mainData[index].content = objE.innerHTML;
            //           if (ele.displayType == "1") {
            //             this.$refs["ue" + index][0].resetContent(objE.innerHTML);
            //           } else {
            //           }
            //         });
            //       }
            //       if (type3Arr[m][n].class == "type3") {
            //         cn++;
            //       }
            //     }
            //   }
            // }
          }
        }
        this.publishClose(tindex, index);
      } else {
        this.$Modal.error({
          title: "提示",
          content: "备注不能为空！"
        });
      }
    },
    openInput(tindex, index) {
      let trEle = this.tables[tindex].tableData[index];
      for (var i = 0; i < trEle.length; i++) {
        trEle[i].isDisabled = false;
      }
    },
    copyLastDayInfo() {
      for (var i = 0; i < this.tables.length; i++) {
        if (this.tabelType[i] == "5") {
          let trArr = this.tables[i].tableData;
          for (var i1 = 0; i1 < trArr.length; i1++) {
            for (var j = 0; j < trArr[i1].length; j++) {
              if (
                trArr[i1][j].class == "type1" &&
                trArr[i1][j].rule == "copy"
              ) {
                this.countRender(i, i1, j, trArr[i1][j].id);
              }
            }
          }
        } else {
          for (var j = 0; j < this.tables[i].tableData.length; j++) {
            let arr = this.tables[i].tableData[j],
              type1Index = "",
              newVal = 0,
              id = "",
              hasType4 = false;
            if (!arr[0].isDisabled) {
              for (var n = 0; n < arr.length; n++) {
                if (arr[n].class == "type1") {
                  type1Index = n;
                  id = arr[n].id;
                }
                if (arr[n].class == "type4") {
                  newVal = arr[n].val;
                  hasType4 = true;
                }
              }
              if (type1Index && hasType4) {
                arr[type1Index].val = newVal;
                this.changeTimeData(i, j, type1Index, newVal, id);
              }
            }
          }
        }
        let tbArr = this.tables[i].tableData;
        for (var n = 0; n < tbArr.length; n++) {
          let code = "",
            isFirstCode = true,
            type3Index = "",
            id = "";
          for (var j = 0; j < tbArr[n].length; j++) {
            if (tbArr[n][j].class == "type3") {
              type3Index = j;
              id = tbArr[n][j].id;
            }
            if (
              tbArr[n][j].class == "type1" ||
              (tbArr[n][j].class == "type2" && isFirstCode)
            ) {
              code = tbArr[n][j].id;
              isFirstCode = false;
            }
          }
          if (code) {
            this.descFun(i, n, type3Index, code, id);
          }
        }
      }
    },
    descFun(tIndex, index, type3Index, code, id) {
      let params = {
        code: code
      };
      getLastDesc(formData(params)).then(res => {
        let val = res.status && res.status == "200" ? res.response : "";
        this.tables[tIndex].tableData[index][type3Index].val = val;
        this.renderMB(id, val, false);
      });
    },
    editArticlePersonFunction(obj) {
      var that = this;
      that.mainData.forEach(function(ele, index) {
        if (obj.index == index) {
          if (obj.data) {
            ele.publisherName = obj.data.label;
            ele.publisherId = obj.data.value;
            that.$refs["editArticlePersonRef" + index][0].$el.className = "";
          } else {
            ele.publisherName = "";
            ele.publisherId = "";
            that.$Message.info("文章发布人不能为空");
            that.$refs["editArticlePersonRef" + index][0].$el.className =
              "selectWarning";
          }
        }
      });
    },
    initData() {
      this.$Spin.show();
      let params = {
        informationUnitId: this.rowList.informationUnitId
      };
      var that = this;
      showPublishPage(formData(params)).then(res => {
        that.mainData = res.response;
        that.mainData.forEach(function(ele, index) {
          if (ele.displayType == 1) {
            that.$nextTick(() => {
              that.$refs["editArticlePersonRef" + index][0].getData(
                ele.publisherName
              );
            });
            // 信息来源开始
            if (ele.siteId == 2) {
              if (ele.source == "" || ele.source == null) {
                ele.source = "Oilchem";
              }
            }
            // 信息来源结束
          }
        });
        that.$Spin.hide();
      });
    },
    tabChange() {
      this.$router.push({
        name: "textEditStyle",
        query: {
          item: this.$route.query.item
        }
      });
    },
    showMessageTips(val, index) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var that = this;
      that.mainData.forEach(function(ele, Index) {
        if (index == Index) {
          if (!val && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            });
            that.$Message.info("短信内容不能为空");
          } else if (val.length > 360 && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            });
            that.$Message.info("短信内容字数超过限制，不能超过360个字");
          } else {
            that.$nextTick(() => {
              if (checkSensitive(val)) {
                that.$Message.info({
                  content: "短信内容" + checkSensitive(val),
                  duration: 3
                });
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = tempWarning;
              } else {
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = afterWarning;
              }
            });
          }
        }
      });
    },
    showFlashTips(val, index) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      var that = this;
      that.mainData.forEach(function(ele, Index) {
        if (index == Index) {
          if (!val && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            });
            that.$Message.info("短讯通内容不能为空");
          } else if (val.length > 1000 && ele.publishStatus) {
            that.$nextTick(() => {
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            });
            that.$Message.info("短讯通内容字数超过限制，不能超过1000个字");
          } else {
            if (checkSensitive(val)) {
              that.$Message.info({
                content: "短讯通内容" + checkSensitive(val),
                duration: 3
              });
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            } else {
              that.$refs[
                "flashContent" + index
              ][0].$el.className = afterWarning;
            }
          }
        }
      });
    },
    contentChange(obj) {
      var that = this;
      that.mainData.forEach(function(ele, Index) {
        if (obj.index == Index) {
          if (!obj.content && ele.publishStatus) {
            that.$Message.info("文章内容不能为空");
            that.$refs["ue" + Index][0].$el.className = "ueWarning";
          } else {
            if (checkSensitive(obj.content)) {
              that.$Message.info({
                content: "文章内容" + checkSensitive(obj.content),
                duration: 3
              });
              that.$refs["ue" + Index][0].$el.className = "ueWarning";
            } else {
              that.$refs["ue" + Index][0].$el.className = "";
            }
          }
        }
      });
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
        this.$refs.messageModal.showMessageInfo(row);
      } else {
        this.$refs.flashModal.showModal();
        this.$refs.flashModal.showFlashInfo(row);
      }
    },
    showMessageModal(row) {
      this.$refs.messageModal.showModal();
      this.$refs.messageModal.showMessageInfo(row);
    },
    showFlashModal(row) {
      this.$refs.flashModal.showModal();
      this.$refs.flashModal.showFlashInfo(row);
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
    },
    hideFlashModal() {
      this.$refs.flashModal.hideModal();
    },
    showTips(type, val, index) {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type";
      if (!val) {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              this.$refs["title" + index][0].$el.className = tempWarning;
            });
            this.$Message.info("文章标题不能为空");
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source" + index][0].$el.className = tempWarning;
            });
            this.$Message.info("文章信息来源不能为空");
            break;
          case "flashTitle":
            this.$nextTick(() => {
              this.$refs["flashTitle" + index][0].$el.className = tempWarning;
            });
            this.$Message.info("短讯通标题不能为空");
            break;
          case "keyword":
          case "summary":
            this.$refs[type + index][0].$el.className = afterWarning;
          default:
            break;
        }
      } else {
        switch (type) {
          case "title":
            this.$nextTick(() => {
              if (checkSensitive(val)) {
                this.$refs["title" + index][0].$el.className = tempWarning;
                this.$Message.info({
                  content: "文章标题" + checkSensitive(val),
                  duration: 3
                });
              } else {
                this.$refs["title" + index][0].$el.className = afterWarning;
              }
            });
            break;
          case "source":
            this.$nextTick(() => {
              this.$refs["source" + index][0].$el.className = afterWarning;
            });
            break;
          case "flashTitle":
            this.$nextTick(() => {
              if (checkSensitive(val)) {
                this.$refs["flashTitle" + index][0].$el.className = tempWarning;
                this.$Message.info({
                  content: "短讯通标题" + checkSensitive(val),
                  duration: 3
                });
              } else {
                this.$refs[
                  "flashTitle" + index
                ][0].$el.className = afterWarning;
              }
            });
            break;
          case "keyword":
          case "summary":
            let text = type === "keyword" ? "文章关键词" : "文章摘要";

            if (checkSensitive(val)) {
              this.$nextTick(() => {
                this.$refs[type + index][0].$el.className = tempWarning;
                this.$Message.info({
                  content: text + checkSensitive(val),
                  duration: 3
                });
              });
            } else {
              this.$refs[type + index][0].$el.className = afterWarning;
            }
            break;
          default:
            break;
        }
      }
    },
    save() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type",
        that = this,
        flagList = [],
        isOk = true;

      that.mainData.forEach(function(ele, index) {
        if (ele.displayType == 1) {
          ele.content = that.$refs["ue" + index][0].getUEContent();
          if (!ele.title && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，文章标题不能为空");
            that.$nextTick(() => {
              that.$refs["title" + index][0].$el.className = tempWarning;
            });
          } else if (
            !that.$refs["ue" + index][0].getUEContent() &&
            ele.publishStatus
          ) {
            that.$Message.info("第" + (index + 1) + "个单元，文章内容不能为空");
            that.$refs["ue" + index][0].$el.className = "ueWarning";
          } else if (!ele.source && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章信息来源不能为空"
            );
            that.$nextTick(() => {
              that.$refs["source" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.publisherId && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章发布人不能为空"
            );
            that.$refs["editArticlePersonRef" + index][0].$el.className =
              "selectWarning";
          } else {
            //文章标题校验敏感词
            if (checkSensitive(ele.title)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章标题" +
                  checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["title" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["ue" + index][0].$el.className = "ueWarning";
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章关键词校验敏感词
            if (checkSensitive(ele.keyword)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章关键词" +
                  checkSensitive(ele.keyword),
                duration: 3
              });
              that.$refs["keyword" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["keyword" + index][0].$el.className = afterWarning;
            }

            //文章摘要校验敏感词
            if (checkSensitive(ele.summary)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章摘要" +
                  checkSensitive(ele.summary),
                duration: 3
              });
              that.$refs["summary" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["summary" + index][0].$el.className = afterWarning;
            }

            that.$refs["source" + index][0].$el.className = afterWarning;
            that.$refs[
              "editArticlePersonRef" + index
            ][0].$el.className = afterWarning;

            if (isOk) {
              flagList.push(true);
            }
          }
        } else if (ele.displayType == 2) {
          if (!ele.content && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，短信内容不能为空");
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 360 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短信内容已超过360字的字数限制"
            );
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else {
            //短信内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，短信内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = afterWarning;
              });

              flagList.push(true);
            }
          }
        } else {
          if (!ele.title && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通标题不能为空"
            );
            that.$nextTick(() => {
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.content && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容不能为空"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 1000 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容已超过1000字的字数限制"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else {
            //短讯通内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "短讯通内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            } else if (checkSensitive(ele.title)) {
              //短讯通标题校验敏感词
              isOk = false;
              that.$Message.info({
                content:
                  "第" + (index + 1) + "短讯通标题" + checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "flashTitle" + index
                ][0].$el.className = afterWarning;
                that.$refs[
                  "flashContent" + index
                ][0].$el.className = afterWarning;
              });
              flagList.push(true);
            }
          }
        }
      });

      if (!isOk) {
        return false;
      }

      if (flagList.length == that.mainData.length) {
        //加上一个状态表示从暂存状态预览
        for (let one of that.mainData) {
          one.status = 0;
        }
        let params = {
          contents: that.$escapeHTMLString(JSON.stringify(that.mainData))
        };
        that.isSave = true;
        axios({
          url: "/information/unit/save_message",
          method: "post",
          data: formData(params)
        })
          .then(res => {
            if (res.data.message === "OK" || res.data.status === "200") {
              that.$Message.info("保存成功");
              that.$router.push({ name: "myInformationUnit" });
            } else {
              that.isSave = false;
              that.$Message.error(res.data.message);
            }
          })
          .catch(err => {
            that.isSave = false;
          });
      }
    },
    preview() {
      var tempWarning = "input ivu-input-wrapper ivu-input-type warning",
        afterWarning = "input ivu-input-wrapper ivu-input-type",
        that = this,
        flagList = [],
        isALlNone = true,
        isOk = true;

      that.mainData.forEach(function(ele, index) {
        if (ele.publishStatus) {
          isALlNone = false;
        }
        if (ele.displayType == 1) {
          ele.content = that.$refs["ue" + index][0].getUEContent();
          if (!ele.title && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，文章标题不能为空");
            that.$nextTick(() => {
              that.$refs["title" + index][0].$el.className = tempWarning;
            });
          } else if (
            !that.$refs["ue" + index][0].getUEContent() &&
            ele.publishStatus
          ) {
            that.$Message.info("第" + (index + 1) + "个单元，文章内容不能为空");
            that.$refs["ue" + index][0].$el.className = "ueWarning";
          } else if (!ele.source && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章信息来源不能为空"
            );
            that.$nextTick(() => {
              that.$refs["source" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.publisherId && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，文章发布人不能为空"
            );
            that.$refs["editArticlePersonRef" + index][0].$el.className =
              "selectWarning";
          } else {
            //文章标题校验敏感词
            if (checkSensitive(ele.title)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章标题" +
                  checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["title" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["ue" + index][0].$el.className = "ueWarning";
            } else {
              that.$refs["ue" + index][0].$el.className = afterWarning;
            }

            //文章关键词校验敏感词
            if (checkSensitive(ele.keyword)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章关键词" +
                  checkSensitive(ele.keyword),
                duration: 3
              });
              that.$refs["keyword" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["keyword" + index][0].$el.className = afterWarning;
            }

            //文章摘要校验敏感词
            if (checkSensitive(ele.summary)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，文章摘要" +
                  checkSensitive(ele.summary),
                duration: 3
              });
              that.$refs["summary" + index][0].$el.className = tempWarning;
            } else {
              that.$refs["summary" + index][0].$el.className = afterWarning;
            }

            if (isOk) {
              flagList.push(true);
            }
          }
        } else if (ele.displayType == 2) {
          if (!ele.content && ele.publishStatus) {
            that.$Message.info("第" + (index + 1) + "个单元，短信内容不能为空");
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 360 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短信内容已超过360字的字数限制"
            );
            that.$refs["messageContent" + index][0].$el.className = tempWarning;
          } else {
            //短信内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "个单元，短信内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs[
                "messageContent" + index
              ][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "messageContent" + index
                ][0].$el.className = afterWarning;
              });


              flagList.push(true);
            }
          }
        } else {
          if (!ele.title && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通标题不能为空"
            );
            that.$nextTick(() => {
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            });
          } else if (!ele.content && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容不能为空"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else if (ele.content.length > 1000 && ele.publishStatus) {
            that.$Message.info(
              "第" + (index + 1) + "个单元，短讯通内容已超过1000字的字数限制"
            );
            that.$refs["flashContent" + index][0].$el.className = tempWarning;
          } else {
            //短讯通内容校验敏感词
            if (checkSensitive(ele.content)) {
              isOk = false;
              that.$Message.info({
                content:
                  "第" +
                  (index + 1) +
                  "短讯通内容" +
                  checkSensitive(ele.content),
                duration: 3
              });
              that.$refs["flashContent" + index][0].$el.className = tempWarning;
            } else if (checkSensitive(ele.title)) {
              //短讯通标题校验敏感词
              isOk = false;
              that.$Message.info({
                content:
                  "第" + (index + 1) + "短讯通标题" + checkSensitive(ele.title),
                duration: 3
              });
              that.$refs["flashTitle" + index][0].$el.className = tempWarning;
            } else {
              that.$nextTick(() => {
                that.$refs[
                  "flashTitle" + index
                ][0].$el.className = afterWarning;
                that.$refs[
                  "flashContent" + index
                ][0].$el.className = afterWarning;
              });
              flagList.push(true);
            }
          }
        }
      });
      
      if (!isOk) {
        return;
      }

      if (isALlNone) {
        that.$Message.info("没有可发布的信息单元！");
      } else if (
        flagList.length == that.mainData.length &&
        flagList.length > 0
      ) {
        let params = {
          contents: that.$escapeHTMLString(JSON.stringify(that.mainData))
        };

        //加上一个状态表示从修改状态预览
        for (let one of that.mainData) {
          one.status = 0;
        }

        that.isPreview = true;
        axios({
          url: "/information/unit/save_message",
          method: "post",
          data: formData(params)
        })
          .then(res => {
            if (res.data.message === "OK" || res.data.status === "200") {
              that.mainData.forEach(function(item) {
                if (item.publishStatus) {
                  localStorage.setItem(
                    "data",
                    JSON.stringify(res.data.response)
                  );
                  that.$router.push({
                    name: "previewList"
                  });
                }
              });
            } else {
              that.isPreview = false;
              that.$Message.error(res.data.message);
            }
          })
          .catch(err => {
            that.isPreview = false;
          });
      }
    },
    cancel() {
      this.$router.push({
        name: "myInformationUnit",
        query: {
          item: JSON.stringify(this.rowList)
        }
      });
    },
    handleSuccess(res, file) {
      this.mainData.forEach(function(ele, index) {
        if (res.response.index == index) {
          ele.titlePictureUrl = res.response.url;
        }
      });
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "提示",
        desc: "上传图片大小不得超过 5M"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../taskplant/taskplant.less";
.changePages {
  font-size: 0;
  margin-bottom: 10px;
}
.btnformstyle {
  padding: 6px 50px;
  border: 1px solid #427fe9;
  color: #427fe9;
  cursor: pointer;
  font-size: 14px;
}
.btnformstyle.tab-active {
  background-color: #427fe9;
  color: #fff;
}
.btneditstyle {
  padding: 6px 50px;
  border: 1px solid #427fe9;
  color: #427fe9;
  cursor: pointer;
  font-size: 14px;
}
.btneditstyle.tab-active {
  background-color: #427fe9;
  color: #fff;
}
.btn-modal {
  line-height: 58px;
}
.btn-modal button {
  border: 1px solid #427fe9;
  background-color: #fff;
  color: #427fe9;
  margin-left: 10px;
}
.table-2 {
  margin-bottom: 20px;
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
.input_upload {
  width: 200px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.laiyuan {
  width: 250px;
}
.pailie {
  overflow: hidden;
}
.btn-diaoyong button {
  border: 1px solid #427fe9;
  background-color: #fff;
  color: #427fe9;
  margin-right: 10px;
  margin-bottom: 10px;
}
.btn-dibu {
  text-align: center;
}
.btn-dibu button {
  border: 1px solid #427fe9;
  background-color: #427fe9;
  color: #fff;
  margin-right: 10px;
  padding: 5px 50px;
}
.unit_title.jibenxinxi {
  margin-top: -20px;
  text-align: left;
}
.header1 {
  font-size: 14px;
}
.publishedList {
  margin-bottom: 30px;
}
.publishedbtn {
  margin-bottom: 20px;
}
.checkStatus {
  position: absolute;
  top: 50%;
  right: 2%;
}
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
.table-content table td {
  border: 1px solid #eee;
  height: 20px;
  padding: 3px 5px;
}
.table-content table input {
  border: 1px solid #ddd;
}

.ueWarning {
  border: 1px solid red;
}

.table-content .hidden {
  display: none;
}
.infor-table-input {
  width: 45%;
  float: left;
}
.infor-table-line {
  width: 10%;
  text-align: center;
  float: left;
}
.red {
  color: #df5138;
}
.green {
  color: #8cc474;
}
.checkbox {
  width: 15px;
  height: 15px;
}
</style>



