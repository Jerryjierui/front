<template>
    <div class="full-screen-background">
      <div class="forgot-password-page">
        <h1>重置密码</h1>
        <form @submit.prevent="resetPassword">
          <div>
            <label>手机号码：</label>
            <input type="text" v-model="userPhone" placeholder="输入手机号">
          </div>
          <div>
            <label>新密码：</label>
            <input type="password" v-model="newPassword" placeholder="新密码">
          </div>
          <div>
            <label>确认新密码：</label>
            <input type="password" v-model="confirmPassword" placeholder="确认新密码">
          </div>
          <button type="submit">提交</button>
        </form>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        userPhone: '',
        newPassword: '',
        confirmPassword: ''
      };
    },
    methods: {
      resetPassword() {
        if (this.newPassword !== this.confirmPassword) {
          alert('两次输入的密码不一致，请重新输入！');
          return;
        }
        // 发送重置密码请求到后端
        console.log('重置密码请求发送:', this.userPhone, this.newPassword);
        // 假设重置成功
        alert('密码已重置，请使用新密码登录。');
        this.$router.push('/login');  // 密码重置后跳转到登录页面
      }
    }
  }
  </script>
  
  <style scoped>
.full-screen-background {
  background-image: url('https://i.postimg.cc/DysHCkZX/image.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: fixed; /* 或使用 absolute，取决于其他布局 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.forgot-password-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8); /* 可选：增加白色半透明背景以提高可读性 */
  border-radius: 5px; /* 可选：添加圆角 */
}
</style>

  