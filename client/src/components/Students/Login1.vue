<template>
<div class="container-fluid">
  <section id="login">
    <div style="background:transparent !important" class="jumbotron">
      <div class="row">
        <div class="form-wrap">
          <div v-if="errors && errors.length">
            <div v-for="error in errors" class="alert alert-danger">
              {{error.response.data.msg}}
            </div>
          </div>
          <div class="col-md-12">
            <h1>Enter your credentials</h1>
            <form role="form" autocomplete="off" @submit="login">
              <div class="form-group">
                <label for="id" class="sr-only">Student ID</label>
                <input type="text" v-model="id" id="email" class="form-control" placeholder="student id">
              </div>
              <div class="form-group">
                <label for="password" class="sr-only">Password</label>
                <input type="password" v-model="password" id="key" class="form-control" placeholder="Password">
              </div>
              <button class="btn btn-lg btn-outline-success btn-block forgot" type="submit">Sign in</button>
            </form>
            <!-- <a class="forget" data-toggle="modal" data-target=".forget-modal">Forgot your password?</a> -->
            <router-link :to="{ name: 'Register'}" class="btn btn-lg btn-block btn-outline-info forget">Register</router-link>
            <router-link :to="{ name: 'Forgot'}" class="btn btn-lg btn-block btn-outline-dark forget">Forgot your passpword?</router-link>
            <hr>
            <footer id="footer">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <p>Page © - 2018</p>
                    <p>Author:<strong> MOHAMED SAMEEN FIRQ</strong></p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <!-- /.col-xs-12 -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </section>
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
      email: '',
      errors: [],
      baseURL: process.env.VUE_APP_BASE_URI,
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
          var self = this;
          self.$session.start();
          self.$session.set('id', this.id);
          self.$session.set('user', res.data.user);
          // const id = this.id;
          this.$router.push({
            name: 'Dashboard'
          })
        }).catch((err) => {
          this.errors =[];
          console.log(err);
          this.errors.push(err);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#navigation {
  display: none;
}

#login {
  padding-top: 50px
}

#login .form-wrap {
  width: auto;
  margin: 0 auto;
}

#login h1 {
  color: #1fa67b;
  font-size: 18px;
  text-align: center;
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
