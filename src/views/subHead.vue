<template>
    <div style="height: 100%;width: 100%;position: relative;">
        <!-- 返回上一级 -->
        <div class="page_header_son_back hover_text" @click="back">
            <div class="page_header_son1">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="page_header_son2">返回项目列表</div>
        </div>
        <div class="page_header_son3"></div>
        <!-- 显示项目名称 -->
        <div class="page_header_son4">{{project_name}}</div>
        
        <!-- 显示邀请按钮 -->
        <div class="page_header_son_invite" @click="$emit('invite')" v-show="invite_button">
            <slot name="right_button">

            </slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "subHead",
        props: ['project_name','invite_button'],
        methods: {
            back() {
                this.$router.push({path: '/project'})
            },
        }
    }
</script>

<style scoped>

    .page_header_son_back{
        position: absolute;
        left: 10px;
        width: 120px;
        height: 50px;

    }
    .page_header_son1{
        position: absolute;
        left: 10px;

    }
    .page_header_son2{
        position: absolute;
        left: 30px;
    }
    .page_header_son3{
        content: "";
        position: absolute;
        left: 130px;
        top: 17px;
        height: 16px;
        width: 1px;
        background-color: #DCDFE6;

    }
    .page_header_son4{
        position: absolute;
        left: 150px;
    }
    .page_header_son_invite{
        position: absolute;
        top: 10px;
        right: 20px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 5%;
        text-align: center;
        color: white;
        background-color: rgb(104,116,216);
    }
    .page_header_son_invite:hover{
        background-color: rgb(94,106,206);
    }
</style>