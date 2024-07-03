<template>
        <div style="box-shadow: 0 0 10px rgba(0,0,0,.1); padding: 10px 20px; border-radius: 5px; margin-bottom: 10px">
            早安，骚年，祝你开心每一天！
          </div>
          <el-card style="width: 50%;">
            <div slot="header" class="clearfix">
              <span>LV牌教材征订</span>
            </div>
            <div>
              信念是一种无坚不摧的力量，当你坚信自己能成功时，你必能成功！加油LV；
            </div>
          </el-card>
          
          <el-card style="width: 100%;float: right;">
            <el-calendar v-model="value" />
          </el-card>
        
</template>
<script>

export default{
    data(){
        return{
        }
    },
    mounted(){
  },
  methods:{
  }
}

</script>

<style>
</style>