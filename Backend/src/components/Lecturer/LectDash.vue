<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div class="row">
    <div v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <div class="col-md-4 col-sm-6">
      <div class="card text-white bg-secondary mb-3" style="width: inherit;">
        <div class="card-header">Info</div>
        <div class="card-body">
          <p class="card-text">Name: {{user.firstname}} {{user.lastname}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import navbar from './navbar'
import axios from 'axios'
import spinner from 'vue-spinner/src/RotateLoader.vue'

export default {
  name: 'Dashboard',
  components: {
    'navbar': navbar,
    'spinner': spinner
  },
  data() {
    return {
      color: '#3AB982',
      size: '5px',
      data: [],
      userid: this.$session.get('id'),
      user: '',
      bool: true,
      attendedclasses: [],
      errors: [],
    }
  },
  created() {
    if(!this.$session.has('jwt')){
      this.$router.push({
        name:'LectLogin'
      })
    } else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      this.user = this.$session.get('user');
      console.log(localStorage.getItem('jwtToken'));
      const headers = axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    }
  },
  methods: {}
}
</script>
<style scoped>
#body {
  margin-top: 60px;
  width: auto;
}

.col-sm-6 {
  margin-top: 10px;
}
</style>
