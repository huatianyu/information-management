import Vue from 'vue';
// import router from './router';
// import store from './store';
import './components'
import App from './app.vue';
import './registerServiceWorker';
// import vuetify from './plugins/vuetify';
import vuetify from '@/plugins/vuetify'  //兼容edge写法

import iView from 'iview';
import { router } from './router/index';
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';
import './theme.less';

import Ajax from './lib/ajax';
import Util from './lib/util';
import SignalRAspNetCoreHelper from './lib/SignalRAspNetCoreHelper';
import Component from 'vue-class-component'
import Print from 'vue-print-nb'
// import hzqingVueTimeline from 'hzqing-vue-timeline'
import VueFilter from 'vue-filter';


// Plugins
import './plugins'
Vue.config.productionTip = false;



// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])


Vue.use(iView);
Vue.use(Print);// 注册

// Vue.use(hzqingVueTimeline)
Vue.use(VueFilter);
Vue.prototype.mywindow = window;
import store from './store/index';
Vue.config.productionTip = false;
Vue.config.devtools = true;

import { appRouters, otherRouters } from './router/router';
if (!abp.utils.getCookieValue('Abp.Localization.CultureName')) {
  let language = navigator.language;
  // let language='zh-Hans';
  abp.utils.setCookieValue('Abp.Localization.CultureName', language, new Date(new Date().getTime() + 5 * 365 * 86400000), abp.appPath);
}

Ajax.get('/AbpUserConfiguration/GetAll').then(data => {
  Util.abp = Util.extend(true, Util.abp, data.data.result);
  new Vue({
    render: h => h(App),
    vuetify,
    router: router,
    store: store,
    data: {
      currentPageName: ''
    },
    async mounted() {
      this.currentPageName = this.$route.name as string;
      await this.$store.dispatch({
        type: 'session/init'
      })
      if (!!this.$store.state.session.user && this.$store.state.session.application.features['SignalR']) {
        if (this.$store.state.session.application.features['SignalR.AspNetCore']) {
          SignalRAspNetCoreHelper.initSignalR();
        }
      }
      this.$store.commit('app/initCachepage');
      this.$store.commit('app/updateMenulist');

    },
    created() {
      let tagsList: Array<any> = [];
      appRouters.map((item) => {
        if (item.children.length <= 1) {
          tagsList.push(item.children[0]);
        } else {
          tagsList.push(...item.children);
        }
      });
      this.$store.commit('app/setTagsList', tagsList);
    }
  }).$mount('#app')
})
