<template>
  <div>
    <el-input style="width: 200px;" placeholder="查询用户" v-model="username"></el-input>
    <el-input style="width: 200px; margin: 0 5px;" placeholder="查询手机号" v-model="userPhone"></el-input>
    <el-button type="primary" @click="load">查询</el-button>
    <el-button type="info" @click="reset">重置</el-button>
  </div>
  <div style="margin: 10px 0">
    <el-button type="primary" plain @click="handleAdd">新增</el-button>
    <el-button type="danger" plain @click="delBatch">批量删除</el-button>
  </div>
  <div>
    <el-table :data="student" stripe :header-cell-style="{ backgroundColor: 'aliceblue', color: '#666' }" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="userPhone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="userAddress" label="地址" align="center"></el-table-column>
      <el-table-column label="头像">
        <template v-slot="scope">
          <el-image style="width: 50px; height: 50px; border-radius: 50%" v-if="scope.row.userAvatar" :src="scope.row.userAvatar" :preview-src-list="[scope.row.userAvatar]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="角色"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template v-slot="scope">
          <el-button size="small" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" plain @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="收货地址" v-model="formVisible" width="30%">
      <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddress">
          <el-input type="textarea" v-model="form.userAddress" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.role" placeholder="选择角色">
            <el-option label="admin" value="admin"></el-option>
            <el-option label="student" value="student"></el-option>
            <el-option label="teacher" value="teacher"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop="userAvatar">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/file/upload"
              :headers="{ token: user.token }"
              list-type="picture"
              :on-success="handleUserAvatarSuccess">
            <el-button type="primary">上传头像</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request';

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('honey-user')),
      form: {}, // 存储表单数据
      formVisible: false, // 控制对话框的显示
      pageNum: 1,  // 当前页码
      pageSize: 4,  // 每页条数
      student: [],  // 存储用户数据
      total: 0,  // 数据总条数
      username: '',  // 搜索用的用户名
      userPhone: '',  // 搜索用的手机号
      rules:{
        userName:{required:true, message:"请输入账号",trigger:"blur"}
      },
      ids: []
    };
  },
  mounted() {
    this.load();  // 组件挂载完成后加载数据
  },
  methods: {
    delBatch() {//批量删除
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        request.delete('/user/delete/batch', { data: this.ids }).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {})
    },
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)
    },
    del(id) {//根据id删除
      this.$confirm('您确认删除吗？', '确认删除', {type: "warning"}).then(response => {
        request.delete('/user/delete/' + id).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {})
    },
    handleAdd() {//新增数据
      this.form = {}
      this.formVisible = true
    },
    handleEdit(row) {//编辑数据
      this.form = JSON.parse(JSON.stringify(row)); // 给form对象赋值
      this.formVisible = true; // 显示对话框
    },
    // 加载分页数据
    load() {
      request.get('/user/selectByPage', {
        params: {
          role:'student',
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username,
          userPhone: this.userPhone,
        }
      }).then(response => {
        if (response && response.data) {
          this.student = response.data.list;  // 假设后端返回的数据中有一个用户列表是 'list'
          this.total = response.data.total;  // 从后端响应中获取总数
        }
      }).catch(error => {
        console.error('数据加载失败:', error);
      });
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;  // 更新当前页码
      this.load();  // 重新加载数据
    },
    reset() {
      this.username = '';
      this.userPhone = '';
      this.load();  // 重置搜索条件并重新加载数据
    },
    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          request({
            url:this.form.id ? '/user/update' : '/user/add',
            method:this.form.id ? 'PUT' : 'POST',
            data:this.form
          }).then(res =>{
            if(res.code == '200'){
              this.$message.success('保存成功')
              this.load(1)
              this.formVisible = false
            }else{
              this.$message.errpr(res.msg)//弹出错误信息
            }
          })
        }
      });
    },
    handleUserAvatarSuccess(response, file, fileList) {
      this.form.userAvatar = response.data;  // 更新头像URL
    },
  }
}
</script>

<style>
</style>
