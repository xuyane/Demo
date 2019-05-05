import Vue from 'vue'

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
            key: 'marketType',
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
                                value: data.row.indexValue
                            },
                            on: {
                                'on-change': event => {
                                    data.row.indexValue = event.target.value
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
                                value: data.row.remark
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
                                value: data.row.indexValue
                            },
                            on: {
                                'on-change': event => {
                                    data.row.indexValue = event.target.value
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
                                value: data.row.remark
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
                                value: data.row.lprice
                            },
                            on: {
                                'on-change': event => {
                                    data.row.lprice = event.target.value
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
                                value: data.row.gprice
                            },
                            on: {
                                'on-change': event => {
                                    data.row.gprice = event.target.value
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
                                value: data.row.indexValue
                            },
                            on: {
                                'on-change': event => {
                                    data.row.indexValue = event.target.value
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
                                value: data.row.remark
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
            key: 'priceType',
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
                                value: data.row.lprice
                            },
                            on: {
                                'on-change': event => {
                                    data.row.lprice = event.target.value
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
                                value: data.row.gprice
                            },
                            on: {
                                'on-change': event => {
                                    data.row.gprice = event.target.value
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
                                value: data.row.indexValue
                            },
                            on: {
                                'on-change': event => {
                                    data.row.indexValue = event.target.value
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
                                value: data.row.rprice
                            },
                            on: {
                                'on-change': event => {
                                    data.row.rprice = event.target.value
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
                                value: data.row.remark
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
                                value: data.row.oilprice
                            },
                            on: {
                                'on-change': event => {
                                    data.row.oilprice = event.target.value
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
                                value: data.row.petrifiedprice
                            },
                            on: {
                                'on-change': event => {
                                    data.row.petrifiedprice = event.target.value
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
                                value: data.row.remark
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
                                value: data.row.rindexValue
                            },
                            on: {
                                'on-change': event => {
                                    data.row.rindexValue = event.target.value
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
                                value: data.row.tindexValue
                            },
                            on: {
                                'on-change': event => {
                                    data.row.tindexValue = event.target.value
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
                                value: data.row.remark
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
                                value: data.row.indexValue
                            },
                            on: {
                                'on-change': event => {
                                    data.row.indexValue = event.target.value
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
                                value: data.row.remark
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