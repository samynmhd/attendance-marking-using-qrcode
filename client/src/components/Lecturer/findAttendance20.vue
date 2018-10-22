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
            <select class="form-control" v-model="subject">
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
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <td>No</td>
            <td>Id</td>
            <td>Name</td>
            <td>Attended Classes</td>
            <td>Total Classes</td>
            <td>Percentage</td>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="(data, index) in data">
            <template v-for="att in data.subjects">
              <template v-if="att == subject">
              <td>{{++index}}</td>
              <td>{{data.id}}</td>
              <td>{{data.firstname}} {{data.lastname}}</td>
              <td :placeholder="ko(data.id)">{{attCount}}</td>
              <td>{{tokenCount}}</td>
              <td>lo</td>
          </template>
            </template>
          </tr> -->
          <tr v-for="(student, index) in data">
            <td>{{++index}}</td>
            <td>{{student.id}}</td>
            <td>{{student.firstname}} {{student.lastname}}</td>
            <td :placeholder="ko(student.id)">{{attCount}}</td>
            <td>{{tokenCount}}</td>
          </tr>
        </tbody>

      </table>

    </div>
    {{students}}
    {{data}}
  </div>
</div>
</template>

<script>
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
      attCount: 0,
      ids:[]
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    let test = this.test;
    axios.get(`${this.baseURL}/api/lect/subjects/SOSE`)
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
    find(evt) {
      evt.preventDefault();
      this.regdate = `${this.month}${this.year}`
      this.getToken();
      this.getStudents();
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
        console.log("insde the final else");
        this.errors = [];
        axios.get(`${this.baseURL}/api/lect/findAttendance/test/${this.subject}/${this.regdate}`)
          .then(res => {
            this.data = res.data;
            res.data.forEach((items)=>{
              this.ids.push(items.id);
            })
            console.log(this.ids);
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
      }
    },
    getStudents() {
      // console.log("inside the subs");
      // console.log(this.subject);
      // // console.log(sub);
      // axios.get(`${this.baseURL}/api/lect/findstudentesregforsubject/${this.subject}`)
      //   .then(res => {
      //     console.log(res);
      //     this.students = res.data;
      //   })
      //   .catch(err => {
      //     this.errors = [];
      //     this.errors.push(err)
      //   })
      axios.get(`${this.baseURL}/api/lect/findAttendance/r/${this.subject}/${this.regdate}`)
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
          this.errors = [];
          this.errors.push(err);
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
    },
    ko(id) {
      console.log("inside ko"+id);
      let students;
      students = this.data;
      let count = 0;
      let list = [];
      students.map((value, key) => {
        list.push(value);
      })
      list.forEach((item) => {
        item.attendance.forEach((data) => {
          while (item.id == id && data.subject == this.subject) {
            count++;
            return this.attCount = count;
          }
        })
      })
      console.log(count);
      this.bool = false;
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
