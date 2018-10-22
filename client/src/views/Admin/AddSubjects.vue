<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Subjects msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Subjects from '@/components/Admin/AddSubjects.vue'

export default {
  name: 'AddSubjects',
  components: {
    Subjects
  }
}
</script>
