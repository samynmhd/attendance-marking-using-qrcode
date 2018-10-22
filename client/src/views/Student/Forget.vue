<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Forget msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Forget from '@/components/Students/forget.vue'

export default {
  name: 'Forgot',
  components: {
    Forget
  }
}
</script>
