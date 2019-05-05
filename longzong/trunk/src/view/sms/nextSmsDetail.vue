<style>
    @import './sms.less';
</style>

<template>
    <Row>
        <Col span="24">
            <Row>
                <Col span="6">
                    <Row>
                        <p class="sms-detail-con">短信产品:</p>
                    </Row>
                    <Row>
                        <Button type="primary" @click="modal1 = true">请选择</Button>
                        <Modal
                            v-model="modal1"
                            title="请选择"
                            @on-ok="ok"
                            @on-cancel="cancel">
                             <Tree :data="data1" show-checkbox></Tree>
                        </Modal>
                    </Row>
                </Col>
                <Col span="18" class="sms-detail-lr">短信产品一，短信产品二</Col>
            </Row>
        </Col>
    </Row>
</template>

<script>
   // import axios from 'axios'
    import Vue from 'vue'
    Vue.prototype.$http = require('axios');
export default {
    
    data () {
            return {
                modal1: false,
                data1: [
                    {
                        title: '能源',
                        expand: true,
                        children: [
                            {
                                title: '二级能源',
                                expand: true,
                                children: [
                                    {
                                        title: '三级能源'
                                    },
                                    {
                                        title: '三级能源'
                                    }
                                ]
                            },
                            {
                                title: '二级能源',
                                expand: true,
                                children: [
                                    {
                                        title: '三级能源'
                                    },
                                    {
                                        title: '三级能源'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
    mounted(){
        this.request();
    },
    methods: {
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            //this.$Message.info('Clicked cancel');
        },
         mounted(){
            this.request();
        },
      
        request (){
            var that = this
          this.$http.get('http://localhost:8087/demo/superadmin/listarea', {},
            { 
                headers: {},
                emulateJSON: true 
                }).then((response) => {
                    console.log("111");
                    that.datas = response.data;
                     console.log(that.datas);
                    
            });
            
        }
    }
}
</script>



