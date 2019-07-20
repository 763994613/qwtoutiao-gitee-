<template>
    <div class="setting_container">
        <el-card>
            <div slot="header">
                <my-bread>个人设置</my-bread>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form :model="datalist" label-width="80px">
                        <el-form-item label="Id：">
                            <el-input v-model="datalist.id" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="媒体名：">
                            <el-input v-model="datalist.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-input v-model="datalist.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <el-input v-model="datalist.email"></el-input>
                        </el-form-item>
                        <el-form-item label="头条号简介：">
                            <el-input type="textarea" :rows="4" v-model="datalist.intro"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="changeData">保存设置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12" class="setting_container_right">
                    <div class="change_title">修改头像</div>
                    <el-upload
                    class="avatar-uploader"
                    action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
                    :show-file-list="false"
                    :http-request="upPhoto">
                    <img v-if="datalist.photo" :src="datalist.photo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import eventBus from '@/views/eventBus/eventBus.js'
export default {
  data () {
    return {
      datalist: {
        id: null,
        name: null,
        mobile: null,
        email: null,
        intro: null,
        photo: null
      }
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    async getlist () {
      const { data: { data } } = await this.axios.get('user/profile')
      this.datalist = data
    },
    async changeData () {
      await this.axios.patch('/user/profile', this.formData)
      this.$message.success('修改成功')
      eventBus.$emit('updateMessage', this.datalist.name)
      const user = JSON.parse(window.sessionStorage.getItem('qwId'))
      user.name = this.datalist.name
      window.sessionStorage.setItem('qwId', JSON.stringify(user))
    },
    async upPhoto (val) {
      const formData = new FormData()
      formData.append('photo', val.file)
      const { data: { data } } = await this.axios.patch('/user/photo', formData)
      this.datalist.photo = data.photo
      eventBus.$emit('updatePhoto', this.datalist.photo)
      const user = JSON.parse(window.sessionStorage.getItem('qwId'))
      user.photo = this.datalist.photo
      window.sessionStorage.setItem('qwId', JSON.stringify(user))
    }
  }
}
</script>

<style lang="less">
    .setting_container_right{
        text-align: center;
        .change_title{
            font-size: 20px;
            margin-bottom: 20px;
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
