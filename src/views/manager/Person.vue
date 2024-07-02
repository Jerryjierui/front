<template>
    <div>
      <el-card style="width: 50%">
        <el-form :model="user" label-width="80px" style="padding-right: 20px">
          <div style="margin: 15px; text-align: center">
            <el-upload
                class="userAvatar-uploader"
                action="http://localhost:8080/file/upload"
                :headers="{ token: user.token }"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
            >
              <img v-if="user.userAvatar" :src="user.userAvatar" class="userAvatar" />
            </el-upload>
          </div>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="user.userName" placeholder="用户名" disabled></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="userPhone">
            <el-input v-model="user.userPhone" placeholder="电话"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-input v-model="user.role" placeholder="角色"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="userAddress">
            <el-input type="textarea" v-model="user.userAddress" placeholder="地址"></el-input>
          </el-form-item>
          <div style="text-align: center; margin-bottom: 20px">
            <el-button type="primary" @click="update">保 存</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  import request from '@/utils/request';
  export default {
    name: "Person",
    data() {
      return {
        user: JSON.parse(localStorage.getItem('honey-user') || '{}')
      }
    },
    created() {
  
    },
    methods: {
      update() {
        // 保存当前的用户信息到数据库
        request.put('/user/update', this.user).then(res => {
          if (res.code === '200') {
            // 成功更新
            this.$message.success('保存成功')
  
            // 更新浏览器缓存里的用户信息
            localStorage.setItem('honey-user', JSON.stringify(this.user))
  
            // 触发父级的数据更新
            this.$emit('update:user', this.user)
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      handleAvatarSuccess(response, file, fileList) {
        // 把user的头像属性换成上传的图片的链接
        this.user.userAvatar = response.data
      },
    }
  }
  </script>
  
  <style>
  .el-form-item__label {
    font-weight: bold;
  }
  .el-upload {
    border-radius: 50%;
  }
  .userAvatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
.userAvatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .userAvatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border-radius: 50%;
  }
  .userAvatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 50%;
  }
  </style>