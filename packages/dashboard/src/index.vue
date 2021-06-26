<template>
 <el-descriptions class="margin-top" title="带边框列表" :column="3" :size="size" border>
    <template #extra>
      <el-button type="primary" size="small">操作</el-button>
    </template>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-user"></i>
        用户名
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
  
  import { ElDescriptions,ElDescriptionsItem,ElButton,ElTag} from 'element-plus'
  import 'element-plus/lib/theme-chalk/el-descriptions.css'
  import 'element-plus/lib/theme-chalk/el-descriptions-item.css'
  import 'element-plus/lib/theme-chalk/el-button.css'
  import 'element-plus/lib/theme-chalk/el-tag.css'
  export default {
    name: 'DoDashboard',
    components:{ElDescriptions,ElDescriptionsItem,ElButton,ElTag},
    data () {
      return {
        size: ''
      };
    }
  }
</script>
