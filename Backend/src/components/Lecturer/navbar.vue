<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand"><router-link :to="{ name: 'LectDash'}">MIU</router-link></a>
    <!-- <router-link class="navbar-brand":to="{ name: 'Dashboard'}"><a class="navbar-brand">Dashboard</a></router-link> -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'qrdata'}">Create QrCode</router-link>
        </li>
        <!-- <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'LectSub'}">Add subjects</router-link>
        </li> -->
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'FindAtt'}">View Attendance</router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <button class="btn btn-sm btn-outline-danger my-2 my-sm-0" type="button" @click="logout()">Logout</button>
      </form>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  methods: {
      logout() {
        var self = this;
        self.$session.destroy();
        localStorage.removeItem('jwtToken')
        console.log("$session destroyed & Token reomved");
        this.$router.push({
          name: 'LectLogin'
        })
      }
    }
}
</script>
