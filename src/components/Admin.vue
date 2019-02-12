<template>
  <div id="admin-page">
    <el-table
      :data="questionSet"
      border
      style="width: 100%"
      max-height="740">
      <el-table-column
        prop="ID"
        label="ID"
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
    <div style="text-align: center; margin-top: 15px;">
      <el-button @click="submitAnswer">提交</el-button>
      <el-button v-if="layer === 1" @click="queryAdmin">管理员管理</el-button>
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
        max-height="400">
        <el-table-column
          prop="userid"
          label="ID"
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
            <el-input v-model="addAdminDetail.userid"></el-input>
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
    layer: {
      type: Number
    },
    url: {
      type: String
    }
  },
  data () {
    return {
      questionSet: [],
      dialogVisible: false,
      addAdminDialogShow: false,
      adminList: '',
      addAdminLoading: false,
      addAdminDetail: {
        userid: '',
        username: ''
      }
    }
  },
  methods: {
    submitAnswer: function () {
      let self = this
      this.$http.post(self.url + 'submission', self.$qs.stringify({teacher_answer: JSON.stringify(self.questionSet)}))
        .then(function (res) {
          // console.log(res)
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
      self.$http.get(self.url + 'query')
        .then(function (res) {
          self.adminList = res.data
          self.dialogVisible = true
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    addAdmin: function () {
      let self = this
      this.$http.post(self.url + 'increase', self.$qs.stringify(self.addAdminDetail))
        .then(function (res) {
          console.log(res)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    deleteAdmin: function (userid) {
      let self = this
      this.$http.post(self.url + 'delete', self.$qs.stringify({userid: userid}))
        .then(function (res) {
          console.log(res)
        })
        .catch(function (err) {
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
