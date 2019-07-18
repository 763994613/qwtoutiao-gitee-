<template>
    <div class="news_container">
        <el-card>
            <div slot="header">
                <my-bread>发布文章</my-bread>
            </div>
            <el-form :model="formNews" label-width="80px">
                <el-form-item v-model="formNews.title" label="标题：">
                    <el-input style="width:300px" v-model="formNews.title"></el-input>
                </el-form-item>
                <el-form-item label="内容：" class="quill_content">
                    <quill-editor v-model="formNews.content" :options="editorOption"></quill-editor>
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
                    <div v-if="formNews.cover.type===1">
                        <my-image v-model="formNews.cover.images[0]"></my-image>
                    </div>
                    <div v-if="formNews.cover.type===3">
                        <my-image v-model="formNews.cover.images[0]"></my-image>
                        <my-image v-model="formNews.cover.images[1]"></my-image>
                        <my-image v-model="formNews.cover.images[2]"></my-image>
                    </div>
                </el-form-item>
                <el-form-item label="频道：">
                        <my-channel v-model="formNews.channel_id"></my-channel>
                </el-form-item>
                <el-form-item v-if="!id">
                    <el-button type="primary" @click="publish(!draft)">发表</el-button>
                    <el-button @click="publish(draft)">存入草稿</el-button>
                </el-form-item>
                <el-form-item v-else>
                    <el-button type="primary" @click="publish(!draft)">修改</el-button>
                    <el-button @click="publish(draft)">存入草稿</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  created () {
    this.id = this.$route.query.id
    this.getNews(this.id)
  },
  watch: {
    $route () {
      this.id = this.$route.query.id
      this.formNews = {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  data () {
    return {
      id: null,
      formNews: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }]
          ]
        }
      },
      draft: true
    }
  },
  methods: {
    async publish (val) {
      await this.axios.post('/articles?draft=' + val, this.formNews)
      this.$message.success('操作成功')
      this.$router.push('/document')
    },
    async getNews (id) {
      const { data: { data } } = await this.axios.get('/articles/' + id)
      this.formNews = data
    }
  }
}
</script>

<style lang="less">
    .quill_content{
        height: 360px;
        .quill-editor{
            height: 300px;
        }
    }
</style>
