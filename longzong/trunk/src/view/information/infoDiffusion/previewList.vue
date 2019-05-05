<template>
    <Row>
        <Col span="24">
            <Row class-name="current-position">
                当前位置：
                <router-link to="/plantIndex" class="link-css">信息发布管理</router-link>&nbsp;&nbsp;>>&nbsp;&nbsp;
                <a @click="backPre" class="link-css">信息发布</a>
                &nbsp;&nbsp;>>&nbsp;&nbsp;
                <a @click="goto" class="link-css">预览列表</a>
            </Row>
        </Col>
        <Col span="24" class-name="search-form">
            <Row>
                <div class="unit">
                    <div class="unit_title reviewList1">
                        <span>预览列表</span>
                    </div>
                    <Table class="tableCommon" border :columns="tableColumn" :data="tableData"></Table>
                </div>
            </Row>
        </Col>
        <div class="btn-dibu">
            <Button :disabled="isPreview" @click="publishAll">发布</Button>
            <Button @click="cancel">取消</Button>
        </div>

        <Modal v-model="messageModal" title="短信内容预览" width="750">
            <Form :label-width="120">
                <FormItem label="短信内容">
                    <Input type="textarea" v-model="messageContent" disabled></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="hideMessageModal">确定</Button>
            </div>
        </Modal>

        <Modal v-model="flashModal" title="短讯通内容预览" width="750">
            <Form :label-width="120">
                <FormItem label="短讯通标题">
                    <Input type="textarea" v-model="flashTitle" disabled></Input>
                </FormItem>
                <FormItem label="短讯通内容">
                    <Input type="textarea" v-model="flashContent" disabled></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="hideFlashModal">确定</Button>
            </div>
        </Modal>

        <Modal
            v-model="articleModal"
            title="文章预览"
            :styles="{top: '0',left: '0',width: '100%',height: '100%',overflow:'scroll',background:'#FFF'}"
        >
            <div id="article" v-html="articleHtml"></div>
            <div class="notice" @click="hideArticleModal" v-show="articleModal">退出预览</div>
            <div slot="footer"></div>
        </Modal>
    </Row>
