<template>
  <div class="shell">
    <div class="container a-container " id="a-container" :class="showLogin ? 'is-tx' :'is-hidden' ">
      <form class="form" id="a-form" @submit.prevent="submitRegister">
        <h2 class="form_title title">创建账号</h2>
        <div class="form_icons">
          <!-- Icons could go here -->
        </div>
        <input type="text" class="form_input" placeholder="Name" v-model="register.userName">
        <!-- <input type="text" class="form_input" placeholder="Role" v-model="register.role"> -->
         <!-- 角色下拉选择框 -->
  <select class="form_input" v-model="register.role">
    <!-- <option disabled value="">请选择角色</option> -->
    <option value="tearcher">老师</option>
    <option value="student">学生</option>
  </select>
        <input type="password" class="form_input" placeholder="Password" v-model="register.userPassword">
        <button class="form_button button submit" type="subnit">注册</button>
      </form>
    </div>

    <div class="container b-container" id="b-container" :class="!showLogin ? 'is-txl is-z' :'is-hidden'" >
      <form class="form" id="b-form" @submit.prevent="submitLogin">
        <h2 class="form_title title">登入账号</h2>
        <!-- <span class="form_span">选择登录方式或电子邮箱登录</span> -->
        <input type="text" class="form_input" placeholder="Name" v-model="login.userName">
        <input type="password" class="form_input" placeholder="Password" v-model="login.userPassword">
        <a class="form_link" @click="$router.push('/forgot-password')">忘记密码？</a>
        <button class="form_button button submit" type="submit">登录</button>
      </form>
    </div>
    
    <!-- Switching Logic UI -->
    <div class="switch" id="switch-cnt" :class="showLogin ? 'is-txl is-gx' : 'is-txr is-gx'">
      <div class="switch_circle"></div>
      <div class="switch_circle switch_circle-t "></div>
      <div class="switch_container" id="switch-c1" v-if="showLogin">
        <h2 class="switch_title title">Welcome Back！</h2>
        <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
        <button class="switch_button button switch-btn" @click="toggleForm">登录</button>
      </div>

      <div class="switch_container" id="switch-c2" v-if="!showLogin">
        <h2 class="switch_title title">Hello Friend！</h2>
        <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
        <button class="switch_button button switch-btn" @click="toggleForm">注册</button>
      </div>
    </div>

    <div v-if="showForgotPasswordModal" class="forgot-password-modal">
      <div class="modal-content">
        <span class="close" @click="closeForgotPassword">&times;</span>
        <h2>重置密码</h2>
        <p>请验证你的手机号。</p>
        <input type="text" v-model="userPhone" placeholder="输入手机号">
        <p>输入新密码。</p>
        <input type="password" v-model="newPassword" placeholder="新密码">
        <p>确认新密码。</p>
        <input type="password" v-model="confirmPassword" placeholder="确认新密码">
        <button @click="resetPassword">重置密码</button>
      </div>
    </div>

  </div>


</template>

<script>
// import axios from 'axios';
import request from '@/utils/request'
import '../assets/login.css'

export default {
  data() {
    return {
      login:{
        userName: '',
        userPassword: ''
      },register:{
        userName: '',
        role: '',
        userPassword: ''
      },
      showLogin: true,
      showForgotPasswordModal: false,
      userPhone: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    toggleForgotPassword() {
      this.showForgotPasswordModal = true;
    },
    closeForgotPassword() {
      this.showForgotPasswordModal = false;
    },
    submitLogin(){
      try {
        // 发送请求
        request.post('/login',this.login).then(res =>{
          // console.log(response);
          // 对响应信息进行判断
				  if (res.code == 200){
					// 跳转 
            this.$message.success('登录成功')
					  this.$router.push("manager")
            localStorage.setItem("honey-user", JSON.stringify(res.data))  // 存储用户数据
				  }else{
            this.$message.error('用户名或密码错误，登录失败，请重新登录')
          }
        })
      } catch (error) {
        // console.error('登录失败:', error);
        this.$message.success('登录过程中发生错误')
      }
    },  
    submitRegister() {
      try {
        // 发送请求
        request.post('/register',this.register).then(response =>{
        // console.log(response);
        if(response.code == 200){
          this.$message.success('注册成功，去登入账号来进入奇妙世界吧')
        }else{
          this.$message.error('注册失败，邮箱和用户名已注册')
        }
        })
      } catch (error) {
        // console.error('登录失败:', error);
        this.$message.error('注册成功失败，请重新输入')
      }
    },
    toggleForm() {
      this.showLogin = !this.showLogin;
    }
  }
}
</script>

<style scoped>
/* CSS from your login.css file */
/* Insert your complete CSS here */
</style>

  