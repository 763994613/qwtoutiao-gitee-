<template>
    <div class="fans_container">
        <el-card>
            <div slot="header">
                <my-bread>粉丝管理</my-bread>
            </div>
             <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="粉丝列表" name="first">
                    <div class="img_list">
                        <ul>
                            <li v-for="(list,index) in results" :key="index">
                                <img :src="list.photo" alt />
                                <p>{{list.name}}</p>
                            </li>
                        </ul>
                        <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-count="queryList.page"
                        :page-size="queryList.per_page"
                        :total="total_count"
                        @current-change="changePage"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="second">
                    <div ref="bar" style="width:800px;height:500px"></div>
                </el-tab-pane>
            </el-tabs>

        </el-card>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'first',
      results: [{
        id: null,
        name: null,
        photo: null
      }],
      queryList: {
        page: null,
        per_page: null
      },
      total_count: null
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { data: { data } } = await this.axios.get('/followers', { params: this.queryList })
      this.results = data.results
      this.queryList.page = data.page
      this.queryList.per_page = data.per_page
      this.total_count = data.total_count
    },
    changePage (val) {
      this.queryList.page = val
      this.getList()
    }
  },
  mounted () {
    const dom = this.$refs.bar
    const myEcharts = echarts.init(dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  }
}
</script>

<style lang="less">
    .img_list {
  overflow: hidden;
}
.img_list li {
  float: left;
  width: 90px;
  height: 90px;
  list-style: none;
  position: relative;
  border: 1px dashed #ddd;
  margin-right: 20px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  p{
      text-align: center;
      font-size: 10px;
  }
}
</style>
