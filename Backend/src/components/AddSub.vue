<template>
<div class="container" id="body">
  <navbar></navbar>
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
  <div class="jumbotron" v-show="bool == false">
    <div class="form-group">
      <p class="h3">SELECT SUBJECTS</p>
      <p class="h6">Student id:<a class="h6"> {{users.id}}</a></p>
      <p class="h6">Semester:<a class="h6"> {{users.semester}}</a></p>
    </div>
    <div v-for="subs in subjects" class="checkbox disabled">
      <label><input type="checkbox" :value="subs.subname" :subs="subs.subname" v-model="checkbox">  {{subs.subname}}</label>
    </div>
  </div>
  <div v-if="checkbox && checkbox.length" class="jumbotron">
    <div v-for="data in checkbox" class="container">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{data}}</li>
      </ul>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-outline-primary" @click="select">Add</button>
    </div>
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
    'spinner':spinner
  },
  data() {
    return {
      data: '',
      userid: this.$session.get('id'),
      users: this.$session.get('user'),
      subjects: [],
      checkbox: [],
      errors: [],
      info: '',
      baseURL: '',
      bool:true,
    }
  },
  created() {
    const self = this;
    this.baseURL = location.host || 'localhost:3000'
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    let user = this.$session.get('user');
    let uid = encodeURIComponent(user.id);
    let sem = encodeURIComponent(user.semester);
    let course = encodeURIComponent(user.program);

    // console.log(this.$session.get('id'));
    axios.get(`https://${this.baseURL}/api/students/stdaddsub/${uid}/${sem}/${course}`)
      .then(response => {
        console.log(response);
        this.data = response
        this.subjects = response.data.subjects
        this.bool = false
      })
      .catch(e => {
        this.errors =[];
        this.errors.push(e)
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
  },
  methods: {
    check: function(e) {
      if (e.target.checked) {
        console.log(e);
        this.checkbox.push(e.target.value);
      }
    },
    select(evt) {
      evt.preventDefault();
      let user = this.$session.get('user');
      let uid = encodeURIComponent(user.id);
      let sem = encodeURIComponent(user.semester);
      if (this.checkbox === null) {
        this.errors.push("Please select subjects");
        return;
      }
      axios.post(`https://${location.host}/api/students/selectsubs/${uid}/${sem}`, this.checkbox)
        .then(response => {
          console.log(response);
          this.info = response.data.msg;
          this.checkbox = [];

        })
        .catch(err => {
          this.errors = [];
          console.error(err);
          this.errors.push(err);
          this.checkbox = [];
        })
    }

  }
}
</script>
<style>
#body {
  margin-top: 60px;
}
.list-container {
  background: #fff;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;

  -webkit-align-items: center;
  align-items: center;

  -webkit-justify-content: space-around;
  justify-content: space-around;
}

.spinner-list {
  /* width: 1000px;
  height: -80px;
  line-height: 200px;
  padding-left: 90px;
  padding-bottom: 200px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center; */
  display: -webkit-flex;
  display: flex;
  padding-top: 20px;
  padding-bottom: 300px;

  webkit-flex: 0 1 auto;
  flex: 0 1 auto;

  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;

  width: 200px;
  height: 400px;
  webkit-align-items: center;
  align-items: center;
  webkit-justify-content: center;
  justify-content: center;
}
</style>
