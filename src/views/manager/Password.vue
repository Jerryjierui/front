<template>
    <div>
      <el-card style="width: 50%">
        <el-form ref="formRef" :model="user" :rules="rules" label-width="80px" style="padding-right: 20px">
          <el-form-item label="原始密码" prop="userPassword">
            <el-input show-password v-model="user.userpassword" placeholder="原始密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input show-password v-model="user.newPassword" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input show-password v-model="user.confirmPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <div style="text-align: center; margin-bottom: 20px">
            <el-button type="primary" @click="update">确认修改</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  import request from '@/utils/request';
  export default {
    name: "userPassword",
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认密码'))
        } else if (value !== this.user.newPassword) {
          callback(new Error('确认密码错误'))
        } else {
          callback()
        }
      }
  
      return {
        user: JSON.parse(localStorage.getItem('honey-user') || '{}'),
        rules: {
          userPassword: [
            { required: true, message: '请输入原始密码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          confirmPassword: [
            { validator: validatePassword, required: true, trigger: 'blur' },
          ],
        }
      }
    },
    created() {
  
    },
    methods: {
      update() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.user.userPassword = this.user.newPassword
            console.log(JSON.parse(JSON.stringify(this.user)))
            // 保存当前的用户信息到数据库
            request.put('/user/update', JSON.parse(JSON.stringify(this.user))).then(res => {
              if (res.code === '200') {
                // 成功更新
                this.$message.success('保存成功')
                this.$router.push('/login')
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      },
    }
  }
  </script>
  
  <style>
  .el-form-item__label {
    font-weight: bold;
  }
  </style>