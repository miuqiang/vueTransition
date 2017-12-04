<template>
    <div class="start">
        <el-row>
            <el-col :span="24">
                <el-input
                    placeholder="网关编号11"
                    prefix-icon="el-icon-search"
                    v-model="key">
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  name: "start",
  data() {
    return {
        key:''
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
