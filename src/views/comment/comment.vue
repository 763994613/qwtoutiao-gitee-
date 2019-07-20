<template>
    <div class="comment_container">
        <el-card>
            <div slot="header">
            <my-bread>评论管理</my-bread>
        </div>
            <el-table
            :data="commentData"
            style="width: 100%">
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="total_comment_count" label="总评论数">
                </el-table-column>
                <el-table-column prop="fans_comment_count" label="粉丝评论数">
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        {{scope.row.comment_status?'正常':'关闭'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template  slot-scope="scope">
                        <el-button type="success" size="mini" @click="change(scope.row)" v-if="scope.row.comment_status===false">打开评论</el-button>
                    <el-button type="danger" size="mini" @click="change(scope.row)" v-else>关闭评论</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
          background
          layout="prev, pager, next"
          :page-count="req.page"
          :page-size="req.per_page"
          :total="req.total_count"
          @current-change="changePage"
        ></el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      commentData: [{
        title: null,
        total_comment_count: null,
        fans_commsent_count: null,
        comment_status: null
      }],
      req: {
        total_count: null,
        page: null,
        per_page: null,
        response_type: 'comment'
      }
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    async getlist () {
      const { data: { data } } = await this.axios.get('/articles', { params: this.req })
      this.commentData = data.results
      this.req.total_count = data.total_count
      this.req.page = data.page
      this.req.per_page = data.per_page
    },
    changePage (val) {
      this.req.page = val
      this.getlist()
    },
    async change (val) {
      const { data: { data } } = await this.axios.put('comments/status?article_id=' + val.id, { allow_comment: !val.comment_status })
      this.$message.success('修改状态成功')
      val.comment_status = data.allow_comment
    }
  }
}
</script>
