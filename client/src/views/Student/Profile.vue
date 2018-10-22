<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Pro msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Pro from '@/components/Students/Profile.vue'

export default {
  name: 'Profile',
  components: {
    Pro
  }
}
</script>
