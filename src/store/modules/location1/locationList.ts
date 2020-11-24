// import { Store, Module, ActionContext } from 'vuex'
// import ListModule from '../list-module'
// import ListState from '../list-state'
// import LocationList from '../../entities/locationList'
// import Role from '../../entities/role'
// import Patient from '../../entities/patient'
// import Ajax from '../../../lib/ajax'
// import PageResult from '@/store/entities/page-result';
// import ListMutations from '../list-mutations'
// import { router } from '@/router/index';
// import PlanApplication from '../../entities/patientTreatment/planApplication'

// interface LocationListState extends ListState<LocationList> {
//     editLocationList: LocationList,
//     roles: Role[],
//     resetbutton: Boolean
//     status: Boolean
//     patientDetail: Patient
//     editPlanApplication: PlanApplication,

// }
// class LocationListMutations extends ListMutations<LocationList>{

// }
// class LocationListModule extends ListModule<LocationListState, any, LocationList>{
//     state = {
//         totalCount: 0,
//         currentPage: 1,
//         pageSize: 10,
//         list: new Array<LocationList>(),
//         loading: false,
//         resetbutton: false,
//         status: true,
//         patientDetail: new Patient(),
//         editLocationList: new LocationList(),
//         editPlanApplication: new PlanApplication()

//     }
//     actions = {
//         async getAll(context: ActionContext<LocationListState, any>, payload: any) {
//             context.state.loading = true;
//             let reponse = await Ajax.get('/api/services/app/Ctsimmodel/GetSimulatedList', { params: payload.data });
//             context.state.loading = false;
//             let page = reponse.data.result as PageResult<LocationList>;
//             context.state.totalCount = page.totalCount;
//             context.state.list = page.items;

//         },
//         async save(context: ActionContext<LocationListState, any>, payload: any) {
//             let reponse = await Ajax.post('/api/services/app/LocationLists/CreateOrUpdateLocationList', payload.data);
//             if (reponse.data["success"]) {
//                 context.commit("changeStatus", false);
//                 context.commit("changeResetbutton", true);
//             }
//         },
//         async searchResetAndPatientQueryAsync(context: ActionContext<LocationListState, any>, payload: any) {
//             if (Object.keys(payload.data).length === 0) {
//                 return;
//             }
//             let reponse = await Ajax.get('/api/services/app/ResetConditions/GetResetAndPatientQueryAsync', { params: payload.data });
//             if (reponse.data["success"]) {
//                 context.state.patientDetail = reponse.data.result as Patient;
//             }
//             return context.state.patientDetail
//         },
//         async getSimulatedList(context: ActionContext<LocationListState, any>, payload: any) {
//             if (Object.keys(payload.data).length === 0) {
//                 return;
//             }
//             let reponse = await Ajax.get('/api/services/app/Ctsimmodel/GetSinglePatient', { params: payload.data });
//             if (reponse.data["success"]) {
//                 context.state.patientDetail = reponse.data.result as Patient;
//                 // context.rootState.patient.patientName = reponse.data.result.patient.patientName
//                 // context.rootState.patient.treatmentMethod = reponse.data.result.patientDiagnosis.treatmentMethod
//                 // context.rootState.patient.radiotherapyNum = reponse.data.result.patient.radiotherapyNum


//             }
//             return context.state.patientDetail
//         },

//         async getPatientListAsync(context: ActionContext<LocationListState, any>, payload: any) {
//             if (Object.keys(payload.data).length === 0) {
//                 return;
//             }
//             let reponse = await Ajax.get('/api/services/app/PatientDiagnosis/GetPatientListAsync', { params: payload.data });
//             if (reponse.data["success"]) {
//                 context.state.patientDetail = reponse.data.result as Patient;
//             }
//             return context.state.patientDetail
//         },

//         async getPlanningDesignOrderByRadiotherapyNum(context: ActionContext<LocationListState, any>, payload: any) {
//             if (Object.keys(payload.data).length === 0) {
//                 return;
//             }
//             let reponse = await Ajax.get('/api/services/app/PlanningDesignOrder/GetPlanningDesignOrderByRadiotherapyNum', { params: payload.data });

//             if (reponse.data["success"]) {
//                 context.state.editPlanApplication = reponse.data.result as PlanApplication;
//             }
//             return context.state.editPlanApplication
//         },




//         async getScanResultsPatientAsync(context: ActionContext<LocationListState, any>, payload: any) {
//             if (Object.keys(payload.data).length === 0) {
//                 return;
//             }
//             let reponse = await Ajax.get('/api/services/app/ResetConditions/GetScanResultsPatientAsync', { params: payload.data });
//             if (reponse.data["success"]) {
//                 context.state.patientDetail = reponse.data.result as Patient;
//             }
//             return context.state.patientDetail
//         },


//         async simulationDataAsync(context: ActionContext<LocationListState, any>, payload: any) {
//             if (Object.keys(payload.data).length === 0) {
//                 return;
//             }

//             let reponse = await Ajax.post('/api/services/app/Ctsimmodel/SimulationDataAsync', payload.data);
//             if (reponse.data["success"]) {
//                 return reponse.data["success"]
//             }
//             return null
//         },
//     };
//     mutations = {
//         setResetbutton(state: LocationListState, sate: boolean) {
//             state.resetbutton = sate;
//         },
//         changeStatus(state: LocationListState, sate: boolean) {
//             state.status = sate;
//         },
//         changeResetbutton(state: LocationListState, sate: boolean) {
//             state.resetbutton = sate;
//         },
//         setCurrentPage(state: LocationListState, page: number) {
//             state.currentPage = page;
//         },
//         setPageSize(state: LocationListState, pagesize: number) {
//             state.pageSize = pagesize;
//         },
//         edit(state: LocationListState, locationList: LocationList) {
//             state.editLocationList = locationList;
//         }
//     }
// }
// const locationListModule = new LocationListModule();
// export default locationListModule;