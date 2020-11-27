<template>
    <div  style="height: 100%;width: 100%;position: relative;background-color: white;">
        <div class="page_header">
            <!-- <PageHeader @click_goback="goback"
                        project_name="导入数据"
                        :use_right_button="false">
            </PageHeader> -->
        </div>
        <div class="br"></div>
        <div style="padding-top: 20px;padding-bottom: 20px; height: 80%; overflow: auto;">
            <div style="min-height: 400px;">
                <el-form ref="form" :model="form" label-width="500px" size="small">
                    <el-form-item label="请选择数据分类">
                        <el-select v-model="form.dataset_id" placeholder="" style="width: 400px;">
                            <el-option :label="dataset.d_name" :value="dataset.d_id" :key="dataset.d_id" v-for="dataset in dataset_list"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="请选择您想导入的数据类型" style="margin-bottom: 0;">
                        <el-radio-group v-model="form.type">
                            <el-radio label="表格文件excel/csv"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" style="margin-bottom: 0;">
                        <el-radio-group v-model="form.type">
                            <el-radio label="文件集合"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="">
                        <el-radio-group v-model="form.type">
                            <el-radio label="外部数据库"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="请选择导入的文件" v-show="form.type!=''">
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                action=""
                                :limit="1"
                                :auto-upload="false" style="width: 400px;">
                            <el-button slot="trigger" size="small" icon="el-icon-upload">选择文件</el-button>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="数据集名称" v-show="form.type!=''">
                        <el-input v-model="form.table_name" placeholder="请输入内容" style="width:400px;"></el-input>
                    </el-form-item>
                    <el-form-item label="" v-show="form.type!=''">
                        <el-switch v-model="form.use_title"></el-switch>
                        <span>"将第一行作为数据表的列字段名称"</span>
                    </el-form-item>
                </el-form>

                <!-- <el-table
                        :data="table"
                        style="padding-left: 10px;padding-right: 10px;" v-show="table.length!=0">
                    <el-table-column
                            :key="k"
                            :prop="k"
                            :label="k" v-for="k in table_head">

                            <template slot="header" slot-scope="scope">
                                <span>{{k}}</span>
                                <el-select v-model="table_head_type[k]" placeholder="" style="margin-left:10px; width:150px;">
                                    <el-option :label="type" :value="type" :key="type" v-for="type in choosable_type"></el-option>
                                </el-select>
                            </template>

                    </el-table-column>

                </el-table> -->
            </div>
            <div style="margin-top: 30px">
                <el-button style="margin-left: 450px;">取消</el-button>
                <el-button type="primary">确定</el-button>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "ModuleImportPage",
        props: ["__user__","dataset_list"],
        data(){
            return{
                user:this.__user__,

                form:{
                    dataset_id:"",
                    type:"",
                    file: {},
                    table_name:"",
                    use_title:true,
                },
                table:[],
                table_head:[],
                table_head_type:[],
                choosable_type:["字符串","时间","数字",]

            }
        },
        components:{
            // PageHeader,
        },
        methods:{
            // showExcel(file){
            //     const types = file.name.split('.')[1]
            //     const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
            //     if (!fileType) {
            //         this.$message('格式错误！请重新选择')
            //         return
            //     }
            //     this.file2Xce(file).then(tabJson => {
            //         if (tabJson && tabJson.length > 0) {
            //             this.form.file = tabJson
            //             this.table_head=[]
            //             this.table_head_type=[]

            //             this.table = this.form.file[0].sheet
            //             console.log('数据', this.form.file)
            //             console.log('table', this.table)
            //             for(let key in this.form.file[0].sheet[0]){
            //                 this.table_head.push(key)
            //             }
            //             console.log('tableHead', this.table_head)

            //         }
            //     })
            // },
            // file2Xce(file) {
            //     return new Promise(function(resolve, reject) {
            //         const reader = new FileReader()
            //         reader.onload = function(e) {
            //             const data = e.target.result
            //             this.wb = XLSX.read(data, {
            //                 type: 'binary'
            //             })
            //             const result = []
            //             this.wb.SheetNames.forEach((sheetName) => {
            //                 result.push({
            //                     sheetName: sheetName,
            //                     sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            //                 })
            //             })
            //             resolve(result)
            //         }
            //         reader.readAsBinaryString(file.raw)
            //     })
            // },

            goback(){
                this.$router.go(-1);
            }

        },

    }
</script>

<style scoped>
    el-form-item{
        margin-bottom: 10px;
    }
    .page_header{
        height: 50px;
        line-height: 50px;
        top: 100px;
        left: 10px;
        right: 10px;
        background-color: white;
        cursor:default;
    }
    .br{
        height: 20px;
        width: 100%;
        background-color: rgb(240,240,245);
    }

</style>