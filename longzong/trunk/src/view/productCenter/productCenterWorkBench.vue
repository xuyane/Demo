<style lang="less" scoped>
  @import './productCenterWorkBench.less';
</style>

<template>
  <div>
    <div class="top-header">
      <top-header></top-header>
    </div>
    <div class='box clearfix'>
        <div class='msgwrap'>
            <div class='userhead'>
              <img :src='information.headimg' />
            </div>
            <div class='username name'>{{information.name}}</div>
            <div class='username'><span>所属部门：</span><span>{{information.department}}</span></div>
            <div class='username'><span>所属职位：</span><span>{{information.position}}</span></div>
            <div class='username'><span>入职时间：</span><span>{{information.hiredate}}</span></div>
            <div class='username'><span>职位状态：</span><span>{{information.statue}}</span></div>
            <div class='username'><span>在职时间：</span><span>{{information.ontime}}</span></div>
            <div class='username leave'>
            <div class='btnwrap'><i class="goout" ></i><span>退出登录</span></div>
            </div>
          </div>
        <div class='right-content'>
            <div class="right_btn">
              <i-button type="primary">产品分类</i-button>
              <i-button type="primary">产品管理</i-button>
              <i-button type="primary">短信套餐</i-button>
              <i-button type="primary">变更记录</i-button>
            </div>
            <div class="cont-wrap">
              <div>
                <Row>
                  <i-col span="19">
                    <Card>
                      <p slot="title">产品统计</p>
                      <div>
                        <Row>
                          <i-col span="16">
                            <div class="bgbox">
                                <div class="sum">
                                <Row>
                                  <i-col span="8">
                                    <div class="blue">1,206</div>
                                    <div>产品总数（种）</div>
                                  </i-col>
                                  <i-col span="8">
                                    <div class="blue">312</div>
                                    <div>上架产品总数（种）</div>
                                  </i-col>
                                  <i-col span="8">
                                    <div class="blue">23</div>
                                    <div>下架产品总数（种）</div>
                                  </i-col>
                                </Row>
                              </div>
                              <div class="productsum">
                                <product-account></product-account>
                              </div>
                            </div>
                          </i-col>
                          <i-col span="8">
                             <div class='bg-right'>
                              <div class="proinfor">
                                <div class='thisdata'><span>本月度</span></div>
                                <div class='progress clearfix'>
                                  <div class='bluebox'></div>
                                  <div class='yellowbox'></div>
                                </div>
                                <div class="clearfix">
                                  <div class="fl">
                                    <Icon type="stop" color='#4180e7'></Icon>
                                    <span>上架产品：</span>
                                    <span>125</span>
                                  </div>
                                  <div class="fl xiajia">
                                    <Icon type="stop" color='#f19d21'></Icon>
                                    <span>下架产品：</span>
                                    <span>36</span>
                                  </div>
                                </div>
                              </div>
                              <div class="proinfor">
                                <div class='thisdata'><span>本季度</span></div>
                                <div class='progress clearfix'>
                                  <div class='bluebox'></div>
                                  <div class='yellowbox'></div>
                                </div>
                                <div class="clearfix">
                                  <div class="fl">
                                    <Icon type="stop" color='#4180e7'></Icon>
                                    <span>上架产品：</span>
                                    <span>125</span>
                                  </div>
                                  <div class="fl xiajia">
                                    <Icon type="stop" color='#f19d21'></Icon>
                                    <span>下架产品：</span>
                                    <span>36</span>
                                  </div>
                                </div>
                              </div>
                              <div class="proinfor">
                                <div class='thisdata'><span>本年度</span></div>
                                <div class='progress clearfix'>
                                  <div class='bluebox'></div>
                                  <div class='yellowbox'></div>
                                </div>
                                <div class="clearfix">
                                  <div class="fl">
                                    <Icon type="stop" color='#4180e7'></Icon>
                                    <span>上架产品：</span>
                                    <span>125</span>
                                  </div>
                                  <div class="fl xiajia">
                                    <Icon type="stop" color='#f19d21'></Icon>
                                    <span>下架产品：</span>
                                    <span>36</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </i-col>
                        </Row>
                      </div>
                      <div>
                        <table class="tablebox" border='1'  cellpadding="0" cellspacing="0" border-collapse='collapse' >
                          <caption>年度新增产品</caption>
                          <tr>
                            <th>年份</th>
                            <th>第一季度新增产品数</th>
                            <th>第二季度新增产品数</th>
                            <th>第三季度新增产品数</th>
                            <th>第四季度新增产品数</th>
                            <th>本年度新增产品数</th>
                          </tr>
                          <tr>
                            <td>2016</td>
                            <td>3562种</td>
                            <td>1065种</td>
                            <td>962种</td>
                            <td>2010种</td>
                            <td>7820种</td>
                          </tr>
                        </table>
                      </div>
                    </Card>
                  </i-col>
                  <i-col span="5" >
                    <div class="rightcard">
                       <Card dis-hover class="pox">
                          <p slot="title">产品合同</p>
                          <div class='hnwrap'>
                            <i class="htzs"></i>
                            <span>合同总数（份）：</span>
                            <span class='htnumber'>40</span>
                          </div>
                          <div class="dotwrap">
                            <span class="dottext">本月新签合同（份）</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>21</span>
                          </div>
                          <div class="dotwrap">
                            <span class="dottext">本季新签合同（份）</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>21</span>
                          </div>
                          <div class="dotwrap">
                            <span class="dottext">本年新签合同（份）</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>21</span>
                          </div>
                        </Card>
                         <Card dis-hover>
                          <p slot="title">产品销量</p>
                          <div class='hnwrap'>
                            <i class="cpxl"></i>
                            <span>本月销售（万元）：</span>
                            <span class='htnumber'>1000</span>
                          </div>
                          <div class="dotwrap">
                            <span class="dottext">季度销售（万元）</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>2100</span>
                          </div>
                          <div class="dotwrap">
                            <span class="dottext">年度销售（万元）</span>
                            <span class='dot'>·············</span>
                            <span class='htnum'>21000</span>
                          </div>
                        </Card>
                    </div>
                   
                  </i-col>
                </Row>
              </div> 
              <div class="middle-content">
                <Card >
                  <div slot="title" >
                    <p class='pmtj'>排名统计</p>
                    <div class='timebox'>
                      <div>
                        <span class="onbox">月度</span>
                        <span class="downbox"></span>
                      </div>
                      <div class="jdbox">
                        <span class="onbox">季度</span>
                        <span class="downbox"></span>
                      </div>
                      <div>
                        <span class="onbox">年度</span>
                        <span class="downbox"></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="tablewrap">
                      <div class="table-title">
                        <div class="title_l">产品使用用户量排名</div>
                        <div class="title_r">
                          <span class="table-blue">数据表</span>
                          <span>可视图</span> 
                        </div>
                      </div>
                      <div>
                        <Row :gutter="38">
                          <i-col span="12">
                            <div>
                              <div class="table1_t">用户量TOP10</div>
                              <i-table border :columns="columns1" :data="data1" size="small"  ></i-table>
                            </div>
                          </i-col>
                          <i-col span="12">
                            <div>
                              <div class="table1_t">用户量TOP10</div>
                              <i-table border :columns="columns1" :data="data1" size="small"  ></i-table>
                            </div>
                          </i-col>
                        </Row>
                        
                      </div>
                    </div>
                    <div class="tablewrap">
                      <div class="table-title">
                        <div class="title_l">产品销售量排名</div>
                        <div class="title_r">
                          <span class="table-blue">数据表</span>
                          <span>可视图</span> 
                        </div>
                      </div>
                      <div>
                        <Row :gutter="38">
                          <i-col span="12">
                            <div>
                              <div class="table1_t">用户量TOP10</div>
                              <i-table border :columns="columns1" :data="data1" size="small"  ></i-table>
                            </div>
                          </i-col>
                          <i-col span="12">
                            <div>
                              <div class="table1_t">用户量TOP10</div>
                              <i-table border :columns="columns1" :data="data1" size="small"  ></i-table>
                            </div>
                          </i-col>
                        </Row>
                        
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div class="middle-content bottom-content">
                <Card >
                  <div slot="title" >
                    <p class='pmtj'>排名统计</p>
                    <div class='timebox'>
                      <div>
                        <span class="onbox">月度</span>
                        <span class="downbox"></span>
                      </div>
                      <div class="jdbox">
                        <span class="onbox">季度</span>
                        <span class="downbox"></span>
                      </div>
                      <div>
                        <span class="onbox">年度</span>
                        <span class="downbox"></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="tablewrap">
                      <div class="table-title">
                        <div class="title_l">产品使用用户量排名</div>
                        <div class="title_r">
                          <span class="table-blue">数据表</span>
                          <span>可视图</span> 
                        </div>
                      </div>
                      <div class="comparisonHistogram">
                        <comparison-histogram></comparison-histogram>                        
                      </div>
                    </div>
                    <div class="tablewrap">
                      <div class="table-title">
                        <div class="title_l">产品销售量排名</div>
                        <div class="title_r">
                          <span class="table-blue">数据表</span>
                          <span>可视图</span> 
                        </div>
                      </div>
                      <div>
                        <!-- <comparison-histogram></comparison-histogram>    -->
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>      
          </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../header/header.vue'
