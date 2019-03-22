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
            <!--猜你想问-->
            <div v-if="data.msgType === 1">
              <a href="#" class="guess" @click="send($event,true)" v-for="(item,idx) in data.guess" v-bind:key="idx">
                {{item.question}}
              </a>
            </div>
            <!--查询图书-->
            <div v-if="data.msgType === 3">
              <table class="book" cellpadding="0" cellspacing="0">
                <thead>
                <th>书名</th>
                <th>索书号</th>
                <th>出版社</th>
                <th>阅览室</th>
                <th>在馆数量</th>
                <th>位置详情</th>
                </thead>
                <tbody>
                  <tr v-for="(item, idx) in data.book" :key="idx">
                    <td>{{item.bookName}}</td>
                    <td>{{item.callCode}}</td>
                    <td>{{item.press}}</td>
                    <td>{{item.readingRoom}}</td>
                    <td>{{item.libNum}}</td>
                    <td>
                      <a :href="item.href" target="_blank">点击查看</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="a-chat-img-right" v-bind:hidden="data.isLeft">
          {{data.from[0]}}
        </div>
      </div>
    </div>
    <div class="new-chat">
      <textarea type="text" placeholder="请详细描述你的问题" id="new-chat-input" v-model.trim="newChat" @keyup.enter="send"></textarea>
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
        <el-table :data="myQuestion" height="350" :row-class-name="tableRowClassName">
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
    tableRowClassName: function ({row, rowIndex}) {
      console.log(row.question, parseInt(row.answerState) === 0)
      if (parseInt(row.answerState) === 0) {
        return 'success-row'
      } else {
        return ''
      }
    },
    send: function (e, isGuess) {
      e.preventDefault()
      let self = this
      let newChat = ''
      if (isGuess === true) {
        newChat = e.target.innerHTML.trim()
      } else {
        newChat = this.newChat
        // eslint-disable-next-line
        let verifyChat = newChat.replace(/[\s|\r|\n|\.?|\??|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\+|\<|\>|\?|\:|\"|\{|\}|\,|\.|/|\;|\'|\[|\\|\]|\·|\、|\《|\》]/g, '')
        if (verifyChat === '') {
          this.$message.error('不可以发送空白消息')
          return false
        } else if (verifyChat.search(/(办证|包小姐|http|退党|台独|藏独|疆独|傻逼|艹|妈的|个逼|鸡巴|滚蛋|操你妈|性感|女优|强奸|乱伦|高潮|婊子|裸聊|法论功|反动|风骚|放荡|干你|春药|睾丸|暴乱|狗逼|腐败|贪污|受贿|激情|色情|妓女|嫖娼|贱逼|流氓|淫秽|淫荡|贱货|牛逼|性爱|龟头|禁忌|专业代理|帮忙点|点击进入|详情.*?进入|私家侦探|调查婚外情|借腹生子|免费试用|足球投注|质押贷款|证监会|信用卡提现|无抵押贷款|广告代理|原音铃声|代开发票|销售热线|订购热线|低价出售|客服电话|连锁加盟|加盟连锁|回复可见|刻章办|套牌车|高清在线|股市圈钱|资金短缺|替考试|考试答案|六合彩|代孕妈妈|小额贷款|出售|聊天室|六四风波|北京风波|新闻封锁|钓鱼岛|陈水扁|台湾国|台军|一中一台|劣等民族|高丽棒子|满狗|圣战组织|中共独裁|真善忍|中国猪|中华帝国|共匪|共产专制|跟踪定位|监听)/) !== -1) { // 定义敏感词
          self.$confirm('你的语句中含有敏感词，请注意言行', '警告', {
            type: 'error',
            showCancelButton: false,
            center: true
          })
          return false
        }
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
          if (response.data.status === 0) {
            // msg_code 0 正常回复  1 猜你想问  2  图灵回复  3 查询图书
            let chatBody = ''
            let fromUser = ''
            let msgType = response.data.msg_code
            let guess = []
            let book = []
            if (response.data.msg_code === 0) {
              chatBody = response.data.msg
              fromUser = '智'
            } else if (response.data.msg_code === 1) {
              isGuess = true
              chatBody = '猜你想问：'
              guess = response.data.msg
              fromUser = '智'
            } else if (response.data.msg_code === 2) {
              chatBody = response.data.msg
              fromUser = '图'
            } else if (response.data.msg_code === 3) { // 查询图书信息
              fromUser = '智'
              if (response.data.msg.length === 0) {
                msgType = 0
                chatBody = '未找到相关藏书'
              } else {
                chatBody = '为您找到以下图书馆藏信息：'
                for (let item of response.data.msg) {
                  let bookName = item.book_name.split('\'')[1]
                  let callCode = item.call_code.split('\'')[1]
                  let libNum = item.lib_num
                  let href = item.location.split('\\\'')[1]
                  let press = item.press.split('\'')[1]
                  let readingRoom = item.reading_room.split('\'')[1]
                  let tmp = {
                    bookName,
                    callCode,
                    libNum,
                    href,
                    press,
                    readingRoom
                  }
                  book.push(tmp)
                }
                console.log(book)
              }
            }
            let chat = {
              chatBody,
              from: fromUser,
              isLeft: 'true',
              msgType,
              guess,
              book
            }
            self.chat.push(chat)
            self.update()
          } else {
            self.$message.error('未知错误')
          }
        })
        .catch(function (err) {
          self.$message.error('发送消息失败，请检查网络')
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
              let tmp = {date: item.newstime, answer: item.theanswer, question: item.question, answerState: item.answerstate}
              self.myQuestion.unshift(tmp)
            }
            self.unread = 0
          }
        })
        .catch(function (err) {
          self.$message.error('查询用户问题失败，请检查网络')
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
          self.$message.error('退出登录失败，请检查网络')
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
          self.$message.error('获取用户未读信息失败 未知错误')
        }
      })
      .catch(function (err) {
        self.$message.error('获取用户未读信息失败，请检查网络')
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
  .guess{
    display: block;
    /*text-decoration-line: none;*/
    color: #eee;
    line-height: 25px;
  }
  .book{
    margin-top: 10px;
    margin-bottom: 5px;
    text-align: center;
  }
  .book th {
    font-size: 17px;
    border-bottom: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    padding: 5px ;
  }
  .book td{
    border-bottom: 1px solid #ebeef5;
    padding: 5px 5px;
  }
  .book td a{
    text-decoration-line: none;
  }
  .book td a:link{
    color: #fff;
  }
  .book td a:visited{
    color: #ddd;
  }
  .el-table .success-row{
    background: #f0f9eb;
    color: #fff;
  }
</style>
