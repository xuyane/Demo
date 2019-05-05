import Vue from 'vue'
import { Message } from 'iview'

export default {
    // 1代表原油
    '1': [{
            title: '创建时间',
            minWidth: 100,
            key: 'indexDate',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'varietiesName',
            align: 'center'
        },
        {
            title: '油种类型',
            minWidth: 100,
            key: 'specificationsName',
            align: 'center'
        },
        {
            title: '所在区域',
            minWidth: 100,
            key: 'regionName',
            align: 'center'
        },
        {
            title: '市场',
            minWidth: 100,
            key: 'marketTypeName',
            align: 'center'
        },
        {
            title: '收盘价',
            minWidth: 100,
            key: 'indexValue',
            align: 'center',
            render: (h, data) => {
                let that = this;
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.indexValue,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.indexValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.indexValue = ele.target.value
                                    } else {
                                        data.row.indexValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //   'span',
                    //   {
                    //     style: {
                    //       display: data.row.isEdit ? 'none' : 'inline-block'
                    //     }
                    //   }, data.row.indexValue
                    // )
                    // h(
                    //   'Icon',
                    //   {
                    //     props: {
                    //       type: 'ios-create-outline'
                    //     },
                    //     domProps: {
                    //       title: '点击修改'
                    //     },
                    //     style: {
                    //       fontSize: '26px',
                    //       cursor: 'pointer',
                    //       marginLeft: '10px'
                    //     },
                    //     on: {
                    //       click: () => {
                    //         console.log(data.isEdit)
                    //         console.log(!data.isEdit)
                    //         data.row.isEdit = !data.row.isEdit
                    //       }
                    //     }
                    //   }
                    // )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center'
        },
        {
            title: '备注',
            minWidth: 100,
            key: 'remark',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.remark,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                ])
            }
        }

    ],
    // 2企业出厂价
    '2': [{
            title: '发布时间',
            minWidth: 100,
            key: 'indexDate',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'varietiesName',
            align: 'center'
        },
        {
            title: '规格型号',
            minWidth: 100,
            key: 'specificationsName',
            align: 'center'
        },
        {
            title: '所在区域',
            minWidth: 100,
            key: 'regionName',
            align: 'center'
        },
        {
            title: '企业名称',
            minWidth: 100,
            key: 'memberName',
            align: 'center'
        },
        {
            title: '收盘价',
            minWidth: 100,
            key: 'indexValue',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.indexValue,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.indexValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.indexValue = ele.target.value
                                    } else {
                                        data.row.indexValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center'
        },
        {
            title: '备注',
            minWidth: 100,
            key: 'remark',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.remark,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                ])
            }
        }

    ],
    // 国内市场价
    '3': [{
            title: '发布时间',
            minWidth: 100,
            key: 'indexDate',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'varietiesName',
            align: 'center'
        },
        {
            title: '规格',
            minWidth: 100,
            key: 'specificationsName',
            align: 'center'
        },
        {
            title: '标准',
            minWidth: 100,
            key: 'standard',
            align: 'center'
        },
        {
            title: '区域',
            minWidth: 100,
            key: 'regionName',
            align: 'center'
        },
        {
            title: '市场',
            minWidth: 100,
            key: 'internalMarketName',
            align: 'center'
        },
        {
            title: '生产企业',
            minWidth: 100,
            key: 'memberName',
            align: 'center'
        },
        {
            title: '最低价',
            minWidth: 100,
            key: 'lprice',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.lprice,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.lprice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.lprice = ele.target.value
                                    } else {
                                        data.row.lprice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '最高价',
            minWidth: 100,
            key: 'gprice',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.gprice,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.gprice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.gprice = ele.target.value
                                    } else {
                                        data.row.gprice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '主流价',
            minWidth: 100,
            key: 'indexValue',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.indexValue,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.indexValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.indexValue = ele.target.value
                                    } else {
                                        data.row.indexValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center'
        },
        {
            title: '备注',
            minWidth: 100,
            key: 'remark',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.remark,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                ])
            }
        }

    ],
    // 国际市场价
    '4': [{
            title: '发布时间',
            minWidth: 100,
            key: 'indexDate',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'varietiesName',
            align: 'center'
        },
        {
            title: '规格',
            minWidth: 100,
            key: 'specificationsName',
            align: 'center'
        },
        {
            title: '地区',
            minWidth: 100,
            key: 'regionName',
            align: 'center'
        },
        {
            title: '价格类型',
            minWidth: 100,
            key: 'priceTypeName',
            align: 'center'
        },
        {
            title: '低端价',
            minWidth: 100,
            key: 'lprice',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.lprice,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.lprice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.lprice = ele.target.value
                                    } else {
                                        data.row.lprice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '高端价',
            minWidth: 100,
            key: 'gprice',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.gprice,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.gprice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.gprice = ele.target.value
                                    } else {
                                        data.row.gprice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '中间价',
            minWidth: 100,
            key: 'indexValue',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.indexValue,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.indexValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.indexValue = ele.target.value
                                    } else {
                                        data.row.indexValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center'
        },
        {
            title: '人民币价',
            minWidth: 100,
            key: 'rprice',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.rprice,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.rprice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.rprice = ele.target.value
                                    } else {
                                        data.row.rprice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '备注',
            minWidth: 100,
            key: 'remark',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.remark,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                ])
            }
        }
    ],
    // 主营批发价
    '5': [{
            title: '发布时间',
            minWidth: 100,
            key: 'indexDate',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'varietiesName',
            align: 'center'
        },
        {
            title: '规格',
            minWidth: 100,
            key: 'specificationsName',
            align: 'center'
        },
        {
            title: '标准',
            minWidth: 100,
            key: 'standard',
            align: 'center'
        },
        {
            title: '区域',
            minWidth: 100,
            key: 'regionName',
            align: 'center'
        },
        {
            title: '市场',
            minWidth: 100,
            key: 'marketName',
            align: 'center'
        },
        {
            title: '中石油',
            minWidth: 100,
            key: 'oilprice',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.oilprice,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.oilprice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.oilprice = ele.target.value
                                    } else {
                                        data.row.oilprice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '中石化',
            minWidth: 100,
            key: 'petrifiedprice',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.petrifiedprice,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.petrifiedprice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.petrifiedprice = ele.target.value
                                    } else {
                                        data.row.petrifiedprice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center'
        },
        {
            title: '备注',
            minWidth: 100,
            key: 'remark',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.remark,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                ])
            }
        }
    ],
    // 主营零售价
    '6': [{
            title: '发布时间',
            minWidth: 100,
            key: 'indexDate',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'varietiesName',
            align: 'center'
        },
        {
            title: '规格',
            minWidth: 100,
            key: 'specificationsName',
            align: 'center'
        },
        {
            title: '标准',
            minWidth: 100,
            key: 'standard',
            align: 'center'
        },
        {
            title: '区域',
            minWidth: 100,
            key: 'regionName',
            align: 'center'
        },
        {
            title: '市场',
            minWidth: 100,
            key: 'marketName',
            align: 'center'
        },
        {
            title: '最高零售价',
            minWidth: 100,
            key: 'rindexValue',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.rindexValue,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.rindexValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.rindexValue = ele.target.value
                                    } else {
                                        data.row.rindexValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'span', {

                        }, '元/升'
                    )
                ])
            }
        },
        {
            title: '最高零售价',
            minWidth: 100,
            key: 'tindexValue',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.tindexValue,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.tindexValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.tindexValue = ele.target.value
                                    } else {
                                        data.row.tindexValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'span', {

                        }, '元/吨'
                    )
                ])
            }
        },
        {
            title: '备注',
            minWidth: 100,
            key: 'remark',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.remark,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                ])
            }
        }
    ],
    // 基准价
    '7': [{
            title: '发布时间',
            minWidth: 100,
            key: 'indexDate',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'varietiesName',
            align: 'center'
        },
        {
            title: '规格型号',
            minWidth: 100,
            key: 'specificationsName',
            align: 'center'
        },
        {
            title: '区域名称',
            minWidth: 100,
            key: 'regionName',
            align: 'center'
        },
        {
            title: '收盘价',
            minWidth: 100,
            key: 'indexValue',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.indexValue,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.indexValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.indexValue = ele.target.value
                                    } else {
                                        data.row.indexValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                ])
            }
        },
        {
            title: '单位',
            minWidth: 100,
            key: 'unitValuationName',
            align: 'center'
        },
        {
            title: '备注',
            minWidth: 100,
            key: 'remark',
            align: 'center',
            render: (h, data) => {
                return h('div', [
                    h(
                        'Input', {
                            style: {
                                width: '80px'
                                    // display: data.row.isEdit ? 'inline-block' : 'none'
                            },
                            props: {
                                value: data.row.remark,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                ])
            }
        }
    ]
}