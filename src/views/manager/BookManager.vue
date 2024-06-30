<template>
    <div>
        <el-card>
           <div>查询</div> 
        </el-card>
        <el-card>
            <el-table :data="book" stripe :header-cell-style="{ backgroundColor: 'aliceblue',color: '#666' }" >
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="Id" prop="id" align="center"></el-table-column>
                <el-table-column label="封面" align="center">
                    <template #default="scope">
                        <el-image
                            style="width: 100px; height: 100px; border-radius: 50%; cursor: pointer; z-index: 2000;" :src="scope.row.cover">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="书名" prop="bookName" align="center"></el-table-column>
                <el-table-column label="出版社" prop="publisher" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column label="数量" prop="bookNumber" align="center"></el-table-column>
                <el-table-column label="分类" prop="classify" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="180">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClickEdit">编辑</el-button>
                        <el-button link type="primary" size="small" @click="handleClickDelete">删除</el-button>
                    </template>
                </el-table-column>
              </el-table>
        </el-card>
    </div>
</template>
<script>
import request from '@/utils/request';
export default{
    data(){
        return{
            book:[]    //所有的数据
        }
    },
    mounted(){
            request.get('/book/selectAllBook').then(response =>{
            // console.log(response);
            this.book = response.data;
            })
    }
}
</script>

<style>
</style>