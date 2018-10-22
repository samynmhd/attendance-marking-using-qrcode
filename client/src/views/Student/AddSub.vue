<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Sub msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Sub from '@/components/Students/AddSub.vue'

export default {
  name: 'AddSub',
  components: {
    Sub
  }
}
</script>
