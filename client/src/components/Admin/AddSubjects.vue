<template>
<section id="login">
  <div class="container-fluid" id="body">
    <navbar></navbar>
    <div>
      <h1>Add Subjects</h1>
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
    <div class="form-group col-md-4" v-show="school === 'SOSE'">
      <label for="course">Course</label>
      <template v-for="val in response">
      <select class="form-control" name="course" v-if="val.schoolName == 'SOSE'" v-model="course">
          <option  v-for="value in val.course" :value="value.initial">{{value.coursename}}</option>
      </select>
    </template>
    </div>
    <div class="form-group col-md-4" v-show="school === 'SOMB'">
      <label for="course">Course</label>
      <template v-for="val in response">
      <select class="form-control" name="course" v-if="val.schoolName == 'SOMB'" v-model="course">
          <option  v-for="value in val.course" :value="value.initial">{{value.coursename}}</option>
      </select>
    </template>
    </div>
    <div class="form-group col-md-4">
      <label>Semester</label>
      <select class="form-control" v-model="semester">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="SS">SS</option>
      </select>
    </div>
    <div class="form-group col-md-4" v-for="(row, index) in rows" id="subdiv">
      <label>Subject Name</label>
      <input type="text" class="form-control" v-model="row.subcode" placeholder="subject code">
      <input type="text" class="form-control" v-model="row.subname" placeholder="subject name">
      <div class="form-group">
        <button class="btn btn-danger" v-on:click="deletRow(index)">Delete</button>
      </div>
    </div>
    <div class="form-group col-md-4">
      <button class="btn btn-primary" v-on:click="addRow()">Click to add subject(s)</button>
    </div>
    <div class="form-group col-md-4">
      <button class="btn btn-success" @click="addToApi" >Submit</button>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import navbar from './navbar';
const baseURL = `https://${location.host}`;
export default {
  name: 'AdminLogin',
  components: {
    'navbar': navbar
  },
  data() {
    return {
      school: '',
      course: '',
      semester: '',
      subject: [],
      errors: [],
      rows: [],
      response: [],
      info:'',
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
        subname:'',
        subcode:'',
      });
    },
    deletRow: function(index) {
      this.rows.splice(index, 1);
    },
    addToApi(evt){
      evt.preventDefault();
      let data = {
        courseName: this.course,
        semester: this.semester,
        schoolName: this.school,
        subject:this.rows
      }
      if(this.hasNull(data)){
        this.errors =[];
        this.errors.push({
          response:{
            data:{
              msg:"Fields can't be empty"
            }
          }
        })
      } else {
        console.log(data);
        axios.post(`${this.baseURL}/api/admin/addsubjects`,data)
        .then(res=>{
          this.rows = [];
          this.info = res.data.msg;
        })
        .catch(err=>{
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
#subdiv {
  border-radius: 1px;
  border-color: black;
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
