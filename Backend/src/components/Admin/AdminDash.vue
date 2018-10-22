<template>
<section id="login">
  <div class="container-fluid" id="body">
    <navbar></navbar>
    <div>
      <h1>Dashboard</h1>
    </div>
    <div class="container" style="content:center" v-show="bool == true">
      <ul class="list-container">
        <li class="spinner-list">
          <!-- <spinner :loading="loading" :color="color" :size="size"></spinner> -->
          <spinner></spinner>
        </li>
      </ul>
    </div>
    <div v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <div v-if="info && info.length">
      <div class="alert alert-success">
        {{info}}
      </div>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import navbar from './navbar';
import spinner from 'vue-spinner/src/MoonLoader.vue'

export default {
  name: 'AdminDash',
  components: {
    'navbar': navbar,
    'spinner': spinner
  },
  data() {
    return {
      email: '',
      errors: [],
      response: [],
      info: '',
      info: '',
      hide: false,
      bool: false,
    }
  },
  created() {
    const headers = axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    if (!this.$session.has('admin')) {
      this.$router.push({
        name: 'AdminLogin'
      });
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body {
  margin-top: 60px;
  width: auto;
}

#login .form-wrap {
  width: auto;
  margin: 0 auto;
}

h1 {
  color: #1fa67b;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
}

#login .form-group {
  margin-bottom: 25px;
}

#login .btn-outline-success {
  font-size: 14px;
  margin-bottom: 20px;
}

#login .forget {
  font-size: 13px;
  /* text-align: center;
	display: block; */
}

/*    --------------------------------------------------
	:: Inputs & Buttons
	-------------------------------------------------- */

.form-control {
  color: #212121;
}

/* .btn-custom {
    color: #fff;
	background-color: #1fa67b;
} */

/* .btn-custom:hover,
.btn-custom:focus {
    color: #fff;
} */

/*    --------------------------------------------------
    :: Footer
	-------------------------------------------------- */

#footer {
  color: #6d6d6d;
  font-size: 12px;
  text-align: center;
}

#footer p {
  margin-bottom: 0;
}

#footer a {
  color: inherit;
}
</style>
