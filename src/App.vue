<template>
  <div id="app">
       <TopBar></TopBar>
       <router-view></router-view>
  </div>
</template>
<script>
import TopBar from './components/TopBar'
export default {
  name: 'app',
  components: {
    TopBar
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  margin-top: 60px;
}
</style>
