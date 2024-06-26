<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <el-logoImg style="width: 100%;" src="../assets/logo.png"></el-logoImg>
        <!-- <el-divider /> -->
      </el-aside>
      <el-container>
        <el-header height="100px">Header</el-header>
        <el-divider />
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
</script>
<style>
.el-logoImg{
  height: 100px;
}
.el-aside{
  width: 200px;
  background-color: blue;
}
.el-header{
  background-color: red;
}
.el-main{
  background-color: black;
}
</style>
