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
  <div class="form-group" v-show="bool == false">
    <input type="email" name="Email" v-model='email' class="form-control">
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
      email: '',
      errors: [],
      info: '',
      baseURL: '',
      bool: false,
    }
  },
  created() {},
  methods: {
    addToApi(evt) {
      evt.preventDefault();
      let data = {
        email: this.email
      }
      this.bool = true;
      axios.post(`https://${location.host}/api/auth/forget`, data)
        .then(res => {
          console.log(res);
          this.info = res.data.msg;
          this.bool = false;
        })
        .catch(err => {
          this.errors =[];
          this.errors.push(err);
          this.bool = false;
        })
    }
  }
}
</script>
<style>
#body {
  margin-top: 60px;
}
</style>
