<template>
  <el-select placeholder="请选择" size="small">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MyChannel',
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannel()
  },
  methods: {
    async getChannel () {
      const { data: { data } } = await this.axios.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang="less">
</style>
