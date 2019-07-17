<template>
  <div class="images-container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div v-loading="loading">
        <div class="img_btn">
          <el-radio-group size="small" @change="getlist" v-model="queryList.collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button type="success" size="small" style="float:right" @click="dialogVisible = true">添加素材</el-button>
        </div>
        <div class="img_list">
          <ul>
            <li v-for="list in results" :key="list.id">
              <img :src="list.url" alt />
              <div>
                <span class="el-icon-star-off" :class="{red:list.is_collected}" @click="change(list)"></span>
                <span class="el-icon-delete" @click="del(list.id)"></span>
              </div>
            </li>
          </ul>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="queryList.page"
          :page-size="queryList.per_page"
          :total="total_count"
          @current-change="changePage"
        ></el-pagination>
      </div>
      <el-dialog
        title="添加素材"
        :visible.sync="dialogVisible"
        width="300px"
        >
        <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
       </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      results: {},
      queryList: {
        page: null,
        per_page: null,
        collect: false
      },
      total_count: null,
      loading: false,
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('qwId')).token
      }
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    async getlist () {
      this.loading = true
      const {
        data: { data }
      } = await this.axios('/user/images', { params: this.queryList })
      console.log(data)
      this.results = data.results
      this.total_count = data.total_count
      this.queryList.page = data.page
      this.queryList.per_page = data.per_page
      this.loading = false
    },
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getlist()
        this.imageUrl = null
      }, 1500)
    },
    changePage (val) {
      this.queryList.page = val
      this.getlist()
    },
    async change (list) {
      await this.axios.put('/user/images/' + list.id, { collect: !list.is_collected })
      this.$message.success('操作成功')
      this.getlist()
    },
    async del (id) {
      await this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/user/images/' + id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getlist()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less">
.img_btn {
  overflow: hidden;
  margin-bottom: 20px;
}
.img_list {
  overflow: hidden;
}
.img_list li {
  float: left;
  width: 160px;
  height: 160px;
  list-style: none;
  position: relative;
  border: 1px dashed #ddd;
  margin-right: 20px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 26px;
    span {
      margin: 0 20px;
      line-height: 26px;
      font-size: 16px;
      color: white;
      font-weight: small;
    }
  }
  .red {
    color: red;
  }
}

.el-dialog{
    text-align: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
