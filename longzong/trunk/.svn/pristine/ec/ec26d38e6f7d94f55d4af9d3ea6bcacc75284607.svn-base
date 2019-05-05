<style lang="less" scoped>
.background-card{
	overflow: hidden;
}
.tab-btn{
	margin-bottom: 20px;
}
.role-title{
  font-size: 14px;
}
</style>
<template>
<Row>
	<i-col span="24">
		<Row class-name="current-position">
			当前位置：后台权限&nbsp;&nbsp;>>&nbsp;&nbsp;角色管理&nbsp;&nbsp;>>&nbsp;&nbsp;关联菜单
		</Row>
	</i-col>
	<Col span='24'>
    <Row :gutter="20">
			<Col span='4'>
        <Row class-name="table-con" style="margin-bottom:20px;">
      	  <span class="role-title">对应角色名称：{{roleName}}</span>
        </Row>
				<div class='leftree'>
					<Card :bordered="true">
						<p slot="title">菜单树</p>
						<div class="overflow-auto">
							<Tree ref="tree" :data="itemTree" show-checkbox></Tree>
						</div>
					</Card>
				</div>
			</Col>

			<Col span='20'>
        <Row class-name="table-con">
          <Form :label-width="80">
            <Row>
              <Col span="6">
                <FormItem label="菜单名称:">
                  <Input class="search-input" v-model="menuName"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="URL" prop="status">
                  <Input class="search-input" v-model="url"></Input>
                </FormItem>
              </Col>
              <Col span='12' class="text-right">
                  <Button type="primary" style="margin-right:20px" @click="getRoleMenuPage">查询</Button>
                  <Button @click="clearRoleMenuPage">重置</Button>
              </Col>
            </Row>
            <Row class="tab-btn">
              <Button type="primary" style="margin-right:20px" @click="saveAddRoleMenuList">添加</Button>
              <Button type="primary" @click="saveDeleteRoleMenuList">批量删除</Button>
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
              <td>{{item.code}}</td>
              <td>{{item.name}}</td>
              <td>{{item.level}}</td>
              <td>{{item.code}}</td>
              <td>{{item.url}}</td>
              <td>{{item.lastAccess}}</td>
            </tr>
            </Table>
            <oil-page
              :total="total"
              :page-size="pageSize"
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
    </Row>
	</Col>

</Row>
</template>
<script>
import OilPage from "../../components/page/page.vue";
import { queryRoleMenuPage,getMenuPathByMenuId,deleteRoleMenu,deleteRoleMenuList,menuTree,addRoleMenuList} from "../../components/axios/EAC.js";
import { formData, formatTime } from "../../../assets/js/common.js";
export default {
	name:'associationMenu',
	components: {
    OilPage
  },
	data(){
		return{
      roleId:'',
      roleName:'',
      menuName:'',
      url:'',
      menuIds:'',
			total: 10,
      pageSize: 10,
      pageNum: 1,
      showSizer: true,
      pageSizeOpts: [5, 10, 20, 30],
			itemTree: [],
			columns1:[{
				type: 'selection',
				title: '选择',
				align: 'center',
				width: 50
        },{
        title:'菜单ID',
        key:'id',
        align: 'center',
				width:100
      },{
        title:'菜单编码',
        key:'code',
        align: 'center',
				width:200
      },{
        title:'菜单名称',
        key:'name',
        align: 'center',
				width:200
      },{
        title:'菜单级别',
        key:'level',
        align: 'center',
				width:100
      },{
        title:'菜单全路径',
        key:'menufullpath',
        align: 'center',
        width:150,
        render: (h, data) => {
            return h('div', [
              h('a', {
                domProps: {
                  innerHTML: "显示"
                },
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showMenuPath(data, event)
                  }
                }
              })
            ])
          }
      },{
        title:'URL',
        key:'url',
        align: 'center',
        minWidth:300
      },{
        title:'更新时间',
        key:'lastAccess',
        align: 'center',
        width:150,
        render: (h,data) => {
          return h('div',formatTime(data.row.lastAccess))
        }
      },{
        title:'操作',
        key:'operation',
        align: 'center',
				width:150,
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
                this.saveDeleteRoleMenu(data.row.id)
              }
            }
          },'删除')
        }
      }],
      tableData1:[],
		}
  },
  created () {
      // 角色信息
      let that = this;
      that.roleId = this.$route.query.id;
      that.roleName = this.$route.query.name;
      this.getMenuTree();
      this.getRoleMenuPage();
  },
	methods:{
    //获取菜单树
    getMenuTree(){
      let that = this;
      menuTree().then(res => {
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
        if (item.children && item.children.length > 0) {
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            status: item.status,
            expand: true,
            children: this.treeItem(item.children)
          };
        } else {
          return {
            id: item.id,
            value: item.code,
            title: item.label,
            status: item.status,
            children: item.children
          };
        }
      });
      return dgData;
    },
    // 获取角色关联的菜单列表
    getRoleMenuPage () {
      let form = {
        roleId: this.roleId,
        name:this.menuName,
        url:this.url,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryRoleMenuPage(formData(form)).then(res => {
        this.tableData1 = res.response.list;
        this.total = res.response.total;
        this.$Spin.hide();
      })
    },
    // 重置角色关联的菜单查询条件
    clearRoleMenuPage () {
      this.menuName = ''
      this.url = ''
    },
    // 获取菜单全路径
    showMenuPath(data, event){
      let form = {
        menuId: data.row.id
      }
      getMenuPathByMenuId(form).then(res => {
        if (res.status == "200"){
          event.target.innerText = res.response
        } else {
          this.$Message.warning(res.message);
        }
      })
    },
    //批量添加角色关联菜单
    saveAddRoleMenuList(){
      let dataList = this.$refs.tree.getCheckedNodes();
      let treeMenuIds = [];
      dataList.map (item => {
        if(item.id !=null){
          treeMenuIds.push(item.id);
        }
      });
      let form = {
        roleId: this.roleId,
        menuIds:treeMenuIds
      }
      addRoleMenuList(formData(form)).then(res => {
        this.$Message.success("添加成功！！！");
        this.getRoleMenuPage();
      })
    },
    // 删除角色关联的菜单
    saveDeleteRoleMenu(menuId) {
      let form = {
        roleId : this.roleId,
        menuId : menuId
      }
      deleteRoleMenu(formData(form)).then(res => {
        this.$Message.success("删除成功！！！");
        this.getRoleMenuPage();
      })
    },
    // 批量删除角色关联的菜单
    saveDeleteRoleMenuList() {
      let form = {
        roleId : this.roleId,
        menuIds : this.menuIds
      }
      deleteRoleMenuList(formData(form)).then(res => {
        this.$Message.success("删除成功！！！");
        this.getRoleMenuPage();
      })
    },
    //关联菜单列表多选
    selectChange1 (selection) {
      let menuIds = selection.map(item => {
        return item.id
      })
      this.menuIds = menuIds;
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
      this.getRoleMenuPage()
    },
		backtorole(){
			this.$router.push({name:'roleQueryList'})
		}
	}
}
</script>
