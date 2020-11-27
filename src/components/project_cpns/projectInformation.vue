<template>
    <div>
        <div class="page_header">
            <PageHeader :invite_button="false"></PageHeader>
        </div>
        <div class="info_content">
            <h2>{{msg}}</h2>
        </div>  
    </div>
</template>

<script>
import PageHeader from '../../views/subHead.vue';

export default {
    
    name: 'projectInformation',
    data() {
        return {
            msg: 'This is Project information!'
        }
    },
    components: {
        PageHeader,
    }
}
</script>

<style>
.page_header{
        position: fixed;
        height: 50px;
        line-height: 50px;
        top: 100px;
        left: 10px;
        right: 10px;
        background-color: white;
        cursor:default;
    }
.info_content {
    position: fixed;
    top: 160px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background-color: white;
}
</style>