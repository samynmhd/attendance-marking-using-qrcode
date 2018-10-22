<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div class="container" v-if="errors && errors.length">
    <div v-for="error in errors" class="alert alert-danger">
      {{error.response.data.msg}}
    </div>
  </div>
  <div>
    <h1>Attendance</h1>
  </div>
  <div class="row">
    <div class="col-md-2 col-sm-6">
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
          <!-- <div class="form-group">
            <label for="date">Enter the date</label>
            <input class="form-control" type="text" name="subject" v-model="date" placeholder="DDMMYY 22072018">
          </div> -->
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
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <input class="form-control mt-2" type="text" name="regmonthyear" v-model="year" placeholder="year eg: '18'">
          </div>
        </div>
        <div class="card-footer border-dark">
          <button class="btn btn-outline-primary btn-block" type="button" name="button" @click="find">Find</button>
          <button class="btn btn-outline-info btn btn-block" v-print="'#printTable'" v-show="bool == false">Print</button>
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
    <div class="container col-4 col-sm-6 col-md-10" id="printTable" v-show="bool == false">
      <h1>ATTENDANCE SHEET</h1>
      <table class="table small table-bordered" caption-top>
        <caption>
          {{this.subject}}
        </caption>
        <tr>
          <th>No</th>
          <th>ID</th>
          <th rowspan="3">Name</th>
          <th>Semester</th>
          <th>Week</th>
          <template v-for="(week,index) in attendaceToken">
            <th>{{week.week}}</th>
          </template>
        </tr>
        <tr>
          <th class="table-secondary"></th>
          <th colspan="3" class="table-secondary"></th>
          <th>Date</th>
          <template v-for="(date,index) in attendaceToken">
            <th>{{date.date}}</th>
          </template>
        </tr>
        <tr>
          <th class="table-secondary"></th>
          <th colspan="3" class="table-secondary"></th>
          <th>Hours</th>
          <template v-for="hours in attendaceToken">
            <th>{{hours.hours}}</th>
          </template>
        </tr>
        <tr v-for="(stud,index) in data">
          <td>{{index + 1}}</td>
          <td>{{stud.id}}</td>
          <td>{{stud.firstname}} {{stud.lastname}}</td>
          <td>{{stud.sem}}</td>
          <td class="table-secondary"></td>
          <template v-for="att in stud.attendance">
            <template v-for="date in attendaceToken">
              <td v-if="att.date == date.date && att.subject == subject">P</td>
              <!-- <td v-else="att.subject != subject">A</td> -->
            </template>
          </template>
        </tr>
      </table>
    </div>
    <!-- <div class="container tt" v-show="bool == false">
      <h1>ATTENDANCE SHEET</h1>
      <table class="table small table-bordered">
        <caption>
          {{this.subject}}
        </caption>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>ID</th>
          <th>Semester</th>
          <th>Week</th>
          <template v-for="data in attendaceToken">
            <th>{{data.week}}</th>
          </template>
        </tr>
        <tr>
          <th></th>
          <th colspan="3"></th>
          <th>Date</th>
          <template v-for="data in attendaceToken">
            <th>{{data.date}}</th>
          </template>
        </tr>
        <tr>
          <th></th>
          <th colspan="3"></th>
          <th>Hours</th>
          <template v-for="data in attendaceToken">
            <th>{{data.hours}}</th>
          </template>
        </tr>
        <tr v-for="(student, index) in data">
          <td>{{++index}}</td>
          <td>{{student.firstname}} {{student.lastname}}</td>
          <td>{{student.id}}</td>
          <td>{{student.sem}}</td>
          <td></td>
          <template v-for="data in newAtt">
            <td v-if="data.id == student.id && data.subject == subject" :placeholder="ko(student.id)">P{{attCount}}</td>
            <td v-else >A{{attCount}}</td>
          </template>
        </tr>
        <template v-for="(data, index) in newAtt">
        <tr>
          <td>{{++index}}</td>
          <td></td>
          <td>{{data.id}}</td>
          <td>{{data.Semester}}</td>
          <td></td>
          <td v-if="data.subject == subject">P</td>
          <td v-else>A</td>
        </tr>
      </template>

      </table>
    </div> -->
    <!-- {{students}} -->
    {{studentId}}
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import navbar from './navbar'
import spinner from 'vue-spinner/src/SyncLoader.vue'
import spy from 'vue-spinner/src/PulseLoader.vue'
// const baseURL = 'https://fyp-testing.herokuapp.com'
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
      baseURL: process.env.VUE_APP_BASE_URI,
      tokenCount: 0,
      project: [],
      newAtt: [],
      attCount: 0,
      percentage: 0,
      ids: [],
      studentId: '',
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    let test = this.test;
    axios.get(`${this.baseURL}/api/lect/subjects/${this.$session.get('user').school}`)
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
    axios.get(`${this.baseURL}/api/lect/getUser`)
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
    p(a, t) {
      let total = 0;
      total = (a / t) * 100;
      this.percentage = total;
    },
    countInc() {
      this.attCount == this.attCount++;
      return;
    },
    find(evt) {
      evt.preventDefault();
      this.regdate = `${this.month}${this.year}`
      this.getToken();
      if (this.subject == '' && this.regdate == '') {
        this.errors = [];
        this.errors.push({
          response: {
            data: {
              msg: 'Please Enter value in the subject field'
            }
          }
        })
      } else {
        console.log("insde the final else");
        this.errors = [];
        axios.get(`${this.baseURL}/api/lect/findAttendance/test/${this.subject}/${this.regdate}`)
          .then(res => {
            this.data = res.data;
            this.bool = false;
          })
          .catch(err => {
            this.errors = [];
            this.errors.push(err);
          })
        axios.get(`${this.baseURL}/api/lect/count/${this.subject}/${this.regdate}`)
          .then(res => {
            console.log(res);
            let token = 0;
            res.data.forEach((items) => {
              console.log(items);
              token = items.tokens;
            })
            console.log(token);
            this.tokenCount = token;
            // this.tokenCount = res.data.tokens;
          })
          .catch(err => {
            console.log(err);
          })
        axios.get(`${this.baseURL}/api/lect/project/${this.subject}/${this.regdate}`)
          .then(res => {
            console.log(res);
            this.project = res.data;
          })
          .catch(err => {
            console.log(err);
          })
        axios.get(`${this.baseURL}/api/lect/findAttendance/r/${this.subject}/${this.regdate}`)
          .then(res => {
            console.log(res);
            this.newAtt = res.data;
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    ko(id) {
      console.log("inside ko");
      // console.log("inside sendId");
      let count = 0;
      this.newAtt.forEach(items => {
        if (items.id == id && items.subject == this.subject) {
          count++;
        }
      })
      console.log(count);
      return this.attCount = count;
      this.bool = false;
    },
    getData(id) {
      let ids = id;
      axios.get(`${this.baseURL}/api/admin/getstudent/${ids}`)
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
      axios.get(`${this.baseURL}/api/lect/findstudentesregforsubject/${this.subject}`)
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
      axios.get(`${this.baseURL}/api/lect/getToken/${this.subject}/${this.regdate}`)
        .then(res => {
          console.log(res);
          this.attendaceToken = res.data;
        })
        .catch(err => {
          this.errors = [];
          this.errors.push(err);
        })
    }
  },
  computed: {
    countA: function() {
      let attendance;
      attendance = this.newAtt;
      let count = 0;
      attendance.forEach((item) => {
        if (item.id == this.studentId && item.subject == this.subject) {
          return count++;
        }
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

h1 {
  color: #1fa67b;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
}

.col-sm-6 {
  margin-top: 10px;
}

.list-container {
  background: #fff;
}

.tt {
  margin-left: 318px;
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

@page {
  size: landscape;
}
</style>
