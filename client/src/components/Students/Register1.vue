<template>
<div class="container-fluid">
  <div class="text-center">
    <h1 class="nice">Registration Form</h1>
  </div>
  <div v-if="errors && errors.length">
    <div v-for="error in errors">
      <div class="alert alert-danger" role="alert">
        {{error.response.data.msg}}
      </div>
    </div>
  </div>
  <form class="form-horizontal" @submit="register">
    <label class="col-md-4 control-label" for="firstname">First Name</label>
    <div class="form-group col-md-4">
      <input type="text" class="form-control input-md" name="firstname" v-model="firstname" required="">
    </div>
    <label class="col-md-4 control-label" for="lastname">Last Name</label>
    <div class="form-group col-md-4">
      <input type="text" class="form-control input-md" name="lastname" v-model="lastname" required="">
    </div>
    <label class="col-md-4 control-label" for="username">Student ID</label>
    <div class="form-group col-md-4">
      <input type="text" class="form-control input-md" name="username" v-model="username" required="">
    </div>
    <div class="form-group col-md-4">
      <label class="col-md-4 control-label" for="checkboxes">Gender</label>
      <div class="col-md-4">
        <div class="checkbox">
          <label>
            <input v-model="gender" id="genderboxes-0" value="M" type="radio">Male
        </label>
        </div>
        <div class="checkbox">
          <label>
              <input v-model="gender" id="genderboxes-1" value="F" type="radio">Female
        </label>
        </div>
      </div>
    </div>
    <div class="form-group col-md-4">
      <label for="school">School</label>
      <select class="form-control" name="school" v-model="school" required="">
        <option v-for="(result, index) in response" :value="result.schoolName">{{result.schoolName}}</option>
      </select>
    </div>
    <div class="form-group col-md-4" v-show="school === 'SOSE'">
      <label for="course">Course</label>
      <template v-for="val in response">
      <select class="form-control" name="course" v-if="val.schoolName == 'SOSE'" v-model="program" required="">
          <option  v-for="value in val.course" :value="value.initial">{{value.coursename}}</option>
      </select>
    </template>
    </div>
    <div class="form-group col-md-4" v-show="school === 'SOMB'">
      <label for="course">Course</label>
      <template v-for="val in response">
      <select class="form-control" name="course" v-if="val.schoolName == 'SOMB'" v-model="program" required="">
          <option  v-for="value in val.course" :value="value.initial">{{value.coursename}}</option>
      </select>
    </template>
    </div>
    <div class="form-group col-md-4">
      <label for="semester">Semester</label>
      <select class="form-control" name="semester" v-model="semester" required="">
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
    <div class="form-group col-md-4">
      <label for="email">Email</label>
      <input class="form-control" type="text" name="email" v-model="email" placeholder="email" required="">
    </div>
    <div class="form-group col-md-4">
      <label for="password">Password</label>
      <input type="password" class="form-control" name="password" v-model="password" placeholder="password" required="">
    </div>
    <div class="form-group col-md-4">
      <button type="submit" class="btn btn-success" name="button" @click="register">Register</button>
    </div>
    <div class="form-group col-md-4">
      <a id="cancel" name="cancel" class="btn btn-danger" href="/">Cancel</a>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Registration',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      username: '',
      program: '',
      school: '',
      semester: '',
      password: '',
      response: '',
      usertype: 'student',
      danger: false,
      primary: false,
      col: true,
      iddanger: false,
      idprimary: false,
      errors: [],
      baseURL: '',
      response: [],
      baseURL: process.env.VUE_APP_BASE_URI,
    }
  },
  async created() {
    try {
      const res = await axios.get(`${this.baseURL}/api/admin/getSchool`);
      this.response = res.data;
      console.log(this.response);
    } catch (err) {
      this.errors.push(err);
    }
  },
  methods: {
    register(evt) {
      evt.preventDefault();
      let data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        gender: this.gender,
        id: this.username,
        program: this.program,
        school: this.school,
        semester: this.semester,
        password: this.password,
        usertype: this.usertype
      }
      if (this.hasNull(data)) {
        this.errors = [];
        return this.errors.push({
          response: {
            data: {
              msg: 'Fields cannot be empty'
            }
          }
        });
      } else {
        console.log(data);
        axios.post(`${this.baseURL}/api/auth/register`, data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$router.push({
                name: 'Login'
              });
            }
          }).catch((err) => {
            this.errors = [];
            console.log(err);
            this.errors.push(err);
          })
      }
    },
    showMyDiv() {
      console.log(this.$refs.email);
    },
    hasNull(target) {
      for (var member in target) {
        if (target[member] == "")
          return true;
      }
      return false;
    }
    // }
    // watch: {
    //   username: function(val){
    //     axios.get("http://localhost:3000/api/id/"+val).then((res)=>{
    //       console.log(res);
    //       if(res.data.id == "found"){
    //         this.idprimary = false;
    //         this.iddanger = true;
    //       } else {
    //         this.idprimary = true;
    //         this.iddanger = false;
    //       }
    //     }).catch((err)=>{
    //       console.log(err);
    //     })
    //   },
    //   email: function(val){
    //
    //     axios.get(`http://localhost:3000/api/email/`,val).then((res)=>{
    //       console.log(res);
    //       if(res.data.email == "found"){
    //         this.showMyDiv();
    //         this.primary = false;
    //         this.danger = true;
    //         console.log("hi there");
    //       } else {
    //         this.primary = true;
    //         this.danger = false
    //         console.log("dont know");
    //       }
    //     }).catch((err)=>{
    //       console.log(err);
    //     })
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
</style>
