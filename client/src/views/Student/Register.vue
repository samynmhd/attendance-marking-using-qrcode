<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Reg msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Reg from '@/components/Students/Register1.vue'

export default {
  name: 'Register',
  components: {
    Reg
  }
}
</script>
