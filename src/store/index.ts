import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import app from './modules/app'
import session from './modules/session'
import account from './modules/account'
// import user from './modules/user'
// import role from './modules/role'
import home from './modules/home'
import patient from './modules/patient'
import program from './modules/patientTreatment/program'
import patientResource from './modules/patientTreatment/patientResource'
import targetingApplication from './modules//patientTreatment/targetingApplication'
import patientTreatmentList from './modules//patientTreatment/patientTreatmentList'
import arrangementList from './modules/arrangement/arrangementList'
import arrangementTable from './modules/arrangement/arrangementTable'
import scheduleList from './modules/schedule/scheduleList'
import scheduleTable from './modules/schedule/scheduleTable'
import registration from './modules/target/registration'
import targetResource from './modules/target/targetResource'
import planApplication from './modules/plan/planApplication'
import consent from './modules/patientTreatment/consent/consent'
import reviewList from './modules/review/reviewList'
import more from './modules/review/more'
import reviewTargetingApplication from './modules/target/reviewTargetingApplication'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
const store = new Vuex.Store({
    state: {
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        home,
        session,
        account,
        patient,
        program,
        patientResource,
        targetingApplication,
        targetResource,
        planApplication,
        consent,
        reviewList,
        more,
        patientTreatmentList,
        reviewTargetingApplication,
        arrangementList,
        arrangementTable,
        scheduleList,
        scheduleTable,

    },
    plugins: [vuexLocal.plugin]
});

export default store;