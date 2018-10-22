<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Attendance msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Attendance from '@/components/Lecturer/findAttendance2.vue'

export default {
  name: 'FindAtt',
  components: {
    Attendance
  }
}
</script>
