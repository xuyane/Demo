<template>
  <div style="height: 100%">
    <Card class="tree-wrap">
      <div class="card-header" slot="title">
        <p>数据源管理</p>
        <div class="btn-wrap">
          <Tooltip content="添加根节点">
            <Button size="small" icon="md-add-circle" @click="handleAddRootTree" style="margin-right: 5px"/>
          </Tooltip>
          <Tooltip content="添加子节点">
            <Button size="small" icon="md-albums" @click="handleAddSubTree"  style="margin-right: 5px" />
          </Tooltip>
          <Tooltip content="编辑数据源">
            <Button size="small" icon="ios-create" @click="handleUpdateTree" style="margin-right: 5px"/>
          </Tooltip>
          <Tooltip content="删除数据源">
            <Button size="small" icon="ios-trash" @click="handleDelTree"/>
          </Tooltip>
        </div>
      </div>
      <div class="tree-wrap_content">
        <Tree
          :data="treeData"
          @on-select-change="handleSelect"
        />
      </div>
    </Card>
    <Modal
      v-model="dialogVisible"
      :title="dynamicName"
      @on-ok="handleSubmit"
      @on-cancel="handleCancel"
    >
      <Form
        ref="form"
        :model="form"
        :rules="rules"
        :label-width="80"
      >
        <FormItem label="分类名称" prop="name">
          <Input v-model="form.name" autocomplete="off"></Input>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
import {
  getTree,
  addTree,
  updateTree,
  delTree,
} from "api/dataSource";
import { _uniqId, _confirm } from 'utils';

export default {
  name: 'TreeManage',
  data () {
    return {
      treeData: [],
      selectedTree: {}, // treeNode
      addTreeType: null, // root | sub
      isUpdate: false, // 是否更新子节点
      dialogVisible: false,
      maxLevel: 3,
      form: {
        name: ''
      },
      formLabelWidth: '120px',
      dynamicName: null,
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      getTree()
        .then((res) => {
          this.treeData = this.transformTree(res);
        }).catch((err) => {
          this.$Message.error('获取数据源失败')
        })
    },

    transformTree (treeData = []) {
      const { id: selectId } = this.selectedTree;
      const looper = (tree) => {
        tree.forEach((item) => {
          if (item.id === selectId) {
            item.selected = true;
            this.selectedTree = item;
          }
          if (Array.isArray(item.children) && item.children.length) {
            item.expand = true;
            looper(item.children);
          }
        })
      }

      looper(treeData);
      return treeData;
    },

    handleShowModal (title, editName) {
      this.dynamicName = title;
      if (typeof editName !== 'undefined') {
        this.form.name = editName;
      }
      this.dialogVisible = true
    },

    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.handleRemote()
        }
      })
    },

    handleCancel () {
      this.$refs['form'].resetFields()
    },

    handleAddRootTree () {
      this.addTreeType = 'root';
      this.handleShowModal('添加根节点');
    },

    handleAddSubTree () {
      const { id, level } = this.selectedTree;
      if (typeof id === 'undefined') return this.$Message.error('请先选择要添加节点的数据源');
      if (level >=  this.maxLevel) return this.$Message.error(`层级不能超过${this.maxLevel}层`);
      this.addTreeType = 'sub';
      this.handleShowModal('添加子节点');
    },

    handleUpdateTree () {
      const { id, title } = this.selectedTree;
      if (typeof id === 'undefined') return this.$Message.error('请先选择要编辑的数据源');
      this.isUpdate = true;
      this.handleShowModal('编辑数据源', title);
    },

    handleRemote () {
      // 更新操作
      if (this.isUpdate) {
        return this.handleUpdateFetch();
      }
      // 添加
      this.handleAddFetch()
    },

    // 远端更新
    handleUpdateFetch () {
      const { id } = this.selectedTree;
      const params = {
        id,
        title: this.form.name
      };
      updateTree({params})
        .then((res) => {
          this.$Message.success('更新成功');
          this.form.name = '';
          this.isUpdate = false;
          this.initData();
        }).catch((err) => {
          this.$Message.success('更新失败');
          this.form.name = '';
          this.isUpdate = false;
        })
    },

    // 添加根节点或子节点
    handleAddFetch () {
      const { id, level } = this.selectedTree;
      const isRoot = this.addTreeType === 'root';
      const params = {
        title: this.form.name,
        id: _uniqId(),
        parentId: id || '',
        isRoot,
        level: isRoot ? 1 : +level + 1,
      };

      addTree({params})
        .then((res) => {
          this.$Message.success('新增数据源成功');
          this.addTreeType = null;
          this.form.name = '';
          this.initData();
        }).catch((err) => {
          this.$Message.error('新增数据源失败');
        })
    },

    handleDelTree () {
      const { id } = this.selectedTree;
      if (typeof id === 'undefined') return this.$Message.error('请先选择要删除的数据源');
      _confirm({
        okEvt: () => {
          delTree({params: {id}})
            .then((res) => {
              this.$Message.success('删除成功');
              this.selectedTree = {};
              this.initData();
            }).catch((err) => {
              this.$Message.error('删除失败');
            })
        }
      })
    },

    handleSelect (node) {
      this.selectedTree = node && node[0] || {};
      if (+this.selectedTree.level === this.maxLevel) {
        this.$emit('updateTreeId', this.selectedTree.id);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tree-wrap {
  height: 100%;
  .card-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .btn-wrap {
      display: flex;
      align-items: center;

    }
  }
}
</style>
