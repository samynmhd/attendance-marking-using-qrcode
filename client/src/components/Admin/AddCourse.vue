<template>
<section id="login">
  <div class="container-fluid" id="body">
    <navbar></navbar>
    <div>
      <h1>Add Program</h1>
    </div>
    <div v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <div v-if="info && info.length">
      <div class="alert alert-success">
        {{info}}
      </div>
    </div>
    <div class="form-group col-md-4">
      <label for="school">School</label>
      <select class="form-control" name="school" v-model="school">
        <option v-for="(result, index) in response" :value="result.schoolName">{{result.schoolName}}</option>
      </select>
    </div>
    <!-- <div class="form-group col-md-4"> -->
      <!-- <div class="form-group">
        <label for="subject">Course</label>
        <input type="text" class="form-control" v-model="course" placeholder="course name eg:'Computer Science'">
      </div>
      <div class="form-group">
        <label for="initial">Initial</label>
        <input type="text" class="form-control" v-model="initial" placeholder="subject initial eg: 'CS'">
      </div> -->
      <!-- <div class="form-group">
        <label for="type">Course Level</label>
        <select class="form-control" name="level" v-model="type">
          <option value="UG">Undergraudate</option>
          <option value="PG">Postgraduate</option>
        </select>
      </div> -->
    <!-- </div> -->
    <div class="form-group col-md-4" v-for="(row, index) in rows">
      <div class="form-group">
        <label>Course Name</label>
        <input type="text" class="form-control" v-model="row.coursename" placeholder="course name eg:'Computer Science'">
      </div>
      <div class="form-group">
        <label>Course Initial</label>
        <input type="text" class="form-control" v-model="row.initial" placeholder="course initial eg: 'CS'">
      </div>
      <div class="form-group">
        <label for="type">Course Level</label>
        <select class="form-control" name="level" v-model="row.courseType">
          <option value="UG">Undergraudate</option>
          <option value="PG">Postgraduate</option>
        </select>
      </div>
      <div class="form-group">
        <button class="btn btn-danger form-control" v-on:click="deletRow(index)">Delete the program</button>
      </div>
    </div>
    <!-- <div class="form-group col-md-6">
      <label for="school">Create School</label>
      <input type="text" name="school" v-model="newSchool" placeholder="eg: SOSE, SOMB" class="form-control">
    </div> -->
    <div class="form-group col-md-4">
      <button class="btn btn-primary" v-on:click="addRow()">Add more porgrams</button>
    </div>
    <div class="form-group col-md-4">
      <button class="btn btn-success" @click="addToApi">Submit</button>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import navbar from './navbar'
const baseURL = `https://${location.host}`;
export default {
  name: 'AddCourse',
  components: {
    'navbar': navbar
  },
  data() {
    return {
      school: '',
      course: '',
      initial: '',
      courseType:'',
      errors: [],
      rows: [],
      response: [],
      info: '',
      newSchool:'',
      baseURL:process.env.VUE_APP_BASE_URI,
    }
  },
  created() {
    const headers = axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    if(!this.$session.has('admin')){
      this.$router.push({
        name:'AdminLogin'
      });
    } else {
      axios.get(`${this.baseURL}/api/admin/getSchool`)
      .then(resp => {
        this.response = resp.data;
        console.log(this.response);
      })
      .catch(err => {
        this.errors =[];
        this.errors.push(err);
      })
    }
  },
  methods: {
    addRow: function() {
      const elem = document.createElement('input');
      this.rows.push({
        coursename: '',
        courseType:'',
        initial: '',
      });
    },
    deletRow: function(index) {
      this.rows.splice(index, 1);
    },
    addToApi(evt) {
      const self = this;
      evt.preventDefault();
      let data = {
        schoolName: this.school,
        course:this.rows
      }
      console.log(data);
      if (this.hasNull(data)) {
        this.errors =[];
        this.errors.push({
          response: {
            data: {
              msg: "Fields can't be empty"
            }
          }
        })
      } else {
        console.log(data);
        axios.post(`${this.baseURL}/api/admin/addSchool`, data)
          .then(res => {
            this.info = res.data.msg;
          })
          .catch(err => {
            this.errors =[];
            this.errors.push(err);
          })
      }
    },
    hasNull(target) {
      for (var member in target) {
        if (target[member] == "")
          return true;
      }
      return false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body {
  margin-top: 60px;
  width: auto;
}
#login .form-wrap {
  width: auto;
  margin: 0 auto;
}

h1 {
  color: #1fa67b;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
}

#login .form-group {
  margin-bottom: 25px;
}

#login .btn-outline-success {
  font-size: 14px;
  margin-bottom: 20px;
}

#login .forget {
  font-size: 13px;
  /* text-align: center;
	display: block; */
}

/*    --------------------------------------------------
	:: Inputs & Buttons
	-------------------------------------------------- */

.form-control {
  color: #212121;
}

/* .btn-custom {
    color: #fff;
	background-color: #1fa67b;
} */

/* .btn-custom:hover,
.btn-custom:focus {
    color: #fff;
} */

/*    --------------------------------------------------
    :: Footer
	-------------------------------------------------- */

#footer {
  color: #6d6d6d;
  font-size: 12px;
  text-align: center;
}

#footer p {
  margin-bottom: 0;
}

#footer a {
  color: inherit;
}
</style>
