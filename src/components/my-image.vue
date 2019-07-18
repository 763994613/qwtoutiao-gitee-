<template>
  <div class="btn_img">
    <img :src="value||defaultSrc" alt="" @click="centerDialogVisible = true">
    <el-dialog :visible.sync="centerDialogVisible" width="600px" center>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <div>
            <div class="img_btn">
              <el-radio-group size="small" @change="getlist" v-model="queryList.collect">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
            </div>
            <div class="img_list">
              <ul>
                <li v-for="list in results" :key="list.id" :class="{selected:list.url === url}" @click="selected(list.url)">
                  <img :src="list.url" alt />
                </li>
              </ul>
          </div>
      </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imgUrl" :src="imgUrl" id="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="decide">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultSrc from '../assets/images/default.png'
export default {
  props: ['value'],
  name: 'MyImage',
  data () {
    return {
      defaultSrc,
      results: {},
      centerDialogVisible: false,
      activeName: 'first',
      queryList: {
        page: null,
        per_page: null,
        collect: false
      },
      total_count: null,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('qwId')).token
      },
      url: null,
      imgUrl: null,
      decideUrl: null
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
      this.results = data.results
      this.total_count = data.total_count
      this.queryList.page = data.page
      this.queryList.per_page = data.per_page
      this.loading = false
    },
    selected (url) {
      this.url = url
    },
    handleAvatarSuccess (res) {
      this.imgUrl = res.data.url
      this.$message.success('上传成功')
    },
    decide () {
      if (this.activeName === 'first') {
        this.decideUrl = this.url
        this.centerDialogVisible = false
        this.url = null
      } else {
        this.decideUrl = this.imgUrl
        this.centerDialogVisible = false
        this.imgUrl = null
      }
      this.$emit('input', this.decideUrl)
    }
  }
}
</script>

<style scoped lang="less">
  .btn_img{
    display: inline-block;
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    margin-right: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
.img_btn {
  overflow: hidden;
  margin-bottom: 20px;
}
.img_list {
  overflow: hidden;
}
.img_list li {
  float: left;
  width: 100px;
  height: 100px;
  list-style: none;
  position: relative;
  border: 1px dashed #ddd;
  margin-right: 8px;
  margin-bottom: 8px;
  img {
    width: 100%;
    height: 100%;
  }
}
.selected{
  &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.1) url(../assets/images/selected.png) no-repeat center / 50px ;
  }
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
  #avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
