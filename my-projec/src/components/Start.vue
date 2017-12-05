<template>
    <div class="start">
        <el-row>
            <el-col :span="8">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://dz.ickkey.com:8085/api/log/upload/"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :headers="headers">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                </el-upload>
            </el-col>
            <el-col :span="24">
                <div class="pdt-20">
                    <el-button @click="changeStatus(2)" :loading="loading2" size="medium">开始</el-button>
                    <el-button @click="changeStatus(1)" :loading="loading1" size="medium">停止</el-button>
                    <el-button @click="changeStatus(3)" :loading="loading3" size="medium">清空</el-button>
                </div>
            </el-col>
        </el-row>
        <section class="main-box">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="gateWays"
                    label="网关编号">
                </el-table-column>
                <el-table-column
                    prop="locksNo"
                    label="门锁编号">
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>

<script>
export default {
    name: "start",
    data() {
        return {
            tableData:[],
            multiple:false,
            headers:{
                'token':localStorage.getItem('token')
            },
            loading1:false,
            loading2:false,
            loading3:false
        };
    },
    methods:{
        changeStatus(status){
            this.makeChange(status);
        },
        makeChange(arg){
            switch(arg){
                case 1:
                    this.loading1 = true;
                    break;
                case 2:
                    this.loading2 = true;
                    break;
                case 3:
                    this.loading3 = true;
                    break;
            }
            this.$http.get('api/log/starts?status='+arg).then(response => {
                if(response.data.code === 0){
                    this.$message.success({message:'操作成功！'});

                }else{
                    this.$message({message: response.data.msg});
                }
                this.loading1 = this.loading2 = this.loading3 = false;
            }, response => {
                this.loading1 = this.loading2 = this.loading3 = false;
            })
        },
        handleAvatarSuccess(res, file){
            var locks = [],
                gateways = [],
                data = [];
            if(res.code == 0){
                locks = res.locks;
                gateways = res.gateways;

                for(var i in locks){
                    data.push({'locksNo':locks[i],'gateWays':''})
                }
                for(var j in gateways){
                    data[j].gateWays = gateways[j]
                }
                this.tableData = data;
                this.$message({message: '长传成功！'});
            }else{
                this.$message({message: res.msg});
            }
        },
        beforeAvatarUpload(file){
            var file_type = (file.name).split('.')[1];
            console.log(file_type)
            if (file_type == 'xlsx' || file_type =='xls') {

            }else{
                this.$message.error('上传文件格式不对，只能是Excel表格!');
                return false;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
