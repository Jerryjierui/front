<template>
    <div>
        <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding: 10px 20px; border-radius: 5px; margin-bottom: 10px">
            早安，骚年，祝你开心每一天！
          </div>
          <div style="display: flex;">
          <el-card style="width: 50%">
            <div slot="header" class="clearfix">
              <span>LV牌教材征订</span>
            </div>
            <el-divider />
            <div>
              信念是一种无坚不摧的力量，当你坚信自己能成功时，你必能成功！加油LV；
              <div style="margin-top: 20px">
                <div style="margin: 10px 0"><strong>主题色</strong></div>
                <el-button type="primary">按钮</el-button>
                <el-button type="success">按钮</el-button>
                <el-button type="warning">按钮</el-button>
                <el-button type="danger">按钮</el-button>
                <el-button type="info">按钮</el-button>
              </div>
            </div>
              
          </el-card>
          <el-card style="width: 50%">
            <div slot="header" class="clearfix">
              <span>渲染用户数据</span>
            </div>
            <div>
              <el-table :data="user">
                <el-table-column label="Id" prop="id"></el-table-column>
                <el-table-column label="用户名" prop="userName"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>
    </div>
</template>
<script>
import request from '@/utils/request'
export default{
    data(){
        return{
            // user: JSON.parse(localStorage.getItem("honey-user") || '{}')
            user:[]
        }
    },
    mounted(){//页面加载完成之后加载出来
        request.get('/selectAll').then(response =>{
        // console.log(response);
        this.user = response.data;
    })
  }
}

</script>

<style>
</style>