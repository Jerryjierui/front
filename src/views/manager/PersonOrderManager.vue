<template>
    <div>
      <el-card>
        <div>
          <el-input style="width: 200px;" placeholder="查询订单" v-model="orderName"></el-input>
        
          <el-button type="primary" @click="loadOrders">查询</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </div>
        <div style="margin: 10px 0">
          <el-button type="danger" plain @click="delBatch">批量删除</el-button>
        </div>
      </el-card>
      <el-card>
        <el-table :data="order" stripe :header-cell-style="{ backgroundColor: 'aliceblue', color: '#666' }"  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="Id" prop="orderId" align="center"></el-table-column>
          <el-table-column label="书名" prop="bookName" align="center"></el-table-column>
          <el-table-column label="数量" prop="quantity" align="center"></el-table-column>
          <el-table-column label="单价" prop="price" align="center"></el-table-column>
          <el-table-column label="总价" prop="totalPrice" align="center"></el-table-column>
          <el-table-column label="用户姓名" prop="buyerName" align="center"></el-table-column>
          <el-table-column label="用户联系电话" prop="buyerPhone" align="center"></el-table-column>
          <el-table-column label="地址" prop="buyerAddress" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template #default="scope">
              <el-button size="small" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" plain @click="del(scope.row.orderId)">删除</el-button>
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
      <el-dialog title="创建/编辑订单" v-model="formVisible" width="60%">
        <el-form :model="form" label-width="80px" ref="formRef">
          <el-form-item label="书名">
            <el-input v-model="form.bookName" disabled></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number v-model="form.quantity" :min="1"/>
          </el-form-item>
          <el-form-item label="单价">
            <el-input v-model="form.price" disabled></el-input>
          </el-form-item>
          <el-form-item label="总价">
            <el-input v-model="totalPrice" disabled></el-input>
          </el-form-item>
          <el-form-item label="选择购买者">
                    <div v-for="buyer in buyers" :key="buyer.id" @click="selectBuyer(buyer)" :class="{'buyer-card': true, 'selected': buyer.id === selectedBuyer?.id}">
                        <div><strong>{{ buyer.userName }}</strong> </div>
                        <div>{{ buyer.userPhone }}</div>
                        <div>{{ buyer.userAddress }}</div>
                    </div>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formVisible = false">取消</el-button>
          <el-button type="primary" @click="updateOrder">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import request from '@/utils/request';
  
  export default {
    data() {
      return {
        buyerName: JSON.parse(localStorage.getItem('honey-user')).userName,
        order: [],
        buyers: [],
        selectedBuyer: null,
        pageNum: 1,
        pageSize: 8,
        total: 0,
        orderName: '',
        formVisible: false,
        form: {
                bookName: '',
                quantity: 1,
                price: 0
            },
        ids:[]
      }
    },
    computed: {
        // 计算总价的计算属性
        totalPrice() {
            return this.form.quantity * this.form.price;
        }
    },
    mounted() {
        this.loadBuyers();
        this.loadOrders();
    },
    methods: {
        selectBuyer(buyer) {
            this.selectedBuyer = buyer;
        },
        loadBuyers() {
            request.get('/user/selectAllUser').then(response => {
                this.buyers = response.data;
            });
        },
        handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.orderId)
    },
     delBatch() {//批量删除
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确认批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        request.delete('/order/deleteOrderByIds', { data: this.ids }).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.loadOrders(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {})
    },
      loadOrders() {
        request.get('/order/selectPersonOrder', {
          params: {
            buyerName: this.buyerName,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            bookName: this.orderName
          }
        }).then(response => {
          if (response.code=='200') {
            this.order = response.data.list;
            this.total = response.data.total;
          } else {
            this.$message.error('加载订单失败: ' + (response.data.message || '未知错误'));
          }
        }).catch(error => {
          console.error('加载订单数据出错:', error);
          this.$message.error('加载数据异常');
        });
      },
      handleCurrentChange(newPage) {
        this.pageNum = newPage;
        this.loadOrders();
      },
      reset() {
        this.orderName = '';
        this.loadOrders();
      },
      handleEdit(row) {
        this.form = { ...row};
        this.formVisible = true;
      },
      del(id) {
        this.$confirm('确定要删除这个订单吗？', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            request.delete('/order/deleteOrderByOrder', { params: { id } })
                .then(response => {
                    if (response.code=='200') {
                        this.$message.success('订单删除成功');
                        this.loadOrders();  // 重新加载订单列表
                    } else {
                        this.$message.error('删除失败: ' + (response.data.message || '未知错误'));
                    }
                })
                .catch(error => {
                    console.error('删除订单出错:', error);
                    this.$message.error('删除订单异常');
                });
        }).catch(() => {
            this.$message.info('删除操作已取消');
        });
    },
    updateOrder() {
        
            // 计算总价
            this.form.totalPrice = this.form.quantity * this.form.price;
        // 准备提交的订单数据
        const orderData = {
                orderId: this.form.orderId,
                bookName: this.form.bookName,
                quantity: this.form.quantity,
                price: this.form.price,
                totalPrice: this.form.totalPrice,
                buyerId: this.selectedBuyer.id,
                buyerName: this.selectedBuyer.userName,
                buyerPhone: this.selectedBuyer.userPhone,
                buyerAddress: this.selectedBuyer.userAddress
            };
        request.put('/order/update', orderData)
            .then(response => {
      if (response.code === '200') {
        this.$message.success('订单更新成功');
        this.loadOrders(); // 重新加载订单数据
        this.formVisible = false; // 关闭表单对话框
      } else {
        this.$message.error('更新失败: ' + (response.data.message || '未知错误'));
      }
    })
    .catch(error => {
      console.error('更新订单出错:', error);
      this.$message.error('更新异常');
    });
      },
    }
  }
  </script>
  
  <style>
  .buyer-card {
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s; /* 添加渐变效果 */
}

.buyer-card:hover, .buyer-card.selected {
    background-color: #f0f0f0; /* 鼠标悬浮和选中时的背景色 */
}
  </style>
  