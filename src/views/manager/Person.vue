<template>
    <el-card style="width: 50%;">
        <el-form :model="user">
            <el-form-item label="用户名">
                <el-input></el-input>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default{
    data(){
        return{
            user:JSON.parse(localStorage.getItem('honey-user') || '{}')
        }
    },
    methods:{
        load(){

        }
    }
}
</script>
<style>
</style>