// import { Store, Module, ActionContext } from 'vuex'
// import ListModule from './list-module'
// import ListState from './list-state'
// import PlanApplication from '../entities/planApplication'
// import Role from '../entities/role'
// import Ajax from '../../lib/ajax'
// import PageResult from '@/store/entities/page-result';
// import ListMutations from './list-mutations'

// interface PlanApplicationState extends ListState<PlanApplication> {
//     editPlanApplication: PlanApplication,
//     roles: Role[],
//     resetbutton: Boolean,
//     status: Boolean,
//     isEditStatus: Boolean


// }
// class PlanApplicationMutations extends ListMutations<PlanApplication>{

// }
// class PlanApplicationModule extends ListModule<PlanApplicationState, any, PlanApplication>{
//     state = {
//         totalCount: 0,
//         currentPage: 1,
//         pageSize: 10,
//         list: new Array<PlanApplication>(),
//         loading: false,
//         resetbutton: false,
//         status: true,
//         isEditStatus: false,
//         editPlanApplication: new PlanApplication(),
//         roles: new Array<Role>()
//     }
//     actions = {
//         async getAll(context: ActionContext<PlanApplicationState, any>, payload: any) {
//             context.state.loading = true;
//             let reponse = await Ajax.get('/api/services/app/PlanApplication/GetPlanApplications', { params: payload.data });
//             context.state.loading = false;
//             let page = reponse.data.result as PageResult<PlanApplication>;
//             context.state.totalCount = page.totalCount;
//             context.state.list = page.items;

//         },
//         async save(context: ActionContext<PlanApplicationState, any>, payload: any) {
//             if (context.state.status && !context.state.isEditStatus) {

//                 let reponse = await Ajax.post('/api/services/app/PlanApplications/CreatePlanApplication', payload.data);
//                 if (reponse.data["success"]) {
//                     context.commit("changeStatus", false);
//                 }
//             } else {
//                 let reponse = await Ajax.post('/api/services/app/PlanApplications/UpdatePlanApplication', payload.data);
//                 if (reponse.data["success"]) {
//                     context.commit("changeStatus", false);
//                 }
//             }
//         },


//         async saveDiagnosis(context: ActionContext<PlanApplicationState, any>, payload: any) {

//             let reponse = await Ajax.post('/api/services/app/PlanApplicationDiagnosis/CreateOrUpdatePlanApplicationDiagnosis', payload.data);
//             // if (reponse.data["success"]) {
//             //     context.commit("changeStatus", false);
//             // }

//             // if (context.state.status && !context.state.isEditStatus) {

//             //     let reponse = await Ajax.post('/api/services/app/PlanApplications/CreatePlanApplication', payload.data);
//             //     if (reponse.data["success"]) {
//             //         context.commit("changeStatus", false);
//             //     }
//             // } else {
//             //     let reponse = await Ajax.post('/api/services/app/PlanApplications/UpdatePlanApplication', payload.data);
//             //     if (reponse.data["success"]) {
//             //         context.commit("changeStatus", false);
//             //     }
//             // }
//         },

//         async update(context: ActionContext<PlanApplicationState, any>, payload: any) {
//             await Ajax.put('/api/services/app/PlanApplication/Update', payload.data);
//         },
//         async delete(context: ActionContext<PlanApplicationState, any>, payload: any) {
//             await Ajax.delete('/api/services/app/PlanApplication/Delete?Id=' + payload.data.id);
//         },
//         async get(context: ActionContext<PlanApplicationState, any>, payload: any) {
//             let reponse = await Ajax.get('/api/services/app/PlanApplication/Get?Id=' + payload.id);
//             return reponse.data.result as PlanApplication;
//         },
//         async getRoles(context: ActionContext<PlanApplicationState, any>) {
//             let reponse = await Ajax.get('/api/services/app/Role/GetRoles');
//             context.state.roles = reponse.data.result.items as Role[];
//         },
//         async changeLanguage(context: ActionContext<PlanApplicationState, any>, payload: any) {
//             await Ajax.post('/api/services/app/Profile/ChangeLanguage', payload.data);
//         }
//     };
//     mutations = {


//         changeStatus(state: PlanApplicationState, sate: boolean) {
//             state.status = sate;
//         },
//         isEditStatus(state: PlanApplicationState, sate: boolean) {
//             state.isEditStatus = sate;
//         },
//         isEdit(state: PlanApplicationState, sate: boolean) {
//             state.isEditStatus = true;
//             state.status = true;
//         },
//         isCreat(state: PlanApplicationState, sate: boolean) {
//             state.isEditStatus = false;
//             state.status = true;
//         },

//         setCurrentPage(state: PlanApplicationState, page: number) {
//             state.currentPage = page;
//         },
//         setPageSize(state: PlanApplicationState, pagesize: number) {

//             state.pageSize = pagesize;
//         },
//         edit(state: PlanApplicationState, planApplication: PlanApplication) {
//             state.editPlanApplication = planApplication;
//         }
//     }
// }
// const planApplicationModule = new PlanApplicationModule();
// export default planApplicationModule;