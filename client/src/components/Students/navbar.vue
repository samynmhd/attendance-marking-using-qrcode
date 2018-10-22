<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand"><router-link :to="{ name: 'Dashboard'}">MIU</router-link></a>
    <!-- <router-link class="navbar-brand":to="{ name: 'Dashboard'}"><a class="navbar-brand">Dashboard</a></router-link> -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'AddSub'}">Add subjects</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{this.$session.get('user').firstname}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link class="dropdown-item" :to="{name: 'Profile'}">Profile</router-link>
          <div class="dropdown-divider"></div>
          <form class="form-inline my-2 my-lg-0 dropdown-item">
            <button class="btn btn-sm btn-outline-danger my-2 my-sm-0" type="button" @click="logout()">Logout</button>
          </form>
        </div>
      </li>
    </ul>
    </div>
  </nav>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  data() {
    return {}
  },
  created(){
    // axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    if(!this.$session.has('user')){
      this.$router.push({
        name:'Login'
      })
    }
  },
  methods: {
      logout() {
        var self = this;
        self.$session.destroy();
        localStorage.removeItem('jwtToken')
        console.log("$session destroyed & Token reomved");
        this.$router.push({
          name: 'Login'
        })
      }
    }
}
</script>
