<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Logins msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Logins from '@/components/Students/Login1.vue'

export default {
  name: 'Login',
  components: {
    Logins
  }
}
</script>
