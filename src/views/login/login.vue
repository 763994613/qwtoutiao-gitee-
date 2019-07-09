<template>
  <div class="login-content">
    <el-card class="box-card">
      <div class="logo">
        <img src="../../assets/images/logo_index.png" alt />
      </div>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="input" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="input" placeholder="请输入验证码" class="code"></el-input>
          <el-button class="send-code">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>和
          和
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="slog">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>
<style lang="less">
.login-content {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .box-card {
    width: 450px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .logo {
      text-align: center;
      img {
        width: 200px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
    .code {
      width: 280px;
    }
    .send-code {
      float: right;
    }
    .el-checkbox {
      vertical-align: middle;
    }
    .slog{
        width: 100%;
    }

  }
}
</style>
