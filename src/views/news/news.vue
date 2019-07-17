<template>
    <div class="news_container">
        <el-card>
            <div slot="header">
                <my-bread>发布文章</my-bread>
            </div>
            <el-form :model="formNews" label-width="80px">
                <el-form-item v-model="formNews.title" label="标题：">
                    <el-input style="width:300px"></el-input>
                </el-form-item>
                <el-form-item v-model="formNews.content" label="内容：">
                    富文本
                </el-form-item>
                <el-form-item label="封面：">
                    <el-radio-group v-model="formNews.cover.type">
                        <el-radio :label="1">单图</el-radio>
                        <el-radio :label="3">三图</el-radio>
                        <el-radio :label="0">无图</el-radio>
                        <el-radio :label="-1">自动</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <div class="btn_img">
                        <img src="../../assets/images/default.png" alt="">
                    </div>
                </el-form-item>
                <el-form-item label="频道：">
                        <my-channel v-model="formNews.content"></my-channel>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">发表</el-button>
                    <el-button>存入草稿</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      formNews: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: null
        },
        channel_id: null
      }
    }
  }
}
</script>

<style lang="less">
    .btn_img{
        width: 150px;
        border: 1px dashed #ddd;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
