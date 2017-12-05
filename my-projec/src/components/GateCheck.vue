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
                    label="网关编号">
                </el-table-column>
                <el-table-column
                    prop="outlineTime"
                    label="掉线次数">
                </el-table-column>
                <el-table-column
                    prop="allTime"
                    label="总时间">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.allTime | timesfilter}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="outlineTimestamp"
                    label="掉线时间">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.outlineTimestamp | timesfilter}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="outlineTimestamp"
                    label="查看">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="viewDetail(scope.row)"
                            type="text"
                            size="small">
                            详情
                        </el-button>
                    </template>
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

        <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            width="50%">
            <el-table
                :data="tableData1"
                v-loading="loading1"
                style="width: 100%">
                <el-table-column
                    prop="startTime"
                    label="开始时间">
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    label="结束时间">
                </el-table-column>
                <el-table-column
                    prop="timeStamp"
                    label="时长">
                    <template slot-scope="scope">
                        <span>
                            {{scope.row.timeStamp | timesfilter}}
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[10, 15, 30]"
                    :page-size="pageSize1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// import {timesfilter} from '../util/filters';

export default {
    name: "gatecheck",
    data() {
        return {
            key:'',
            currentPage:1,
            pageSize:10,
            total:0,
            tableData:[],
            loading:false,
            dialogVisible:false,

            currentPage1:1,
            pageSize1:10,
            total1:0,
            tableData1:[],
            loading1:false,
        };
    },
    created(){
        this.getList();
    },
    watch:{
        key: function () {
            if(this.key == ''){
                this.currentPage = 1;
                this.getList();
            }
        }
        },
    methods:{
        getList() {
            var offset = (this.currentPage == 1) ? 0 : ((this.currentPage -1)*this.pageSize);
            let pram = {
                limit:this.pageSize,
                offset:offset,
                numbers:this.key
            };
            this.loading = true;
            this.$http.get('api/log/gateway',{params:pram}).then(response => {
                if(response.data.code === 0){
                    this.tableData = response.data.response.list;
                    this.total = response.data.response.totalCount;
                }else{
                    this.$message({message: response.data.msg});
                }
                this.loading = false;
            }, response => {
                // error callback
                this.loading = false;
            })
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getList();
        },
        search(){
            this.currentPage = 1;
            this.getList();
        },
            handleSizeChange1(val){
            this.pageSize = val;
            this.currentPage = 1;
            this.getList();
        },
        handleCurrentChange1(val){
            this.currentPage = val;
            this.getList();
        },
        viewDetail(row){
            var offset = (this.currentPage == 1) ? 0 : ((this.currentPage -1)*this.pageSize);
            this.dialogVisible = true;
            let prams = {
                    limit:this.pageSize1,
                    offset:offset,
                    number:row.gatewayNo
                };
            this.loading1 = true;
            this.$http.get('api/log/detailLogger',{params:prams}).then(response => {
                if(response.data.code === 0){
                    this.tableData1 = response.data.response.list;
                    this.total1 = response.data.response.totalCount;
                }else{
                    this.$message({message: response.data.msg});
                }
                this.loading1 = false;
            }, response => {
                // error callback
                this.loading1 = false;
            })
        }
    }
};
</script>
