<template>
  <el-container class="home">
    <el-aside :width="isCollapse?'64px':'200px'" class="aside" >
      <div class="log" :class="{little:isCollapse}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
      >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        <el-menu-item index="/document">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/images">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/news">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="60px" class="head">
        <span class="el-icon-s-fold" @click="tag"></span>
        <span>江苏传智播客教育科技有限公司</span>
        <el-dropdown class="set">
          <span class="el-dropdown-link">
            <img :src="pic" alt width="28" />
            <strong>{{name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native='setting'>
              <span class="el-icon-setting"></span> 个人设置
            </el-dropdown-item>
            <el-dropdown-item @click.native='quit'>
              <span class="el-icon-unlock"></span> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created () {
    const user = JSON.parse(window.sessionStorage.getItem('qwId'))
    this.name = user.name
    this.pic = user.photo
  },
  methods: {
    tag () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    quit () {
      window.sessionStorage.removeItem('qwId')
      this.$router.push('/login')
    }
  },
  data () {
    return {
      isCollapse: false,
      name: '',
      pic: ''
    }
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  left: 0;
  .head {
    border-bottom: 1px solid #ddd;
    span {
      padding-right: 10px;
      font-size: 16px;
      line-height: 60px;
      vertical-align: middle;
    }
    .el-icon-s-fold {
      font-size: 24px;
    }
    .set {
      float: right;
      .el-dropdown-link {
        line-height: 60px;
        font-size: 14px;
        img {
          vertical-align: middle;
          padding-right: 6px;
        }
      }
    }
  }
  .aside {
    background-color: #002033;
    border: none;
    .log {
      height: 60px;
      background: #002840 url(../../assets/images/logo_admin.png) no-repeat
        center;
      background-size: 140px;
    }
    .el-menu-vertical-demo {
      border: none;
    }
    a{
      text-decoration: none;
    }
    .little{
      background: url(../../assets/images/logo_admin_01.png) no-repeat center / 22px
    }
  }
}
</style>
