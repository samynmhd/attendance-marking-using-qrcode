<template>
<div id="body" class="container-fluid">
  <navbar></navbar>
  <div class="form-group col-md-4">
    <h1>Create Qr Code</h1>
  </div>
  <div class="container-fluid">
    <div class="form-group col-md-4">
      <label for="subs">Select the Subject</label>
      <select class="form-control" name="data" v-model="data.sub">
        <template v-for="subs in test">
          <option v-for="sub in subs" :value="sub.subname">{{sub.subname}}</option>
        </template>
      </select>
    </div>
    <div class="form-group col-md-4">
      <label for="week">Week</label>
      <input type="text" name="week" v-model="data.week" class="form-control">
    </div>
    <div class="form-group col-md-4">
      <label for="identifier">Registered On</label>
      <template>
          <div>
            <label for="Month">Month</label>
            <b-form-select v-model="month" :options="options" class="mb-3" />
          </div>
          <div>
            <label for="year">Year</label>
            <b-form-input type="number" v-model="year" placeholder="please enter a number"></b-form-input>
          </div>
        </template>
    </div>
    <div class="form-group col-md-4">
      <label for="Hours">Hours</label>
      <select class="form-control" name="hours" v-model="data.hours">
        <option value="select">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <div class="form-group col-md-4">
      <input type="submit" name="submit" value="generate" class="btn btn-outline-primary btn-xs" @click="addToApi"><br>
    </div>
  </div>
</div>
</template>

<script>
import navbar from './navbar'
import axios from 'axios'
import qcode from 'qrcode.vue'
import crypto from 'crypto'

export default {
  name: 'QrCode',
  components: {
    'navbar': navbar,
    'qcode': qcode
  },
  data() {
    return {
      month: null,
      year: '',
      userid: this.$session.get('id'),
      data: {
        sub: '',
        token: '',
        date: '',
        week: '',
        identifier: '',
        hours:'select'
      },
      value: 'Enter the subject',
      size: 300,
      errors: [],
      info: '',
      response: [],
      test: [],
      user: '',
      bool: true,
      options: [{
          value: null,
          text: 'Please select an Option'
        },
        {
          value: 'Jan',
          text: 'Jan'
        },
        {
          value: 'Feb',
          text: 'Feb'
        },
        {
          value: 'March',
          text: 'March'
        },
        {
          value: 'April',
          text: 'April'
        },
        {
          value: 'May',
          text: 'May'
        },
        {
          value: 'June',
          text: 'June'
        },
        {
          value: 'July',
          text: 'July'
        },
        {
          value: 'August',
          text: 'August'
        },
        {
          value: 'September',
          text: 'September'
        },
        {
          value: 'October',
          text: 'October'
        },
        {
          value: 'November',
          text: 'November'
        },
        {
          value: 'December',
          text: 'December'
        },
      ],
      baseURL:process.env.VUE_APP_BASE_URI,
    }
  },
  created() {
    if (!this.$session.has('jwt')) {
      this.$router.push({
        name: 'LectLogin'
      })
    } else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      this.user = this.$session.get('user');
      let test = this.test;
      console.log("im herers");
      console.log(this.baseURL);
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
          this.errors = [];
          this.errors.push(err);
        })

    }

  },
  methods: {
    addZ(n) {
      return n < 10 ? '0' + n : '' + n;
    },
    addToApi() {
      console.log(this.data);
      crypto.randomBytes(20, (err, buff) => {
        let token = buff.toString('hex');
        let sub = this.data.sub;
        let week = this.data.week;
        let identifier = this.month + this.year;
        let hours = this.data.hours;
        let date = new Date();
        let day = this.addZ(date.getDate());
        let month = this.addZ((date.getMonth() + 1));
        console.log(day);
        console.log(month);
        let m = date.getMonth();
        let y = date.getFullYear();
        let newData = {
          sub: sub,
          token: token,
          date: day + '' + month + '' + y,
          week: week,
          identifier: identifier,
          hours: hours
        }
        console.log(newData);
        axios.post(`${this.baseURL}/api/lect/qrdata`, newData)
          .then(res => {
            console.log(res.data);
            this.$router.push({
              path: 'QrCode',
              query: {
                token: newData.token,
                sub: newData.sub,
                date: newData.date,
                week: newData.week,
                identifier: newData.identifier
              }
            });
          })
          .catch(err => {
            this.errors = [];
            console.log(err);
            this.errors.push(err);
            if (err.response.status == 401) {
              this.$router.push({
                name: 'Login'
              })
            }
          })
      })
    }
  }
}
</script>
<style scoped>
#body {
  margin-top: 60px;
}
h1 {
  color: #1fa67b;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
}
</style>
