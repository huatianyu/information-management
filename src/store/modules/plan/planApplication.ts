import { Store, Module, ActionContext } from 'vuex'
import ListModule from './../list-module'
import ListState from './../list-state'
import PlanApplication from '../../entities/plan/planApplication'
import Role from '../../entities/role'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './../list-mutations'

interface PlanApplicationState extends ListState<PlanApplication> {
    planApplication: PlanApplication,
    roles: Role[],
    resetbutton: Boolean,
    status: Boolean,
    isEditStatus: Boolean,
    remarkDisabled: Boolean,
    isCollapse: Boolean

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
        planApplication: new PlanApplication(),
        roles: new Array<Role>(),
        remarkDisabled: false,
        isCollapse: false

    }
    actions = {
        async createPlanOrder(context: ActionContext<PlanApplicationState, any>, payload: any) {
            let reponse = null
            if (context.state.isEditStatus) {
                reponse = await Ajax.put('/api/services/app/Plan/UpdatePlanOrder', payload.data);
            } else {
                reponse = await Ajax.post('/api/services/app/Plan/CreatePlanOrder', payload.data);
            }
            if (reponse.data["success"]) {
                context.state.isEditStatus = true
                context.commit("changeStatus", false);
                context.commit("setPlanApplication", reponse.data["result"]);
                return reponse.data
            }
        },
        async getPlanOrder(context: ActionContext<PlanApplicationState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/Plan/GetPlanOrder', { params: payload });
            if (reponse.data["success"]) {
                context.commit("setPlanApplication", reponse.data["result"]);
                return reponse.data
            }
        },

        async planExamine(context: ActionContext<PlanApplicationState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/Plan/PlanExamine', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },
        async approvedPlan(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/Plan/ApprovedPlan', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },

        async approvedTreatment(context: ActionContext<PlanApplicationState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/Plan/ApprovedTreatment', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },
        async approvedCabckeTreatment(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/Plan/ApprovedCabckeTreatment ', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },


        async approvedClanPlan(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/Plan/ApprovedClanPlan', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },



        async approvingPlanDisagreeAsync(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/Plan/ApprovingPlanDisagreeAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },

        async approvingPlanAgreeAsync(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/Plan/ApprovingPlanAgreeAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },


        async planCancellation(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/Plan/PlanCancellation', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },
        //定位申请单  这里用首字母大小写区分定位申请和定位结果  
        async ctsimResultAgreedAsync(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/HomePageAppFlowService/CtsimResultAgreedAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },


        async ctsimResulCancleAsync(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/HomePageAppFlowService/CtsimResulCancleAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },
        //定位结果  这里用首字母大小写区分定位申请和定位结果  

        async CtsimResulCancleAsync(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/ExamineFlowAppFlowService/CtsimResulCancleAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },
        async CtsimResultAgreedAsync(context: ActionContext<PlanApplicationState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/ExamineFlowAppFlowService/CtsimResultAgreedAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        }
    };
    mutations = {
        setPlanApplication(state: PlanApplicationState, planApplication: PlanApplication) {
            state.planApplication = planApplication;
        },
        setCurrentPage(state: PlanApplicationState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: PlanApplicationState, pagesize: number) {
            state.pageSize = pagesize;
        },
        changeStatus(state: PlanApplicationState, sate: boolean) {
            state.status = sate;
        },
        changeCollapse(state: PlanApplicationState, sate: boolean) {
            state.isCollapse = sate
        }
    }
}
const planApplicationModule = new PlanApplicationModule();
export default planApplicationModule;