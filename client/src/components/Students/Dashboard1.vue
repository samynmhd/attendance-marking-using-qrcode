<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div class="row">
    <div v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <div class="col-md-3 col-sm-6">
      <div class="card text-white bg-secondary mb-3" style="width: inherit;">
        <div class="card-header">Profile</div>
        <div class="card-body">
          <p class="card-text">Name: {{user.firstname}} {{user.lastname}}</p>
          <p class="card-text">Program: {{user.program}}</p>
          <p class="card-text">Semester: {{user.semester}}</p>
          <p class="card-text">Student ID: {{user.id}}</p>
          <p class="card-text">Email: {{user.email}}</p>
        </div>
      </div>
      <div class="card text-white bg-info" style="width: inherit;">
        <div class="card-header">SUBJECTS TAKEN IN THIS SEMESTER</div>
        <div class="card-body">
          <ul class="list-group list-group-flush" v-for="data in data">
            <li class="list-group-item bg-info">{{data}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-8">
      <div class="container" style="content:center" v-show="bool == true">
        <ul class="list-container">
          <li class="spinner-list">
            <!-- <spinner :loading="loading" :color="color" :size="size"></spinner> -->
            <spinner></spinner>
          </li>
        </ul>
      </div>
      <b-container fluid v-show="bool == false">
      <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
      <template>
        <b-table striped hover :items="attendedclasses" :fields="fields" :filter="filter" bordered>
          <template slot="No" slot-scope="data">
            {{data.index + 1}}
          </template>
        </b-table>
      </template>
    </b-container>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import navbar from './navbar'
import spinner from 'vue-spinner/src/MoonLoader.vue'
const baseURL = 'https://fyp-testing.herokuapp.com';
export default {
  name: 'Dashboard',
  components: {
    'spinner': spinner,
    'navbar':navbar
  },
  data() {
    return {
      fields: ['No', 'subject', 'date'],
      items: [],
      color: '#3AB982',
      size: '5px',
      data: [],
      userid: this.$session.get('id'),
      user: '',
      bool: true,
      attendedclasses: [],
      errors: [],
      filter:null,
      baseURL: process.env.VUE_APP_BASE_URI,
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    if(!this.$session.has('user')){
      this.$router.push({
        name:'Login'
      })
    }
    this.user = this.$session.get('user');
    let token = localStorage.getItem('jwtToken');
    console.log(token);
    axios.get(`${this.baseURL}/api/students/subjects/${this.$session.get('id')}/${this.user.semester}`)
      .then(response => {
        console.log(response);
        this.data = response.data.subjects
        console.log(this.data);
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
    axios.get(`${this.baseURL}/api/students/attendance/${this.$session.get('id')}/${this.user.semester}`)
      .then(response => {
        console.log(response);
        this.bool = false;
        this.attendedclasses = response.data.attendance;
      })
      .catch(e => {
        this.errors =[];
        this.errors.push(e);
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      })
    // this.getAttendance();
  },
  methods: {
    getAttendance() {
      let attendedClass = this.attendedclasses;
      let errors = this.errors;
      let id = this.$session.get('id');
      getData();
      async function getData() {
        try {
          const response = await axios.get(`${this.baseURL}/api/students/attendance/${id}`);
          console.log(response);
          console.log(response.data);
          attendedClass = response.data;
        } catch (e) {
          this.errors =[];
          console.log(e);
          errors.push(e);
        }
      }
    }
  }
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
