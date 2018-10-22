<template>
<div class="container-fluid">
  <form class="form-signin" @submit="login">
    <div v-if="errors && errors.length">
      <div v-for="error in errors">
        <div class="alert alert-danger" role="alert">
          {{error.response.data.msg}}
        </div>
      </div>
    </div>
    <h2 class="form-signin-heading">Please sign in</h2>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input v-model="id" type="text" id="inputId" class="form-control" placeholder="Student ID" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <router-link :to="{name: 'Register'}" class="btn btn-lg btn-block btn-danger">Register</router-link>
    <router-link :to="{name: 'Forgot'}" class="btn btn-lg btn-block btn-link">Forgot</router-link>
  </form>
  {{test}}
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      id: '',
      password: '',
      response: '',
      errors: [],
      baseURL: process.env.VUE_APP_BASE_URI,
      test: process.env.NODE_ENV,
    }
  },
  methods: {
    login(evt) {
      evt.preventDefault();
      let data = {
        username: this.id,
        password: this.password
      };
      axios.post(`${this.baseURL}/api/auth/login`, data)
        .then((res) => {
          localStorage.setItem('jwtToken', res.data.token);
          const id = this.id;
          console.log(res);
          // this.$router.push({
          //   name:'Dashboard',
          //   params:{data:res.data.username}
          // });
        }).catch((err) => {
          console.log(err);
          this.errors.push(err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background: #605B56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}

.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}

.form-signin .checkbox {
  font-weight: normal;
}

.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
