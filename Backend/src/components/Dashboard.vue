<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div v-if="errors && errors.length">
    <div v-for="error in errors" class="alert alert-danger">
      {{error.response.data.msg}}
    </div>
  </div>
  <div class="row">
    <div class="col-md-4 col-sm-6">
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
      <div class="card bg-light mb-3" style="width: inherit;" v-show="bool == false">
        <div class="card-header">Attendance</div>
        <div class="card-body">
          <!-- <spinner v-show="bool==true" :loading="loading" :color="color" :size="size"></spinner> -->
          <table class="table table-hover" v-if="attendedclasses && attendedclasses.length">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Subject</th>
              </tr>
            </thead>
            <tbody v-for="data, key in attendedclasses">
              <tr>
                <th scope="row">{{++key}}</th>
                <td>{{data.date}}</td>
                <td>{{data.subject}}</td>
              </tr>
            </tbody>
          </table>
          <!-- <ul class="list-group list-group-flush" v-for="att in attendedclasses">
            <li class="list-group-item">
              <p class="card-text">Date:{{att.date}}  Subject:{{att.subject}}</p>
            </li>
          </ul> -->
        </div>
        <div class="card-body" v-else>
          <p class="card-text">No attendance</p>
        </div>
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
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    this.user = this.$session.get('user');
    let token = localStorage.getItem('jwtToken');
    let user = this.$session.get('user');
    let sem = user.semester;
    console.log(sem);
    console.log(token);
    axios.get(`https://${location.host}/api/students/subjects/${this.$session.get('id')}/${sem}`
        .then(response => {
          console.log(response);
          this.data = response.data.subjects
          console.log(this.data);
        })
        .catch(e => {
          this.errors = [];
          this.errors.push(e)
          if (e.response.status === 401) {
            this.$router.push({
              name: 'Login'
            })
          }
        }) axios.get(`https://${location.host}/api/students/attendance/${this.$session.get('id')}`)
        .then(response => {
          console.log(response);
          this.bool = false;
          this.attendedclasses = response.data.attendance;
        })
        .catch(e => {
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
              const response = await axios.get(`https://${location.host}/api/students/attendance/${id}`);
              console.log(response);
              console.log(response.data);
              attendedClass = response.data;
            } catch (e) {
              this.errors = [];
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
