<template>
<div id="body" class="container">
  <div v-if="errors && errors.length">
    <div v-for="error in errors" class="alert alert-danger">
      {{error.response.data.msg}}
    </div>
  </div>
  <div v-if="info && info.length">
    <div v-for="info in info" class="alert alert-success">
      {{info}}
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
  <div>
    <ul class="list-group">
      <li class="list-group-item list-group-item-info">
        Subject:{{this.$route.params.sub}} Student id: {{this.$session.get('id')}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import spinner from 'vue-spinner/src/PacmanLoader.vue'

export default {
  name: 'QrCode',
  components: {
    'spinner': spinner
  },
  data() {
    return {
      errors: [],
      info: [],
      color: '#3AB982',
      size: '5px',
      bool: true
    }
  },
  async created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    let user = this.$session.get('user');
    if (!this.$session.has('user')) {
      this.$router.push({
        name: 'Login'
      })
    } else {
      console.log("Inside the create method");
      try {
        console.log("inside the try condition");
        let uid = encodeURIComponent(this.$session.get('id'));
        let token = encodeURIComponent(this.$route.params.token);
        let sub = encodeURIComponent(this.$route.params.sub);
        let date = encodeURIComponent(this.$route.params.date);
        let week = encodeURIComponent(this.$route.params.week);
        let identifier = encodeURIComponent(this.$route.params.identifier);
        let sem = user.semester;
        const response = await axios.post(`https://${location.host}/api/students/qrdata/test/${token}/${sub}/${uid}/${sem}/${date}/${week}/${identifier}`);
        console.log(response);
        this.bool = false;
        this.info.push(response.data.msg);
        console.log(this.info)
      } catch (e) {
        console.log(e);
        this.errors = [];
        this.bool = false;
        this.errors.push(e);
        if (e.response.status === 401) {
          this.$router.push({
            name: 'Login'
          })
        }
      }
    }
  }
}
</script>
<style scoped>
#body {
  margin-top: 60px;
}

#spinner {
  margin-left: 20px;
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

  width: 150px;
  height: 200px;
  webkit-align-items: center;
  align-items: center;
  webkit-justify-content: center;
  justify-content: center;
}
</style>
