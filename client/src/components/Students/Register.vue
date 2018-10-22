<template>
<div class="container-fluid">
  <div class="text-center">
    <h1 class="nice">Registration Form</h1>
  </div>
  <!-- <div v-if="errors && errors.length">
    <div v-for="error in errors">
      <div class="alert alert-danger" role="alert">
        {{error.response.data.msg}}
      </div>
    </div>
  </div> -->
  <form class="form-horizontal" @submit="register">
    <!-- Text input-->
    <div class="form-group">
      <label class="col-md-4 control-label" for="firstname">First Name</label>
      <div class="col-md-4">
        <input v-model="firstname" type="text" placeholder="First Name" class="form-control input-md" required="">
      </div>
      <label class="col-md-4 control-label" for="lastname">Last Name</label>
      <div class="col-md-4">
        <input v-model="lastname" type="text" placeholder="Last Name" class="form-control input-md" required="">
      </div>
      <label class="col-md-4 control-label" for="id">ID</label>
      <div class="col-md-4">
        <input v-model="username" type="text" placeholder="Student Id" v-bind:class="{'form-control input-md':col,'bg-danger text-white':iddanger,'bg-transparent text-dark':idprimary}" required="" ref="id">
      </div>
      <label class="col-md-4 control-label" for="id">programm</label>
      <div class="col-md-4">
        <select class="form-control input-md" v-model="program">
          <option value="CS">Computer Science</option>
          <option value="CE">Computer Engineering</option>
        </select>
      </div>
      <label class="col-md-4 control-label" for="id">School</label>
      <div class="col-md-4">
        <select class="form-control input-md" v-model="school">
          <option value="SOSE">SOSE</option>
        </select>
      </div>
      <label class="col-md-4 control-label" for="id">semester</label>
      <div class="col-md-4">
        <select class="form-control input-md" v-model="semester">
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    </div>
    <!-- Gender Input -->
    <div class="form-group">
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
    <!-- Email input-->
    <div class="form-group">
      <label class="col-md-4 control-label" for="email">Email</label>

      <div class="col-md-4">
        <input id="email" v-model="email" type="email" placeholder="Email" v-bind:class="{'form-control input-md':col,'bg-danger text-white':danger,'bg-transparent text-dark':primary}" required="" ref="email">
      </div>
    </div>
    <!-- School input-->
    <div class="form-group">
      <label class="col-md-4 control-label" for="password">password</label>

      <div class="col-md-4">
        <input id="password" v-model="password" type="password" placeholder="password" class="form-control input-md" required="">
      </div>
    </div>
    <!-- Button (Double) -->
    <div class="form-group">
      <label class="col-md-4 control-label" for="button1id"></label>

      <div class="col-md-8">
        <button type="submit" class="btn btn-success" @click="register">Save</button>
        <a id="cancel" name="cancel" class="btn btn-danger" href="/">Cancel</a>
      </div>
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
      baseURL: process.env.VUE_APP_BASE_URI,
    }
  },
  created() {
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
      axios.post(`${this.baseURL}/api/auth/register`, data).then((res) => {
        this.$router.push({
          name: 'Login'
        });
      }).catch((err) => {
        console.log(err);
        this.errors.push(err);
      })
    },
    showMyDiv() {
      console.log(this.$refs.email);
    }
  }
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
