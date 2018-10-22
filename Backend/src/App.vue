<template>
<div id="app">
  <!-- <navigation  id="navigation"></navigation> -->
    <!-- <img src="./assets/logo.png"> -->
  <router-view/>
</div>
</template>

<script>
import navbar from './components/navbar'
import qcode from './components/Lecturer/QrCode'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'App',
  components: {
    'navigation':navbar,
    'qcode':qcode
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
