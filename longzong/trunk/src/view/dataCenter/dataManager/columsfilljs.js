import Vue from 'vue'
import { Message } from 'iview'
export default {
    // 1代表原油
    '1': [{
            title: '创建时间',
            minWidth: 100,
            key: 'publishTime',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'pruductName',
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
            key: 'priceValue',
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
                                value: data.row.priceValue,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.priceValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.priceValue = ele.target.value
                                    } else {
                                        data.row.priceValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },
                    //         on: {
                    //             'click': event => {
                    //                 data.row.isEdit = true;

                    //             }
                    //         }
                    //     })
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
                                // disabled: !data.row.isEdit,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        }

    ],
    // 2企业出厂价
    '2': [{
            title: '发布时间',
            minWidth: 100,
            key: 'publishTime',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'pruductName',
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
            key: 'priceValue',
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
                                value: data.row.priceValue,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.priceValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.priceValue = ele.target.value
                                    } else {
                                        data.row.priceValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },
                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
                                // disabled: !data.row.isEdit,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        }

    ],
    // 国内市场价
    '3': [{
            title: '发布时间',
            minWidth: 100,
            key: 'publishTime',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'pruductName',
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
            title: '生产企业',
            minWidth: 100,
            key: 'memberName',
            align: 'center'
        },
        {
            title: '最低价',
            minWidth: 100,
            key: 'lowEndPrice',
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
                                value: data.row.lowEndPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.lowEndPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.lowEndPrice = ele.target.value
                                    } else {
                                        data.row.lowEndPrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        },
        {
            title: '最高价',
            minWidth: 100,
            key: 'higPrice',
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
                                value: data.row.higPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.higPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.higPrice = ele.target.value
                                    } else {
                                        data.row.higPrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        },
        {
            title: '主流价',
            minWidth: 100,
            key: 'middlePrice',
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
                                value: data.row.middlePrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.middlePrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.middlePrice = ele.target.value
                                    } else {
                                        data.row.middlePrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
                                // disabled: !data.row.isEdit,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        }

    ],
    // 国际市场价
    '4': [{
            title: '发布时间',
            minWidth: 100,
            key: 'publishTime',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'pruductName',
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
            key: 'lowEndPrice',
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
                                value: data.row.lowEndPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.lowEndPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.lowEndPrice = ele.target.value
                                    } else {
                                        data.row.lowEndPrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        },
        {
            title: '高端价',
            minWidth: 100,
            key: 'higPrice',
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
                                value: data.row.higPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.higPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.higPrice = ele.target.value
                                    } else {
                                        data.row.higPrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        },
        {
            title: '中间价',
            minWidth: 100,
            key: 'middlePrice',
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
                                value: data.row.middlePrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.middlePrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.middlePrice = ele.target.value
                                    } else {
                                        data.row.middlePrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
            key: 'rmbPrice',
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
                                value: data.row.rmbPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.rmbPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.rmbPrice = ele.target.value
                                    } else {
                                        // that.$Message.error("请输入带2位小数的数字");
                                        data.row.rmbPrice = '';
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
                                // disabled: !data.row.isEdit,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        }
    ],
    // 主营批发价
    '5': [{
            title: '发布时间',
            minWidth: 100,
            key: 'publishTime',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'pruductName',
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
            key: 'oilPrice',
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
                                value: data.row.oilPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.oilPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.oilPrice = ele.target.value
                                    } else {
                                        data.row.oilPrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        },
        {
            title: '中石化',
            minWidth: 100,
            key: 'petrifiedPrice',
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
                                value: data.row.petrifiedPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.petrifiedPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.petrifiedPrice = ele.target.value
                                    } else {
                                        data.row.petrifiedPrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
                                // disabled: !data.row.isEdit,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        }
    ],
    // 主营零售价
    '6': [{
            title: '发布时间',
            minWidth: 100,
            key: 'publishTime',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'pruductName',
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
            key: 'risePrice',
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
                                value: data.row.risePrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.risePrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.risePrice = ele.target.value
                                    } else {
                                        data.row.risePrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
            key: 'tonPrice',
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
                                value: data.row.tonPrice,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.tonPrice
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.tonPrice = ele.target.value
                                    } else {
                                        data.row.tonPrice = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
                                // disabled: !data.row.isEdit,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        }
    ],
    // 基准价
    '7': [{
            title: '发布时间',
            minWidth: 100,
            key: 'publishTime',
            align: 'center'
        },
        {
            title: '产品名称',
            minWidth: 100,
            key: 'pruductName',
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
            key: 'priceValue',
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
                                value: data.row.priceValue,
                                // disabled: !data.row.isEdit,
                                maxlength: 20
                            },
                            on: {
                                "on-blur": ele => {
                                    ele.target.value = data.row.priceValue
                                },
                                'on-change': ele => {
                                    var value = ele.target.value;
                                    var reg = /^\d+(\.\d{0,2})?$/;
                                    var resu = reg.test(value);
                                    if (resu) {
                                        data.row.priceValue = ele.target.value
                                    } else {
                                        data.row.priceValue = '';
                                        // that.$Message.error("请输入带2位小数的数字");
                                        Message.error('请输入带2位小数的数字');
                                    }

                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
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
                                // disabled: !data.row.isEdit,
                                maxlength: 100
                            },
                            on: {
                                'on-change': event => {
                                    data.row.remark = event.target.value
                                }
                            }
                        }
                    )
                    // h(
                    //     'Icon', {
                    //         props: {
                    //             type: 'ios-create-outline',
                    //             size: 30
                    //         },

                    //         on: {
                    //             'click': event => {
                    //                 // this.isEdit = true;
                    //                 data.row.isEdit = true;
                    //             }
                    //         }
                    //     })
                ])
            }
        }
    ]
}