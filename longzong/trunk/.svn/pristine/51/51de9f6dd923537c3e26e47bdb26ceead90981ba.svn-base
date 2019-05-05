<style lang="less" scoped>
</style>
<template>
    <Menu class="menu" ref="sideMenu" :active-name="$route.meta.activeName ? $route.meta.activeName : $route.name" :open-names="[$route.meta.name ? $route.meta.name : '', $route.meta.subMenuName ? $route.meta.subMenuName : '']"
        theme="dark" width="200">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length < 1 && (menuType[$route.meta.name] == item.type || $route.meta.type == item.type)" :name="item.name"
                :key="item.key" @click.native="handleChange(item)">
            <i :class="item.icon" :key="item.key + 'i'"></i>
            <span class="layout-text subMenu-title" :key="'title' + item.name">{{item.title}}</span>
            </MenuItem>
            <Submenu v-if="item.children.length >= 1 && (menuType[$route.meta.name] == item.type || $route.meta.type == item.type)" :name="item.name"
                :key="item.key">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span class="layout-text subMenu-title">{{item.title}}</span>
                </template>
                <template v-for="child in item.children">
                    <Submenu class="child-menu" v-if="child.children" :name="child.name" :key="child.key">
                        <template slot="title">
                            <!-- <i :class="child.icon" ></i> -->
                            <span class="layout-text subMenu-title">{{child.title}}</span>
                        </template>
                        <template v-for="child1 in child.children">
                            <MenuItem :name="child1.name" :key="child1.key" @click.native="handleChange(child1,item.name)">
                            <!-- <i :class="child.icon" :key="child.key + 'i'"></i> -->
                            <span class="layout-text" :key="'title' + child1.name">{{child1.title}}</span>
                            </MenuItem>
                        </template>
                    </Submenu>
                    <MenuItem v-else :name="child.name" :key="child.key" @click.native="handleChange(child,item.name)">
                    <!-- <i :class="child.icon" :key="child.key + 'i'"></i> -->
                    <span class="layout-text" :key="'title' + child.name">{{child.title}}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
  name: "leftMenu",
  data() {
    return {
      menuList: [
        {
          icon: "icon icon-center",
          title: "产品中心",
          key: "1",
          name: "product",
          type: "member",
          children: [
            {
              icon: "icon-manager icon",
              title: "产品管理",
              key: "1-1",
              name: "productManager"
            },
            {
              icon: "icon-log icon",
              title: "短信套餐",
              key: "1-2",
              name: "smsManager"
            },
            {
              icon: "icon-log icon",
              title: "变更日志",
              key: "1-3",
              name: "changeLog"
            },
            {
              icon: "icon-log icon",
              title: "优惠策略",
              key: "1-4",
              name: "preferentialStrategyList"
            },
            {
              icon: "icon-log icon",
              title: "部门关联品种",
              key: "1-5",
              name: "departmentAndBreed"
            }
          ]
        },
        {
          icon: "icon icon-phone-center",
          title: "呼叫中心",
          key: "2",
          name: "phoneCenter",
          type: "plant",
          children: [
            {
              //              icon: "icon icon-relationr",
              title: "话机管理",
              key: "2-1",
              name: "phoneCenter"
            },
            {
              //              icon: "icon icon-relationr",
              title: "黑名单管理",
              key: "2-2",
              name: "blackList"
            },
            {
              //              icon: "icon icon-relationr",
              title: "话机映射",
              key: "2-3",
              name: "phoneMap"
            },
            {
              //              icon: "icon icon-relationr",
              title: "人员话机管理",
              key: "2-4",
              name: "personnelTelephoneManagement"
            }
          ]
        },
        {
          icon: "icon icon-relationr",
          title: "客户关系",
          key: "3",
          name: "management",
          type: "member",
          children: [
            {
              icon: "icon icon-approvalr",
              title: "审批事项",
              key: "3-1",
              name: "userApproval",
              children: [
                {
                  icon: "icon icon-contractManagement",
                  title: "合同审核",
                  key: "3-1-1",
                  name: "contractManagement"
                },
                {
                  icon: "icon icon-trialDelay",
                  title: "试用延期",
                  key: "3-1-2",
                  name: "trialDelay"
                },
                {
                  icon: "icon icon-trackingDelay",
                  title: "跟踪延期",
                  key: "3-1-3",
                  name: "trackingDelay"
                },
                {
                  icon: "icon icon-autoAssign",
                  title: "自动分配",
                  key: "3-1-4",
                  name: "autoAssign"
                },
                {
                  icon: "icon icon-communicater",
                  title: "退款审核",
                  key: "3-1-5",
                  name: "refundAudit"
                },
                {
                  icon: "icon icon-communicater",
                  title: "续入自留",
                  key: "3-1-6",
                  name: "retentionCheck"
                }
              ]
            },
            {
              icon: "icon icon-registerr",
              title: "用户注册",
              key: "3-2",
              name: "userRegister"
            },
            {
              icon: "icon icon-userr",
              title: "我的用户",
              key: "3-3",
              name: "allUser"
            },
            {
              icon: "icon icon-agreementr",
              title: "我的合同",
              key: "3-4",
              name: "myAgreement"
            },
            {
              icon: "icon icon-agreementr",
              title: "我的退款合同",
              key: "3-5",
              name: "myRefundAudit"
            },
            {
              icon: "icon icon-agreementr",
              title: "待续入合同",
              key: "3-14",
              name: "renewalContract"
            },
            {
              icon: "icon icon-manager",
              title: "用户管理",
              key: "3-6",
              name: "userManage",
              children: [
                {
                  icon: "icon icon-manager",
                  title: "用户分配",
                  key: "3-6-1",
                  name: "userDistribute"
                },
                {
                  icon: "icon icon-manager",
                  title: "公司合并",
                  key: "3-6-2",
                  name: "companyMerge"
                },
                {
                  icon: "icon icon-manager",
                  title: "公司列表",
                  key: "3-6-3",
                  name: "companyList"
                },
                {
                  icon: "icon icon-manager",
                  title: "用户搜索",
                  key: "3-6-4",
                  name: "userSearch"
                },
                {
                  icon: "icon icon-manager",
                  title: "用户划转",
                  key: "3-6-5",
                  name: "userTransfer"
                },
                {
                  icon: "icon icon-manager",
                  title: "对标",
                  key: "3-6-6",
                  name: "benchMarking"
                }
              ]
            },
            {
              icon: "icon icon-informr",
              title: "用户通知",
              key: "3-7",
              name: "sendMessage"
            },
            {
              icon: "icon icon-servicer",
              title: "服务记录",
              key: "3-8",
              name: "serviceRecord"
            },
            {
              icon: "icon icon-callr",
              title: "通话记录",
              key: "3-10",
              name: "callHistory"
            },
            {
              icon: "icon icon-noticer",
              title: "公告管理",
              key: "3-11",
              name: "announcementManage"
            },
            {
              icon: "icon icon-systemr",
              title: "系统配置",
              key: "3-12",
              name: "systemConfiguration",
              children: [
                {
                  icon: "icon icon-callBarring",
                  title: "通话限制",
                  key: "3-12-1",
                  name: "callBarring"
                },
                {
                  icon: "icon icon-callLog",
                  title: "限时配置",
                  key: "3-12-2",
                  name: "callLog"
                },
                {
                  icon: "icon icon-customerConfig",
                  title: "客户数配置",
                  key: "3-12-3",
                  name: "customerConfig"
                },
                {
                  icon: "icon icon-distributionSalesman",
                  title: "自动分配业务员",
                  key: "3-12-4",
                  name: "distributionSalesman"
                },
                {
                  icon: "icon icon-ustomService",
                  title: "自动分配客服",
                  key: "3-12-5",
                  name: "customService"
                },
                {
                  icon: "icon icon-ustomService",
                  title: "合同模板",
                  key: "3-12-6",
                  name: "contractTemplet"
                },
                {
                  icon: "icon icon-ustomService",
                  title: "标签管理",
                  key: "3-12-7",
                  name: "tabManager"
                },
                {
                  icon: "icon icon-ustomService",
                  title: "待续入业务员",
                  key: "3-12-8",
                  name: "continueSalesman"
                }
                //   {
                //       icon:'icon icon-benchmarkFacilitator',
                //       title:'对标服务商',
                //       key:'3-12-6',
                //       name:'benchmarkFacilitator'
                //   }
              ]
            },
            {
              icon: "icon icon-otherr",
              title: "其他",
              key: "3-13",
              name: "aboutOther",
              children: [
                {
                  icon: "icon icon-customerComplaint",
                  title: "客户投诉",
                  key: "3-13-1",
                  name: "customerComplaint"
                },
                {
                  icon: "icon icon-remittanceInformation",
                  title: "汇款信息",
                  key: "3-13-2",
                  name: "remittanceInformation"
                }
              ]
            }
          ]
        },
        {
          icon: "icon icon-data-admin",
          title: "基础数据管理",
          key: "4",
          name: "basicData",
          type: "system",
          children: [
            {
              icon: "icon-informationsort icon",
              title: "信息分类管理",
              key: "4-1",
              name: "informationSort"
            },
            {
              icon: "icon-varietycategorymanagement icon",
              title: "品种类别管理",
              key: "4-2",
              name: "varietyCategoryManagement"
            },
            {
              icon: "icon-varietymanagement icon",
              title: "品种管理",
              key: "4-3",
              name: "varietyManagement"
            },
            {
              icon: "icon-specificationtype icon",
              title: "规格型号管理",
              key: "4-4",
              name: "specificationType"
            },
            {
              icon: "icon-standardmanagement icon",
              title: "标准管理",
              key: "4-5",
              name: "standardManagement"
            },
            {
              icon: "icon-usemanagement icon",
              title: "用途管理",
              key: "4-6",
              name: "useManagement"
            },
            {
              icon: "icon-technicalindicators icon",
              title: "技术指标管理",
              key: "4-7",
              name: "technicalIndicators"
            },
            {
              icon: "icon-enterpriseList icon",
              title: "企业库管理",
              key: "4-8",
              name: "enterpriseList"
            }
          ]
        },
        {
          icon: "icon icon-finance",
          title: "财务管理",
          key: "5",
          name: "finance",
          type: "finance",
          children: [
            {
              icon: "icon-costReport icon",
              title: "到账查询",
              key: "5-11",
              name: "arrivaCheck"
            },
            {
              icon: "icon-accountManager icon",
              title: "到账管理",
              key: "5-1",
              name: "accountTop"
            },
            {
              icon: "icon-productOpening icon",
              title: "认账管理",
              key: "5-2",
              name: "confirmcontractList"
            },
            {
              icon: "icon-productOpening icon",
              title: "产品开通",
              key: "5-3",
              name: "productOpening"
            },
            {
              icon: "icon-productOpening icon",
              title: "票据管理",
              key: "5-4",
              name: "billManager"
            },
            {
              icon: "icon-saleTicketManager icon",
              title: "销项票列表",
              key: "5-5",
              name: "saleTicketListManager"
            },
            {
              icon: "icon-productOpening icon",
              title: "销项票领用记录",
              key: "5-6",
              name: "saleRecord"
            },
            {
              icon: "icon-productOpening icon",
              title: "发票邮寄管理",
              key: "5-7",
              name: "postManager"
            },
            {
              icon: "icon-invoiceList icon",
              title: "开票信息维护",
              key: "5-8",
              name: "invoiceList"
            },
            {
              icon: "icon-costReport icon",
              title: "直接成本",
              key: "5-9",
              name: "direct"
            },
            {
              icon: "icon-costReport icon",
              title: "间接成本",
              key: "5-10",
              name: "indirect"
            },
            {
              title: "到账退款",
              key: "5-12",
              name: "goldRefund"
            }
          ]
        },
        {
          icon: "icon icon-center",
          title: "信息发布管理",
          key: "6",
          name: "message",
          type: "plant",
          children: [
            {
              icon: "icon-Industrytype icon",
              title: "模板分类管理",
              key: "6-1",
              name: "TemplateFile"
            },
            {
              icon: "icon-Industrytype icon",
              title: "模板管理",
              key: "6-2",
              name: "TemplateManagement"
            },
            {
              icon: "icon-Industrytype icon",
              title: "违禁词管理",
              key: "6-3",
              name: "ContrabandWords"
            },
            {
              icon: "icon-manager icon",
              title: "信息单元管理",
              key: "6-4",
              name: "unitMangement"
            },
            {
              icon: "icon-manager icon",
              title: "任务分配及委派",
              key: "6-5",
              name: "taskPlant"
            },
            {
              icon: "icon-productOpening icon",
              title: "联系人审核",
              key: "6-6",
              name: "toAudit"
            },
            {
              icon: "icon-manager icon",
              title: "我的任务达标统计",
              key: "6-7",
              name: "mytaskTotal"
            },
            {
              icon: "icon-manager icon",
              title: "我的电话记录",
              key: "6-8",
              name: "myphoneRecords"
            },
            {
              icon: "icon-manager icon",
              title: "我的信息单元",
              key: "6-9",
              name: "myInformationUnit"
            },
            {
              icon: "icon-manager icon",
              title: "电话时长设置",
              key: "6-10",
              name: "telDurationSet"
            },
            {
              icon: "icon-manager icon",
              title: "我的信息联系人",
              key: "6-11",
              name: "contacts"
            },
            {
              icon: "icon-manager icon",
              title: "部门任务达标统计",
              key: "6-12",
              name: "departmentTaskReach"
            },
            {
              icon: "icon-manager icon",
              title: "任务达标统计",
              key: "6-13",
              name: "mytaskTotalOne"
            }
          ]
        },
        {
          icon: "icon icon-center",
          title: "后台权限",
          key: "7",
          name: "eac",
          type: "system",
          children: [
            {
              icon: "icon-productOpening icon",
              title: "模块管理",
              key: "7-1",
              name: "moduleManagement"
            },
            {
              icon: "icon-manager icon",
              title: "功能配置",
              key: "7-2",
              name: "collocatedFunctions"
            },
            {
              icon: "icon-productOpening icon",
              title: "权限管理",
              key: "7-3",
              name: "rightsManagement"
            },
            {
              icon: "icon-productOpening icon",
              title: "角色管理",
              key: "7-4",
              name: "roleQueryList"
            },
            {
              icon: "icon-productOpening icon",
              title: "账号权限",
              key: "7-5",
              name: "accountAuthority"
            },
            // {      //暂时隐藏
            //     icon: 'icon-productOpening icon',
            //     title: '菜单配置',
            //     key: '7-6',
            //     name: 'menuConfiguration'
            // },
            {
              icon: "icon-productOpening icon",
              title: "资源管理配置",
              key: "7-7",
              name: "administratorSettings"
            },
            {
              icon: "icon-productOpening icon",
              title: "工作台管理",
              key: "7-8",
              name: "workbenchManagement"
            }
          ]
        }, 
        {
          icon: "icon icon-center",
          title: "绩效管理",
          key: "8",
          name: "achievements",
          type: "achievements",
          children: [
            {
              icon: "icon-manager icon",
              title: "我的绩效",
              key: "8-1",
              name: "performanceStatusSearch"
            },
            //     {
            //     icon: 'icon-manager icon',
            //     title: '我的绩效',
            //     key: '8-1',
            //     name: 'performanceEvaluation'
            // },
            {
              icon: "icon-manager icon",
              title: "绩效点评",
              key: "8-2",
              name: "performanceReview"
            },
            {
              icon: "icon-manager icon",
              title: "考核模板",
              key: "8-3",
              name: "checkTemplate"
            },
            {
              icon: "icon-manager icon",
              title: "绩效查询",
              key: "8-8",
              name: "performanceeQuery"
            },
            {
              icon: "icon-manager icon",
              title: "考核异常统计",
              key: "8-9",
              name: "abnormalStatistics"
            },
            {
              title: "任务设定",
              key: "8-4",
              name: "achievementTaskSet",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "营销任务",
                  key: "8-4-1",
                  name: "marketingTaskSet"
                },
                {
                  icon: "icon-manager icon",
                  title: "产品任务",
                  key: "8-4-2",
                  name: "productTaskSet"
                }
              ]
            },
            {
              icon: "icon-manager icon",
              title: "质检异常上报",
              key: "8-5",
              name: "qualityTestReport"
            },
            {
              icon: "icon-manager icon",
              title: "报告贡献度上报",
              key: "8-6",
              name: "contributeReport"
            },
            {
              icon: "icon-manager icon",
              title: "业绩统计",
              key: "8-7",
              name: "achievementsCount"
            },
            {
              icon: "icon-manager icon",
              title: "明细确认",
              key: "8-10",
              name: "detailConfirmation"
            },
            {
              title: "提成比例维护",
              key: "8-11",
              name: "royaltyRatio",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "提成比例维护",
                  key: "8-11-1",
                  name: "proportionalMaintenance"
                },
                {
                  icon: "icon-manager icon",
                  title: "部门人员提成",
                  key: "8-11-2",
                  name: "personnelCommission"
                }
              ]
            }
          ]
        },
        {
          icon: "icon-manager icon",
          title: "网站管理",
          key: "9",
          name: "siteManagement",
          type: "plant",
          children: [
            {
              icon: "icon-manager icon",
              title: "网站模板分类管理",
              key: "9-1",
              name: "websiteTemplateClassification"
            },
            {
              icon: "icon-manager icon",
              title: "网站模板管理",
              key: "9-2",
              name: "websiteManagementTemplate"
            },
            {
              icon: "icon-manager icon",
              title: "频道管理",
              key: "9-3",
              name: "frequencyManagement"
            },
            {
              icon: "icon-manager icon",
              title: "栏目管理",
              key: "9-4",
              name: "columnManagement"
            },
            {
              icon: "icon-manager icon",
              title: "标签管理",
              key: "9-5",
              name: "labelManagement"
            }
          ]
        },
        {
          icon: "icon-manager icon",
          title: "专题管理",
          key: "10",
          name: "thematicManagement",
          type: "plant",
          children: [
            {
              icon: "icon-manager icon",
              title: "专题列表",
              key: "10-1",
              name: "topicList"
            },
            {
              icon: "icon-manager icon",
              title: "创建专题",
              key: "10-2",
              name: "createTopic"
            }
          ]
        },
        {
          icon: "icon-manager icon",
          title: "数据中心",
          key: "11",
          name: "dataCenterList",
          type: "dataCenter",
          children: [
            {
              icon: "icon-manager icon",
              title: "价格中心",
              key: "11-1",
              name: "priceCenter",
              type: "priceCenter",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "企业出厂价指标",
                  key: "11-1-1",
                  name: "factoryPriceChina"
                },
                {
                  icon: "icon-manager icon",
                  title: "国内市场价指标",
                  key: "11-1-2",
                  name: "marketPriceChina"
                },
                {
                  icon: "icon-manager icon",
                  title: "国际市场价指标",
                  key: "11-1-3",
                  name: "marketPriceInternational"
                },
                {
                  icon: "icon-manager icon",
                  title: "主营批发价指标",
                  key: "11-1-4",
                  name: "oilProductTradePrice"
                },
                {
                  icon: "icon-manager icon",
                  title: "主营零售价指标",
                  key: "11-1-5",
                  name: "oilProductRetailPrice"
                },
                {
                  icon: "icon-manager icon",
                  title: "国际原油价指标",
                  key: "11-1-6",
                  name: "internationalOil"
                },
                {
                  icon: "icon-manager icon",
                  title: "基准价指标",
                  key: "11-1-7",
                  name: "benchmarkPrice"
                }
              ]
            },
            {
              icon: "icon-manager icon",
              title: "原油整点",
              key: "11-2",
              name: "oilPoint",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "原油整点报盘",
                  key: "11-2-1",
                  name: "oilNumberOffer"
                },
                {
                  icon: "icon-manager icon",
                  title: "原油变化率监控",
                  key: "11-2-2",
                  name: "oilChangeControl"
                }
              ]
            },
            {
              icon: "icon-manager icon",
              title: "隆众指数",
              key: "11-3",
              name: "lzIndex",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "隆众指数管理",
                  key: "11-3-1",
                  name: "lzIndexManage"
                }
              ]
            },
            {
              icon: "icon-manager icon",
              title: "数据管理",
              key: "11-4",
              name: "dataManager",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "数据管理",
                  key: "11-4-1",
                  name: "dataManagerIndex"
                }
              ]
            }
          ]
        },
        {
          icon: "icon icon-center",
          title: "财务报表",
          key: "12",
          name: "financeReport",
          type: "report",
          children: [
            {
              icon: "icon-manager icon",
              title: "编辑报告提成",
              key: "12-1",
              name: "editExtractReport"
            },
            {
              icon: "icon-productOpening icon",
              title: "产业链收入统计",
              key: "12-2",
              name: "industry",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "年任务完成情况",
                  key: "12-2-1",
                  name: "reportOrgProductYear"
                },
                {
                  icon: "icon-manager icon",
                  title: "产品分类收入",
                  key: "12-2-2",
                  name: "productCategoryList"
                },
                {
                  icon: "icon-manager icon",
                  title: "收付利润统计",
                  key: "12-2-3",
                  name: "receiptAndPaymentList"
                }
              ]
            },
            {
              icon: "icon-productOpening icon",
              title: "营销收入统计",
              key: "12-3",
              name: "marketingRevenue"
            },
            {
              icon: "icon-productOpening icon",
              title: "合同执行情况",
              key: "12-4",
              name: "contractExecutionReport"
            },
            {
              icon: "icon-productOpening icon",
              title: "到账统计",
              key: "12-5",
              name: "accountStatistics",
              children: [
                {
                  icon: "icon-manager icon",
                  title: "每日到账",
                  key: "12-5-1",
                  name: "dailyAccounts"
                },
                {
                  icon: "icon-manager icon",
                  title: "部门到账排行",
                  key: "12-5-2",
                  name: "departAccountRanking"
                },
                {
                  icon: "icon-manager icon",
                  title: "业务员到账排行",
                  key: "12-5-3",
                  name: "salerAccountRanking"
                }
              ]
            }
          ]
        },
        {
                    icon: 'icon icon-center',
                    title: '生产报表',
                    key: '13',
                    name: 'productReport',
                    type:'report',
                    children: [{
                        icon: 'icon-productOpening icon',
                        title: '部门编辑指标',
                        key: '13-1',
                        name: 'sectoralIndicatorsTab'
                    },
                    {
                        icon: 'icon-manager icon',
                        title: '个人编辑指标',
                        key: '13-2',
                        name: 'personalIndicatorsTab'
                    },
                    {
                        icon: 'icon-manager icon',
                        title: '编辑排行',
                        key: '13-3',
                        name: 'orgRankingTab'
                    },
                    {
                        icon: 'icon-manager icon',
                        title: '电话量统计',
                        key: '13-4',
                        name: 'telephoneStatistics'
                    }
                    ]
                },
                // {
                //     icon: 'icon icon-center',
                //     title: '营销报表',
                //     key: '14',
                //     name: 'marketingReport',
                //     type:'report',
                //     children: [{
                //         icon: 'icon-productOpening icon',
                //         title: '部门指标',
                //         key: '14-1',
                //         name: 'marketingTargetsTab'
                //     },
                //     {
                //         icon: 'icon-manager icon',
                //         title: '个人指标',
                //         key: '14-2',
                //         name: 'marketingPersonTab'
                //     },
                //     {
                //         icon: 'icon-manager icon',
                //         title: '营销排行',
                //         key: '14-3',
                //         name: 'markingRankingTab'
                //     }
                //     ]
                // },

        {
          icon: "icon icon-center",
          title: "工作流",
          key: "15",
          name: "workflow",
          type: "workflow",
          children: [
            {
              icon: "icon-productOpening icon",
              title: "待办任务",
              key: "15-1",
              name: "processing"
            },
            {
              icon: "icon-accountManager icon",
              title: "流程实例",
              key: "15-2",
              name: "instanceList"
            },
            {
              icon: "icon-accountManager icon",
              title: "系统平台",
              key: "15-3",
              name: "systemPlatform"
            },
            {
              icon: "icon-accountManager icon",
              title: "员工查询",
              key: "15-4",
              name: "userInfoQuery"
            },
            {
              icon: "icon-productOpening icon",
              title: "流程部署",
              key: "15-5",
              name: "deploy"
            },
            {
              icon: "icon-accountManager icon",
              title: "流程定义",
              key: "15-6",
              name: "defign"
            },
            {
              icon: "icon-accountManager icon",
              title: "流程设计(IE不支持)",
              key: "15-7",
              name: "devise"
            },
            {
              icon: "icon-accountManager icon",
              title: "流程图表",
              key: "15-8",
              name: "chart"
            }
          ]
        },
        {
          icon: "icon icon-center",
          title: "对外接口管理",
          key: "16",
          name: "apiManagement",
          type: "system",
          children: [
            {
              icon: "icon-productOpening icon",
              title: "接口用户管理",
              key: "16-1",
              name: "apiUserManagement"
            }
          ]
        }
      ],
      openName: ["product"],
      menuType: {
        product: "member",
        phoneCenter: "plant",
        management: "member",
        basicData: "system",
        finance: "finance",
        message: "plant",
        eac: "system",
        achievements: "achievements",
        siteManagement: "plant",
        thematicManagement: "plant",
        dataCenter: "dataCenter",
        financeReport: "report",
        productReport: 'report',
        saleReport: 'report',
        //marketingReport: "report",
        workflow: "workflow",
        apiManagement: "system"
      }
    };
  },
  methods: {
    handleChange(item, name) {
      this.$router.push({
        name: item.name
      });
    }
  }
};
</script>