<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Login msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Admin/AdminLogin.vue'

export default {
  name: 'AdminLogin',
  components: {
    Login
  }
}
</script>
