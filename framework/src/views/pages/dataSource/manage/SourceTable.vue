<template>
  <Card class="source-table">
    <div class="card-header" slot="title">
      <p slot="title">数据源详情</p>
      <Button type="primary" @click="handleAdd">添加</Button>
      <Button type="warning" style="margin-left: 10px" @click="handleDelAll">删除</Button>
    </div>
    <div class="source-table_content" ref="tableWrap">
      <Table
        border
        :loading="loading"
        :columns="tableColumns"
        :data="tableData"
        @on-selection-change="handleChangeSelection"
      />
      <div class="page-container">
        <Page
          :total="total"
          show-elevator
          show-total
          :current="currentPage"
          :pageSize="pageSize"
          @on-change="handleChangePage"
        />
      </div>
    </div>
    <Modal v-model="dialogVisible" :title="dynamicName" footer-hide @on-cancel="handleModalCancel">
      <form-creator
        ref="formCreator"
        :form="formVals"
        :rules="formRules"
        @on-submit="handleSubmit"
      />
    </Modal>
  </Card>
</template>

<script>
import { default as renderColumns, schema } from "./schema";
import {
  renderButton,
  renderDeleteButton,
  filterSchemaList,
  renderSchemaForm,
  renderSchemaRules,
  setSchemaEditValue,
  _confirm,
} from "utils";
import FormCreator from "./FormCreator";
import { getList, addItem, updateItem, delItem } from "api/dataSource";

export default {
  name: "SourceTable",
  components: {
    FormCreator
  },
  props: {
    treeId: String
  },
  data() {
    return {
      tableData: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      formVals: [],
      formRules: [],
      dialogVisible: false,
      dynamicName: null,
      editTableId: null,
      selectedIds: []
    };
  },
  computed: {
    tableColumns() {
      const list = this.renderAction();
      return renderColumns(list);
    }
  },
  created() {
    // this.initData();
    this.initForm();
  },
  watch: {
    treeId(newId) {
      this.initData(newId);
    }
  },
  methods: {
    initData(newId) {
      const params = {
        treeId: newId || this.treeId,
        current: this.currentPage,
        pageSize: this.pageSize
      };
      this.loading = true;
      getList({ params })
        .then(res => {
          const { total, list } = res || {};
          this.tableData = list;
          this.total = total;
          this.loading = false;
          this.$refs.tableWrap.parentNode.scrollTo(0, 0)
        })
        .catch(err => {
          this.loading = false;
        });
    },

    initForm() {
      const formSchema = filterSchemaList(schema, "form");
      this.formVals = renderSchemaForm(formSchema, true);
      this.formRules = renderSchemaRules(formSchema);
    },

    handleModalCancel() {
      this.$refs.formCreator.handleReset();
    },

    handleSubmit(params) {
      if (this.editTableId === null) {
        return this.handleFetchAdd(params);
      }
      this.handleFetchEdit(params);
    },

    handleAdd() {
      this.dynamicName = "添加数据源";
      this.editTableId = null;
      this.dialogVisible = true;
    },

    handleChangePage(cur) {
      this.currentPage = cur;
      this.initData();
    },

    handleEdit(column, $index) {
      const { id, ...query } = column.row;
      this.dynamicName = "编辑数据源";
      this.editTableId = id;
      let formSchema = filterSchemaList(schema, "form");
      formSchema = setSchemaEditValue(formSchema, query);
      this.formVals = renderSchemaForm(formSchema);
      this.dialogVisible = true;
    },

    handleFetchAdd(params) {
      addItem({ params })
        .then(res => {
          this.$Message.success("添加数据源成功");
          this.dialogVisible = false;
          this.$refs.formCreator.handleReset();
          this.initData();
        })
        .catch(err => {
          this.$Message.error("添加数据源失败");
        });
    },

    handleFetchEdit(params) {
      updateItem({ params: { id: this.editTableId, ...params } })
        .then(res => {
          this.$Message.success("修改数据源成功");
          this.$refs.formCreator.handleReset();
          this.dialogVisible = false;
          this.initData();
        })
        .catch(err => {
          this.$Message.error("修改数据源失败");
        });
    },

    handleFectchDelete(params) {
      delItem(params)
        .then(res => {
          this.$Message.success("删除成功");
          this.initData();
        })
        .catch(err => {
          this.$Message.error("删除失败");
        });
    },

    handleDelete(column) {
      const params = {
        ids: [column.row.id]
      };
      this.handleFectchDelete({ params });
    },

    handleDelAll() {
      if (this.selectedIds.length === 0) return this.$Message.error("请先选择要删除的数据");
      const params = {
        ids: this.selectedIds
      };
      const confirmParams = {
        okEvt: () => {
          this.handleFectchDelete({ params });
          this.selectedIds = [];
        }
      }
      _confirm(confirmParams);
    },

    handleChangeSelection(selection) {
      this.selectedIds = selection.map(item => item.id);
    },

    renderAction() {
      const list = [
        {
          key: "action",
          fn: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "align-items": "center"
                }
              },
              [
                renderButton(h, params, {
                  content: "编辑",
                  evt: this.handleEdit
                }),
                renderDeleteButton(h, params, {
                  okEvt: this.handleDelete,
                  cancelEvt: () => {}
                })
              ]
            );
          }
        }
      ];
      return list;
    }
  }
};
</script>

<style lang="less" scoped>
.source-table {
  height: 100%;
  .card-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .page-container {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
