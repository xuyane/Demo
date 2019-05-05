<template>
  <div class="right_btn">
    <div class="navcontainer">
        <template v-if="role == 0">
            <span class="tab" v-for="(item,index) in menu" :key="index" @click="tabLink(item.path)">
                {{item.name}}
            </span>
        </template>
        <template v-if="role == 1">
            <span class="tab" v-for="(item,index) in menu1" :key="index" @click="tabLink(item.path)">
                {{item.name}}
            </span>
        </template>
        <template v-if="role == 2">
            <span class="tab" v-for="(item,index) in menu2" :key="index" @click="tabLink(item.path)">
                {{item.name}}
            </span>
        </template>
      
      
    </div>
  </div>
</template>

<script>
export default {
    props:['role'],
    data() {
        return {
            menu: [
                {
                    key: "0",
                    name: "信息分类管理",
                    path:'informationSort'
                },
                {
                    key: "1",
                    name: "信息单元管理",
                    path:'unitMangement'
                },
                {
                    key: "2",
                    name: "我的信息单元",
                    path:'myInformationUnit'
                },
                {
                    key: "3",
                    name: "我的联系人",
                    path:'contacts'
                },
                {
                    key: "4",
                    name: "联系人审核",
                    path:'toAudit'
                },
                {
                    key: "5",
                    name: "任务分配及委派",
                    path:'taskPlant'
                },
                {
                    key: "6",
                    name: "违禁词管理",
                    path:'ContrabandWords'
                },
                {
                    key: "7",
                    name: "我的任务达标统计",
                    path:'mytaskTotal'
                },
                {
                    key: "8",
                    name: "部门任务达标统计",
                    path:'departmentTaskReach'
                },
                {
                    key: "9",
                    name: "任务达标统计",
                    path:'mytaskTotalOne'
                }
            ],
            menu1: [
                {
                    key: "0",
                    name: "我的信息单元",
                    path:'myInformationUnit'
                },
                {
                    key: "1",
                    name: "我的联系人",
                    path:'contacts'
                },
                {
                    key: "2",
                    name: "任务分配及委派",
                    path:'taskPlant'
                },
                {
                    key: "3",
                    name: "我的电话记录",
                    path:'myphoneRecords'
                },
                {
                    key: "4",
                    name: "我的任务达标统计",
                    path:'mytaskTotal'
                },
                {
                    key: "5",
                    name: "部门任务达标统计",
                    path:'departmentTaskReach'
                },
                {
                    key: "6",
                    name: "任务达标统计",
                    path:'mytaskTotalOne'
                },
                {
                    key: "7",
                    name: "电话时长设置",
                    path:'telDurationSet'
                }
            ],
            menu2: [
                {
                    key: "0",
                    name: "我的信息单元",
                    path:'myInformationUnit'
                },
                {
                    key: "1",
                    name: "我的联系人",
                    path:'contacts'
                },
                {
                    key: "2",
                    name: "我的电话记录",
                    path:'myphoneRecords'
                },
                {
                    key: "3",
                    name: "我的任务达标统计",
                    path:'mytaskTotal'
                }
            ]
        };
    },
    methods:{
        tabLink(path){
            this.$router.push({
                path:'/'+path
            })
        }
    }
};
</script>

<style scoped>
</style>