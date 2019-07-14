<template>
  <div class="login-content">
    <el-card class="box-card">
      <div class="logo">
        <img src="../../assets/images/logo_index.png" alt />
      </div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码" class="code" v-model="ruleForm.code"></el-input>
          <el-button class="send-code">发送验证码</el-button>
        </el-form-item>
        <el-form-item class="xy">
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>和
          和
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="slog" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.axios.post('authorizations', this.ruleForm)
            window.sessionStorage.setItem('qwId', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message({
              message: '登陆失败',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '登陆失败',
            type: 'warning'
          })
        }
      })
    }
  },
  data () {
    const checkMobile = (rule, val, callback) => {
      if (!/^[1][3-9]\d{9}$/.test(val)) {
        return callback(new Error('手机号码格式错误'))
      } else {
        callback()
      }
    }
    return {
      checked: true,
      ruleForm: {
        mobile: '18611298526',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '验证码长度有误', trigger: 'blur' }
        ]
      }
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
    .slog {
      width: 100%;
    }
  }
}
</style>
