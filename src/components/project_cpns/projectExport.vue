<template>
    <div>
        <div class="page_header">
            <subHead :invite_button="false"></subHead>
        </div>
        <div class="info_content">
            <h2>{{msg}}</h2>
        </div>  
    </div>
</template>

<script>
import subHead from '../../views/subHead.vue';

export default {
    
    name: 'projectExport',
    data() {
        return {
            msg: 'This is Project export page!'
        }
    },
    components: {
        subHead,
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