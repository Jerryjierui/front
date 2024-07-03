<template>
  <div class="container">
    <el-rate v-model="value" clearable />
    <button @click="saveRating">保存评分</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0, // 这里存储用户的评分
    };
  },
  methods: {
    saveRating() {
      // 将评分数据保存到前端的逻辑
      localStorage.setItem('userRating', this.value);
      alert('评分已保存: ' + this.value);
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 全屏高度 */
}

.el-rate {
  font-size: 24px; /* 增大评分组件的图标大小 */
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px; /* 增大按钮字体大小 */
  cursor: pointer;
}
</style>
