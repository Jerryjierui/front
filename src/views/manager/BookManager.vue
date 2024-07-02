<template>
    <div>
        <el-card>
            <div>
                <el-input style="width: 200px;" placeholder="查询教材名称" v-model="bookName"></el-input>
                <el-input style="width: 200px; margin: 0 5px;" placeholder="查询出版社" v-model="publisher"></el-input>
                <el-button type="primary" @click="load">查询</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </div>
        </el-card>
        <el-card>
            <el-table :data="book" stripe :header-cell-style="{ backgroundColor: 'aliceblue', color: '#666' }">
                <el-table-column label="Id" prop="id" align="center"></el-table-column>
                <el-table-column label="封面" align="center">
                    <template #default="scope">
                        <el-image style="width: 100px; height: 100px; border-radius: 50%;" :src="scope.row.cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="书名" prop="bookName" align="center"></el-table-column>
                <el-table-column label="作者" prop="author" align="center"></el-table-column>
                <el-table-column label="出版社" prop="publisher" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column label="数量" prop="bookNumber" align="center"></el-table-column>
                <el-table-column label="分类" prop="classify" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="180">
                    <template #default="scope">
                        <el-button type="primary" @click="handleClickDelete(scope.row)">创建订单</el-button>
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

        <el-dialog title="创建订单" v-model="formVisible" width="60%">
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
                <el-button type="primary" @click="submitOrder">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    data() {
        return {
            book: [],
            buyers: [],
            selectedBuyer: null,
            pageNum: 1,
            pageSize: 4,
            total: 0,
            bookName: '',
            publisher: '',
            formVisible: false,
            form: {
                bookName: '',
                quantity: 1,
                price: 0
            },
        }
    },
    computed: {
        // 计算总价的计算属性
        totalPrice() {
            return this.form.quantity * this.form.price;
        }
    },
    mounted() {
        this.load();
        this.loadBuyers();
    },
    methods: {
        handleChange(){

        },
        submitOrder() {
            // 检查是否已选择购买者
            if (!this.selectedBuyer) {
                this.$message.error('请选择一个购买者');
                return;
            }

            // 确保订单信息完整
            if (!this.form.bookName || !this.form.quantity || !this.form.price) {
                 this.$message.error('订单信息不完整');
                return;
            }   

            // 计算总价
            this.form.totalPrice = this.form.quantity * this.form.price;

            // 准备提交的订单数据
            const orderData = {
                bookName: this.form.bookName,
                quantity: this.form.quantity,
                price: this.form.price,
                totalPrice: this.form.totalPrice,
                buyerId: this.selectedBuyer.id,
                buyerName: this.selectedBuyer.userName,
                buyerPhone: this.selectedBuyer.userPhone,
                buyerAddress: this.selectedBuyer.userAddress
            };

             // 调用API提交订单
            request.post('/order/submit', orderData)
            .then(response => {
            if (response.code == "200") {
                this.$message.success('订单提交成功');
                // this.resetOrderForm();
                this.formVisible = false;
            } else if (response.data && response.data.message) {
                this.$message.error('订单提交失败: ' + response.data.message);
            } else {
                this.$message.error('订单提交失败');
            }
        })
        .catch(error => {
            console.error('订单提交错误:', error);
            this.$message.error('订单提交异常: ' + (error.response?.data?.message || "未知错误"));
        });

        },
        handleClickDelete(row) {
            this.form.bookName = row.bookName;
            this.form.quantity = row.num;
            this.form.price = row.price;
            this.form.totalPrice = row.num * row.price;
            this.formVisible = true;
        },
        selectBuyer(buyer) {
            this.selectedBuyer = buyer;
        },
        load() {
            request.get('/book/selectByPage', {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    bookName: this.bookName,
                    publisher: this.publisher,
                }
            }).then(response => {
                this.book = response.data.list;
                this.total = response.data.total;
            });
        },
        loadBuyers() {
            request.get('/user/selectAllUser').then(response => {
                this.buyers = response.data;
            });
        },
        handleCurrentChange(newPage) {
            this.pageNum = newPage;
            this.load();
        },
        reset() {
            this.bookName = '';
            this.publisher = '';
            this.load();
        }
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
