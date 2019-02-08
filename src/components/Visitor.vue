<template>
  <div id="visitor-page">
    <div id="visitor-page-body">
      <div><img src="@/assets/no-login.png"></div>
      <div id="text">您尚未登录，请登录后操作</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Visitor'
}
</script>

<style scoped>
  #visitor-page{
    height: 100%;
    text-align: center;
  }
  #visitor-page-body{
    margin-top: 10%;
  }
  #text{
    margin-top: 40px;
    color: #898989;
  }
</style>
