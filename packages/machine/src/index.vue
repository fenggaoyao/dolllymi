<template>
  <el-row>
  <el-col :sm="12" :lg="6">
    <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template #extra>
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="6">
    <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
      <template #extra>
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="6">
    <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
      <template #extra>
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
  <el-col :sm="12" :lg="6">
    <el-result icon="info" title="信息提示" subTitle="请根据提示进行操作">
      <template #extra>
        <el-button type="primary" size="medium">返回</el-button>
      </template>
    </el-result>
  </el-col>
</el-row>
</template>

<script>
  //import { ref } from 'vue'
  import { ElResult,ElButton } from 'element-plus'
  import 'element-plus/lib/theme-chalk/el-result.css'
  import 'element-plus/lib/theme-chalk/el-button.css'
  export default {
    name: 'DoMachine',
    components:{ElResult,ElButton},
    props: {
    }
  }
</script>
