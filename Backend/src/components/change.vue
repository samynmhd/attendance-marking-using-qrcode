<template>
<div class="container" id="body">
  <div v-if="errors && errors.length">
    <div v-for="error in errors" class="alert alert-danger">
      {{error.response.data.msg}}
    </div>
  </div>
  <div v-if="info && info.length">
    <div class="alert alert-info">
      {{info}}
    </div>
  </div>
  <div class="container" style="content:center" v-show="bool == true">
    <ul class="list-container">
      <li class="spinner-list">
        <!-- <spinner :loading="loading" :color="color" :size="size"></spinner> -->
        <spinner></spinner>
      </li>
    </ul>
  </div>
  <div class="form-group" v-show="bool == false && hide == false">
    <input type="password" name="Email" v-model='password' class="form-control" placeholder="new password">
    <input type="password" name="Email" v-model='password2' class="form-control" placeholder="re-type password">
    <button type="button" class="btn btn-outline-primary" @click="addToApi">Send</button>
  </div>
</div>
</div>
</template>

<script>
import navbar from './navbar'
import axios from 'axios'
import spinner from 'vue-spinner/src/MoonLoader.vue'

export default {
  name: 'Dashboard',
  components: {
    'navbar': navbar,
    'spinner': spinner
  },
  data() {
    return {
      password: '',
      password2: '',
      errors: [],
      info: '',
      baseURL: '',
      bool: true,
      hide: false,
    }
  },
  created() {
    axios.get(`https://${location.host}/api/auth/reset/${this.$route.params.token}`)
      .then(res => {
        console.log(res);
        this.bool = false;
      })
      .catch(err => {
        this.errors =[];
        this.errors.push(err);
        this.bool = false;
        this.hide = true;
      })
  },
  methods: {
    addToApi(evt) {
      evt.preventDefault();
      this.bool = true;
      this.hide = true;
      this.errors =[];
      if (this.password !== this.password2) {
        this.errors.push({
          response: {
            data: {
              msg: 'Passwords does not match'
            }
          }
        })
      } else {
        let data = {
          password: this.password
        }
        axios.post(`https://${location.host}/api/auth/reset/${this.$route.params.token}`, data)
          .then(res => {
            console.log(res);
            this.info = res.data.msg;
            this.hide = true;
            this.bool = false;
          })
          .catch(err => {
            this.errors =[];
            this.errors.push(err);
            this.bool = false;
            this.hide = true;
          })
      }
    }
  }
}
</script>
<style>
#body {
  margin-top: 60px;
}
</style>
