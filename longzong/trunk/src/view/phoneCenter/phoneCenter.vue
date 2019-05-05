<style lang="less" scoped>
    /* // @import './phone.less'; */

    .error_tip {
        color: #ff0000;
    }

    .mar-10 {
        margin: 10px 0;
    }

    .fs16 {
        font-size: 16px;
    }

    .no-margin-left {
        margin-left: 0;
    }
</style>

<template>
    <Row class="phone">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：
            <router-link to="/plantIndex" class="link-css">呼叫中心</router-link>
            &nbsp;&nbsp;>>&nbsp;&nbsp;
            <router-link to="/phoneCenter" class="link-css">话机管理</router-link>
        </Row>
        </Col>
        <Col span="24" class-name="search-form">
        <Form :model="form" :label-width="80">
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="电话号码:">
                    <Input v-model="form.telephoneNumber" class="search-input" placeholder="请输入电话号码"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="短号:">
                    <Input v-model="form.telephoneShortNumber" class="search-input" placeholder="请输入短号"></Input>
                </FormItem>
                </Col>
                <Col span="7" class="text-right">
                <FormItem label="使用人:">
                    <Input v-model="form.employeeName" class="search-input" placeholder="请输入使用人"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row type="flex" justify="space-between">
                <Col span="7">
                <FormItem label="归属地:">
                    <Select v-model="form.locationId" class="search-input">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="状态:">
                    <Select v-model="form.status" class="search-input" clearable>
                        <Option v-for="item in statusArray" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="7" class="text-right">
                <Button type="primary" @click="searchList">查询</Button>
                <Button style="margin-left: 8px" @click="reset">重置</Button>
                </Col>
            </Row>
        </Form>
        </Col>
        <Col span="24">
        <Row class-name="table-con">
            <div class="btn-container no-margin-left">
                <Button type="primary" class="" @click="addPhone">新增号码</Button>
                <Button type="error" class="search-btn" @click="stopPhone">停用</Button>
                <Button type="primary" class="search-btn" @click="startPhone">启用</Button>
                <Button type="error" class="search-btn" @click="deletePhone">注销</Button>
                <span class="pull-right mar-t-10 fs16">
                    启用总座机{{this.startTotal}}个；未分配座机{{this.noDistribution}}个；已分配{{this.distributioned}}个，已停用{{this.disableTotal}}个
                </span>
            </div>
            <Table class="tableCommon" :data="tableData" :columns="columns" ref="dragTable" :stripe="true" :border="true" @on-selection-change="handleRowChange">

            </Table>
            <oil-page :total="total" :page-num="pageNum" :page-size="pageSize" @page-change="pageChange" :page-size-opts="pageSizeOpts"
                :show-sizer="showSizer"></oil-page>
        </Row>
        </Col>

        <add-phone-modal :showAddModal="showAddModal" @hide-modal="hideAddModal"></add-phone-modal>
        <!-- <edit-phone-modal :showEditModal="showEditModal" @hide-modal="hideEditModal" :editData="editData" ref="editModal" :checkArray1="checkArray1"></edit-phone-modal> -->
        <bind-phone-modal :showBindModal="showBindModal" @hide-modal="hideBindModal" :bindData="bindData" ref="bindModal"></bind-phone-modal>

        <!-- 解绑弹框 -->
        <Modal v-model="showUnBindModal" title="" @on-ok="doUnbind" :loading="unBindLoading" width="490">
            <div class="phone-msg">
                <img :src="unBindImg" class="" />
                <div class="msg">
                    <span>电话号码：{{unBindData.telephoneNumber}}，</span>
                    <span>短号：{{unBindData.telephoneShortNumber}}</span>
                    <br/>
                    <span class="red">解除话机设置</span>
                </div>
            </div>
        </Modal>
        <!-- 停用弹框 -->
        <Modal v-model="showStopModal" title="" width="490">
            <div class="phone-msg mar-b-0">
                <img :src="stopImg" class="stop-img" />
                <div class="msg mar-10">
                    <span>请确认号码：</span>
                    <span class="red">{{telephoneNumber}}</span>
                    <span>停用</span>
                </div>
                <div class="reason">
                    <Input v-model="stopReason" type="textarea" placeholder="请输入停用原因" @keyup.native="keyUpStop" :autosize="{minRows: 2,maxRows: 7}"></Input>
                    <div class="error_tip">{{stopRequired}}</div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="showStopModal=false">取消</Button>
                <Button type="primary" @click="doStop">确定</Button>
            </div>
        </Modal>
        <!-- 注销弹框 -->
        <Modal v-model="showDeleteModal" title="" width="490">
            <div class="phone-msg mar-b-0">
                <img :src="deleteImg" class="stop-img" />
                <div class="msg mar-10">
                    <span>请确认号码：</span>
                    <span class="red">{{telephoneNumber}}</span>
                    <span>注销</span>
                </div>
                <div class="reason">
                    <Input v-model="deleteReason" type="textarea" placeholder="请输入注销原因" @keyup.native="keyUpDelete" :autosize="{minRows: 2,maxRows: 7}"></Input>
                    <div class="error_tip">{{deleteRequired}}</div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="showDeleteModal=false">取消</Button>
                <Button type="primary" @click="doDelete">确定</Button>
            </div>
        </Modal>
        <!-- 修改弹框 -->
        <Modal v-model="showEditModal" title="修改电话号码" @on-cancel="cancelEditModal" width="750">
            <Form ref="editModal" :model="editData" :rules="editRules" :label-width="150">
                <FormItem label="电话号码">
                    <span>{{editData.telephoneNumber}}</span>
                </FormItem>
                <FormItem label="短号">
                    <span>{{editData.telephoneShortNumber}}</span>
                </FormItem>
                <FormItem label="服务商">
                    <span>{{serviceProvider}}</span>
                </FormItem>
                <FormItem label="号码归属地">
                    <span>{{locationId}}</span>
                </FormItem>
                <FormItem label="使用人员">
                    <Select ref="userPeople" v-model="editData.employeeId" :placeholder="placeholder" filterable remote clearable :remote-method="remoteMethod"
                        @on-change="changeUser" @on-clear="clearEmploy">
                        <Option v-for="(option, index) in employeeNameList" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否允许座机转手机">
                    <RadioGroup v-model="editData.transferCellphone" @on-change="showPhone">
                        <Radio label="1" :disabled="!isChangeOk">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="手机号" v-if="isShowPhone" prop="cellphoneNumber">
                    <Input v-model="editData.cellphoneNumber" class="search-input" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem label="说明">
                    <Input v-model="editData.remarks" type="textarea" class="search-input" :autosize="{minRows: 2,maxRows: 7}"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancelEditModal">取消</Button>
                <Button type="primary" @click="doEdit">确定</Button>
            </div>
        </Modal>

    </Row>
