<style lang="less" scoped>
.myDetails {
  background: #ffffff;
  padding: 30px 20px;
}
.infoTable {
  border: 1px solid rgb(187, 187, 187);
  border-collapse: collapse;
  width: 100%;
}
.infoTable td {
  border: 1px solid rgb(187, 187, 187);
  width: auto;
  height: 52px;
  text-align: center;
}
.bac {
  background: #eee;
}
.text-c {
  text-align: center;
}
.my-addAccount-out .mar-top-20 {
  margin-top: 20px;
}
.add-invoice-btn button {
  margin-left: 45px;
}
.add-incoice-form {
  width: 600px;
}
</style>


<template>
    <Row class="my-addAccount-out">
        <Col span="24">
        <Row class-name="current-position">
            当前位置：财务管理&nbsp;&nbsp;>>&nbsp;&nbsp;到账管理&nbsp;&nbsp;>>&nbsp;&nbsp;新增
        </Row>
        </Col>
        <Col span="24" class="myDetails mar-top-20">
        <Col span="24" class="product-opening-table">
        <Form ref="addAccountForm" :model="addAccountForm" :rules="addRules" :label-width="170" class="add-incoice-form">
            <FormItem label="支付方式:" prop="payType">
                <Select class="search-input" v-model="addAccountForm.payType" @on-change="onchange">
                    <Option v-for="item in payStyle" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="账户类型:" prop="accountType">
                <Select class="search-input" :disabled="!addRules.accountType[0].required" v-model="addAccountForm.accountType">
                    <Option v-for="item in bankList" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </FormItem>
            <FormItem label="交易流水号:" prop="transferNo">
                <Input v-model="addAccountForm.transferNo" class="search-input" placeholder="请输入交易流水号"></Input>
            </FormItem>
            <FormItem label="来源(支付/支付人信息):" prop="transferFrom">
                <Input v-model="addAccountForm.transferFrom" class="search-input" placeholder="请输入来源(支付/支付人信息)"></Input>
            </FormItem>
            <FormItem label="对方账号:" prop='accountNo'>
                <Input v-model="addAccountForm.accountNo" class="search-input" placeholder="请输入对方账号"></Input>
            </FormItem>
            <FormItem label="对方开户行:">
                <Input placeholder="请输入开户行" class="search-input" v-model="addAccountForm.depositFrom"></Input>
            </FormItem>
            <FormItem label="到账时间:" prop='transferTime'>
                <DatePicker class="search-input" v-model="addAccountForm.transferTime" type="datetime" placeholder="请选择时间" style="width: 100%"></DatePicker>
            </FormItem>
            <FormItem label="到账金额:" prop='totalAmout'>
                <Input v-model="addAccountForm.totalAmout" class="search-input" placeholder="请输入到账金额"></Input>
            </FormItem>
            <FormItem label="备注:">
                <Input v-model="addAccountForm.note" class="search-input" placeholder="请输入备注"></Input>
            </FormItem>
        </Form>
        <div class="mar-t-20 add-invoice-btn">
            <Col span="2">.</Col>
            <Col span="18">
            <Button type="primary" @click="saveReturn">保存并返回</Button>
            <Button type="primary" @click="saveAdd">保存并新建</Button>
            <Button @click="returnPage">返回</Button>
            </Col>
            <Col span="4">.</Col>
        </div>
        </Col>

        </Col>
    </Row>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        const transferNo = (rule, value, callback) => {
            const reg = /^[1-9]\d/;
            if (this.addAccountForm.payType === "125002") {
                callback()
            } else {
                if (reg.test(value) === false) {
                    callback(new Error('请输入数字'))
                } else {
                    callback()
                }
            }
        };
        const validateAccount = (rule, value, callback) => {
            const reg = /^\-?[1-9]\d*.?\d*$/g;
            if (reg.test(value) === false) {
                callback(new Error('可输入小数点、负号、数字的组合'))
            } else {
                callback()
            }
        };
        return {
            vildes: true,
            bankList: [],
            payStyle: [],
            bankLists: [],
            cashList: [
                {
                    value: '122001',
                    label: '现金'
                }
            ],
            thirdList: [],
            addAccountForm: {
                payType: null,//支付类型
                accountType: 122,//账户类型
                transferNo: '',//交易流水号
                note: '',//备注
                totalAmout: null,//到账金额
                transferFrom: '',//付款来源
                transferTime: null,//到账时间
                depositFrom: '',//对方开户行
                accountNo: '',//对方账号
            },
            addRules: {
                payType: [
                    {
                        required: true,
                        message: "支付类型不能为空",
                        trigger: "change"
                    },
                ],
                accountType: [
                    {
                        required: true,
                        message: "账户类型不能为空",
                        trigger: "change"
                    }
                ],
                transferTime: [{
                    required: true,
                    type: 'date',
                    message: "到账时间不能为空",
                    trigger: "change"
                }],
                totalAmout: [
                    {
                        required: true,
                        message: "到账金额不能为空",
                        trigger: "blur"
                    },
                    { validator: validateAccount, trigger: "blur" }
                ],
                transferFrom: [
                    {
                        required: true,
                        message: "付款来源不能为空",
                        trigger: "change"
                    },
                ],
                transferNo: [
                    {
                        required: true,
                        message: "交易流水号不能为空",
                        trigger: "blur"
                    },
                    { validator: transferNo, trigger: "blur" }
                ]
            }
        }
    },
    created() {
        this.payTypeEnum();
        this.ThirdPayTypeEnum()
        this.EbankTypeEnum()
    },
    methods: {
        returnPage() {
            this.$router.go(-1)
        },
        payTypeEnum() {
            let that = this
            axios({
                url: '/finance/common/select',
                method: 'get',
                params: {
                    type: 'PayTypeEnum',
                },
            }).then(resp => {
                if (resp.data.status == '200') {
                    //console.log(resp)
                    const payStyle = resp.data.response.filter(item => item.desc !== '其他').map(item => {
                        return {
                            value: item.value,
                            label: item.desc
                        };
                    })
                    that.payStyle = payStyle
                } else {
                    that.$Message.warning(resp.data.message)
                }
            }).catch(err => {
                this.$Message.warning(err.message)
            })
        },
        ThirdPayTypeEnum() {
            let that = this
            axios({
                url: '/finance/common/select',
                method: 'get',
                params: {
                    type: 'ThirdPayTypeEnum',
                },
            }).then(resp => {
                if (resp.data.status == '200') {
                    //console.log(resp)
                    const thirdList = resp.data.response.map(item => {
                        return {
                            value: item.value,
                            label: item.desc
                        };
                    })
                    that.thirdList = thirdList
                    //console.log( that.thirdList)
                } else {
                    that.$Message.warning(resp.data.message)
                }
            }).catch(err => {
                this.$Message.warning(err.message)
            })
        },
        EbankTypeEnum() {
            let that = this
            axios({
                url: '/finance/common/select',
                method: 'get',
                params: {
                    type: 'EbankTypeEnum',
                },
            }).then(resp => {
                if (resp.data.status == '200') {
                    const bankLists = resp.data.response.map(item => {
                        return {
                            value: item.value,
                            label: item.desc
                        };
                    })
                    that.bankLists = bankLists
                } else {
                    that.$Message.warning(resp.data.message)
                }
            }).catch(err => {
                this.$Message.warning(err.message)
            })
        },
        onchange() {
            this.addRules.transferNo[0].required = true;
            if (this.addAccountForm.payType === "125002") {
                this.addAccountForm.accountType = 122001;
                this.addRules.transferNo[0].required = false;
                this.addRules.accountType[0].required = true;
                this.bankList = this.cashList;
            } else if (this.addAccountForm.payType === "125003") {
                this.addAccountForm.accountType = 121001;
                this.bankList = this.thirdList;
                this.addRules.accountType[0].required = true;
            } else if (this.addAccountForm.payType === "125001") {
                this.addAccountForm.accountType = 120001;
                this.bankList = this.bankLists.filter(currentObj => {
                    if (currentObj.value != "120006" && currentObj.value != "120100") {
                        return currentObj
                    }
                });
                this.addRules.accountType[0].required = true;
            } else {
                this.addRules.accountType[0].required = false;
                this.addAccountForm.accountType = 123001;
            }
        },
        saveAdd() {//保存并新建
            let that = this;
            that.$refs.addAccountForm.validate(valid => {
                if (valid) {
                    let colTime = new Date(that.addAccountForm.transferTime).getTime();
                    let addForms = {
                        payType: that.addAccountForm.payType,//支付类型
                        accountType: that.addAccountForm.accountType,//账户类型
                        transferNo: that.addAccountForm.transferNo,//交易流水号
                        note: that.addAccountForm.note,//备注
                        totalAmout: that.addAccountForm.totalAmout,//到账金额
                        transferFrom: that.addAccountForm.transferFrom,//付款来源
                        transferTime: colTime,//到账时间
                        depositFrom: that.addAccountForm.depositFrom,//对方开户行
                        accountNo: that.addAccountForm.accountNo,//对方账号
                    }
                    axios({
                        url: '/finance/account_transfer/save',
                        method: 'post',
                        data: addForms,
                    }).then(resp => {
                        if (resp.data.status == '200') {
                            that.$Message.success('新增成功');
                            setTimeout(function () {
                                window.location.reload();
                            }, 1000)

                        } else {
                            that.$Message.warning(resp.data.message)
                        }
                    }).catch(err => {
                        this.$Message.warning(err.message)
                    })
                }
            })
        },
        saveReturn() {//保存并返回
            this.$refs.addAccountForm.validate(valid => {
                if (valid) {
                    let that = this;
                    let colTime = new Date(this.addAccountForm.transferTime).getTime();
                    let addForms = {
                        payType: this.addAccountForm.payType,//支付类型
                        accountType: this.addAccountForm.accountType,//账户类型
                        transferNo: this.addAccountForm.transferNo,//交易流水号
                        note: this.addAccountForm.note,//备注
                        totalAmout: this.addAccountForm.totalAmout,//到账金额
                        transferFrom: this.addAccountForm.transferFrom,//付款来源
                        transferTime: colTime,//到账时间
                        depositFrom: this.addAccountForm.depositFrom,//对方开户行
                        accountNo: this.addAccountForm.accountNo,//对方账号
                    }
                    axios({
                        url: '/finance/account_transfer/save',
                        method: 'post',
                        data: addForms,
                    }).then(resp => {
                        if (resp.data.status == '200') {
                            that.$Message.success('新增成功');
                            this.$router.go(-1)
                        } else {
                            that.$Message.warning(resp.data.message)
                        }
                    }).catch(err => {
                        this.$Message.warning(err.message)
                    })
                }
            })
        }
    }

}
</script>


