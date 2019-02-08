<template>
  <div id="page">
    <div id="swap">
      <div id="top">
        <img src="@/assets/topBg.jpg" width="960px">
      </div>
      <div id="html-body">
        <div class="html-body-nav">
          <div class="html-body-nav-title">
            栏目导航
          </div>
          <div class="item">参考咨询</div>
          <div class="item" style="color: #f30;">实时咨询</div>
          <div class="item">RSS订阅</div>
          <div class="item">代检代查</div>
          <div class="item">定题服务</div>
          <div class="item">信息推送</div>
          <div class="item">服务指南</div>
        </div>
        <div class="html-body-body">
          <Student v-if="studentShow"></Student>
          <Admin v-if="adminShow"></Admin>
          <Visitor v-if="visitorShow"></Visitor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Student from '../../components/Student'
import Admin from '../../components/Admin'
import Visitor from '../../components/Visitor'
export default {
  name: 'Chat',
  components: {
    Student,
    Admin,
    Visitor
  },
  data () {
    return {
      cookie: {},
      studentShow: false,
      adminShow: false,
      visitorShow: true
    }
  },
  methods: {
    cookieToObj: function (cookie) {
      let cookieArr = cookie.split(';')
      for (let aCookie of cookieArr) {
        let aCookieArr = aCookie.split('=')
        this.cookie[aCookieArr[0].trim()] = aCookieArr[1]
      }
    }
  },
  mounted: function () {
    let cookie = document.cookie
    this.cookieToObj(cookie)
    if (this.cookie.user !== undefined) {
      this.studentShow = true
    }
  }
}
</script>

<style scoped>
#page{
  background: url("../../assets/bg.jpg") repeat-x;
  height: 100vh;
}
  #swap{
    width: 960px;
    height: 100vh;
    background: white;
    margin: 0 auto;
    padding: 0 10px;
  }
  #top->img{
    width: 960px;
    height: 100%;
  }
  #html-body{
    margin: 10px 0 0 0;
  }
  .html-body-nav{
    float: left;
    width: 23%;
    border: 1px solid #cbcbcb;
  }
  .html-body-nav .item{
    border-bottom: 1px solid #cbcbcb;
    padding: 17px 15px;
    color: #ABB1B7;
  }
  .html-body-nav-title{
    padding: 2px 10px;
    border-bottom: 3px solid #297bce;
    font-weight: bold;
    font:18px 宋体, Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #0f4c90;
    background:url("../../assets/titBg.gif") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    background-attachment: fixed;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    display: block;
  }
  .html-body-body{
    float: left;
    width: 73%;
    margin-left: 20px;
    height: 70vh;
  }
</style>
