import Vue from 'vue'
import App from './App'
import router from './router'
import session from 'vue-session'
import BootStrapVue from 'bootstrap-vue'
import Print from 'vue-print-nb'
import axios from 'axios'

var options = {
  persist: true
}
Vue.config.productionTip = false
Vue.use(session,options);
Vue.use(BootStrapVue);
Vue.use(Print);
Vue.use(axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
