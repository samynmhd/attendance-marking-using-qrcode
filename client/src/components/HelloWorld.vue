<template>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return {
      baseURL: process.env.VUE_APP_BASE_URI,
    }
  },
  created(){
    console.log(process.env.VUE_APP_BASE_URI);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
}
</style>
