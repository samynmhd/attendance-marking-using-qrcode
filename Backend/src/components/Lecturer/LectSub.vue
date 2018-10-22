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
  <div class="jumbotron">
    <div v-for="subs in subjects" class="checkbox disabled">
      <label><input type="checkbox" :value="subs" :subs="subs" v-model="checkbox">{{subs}}</label>
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

export default {
  name: 'Dashboard',
  components: {
    'navbar': navbar
  },
  data() {
    return {
      data: '',
      userid: this.$session.get('id'),
      subjects: [],
      checkbox: [],
      errors: [],
      info: '',
      baseURL: '',
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
      })
      .catch(e => {
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

        })
        .catch(err => {
          console.error(err);
          this.errors.push(err);
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
