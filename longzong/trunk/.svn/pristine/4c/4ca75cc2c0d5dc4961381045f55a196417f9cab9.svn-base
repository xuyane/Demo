<style lang="less" scoped>
.fx-boxs {
  min-height: 40px;
  width: 84%;
  z-index: 100;
  max-height: 275px;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #f1f1f1;
  margin-bottom: 10px;
  margin-top: -5px;
  margin-left: 140px;
  border-radius: 4px;
}
.fx-boxs li {
  padding: 5px 15px;
}
.fx-box li:hover {
  background: #c1c1c1;
}
.read-table {
  border: 1px solid #bfbfbf;
  width: 100%;
  text-align: center;
  line-height: 50px;
  border-collapse: collapse;
}
.read-table td {
  border: 1px solid #bfbfbf;
}
.read-table .table-left {
  width: 40%;
  text-align: center;
  // border-right: 1px solid #BFBFBF;
  background-color: #e9eaef;
}
.read-table .table-right {
  width: 60%;
  text-align: left;
  padding-left: 15px;
}
</style>
<template>
  <Row>
    <Col span="24">
      <Row class-name="current-position">
        <!-- 当前位置：网站管理&nbsp;&nbsp;>>&nbsp;&nbsp;栏目管理&nbsp;&nbsp;>>&nbsp;&nbsp;栏目列表
         -->
         当前位置：
         <router-link to="/plantIndex" class="link-css">网站管理</router-link>
         &nbsp;&nbsp;>>&nbsp;&nbsp;
         <router-link to="/columnManagement" class="link-css">栏目管理</router-link>
         &nbsp;&nbsp;>>&nbsp;&nbsp;
         <router-link to="/columnManagement" class="link-css">栏目列表</router-link>
      </Row>
    </Col>
    <Col span="24">
      <Row :gutter="20">
        <Col span="4">
          <div class="leftree">
            <Card :bordered="true">
              <p slot="title">频道列表</p>
              <div>
                <Tree :data="treeData" @on-select-change="findlist" :load-data="loadTree"></Tree>
              </div>
            </Card>
          </div>
        </Col>
        <Col span="20">
          <Row class-name="table-con">
            <Col span="24">
              <Form :model="params" :label-width="120">
                <Row type="flex" justify="space-between">
                  <Col span="7">
                    <FormItem label="栏目名称：">
                      <Input v-model="params.name" class="search-input" placeholder="请输入栏目名称"></Input>
                    </FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem label="是否绑定标签：">
                      <Select v-model="params.isLabelId" class="search-input" placeholder="全部">
                        <Option
                          v-for="item in isBindLableList"
                          :value="item.value"
                          :key="item.value"
                        >{{ item.label}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="7">
                    <FormItem label="状态：">
                      <Select v-model="params.status" class="search-input" placeholder="全部">
                        <Option
                          v-for="item in selectStatus"
                          :value="item.value"
                          :key="item.value"
                        >{{ item.label}}</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="space-between">
                  <Col span="7"></Col>
                  <Col span="7"></Col>
                  <Col span="7" class="text-right">
                    <Button type="primary" @click="search">查询</Button>
                    <Button style="margin-left: 8px" @click="reset">重置</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <div style="margin-bottom:20px">
              <Button type="primary" @click="addColumns">新增</Button>
            </div>
            <Table
              class="tableCommon"
              :data="tableData"
              :columns="columns"
              :stripe="true"
              :border="true"
            ></Table>
            <oil-page
              :total="total"
              :page-num="params.pageNum"
              :page-size="params.pageSize"
              @page-change="pageChange"
              :page-size-opts="pageSizeOpts"
              :show-sizer="showSizer"
            ></oil-page>
          </Row>
        </Col>
      </Row>
    </Col>
    <!-- 新增 -->
    <Modal v-model="addModal" title="新增栏目" width="650" :styles="{top: '20px'}">
      <Form :label-width="130" ref="addForm" :rules="addRoles" :model="addForm">
        <Row>
          <FormItem label="上级频道：">
            <span>{{changePre ? changePre : '无'}}</span>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="栏目名称：" prop="name">
            <Input type="text" class="search-input" placeholder="请输入栏目名称" v-model="addForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="英文名：" prop="nameForeigns">
            <Input
              type="text"
              class="search-input"
              placeholder="请输入英文名"
              v-model="addForm.nameForeigns"
            />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="栏目类型：">
            <Select v-model="addForm.type" class="search-input" placeholder="其他">
              <Option v-for="item in nameType" :value="item.id" :key="item.id">{{item.text}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="记录数：" prop="recordNumber">
              <Input-number
                :max="99"
                :min="1"
                v-model="addForm.recordNumber"
                class="search-input"
                style="width: 178px"
              ></Input-number>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="顺序数：" prop="AddAppNumber">
              <Input-number
                :max="999"
                :min="1"
                v-model="addForm.appNumber"
                class="search-input"
                style="width: 178px"
              ></Input-number>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="是否需要授权：">
              <Select v-model="addForm.isNeedAuthorized" class="search-input" transfer>
                <Option
                  v-for="(item, index) in isNeedAuthorizedList"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <FormItem label="URL地址：" prop="url">
            <Input type="text" class="search-input" placeholder="请输入URL地址" v-model="addForm.url"/>
          </FormItem>
        </Row>
        <Row>
          <Col span="24">
            <Row>
              <Col span="18">
                <FormItem label="模板：">
                  <Input type="text" class="search-input" readonly v-model="templateName"/>
                </FormItem>
              </Col>
              <Col span="6" class="text-right">
                <Button type="primary" @click="concatModal">关联模板</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <FormItem label="列表URL地址：" prop="listUrl">
            <Input
              type="text"
              class="search-input"
              placeholder="请输入列表URL地址"
              v-model="addForm.listUrl"
            />
          </FormItem>
        </Row>
        <Row>
          <Col span="24">
            <Row>
              <Col span="18">
                <FormItem label="列表模板：" prop="listTemplateName">
                  <Input type="text" class="search-input" readonly v-model="listTemplateName"/>
                </FormItem>
              </Col>
              <Col span="6" class="text-right">
                <Button type="primary" @click="concatListModal">关联模板</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <FormItem label="标签：" prop="labelName">
            <Select
              v-model="labelId"
              ref="input4"
              class="search-input"
              filterable
              remote
              transfer
              @on-query-change="emptyQuery"
              :remote-method="remoteMethod2"
              :loading="loading"
            >
              <Option
                v-for="(item, index) in labelNameList"
                :value="item.id"
                :key="index"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <i-button :loading="submitAdd" type="primary" @click="saveColumns">保存</i-button>
        <i-button type="default" @click="cancelColumns(1)">取消</i-button>
      </div>
    </Modal>
    <!-- 查看 -->
    <Modal v-model="readModal" title="查看栏目" :styles="{top: '20px'}" width="650">
      <Row>
        <table class="read-table">
          <tr>
            <td class="table-left">栏目名称</td>
            <td class="table-right">
              <span>{{detail.name}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">英文名</td>
            <td class="table-right">
              <span>{{detail.nameForeigns}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">栏目类型</td>
            <td class="table-right">
              <span>{{this.detailType}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">记录数</td>
            <td class="table-right">
              <span>{{detail.recordNumber}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">顺序数</td>
            <td class="table-right">
              <span>{{detail.appNumber}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">是否需要授权</td>
            <td class="table-right">
              <span>{{this.Authoriz}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">URL地址</td>
            <td class="table-right">
              <span>{{detail.url}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">模板</td>
            <td class="table-right">
              <span>{{this.templateName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">列表URL地址</td>
            <td class="table-right">
              <span>{{detail.listUrl}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">列表模板</td>
            <td class="table-right">
              <span>{{this.listTemplateName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">标签</td>
            <td class="table-right">
              <span>{{this.labelName}}</span>
            </td>
          </tr>
        </table>
      </Row>
      <div slot="footer">
        <i-button type="default" @click="readModal=false">返回</i-button>
      </div>
    </Modal>
    <!-- 修改 -->
    <Modal v-model="modifyModal" title="修改栏目" width="650" :styles="{top: '20px'}">
      <Form :label-width="130" ref="edit" :rules="addRoles" :model="edit">
        <Row>
          <Col span="20">
            <FormItem label="上级频道：">
              <span>{{changePre ? changePre : '无'}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="栏目名称：" prop="name">
              <Input type="text" class="search-input" v-model="edit.name"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="英文名：" prop="nameForeigns">
              <Input
                type="text"
                class="search-input"
                placeholder="请输入英文名"
                v-model="edit.nameForeigns"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="栏目类型：">
              <Select v-model="edit.type" class="search-input" placeholder="全部">
                <Option v-for="item in nameType" :value="item.id" :key="item.id">{{item.text}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="记录数：" prop="recordNumber">
              <Input-number :max="99" :min="1" v-model="edit.recordNumber" style="width:128px;"></Input-number>
              <!-- <Input-number :max="99" :min="1" v-model="edit.recordNumber" style="width: 178px"></Input-number> -->
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="顺序数：" :label-width="80" prop="appNumberValue">
              <Input-number :max="999" :min="1" v-model="edit.appNumber" style="width:128px;"></Input-number>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
            <FormItem label="是否需要授权：">
              <Select v-model="edit.isNeedAuthorized" class="search-input" transfer>
                <Option
                  v-for="(item, index) in isNeedAuthorizedList"
                  :value="item.value"
                  :key="item.value"
                >{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="20">
            <FormItem label="URL地址：" prop="url">
              <Input type="text" class="search-input" v-model="edit.url"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <Row>
              <Col span="18">
                <FormItem label="模板：">
                  <Input
                    type="text"
                    class="search-input"
                    readonly
                    style="color:#123123"
                    v-model="templateName"
                  />
                </FormItem>
              </Col>
              <Col span="6" class="text-right">
                <Button type="primary" @click="concatEditModal">关联模板</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="列表URL地址：" prop="listUrl">
              <Input type="text" class="search-input" v-model="edit.listUrl"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <Row>
              <Col span="18">
                <FormItem label="列表模板：" prop="listTemplateName">
                  <Input
                    type="text"
                    class="search-input"
                    readonly
                    style="color: #131212"
                    v-model="listTemplateName"
                  />
                </FormItem>
              </Col>
              <Col span="6" class="text-right">
                <Button type="primary" @click="concateditListModal">关联模板</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span="20">
            <FormItem label="标签：" prop="labelName">
              <Select
                v-model="labelId"
                ref="inputEdit"
                class="search-input"
                filterable
                remote
                transfer
                :remote-method="remoteMethod3"
                label-in-value
                @on-change="change1"
                :loading="loading"
              >
                <Option
                  v-for="(item, index) in labelNameList2"
                  :value="item.id"
                  :key="index"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-button :loading="submitEdit" type="primary" @click="saveEdit">保存</i-button>
        <i-button type="default" @click="cancelColumns(2)">取消</i-button>
      </div>
    </Modal>
    <!-- 新增关联模板 -->
    <Modal v-model="mouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
              <FormItem label="网站模板名称：" :label-width="110">
                <Input
                  v-model="selectform3.templateName"
                  class="search-input"
                  placeholder="请输入模板名称"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12" class="text-right">
              <Button type="primary" @click="queryForm3">查询</Button>
              <Button @click="templateReset1" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table
          class="tableCommon"
          border
          :columns="columns4"
          :data="dataTable"
          @on-row-click="handleRowChange"
        ></Table>
        <oil-page
          :total="total3"
          :page-num="selectform3.pageNum"
          :page-size="5"
          @page-change="pageChange2"
          :page-size-opts="pageSizeOpts2"
          show-sizer
        ></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(1)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(1);">取消</i-button>
      </div>
    </Modal>
    <!-- 修改关联模板 -->
    <Modal v-model="editmouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
              <FormItem label="网站模板名称：" :label-width="110">
                <Input
                  v-model="selectform5.templateName"
                  class="search-input"
                  placeholder="请输入模板名称"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12" class="text-right">
              <Button type="primary" @click="queryForm5">查询</Button>
              <Button @click="templateReset2" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table
          class="tableCommon"
          border
          :columns="editColumns"
          :data="dataTable5"
          @on-row-click="handleRowChange"
        ></Table>
        <oil-page
          :total="total5"
          :page-num="selectform5.pageNum"
          :page-size="5"
          @page-change="pageChange5"
          :page-size-opts="pageSizeOpts2"
          show-sizer
        ></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(2)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(2)">取消</i-button>
      </div>
    </Modal>
    <!-- 新增关联列表模板 -->
    <Modal v-model="listMouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
              <FormItem label="网站模板名称：" :label-width="110">
                <Input
                  v-model="selectform4.templateName"
                  class="search-input"
                  placeholder="请输入模板名称"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12" class="text-right">
              <Button type="primary" @click="queryForm4">查询</Button>
              <Button @click="templateReset3" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table
          class="tableCommon"
          border
          :columns="columns5"
          :data="dataTable2"
          @on-row-click="handleRowChange"
        ></Table>
        <oil-page
          :total="total4"
          :page-num="selectform4.pageNum"
          :page-size="5"
          @page-change="pageChange3"
          :page-size-opts="pageSizeOpts2"
          show-sizer
        ></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(3)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(3)">取消</i-button>
      </div>
    </Modal>
    <!-- 修改关联列表模板 -->
    <Modal v-model="editlistMouldModal" title="关联模板" :width="700">
      <Row>
        <Form ref="selectModal" :label-width="100">
          <Row type="flex" justify="space-between">
            <Col span="12">
              <FormItem label="网站模板名称：" :label-width="110">
                <Input
                  v-model="selectform6.templateName"
                  class="search-input"
                  placeholder="请输入模板名称"
                ></Input>
              </FormItem>
            </Col>
            <Col span="12" class="text-right">
              <Button type="primary" @click="queryForm6">查询</Button>
              <Button @click="templateReset4" style="margin-left: 20px">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table
          class="tableCommon"
          border
          :columns="editListcolunns"
          :data="dataTable6"
          @on-row-click="handleRowChange"
        ></Table>
        <oil-page
          :total="total6"
          :page-num="selectform6.pageNum"
          :page-size="5"
          @page-change="pageChange6"
          :page-size-opts="pageSizeOpts2"
          show-sizer
        ></oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveMouldModal(4)">保存</i-button>
        <i-button type="default" @click="cancelMouldModal(4)">取消</i-button>
      </div>
    </Modal>
    <!-- 编辑标签开始 -->
        <Modal v-model="editModal" title="修改标签" width="850" :styles="{top: '20px'}"> 
        <Form :label-width="100" ref="editFormValidate" :rules="editruleValidate" :model="editparams2">
          <Row>
            <Col class="text-right">
            <span>一共关联{{editparams2.labelInformationList.length}}条信息单元</span>  
            </Col> 
          </Row> 
          <Row>
            <FormItem label="标签名称：" prop="name">
              <Input type="text" class="search-input"  placeholder="请输入标签名称" v-model="editparams2.name"/>
            </FormItem>  
          </Row>   
          <Row>
            <Col span="24">
              <Row>
                <Col span="18">
                  <FormItem label="信息单元：" >
                    <Select
                      v-model="selectName1"
                      ref="unit1"
                      filterable
                      remote  
                      transfer
                      label-in-value
                      @on-change="typeChange1"
                      @on-query-change="queryChange1"
                      :remote-method="searchclassfylist1"
                      :loading="loading">
                      <Option v-for="(option, index) in editclassList" :value="option.id" :key="index">{{option.text}}</Option>
                    </Select>
                  </FormItem>  
                </Col>
                <Col span="6" class="text-right">
                  <Button type="primary" @click="chooseTableInfo">选择信息单元</Button>
                </Col>
                <Col span="24">
                  <ul class="fx-boxs" id="fxBox" style="margin-left:100px;">
                    <li v-for="(item,index) in editparams2.labelInformationList">
                      <p v-model="item.infornamtionUnitName">{{item.infornamtionUnitName}}<b class="icon-delete pull-right" style="margin-right:35px" @click="removeCheck22(index)"></b></p>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>        
        </Form>
      <div slot="footer">
        <i-button type="primary" @click="saveEditUnit('editFormValidate')">保存</i-button>
        <i-button type="default" @click="editCancel()">取消</i-button>
      </div>
    </Modal>
        <!-- 关联信息单元开始 -->
    <Modal v-model="infoUnitModal" title="关联信息单元" :width="850">
      <Row>
        <Form ref="selectModal" v-model="params1">
          <Row type="flex" justify="space-between">
            <Col span="8">
              <FormItem label="站点：" :label-width="60">
                <Select placeholder="全部" v-model="params1.siteId">
                  <Option v-for="item in longzSitelist" :value="item.id" :key="item.id">{{ item.text }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="信息单元编码：" :label-width="120">
                <Input v-model="params1.code"></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="信息单元名称：" :label-width="120">
                <Input v-model="params1.name"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-bottom:20px">
            <Col span="24" class="text-right">
              <Button type="primary" @click="connectSearch">查询</Button>
              <Button style="margin-left: 20px" @click="linkMessagereset">重置</Button>
            </Col>
          </Row>
        </Form>
        <Table class="tableCommon" border  :columns="columns3" :data="dataTable3" @on-selection-change="modalCheck2"></Table>
        <oil-page
          :total="total1"
          :page-num="params1.pageNum"
          :page-size="params1.pageSize"
          @page-change="pageChange1"
          :page-size-opts="pageSizeOpts1"
          :show-sizer="showSizer">
        </oil-page>
      </Row>
      <div slot="footer">
        <i-button type="primary" @click="saveInfoUnit">保存</i-button>
        <i-button type="default" @click="infoUnitModal=false;">取消</i-button>
      </div> 
    </Modal>
    <!-- 关联信息单元结束 -->
    <!-- 编辑标签结束 -->
  </Row>
</template>

<script>
import associateAreaSearch from "../../components/cms/associateAreaSearch.vue";
import associateSearch from "../../components/associateSearch/associateSearch.vue";
import OilPage from "../../components/page/page.vue";
import {
  websiteColumnList,
  websiteColumnAdd,
  websiteColumnType,
  websiteColumnDetail,
  websiteColumnEdit,
  websiteTemplateList,
  // websiteColumnUnique,
  websiteChannelList,
  websiteColumnEditStatus,
  websitetTemplateEditPage,
  websiteChannelDetail,
  websiteChannelTree,
  websiteLabelDetail, //根据标签获取标签吧信息
  websiteLabelList,
  websiteUniqueRecordNum,
  websiteUpdateAppNumber,
  websiteLabelEditcheck,
  websiteSelectInforUnit,
  informationTaskList,
  websiteSelectSite,
  websiteLabelEdit
} from "../../components/axios/website.js";
import { formatTime2, formData } from "../../../assets/js/common.js";
import {
  deleteRolePermission,
  deleteRoleUser,
  deleteRole,
  deleteRolePermissionList
} from "../../components/axios/EAC";
export default {
  name: "columnManagement",
  components: {
    OilPage,
    associateAreaSearch,
    associateSearch
  },
  watch: {
    addModal(newVal, oldVal) {
      if (newVal == true) {
        this.$refs["addForm"].resetFields();
        this.labelId = "";
      }
    },
    mouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch();
      }
    },
    listMouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch2();
      }
    },
    editmouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch5();
      }
    },
    editlistMouldModal(newVal, oldVal) {
      if (newVal == true) {
        this.templateSearch6();
      }
    }
  },
  data() {
    const validateChannel = (rule, value, callback) => {
      if (this.$refs.input3.query === "") {
        callback(new Error("请选择频道路径"));
      } else {
        callback();
      }
    };
    const validateTemplateId = (rule, value, callback) => {
      let templateName = this.templateName;
      if (templateName) {
        callback();
      } else {
        callback(new Error("请选择模板"));
      }
    };
    const validateListTemplate = (rule, value, callback) => {
      let listTemplateName = this.listTemplateName;
      if (listTemplateName) {
        callback();
      } else {
        callback(new Error("请选择列表模板"));
      }
    };
    const validateLabel = (rule, value, callback) => {
      let labelId = this.labelId;
      if (labelId) {
        callback();
      } else {
        callback(new Error("请选择标签"));
      }
    };
    const validateAppNumber = (rule, value, callback) => {
      let appNumberValue = this.edit.appNumber;
      console.log("appNumberValue", appNumberValue);
      if (appNumberValue) {
        let params = {
          appNumber: appNumberValue,
          channelId: this.channelIdValue,
          columnId: this.columnId
        };
        websiteUniqueRecordNum(formData(params)).then(function(res) {
          console.log(res);
          if (res.response.result == "true") {
            callback();
          } else {
            callback(new Error(res.response.message));
          }
        });
      } else {
        callback(new Error("请输入顺序数"));
      }
    };
    const AddvalidateAppNumber = (rule, value, callback) => {
      let appNumberValue = this.addForm.appNumber;
      if (appNumberValue) {
        let params = {
          appNumber: appNumberValue,
          channelId: this.channelIdValueOne,
          columnId: 0
        };
        websiteUniqueRecordNum(formData(params)).then(function(res) {
          console.log(res);
          if (res.response.result == "true") {
            callback();
          } else {
            callback(new Error(res.response.message));
          }
        });
      } else {
        callback(new Error("请输入顺序数"));
      }
    };
    const validateedit = (rule, value, callback) => {
      let params = {
        id: this.editparams2.id,
        name: this.editparams2.name
      };
      var regu = /^\s*$/g;
      if (this.editparams2.name == "") {
        callback(new Error("请输入标签名称"));
      } else if (regu.test(value)) {
        callback(new Error("标签名称不能为空格"));
      } else {
        websiteLabelEditcheck(formData(params)).then(res => {
          console.log("res", res);
          if (res.response) {
            callback();
          } else {
            callback(new Error("标签名称重复"));
          }
        });
      }
    };
    return {
      // 编辑标签开始
      editUnitLabelId: "",
      editUnitLabelName: "",
      editparams2: {
        id: "",
        name: "",
        labelInformationList: [],
        status: 0
      },
      params2: {
        id: "",
        name: "",
        labelInformationList: [],
        status: 0
      },
      params1: {
        siteId: "",
        code: "",
        name: "",
        pageNum: 1,
        pageSize: 5
      },
      editModal: false,
      editruleValidate: {
        name: [
          { required: true, validator: validateedit, trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "标签名称不能超过100个字符",
            trigger: "change"
          }
        ]
      },
      selectName1: "",
      editclassList: [],
      infoUnitModal: false,
      longzSitelist: [],
      columns3: [
        {
          type: "selection",
          align: "center",
          width: 50
        },
        {
          key: "code",
          title: "信息单元编码",
          align: "center",
          minWidth: 150
        },
        {
          key: "name",
          title: "信息单元名称",
          align: "center",
          minWidth: 250
        },
        {
          key: "siteName",
          title: "站点",
          align: "center",
          minWidth: 150
        }
      ],
      dataTable3: [],
      total1: 0,
      pageSizeOpts1: [5, 10, 20, 30],
      detailForm: {
        name: "",
        detailList: []
      },
      // 编辑标签结束
      // childrenLength: false,
      childrenLength: true,
      channelIdValue: "",
      channelIdValueOne: "",
      nameType: [],
      editmouldModal: false,
      loading: false,
      submitEdit: false,
      submitAdd: false,
      treeData: [],
      edit: {},
      templateName: "",
      listTemplateName: "",
      params: {
        id: null,
        siteId: "",
        treeCode: "",
        treeId: "",
        name: "",
        status: "",
        isLabelId: "",
        pageNum: 1,
        pageSize: 10
      },
      selectform3: {
        pageNum: 1,
        pageSize: 5
      },
      selectform4: {
        pageNum: 1,
        pageSize: 5
      },
      selectform5: {
        pageNum: 1,
        pageSize: 5
      },
      selectform6: {
        pageNum: 1,
        pageSize: 5
      },
      label: {
        status: 0,
        name: ""
      },
      Authoriz: "",
      detailType: "",
      isNeedAuthorizedList: [
        {
          value: 0,
          label: "需要授权"
        },
        {
          value: 1,
          label: "需要登录"
        },
        {
          value: 2,
          label: "不需要授权"
        }
      ],
      isBindLableList: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "已绑定"
        },
        {
          value: 1,
          label: "未绑定"
        }
      ],
      mould: {},
      selectRow: {},
      labelNameList: [],
      labelNameList2: [],
      selectform: "",
      labelName: "",
      labelId: "",
      id: "",
      templateId: "",
      listTemplateId: "",
      templateId2: "",
      listTemplateId2: "",
      checkList3: {},
      checkList4: {},
      checkList5: {},
      checkList6: {},
      detail: {},
      total: 0,
      total3: 0,
      total4: 0,
      total5: 0,
      total6: 0,
      columnId: "",
      pageSizeOpts2: [5, 10, 20],
      pageSizeOpts: [10, 15, 20, 40, 50, 100, 200],
      showSizer: true,
      readModal: false,
      addModal: false,
      modifyModal: false,
      forbiddenModal: false,
      enableSiteModal: false,
      mouldModal: false,
      listMouldModal: false,
      editlistMouldModal: false,
      addRoles: {
        name: [
          { required: true, message: "栏目名称不能为空", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "栏目名称不能超过100个字符",
            trigger: "change"
          }
        ],
        nameForeigns: [
          {
            type: "string",
            max: 100,
            message: "英文名不能超过100个字符",
            trigger: "change"
          }
        ],
        appNumberValue: [
          {
            required: true,
            validator: validateAppNumber,
            trigger: "change"
          }
        ],
        AddAppNumber: [
          {
            required: true,
            validator: AddvalidateAppNumber,
            trigger: "change"
          }
        ],
        // recordNumber: [
        //   {
        //     message: "记录数不能为空",
        //     trigger: "blur",
        //     type: "number"
        //   }
        // ],
        url: [
          // {  message: "url地址不能为空", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "url地址不能超过100个字符",
            trigger: "blur"
          }
        ],
        // templateName: [
        //   {  validator: validateTemplateId, trigger: "blur" }
        // ],

        labelName: [
          {
            // validator: validateLabel,
            // trigger: "change",
            type: "number"
          }
        ],
        // listTemplateName: [
        //   { validator: validateListTemplate, trigger: "blur" }
        // ],
        listUrl: [
          // {  message: "列表url不能为空", trigger: "blur" },
          {
            type: "string",
            max: 100,
            message: "列表url地址不能超过100个字符",
            trigger: "blur"
          }
        ]
      },
      able: "",
      channelId: "",
      addForm: {
        name: "",
        nameForeigns: " ",
        url: "",
        templateName: " ",
        listUrl: "",
        labelId: " ",
        isNeedAuthorized: 0,
        type: 1,
        status: 0,
        recordNumber: 1,
        appNumber: 1
      },
      selectRow: "",
      selectData: {},
      formItem: {},
      changePre: "",
      selectStatus: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "禁用"
        }
      ],
      tableData: [],
      dataTable2: [],
      dataTable5: [],
      dataTable6: [],
      columns: [
        {
          key: "id",
          title: "栏目ID",
          align: "center",
          minWidth: 70
        },
        {
          key: "name",
          title: "栏目名称",
          align: "center",
          minWidth: 90,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.id = params.row.id;
                      this.templateId = params.row.templateId;
                      this.listTemplateId = params.row.listTemplateId;
                      this.labelId = params.row.labelId || "";
                      if (params.row.isNeedAuthorized === 0) {
                        this.Authoriz = "需要授权";
                      } else if (params.row.isNeedAuthorized === 1) {
                        this.Authoriz = "需要登录";
                      } else if (params.row.isNeedAuthorized === 2) {
                        this.Authoriz = "不需要授权";
                      } else {
                        this.Authoriz = "";
                      }
                      if (params.row.type === 1) {
                        this.detailType = "其他";
                      } else if (params.row.type === 2) {
                        this.detailType = "月报";
                      } else if (params.row.type === 3) {
                        this.detailType = "推荐";
                      } else if (params.row.type === 4) {
                        this.detailType = "周报";
                      } else if (params.row.type === 5) {
                        this.detailType = "早参";
                      } else if (params.row.type === 6) {
                        this.detailType = "热点";
                      } else if (params.row.type === 7) {
                        this.detailType = "调价";
                      } else if (params.row.type === 8) {
                        this.detailType = "产业链报告";
                      } else if (params.row.type === 9) {
                        this.detailType = "年报";
                      }
                      this.readModal = true;
                      this.showDetail(params);
                      // console.log
                    }
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          key: "channelPathName",
          title: "频道路径",
          align: "center",
          minWidth: 200
        },
        {
          key: "isNeedAuthorized",
          title: "是否需要授权",
          align: "center",
          minWidth: 80,
          render: (h, data) => {
            let label =
              data.row.isNeedAuthorized === 0
                ? "需要授权"
                : data.row.isNeedAuthorized === 1
                  ? "需要登录"
                  : data.row.isNeedAuthorized === 2 ? "不需要授权" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {}
              },
              label
            );
          }
        },
        {
          key: "appNumber",
          title: "顺序号",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            if (this.childrenLength) {
              return h("div", [
                h("Input", {
                  props: {
                    value: params.row.appNumber
                  },
                  style: {
                    float: "left",
                    width: "70px",
                    marginRight: "10px"
                  },
                  on: {
                    input: val => {
                      params.row.appNumber = val;
                    }
                  }
                }),
                h(
                  "a",
                  {
                    style: {
                      float: "left"
                    },
                    on: {
                      click: () => {
                        this.editqAppNumber(params);
                      }
                    }
                  },
                  "保存"
                )
              ]);
            } else {
              return h("div", [h("span", {}, params.row.appNumber)]);
            }
          }
        },
        {
          key: "status",
          title: "状态",
          align: "center",
          minWidth: 60,
          render: (h, data) => {
            let label =
              data.row.status === 0
                ? "正常"
                : data.row.status === 1 ? "禁用" : "";
            let color =
              data.row.status === 0
                ? "#9ecd3f"
                : data.row.status === 1 ? "red" : "";
            return h(
              "span",
              {
                props: {
                  type: "text",
                  size: "small"
                },
                style: {
                  color: color
                }
              },
              label
            );
          }
        },
        {
          key: "labelId",
          title: "标签ID",
          align: "center",
          minWidth: 60
        },
        {
          key: "labelName",
          title: "标签名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "creatorName",
          title: "创建人",
          align: "center",
          minWidth: 80
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            const result = params.row.createTime
              ? formatTime2(params.row.createTime)
              : "";
            return h("div", {}, result);
          }
        },
        {
          key: "operate",
          title: "操作",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    float: "left"
                  },
                  on: {
                    click: () => {
                      this.modifyModal = true;
                      // this.edit = params.row;
                      // this.isNeedAuthorized = params.row.isNeedAuthorized;
                      // this.edit.channelPathName = params.row.channelPathName;
                      this.templateId2 = params.row.templateId;
                      this.listTemplateId2 = params.row.listTemplateId;
                      this.channelId =
                        params.row.channelColumnVO.channelId || "";
                      console.log("12", this.channelId);
                      this.channelIdValue = this.channelId;
                      this.labelId = params.row.labelId || "";
                      this.editName(params);
                      console.log(
                        params.row
                        // this.edit.isNeedAuthorized
                        //this.edit.channelPathName
                      );
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  style: {
                    marginRight: "5px",
                    display:
                      params.row.labelId && params.row.labelName
                        ? "block"
                        : "none",
                    float: "left"
                  },
                  on: {
                    click: () => {
                      console.log(params);
                      (this.id = params.row.id),
                        // (this.editparams2.id = params.row.id);
                        (this.editparams2.id = params.row.labelId);
                      // this.editparams2.name = params.row.name;
                      this.editparams2.name = params.row.labelName;
                      this.editparams2.status = params.row.status;
                      this.editModal = true;
                      this.editLabelBtn(params);
                    }
                  }
                },
                "编辑标签"
              ),
              h(
                "a",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "0px",
                    float: "left"
                  },
                  on: {
                    click: () => {
                      // 禁用
                      if (params.row.status == 0) {
                        this.forbidden(params);
                      }
                      if (params.row.status == 1) {
                        this.enable(params);
                      }
                    }
                  }
                },
                params.row.status == 1
                  ? "启用"
                  : params.row.status == 0 ? "禁用" : ""
              )
            ]);
          }
        }
      ],
      dataTable: [],
      columns4: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList3.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck3(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ],

      editColumns: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList5.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck5(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ],
      columns5: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList4.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck4(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ],
      editListcolunns: [
        {
          align: "center",
          title: "操作",
          width: 80,
          render: (h, data) => {
            let defaults = false;
            let id = data.row.id;
            if (this.checkList6.id === id) {
              defaults = true;
            } else {
              defaults = false;
            }
            return h("Radio", {
              props: {
                value: defaults
              },
              on: {
                input: () => {
                  this.modalCheck6(data.row);
                }
              }
            });
          }
        },
        {
          key: "templateName",
          title: "网站模板名称",
          align: "center",
          minWidth: 150
        },
        {
          key: "templateTypeName",
          title: "网站模板分类",
          align: "center",
          minWidth: 180
        }
      ]
    };
  },
  created() {
    this.getType();
  },
  methods: {
    // 编辑标签开始
    editLabelBtn(data) {
      this.$refs.unit1.query = "";
      websiteLabelDetail(formData({ id: data.row.labelId })).then(res => {
        //console.log(res)
        this.editparams2.labelInformationList =
          res.response.labelInformationList;
        let that = this;
        // console.log(this.editparams2.labelInformationList)
        for (var i = 0; i < that.editparams2.labelInformationList.length; i++) {
          if (!that.editparams2.labelInformationList[i].infornamtionUnitName) {
            that.editparams2.labelInformationList.splice(i, 1);
            console.log(i);
          }
        }
        this.$refs["editFormValidate"].validate();
        console.log(this.editparams2.labelInformationList);
      });
    },
    chooseTableInfo() {
      this.params1.siteId = "";
      this.params1.code = "";
      this.params1.name = "";
      this.infoUnitModal = true;
      this.showselect();
    },
    showselect() {
      this.labelInformationList = [];
      this.editlist = [];
      this.params1 = {
        siteId: this.params1.siteId == undefined ? "" : this.params1.siteId,
        code: this.params1.code == undefined ? "" : this.params1.code,
        name: this.params1.name == undefined ? "" : this.params1.name,
        pageNum: this.params1.pageNum,
        pageSize: this.params1.pageSize
      };
      informationTaskList(formData(this.params1)).then(res => {
        //console.log(res)
        this.dataTable3 = res.response.list;
        this.total1 = res.response.total;
      });

      //下拉选择站点
      websiteSelectSite().then(res => {
        this.longzSitelist = res.response;
        //console.log(this.longzSitelist)
      });
    },
    searchclassfylist1(query) {
      let that = this;
      if (query !== "") {
        this.loading = false;
        let params = {
          name: query
        };
        setTimeout(() => {
          this.loading = false;
          websiteSelectInforUnit(formData(params)).then(res => {
            //console.log(res.response)
            this.editclassList = res.response;
          });
        }, 200);
      } else {
        this.options1 = [];
      }
    },
    typeChange1(option) {
      let that = this;
      let obj = {};
      obj.informationUnitId = option.value;
      obj.infornamtionUnitName = option.label;

      let isCS = false;
      for (var j = 0; j < this.editparams2.labelInformationList.length; j++) {
        if (
          obj.informationUnitId ==
          this.editparams2.labelInformationList[j].informationUnitId
        ) {
          isCS = true;
        }
      }
      if (!isCS) {
        this.editparams2.labelInformationList.push(obj);
        this.$refs["editFormValidate"].validate();
      }

      if (option == "") {
        this.$refs.unit1.option = "";
      }
    },
    queryChange1(query) {
      if (!query) {
        this.selectName1 = null;
      }
    },
    connectSearch() {
      this.params1.pageNum = 1;
      this.params1.pageSize = 5;
      this.showselect();
    },
    linkMessagereset() {
      this.params1 = {
        siteId: "",
        code: "",
        name: "",
        pageNum: 1,
        pageSize: 5
      };
      this.showselect();
    },
    modalCheck2(selection) {
      // console.log(selection)
      this.labelInformationList = selection;
      this.editlist = selection;
    },
    pageChange1(page, size) {
      if (size) {
        this.params1.pageNum = 1;
        this.params1.pageSize = size;
      } else {
        this.params1.pageNum = page;
      }
      this.showselect();
    },
    saveInfoUnit() {
      this.infoUnitModal = false;
      if (this.addModal) {
        let addlistarr = [];
        addlistarr = this.labelInformationList.map((e, v) => {
          return {
            informationUnitId: e.id,
            labelId: e.siteId,
            sign: e.sign,
            infornamtionUnitName: e.name
          };
        });
        for (var i = 0; i < addlistarr.length; i++) {
          let isCF = false;
          for (var j = 0; j < this.params2.labelInformationList.length; j++) {
            if (
              this.params2.labelInformationList[j].informationUnitId ==
              addlistarr[i].informationUnitId
            ) {
              isCF = true;
            }
          }
          if (!isCF) {
            this.params2.labelInformationList.push(addlistarr[i]);
            this.$refs["addFormValidate"].validate();
          }
        }
      } else if (this.editModal) {
        var eidtarr = this.editlist.map((e, v) => {
          return {
            informationUnitId: e.id,
            labelId: e.siteId,
            sign: e.sign,
            infornamtionUnitName: e.name
          };
        });

        let list1 = this.editparams2.labelInformationList;
        for (var i = 0; i < eidtarr.length; i++) {
          let isCF = false;
          for (var j = 0; j < list1.length; j++) {
            if (list1[j].informationUnitId == eidtarr[i].informationUnitId) {
              isCF = true;
            }
          }
          if (!isCF) {
            this.editparams2.labelInformationList.push(eidtarr[i]);
            this.$refs["editFormValidate"].validate();
          }
        }
      }
    },
    saveEditUnit(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.submitedit) {
            this.submitedit = true;
            websiteLabelEdit(this.editparams2).then(res => {
              this.editModal = false;
              if (res.status == 200) {
                this.$Message.success("保存成功！");
                _this.tableList();
              } else {
                this.$Message.error(res.message);
              }
              this.submitedit = false;
            });
          }
        }
      });
    },
    editCancel() {
      this.editModal = false;
      this.$refs["editFormValidate"].resetFields();
    },
    removeCheck22(index) {
      this.detailForm.detailList.splice(index, 1);
      this.editparams2.labelInformationList.splice(index, 1);
      if (this.params2.labelInformationList.length < 1) {
        this.$refs["editFormValidate"].validate();
      }
      this.$refs.unit1.query = "";
    },
    // 编辑标签结束
    editqAppNumber(data) {
      var reg = /^[0-9]*$/;
      console.log('editqAppNumber',Number(data.row.appNumber)>=1 && Number(data.row.appNumber)<1000);
      if (data.row.appNumber == "" || data.row.appNumber == null) {
        this.$Message.error('顺序号不能为空');
        return;
      }else if(!reg.test(data.row.appNumber)){
        this.$Message.error('顺序号只能正整数');
        return;
      }else if(!(Number(data.row.appNumber)>=1 && Number(data.row.appNumber)<1000)){
        this.$Message.error('顺序号只能是大于等于1，小于1000');
        return;
      } 
      else {
        let params = {
          code: this.params.code,
          appNumber: data.row.appNumber,
          columnId: data.row.channelColumnVO.columnId,
          siteId: this.params.siteId
        };
        websiteUpdateAppNumber(formData(params)).then(res => {
          if (res.status == "200") {
            this.$Message.success(res.message);
            this.tableList();
          } else {
            this.$Message.error(res.message);
          }
        });
      }
    },
    //  情空select
    emptyQuery(query) {
      if (query == "") {
        this.$refs.input4.query = "";
        this.labelId = "";
      }
    },
    //树
    channelTree() {
      websiteChannelTree({
        status: 0
      }).then(res => {
        this.treeData = res.response;
      });
    },
    //加载树节点
    loadTree(item, callback) {
      websiteChannelTree({
        //"code": item.code,
        id: item.value,
        status: 0,
        // "isLeaf": item.isLeaf,
        // "name": item.name,
        // "parentId": item.parentId,
        // "sign": item.sign,
        siteId: item.siteId
      }).then(res => {
        let data = res.response.map(item => {
          if (item.isLeaf) {
            return {
              code: item.code,
              value: item.id,
              title: item.name,
              siteId: item.siteId,
              loading: false,
              children: [],
              pathName: item.pathName
            };
          } else {
            return {
              code: item.code,
              value: item.id,
              title: item.name,
              siteId: item.siteId,
              pathName: item.pathName
            };
          }
        });
        callback(data);
      });
    },
    //通过数点击左边叶子节点
    findlist(treeNode) {
      this.treeArr = treeNode[0];
      console.log("treeArr", this.treeArr);
      if (this.treeArr) {
        this.changePre = treeNode[0].pathName;
        this.params.code = treeNode[0].code ? treeNode[0].code : null;
        this.params.id = treeNode[0].id ? treeNode[0].id : null;
        this.params.siteId = treeNode[0].siteId ? treeNode[0].siteId : null;
        this.params.treeId = treeNode[0].value ? treeNode[0].value : null;
        this.channelIdValue = treeNode[0].id ? treeNode[0].id : null;
        this.channelIdValueOne = treeNode[0].id ? treeNode[0].id : null;
        this.search();
        if (this.treeArr.children.length == 0) {
          // console.log('this.treeArr.children.length',this.treeArr.children.length)
          this.childrenLength = true;
        } else {
          // this.childrenLength = false;
          this.childrenLength = true;
        }
      }
    },
    // 获取栏目列表
    tableList() {
      this.form = {
        code: this.params.code == undefined ? "" : this.params.code,
        name: this.params.name,
        isLabelId:
          this.params.isLabelId == undefined ? -1 : this.params.isLabelId,
        siteId: this.params.siteId == "" ? 1 : this.params.siteId,
        status: this.params.status == undefined ? "" : this.params.status,
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize
      };
      websiteColumnList(formData(this.form)).then(res => {
        if (res.response) {
          this.tableData = res.response.list;
          this.total = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //取消
    cancelColumns(type) {
      if (type == 1) {
        this.addModal = false;
        this.addForm = {
          recordNumber: 1,
          appNumber: 1,
          isNeedAuthorized: 0,
          type: 1
        };
        this.$refs.addForm.resetFields();
      }
      if (type == 2) {
        this.modifyModal = false;
        this.edit = {};
        this.$refs.edit.resetFields();
      }
      this.templateId = "";
      this.templateName = "";
      this.listTemplateId = "";
      this.listTemplateName = "";
      this.isLabelId = -1;
    },
    // 分页
    pageChange(page, size) {
      if (size) {
        this.params.pageNum = 1;
        this.params.pageSize = size;
      } else {
        this.params.pageNum = page;
      }
      this.tableList();
    },
    pageChange2(page, size) {
      if (size) {
        this.selectform3.pageNum = 1;
        this.selectform3.pageSize = size;
      } else {
        this.selectform3.pageNum = page;
      }
      this.templateSearch(true);
    },
    pageChange3(page, size) {
      if (size) {
        this.selectform4.pageNum = 1;
        this.selectform4.pageSize = size;
      } else {
        this.selectform4.pageNum = page;
      }
      this.templateSearch2(true);
    },
    pageChange5(page, size) {
      if (size) {
        this.selectform5.pageNum = 1;
        this.selectform5.pageSize = size;
      } else {
        this.selectform5.pageNum = page;
      }
      this.templateSearch5(true);
    },
    //保存模板
    saveMouldModal(type) {
      if (type == 1) {
        this.templateName = this.selectRow.templateName;
        this.$refs.addForm.validate();
      }
      if (type == 2) {
        this.templateName = this.selectRow.templateName;
        this.$refs.edit.validate();
      }
      if (type == 3) {
        this.listTemplateName = this.selectRow.templateName;
        this.$refs.addForm.validate();
      }
      if (type == 4) {
        this.listTemplateName = this.selectRow.templateName;
        this.$refs.edit.validate();
      }
      this.cancelMouldModal(type);
    },
    //取消列表
    cancelMouldModal(type) {
      if (type == 1) {
        this.checkList3 = {};
        this.mouldModal = false;
        this.templateReset1();
      }
      if (type == 2) {
        this.checkList5 = {};
        this.editmouldModal = false;
        this.templateReset2();
      }
      if (type == 3) {
        this.checkList4 = {};
        this.listMouldModal = false;
        this.templateReset3();
      }
      if (type == 4) {
        this.checkList6 = {};
        this.editlistMouldModal = false;
        this.templateReset4();
      }
      this.selectRow = {};
    },
    pageChange6(page, size) {
      if (size) {
        this.selectform6.pageNum = 1;
        this.selectform6.pageSize = size;
      } else {
        this.selectform6.pageNum = page;
      }
      this.templateSearch6(true);
    },
    modalCheck3(selection) {
      this.checkList3 = selection;
      this.addForm.templateName = this.checkList3.templateName;
      this.addForm.templateId = this.checkList3.id;
    },
    modalCheck4(selection) {
      this.checkList4 = selection;
      this.listTemplateName = this.checkList4.templateName;
      this.listTemplateId = this.checkList4.id;
    },
    modalCheck5(selection) {
      this.checkList5 = selection;
      this.edit.templateName = this.checkList5.templateName;
      this.edit.templateId = this.checkList5.id;
      // console.log(this.edit.templateName, this.edit.templateId);
    },
    modalCheck6(selection) {
      this.checkList6 = selection;
      this.listTemplateName = this.checkList6.templateName;
      this.listTemplateId = this.checkList6.id;
    },
    // 新增弹窗
    addColumns() {
      if (this.params.id) {
        this.addModal = true;
        this.addForm.url = "";
        this.addForm.listUrl = "";
      } else {
        this.$Message.warning("请选择频道");
      }
    },
    concatEditModal() {
      this.editmouldModal = true;
    },
    concateditListModal() {
      this.editlistMouldModal = true;
    },
    // 获取频道列表
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = false;
        let params = {
          status: 0
        };
        setTimeout(() => {
          this.loading = false;
          websiteChannelList(formData(params)).then(res => {
            this.channelPathNameList = res.response.list;
          });
        }, 200);
      } else {
        this.channelPathNameList = [];
      }
    },
    // 获取标签列表
    remoteMethod2(query) {
      if (query !== "") {
        let params = {
          status: 0,
          name: query
        };
        this.loading = false;
        setTimeout(() => {
          this.loading = false;
          websiteLabelList(formData(params)).then(res => {
            this.labelNameList = res.response.list;
          }, 200);
        });
      } else {
        this.labelNameList = [];
      }
    },
    change1() {},
    remoteMethod3(query) {
      if (query !== "") {
        let params = {
          status: 0,
          name: query
        };
        this.loading = false;
        setTimeout(() => {
          this.loading = false;
          websiteLabelList(formData(params)).then(res => {
            this.labelNameList2 = res.response.list;
          }, 200);
        });
      }
    },
    getTemplateName() {},
    // 查询
    search() {
      this.params.pageNum = 1;
      this.params.pageSize = 10;
      this.tableList();
    },
    // 重置
    reset() {
      this.params = {
        siteId: this.params.siteId,
        treeCode: this.params.treeCode,
        treeId: this.params.id,
        isLabelId: "",
        name: "",
        status: "",
        pageNum: 1,
        pageSize: 10
      };
    },
    editName(params) {
      let that = this;
      this.columnId = params.row.id;
      websiteColumnDetail(
        formData({
          id: params.row.id
        })
      ).then(res => {
        // console.log('resData',res);
        that.edit = res.response;
        that.labelId = res.response.labelId;
        this.$refs.edit.validateField("labelName");
      });

      if (that.labelId) {
        websiteLabelDetail(formData({ id: that.labelId })).then(res => {
          // console.log('that',res.response.name);
          that.$refs.inputEdit.query = res.response.name;
        });
      }
      if (that.templateId2) {
        // console.log("999",that.templateId2)
        websitetTemplateEditPage(
          formData({ templateId: this.templateId2 })
        ).then(res => {
          that.templateName = res.response.templateName;
        });
      }
      if (that.listTemplateId2) {
        websitetTemplateEditPage(
          formData({ templateId: this.listTemplateId2 })
        ).then(res => {
          that.listTemplateName = res.response.templateName;
          // console.log(this.detail.listTemplateName )
        });
      }
      websiteChannelDetail(formData({ id: this.channelId })).then(res => {
        that.changePre = res.response.pathName;
        // console.log(this.detail.listTemplateName )
      });
    },
    // 查看栏目详情
    showDetail(params) {
      if (this.templateId) {
        websitetTemplateEditPage(
          formData({ templateId: this.templateId })
        ).then(res => {
          // console.log('111',res.response.templateName)
          this.templateName = res.response.templateName;
        });
      }
      if (this.listTemplateId) {
        websitetTemplateEditPage(
          formData({ templateId: this.listTemplateId })
        ).then(res => {
          this.listTemplateName = res.response.templateName;
          // console.log(this.detail.listTemplateName )
        });
      }
      if (this.labelId) {
        websiteLabelDetail(formData({ id: this.labelId })).then(res => {
          this.labelName = res.response.name;
          // console.log(this.labelName);
        });
      } else {
        this.labelName = "";
      }

      websiteColumnDetail(
        formData({
          id: this.id
        })
      ).then(res => {
        this.detail = res.response;
        // console.log(this.detail)
      });
    },
    // 监听选中项发生变化
    handleRowChange(row) {
      this.selectRow = row;
    },
    // 编辑栏目列表信息
    saveEdit() {
      let that = this;
      that.submitEdit = true;
      this.$refs.edit.validate(valid => {
        if (valid) {
          websiteColumnEdit({
            name: this.edit.name,
            // channelPathName: this.edit.channelPathName,
            url: that.edit.url,
            templateId: that.edit.templateId,
            templateName: that.templateName,
            listUrl: that.edit.listUrl,
            listTemplateId: that.listTemplateId,
            listTemplateName: that.listTemplateName,
            labelId: that.labelId,
            status: that.edit.status,
            id: that.edit.id,
            creatorId: that.edit.creatorId,
            creatorName: that.edit.creatorName,
            appNumber: that.edit.appNumber,
            nameForeigns: that.edit.nameForeigns,
            type: that.edit.type,
            recordNumber: that.edit.recordNumber,
            createTime: that.edit.createTime,
            version: that.edit.version,
            isNeedAuthorized: that.edit.isNeedAuthorized
          }).then(res => {
            that.modifyModal = false;
            if (res.status == 200) {
              that.$Message.success("修改成功！");
              that.cancelColumns(2);
              that.submitEdit = false;
              that.tableList();
            } else {
              that.$Message.error(res.message);
            }
            setTimeout(() => {
              this.submitEdit = false;
            }, 1000);
          });
        } else {
          that.submitEdit = false;
        }
      });
    },
    // 新增
    saveColumns() {
      let that = this;
      this.submitAdd = true;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let form = {
            channelColumnVO: {
              channelId: this.params.id,
              columnId: 1,
              id: "",
              sign: ""
            },
            name: this.addForm.name,
            url: this.addForm.url,
            templateId: this.addForm.templateId,
            templateName: this.addForm.templateName,
            listTemplateName: this.addForm.listTemplateName,
            listUrl: this.addForm.listUrl,
            listTemplateId: this.listTemplateId,
            labelId: this.labelId,
            nameForeigns: this.addForm.nameForeigns,
            type: this.addForm.type,
            recordNumber: this.addForm.recordNumber,
            appNumber: this.addForm.appNumber,
            isNeedAuthorized: this.addForm.isNeedAuthorized,
            status: "0",
            creatorName: ""
          };
          websiteColumnAdd(form).then(res => {
            this.addModal = false;
            if (res.status == 200) {
              that.$Message.success("添加成功！");
              that.submitAdd = false;
              that.cancelColumns(1);
              that.tableList();
            } else {
              this.$Message.error(res.message);
            }
            setTimeout(() => {
              this.submitAdd = false;
            }, 1000);
          });
        } else {
          that.submitAdd = false;
        }
      });
    },
    //栏目数据
    getType() {
      websiteColumnType({}).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.nameType = res.response;
        } else {
          that.$Message.error(res.message);
        }
      });
    },
    // 启用
    enable(params) {
      let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定启用吗？",
        onOk: () => {
          let form = {
            id: params.row.id,
            status: 0
          };
          websiteColumnEditStatus(formData(form)).then(res => {
            _this.$Message.success("启用成功");
            _this.tableList();
          });
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      };
      this.$Modal.confirm(config);
    },

    forbidden(params) {
      let _this = this;
      var config = {
        title: "提示信息",
        content: "您确定禁用吗？",
        onOk: () => {
          let form = {
            id: params.row.id,
            status: 1
          };
          websiteColumnEditStatus(formData(form)).then(res => {
            _this.$Message.success("禁用成功");
            _this.tableList();
          });
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      };
      this.$Modal.confirm(config);
    },

    concatModal() {
      this.mouldModal = true;
    },
    // 模板类型重置
    templateReset1() {
      this.selectform3 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    templateReset2() {
      this.selectform5 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    templateReset3() {
      this.selectform4 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    templateReset4() {
      this.selectform6 = {
        name: "",
        pageNum: 1,
        pageSize: 5
      };
    },
    queryForm3() {
      this.selectform3.pageNum = 1;
      this.selectform3.pageSize = 5;
      this.templateSearch(true);
    },
    // 获取关联模板列表
    templateSearch(isPage) {
      if (!isPage) {
        this.selectform3.pageNum = 1;
        this.selectform3.status = 0;
      }
      websiteTemplateList(this.selectform3).then(res => {
        if (res.response && res.response.list) {
          this.dataTable = res.response.list;
          this.total3 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    //查询模板分类
    queryForm4() {
      this.selectform4.pageNum = 1;
      this.selectform4.pageSize = 5;
      this.templateSearch2(true);
    },
    templateSearch2(isPage) {
      if (!isPage) {
        this.selectform4.pageNum = 1;
        this.selectform4.status = 0;
      }
      websiteTemplateList(this.selectform4).then(res => {
        if (res.response && res.response.list) {
          this.dataTable2 = res.response.list;
          this.total4 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    queryForm5() {
      this.selectform5.pageNum = 1;
      this.selectform5.pageSize = 5;
      this.templateSearch5(true);
    },
    templateSearch5(isPage) {
      if (!isPage) {
        this.selectform5.pageNum = 1;
        this.selectform5.status = 0;
      }
      websiteTemplateList(this.selectform5).then(res => {
        if (res.response && res.response.list) {
          this.dataTable5 = res.response.list;
          this.total5 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    queryForm6() {
      this.selectform6.pageNum = 1;
      this.selectform6.pageSize = 5;
      this.templateSearch6(true);
    },
    templateSearch6(isPage) {
      if (!isPage) {
        this.selectform6.pageNum = 1;
        this.selectform6.status = 0;
      }
      websiteTemplateList(this.selectform6).then(res => {
        if (res.response && res.response.list) {
          this.dataTable6 = res.response.list;
          this.total6 = res.response.total;
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // 打开关联模板弹窗
    concatListModal() {
      this.listMouldModal = true;
    }
  },
  mounted() {
    this.channelTree();
    this.tableList();
    // this.getType();
  }
};
</script>


