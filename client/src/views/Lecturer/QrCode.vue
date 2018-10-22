<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Qr msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Qr from '@/components/Lecturer/QrCode.vue'

export default {
  name: 'QrCode',
  components: {
    Qr
  }
}
</script>
