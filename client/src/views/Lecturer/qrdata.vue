<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Data msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Data from '@/components/Lecturer/qrdata.vue'

export default {
  name: 'qrdata',
  components: {
    Data
  }
}
</script>