</template>
<script>
import axios from "axios";
import {
    getArticleParams,
    previewArticle
} from "../unitmangement/api/infoDiffusion";
import { formData } from "../../../assets/js/common.js";
import { debug } from "util";
export default {
    name: "previewList",
    components: {},
    data() {
        return {
            tableColumn: [
                {
                    title: "标题",
                    key: "title",
                    width: 200,
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                style: {
                                    overflow: "hidden",
                                    "text-overflow": "ellipsis",
                                    "white-space": "nowrap"
                                }
                            },
                            params.row.title
                        );
                    }
                },
                {
                    title: "内容",
                    key: "content",
                    width: 300,
                    render: (h, params) => {
                        return h(
                            "p",
                            {
                                style: {
                                    overflow: "hidden",
                                    "text-overflow": "ellipsis",
                                    "white-space": "nowrap"
                                }
                            },
                            this.$deleteTag(params.row.content)
                        );
                    }
                },
                {
                    title: "发布方式",
                    key: "type"
                },
                {
                    title: "发布人",
                    key: "publisherName"
                },
                {
                    title: "预览状态",
                    key: "isView"
                },
                {
                    title: "是否发布",
                    key: "isPublish"
                },
                {
                    title: "操作",
                    key: "operation",
                    width: 180,
                    render: (h, data) => {
                        return h("div", [
                            h(
                                "a",
                                {
                                    props: {},
                                    style: {
                                        marginRight: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            this.preview(data.row);
                                        }
                                    }
                                },
                                "前台预览"
                            ),
                            h(
                                "a",
                                {
                                    props: {},
                                    style: {
                                        marginRight: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(data.row);
                                        }
                                    }
                                },
                                "修改"
                            ),
                            h(
                                "a",
                                {
                                    props: {},
                                    on: {
                                        click: () => {
                                            this.publish(data.row);
                                        }
                                    }
                                },
                                data.row.publishType
                            )
                        ]);
                    }
                }
            ],
            tableData: [],
            articleHtml: "",
            articleModal: false,
            messageModal: false,
            messageContent: "",
            flashModal: false,
            flashTitle: "",
            flashContent: "",
            publishData: "",
            isPreview: false
        };
    },
    created() {
        this.initData();
    },
    methods: {
        goto() {
            window.reload();
        },
        backPre() {
            this.$router.go(-1);
        },
        initData() {
            this.tableData = JSON.parse(localStorage.getItem("data"));
            this.tableData.forEach(function(ele) {
                ele.isPublish = "是";
                ele.isView = "未预览";
                ele.publishType = "取消发布";
                if (ele.displayType == 1) {
                    ele.type = "文章";
                    ele.list = ele.title;
                } else if (ele.displayType == 2) {
                    ele.type = "短信";
                    ele.list = ele.content;
                } else {
                    ele.type = "短讯";
                    ele.list = ele.content;
                }
            });
        },
        publish(data) {
            if (data.isPublish == "是") {
                data.isPublish = "否";
                data.publishType = "发布";
                this.tableData.forEach(function(ele) {
                    if (ele.messageId == data.messageId) {
                        ele.isPublish = "否";
                    }
                });
            } else {
                data.isPublish = "是";
                data.publishType = "取消发布";
                this.tableData.forEach(function(ele) {
                    if (ele.messageId == data.messageId) {
                        ele.isPublish = "是";
                    }
                });
            }
        },
        cancel() {
            this.$router.push({ name: "myInformationUnit" });
        },
        preview(data) {
            console.log("123456", data);
            if (data.displayType == 1) {
                this.publishData = [
                    {
                        messageId: data.messageId,
                        type: data.displayType
                    }
                ];

                let params = {
                    articleId: data.messageId
                };
                getArticleParams(formData(params)).then(res => {
                    if (res.response.channelId && res.response.columnId) {
                        data.isView = "已预览";
                        if (data.siteId == 2) {
                            window.open(
                                `https://templates.oilchem.net/article_ens.html?articleId=${
                                    data.messageId
                                }&channelId=${
                                    res.response.channelId
                                }&columnId=${res.response.columnId}&debug=1`
                            );
                        } else if (data.siteId == 1) {
                            window.open(
                                `https://templates.oilchem.net/article_chs.html?articleId=${
                                    data.messageId
                                }&channelId=${
                                    res.response.channelId
                                }&columnId=${res.response.columnId}&debug=1`
                            );
                        }

                        this.tableData.forEach(function(ele) {
                            if (ele.messageId == data.messageId) {
                                ele.isView = "已预览";
                            }
                        });
                    } else {
                        this.$Message.info(
                            "该信息单元没关联栏目和频道,无法预览"
                        );
                    }
                });
            } else if (data.displayType == 2) {
                this.messageModal = true;
                this.messageContent = this.$deleteTag(data.list);
                data.isView = "已预览";
                this.tableData.forEach(function(ele) {
                    if (ele.messageId == data.messageId) {
                        ele.isView = "已预览";
                    }
                });
            } else if (data.displayType == 3) {
                this.flashModal = true;
                this.flashTitle = data.title;
                this.flashContent = this.$deleteTag(data.list);
                data.isView = "已预览";
                this.tableData.forEach(function(ele) {
                    if (ele.messageId == data.messageId) {
                        ele.isView = "已预览";
                    }
                });
            }
        },
        hideMessageModal() {
            this.messageModal = false;
        },
        hideFlashModal() {
            this.flashModal = false;
        },
        hideArticleModal() {
            this.articleModal = false;
        },
        edit(data) {
            this.$router.push({
                name: "editList",
                query: {
                    item: JSON.stringify(data)
                }
            });
        },
        publishAll() {
            var data = [];
            var tempArray = [];
            var errorTips = "";
            var NoPublish = [];
            this.tableData.forEach(function(ele) {
                console.log("ele", ele);
                if (ele.isPublish == "是" && ele.isView == "已预览") {
                    data.push({
                        type: ele.displayType,
                        messageId: ele.messageId,
                        createTime: ele.createTime
                    });
                } else if (ele.isPublish == "是" && ele.isView == "未预览") {
                    let arrOne =
                        "标题为'" +
                        ele.title +
                        "'的" +
                        ele.type +
                        "没预览，请预览后发布";
                    tempArray.push(arrOne);
                    console.log(arrOne);
                } else if (ele.isPublish == "否") {
                    NoPublish.push(ele.isPublish);
                }
            });
            
            let params = {
                contents: JSON.stringify(data)
            };
            if (NoPublish.length == this.tableData.length) {
                this.$Message.info("没有可发布的单元");
            } else if (tempArray.length > 0) {
                for (var i = 0; i < tempArray.length; i++) {
                    errorTips += "<p>" + tempArray[i] + "</p>";
                }
                this.$Modal.warning({
                    title: "提示",
                    content: "发布失败！请查看对应状态：" + errorTips
                });
            } else {
                var that = this;
                that.isPreview = true;
                axios({
                    url: "/information/unit/push_message",
                    method: "post",
                    data: formData(params)
                })
                    .then(res => {
                        if (
                            res.data.message === "OK" ||
                            res.data.status === "200"
                        ) {
                            that.$router.push({ name: "myInformationUnit" });
                            that.$Message.info("发布成功");
                        } else {
                            that.isPreview = false;
                            that.$Message.error(res.data.message);
                        }
                    })
                    .catch(err => {
                        that.isPreview = false;
                    });
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import "../taskplant/taskplant.less";
.reviewList1 {
    margin-bottom: 30px;
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
#article {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    overflow: scroll;
}

.notice {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    background: #2b85e4;
    color: #ffffff;
}
</style>

