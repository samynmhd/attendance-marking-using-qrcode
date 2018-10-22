<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <changing msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import changing from '@/components/Students/change.vue'

export default {
  name: 'Change',
  components: {
    changing
  }
}
</script>
