<template>
  <div id="visitor-page" @keydown.13="login" v-loading="loading">
    <div id="visitor-page-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px;">用户登录</span>
        </div>
        <div>
          <div id="visitor-login" >
            <el-form v-model="loginForm" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label=" 密  码 ">
                <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form>
          </div>
        </div>
      </el-card>
      <div id="text">您尚未登录，请登录后操作</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Visitor',
  props: {
    'url': {
      type: String
    }
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    login: function () {
      let self = this
      if (self.loginForm.username.trim() === '' || self.loginForm.password.trim() === '') {
        self.$message.error('用户名或密码不能为空')
        return
      }
      this.loading = true
      this.$http.post(self.url + 'login', self.$qs.stringify(self.loginForm))
        .then(function (res) {
          if (res.data.status === 0) {
            // 0 超管 1 普通管理 2 用户
            sessionStorage.setItem('user', self.loginForm.username)
            if (self.loginForm.username.length > 20) {
              sessionStorage.setItem('layer', '2')
            } else {
              sessionStorage.setItem('layer', res.data.msg)
            }
            self.$message.success('登录成功')
            setTimeout(function () {
              window.location.reload()
            }, 1500)
          } else if (res.data.status === 1) {
            self.$message.error('用户名或密码错误')
          }
        })
        .catch(function (err) {
          self.$message.error('网络错误，请检查！')
          console.log(err)
          self.loading = false
        })
    }
  }
}
</script>

<style scoped>
  #visitor-page{
    height: 100%;
    text-align: center;
    border: 1px solid #aeaeae;
  }
  #visitor-page-body{
    margin-top: 10%;
  }
  #text{
    margin-top: 40px;
    color: #898989;
    font-size: 20px;
  }
  #visitor-login{
    margin: auto;
    width: 60%;
  }
  .el-card{
    margin: 20px auto;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-input{
    width: 150px;
  }
  .box-card {
    width: 480px;
  }

</style>
