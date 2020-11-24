import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';//兼容edge写法
// import Vuetify from 'vuetify';  

import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  }
});
