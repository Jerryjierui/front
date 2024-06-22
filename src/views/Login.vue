<template>
  <div class="shell">
    <div class="container a-container " id="a-container" :class="showLogin ? 'is-tx' :'is-hidden' ">
      <form class="form" id="a-form" @submit.prevent="register">
        <h2 class="form_title title">创建账号</h2>
        <div class="form_icons">
          <!-- Icons could go here -->
        </div>
        <input type="text" class="form_input" placeholder="Name" v-model="register.userName">
        <input type="text" class="form_input" placeholder="Email" v-model="register.userEmail">
        <input type="password" class="form_input" placeholder="Password" v-model="register.userPassword">
        <button class="form_button button submit" @click="submitRegister">注册</button>
      </form>
    </div>

    <div class="container b-container" id="b-container" :class="!showLogin ? 'is-txl is-z' :'is-hidden'" >
      <form class="form" id="b-form" @submit.prevent="login" :rules="rules">
        <h2 class="form_title title">登入账号</h2>
        <span class="form_span">选择登录方式或电子邮箱登录</span>
        <input type="text" class="form_input" placeholder="Email" v-model="login.userEmail">
        <input type="password" class="form_input" placeholder="Password" v-model="login.userPassword">
        <a class="form_link">忘记密码？</a>
        <button class="form_button button submit" @click="submitLogin">登录</button>
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
        userEmail: '',
        userPassword: ''
      },register:{
        userName: '',
        userEmail: '',
        userPassword: ''
      },
      showLogin: true
    };
  },
  methods: {
    submitLogin(){
      request.post('/login',this.login).then(res =>{
        console.log(res);
      })
      // 对响应信息进行判断
				if (response.status===200){
					this.$message({
						type:"success",
						message:"登录成功"
					});
					// 跳转
					// this.$router.push({name:"page"})
				}
    },  
    submitRegister() {
      request.post('/register',this.register).then(res =>{
        console.log(res);
      })
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

  