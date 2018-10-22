<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div class="row">
    <div v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <!-- <div class="col-md-4 col-sm-6">
      <div class="card text-white bg-secondary mb-3" style="width: inherit;">
        <div class="card-header">Info</div>
        <div class="card-body">
          <p class="card-text">Name: {{user.firstname}} {{user.lastname}}</p>
        </div>
      </div>
    </div> -->
    <div class="container">
      <!-- <b-img :src="image" fluid alt="image" /> -->
      <b-img :src="image" center fluid width="600" height="400" blank-color="#bbb" alt="img" class="my-5" />
    </div>
  </div>
</div>
</template>

<script>
import navbar from './navbar'
import axios from 'axios'
import spinner from 'vue-spinner/src/RotateLoader.vue'
import image from '../../assets/miu_logo.jpeg'
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
      baseURL:process.env.VUE_APP_BASE_URI,
      image:image
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
