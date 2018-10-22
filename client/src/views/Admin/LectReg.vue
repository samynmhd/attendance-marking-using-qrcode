<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Lect msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Lect from '@/components/Admin/LectReg.vue'

export default {
  name: 'LectReg',
  components: {
    Lect
  }
}
</script>
