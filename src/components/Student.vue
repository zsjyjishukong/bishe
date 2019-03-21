<template>
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
      <textarea type="text" placeholder="请详细描述你的问题" id="new-chat-input" v-model.lazy="newChat" @keyup.enter="send"></textarea>
      <button class="send" @click="send">
        发送
      </button>
      <el-badge :value="unread" :max="9" :hidden="parseInt(unread) === 0">
        <button class="send" @click="showMe()">
          我的
        </button>
      </el-badge>
    </div>
    <el-dialog title="我的提问" :visible.sync="meShow">
      <div>
        <el-table :data="myQuestion" height="350">
          <el-table-column property="date" label="日期" width="150" sortable></el-table-column>
          <el-table-column property="question" label="问题" width="200"></el-table-column>
          <el-table-column property="answer" label="回答"></el-table-column>
        </el-table>
      </div>
      <div style="text-align: center; margin-top: 10px;">
        <el-button type="danger" @click="logout">退出登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Student',
  props: {
    'url': {
      type: String
    },
    'user': {
      type: String
    }
  },
  data () {
    return {
      chat: [],
      newChat: '',
      meShow: false,
      myQuestion: [],
      unread: 0
    }
  },
  methods: {
    send: function () {
      let self = this
      let newChat = this.newChat.trim()
      if (newChat === '') {
        this.$message.error('不可以发送空白消息')
        return false
      }
      this.chat.push({
        from: '问',
        isLeft: false,
        chatBody: newChat
      })
      self.update()
      this.newChat = ''
      this.$http.post(self.url + 'answer', self.$qs.stringify({question: newChat}))
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
        // eslint-disable-next-line
        let timer = setInterval(function () {
          if (div.scrollTop < div.scrollHeight - div.offsetHeight) {
            div.scrollTop += 1
          } else {
            clearInterval(timer)
          }
        }, 10)
      })
    },
    showMe: function () {
      let self = this
      this.meShow = true
      this.$http.get(self.url + 'myquestion')
        .then(function (response) {
          if (response.data.status === 0) {
            self.myQuestion = []
            for (let item of response.data.msg) {
              let tmp = {date: item.newstime, answer: item.theanswer, question: item.question}
              self.myQuestion.push(tmp)
            }
            self.unread = 0
          }
        })
        .catch(function (err) {
          self.$message.error('网络错误')
          console.log(err)
        })
    },
    logout: function () {
      let self = this
      this.$http.post(self.url + 'del_cookie')
        .then(function (response) {
          if (response.data.status === 0) {
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('layer')
            self.$message.success('退出成功')
            setTimeout(function () {
              window.location.reload()
            }, 1500)
          }
        })
        .catch(function (err) {
          self.$message.error('网络错误')
          console.log(err)
        })
    }
  },
  mounted: function () {
    let self = this
    this.$http.get(self.url + 'number')
      .then(function (response) {
        if (response.data.status === 0) {
          self.unread = response.data.msg
        } else {
          self.$message.error('获取用户未读信息失败')
        }
      })
      .catch(function (err) {
        self.$message.error('网络错误')
        console.log(err)
      })
  }
}
</script>

<style scoped>
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
    height: 100%;
    resize: none;
    font-size: 18px;
    border: 1px solid #e5e5e5;
    outline: none;
  }
  .send{
    /*float: right;*/
    border: 1px solid #00C1DE;
    background: #e2f8fb;
    cursor: pointer;
    border-radius: 5px;
    vertical-align:middle ;
    padding: 4px 10px;
    color: #00c1de;
    outline: none;
    font: 18px 华文宋体, Arial, Helvetica, sans-serif;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .send:hover{
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
    text-align: -webkit-center;
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
    text-align: -webkit-center;
    line-height: 50px;
    color: white;
    font-size: 20px;
  }
  .chat{
    border: 1px solid #cbcbcb;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 10px 0;
  }
</style>
