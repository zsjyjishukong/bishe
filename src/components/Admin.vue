<template>
  <div id="admin-page">
    <el-table
      :data="questionSet"
      border
      style="width: 100%"
      max-height="740"
      ref="multipleTable"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="ID"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="question"
        label="问题"
        width="370">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="回答">
        <template slot-scope="scope">
          <el-input v-model="scope.row.answer" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center; margin: 15px 0;">
      <el-button type="primary" @click="submitAnswer">提交</el-button>
      <el-button type="danger" @click="deleteSelectedQuestionConfirm">删除选中的问题</el-button>
      <el-button v-if="parseInt(layer) === 0" @click="queryAdmin"
      type="success">管理员管理</el-button>
      <el-button @click="logout" type="warning">退出登录</el-button>
    </div>
     <!--dialog-->
    <el-dialog
      title="管理员管理"
      :visible.sync="dialogVisible"
      width="40%">
      <el-table
        :data="adminList"
        border
        style="width: 100%"
        max-height="300">
        <el-table-column
          prop="userid"
          label="工号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="newstime"
          label="添加时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="username"
          label="管理员名称"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              :key="scope.ID">
              <p>确定要删除管理员<span style="color: #E6A23C;">{{scope.row.username}}</span>吗?</p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click="deleteAdmin(scope.row.userid)">确定</el-button>
              </div>
              <el-button type="text" size="small" slot="reference">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addAdminDialogShow = true">添 加</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      <el-dialog
        width="40%"
        title="添加管理员"
        :visible.sync="addAdminDialogShow"
        append-to-body>
        <el-form :model="addAdminDetail" label-width="120px" v-loading="addAdminLoading" >
          <el-form-item label="管理员ID : ">
            <el-input v-model="addAdminDetail.userid" placeholder="教师工号"></el-input>
          </el-form-item>
          <el-form-item label="管理员名称 : " >
            <el-input v-model="addAdminDetail.username" placeholder="相当于昵称，方便辨认"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addAdmin">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  props: {
    url: {
      type: String
    }
  },
  data () {
    return {
      questionSet: [],
      dialogVisible: false,
      addAdminDialogShow: false,
      adminList: [],
      addAdminLoading: false,
      addAdminDetail: {
        userid: '',
        username: ''
      },
      multipleSelection: [],
      layer: sessionStorage.getItem('layer')
    }
  },
  methods: {
    submitAnswer: function () {
      let self = this
      let answerList = []
      for (let item of self.questionSet) {
        if (item.answer != null && item.answer.trim() !== '') {
          let tmp = {answer: item.answer, id: item.id}
          answerList.push(tmp)
        }
      }
      this.$http.post(self.url + 'submission', self.$qs.stringify({teacher_answer: JSON.stringify(answerList)}))
        .then(function (res) {
          if (res.data.status === 0) {
            self.$message.success('回答成功')
            self.selectQuestion()
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    selectQuestion: function () {
      let self = this
      this.questionSet = []
      this.$http.get(self.url + 'reply')
        .then(function (response) {
          let j = 1
          for (let i of response.data) {
            i.answer = null
            i.ID = j++
            self.questionSet.push(i)
          }
        })
        .catch(function () {
          console.log('出错了')
        })
    },
    queryAdmin: function () {
      let self = this
      this.adminList = []
      self.$http.get(self.url + 'query')
        .then(function (res) {
          if (res.data.status === 0) {
            self.adminList = res.data.msg
            self.dialogVisible = true
          } else {
            self.$message.error('权限不足')
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    addAdmin: function () {
      let self = this
      this.$http.post(self.url + 'increase', self.$qs.stringify(self.addAdminDetail))
        .then(function (res) {
          if (res.data.status === 0) {
            self.addAdminDialogShow = false
            self.$message.success('添加管理员成功')
            self.queryAdmin()
          } else if (res.data.status === 1) {
            self.$message.error('已存在该管理员')
          } else {
            self.$message.error('禁止越权操作')
          }
        })
        .catch(function (err) {
          self.$message.error('网络错误')
          console.log(err)
        })
    },
    deleteAdmin: function (userid) {
      let self = this
      this.$http.post(self.url + 'delete', self.$qs.stringify({userid: userid}))
        .then(function (res) {
          if (res.data.status === 0) {
            self.addAdminDialogShow = false
            self.$message.success('删除管理员成功')
            self.queryAdmin()
          } else {
            self.$message.error('禁止越权操作')
          }
        })
        .catch(function (err) {
          self.$message.error('网络错误')
          console.log(err)
        })
    },
    deleteSelectedQuestionConfirm: function () {
      let self = this
      if (this.multipleSelection === []) {
        this.$message.error('请选择问题后再进行删除')
      } else {
        this.$confirm('此操作将删除所有选中的问题，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.deleteSelectQuestion(self.multipleSelection)
        }).catch(() => {})
      }
    },
    deleteSelectQuestion: function (arr) {
      let self = this
      let req = []
      if (arr.length === 0) {
        self.$message.warning('选择不能为空')
        return
      }
      for (let i in arr) {
        req.push({id: arr[i]})
      }
      this.$http.post(self.url + 'del_question', self.$qs.stringify({question_id: JSON.stringify(req)}))
        .then(function (res) {
          if (res.data.status === 0) {
            self.$message({
              type: 'success',
              message: '删除成功!'
            })
            self.selectQuestion()
          } else {
            self.$message.error('删除失败')
          }
        })
        .catch(function (err) {
          self.$message.error('网络错误')
          console.log(err)
        })
    },
    handleSelectionChange: function (val) {
      this.multipleSelection = []
      for (let i in val) {
        this.multipleSelection.push(val[i].id)
      }
      console.log(this.multipleSelection)
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
    this.selectQuestion()
  }
}
</script>

<style scoped>
#admin-page{
  border: 1px solid #aeaeae;
  height: 100%;
}
</style>
