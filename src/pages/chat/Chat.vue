<template>
  <div id="page">
    <div class="top">
      <a href="/" class="logo"></a>
      <div class="znSeaarch">
        <form action="http://lib.hebiace.edu.cn/search.jspx" method="POST" target="_blank">
          <input type="text" name="q" class="znSeaarch_input">
          <input name="input2" value="搜索" type="submit" class="znSeaarch_btn">
        </form>
      </div>
    </div>
    <div class="menuIndex">
      <ul>
        <li class="on"><a href="/">首页</a></li>
        <li><a href="http://lib.hebiace.edu.cn/node/453.jspx">党建工作</a></li>
        <li><a href="http://wwt.hebiace.edu.cn/col8/col23/col2842/index.htm1?Modalid=6045" target="_blank">信息管理系</a></li>
        <li><a href="http://211.68.161.78:8080/node/540.jspx" target="_blank">志愿者协会</a></li>
        <li><a href="http://lib.hebiace.edu.cn/node/456.jspx">馆员之窗</a></li>
        <li><a href="http://211.68.161.66/NTRdrLogin.aspx" target="_blank">我的Lib</a></li>
        <li><a href="http://yc.hebiace.edu.cn:2048/login" target="_blank">远程访问</a></li>
      </ul>
    </div>
    <div class="banner"></div>
    <div class="wrap">
      <div class="content_page">
        <!--------page_left---------->
        <div class="menu">
          <a href="/"><p class="menu_tit">咨询台</p></a>
          <ul>
            <li><a href="http://211.68.161.78:8080/node/505.jspx" class="">常见问题</a></li>
            <li><a href="http://lib.hebiace.edu.cn/node/488.jspx" class="on">实时咨询</a></li>
            <li><a href="http://lib.hebiace.edu.cn/node/488.jspx" class="">微信平台</a></li>
            <li><a href="http://lib.hebiace.edu.cn/webs/service.jsp" class="">参考咨询</a></li>
            <li><a href="http://lib.hebiace.edu.cn/node/490.jspx" class="">定题服务</a></li>
            <li><a href="http://lib.hebiace.edu.cn/node/491.jspx" class="">信息推送</a></li>
            <li><a href="http://lib.hebiace.edu.cn/node/492.jspx" class="">馆长信箱</a></li>
          </ul>
        </div>
        <!--------page_left finished---------->
        <!--------page_right---------->
        <div class="page_right">
          <div class="location">
            <p class="tit">
              <a href="/">首页</a>
              <span>-</span><a href="http://lib.hebiace.edu.cn/node/487.jspx">咨询台</a>
              <span>-</span><a href="http://lib.hebiace.edu.cn/node/488.jspx">微信平台</a>
            </p>
            <div class="clear"></div>
          </div>
          <div class="art">
            <Student v-if="studentShow" v-bind:url="host" v-bind:user="user"></Student>
            <Admin v-if="adminShow" :url="host"></Admin>
            <Visitor v-if="visitorShow" v-bind:url="host"></Visitor>
          </div>
          <div class="clear"></div>
        </div>
        <!--------page_right finished---------->
        <div class="clear"></div>
      </div>
      <div class="footer">
        <p>河北建筑工程学院图书馆  email：hebiace_xxb@163.com  电话：0313-4187858 <br>
          总访问量：<font>2874948</font>
          &nbsp;&nbsp;今日访问量：<span class="span3">250</span></p>
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
      host: 'http://192.168.144.1:7777/',
      studentShow: false,
      adminShow: false,
      visitorShow: false,
      user: ''
    }
  },
  methods: {
    showAdmin: function () {
      this.adminShow = true
      this.studentShow = false
      this.visitorShow = false
    },
    showStudent: function () {
      this.adminShow = false
      this.studentShow = true
      this.visitorShow = false
    },
    showVisitor: function () {
      this.adminShow = false
      this.studentShow = false
      this.visitorShow = true
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('user')) {
      // 0 超管 1 普通管理 2 用户
      this.user = sessionStorage.getItem('user')
      // eslint-disable-next-line
      if (sessionStorage.getItem('layer') == 0 || sessionStorage.getItem('layer') == 1) {
        this.showAdmin()
      } else {
        this.showStudent()
      }
    } else {
      this.showVisitor()
    }
  }
}
</script>

