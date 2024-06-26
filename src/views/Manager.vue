<template>
    <div>
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="asideWidth" style="min-height: 100vh; background-color: #001529">
              <div style="height: 60px; line-height: 60px; font-size: 20px; display: flex; align-items: center; justify-content: center">
                <img src="../assets/logo.png" style="width: 50px;" alt="">
                <span class="logo-title" v-show="!isCollapse">博昊教材</span>
              </div>
                <el-menu router :collapse="isCollapse" :collapse-transition="false" background-color="#001529"
                  active-text-color="#fff" text-color="rgba(255, 255, 255, 0.65)" :default-active="$route.path"
                  style="border: none">
                    <el-sub-menu index="/">
                    <template #title>
                      <i class="el-icon-s-home"></i>
                      <el-icon><UserFilled /></el-icon>
                      <span>用户列表</span>
                    </template>
                        <el-menu-item index="home">用户列表</el-menu-item>
                        <el-menu-item index="1-2">用户添加</el-menu-item>
                  </el-sub-menu>

                <el-sub-menu index="2">
                    <template #title>
                      <el-icon><Reading /></el-icon>                    
                      <span>教材管理</span>
                    </template>
                      <el-menu-item index="book">教材信息</el-menu-item>
                      <el-menu-item index="2-2">教材添加</el-menu-item>
                      <el-menu-item index="2-3">类别管理</el-menu-item>
                      <el-menu-item index="2-4">教材入库管理</el-menu-item>
                      <el-menu-item index="2-5">样书申请管理</el-menu-item>
                      <el-menu-item index="2-6">教材购买管理</el-menu-item>
                      <el-menu-item index="2-7">通知公告管理</el-menu-item>
                  </el-sub-menu>

                  <el-sub-menu index="3">
                    <template #title>
                        <el-icon><User /></el-icon>
                        <span>权限管理</span>
                    </template>
                        <el-menu-item index="3-1">角色管理</el-menu-item>
                        <el-menu-item index="3-2">角色添加</el-menu-item>
                  </el-sub-menu>

                <el-sub-menu index="4">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>信息管理</span>
                    </template>
                      <el-menu-item index="4-1">学生管理</el-menu-item>
                      <el-menu-item index="4-2">教师管理</el-menu-item>
                      <el-menu-item index="4-3">个人信息修改</el-menu-item>
                  </el-sub-menu>
                </el-menu>

            </el-aside>
              <el-container>
            <!-- 头部 -->
            <el-header>
                <!-- <i :class="collapseIcon" @click="handleCollapse" style="font-size: 26px"></i> -->
                <el-icon @click="handleCollapse"><Expand /></el-icon>
                <el-breadcrumb separator="/" style="margin-left: 20px">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">课程管理</el-breadcrumb-item>
                </el-breadcrumb>

              <div style="flex: 1; display: flex; justify-content: flex-end; align-items: center">
                <el-icon style="font-size: 26px" @click="handleFull"><FullScreen /></el-icon>
            <el-dropdown :hide-on-click="false">
              <div style="display: flex; align-items: center; cursor: pointer">
              <img src="../assets/logo.png" alt="" style="width: 40px; height: 40px; margin: 0 5px">
            <span>{{ user.name }}</span>
            </div>
            <template #dropdown>
            <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logou">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
            </el-dropdown>
      </div>

            </el-header>
            <!--        主体区域-->
        <el-main>
          <router-view />
        </el-main>
            
      </el-container>
    </el-container>
    </div>
</template>
<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      isCollapse: false,  // 不收缩
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',
      user:[]
    }
  },
  mounted(){//页面加载完成之后加载出来
    request.get('/selectAll').then(response =>{
    // console.log(response);
    this.user = response.data;
  })
},
  methods: {
    logou(){
      localStorage.removeItem('honey-user') //清除当前的token
      this.$router.push('/login')
    },
    handleFull() {
      document.documentElement.requestFullscreen()
    },
    handleCollapse() {
      this.isCollapse = !this.isCollapse
      this.asideWidth = this.isCollapse ? '64px' : '200px'
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  }
}
</script>
<style>
.el-menu--inline, .el-menu-item {
  background-color: #000c17 !important;
}
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 25px !important;
  transition: color 0s;
}
.el-menu-item {
  min-width: 0 !important;
  width: calc(100% - 10px);
  margin: 5px;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 5px;
}

.el-menu--inline, .el-menu-item {
  background-color: #000c17 !important;
}


.el-submenu__title>i:nth-child(1) {
  margin-top: 2px;
}
.el-submenu__title>i.el-submenu__icon-arrow {
  margin-top: -5px;
}

.el-menu--inline>.el-menu-item {
  padding-left: 50px !important;
}
.el-menu-item.is-active {
  background-color: dodgerblue !important;
}

.el-menu-item:hover {
  color: #fff !important;
}

.el-submenu__title:hover *, .el-submenu__title:hover {
  color: #fff !important;
}

.el-aside {
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  background-color: #001529;
  color: #fff;
  min-height: 100vh;
  transition: width .3s;
}
.el-menu--collapse .el-submenu__title {
  padding: 0 20px !important;
}
.el-menu--collapse .el-tooltip {
  padding: 0 15px !important;
}
.logo-title {
  margin-left: 5px;
  transition: all .3s;
}
.el-header {
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  display: flex;
  align-items: center;
}
</style>