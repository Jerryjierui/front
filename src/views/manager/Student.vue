<template>
    <div>
              <el-table :data="student">
                <el-table-column label="序号" prop="id" align="center" ></el-table-column>                
                <el-table-column label="头像" align="center">
                    <template #default="scope">
                        <img :src="scope.row.userAvatar" alt="头像" style="width: 50px; height: 50px; border-radius: 50%;">
                    </template>
                </el-table-column>
                <el-table-column label="用户名" prop="userName" align="center"></el-table-column>
                <el-table-column label="姓名" prop="role" align="center"></el-table-column>
                <el-table-column label="手机号" prop="userPhone" align="center"></el-table-column>
                <el-table-column label="邮箱" prop="address" align="center"></el-table-column>
                <el-table-column label="地址" prop="userAddress" align="center"></el-table-column>
                <el-table-column label="角色" prop="role" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClickEdit">编辑</el-button>
                        <el-button link type="primary" size="small" @click="handleClickDelete">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>
            </div>
</template>

<script>
import request from '@/utils/request';
export default{
    data(){
        return{
            student:[]
        }
    },
    mounted(){//页面加载完成之后加载出来
        request.get('/selectAll').then(response =>{
        // console.log(response);
        this.student = response.data;
    })
  }
}
</script>
<style>
</style>