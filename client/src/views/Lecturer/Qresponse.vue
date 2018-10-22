<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Response msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Response from '@/components/Lecturer/Qresponse.vue'

export default {
  name: 'Qresponse',
  components: {
    Response
  }
}
</script>
