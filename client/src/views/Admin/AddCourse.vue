<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Course msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Course from '@/components/Admin/AddCourse.vue'

export default {
  name: 'AddCourse',
  components: {
    Course
  }
}
</script>
