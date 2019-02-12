<template>
  <div id="page">
    <div id="swap">
      <div class="topBox">
        <div class="login fr" id="login11" :style="login11">
          <label>用户名：</label> <input type="text" class="txt" v-model="username" id="username">
          <label>密码：</label><input type="password" class="txt" v-model="password" id="password">
          <input type="button" value="登录" class="btn" @click="userlogin">
        </div>
        <div class="login fr" id="login22" :style="login22">
          <p>
            <font style="color:#F7F7F7;" id="login1"></font>
            <a style="color:#F7F7F7;" target="_blank" href="http://211.68.161.66/MylibIndex.aspx">我的 OPAC</a>
            <a href="javascript:void(0)" @click="tuichu()"><font style="color:#F7F7F7;">退出</font></a></p>
        </div>
        <iframe src="" id="loginIframeUrl" style="display:none;"></iframe>
        <div class="nav">
          <ul class="clearfix">
            <li><a href="http://211.68.161.77/dzb/default.asp" target="_blank">党建工作</a></li>
            <li><a href="http://wwt.hebiace.edu.cn/col8/col23/col2842/index.htm1?Modalid=6045" target="_blank">信息管理系</a></li>
            <li><a href="http://211.68.161.77/zyzxh/index.asp" target="_blank">志愿者协会</a></li>
            <li><a href="http://lib.hebiace.edu.cn/webs/list/notice/87.html" target="_blank">本馆概况</a></li>
            <li><a href="http://yc.hebiace.edu.cn/" target="_blank">远程访问</a></li>
            <li><a href="http://211.68.161.77" target="_blank">原版网站</a></li>
          </ul>
        </div>
      </div>
      <div id="html-body">
        <!--<div class="html-body-nav">-->
          <div class="menu model fl rcBox">
            <div class="tit">栏目导航</div>
            <!-- 二级导航 -->
            <div class="navMenubox">
              <div id="slimtest1">
                <ul class="navMenu">
                  <li class="on">
                  </li><li><a title="参考咨询" target="_blank" href="webs/service.jsp" class="afinve"><b class="icons"></b><span class="">参考咨询</span></a></li>
                  <li class="on">
                  </li><li><a title="实时咨询" href="javascript:void(0)" class="afinve on"><b class="icons"></b><span class="">实时咨询</span></a></li>
                  <li class="on">
                  </li><li><a title="RSS订阅" href="webs/list/notice/60.html" class="afinve"><b class="icons"></b><span class="">RSS订阅</span></a></li>
                  <li class="on">
                  </li><li><a title="代检代查" href="webs/list/notice/61.html" class="afinve"><b class="icons"></b><span class="">代检代查</span></a></li>
                  <li class="on">
                  </li><li><a title="定题服务" href="webs/list/notice/62.html" class="afinve"><b class="icons"></b><span class="">定题服务</span></a></li>
                  <li class="on">
                  </li><li><a title="信息推送" href="webs/list/notice/63.html" class="afinve"><b class="icons"></b><span class="">信息推送</span></a></li>
                  <li class="on">
                  </li><li><a title="服务指南" target="_blank" href="webs/list/notice/77.html" class="afinve"><b class="icons"></b><span class="">服务指南</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        <!--</div>-->
        <div class="html-body-body subLib fr rcBox" style="margin-top: 10px;">
          <Student v-if="studentShow" v-bind:url="host" v-bind:user="cookie.user"></Student>
          <Admin v-if="adminShow" :layer="layer" :url="host"></Admin>
          <Visitor v-if="visitorShow"></Visitor>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="link">
      <ul class="clearfix">
        <ul class="clearfix">
          <li><a href="http://www.lib.tju.edu.cn"><img src="http://lib.hebiace.edu.cn/uploadfile/20140320/153141.jpg" width="124px" height="40px"></a></li>
          <li><a href="http://xwzx2016.sdjzu.edu.cn/tsg/"><img src="http://lib.hebiace.edu.cn/uploadfile/20140320/153335.jpg" width="124px" height="40px"></a></li>
          <li><a href="http://www.lib.tongji.edu.cn/"><img src="http://lib.hebiace.edu.cn/uploadfile/20140320/153509.jpg" width="124px" height="40px"></a></li>
          <li><a href="http://202.202.12.15/newversion/index.htm"><img src="http://lib.hebiace.edu.cn/uploadfile/20140320/153615.jpg" width="124px" height="40px"></a></li>
          <li><a href="http://lib.tcu.edu.cn/"><img src="http://lib.hebiace.edu.cn/uploadfile/20140320/tianjinchengda.jpg" width="124px" height="40px"></a></li>
          <li><a href="http://lib.bucea.edu.cn/"><img src="http://lib.hebiace.edu.cn/uploadfile/20140320/beijingjianzhu.jpg" width="124px" height="40px"></a></li>
          <li style="margin-right:0;"><a href="http://www.lib.tongji.edu.cn/oldweb/JZQBW/index.html"><img src="http://lib.hebiace.edu.cn/uploadfile/20140320/jianzhuqingbao.jpg" width="124px" height="40px"></a></li>
        </ul>
        <div class="foot" align="center">@2013 河北建筑工程学院图书馆  email：hebiace_xxb@163.com  电话：0313-4187858
          <br>您是第 <em><span id="total">{{peopleNumber}}</span></em> 位访问者</div>
      </ul>
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
      host: 'http://192.168.0.102:7777/',
      cookie: {},
      studentShow: false,
      adminShow: false,
      visitorShow: true,
      username: '',
      password: '',
      login11: {},
      login22: {display: 'none'},
      peopleNumber: 20000,
      layer: 0,
      user: ''
    }
  },
  methods: {
    cookieToObj: function (cookie) {
      let cookieArr = cookie.split(';')
      for (let aCookie of cookieArr) {
        let aCookieArr = aCookie.split('=')
        this.cookie[aCookieArr[0].trim()] = aCookieArr[1]
        if (aCookieArr[0] === 'user') {
          this.user = aCookieArr[1]
        }
      }
    },
    userlogin: function () {
      this.$http.post()
    }
  },
  mounted: function () {
    let cookie = document.cookie
    let self = this
    this.cookieToObj(cookie)
    document.cookie = 'user=20153320131'
    if (this.cookie.user !== undefined) {
      this.$http.get(this.host + 'login?username=' + this.cookie.user)
        .then(function (response) {
          let layer = response.data.customer_type
          if (layer === 0) { // 0普通用户
            self.studentShow = true
            self.visitorShow = false
          } else if (layer === 1 || layer === 2) { // 1超级管理 2普通管理
            self.visitorShow = false
            self.adminShow = true
            self.layer = layer
          }
        })
        // eslint-disable-next-line
        .catch(function (err) {
          self.$message.error('出错了')
        })
    } else {
      this.visitorShow = true
    }
  }
}
</script>

