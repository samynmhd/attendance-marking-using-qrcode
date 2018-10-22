<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Dash msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dash from '@/components/Students/Dashboard1.vue'

export default {
  name: 'Dashboard',
  components: {
    Dash
  }
}
</script>
