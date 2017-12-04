<template>
    <div class="gate-check">
        <el-row>
            <el-col :span="4">
                <el-input
                    placeholder="网关编号"
                    clearable
                    v-model="key">
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button plain icon="el-icon-search" @click.native="search">搜索</el-button>
            </el-col>
        </el-row>
        <section class="main-box">
            <el-table
                :data="tableData"
                v-loading="loading"
                style="width: 100%">
                <el-table-column
                    prop="gatewayNo"
                    label="网关编号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="outlineTime"
                    label="掉线次数"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="allTime"
                    label="总时间">
                </el-table-column>
                <el-table-column
                    prop="outlineTimestamp"
                    label="掉线时间">
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
    name: "gatecheck",
    data() {
        return {
            key:'',
            currentPage:1,
            pageSize:10,
            total:0,
            tableData:[],
            loading:false
        };
    },
    created(){
        this.getList();
    },
    watch:{
            key: function () {
                if(this.key == ''){
                    console.log(this.key)
                }
            }
        },
    methods:{
            getList() {
                let pram = {
					limit:this.pageSize,
					offset:this.currentPage,
					number:this.key
                };
                this.loading = true;
                this.$http.get('api/log/gateway',{params:pram}).then(response => {
                    console.log(response);
                    if(response.data.code === 0){
                        this.tableData = response.data.response.list;
                        this.total = response.data.response.totalCount;
                    }else{
                        this.$message({message: response.data.msg});
                    }
                    this.loading = false;
                }, response => {
                    // error callback
                    console.log(response);
                    this.loading = false;
                })
            },
            handleSizeChange(val){
                this.pageSize = val;
            },
            handleCurrentChange(val){
                this.currentPage = val;
            },
            search(){
                alert(1)
            }
        }
};
</script>
