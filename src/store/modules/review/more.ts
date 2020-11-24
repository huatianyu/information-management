import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import More from '../../entities/review/more'
import Role from '../../entities/role'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface MoreState extends ListState<More> {
    More: More,
    roles: Role[],
    resetbutton: Boolean,
    status: Boolean,
    planTotalCount: Number,
    planCurrentPage: Number,
    planPageSize: Number,
    targetTotalCount: Number,
    targetCurrentPage: Number,
    targetpageSize: Number,
    numberCount: []
}
class MoreMutations extends ListMutations<More>{

}
class MoreModule extends ListModule<MoreState, any, More>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        planTotalCount: 0,
        planCurrentPage: 1,
        planPageSize: 6,
        targetTotalCount: 0,
        targetCurrentPage: 1,
        targetpageSize: 6,
        list: new Array<More>(),
        loading: false,
        status: true,
        More: new More(),
        roles: new Array<Role>(),
        numberCount: new Array(),
    }
    actions = {
        async getExamineQueryAsync(context: ActionContext<MoreState, any>, payload: any) {
            // context.state.loading = true;
            let reponse = await Ajax.post('/api/services/app/ExamineFlowAppFlowService/ExamineQueryAsync', payload.data);
            if (reponse.data["success"]) {
                context.commit("setMore", reponse.data["result"].items[0].locationExamine);
                context.commit("setNumberCount", reponse.data["result"].items[0].numberCount);
                context.state.targetTotalCount = reponse.data["result"].totalCount;
                // context.state.loading = false;

            }
        },
        // 获取计划审核列表
        async getPlanOrderCheckPending(context: ActionContext<MoreState, any>, payload: any) {
            // context.state.loading = true;
            let reponse = await Ajax.post('/api/services/app/Plan/PlanOrderCheckPending', payload.data);
            if (reponse.data["success"]) {
                // context.state.loading = false;
                context.state.planTotalCount = reponse.data["result"].totalCount;
                context.commit("setMore", reponse.data["result"].items[0].planOrderMissionDto);
                context.commit("setNumberCount", reponse.data["result"].items[0].numberCount);
            }
        },
        // 获取定位结果列表
        async examineLocationResultAsync(context: ActionContext<MoreState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/ExamineFlowAppFlowService/ExamineLocationResultAsync', payload.data);
            if (reponse.data["success"]) {
                context.state.planTotalCount = reponse.data["result"].totalCount;
                context.commit("setMore", reponse.data["result"].items[0].locationExamineResultDto);
                context.commit("setNumberCount", reponse.data["result"].items[0].numberCount);
            }
        },

        // 批准计划列表
        async planApproving(context: ActionContext<MoreState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/Plan/PlanApproving', payload.data);
            if (reponse.data["success"]) {
                context.state.planTotalCount = reponse.data["result"].totalCount;
                context.commit("setMore", reponse.data["result"].items[0].planOrderMissionDto);
                context.commit("setNumberCount", reponse.data["result"].items[0].numberCount);
            }
        },

        // 批准治疗列表
        async treatmentApproving(context: ActionContext<MoreState, any>, payload: any) {
            // context.state.loading = true;
            let reponse = await Ajax.post('/api/services/app/Plan/TreatmentApproving', payload.data);
            if (reponse.data["success"]) {
                // context.state.loading = false;
                context.state.planTotalCount = reponse.data["result"].totalCount;
                context.commit("setMore", reponse.data["result"].items);
                context.commit("setNumberCount", reponse.data["result"].items[0].numberCount);
            }
        },

    };
    mutations = {
        setCurrentPage(state: MoreState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: MoreState, pagesize: number) {
            state.pageSize = pagesize;
        },

        setTargetCurrentPage(state: MoreState, page: number) {
            state.targetCurrentPage = page;
        },
        setTargetPageSize(state: MoreState, pagesize: number) {
            state.targetpageSize = pagesize;
        },

        setPlanCurrentPage(state: MoreState, page: number) {
            state.planCurrentPage = page;
        },
        setPlanPageSize(state: MoreState, pagesize: number) {
            state.planPageSize = pagesize;
        },
        setMore(state: MoreState, result: any) {
            state.list = result;

        },
        setNumberCount(state: MoreState, result: any) { 
            state.numberCount = result;
        }
    }
}
const moreModule = new MoreModule();
export default moreModule;