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
  <div class="container" style="content:center" v-show="bool == true">
    <ul class="list-container">
      <li class="spinner-list">
        <!-- <spinner :loading="loading" :color="color" :size="size"></spinner> -->
        <spinner></spinner>
      </li>
    </ul>
  </div>
  <form class="form-horizontal" @submit="register" v-show="bool == false && hide == false">
    <label class="col-md-4 control-label" for="firstname">First Name</label>
    <div class="form-group col-md-4">
      <input type="text" class="form-control input-md" name="firstname" v-model="firstname" required="">
    </div>
    <label class="col-md-4 control-label" for="lastname">Last Name</label>
    <div class="form-group col-md-4">
      <input type="text" class="form-control input-md" name="lastname" v-model="lastname" required="">
    </div>
    <label class="col-md-4 control-label" for="username">Lecturer ID</label>
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
import spinner from 'vue-spinner/src/MoonLoader.vue';
export default {
  name: 'Registration',
  components: {
    'spinner': spinner
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      gender: '',
      username: '',
      school: '',
      password: '',
      response: '',
      usertype: 'Lecturer',
      primary: false,
      col: true,
      errors: [],
      baseURL: '',
      response: [],
      bool: true,
      hide: true,
    }
  },
  async created() {
    try {
      const token = await axios.get(`https://${location.host}/api/admin/lectreg/${this.$route.params.token}`)
      console.log(token);
      this.bool = false;
      this.hide = false;
    } catch (err) {
      this.errors = [];
      this.errors.push(err);
      this.bool = false;
      return this.hide = true;
    }
    try {
      const res = await axios.get(`https://${location.host}/api/admin/getSchool`);
      this.response = res.data;
      this.bool = false;
      this.hide = false;
      console.log(this.response);
    } catch (err) {
      this.errors = [];
      this.errors.push(err);
      this.bool = false;
      this.hide = true;
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
        school: this.school,
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
        axios.post(`https://${location.host}/api/admin/lectreg/${this.$route.params.token}`, data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$router.push({
                name: 'Login'
              });
            }
          }).catch((err) => {
            console.log(err);
            this.errors = [];
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
