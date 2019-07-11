<template>
  <el-container class="home">
    <el-aside :width="isCollapse?'64px':'200px'" class="aside" >
      <div class="log" :class="{little:isCollapse}"></div>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <router-link to="/">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <router-link to="/">
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        </router-link>
        <router-link to="/">
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        </router-link>
        <router-link to="/">
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        </router-link>
        <router-link to="/">
        <el-menu-item index="5">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        </router-link>
        <router-link to="/">
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        </router-link>
        <router-link to="/">
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="60px" class="head">
        <span class="el-icon-s-fold" @click="tag"></span>
        <span>江苏传智播客教育科技有限公司</span>
        <el-dropdown class="set">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt width="28" />
            <strong>黑马小哥</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span class="el-icon-setting"></span> 个人设置
            </el-dropdown-item>
            <el-dropdown-item>
              <span class="el-icon-unlock"></span> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    tag () {
      this.isCollapse = !this.isCollapse
    }
  },
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  position: absolute;
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
