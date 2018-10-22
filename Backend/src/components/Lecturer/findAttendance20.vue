<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div class="row">
    <div class="container" v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <div class="col-md-3 col-sm-6">
      <div class="card border-dark mb-3" style="width: inherit;">
        <div class="card-header">Find Attendance</div>
        <div class="card-body text-dark">
          <div class="form-group">
            <label for="subject">Select Subject</label>
            <select class="form-control" v-model="subject" v-on:change="getStudents">
            <!-- <select class="form-control" v-model="subject"> -->
              <template v-for="subs in test">
                <option v-for="sub in subs" :value="sub.subname">{{sub.subname}}</option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <label for="date">Enter the date</label>
            <input class="form-control" type="text" name="subject" v-model="date" placeholder="DDMMYY 22072018">
          </div>
          <div class="form-group">
            <label for="identifier">Registered On</label>
            <select class="form-control" name="month" v-model="month">
              <option value="select" selected>select</option>
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="Septempber">Septempber</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <input class="form-control" type="text" name="regmonthyear" v-model="year" placeholder="year eg: '18'">
          </div>
        </div>
        <div class="card-footer border-dark">
          <button class="btn btn-outline-primary btn-block" type="button" name="button" @click="find">Find</button>
        </div>
      </div>
    </div>
    <div class="container col-12 col-sm-6 col-md-8" v-show="bool == true">
      <ul class="list-container">
        <li class="spinner-list">
          <!-- <spinner :loading="loading" :color="color" :size="size"></spinner> -->
          <spinner></spinner>
        </li>
      </ul>
    </div>
    <div class="container col-6 col-sm-6 col-md-8" id="table" v-show="bool == false">
      <table class="table small table-bordered" caption-top>
        <caption>
          {{this.subject}}
        </caption>
        <tr>
          <th>No</th>
          <th>ID</th>
          <th rowspan="3">Name</th>
          <th>Week</th>
          <template v-for="(week,index) in attendaceToken">
            <th>{{week.week}}</th>
          </template>
        </tr>
        <tr>
          <th class="table-secondary"></th>
          <th colspan="2" class="table-secondary"></th>
          <th>Date</th>
          <template v-for="(date,index) in attendaceToken">
            <th>{{date.date}}</th>
          </template>
        </tr>
        <tr>
          <th class="table-secondary"></th>
          <th colspan="2" class="table-secondary"></th>
          <th>Hours</th>
          <template v-for="hours in attendaceToken">
            <th>{{hours.hours}}</th>
          </template>
        </tr>
        <tr v-for="(stud,index) in data">
          <td>{{index + 1}}</td>
          <td>{{stud.id}}</td>
          <td>{{stud.firstname}} {{stud.lastname}}</td>
          <td></td>
          <template v-for="att in stud.attendance">
            <template v-for="date in attendaceToken">
              <td v-if="att.date == date.date && att.subject == subject">P</td>
            </template>
          </template>
        </tr>
      </table>
    </div>
    <!-- {{students}} -->
  </div>
</div>
</template>

<script>
import axios from 'axios'
import navbar from './navbar'
import spinner from 'vue-spinner/src/SyncLoader.vue'
import spy from 'vue-spinner/src/PulseLoader.vue'
const baseURL = 'https://fyp-testing.herokuapp.com'

export default {
  name: 'Dashboard',
  components: {
    'spinner': spinner,
    'spy': spy,
    'navbar': navbar
  },
  data() {
    return {
      color: '#3AB982',
      size: '5px',
      data: [],
      subject: '',
      date: '',
      user: '',
      bool: true,
      response: [],
      errors: [],
      test: [],
      names: [],
      baseURL: 'fyp-testing.herokuapp.com',
      students: [],
      users: [],
      month: '',
      year: '',
      regdate: '',
      attendaceToken: '',
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    let test = this.test;
    axios.get(`${baseURL}/api/lect/subjects/SOSE`)
      .then(resp => {
        this.response = resp.data;
        test = resp.data;
        test.forEach((item) => {
          console.log(item);
          this.test.push(item.subjects);
        })
      })
      .catch(err => {
        this.errors = [];
        this.errors.push(err);
      })
    axios.get(`${baseURL}/api/lect/getUser`)
      .then(res => {
        console.log(res);
        this.users = res.data;
      })
      .catch(err => {
        this.errors = [];
        this.errors.push(err);
      })
  },
  methods: {
    find(evt) {
      evt.preventDefault();
      this.regdate = `${this.month}${this.year}`
      this.getToken();
      if (this.subject == '' && this.date == '') {
        this.errors = [];
        this.errors.push({
          response: {
            data: {
              msg: 'Please Enter value in the subject field'
            }
          }
        })
      } else {
        if (this.subject != '' && this.date == '' && this.regdate == '') {
          this.errors = [];
          let sub = encodeURIComponent(this.subject);
          axios.get(`${baseURL}/api/lect/findAttendance/${sub}`)
            .then(res => {
              console.log(res);
              this.data = res.data;
              this.bool = false;
            })
            .catch(err => {
              this.errors = [];
              this.errors.push(err);
            });
        } else if (this.subject != '' && this.date != '' && this.regdate == '') {
          console.log("second else");
          this.errors = [];
          axios.get(`${baseURL}/api/lect/findAttendance/${this.subject}/${this.date}`)
            .then(res => {
              this.data = res.data;
              this.bool = false;
            })
            .catch(err => {
              this.errors = [];
              this.errors.push(err);
            })
        } else {
          console.log("insde the final else");
          this.errors = [];
          axios.get(`${baseURL}/api/lect/findAttendance/test/${this.subject}/${this.regdate}`)
            .then(res => {
              this.data = res.data;
              this.bool = false;
            })
            .catch(err => {
              this.errors = [];
              this.errors.push(err);
            })
        }
      }
    },
    getData(id) {
      let ids = id;
      axios.get(`${baseURL}/api/admin/getstudent/${ids}`)
        .then(res => {
          console.log(res);
          this.names = res.data;
        })
        .catch(err => {
          this.errors = [];
          this.errors.push(err);
        })
    },
    getStudents() {
      console.log("inside the subs");
      console.log(this.subject);
      // console.log(sub);
      axios.get(`${baseURL}/api/lect/findstudentesregforsubject/${this.subject}`)
        .then(res => {
          console.log(res);
          this.students = res.data;
        })
        .catch(err => {
          this.errors = [];
          this.errors.push(err)
        })
    },
    getToken() {
      axios.get(`${baseURL}/api/lect/getToken/${this.subject}/${this.regdate}`)
        .then(res => {
          console.log(res);
          this.attendaceToken = res.data;
        })
        .catch(err => {
          this.errors = [];
          this.errors.push(err);
        })
    }
  }
}
</script>
<style scoped>
#body {
  margin-top: 60px;
  width: auto;
}

#table {
  caption-side: top;
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