<style scoped>
#page{
  /*height: 100vh;*/
  padding-bottom: 10px;
  font:12px/1.5 宋体, Arial, Helvetica, sans-serif; color:#000;
  background:url(../../assets/body_bg.png) repeat-x #e6e6e6;
}
ol,ul { list-style:none; margin:0;padding:0;}
a { color:#444; text-decoration:none; }
a:hover{ color:#dd1a00; }
img { border:0;  vertical-align:middle;}
table { border-collapse:collapse; border-spacing:0; }
.clear { clear:both; font-size:0; height:0; line-height:0; overflow:hidden;}
p{margin:0; padding:0;}

.wrap{ width:972px; padding:0 14px; margin:0 auto; background:url(../../assets/bottom.jpg) left bottom no-repeat #fff;}
h2{ font-size:12px; font: bold 12px "Microsoft YaHei",微软雅黑;}
.title2 span{ /*padding-left:10px;*/ width:190px; display:block; float:left;  font-family:"Microsoft YaHei"; font-size:14px; line-height:32px; text-align:center; font-weight:bold; color:#fff;}
/*top*/
.top{ width:1000px; margin:0 auto; height:110px; background:url(../../assets/logor.jpg) right bottom no-repeat;}
.logo{ float:left; display:block; width:500px; height:110px;  background:url(../../assets/logo_hbjz.png) left center no-repeat;}

.znSeaarch{ float:right; width:307px; height:30px; margin-top:55px;}
.znSeaarch_input{ display:block; float:left; width:215px; height:30px; line-height:30px; background:url(../../assets/znSearchInput.jpg); border:none; margin:0px; padding:0px; padding-left:37px;}
.znSeaarch_btn{ display:block; float:right; width:51px; height:30px; color:#fff; font-weight:bold; border:none; background:url(../../assets/znSearchBtn.jpg); border:none; cursor:pointer;}
/*menuIndex*/
.menuIndex{ width:1006px; height:41px; margin:0 auto; background:url(../../assets/navbg.jpg) left top no-repeat;}
.menuIndex ul{ width:990px; margin:0 auto;}
.menuIndex ul li{ height:33px; font:14px/41px "Microsoft YaHei",微软雅黑; float:left; width:110px; text-align:center;}
.menuIndex ul li a{ display:block; width:80px;height:35px; line-height:35px; color:#fff; margin:0 auto;}
.menuIndex ul a:hover { /*background:url(../images/menu_hover.png) no-repeat bottom center;*/ height:33px; border-bottom:3px solid #79b5f3; color:#fff;}

/*****newsList*****/
.content_page{ width:100%;  margin:0 auto; padding-top:12px;}

.menu{float:left; width:185px;min-height:640px; border:1px #eee solid;}
.menu_tit{ text-align:center; line-height:45px; height:45px; color:#fff; background:#297bcd; border-bottom:1px dotted #c7c7c7; font-size:22px; font-family:'Microsoft Yahei',Tahoma, Helvetica, Arial, sans-serif; letter-spacing:3px; border-radius:5px 5px 0px 0px;-webkit-border-radius:5px 5px 0px 0px;-moz-border-radius:5px 5px 0px 0px; -o-border-radius:5px 5px 0px 0px;}
.menu ul li{ border-bottom:1px dashed #c5c5c5}
.menu ul li a{ display:block; line-height:40px;  /*border-left:2px solid #4d4d4d;*/ text-align:center; font-size:14px; font-family:'Microsoft Yahei',Tahoma, Helvetica, Arial, sans-serif; letter-spacing:3px; font-weight:300; color:#333; }
.menu ul li a:hover, .menu ul li a.on{  color:#d11933; /*border-left-color:#d11933;*/}

.page_right{ float:right; width:770px; border:1px solid #eee; overflow:hidden;}
.location{ height:16px; margin:0px 0px 5px 0px; line-height:16px;}
.location_ny{ margin-left:10px;}
.location .tit{ display:block; width:755px; background:#fdfdfd; padding-right:10px; line-height:30px; float:left; margin:10px 15px; border-bottom:1px dotted #085483;}
.location .tit span{ padding:5px;}

.art{ padding:15px;margin-top: 20px;}

.banner{ width:1002px; height:201px; background:url(../../assets/banner.png) left top no-repeat; margin:0 auto; margin-top:10px;}
/* 2018 12 24*/
.zxt{ width:360px; margin-top:30px;}
.zxt ul{padding-top:20px;}
.zxt ul li{
  width:151px; height:57px;
  float:left;
  margin-left:20px;
  margin-bottom:12px;
}

.book_tit span{ float:left; width:84px; text-align:center; color:#fff; font-family:"Microsoft Yahei"; font-size:14px; line-height:20px;}

.tit_hstj{
  width:50px; height:130px;
  float:left;
}
.tit_hstj p{
  width:16px;
  font-size:16px;
  color:#fff;
  line-height:24px;
  margin-left:17px;
  margin-top: 15px;
}
/*footer*/
.footer{ height:46px; line-height:20px; padding-top:10px;  text-align:center; margin-bottom:10px; overflow:hidden;}

.bottom{ width:1000px; margin:0 auto; height:10px; overflow:hidden; background:url(../../assets/bottom.jpg) no-repeat top center;}
.ladyScroll .scrollWrap{width:850px; margin-left:25px; overflow:hidden;position:absolute;}
.ladyScroll  dl{float:left;width:90px; height:140px; text-align:center;position:relative; margin-right:21px; overflow:hidden;}
.ladyScroll  span{display:block;width:88px;height:20px;position:absolute;left:0px;top:108px;filter:alpha(opacity=80);opacity:0.80; overflow:hidden; text-overflow:ellipsis; -o-text-overflow:ellipsis; white-space:nowrap;}
.ladyScroll  dt{margin:0 auto;width:298px; height:110px; overflow:hidden;}
.ladyScroll  img{display:block;width:88px;height:108px; border:1px solid #d7d7d7;}
.ladyScroll  dd{width:88px; height:20px; line-height:20px;font-size:12px;color:#fff;text-align:center;position:absolute;left:0px;top:120px; overflow:hidden; text-overflow:ellipsis; -o-text-overflow:ellipsis; white-space:nowrap;}
.ladyScroll  dd a{   }
.ladyScroll  dd a:hover{  }
.ladyScroll dl:hover span{  }

.book_more{ float:right; margin-top: -5px; /*display:block; width:29px; height:5px; margin-top:8px; background:url(../images/news_more.jpg) no-repeat;*/}
.book_more2{ margin-top:13px; margin-right:5px;}

/* 2018 12 24 */
.moreSource{
  float:right; margin-top:6px; margin-right:8px;
}

.searchBox_blyun{margin:0px; padding:0px;  color:#243840;  overflow:hidden;}
.searchBox_blyun *{margin:0px; padding:0px;}
.searchBox_blyun ul{list-style-type:none;}
.searchBox_blyun input{vertical-align:middle; font:12px  新宋体; color:#243840;}
.searchBox_blyun a{color:#243840; text-decoration:none;}
.searchBox_blyun a:hover{color:#dd1a00;text-decoration:none;}
.searchBox_blyun .clearfix{overflow:hidden; zoom:1;}
.searchBox_blyun .clear{clear:both; height:0px; font-size:0px; line-height:0px; overflow:hidden;}
.searchBox_blyun .inner1_searchBox{}
.searchBox_blyun .inner2_searchBox{ overflow:hidden;}
.searchBox_blyun .sTab{ margin-left:5px;}
.searchBox_blyun .sTab li{float:left; margin-right:20px; display:inline; font-size:14px;}
.searchBox_blyun .sTab li.on a{font-weight:bold; color:#dd1a00;}
.searchBox_blyun .sTab li.on a:hover{text-decoration:none;}
.searchBox_blyun .sInput{ margin-top:10px; }
.searchBox_blyun .sInput input{float:left; }
.searchBox_blyun .stxt{width:327px; height:22px; line-height:22px; background:#fff; padding-left:10px; border:1px solid #d5d6d1;}
.searchBox_blyun .cn{ display:inline;  margin:0 5px;}
.searchBox_blyun .en{}
.searchBox_blyun .sTip{float:left; height:28px; position:relative; margin:-1px 0px 0px 4px; line-height:14px; display:inline;}
.searchBox_blyun .sTip td{height:27px;}
.searchBox_blyun .sTip a{text-decoration:underline;}
.searchBox_blyun .sLabel{ float:left; width:453px; margin-top:4px; margin-left:0px;}
.searchBox_blyun .sLabel label{margin-right:5px; *margin-right:5px;}
.searchBox_blyun .sLabel input{margin:0px 3px 3px 0px; *margin:0px 1px 3px 0px;}

.searchBox_blyun p{margin-top:28px;color:#757575;}
.searchBox_blyun p b{width:7px;height:8px;background-position:-52px top;margin:8px 8px 0px 0px;}
</style>
