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
          <div class="chat" >
            <div class="chat-body">
              <div class="a-chat" v-for="(data,index) in chat" v-bind:key="index">
                <div class="a-chat-img-left" v-bind:hidden="!data.isLeft">
                  {{data.from[0]}}
                </div>
                <div class="a-chat-body-father">
                  <div :class="data.isLeft?'a-chat-body a-chat-body-left':'a-chat-body a-chat-body-right'">
                    {{data.chatBody}}
                  </div>
                </div>
                <div class="a-chat-img-right" v-bind:hidden="data.isLeft">
                  {{data.from[0]}}
                </div>
              </div>
            </div>
            <div class="new-chat">
              <textarea type="text" placeholder="请详细描述你的问题" id="new-chat-input" v-model="newChat"></textarea>
              <button id="send" @click="send">
                发送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Student from '../../components/Student'
export default {
  name: 'Chat',
  components: {
    Student
  },
  data () {
    return {
      chat: [
        {
          from: '齐昊宇',
          isLeft: false,
          chatBody: 'i按实际的佛i骄傲松动i金佛阿斯哦大家哦啊啊甲方收到'
        }
      ],
      newChat: ''
    }
  },
  methods: {
    send: function () {
      let self = this
      let newChat = this.newChat
      console.log(newChat)
      this.chat.push({
        from: '齐昊宇',
        isLeft: false,
        chatBody: newChat
      })
      self.update()
      this.newChat = ''
      let url = 'http://192.168.31.174:7777/index'
      this.$http.post(url, self.$qs.stringify({question: newChat}))
        .then(function (response) {
          console.log(response.data)
          let chatBody = response.data.msg
          let from = '智能'
          let chat = {
            chatBody: chatBody,
            from: from,
            isLeft: 'true'
          }
          self.chat.push(chat)
          self.update()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    update: function () {
      let div = document.getElementsByClassName('chat-body')[0]
      this.$nextTick(function () {
        let timer = setInterval(function () {
          if (div.scrollTop < div.scrollHeight) {
            div.scrollTop += 1
          } else {
            timer = undefined
          }
        }, 10)
      })
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
    border: 1px solid #cbcbcb;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 10px 0;
    height: 70vh;
  }
  .chat-body{
    height: 55vh;
    border-bottom: 1px solid #000;
    padding: 0 10px;
    overflow: auto;
    transition: all .5s linear;
  }
  .new-chat{
    height: 13vh;
    padding: 10px;
  }
  #new-chat-input{
    width: 80%;
    height: 90%;
    resize:none;
    font-size: 18px;
    border: 1px solid #e5e5e5;
    outline: none;
  }
  #send{
    border: 1px solid #00C1DE;
    background: #e2f8fb;
    height: 5vh;
    cursor: pointer;
    border-radius: 5px;
    vertical-align:middle ;
    line-height:22px;
    margin-bottom: 9.5vh;
    margin-left: 30px;
    width: 10%;
    color: #00c1de;
    outline: none;
    font: 18px 华文宋体, Arial, Helvetica, sans-serif;
    font-weight: bold;
  }
  #send:hover{
    background: #00c1de;
    color: #e2f8fb;
  }
  .a-chat{
    text-align: center;
    margin: 10px 0;
  }
  .a-chat-img-left{
    float: left;
    background: #3AAEFF;
    height: 50px;
    width: 50px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 20px;
  }
  .a-chat-body-father{
    display: inline-block;
    width: 88%;
  }
  .a-chat-body{
    margin-top: 20px;
    background: #3AAEFF;
    display: inline-block;
    font: 18px 楷体, Arial, Helvetica, sans-serif;
    padding: 10px;
    text-align: left;
    border-radius: 5px;
    color: #fff;
  }
  .a-chat-body-left{
    float: left;
  }
  .a-chat-body-right{
    float: right;
  }
.a-chat-img-right{
  float: right;
  background: #3AAEFF;
  height: 50px;
  width: 50px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  color: white;
  font-size: 20px;
}
</style>
