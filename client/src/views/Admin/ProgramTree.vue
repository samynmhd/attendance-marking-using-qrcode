<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Program msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Program from '@/components/Admin/ProgramTree.vue'

export default {
  name: 'ProgramTree',
  components: {
    Program
  }
}
</script>
