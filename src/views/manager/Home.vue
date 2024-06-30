<template>
    <div>
        <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding: 10px 20px; border-radius: 5px; margin-bottom: 10px">
            早安，骚年，祝你开心每一天！
          </div>
          <div style="display: flex;">
          <el-card style="width: 30%">
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
          <el-card style="width: 70%">
            <div slot="header" class="clearfix">
              <span>渲染用户数据</span>
            </div>
            <div>
              <el-table :data="user">
                <el-table-column label="Id" prop="id"></el-table-column>
                <el-table-column label="用户名" prop="userName"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="文件上传">
                 <template v-slot="scope">
                  <el-upload
              action="http://localhost:8080/file/upload"
              :on-success="(file,fileList) => handleTableFileUpload(scope.row,file,fileList)"
              :headers="{token: users.token}"
              :show-file-list="false"
              >
              <el-button type="primary">点击上传</el-button>
            </el-upload>
                 </template>
                </el-table-column>
                <el-table-column label="文件上传">
                  <template v-slot="scope">
                    <el-image v-if="scope.row.userAvatar" :src="scope.row.userAvatar" style="width: 50px; height: 50px;"></el-image>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </div>

        <div>
          <el-card style="width: 50%; margin-right: 10px;">
            <div style="display: flex; margin: 10px 0;">
              <span>单文件上传下载</span>
            </div>
            <div>
              <el-upload
              accept="jpg"
              action="http://localhost:8080/file/upload"
              :on-success="handFileUpload"
              :headers="{token: users.token}"
              list-type="picture"
              :file-list="fileList"
              >
              <el-button type="primary">点击上传</el-button>
        </el-upload>
            </div>

            <div style="display: flex; margin: 10px 0;">
              <span>多文件上传下载</span>
            </div>
            <div>
              <el-upload

              action="http://localhost:8080/file/upload"
              :on-success="handleMultipleFileUpload"
              :headers="{token: users.token}"
              multiple
              >
              <el-button type="primary">点击上传</el-button>
        </el-upload>
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
          users: JSON.parse(localStorage.getItem("honey-user") || '{}'),  
          user:[],
          fileList:[]
        }
    },
    mounted(){//页面加载完成之后加载出来
        request.get('/selectAll').then(response =>{
        // console.log(response);
        this.user = response.data;
    })
  },
  methods:{
    handleMultipleFileUpload(response,file,fileList){
      
    },
    handleTableFileUpload(row,res,file,fileList){
      console.log("Row data:", row);
      
      // console.log(row,file,fileList)
      row.userAvatar = res.data;
      // 使用JSON方法克隆对象
      console.log(JSON.parse(JSON.stringify(row)));

      request.put('/user/update', JSON.parse(JSON.stringify(row)) ).then(res =>{
        if(res.code == '200'){
          this.$message.success('上传成功')
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    handFileUpload(response,file,fileList){
      this.fileList = fileList;
    }
  }
}

</script>

<style>
</style>