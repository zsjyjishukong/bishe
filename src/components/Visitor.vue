<template>
  <div id="visitor-page">
    <div id="visitor-page-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px;">用户登录</span>
        </div>
        <div>
          <div id="visitor-login">
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
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login: function () {
      console.log(this.loginForm)
      let self = this
      this.$http.post()
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
