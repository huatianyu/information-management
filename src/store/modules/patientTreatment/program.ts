import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PlanApplication from '../../entities/plan/planApplication'
import Role from '../../entities/role'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'


interface PlanApplicationState extends ListState<PlanApplication> {
    editPlanApplication: PlanApplication,
    roles: Role[],
    resetbutton: Boolean,
    status: Boolean,
    isEditStatus: Boolean


}
class PlanApplicationMutations extends ListMutations<PlanApplication>{

}
class PlanApplicationModule extends ListModule<PlanApplicationState, any, PlanApplication>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<PlanApplication>(),
        loading: false,
        resetbutton: false,
        status: true,
        isEditStatus: false,
        editPlanApplication: new PlanApplication(),
        roles: new Array<Role>()
    }
    actions = {


        async saveDiagnosis(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/PlanApplicationDiagnosis/CreateOrUpdatePlanApplicationDiagnosis', payload.data);
            // if (reponse.data["success"]) {
            //     context.commit("changeStatus", false);
            // }

            // if (context.state.status && !context.state.isEditStatus) {

            //     let reponse = await Ajax.post('/api/services/app/PlanApplications/CreatePlanApplication', payload.data);
            //     if (reponse.data["success"]) {
            //         context.commit("changeStatus", false);
            //     }
            // } else {
            //     let reponse = await Ajax.post('/api/services/app/PlanApplications/UpdatePlanApplication', payload.data);
            //     if (reponse.data["success"]) {
            //         context.commit("changeStatus", false);
            //     }
            // }
        },


    };
    mutations = {


        changeStatus(state: PlanApplicationState, sate: boolean) {
            state.status = sate;
        },

        setCurrentPage(state: PlanApplicationState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: PlanApplicationState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: PlanApplicationState, planApplication: PlanApplication) {
            state.editPlanApplication = planApplication;
        }
    }
}
const planApplicationModule = new PlanApplicationModule();
export default planApplicationModule;