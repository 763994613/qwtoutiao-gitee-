<template>
<div>
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
          <my-channel v-model="reqProblem.channel_id"></my-channel>
        </el-form-item>

        <el-form-item label="时间：" size="small">
            <el-date-picker
                value-format = "yyyy-MM-dd"
                @change="changeDate"
                v-model="dataValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>

        <el-form-item size="small">
            <el-button type="primary" @click="serach()">筛选</el-button>
        </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div slot="header" class="clearfix">
    <p>根据筛选条件共查询到 <strong>{{total_count}}</strong> 条结果： </p>
  </div>
    <el-table
      :data="results"
      style="width: 100%">
      <el-table-column label="封面">
        <template slot-scope="scop">
          <el-image :src="scop.row.cover.images[0]" style="width:70px ; height=80px" >
            <div slot="error" class="image-slot">
              <img src="../../assets/images/error.gif" alt="" width="70" height="80">
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1">待审核</el-tag>
          <el-tag type="success" v-if="scope.row.status==2">审核通过</el-tag>
          <el-tag type="info" v-if="scope.row.status==0">草稿</el-tag>
          <el-tag type="warning" v-if="scope.row.status==3">审核失败</el-tag>
          <el-tag type="danger" v-if="scope.row.status==4">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle plain size="small" @click="edit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="small" @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :current-page="reqProblem.page"
      :page-size="reqProblem.per_page"
      :total="total_count">
    </el-pagination>
  </el-card>
</div>
</template>

<script>
export default {
  created () {
    this.getList()
  },
  data () {
    return {
      reqProblem: {
        page: null,
        per_page: null,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      dataValue: [],
      total_count: null,
      results: []
    }
  },
  methods: {
    async getList () {
      const { data: { data } } = await this.axios.get('articles', { params: this.reqProblem })
      this.total_count = data.total_count
      this.results = data.results
      this.reqProblem.page = data.page
      this.reqProblem.per_page = data.per_page
    },
    changeDate () {
      this.reqProblem.begin_pubdate = this.dataValue[0]
      this.reqProblem.end_pubdate = this.dataValue[1]
    },
    serach () {
      this.reqProblem.page = 1
      this.getList()
    },
    changePage (val) {
      this.reqProblem.page = val
      this.getList()
    },
    edit (id) {
      this.$router.push(`/news/${id}`)
    },
    async del (id) {
      await this.axios.delete(`/articles/${id}`)
    }
  }
}
</script>

<style lang="less">
    .el-card{
        margin: 20px;
    }
    .el-pagination{
      text-align: center;
    }
</style>
