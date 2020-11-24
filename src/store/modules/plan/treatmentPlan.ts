import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PlanList from '../../entities/plan/planList'
import Role from '../../entities/role'
import Patient from '../../entities/patient'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface PlanListState extends ListState<PlanList> {
    editPlanList: PlanList,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
    patientDetail: Patient


}
class PlanListMutations extends ListMutations<PlanList>{

}
class PlanListModule extends ListModule<PlanListState, any, PlanList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<PlanList>(),
        loading: false,
        resetbutton: false,
        status: true,
        patientDetail: new Patient(),
        editPlanList: new PlanList(),
        roles: new Array<Role>(),
    }
    actions = {
        async getAll(context: ActionContext<PlanListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/Patients/GetPatients', { params: payload.data });

            context.state.loading = false;
            let page = reponse.data.result as PageResult<PlanList>;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;

        },
        async save(context: ActionContext<PlanListState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/PlanLists/CreateOrUpdatePlanList', payload.data);
            if (reponse.data["success"]) {
                context.commit("changeStatus", false);
                context.commit("changeResetbutton", true);
            }
        },
        async getPatientForEdit(context: ActionContext<PlanListState, any>, payload: any) {
            if (Object.keys(payload.data).length === 0) {
                return;
            }
            let reponse = await Ajax.get('/api/services/app/Patients/GetPatientForEdit', { params: payload.data });

            if (reponse.data["success"]) {
                context.state.patientDetail = reponse.data.result as Patient;
                
            }

            return   context.state.patientDetail
        },

    };
    mutations = {

        setResetbutton(state: PlanListState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: PlanListState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: PlanListState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: PlanListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: PlanListState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: PlanListState, planList: PlanList) {

            state.editPlanList = planList;
        }
    }
}
const planListModule = new PlanListModule();
export default planListModule;