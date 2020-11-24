import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import TargetingApplication from '../../entities/patientTreatment/targetingApplication'
import Role from '../../entities/role'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'

interface TargetingApplicationState extends ListState<TargetingApplication> {
    editTargetingApplication: TargetingApplication,
    roles: Role[],
    resetbutton: Boolean,
    status: Boolean,
    isEditStatus: Boolean


}
class TargetingApplicationMutations extends ListMutations<TargetingApplication>{

}
class TargetingApplicationModule extends ListModule<TargetingApplicationState, any, TargetingApplication>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<TargetingApplication>(),
        loading: false,
        resetbutton: false,
        status: true,
        isEditStatus: false,
        editTargetingApplication: new TargetingApplication(),
        roles: new Array<Role>()
    }
    actions = {
        async getAll(context: ActionContext<TargetingApplicationState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/TargetingApplication/GetTargetingApplications', { params: payload.data });
            context.state.loading = false;
            let page = reponse.data.result as PageResult<TargetingApplication>;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;

        },
        async createSimulatedPositioningAsync(context: ActionContext<TargetingApplicationState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/CtsimOrderFlow/CreateSimulatedPositioningAsync', payload.data);
            if (reponse.data["success"]) {
                context.commit("changeStatus", false);
            }
        },

        async getExaminePatientListQueryAsync(context: ActionContext<TargetingApplicationState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/ExamineFlowAppFlowService/GetExaminePatientListQueryAsync', { params: payload });
            if (reponse.data["success"]) {
                context.commit("changeEditTargetingApplication", reponse.data.result);
                context.commit("changeStatus", false);
            }
        },

        async persionListQueryAsync(context: ActionContext<TargetingApplicationState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/CtsimOrderFlow/GetSinglePatient', { params: payload.data });
            context.commit("changeEditTargetingApplication", reponse.data.result);
            return reponse.status === 200
        },

        // async updateSimulatedPositioning(context: ActionContext<TargetingApplicationState, any>, payload: any) {
        //     let reponse = await Ajax.put('/api/services/app/Ctsimmodel/UpdateSimulatedPositioning', payload.data);
        //     if (reponse.data["success"]) {
        //         context.commit("changeStatus", false);
        //     }

        // },

        // async sendExamineAsync(context: ActionContext<TargetingApplicationState, any>, payload: any) {
        //     let reponse = await Ajax.post('/api/services/app/Ctsimmodel/SendExamineAsync', payload.data);
        //     if (reponse.data["success"]) {
        //         return reponse.data["success"]
        //     }
        //     return null

        // },
        // async saveDiagnosis(context: ActionContext<TargetingApplicationState, any>, payload: any) {

        //     let reponse = await Ajax.post('/api/services/app/TargetingApplicationDiagnosis/CreateOrUpdateTargetingApplicationDiagnosis', payload.data);
        //     // if (reponse.data["success"]) {
        //     //     context.commit("changeStatus", false);
        //     // }

        //     // if (context.state.status && !context.state.isEditStatus) {

        //     //     let reponse = await Ajax.post('/api/services/app/TargetingApplications/CreateTargetingApplication', payload.data);
        //     //     if (reponse.data["success"]) {
        //     //         context.commit("changeStatus", false);
        //     //     }
        //     // } else {
        //     //     let reponse = await Ajax.post('/api/services/app/TargetingApplications/UpdateTargetingApplication', payload.data);
        //     //     if (reponse.data["success"]) {
        //     //         context.commit("changeStatus", false);
        //     //     }
        //     // }
        // },

        // async update(context: ActionContext<TargetingApplicationState, any>, payload: any) {
        //     await Ajax.put('/api/services/app/TargetingApplication/Update', payload.data);
        // },
        // async delete(context: ActionContext<TargetingApplicationState, any>, payload: any) {
        //     await Ajax.delete('/api/services/app/TargetingApplication/Delete?Id=' + payload.data.id);
        // },
        // async get(context: ActionContext<TargetingApplicationState, any>, payload: any) {
        //     let reponse = await Ajax.get('/api/services/app/TargetingApplication/Get?Id=' + payload.id);
        //     return reponse.data.result as TargetingApplication;
        // },
        // async getRoles(context: ActionContext<TargetingApplicationState, any>) {
        //     let reponse = await Ajax.get('/api/services/app/Role/GetRoles');
        //     context.state.roles = reponse.data.result.items as Role[];
        // },
        // async changeLanguage(context: ActionContext<TargetingApplicationState, any>, payload: any) {
        //     await Ajax.post('/api/services/app/Profile/ChangeLanguage', payload.data);
        // }
    };
    mutations = {
        changeEditTargetingApplication(state: TargetingApplicationState, sate: TargetingApplication) {
            state.editTargetingApplication = sate;
        },

        changeStatus(state: TargetingApplicationState, sate: boolean) {
            state.status = sate;
        },
        // isEditStatus(state: TargetingApplicationState, sate: boolean) {
        //     state.isEditStatus = sate;
        // },
        // isEdit(state: TargetingApplicationState, sate: boolean) {
        //     state.isEditStatus = true;
        //     state.status = true;
        // },
        // isCreat(state: TargetingApplicationState, sate: boolean) {
        //     state.isEditStatus = false;
        //     state.status = true;
        // },

        setCurrentPage(state: TargetingApplicationState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: TargetingApplicationState, pagesize: number) {

            state.pageSize = pagesize;
        },
        // edit(state: TargetingApplicationState, targetingApplication: TargetingApplication) {
        //     state.editTargetingApplication = targetingApplication;
        // }
    }
}
const targetingApplicationModule = new TargetingApplicationModule();
export default targetingApplicationModule;