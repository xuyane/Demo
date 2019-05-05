<style lang="less" scoped>
.background-card{
	overflow: hidden;
}
.tab-btn{
	margin-bottom: 20px;
}
</style>
<template>
<Row>
	<i-col span="24">
		<Row class-name="current-position">
			当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;角色管理&nbsp;&nbsp;>>&nbsp;&nbsp;角色授权
		</Row>
	</i-col>
	<Col span='24'>
		<Row :gutter="20">
			<Col span='4'>
        <Row class-name="table-con" style="margin-bottom:20px;font-size:14px">
          <p class="role-title">角色名称：{{roleName}}</p>
        </Row>
				<div class='leftree'>
					<Card :bordered="false">
						<p slot="title">模块权限树</p>
						<div class="overflow-auto">
							<Tree ref="tree" :data="itemTree" show-checkbox></Tree>
						</div>
					</Card>
				</div>
			</Col>
			<Col span='20' >
        <Row class-name="table-con">
          <Form >
            <Row>
              <Col span="6">
                <FormItem label="权限名称:" :label-width="80">
                  <Input class="search-input" v-model="permissionName"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="所属模块" prop="status" :label-width="100">
                  <Input v-model="moduleName" class="search-input" readonly @on-focus="getModuleTree" placeholder="请选择模块"></Input>
                </FormItem>
              </Col>
              <Col span='12' class="text-right">
                  <Button type="primary" style="margin-right:20px" @click="searchListPage">查询</Button>
                  <Button @click="clearRolePermissionPage">重置</Button>
              </Col>
            </Row>
            <Row class="tab-btn">
              <Button type="primary" style="margin-right:20px" @click="saveAddRolePermissionList">添加</Button>
              <Button type="error" @click="saveDeleteRolePermissionList">批量删除</Button>
            </Row>
          </Form>
          <Row>
            <Table class="tableCommon"
            :data="tableData1"
            :columns="columns1"
            ref="dragTable"
            :stripe="true"
            :border="true"
            @on-selection-change="selectChange1">
            <tr v-for="item in tableData1">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.moduleName}}</td>
              <td>{{item.firstModuleName}}</td>
            </tr>
            </Table>
            <oil-page
              :total="total"
              :page-size="pageSize"
              :page-num="pageNum"
              @page-change="pageChange"
              :page-size-opts="pageSizeOpts"
              :show-sizer="showSizer">
            </oil-page>
          </Row>
          <Col span="24" style="text-align:center;margin-bottom:20px;">
            <Button type="primary" @click="backtorole">返回</Button>
          </Col>
        </Row>
			</Col>
      <Modal
      v-model="moduleModel"
      title="请选择模块"
      :footer-hide="true">
      <div class="overflow-auto" style="max-height: 300px;">
        <Tree ref="moduleTree" :data="moduleList" @on-select-change='getModuleCode'></Tree>
      </div>
  	</Modal>
    </Row>
	</Col>

</Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { queryRolePermissionPage,deleteRolePermission,deleteRolePermissionList,modulePermissionTree,addRolePermissionList,moduletree} from "../../components/axios/EAC.js";
import { formData } from "../../../assets/js/common.js";
export default {
	name:'roleAuthorization',
	components: {
    OilPage
  },
	data(){
		return{
      roleId:'',
      moduleModel: false,
      roleName:'',
      permissionName:'',
      permissionIds:'',
      moduleName:'',
      moduleCode:'',
      moduleList:[],
      itemTree:[],
			total: 10,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
			columns1:[{
				type: 'selection',
				align: 'center',
				width: 50
        },{
        title:'权限ID',
        key:'id',
        align: 'center',
				width: 80
      },{
        title:'权限名称',
        key:'name',
        align: 'center',
				minWidth: 300
      },{
        title:'所属模块',
        key:'moduleName',
        align: 'center',
				minWidth: 300
      },{
        title:'所属一级模块',
        key:'firstModuleName',
        align: 'center',
				width: 250
      },{
        title:'操作',
        key:'operation',
        align: 'center',
				width: 150,
        render: (h,data) => {
          return h('span',{
            style: {
              marginRight: '20px',
              color: 'red',
              textDecoration: 'underline',
              cursor: 'pointer'
            },
            on:{
              click:()=>{
                this.saveDeleteRolePermission(data.row.id)
              }
            }
          },'删除')
        }
      }],
      tableData1:[{
        id:'',
        name:'',
        moduleName:'',
        firstModuleName:''
      }],
		}
  },
  created () {
    // 角色信息
    let that = this;
    that.roleId = this.$route.query.id;
    that.roleName = this.$route.query.name;
    this.getRolePermissionPage();
    this.getModulePermissionTree();
  },

	methods:{
    //获取模块权限树
    getModulePermissionTree(){
      let that = this;
      modulePermissionTree().then(res => {
        if (res.status == "200"){
          const module = that.treeItem(res.response);
            module.forEach(function(e,v){
            that.itemTree.push(e);
          });
        } else {
          that.$Message.warning(res.message);
        }
      })
    },
    treeItem(data) {
      let dgData = data.map(item => {
        console.log(item)
        if(item.permissionId){
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            permissionId: item.permissionId,
            expand:item.children== []  ||  item.code =="000" ? true : false,
            children: this.treeItem(item.children)
          };
        }else {
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            permissionId: item.permissionId,
            expand:item.children== []  ||  item.code =="000" ? true : false,
            children: this.treeItem(item.children),
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px',
                      color: '#000'
                    }
                  }),
                  h('span', item.label)
                ])
              ]);
            }
          }
        }
      })
      return dgData;
    },
    //递归获得模块树数据
		moduleDigui (data){
			let dgData = data.map(item => {
				if(item.children && item.children.length > 0){
				return {
          id: item.id,
          code:item.code,
					title: item.label,
					status: item.status,
					children: this.moduleDigui(item.children)
				}
				}else {
				return {
          id: item.id,
          code:item.code,
					title: item.label,
					status: item.status,
					children: item.children
				}
				}
			})
			return dgData
		},
		// 模块树
		getModuleTree () {
			this.moduleModel = true;
			moduletree().then(res => {
			console.log(res);
			let data = res.response;
			this.moduleList = this.moduleDigui(data);
			})
		},
		//通过点击树的数据获取相应的数据
		getModuleCode(data){
			this.moduleModel = false;
			this.moduleCode=data[0].code;
			this.moduleName=data[0].title;
    },
    //查询触发
    searchListPage (){
      this.pageNum = 1;
      this.getRolePermissionPage ();
    },
    // 获取角色关联的权限列表
    getRolePermissionPage () {
      let form = {
        roleId: this.roleId,
        name: this.permissionName,
        moduleCode: this.moduleCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryRolePermissionPage(formData(form)).then(res => {
        this.tableData1 = res.response.list;
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    // 重置角色关联的权限查询条件
    clearRolePermissionPage () {
      this.permissionName = ''
      this.moduleCode = ''
      this.moduleName = ''
    },
    //批量添加角色关联权限
    saveAddRolePermissionList(){
      this.$Spin.show();
      let dataList = this.$refs.tree.getCheckedNodes();
      let treePermissionIds = [];
      dataList.map (item => {
        if(item.permissionId !=null){
          treePermissionIds.push(item.permissionId);
        }
      });
      let form = {
        roleId: this.roleId,
        permissionIds:treePermissionIds
      }
      addRolePermissionList(formData(form)).then(res => {
        this.$Message.success("添加成功！！！");
        this.$Spin.hide();
        this.getRolePermissionPage();
      })
    },
    // 删除角色关联的权限
    saveDeleteRolePermission(permissionId) {
      this.$Spin.show();
      let form = {
        roleId : this.roleId,
        permissionId : permissionId
      }
      deleteRolePermission(formData(form)).then(res => {
        this.$Message.success("删除成功！！！");
        this.$Spin.hide();
        this.getRolePermissionPage();
      })
    },
    // 批量删除角色关联的权限
    saveDeleteRolePermissionList() {
      if(this.permissionIds.length > 0){
        this.$Spin.show();
        let form = {
          roleId : this.roleId,
          permissionIds : this.permissionIds
        }
        deleteRolePermissionList(formData(form)).then(res => {
          this.$Message.success("删除成功！！！");
          this.permissionIds = []
          this.$Spin.hide();
          this.getRolePermissionPage();
        })
      }else {
        this.$Message.warning("请选择要删除的权限");
      }
    },
    //关联权限列表多选
    selectChange1 (selection) {
      let permissionIds = selection.map(item => {
        return item.id
      })
      this.permissionIds = permissionIds;
      this.selection = selection
    },
    // 监听分页
    pageChange (page, pageSize) {
      if(page) {
        this.pageNum = page
      }
      if(pageSize) {
        this.pageSize = pageSize
      }
      this.getRolePermissionPage();
    },
		backtorole(){
			this.$router.push({name:'roleQueryList'})
		}
	}
}
</script>
