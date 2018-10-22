<template>
<section id="login">
  <div class="container-fluid" id="body">
    <navbar></navbar>
    <div>
      <h1>Add Program</h1>
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
    <div class="form-group col-md-4" v-show="bool == false && hide == false">
      <div class="form-group">
        <form>
          <label for="school">Lecturer Registration</label>
          <input type="email" name="email" v-model="email" class="form-control" placeholder="email address">
        </form>
      </div>
      <div class="form-group">
        <button type="button outline-success" name="button" @click="send" class="btn btn-primary-outline">Send</button>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import navbar from './navbar'
const baseURL = `https://${location.host}`;
export default {
  name: 'AddCourse',
  components: {
    'navbar': navbar
  },
  data() {
    return {
      email: '',
      errors: [],
      response: [],
      info: '',
      hide: false,
      bool: false,
    }
  },
  created() {
    const headers = axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    if(!this.$session.has('admin')){
      this.$router.push({
        name:'AdminLogin'
      });
    }
  },
  methods: {
    send(evt) {
      evt.preventDefault();
      if (this.email == '') {
        this.bool = false;
        this.errors =[];
        this.errors.push({
          response: {
            data: {
              msg: 'Please enter an Email address'
            }
          }
        });
        this.bool = false;
      } else {
        if (!this.validEmail(this.email)) {
          this.errors =[];
          this.errors.push({
            response: {
              data: {
                msg: 'Please enter a valid email address'
              }
            }
          });
          this.bool = false;
        } else {

          let data = {
            email: this.email
          }
          axios.post(`https://${location.host}/api/admin/email`, data)
            .then(res => {
              console.log(res);
              this.email = '';
              this.errors = [];
              this.info = res.data.msg;
              this.bool = false;
              this.hide = false;
            })
            .catch(err => {
              this.errors = [];
              this.erros.push(err);
              this.bool = false;
              this.hide = false;
            })
        }
      }
    },
    hasNull(target) {
      for (var member in target) {
        if (target[member] == "")
          return true;
      }
      return false;
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
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
