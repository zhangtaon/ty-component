<template>
    <div class="bread-crumb">
      <div class="bread-line"></div>
      <span class="bread-font">Breadcrumb</span>
      <div class="select-detail">
        <el-select v-model="enterpriseNameId" filterable placeholder="请输入__名称" size="small">
        </el-select>
        <el-input v-model="sensorInput" placeholder="请输入" size="small"></el-input>
        <el-button type="primary" @click="check">查询</el-button>
        <span class="el-icon-circle-plus-outline select-icon" @click="addBtn()"></span>
        <span class="el-icon-s-unfold select-icon" @click="exportExcel()"></span>
      </div>
    </div>
</template>

<script>
export default {
    name: "Breadcrumb",
    created () {
    },
    computed: {
    },
    data () {
        return {
            enterpriseNameId: "", // 选择的企业名称
            sensorInput: "", // 传感器位号或名称
            
        }
    },
    methods: {
        // 导出
        exportExcel () {
        },
        // 查询
        check() {
        },
        // 新增
        addBtn() {
        }
    }
}
</script>

<style lang="scss" scoped>
.sensor {
  .sensor-table {
    .sensor-table-title {
      font-size: 16px;
      display: inline-block;
    }
    .sensor-table-btn {
      display: inline-block;
      float: right;
    }
    .sensor-table-form{
        padding-top: 20px;
        i{
            cursor: pointer;
            padding-right: 20px;
        }
        .el-pagination{
            float: right;
            padding: 20px;
        }
    }
  }
}
</style>