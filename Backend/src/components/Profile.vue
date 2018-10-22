<template>
<div class="container-fluid" id="body">
  <navbar/>
  <template>
    <div v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <div class="col-md-4">
      <b-form>
        <h2>Profile</h2>
        <b-form-group label="First Name:">
          <b-form-input type="text" v-model="form.firstname"  placeholder="First Name"></b-form-input>
        </b-form-group>
        <b-form-group label="Last Name:">
          <b-form-input type="text" v-model="form.lastname" placeholder="Last Name"></b-form-input>
        </b-form-group>
        <b-form-group label="ID:">
          <b-form-input type="text" v-model="form.id" placeholder="Student ID" disabled></b-form-input>
        </b-form-group>
        <b-form-group label="Email:">
          <b-form-input type="email" v-model="form.email"  placeholder="Email"></b-form-input>
        </b-form-group>
        <b-form-group label="Semester:">
          <b-form-input type="text" v-model="form.semester" placeholder="Semester"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" v-on:click="show">Submit</b-button>
      </b-form>
    </div>
  </template>
</div>
</template>

<script>
import axios from 'axios'
import spinner from 'vue-spinner/src/MoonLoader.vue'
import navbar from './navbar'
const baseURL = 'https://fyp-testing.herokuapp.com';
export default {
  name: 'Dashboard',
  components: {
    'spinner': spinner,
    'navbar':navbar
  },
  data() {
    return {
      user: this.$session.get('user'),
      form: {
        firstname:'',
        lastname:'',
        id:'',
        email:'',
        semester:'',
        errors:[]
      },
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    this.form.firstname = this.user.firstname;
    this.form.lastname = this.user.lastname;
    this.form.id = this.user.id;
    this.form.email = this.user.email;
    this.form.semester = this.user.semester;
  },
  methods: {
    show(evt){
      evt.preventDefault();
      console.log(this.form);
      console.log(this.user);
      axios.post(`${baseURL}/api/students/updateuser/${this.user._id}`,this.form)
        .then(res=>{
          const user = res.data;
          this.$session.set('user',user);
        })
        .catch(err=>{
          this.errors =[];
          this.errors.push(err);
          if(this.err.status === 401){
            this.$router.push({
              name:'Login'
            })
          }
        })
    }
  }
}
</script>
<style scoped>
#body {
  margin-top: 20px;
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
