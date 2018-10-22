<template>
<div class="container-fluid" id="body">
  <navbar></navbar>
  <div>
    <h1>View Programs</h1>
  </div>
  <div class="row">
    <div v-if="errors && errors.length">
      <div v-for="error in errors" class="alert alert-danger">
        {{error.response.data.msg}}
      </div>
    </div>
    <template>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-table striped hover bordered small :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDec" :busy.sync="isBusy" :filter="filter" @filterd="onFiltered">
        <template slot="show_details" slot-scope="row">
          <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>
          <b-form-checkbox @click.native.stop @change="row.toggleDetails" v-model="row.detailsShowing" hidden>
          </b-form-checkbox>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Subjects:</b></b-col>
              <b-list-group>
              <template v-for="sub in row.item.subjects">
                <b-list-group-item>{{sub.subcode}} | {{sub.subname}} <b-button size="sm" variant="danger" v-on:click="del(row.item.courseName,row.item.semester,sub.subcode,sub.subname)">Delete</b-button></b-list-group-item>
              </template>
              </b-list-group>
            </b-row>
            <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
          </b-card>
        </template>
      </b-table>
    </template>
  </div>
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
      errors:[],
      fields:[{key:'schoolName',sortable: true},'courseName',{key:'semester',sortable: true},'show_details'],
      items:[],
      sortBy:'semester',
      sortDec:false,
      isBusy: false,
      filter:null,
      value:'',
    }
  },
  async created(){
    this.isBusy  = true;
    const res = await axios.get(`${baseURL}/api/admin/getTree`);
    console.log(res);
    this.items = res.data;
    this.isBusy = false;

  },
  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    del(cn,sem,sc,sn){
      let data = {
        courseName:cn,
        semester:sem,
        subcode:sc,
        subname:sn
      }
      axios.post(`${baseURL}/api/admin/deletesubject/`,data)
        .then(res=>{
          this.info = res.data.msg;
        })
        .catch(err=>{
          this.errors = [];
          this.errors.push(err);
        })
    }
  }
}
</script>
<style scoped>
#body {
  margin-top: 60px;
  width: auto;
}
h1 {
  color: #1fa67b;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 20px;
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
