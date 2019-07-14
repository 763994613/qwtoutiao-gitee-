<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>
            <slot>内容管理</slot>
        </my-bread>
      </div>

    <el-form :model="reqProblem" label-width="80px">
        <el-form-item label="状态：">
            <el-radio-group v-model="reqProblem.status">
                <el-radio :label="null">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="频道：">
            <el-select v-model="reqProblem.channel_id" placeholder="请选择" size="small">
                <el-option
                v-for="item in channelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="时间：" size="small">
            <el-date-picker
                v-model="dataValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>

        <el-form-item size="small">
            <el-button type="primary">筛选</el-button>
        </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      reqProblem: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [{ name: '测试1', id: 1 }],
      dataValue: []
    }
  }
}
</script>

<style lang="less">
    .el-card{
        margin-bottom: 20px;
    }
</style>
