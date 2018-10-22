<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <AdminDashboard msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminDashboard from '@/components/Admin/AdminDash.vue'

export default {
  name: 'AdminDash',
  components: {
    AdminDashboard
  }
}
</script>
