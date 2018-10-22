<template>
  <div id="body" class="container">
  <navbar></navbar>
  <div class="container">
    {{value}}
    <qcode :value="value" :size="size" level="H"></qcode>
  </div>
</div>
</template>

<script>
import navbar from './navbar'
import axios from 'axios'
import qcode from 'qrcode.vue'

export default {
  name: 'QrCode',
  components: {
    'navbar': navbar,
    'qcode':qcode
  },
  data() {
    return {
      userid: this.$session.get('id'),
      value:'Enter the subject',
      size:300,
      baseURL:process.env.VUE_APP_BASE_URI,
    }
  },
  created() {
    let token = this.$route.query.token;
    let sub = this.$route.query.sub;
    let date = this.$route.query.date;
    let week = this.$route.query.week;
    let identifier = this.$route.query.identifier;
    let hours = this.$route.query.hours;
    this.value = `http://${location.host}/lecturer/Qresponse/${token}/${sub}/${date}/${week}/${identifier}`;
    this.date = this.$route.query.date;
  }
}
</script>
<style>
#body {
  margin-top: 60px;
}
</style>