import productAccount from './productAccount.vue';
import comparisonHistogram from './comparisonHistogram.vue';
export default {
  components: {
    topHeader,
    productAccount,
    comparisonHistogram
  },
  data () {
    return {
      information: {
        headimg: require('../../assets/images/user-head.png'),
        name:'张三',
        department:'销售一部',
        position:'业务员',
        hiredate:"2016-06-28",
        statue:'在职',
        ontime:'0年6月12日'       
      },
      tableTitle1:'用户量TOP10',
      columns1: [
                    {
                        title: '排名',
                        key: 'ranking'
                    },
                    {
                        title: '产品名称',
                        key: 'productName'
                    },
                    {
                        title: '用户量',
                        key: 'userVolume'
                    }
                    
                ],
                data1: [
                    {
                        ranking: '王小明',
                        productName: 18,
                        userVolume: '北京市朝阳区芍药居'
                    },
                    {
                        ranking: '张小刚',
                        productName: 25,
                        userVolume: '北京市海淀区西二旗'
                    },
                    {
                        ranking: '李小红',
                        productName: 30,
                        userVolume: '上海市浦东新区世纪大道'
                    },
                    {
                        ranking: '周小伟',
                        productName: 26,
                        userVolume: '深圳市南山区深南大道'
                    }
                ]
    }
  },
  methods: {
    handleChange (item) {
      this.$router.push({
        name: item.name
      })
    }
  },
  updated () {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened()
      }
    })
  }
}

</script>