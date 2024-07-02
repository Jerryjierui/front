<template>
    <el-card>
        <div>
    <el-input style="width: 200px;" placeholder="查询教材名称" v-model="bookName"></el-input>
    <el-input style="width: 200px; margin: 0 5px;" placeholder="查询出版社" v-model="publisher"></el-input>
    <el-button type="primary" @click="load">查询</el-button>
    <el-button type="info" @click="reset">重置</el-button>
  </div>
  <div style="margin: 10px 0">
    <el-button type="primary" plain @click="handleAdd">新增</el-button>
    <el-button type="danger" plain @click="delBatch">批量删除</el-button>
  </div>
        </el-card>
        <el-card>
            <el-table :data="book" stripe :header-cell-style="{ backgroundColor: 'aliceblue',color: '#666' }" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="Id" prop="id" align="center"></el-table-column>
                <el-table-column label="封面" align="center">
                    <template #default="scope">
                        <el-image
                            style="width: 100px; height: 100px; border-radius: 50%; cursor: pointer; z-index: 2000;" :src="scope.row.cover">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="书名" prop="bookName" align="center"></el-table-column>
                <el-table-column label="作者" prop="author" align="center"></el-table-column>
                <el-table-column label="出版社" prop="publisher" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column label="数量" prop="bookNumber" align="center"></el-table-column>
                <el-table-column label="分类" prop="classify" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="180">
                    <template v-slot="scope">
                        <el-button size="small" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" plain @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>
        </el-card>


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

    <el-dialog title="教材信息" v-model="formVisible" width="30%">
      <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
        <el-form-item label="教材名" prop="bookName">
          <el-input v-model="form.bookName" placeholder="教材名"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">

            <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/file/upload"
                :headers="{ token: user.token }"
                :show-file-list="false"
                :on-success="handlecoverSuccess">
                <img v-if="form.cover" :src="form.cover" class="cover" style="width: 100px; height: 100px;"/>
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>

        </el-form-item>
        <el-form-item label="作者" prop="c">
          <el-input v-model="form.author" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input type="textarea" v-model="form.publisher" placeholder="出版社"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="bookNumber">
          <el-input-number v-model="form.bookNumber" :min="1" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.classify" placeholder="选择分类">
            <el-option label="文学" value="文学"></el-option>
            <el-option label="小说" value="小说"></el-option>
            <el-option label="散文" value="散文"></el-option>
            <el-option label="诗歌" value="诗歌"></el-option>
            <el-option label="计算机" value="计算机"></el-option>
            <el-option label="人工智能" value="人工智能"></el-option>
            <el-option label="时政" value="时政"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </el-dialog>


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
      book: [],  // 存储书本数据
      total: 0,  // 数据总条数
      bookName: '',  // 搜索用的教材名
      publisher: '',  // 搜索用的出版社名称

      rules:{
        bookName:{required:true, message:"请输入书本名称",trigger:"blur"}
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
        request.delete('/book/delete/batch', { data: this.ids }).then(res => {
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
        request.delete('/book/delete/' + id).then(res => {
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
      request.get('/book/selectByPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          bookName: this.bookName,
          publisher: this.publisher,
        }
      }).then(response => {
        if (response && response.data) {
          this.book = response.data.list;  // 假设后端返回的数据中有一个用户列表是 'list'
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
      this.bookName = '';
      this.publisher = '';
      this.load();  // 重置搜索条件并重新加载数据
    },
    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          request({
            url:this.form.id ? '/book/update' : '/book/add',
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
    handlecoverSuccess(response, file, fileList) {
      this.form.cover = response.data;  // 更新头像URL
    },
  }
}
</script>

<style>
</style>
