<template>
  <el-select size="small" :value="value" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MyChannel',
  props: ['value'],
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
    },
    fn (value) { this.$emit('input', value) }
  }
}
</script>

<style scoped lang="less">
</style>
