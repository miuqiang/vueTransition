<template>
    <div class="start">
        <el-row>
            <el-col :span="8">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://dz.ickkey.com:8085/api/log/upload/"
                    :on-preview="handlePreview"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :on-remove="handleRemove"
                    :headers="headers">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
            </el-col>
            <el-col :span="24">
                <div class="pdt-20">
                    <el-button @click="changeStatus(2)" size="medium">开始</el-button>
                    <el-button @click="changeStatus(1)" size="medium">停止</el-button>
                    <el-button @click="changeStatus(3)" size="medium">清空</el-button>
                </div>
            </el-col>
        </el-row>
        <section class="main-box">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="locksNo"
                    label="网关编号">
                </el-table-column>
                <el-table-column
                    prop="locksNo"
                    label="门锁编号">
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 15, 30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "start",
    data() {
        return {
            currentPage:1,
            pageSize:10,
            total:0,
            tableData:[],
            multiple:false,
            headers:{
                'token':localStorage.getItem('token')
            }
        };
    },
    methods:{
        handleSizeChange(val){
            this.pageSize = val;
            this.currentPage = 1;
        },
        handleCurrentChange(val){
            this.currentPage = val;
        },
        changeStatus(status){
            console.log(status)
        },
        changeStatus(arg){
            this.$http.get('api/log/starts?status='+arg).then(response => {
                if(response.data.code === 0){
                    this.$message.success({message:'操作成功！'});
                }else{
                    this.$message({message: response.data.msg});
                }
                this.loading = false;
            }, response => {
                // error callback
                this.loading = false;
            })
        },
        handlePreview(file){
            console.log(file.name)
        },
        handleRemove(file, fileList){
            console.log(fileList)
        },
        handleAvatarSuccess(res, file){

        },
        beforeAvatarUpload(file){
            const isJPG = file.type === 'xlsx/xls';
            if (!isJPG) {
                this.$message.error('上传文件格式不对，只能是Excel表格!');
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