</template>

<script>
    import addPhoneModal from "./addPhone.vue";
    //import editPhoneModal from "./editPhone.vue";
    import bindPhoneModal from "./bindPhone.vue";
    import oilPage from "../components/page/page.vue";
    import { rts } from "../components/jsonp/oilJsonp.js";
    import {
        phoneNumberpage,
        totalNum,
        select_employee,
        phoneNumberModify,
        getPhone
    } from "../components/axios/phoneCenter.js";
    import { formatTime2 } from "../../assets/js/common.js";
    import axios from "axios";
    export default {
        name: "phoneCenter",
        components: {
            addPhoneModal,
            //editPhoneModal,
            bindPhoneModal,

            oilPage
        },
        data() {
            const validatePhone = (rule, value, callback) => {
                if (!Number.isInteger(+value)) {
                    callback(new Error("请输入数字值"));
                } else if (value.toString().length > 12) {
                    callback(new Error("最大长度不能超过12位"));
                } else {
                    callback();
                }
            };
            return {
                stopRequired: "",
                deleteRequired: "",
                form: {
                    telephoneNumber: "", // 电话号码
                    telephoneShortNumber: "", // 短号
                    locationId: "", // 号码归属地 1:张店, 2:临淄, 3:上海',
                    employeeName: "", // 使用人员
                    status: "" // 状态
                },
                cityList: [
                    {
                        //归属地枚举
                        key: 1,
                        value: 1,
                        label: "张店"
                    },
                    {
                        key: 2,
                        value: 2,
                        label: "临淄"
                    },
                    {
                        key: 3,
                        value: 3,
                        label: "上海"
                    }
                ],
                statusArray: [
                    {
                        key: 1,
                        value: 1,
                        label: "正常"
                    },
                    {
                        key: 2,
                        value: 0,
                        label: "禁用"
                    },
                    {
                        key: 3,
                        value: 2,
                        label: "注销"
                    }
                ],
                checkArray1: [
                    {
                        value: "产品1",
                        lbael: "300元/月"
                    },
                    {
                        value: "产品2",
                        lbael: "300元/月"
                    },
                    {
                        value: "产品3",
                        lbael: "300元/月"
                    },
                    {
                        value: "产品4",
                        lbael: "300元/月"
                    }
                ],
                unBindImg: require("@/assets/images/phone-unbind.png"),
                stopImg: require("@/assets/images/phone-stop.png"),
                deleteImg: require("@/assets/images/phone-delete.png"),
                showAddModal: false,
                showEditModal: false,
                showBindModal: false,
                showUnBindModal: false,
                showDeleteModal: false,
                showStopModal: false,
                deleteReason: "",
                stopReason: "",
                pageSizeOpts: [10, 20, 50, 100, 200],
                showSizer: true,
                total: 0,
                pageSize: 10,
                pageNum: 1,
                unBindLoading: true,
                editData: {}, // 选中数据
                bindData: {}, // 分配数据
                unBindData: {}, // 解绑数据
                telephoneNumber: "", //停用号码
                ids: "", //勾选数据id
                selectRow: [], // 勾选数据
                columns: [
                    {
                        type: "selection",
                        title: "选择",
                        align: "center",
                        width: 50
                    },
                    {
                        key: "telephoneNumber",
                        align: "center",
                        title: "电话号码",
                        width: 120
                    },
                    {
                        key: "telephoneShortNumber",
                        align: "center",
                        title: "短号",
                        minWidth: 100
                    },
                    {
                        key: "locationId",
                        align: "center",
                        title: "归属地",
                        width: 80,
                        render: (h, data) => {
                            let label =
                                data.row.locationId === 1
                                    ? "张店"
                                    : data.row.locationId === 2
                                        ? "临淄"
                                        : data.row.locationId === 3 ? "上海" : "";
                            return h(
                                "span",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    }
                                },
                                label
                            );
                        }
                    },
                    {
                        key: "serviceProvider",
                        align: "center",
                        title: "服务商",
                        minWidth: 80,
                        render: (h, data) => {
                            let label =
                                data.row.serviceProvider === 1
                                    ? "电信"
                                    : data.row.serviceProvider === 2
                                        ? "移动"
                                        : data.row.serviceProvider === 3 ? "联通" : "";
                            return h(
                                "span",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    }
                                },
                                label
                            );
                        }
                    },
                    {
                        key: "status",
                        align: "center",
                        title: "状态",
                        minWidth: 80,
                        render: (h, data) => {
                            let label =
                                data.row.status === 1
                                    ? "正常"
                                    : data.row.status === 0
                                        ? "禁用"
                                        : data.row.status === 2 ? "注销" : "";
                            if (data.row.status === 0 || data.row.status === 2) {
                                return h(
                                    "Tooltip",
                                    {
                                        props: { placement: "top" }
                                    },
                                    [
                                        label,
                                        h(
                                            "span",
                                            {
                                                slot: "content",
                                                style: {
                                                    whiteSpace: "normal",
                                                    wordBreak: "break-all"
                                                }
                                            },
                                            data.row.reason
                                        )
                                    ]
                                );
                            } else {
                                return h(
                                    "span",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small"
                                        }
                                    },
                                    label
                                );
                            }
                        }
                    },
                    {
                        key: "remarks",
                        align: "center",
                        title: "说明",
                        tooltip: true,
                        ellipsis: true,
                        minWidth: 180
                    },
                    {
                        key: "employeeName",
                        align: "center",
                        title: "使用人员",
                        minWidth: 100
                    },
                    {
                        key: "employeeOrganizationName",
                        align: "center",
                        title: "部门",
                        minWidth: 150
                    },
                    {
                        key: "transferCellphone",
                        align: "center",
                        title: "是否可转手机",
                        minWidth: 120,
                        render: (h, data) => {
                            let label =
                                data.row.transferCellphone === 1
                                    ? "是"
                                    : data.row.transferCellphone === 0 ? "否" : "";
                            return h(
                                "span",
                                {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    }
                                },
                                label
                            );
                        }
                    },
                    {
                        key: "cellphoneNumber",
                        align: "center",
                        title: "可转的手机号",
                        width: 120
                    },
                    {
                        key: "creatorName",
                        align: "center",
                        title: "创建人",
                        minWidth: 100
                    },
                    {
                        key: "lastAccess",
                        align: "center",
                        title: "最后变更时间",
                        width: 150,
                        render: (h, data) => {
                            let label = formatTime2(data.row.lastAccess);
                            return h("span", label);
                        }
                    },
                    {
                        title: "操作",
                        align: "center",
                        width: 120,
                        render: (h, data) => {
                            if (data.row.status === 1) {
                                if (
                                    data.row.employeeName !== "" &&
                                    data.row.employeeName !== undefined &&
                                    data.row.employeeName !== null
                                ) {
                                    return h("div", [
                                        h(
                                            "a",
                                            {
                                                props: {
                                                    type: "text",
                                                    size: "small"
                                                },
                                                on: {
                                                    click: () => {
                                                        // console.log(data);
                                                        this.editPhone(data);
                                                    }
                                                }
                                            },
                                            "修改 "
                                        ),
                                        h(
                                            "a",
                                            {
                                                props: {
                                                    type: "text",
                                                    size: "small"
                                                },
                                                on: {
                                                    click: () => {
                                                        this.unBindPhone(data);
                                                    }
                                                }
                                            },
                                            "解绑"
                                        )
                                    ]);
                                } else {
                                    return h("div", [
                                        h(
                                            "a",
                                            {
                                                props: {
                                                    type: "text",
                                                    size: "small",
                                                    class: "ttt"
                                                },
                                                on: {
                                                    click: () => {
                                                        this.editPhone(data);
                                                    }
                                                }
                                            },
                                            "修改 "
                                        ),
                                        h(
                                            "a",
                                            {
                                                props: {
                                                    type: "text",
                                                    size: "small"
                                                },
                                                on: {
                                                    click: () => {
                                                        this.bindPhone(data);
                                                    }
                                                }
                                            },
                                            "分配"
                                        )
                                    ]);
                                }
                            }
                        }
                    }
                ],
                tableData: [],
                disableTotal: 0,
                noDistribution: 0,
                startTotal: 0,
                distributioned: 0,
                //editModel用到的数据
                editRules: {
                    cellphoneNumber: [
                        {
                            required: true,
                            message: "请输入手机号",
                            trigger: "blur"
                        },
                        { validator: validatePhone, trigger: "change" }
                    ]
                },
                isShowPhone: false,
                isChangeOk: false,
                employeeNameList: [],
                serviceProvider: "",
                locationId: "",
                placeholder: "" //使用人员placeholder
            };
        },
        methods: {
            //editModel的方法开始
            cancelEditModal() {
                //退出修改弹窗
                this.$refs.userPeople.clearSingleSelect();
                this.showEditModal = false;
            },
            showPhone(val) {
                if (val == 0) {
                    this.isShowPhone = false;
                } else if (val == 1) {
                    this.isShowPhone = true;
                    getPhone({ employeeId: this.editData.employeeId }).then(res => {
                        this.editData.cellphoneNumber = res.response;
                    });
                }
            },
            clearEmploy() {
                this.editData.transferCellphone = "0";
                this.editData.cellphoneNumber = "";
                this.isChangeOk = false;
                this.isShowPhone = false;
            },
            changeUser(val) {
                if (!val) {
                    this.isChangeOk = false;
                } else {
                    this.isChangeOk = true;
                    getPhone({ employeeId: val }).then(res => {
                        this.editData.cellphoneNumber = res.response;
                    });
                }
            },
            doEdit() {
                if (this.isShowPhone) {
                    this.$refs.editModal.validate(valid => {
                        if (valid) {
                            // 校验通过
                            let form = {
                                id: this.editData.id,
                                telephoneNumber: this.editData.telephoneNumber,
                                telephoneShortNumber: this.editData.telephoneShortNumber,
                                locationId: this.editData.locationId,
                                employeeId: this.editData.employeeId,
                                transferCellphone: parseInt(this.editData.transferCellphone),
                                cellphoneNumber: this.isShowPhone
                                    ? this.editData.cellphoneNumber
                                    : "",
                                remarks: this.editData.remarks
                            };
                            axios({
                                url:
                                    "/callcenter/call-center/calltelephonesetting/phoneNumberModify" +
                                    "?date=" +
                                    new Date().getTime(),
                                method: "post",
                                data: form
                            })
                                .then(res => {
                                    if (res.data.status == "200") {
                                        this.$Message.success("修改成功！");
                                        this.showEditModal = false;
                                        this.query();
                                        location.reload();
                                    } else {
                                        this.$Message.warning(res.data.message);
                                    }
                                })
                                .catch(err => {
                                    this.$Message.warning(err.message);
                                });
                        } else {
                            console.log("验证没通过");
                        }
                    });
                } else {
                    let form = {
                        id: this.editData.id,
                        telephoneNumber: this.editData.telephoneNumber,
                        telephoneShortNumber: this.editData.telephoneShortNumber,
                        locationId: this.editData.locationId,
                        employeeId: this.editData.employeeId,
                        transferCellphone: parseInt(this.editData.transferCellphone),
                        cellphoneNumber: this.isShowPhone
                            ? this.editData.cellphoneNumber
                            : "",
                        remarks: this.editData.remarks
                    };
                    axios({
                        url: "/callcenter/call-center/calltelephonesetting/phoneNumberModify",
                        method: "post",
                        data: form
                    })
                        .then(res => {
                            if (res.data.status == "200") {
                                this.$Message.success("修改成功！");
                                this.showEditModal = false;
                                this.query();
                            } else {
                                this.$Message.warning(res.data.message);
                            }
                        })
                        .catch(err => {
                            this.$Message.warning(err.message);
                        });
                }
            },
            remoteMethod(query) {
                if (query !== "") {
                    let params = {
                        name: query
                    };
                    select_employee(params).then(res => {
                        const list1 = JSON.parse(res.response).map(item => {
                            return {
                                value: item.id,
                                label: item.text
                            };
                        });
                        // console.log(this.employeeNameList);
                        this.employeeNameList = list1;
                    });
                } else {
                    this.employeeNameList = [];
                }
            },
            editPhone(data) {
                // 打开修改弹窗
                this.showEditModal = true;
                let d_id = data.row.employeeId;

                this.editData = {
                    id: data.row.id,
                    telephoneNumber: data.row.telephoneNumber,
                    telephoneShortNumber: data.row.telephoneShortNumber,
                    locationId: data.row.locationId,
                    employeeId: d_id,
                    transferCellphone: data.row.transferCellphone,
                    cellphoneNumber: data.row.cellphoneNumber,
                    remarks: data.row.remarks,
                    employeeName: data.row.employeeName,
                    employeeOrganizationName: data.row.employeeOrganizationName,
                    serviceProvider: data.row.serviceProvider
                };
                // this.editData = JSON.parse(JSON.stringify(data.row));

                //是否允许座机转手机
                this.editData.transferCellphone += "";
                if (this.editData.transferCellphone === "1") {
                    this.isShowPhone = true;
                } else {
                    this.isShowPhone = false;
                }
                //转换使用人员
                if (
                    this.editData.employeeName != "" &&
                    this.editData.employeeName !== null &&
                    this.editData.employeeName !== undefined
                ) {
                    let s =
                        this.editData.employeeName +
                        "(" +
                        this.editData.employeeOrganizationName +
                        ")";
                    this.employeeNameList = [
                        {
                            label: s,
                            value: this.editData.employeeId
                        }
                    ];
                    this.isChangeOk = true;
                } else {
                    this.isChangeOk = false;
                }

                //转换服务商
                this.serviceProvider =
                    this.editData.serviceProvider === 1
                        ? "电信"
                        : this.editData.serviceProvider === 2
                            ? "移动"
                            : this.editData.serviceProvider === 3 ? "联通" : "";
                //转换归属地
                this.locationId =
                    this.editData.locationId === 1
                        ? "张店"
                        : this.editData.locationId === 2
                            ? "临淄"
                            : this.editData.locationId === 3 ? "上海" : "";
            },
            // editModel的方法结束
            searchList: function () {
                this.pageChange(1, 10);
            },
            query() {
                let form = {
                    telephoneNumber: this.form.telephoneNumber,
                    telephoneShortNumber: this.form.telephoneShortNumber,
                    locationId: this.form.locationId,
                    employeeName: this.form.employeeName,
                    status: this.form.status,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                let _this = this;
                this.selectRow = [];
                phoneNumberpage(form).then(res => {
                    console.log("列表数据", res.response.list);
                    _this.tableData = res.response.list;
                    _this.total = res.response.total;
                });

                totalNum(form).then(res => {
                    _this.disableTotal = res.response.disableTotal;
                    _this.noDistribution = res.response.noDistribution;
                    _this.startTotal = res.response.startTotal;
                    _this.distributioned = res.response.distributioned;
                });
            },
            reset() {
                this.form = {
                    telephoneNumber: "", // 电话号码
                    telephoneShortNumber: "", // 短号
                    locationId: "", // 号码归属地 1:张店, 2:临淄, 3:上海',
                    employeeName: "", // 使用人员
                    status: "" // 状态
                };
            },
            remove(index) {
                // 1
            },
            handlePageSize() {
                // 1
            },
            handlePage() {
                // 2
            },
            addPhone() {
                // 打开新增弹窗
                this.showAddModal = true;
            },
            unBindPhone(data) {
                // 解绑
                this.showUnBindModal = true;
                this.unBindData = data.row;
            },
            bindPhone(data) {
                // 分配
                this.showBindModal = true;
                this.bindData = data.row;
                this.$refs.bindModal.setForm();
            },
            hideAddModal() {
                // 隐藏新增弹窗
                this.showAddModal = false;
                this.query();
                location.reload();
            },
            hideEditModal() {
                // 隐藏修改弹窗
                this.showEditModal = false;
                this.query();
                location.reload();
            },
            hideBindModal() {
                // 隐藏分配弹窗
                this.showBindModal = false;
                this.query();
                location.reload();
            },
            doUnbind(data) {
                let _this = this;
                let form = "id=" + this.unBindData.id;
                axios({
                    url: "/callcenter/call-center/calltelephonesetting/unsetting",
                    method: "post",
                    data: form
                })
                    .then(function (resp) {
                        if (resp.data.status == "200") {
                            _this.unBindLoading = false;
                            _this.showUnBindModal = false;
                            _this.query();
                        } else {
                            _this.$Message.warning(resp.data.message);
                        }
                    })
                    .catch(function (err) {
                        _this.unBindLoading = false;
                        _this.$Message.warning(err.message);
                    });
                setTimeout(function () {
                    _this.unBindLoading = false;
                    _this.$nextTick(() => {
                        _this.unBindLoading = true;
                    });
                }, 1);
            },
            stopPhone() {
                if (this.selectRow.length === 0) {
                    this.$Message.warning("请勾选数据");
                    return false;
                } else {
                    this.showStopModal = true;
                    this.stopReason = "";
                    this.stopRequired = "";
                    this.telephoneNumber = this.selectRow
                        .map(v => {
                            return v.telephoneNumber;
                        })
                        .join(",");
                }
            },
            doStop() {
                if (this.stopReason == "") {
                    this.stopRequired = "停用原因为必填项!";
                    return false;
                } else {
                    let ids = this.selectRow
                        .map(v => {
                            return v.id;
                        })
                        .join(",");
                    let form = "ids=" + ids + "&reason=" + this.stopReason;
                    let _this = this;
                    axios({
                        url:
                            "/callcenter/call-center/calltelephonesetting/disabled" +
                            "?date=" +
                            new Date().getTime(),
                        method: "post",
                        data: form
                    })
                        .then(function (resp) {
                            if (resp.data.status == "200") {
                                _this.$Message.success("停用成功！");
                                _this.showStopModal = false;
                                _this.query();
                                location.reload();
                            } else {
                                _this.$Message.warning(resp.data.message);
                            }
                        })
                        .catch(function (err) {
                            _this.$Message.warning(err.message);
                        });
                }
            },
            keyUpStop() {
                if (this.stopReason) {
                    this.stopRequired = "";
                } else {
                    this.stopRequired = "停用原因为必填项!";
                }
            },
            deletePhone() {
                if (this.selectRow.length === 0) {
                    this.$Message.warning("请勾选数据");
                    return false;
                } else {
                    this.showDeleteModal = true;
                    this.deleteReason = "";
                    this.deleteRequired = "";
                    this.telephoneNumber = this.selectRow
                        .map(v => {
                            return v.telephoneNumber;
                        })
                        .join(",");
                }
            },
            doDelete() {
                if (this.deleteReason == "") {
                    this.deleteRequired = "注销原因为必填项!";
                    return false;
                } else {
                    let ids = this.selectRow
                        .map(v => {
                            return parseInt(v.id);
                        })
                        .join(",");
                    let form = "ids=" + ids + "&reason=" + this.deleteReason;
                    let _this = this;

                    axios({
                        url:
                            "/callcenter/call-center/calltelephonesetting/phoneNumberRemove" +
                            "?date=" +
                            new Date().getTime(),
                        method: "post",
                        data: form
                    })
                        .then(function (resp) {
                            if (resp.data.status == "200") {
                                _this.$Message.success("注销成功！");
                                _this.showDeleteModal = false;
                                _this.query();
                                location.reload();
                            } else {
                                _this.$Message.warning(resp.data.message);
                            }
                        })
                        .catch(function (err) {
                            _this.$Message.warning(err.message);
                        });
                }
            },
            keyUpDelete() {
                if (this.deleteReason) {
                    this.deleteRequired = "";
                } else {
                    this.deleteRequired = "停用原因为必填项!";
                }
            },
            startPhone() {
                if (this.selectRow.length === 0) {
                    this.$Message.warning("请勾选数据");
                    return false;
                } else {
                    let ids = this.selectRow
                        .map(v => {
                            return v.id;
                        })
                        .join(",");
                    let form = "ids=" + ids;
                    let _this = this;

                    axios({
                        url:
                            "/callcenter/call-center/calltelephonesetting/start" +
                            "?date=" +
                            new Date().getTime(),
                        method: "post",
                        data: form
                    })
                        .then(function (resp) {
                            if (resp.data.status == "200") {
                                _this.$Message.success("启用成功！");
                                _this.query();
                                location.reload();
                            } else {
                                _this.$Message.warning(resp.data.message);
                            }
                        })
                        .catch(function (err) {
                            _this.$Message.warning(err.message);
                        });
                }
            },
            handleRowChange(row) {
                this.selectRow = row;
            },
            pageChange(page, pageSize) {
                //分页
                if (page) {
                    this.pageNum = page;
                }
                if (pageSize) {
                    this.pageSize = pageSize;
                }
                this.query();
            }
        },
        mounted() {
            this.query();
        }
    };
</script>