<style scoped>
#page{
  background: url("../../assets/bg.jpg") repeat-x;
  height: 100vh;
  font:12px/1.5 宋体, Arial, Helvetica, sans-serif; color:#000;
}
  #swap{
    width: 960px;
    background: #fff;
    margin: 0 auto;
    padding: 0 10px;
  }
  #top->img{
    width: 960px;
    height: 100%;
  }
  #html-body{
    margin: 10px 0 0 0;
    background: #fff;
    overflow: hidden;
  }
  .html-body-nav .item{
    border-bottom: 1px solid #cbcbcb;
    padding: 17px 15px;
    color: #ABB1B7;
  }
  .html-body-body{
    float: left;
    width: 706px;
    height: 808px;
  }
table{border-spacing:0px; border-collapse:collapse;width:100%; border:0px;}
ul,ol{list-style-type:none;}
input,select,textarea{vertical-align:middle; font:12px/1.5 宋体, Arial, Helvetica, sans-serif; color:#000;}
a{color:#5b5b5b; text-decoration:none;}
a:hover{color:#a80000;}
em{font-style:normal; color:#000;}
img{border:0px;}
.nav li{float:left;margin-left:5px;display:inline;}
.nav li a{display:block;width:90px;height:50px;line-height:50px;text-align:center;font-size:14px;font-weight:bold;color:#f7f7f7;}
.login{margin-top:10px;height:32px;line-height:32px;border-left:1px solid #fff;padding-left:10px;}
.login label{color:#e8f5ff;}
.login .txt{width:98px;height:17px;border:1px solid #084980;}
.topBox{height:125px;background:url(../../assets/topBg.jpg) no-repeat;position:relative;}
.topBox .login{position:absolute;top:0;right:10px;}
.topBox .nav{position:absolute;bottom:0;left:510px;}
.topBox .nav li a{height:32px;line-height:32px;}
.model{border:1px solid #cbcbcb;margin-top:10px;}
.model .tit{height:33px;line-height:33px;background:url(../../assets/titBg.gif) repeat-x;padding:0 10px;overflow:hidden;}
.menu{width:238px;background:url(../../assets/menu.jpg) no-repeat left bottom;padding-bottom:280px;}
.menu .tit{border-bottom:3px solid #297bce;font-size:14px;font-weight:bold;color:#0f4c90;}
.menu li b{ width:13px;height:13px;background-position:-97px top;margin:12px 10px 0 0;}
.menu li.cur b{background-position:-114px top;}
.menu li.cur a{font-weight:bold;color:#f96900;}
/* 内页左侧导航 */
/* navMenu */
.navMenubox { width: 100%; height: 500px; margin: 0 auto; overflow: hidden; }
.navMenu{padding-inline-start: 0; margin-block-start: 0;}
.navMenu> li { line-height: 38px; border-bottom: 1px solid #e5e5e5; padding-left: 10px;  }
.navMenu>li>a { display: block; overflow: hidden; padding-left: 0px; line-height: 40px; color: #ABB1B7; transition: all .3s; position: relative; text-decoration: none; }
.navMenu>li>a.on span{ font-weight: bold; color: #F30;}
.navMenu > li:nth-of-type(1)> a { border-top: 1px solid transparent; }
.navMenu > li:last-child > a { border-bottom: 1px solid transparent; }
.navMenu>li>a>b {  width:13px;height:13px;background-position:-97px top;margin:12px 10px 0 0; }
.navMenu>li>a.active, .navMenu>li>a:hover { background: #fafafa; }
.navMenu>li>ul.sub-menu li { background: none; margin: 0px; padding: 0px; }
.navMenu>li>ul.sub-menu li>a { display: block; padding-left: 20px; color: #ABB1B7; clear: both; }
.navMenu>li>ul.sub-menu li>a.active, .navMenu>li>ul.sub-menu li>a:hover, .navMenu>li>ul.sub-menu>li.active >a { color: #F30; }
.sub-menu li:last-child{ border-bottom: none;}
.fr{float:right;}
.fl{float:left;}
.rcBox{position:relative; zoom:1;}
.icons{float:left; font-size:0px; line-height:0px; overflow:hidden; display:inline; background:url(../../assets/icons.gif) no-repeat;}
.link{padding:10px 0;background:#efefef;width: 960px;margin:10px auto 0 auto;}
.link li{float:left;margin-right:10px;}
.clearfix{overflow:hidden; zoom:1;padding-left: 10px;}
.clear{clear:both; height:0px; font-size:0px; line-height:0px; overflow:hidden;}
.foot{padding:20px 0;color:#808080;line-height:20px;}
.foot em{color:#d24b39;}
</style>
