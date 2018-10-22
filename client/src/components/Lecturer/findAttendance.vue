<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div class="row">
    <div class="container" v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <div class="col-md-4 col-sm-6">
      <div class="card border-dark mb-3" style="width: inherit;">
        <div class="card-header">Find Attendance</div>
        <div class="card-body text-dark">
          <div>
            <select class="form-control" v-model="subject">
              <template v-for="subs in test">
                <option v-for="sub in subs" :value="sub.subname">{{sub.subname}}</option>
              </template>
            </select>
            <input class="form-control" type="text" name="subject" v-model="date" placeholder="DDMMYY 22072018">
          </div>
        </div>
        <div class="card-footer border-dark">
          <button class="btn btn-outline-primary btn-block" type="button" name="button" @click="find">Find</button>
        </div>
      </div>
    </div>
    <div class="container col-12 col-sm-6 col-md-8" v-show="bool == true">
      <ul class="list-container">
        <li class="spinner-list" >
          <!-- <spinner :loading="loading" :color="color" :size="size"></spinner> -->
          <spinner></spinner>
        </li>
      </ul>
    </div>
    <div class="container col-12 col-sm-6 col-md-8" v-show="bool == false">
      <table class="table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Student ID</th>
            <th>Date</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody v-for="sub in data">
          <tr>
            <td>{{sub.subject}}</td>
            <td>{{sub.id}}</td>
            <td>{{sub.date}}</td>
            <td>{{sub.sem}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import navbar from './navbar'
import axios from 'axios'
import spinner from 'vue-spinner/src/SyncLoader.vue'
import spy from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Dashboard',
  components: {
    'navbar': navbar,
    'spinner': spinner,
    'spy':spy
  },
  data() {
    return {
      color: '#3AB982',
      size: '5px',
      data: [],
      userid: this.$session.get('id'),
      subject: '',
      date: '',
      user: '',
      bool: true,
      response: [],
      errors: [],
      test: [],
      baseURL:process.env.VUE_APP_BASE_URI,
    }
  },
  created() {
    if (!this.$session.has('jwt')) {
      this.$router.push({
        name: 'LectLogin'
      });
    } else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
      this.user = this.$session.get('user');
      let test = this.test;
      axios.get(`${this.baseURL}/api/lect/subjects/${this.user.school}`)
        .then(resp => {
          this.response = resp.data;
          test = resp.data;
          test.forEach((item) => {
            console.log(item);
            this.test.push(item.subjects);
          })
        })
        .catch(err => {
          this.errors =[];
          this.errors.push(err);
        })
    }
  },
  methods: {
    find(evt) {
      evt.preventDefault();
      if (this.subject == '' && this.date == '') {
        this.errors =[];
        this.errors.push({
          response: {
            data: {
              msg: 'Please Enter value in the subject field'
            }
          }
        })
      } else {
        if (this.subject != '' && this.date == '') {
          this.errors =[];
          let sub = encodeURIComponent(this.subject);
          axios.get(`${this.baseURL}/api/lect/findAttendance/${sub}`)
            .then(res => {
              this.data = res.data;
              this.bool = false;
            })
            .catch(err => {
              this.errors =[];
              this.errors.push(err);
            })
        } else {
          this.errors = '';
          axios.get(`${this.baseURL}/api/lect/findAttendance/${this.subject}/${this.date}`)
            .then(res => {
              this.data = res.data;
              this.bool = false;
            })
            .catch(err => {
              this.errors =[];
              this.errors.push(err);
            })
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
}
.spinner-list {
  width: 150px;
  height: 50px;
  line-height: 200px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
}
</style>
