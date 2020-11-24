import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import TargetResource from '../../entities/target/targetResource'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';
import TargetingApplication from '../../entities/patientTreatment/targetingApplication'
import PatientInfo from '../../entities/plan/patientTop'
import PlanApplication from '../../entities/plan/planApplication'
import ExamineLocationResult from '../../entities/review/examineLocationResult/examineLocationResult'
import ApprovePlan from '../../entities/review/approvePlan/approvePlan'
import LeftPatientInfo from '../../entities/review/approvePlan/LeftPatientInfo'

interface LocationListState extends ListState<TargetResource> {
    editLocationList: TargetResource,
    editTargetingApplication: TargetingApplication,
    resetbutton: Boolean
    status: Boolean
    zoom: Boolean
    routerName: String
    color: String
    patientInfo: PatientInfo,
    planApplication: PlanApplication,
    remarkDisabled: Boolean,
    test: any,
    moreTargetApplicationTab: Number,
    morePlanApplicationTab: Number,
    moreApprovePlanTab: Number,
    moreApprovaltTreatmentTab: Number,
    moreExamineLocationResultTab: Number,
    examineLocationResult: ExamineLocationResult,
    approvePlan: ApprovePlan,
    leftPatientInfo: LeftPatientInfo  

}
class LocationListMutations extends ListMutations<TargetResource>{

}
class LocationListModule extends ListModule<LocationListState, any, TargetResource>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<TargetResource>(),
        loading: false,
        routerName: null,
        color: null,
        status: true,
        editTargetingApplication: new TargetingApplication(),
        planApplication: new PlanApplication(),
        patientInfo: new PatientInfo(),
        examineLocationResult: new ExamineLocationResult(),
        approvePlan: new ApprovePlan(),
        leftPatientInfo: new LeftPatientInfo(),
        remarkDisabled: false,
        test: null,
        moreTargetApplicationTab: 0,
        morePlanApplicationTab: 0,
        moreApprovePlanTab: 0,
        moreApprovaltTreatmentTab: 0,
        moreExamineLocationResultTab: 0,
        zoom: false

    }
    actions = {
        async getExaminePatientListQueryAsync(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/ExamineFlowAppFlowService/GetExaminePatientListQueryAsync', { params: payload });
            if (reponse.data["success"]) {
                context.commit("changeLeftPatientInfo", reponse.data.result.leftPatients);
                context.commit("changeEditTargetingApplication", reponse.data.result);
                context.commit("changeStatus", false);
            }
        },

        async getPlanOrder(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/Plan/GetPlanOrder', { params: payload });
            if (reponse.data["success"]) {
                context.commit("changeLeftPatientInfo", reponse.data.result.leftPatients);
                context.commit("changePlanApplication", reponse.data.result);
                return reponse.data
            }
        },

        async getExamineResultQueryAsync(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/ExamineFlowAppFlowService/GetExamineResultQueryAsync', { params: payload });
            if (reponse.data["success"]) {
                context.commit("changeLeftPatientInfo", reponse.data.result.leftPatientInfo);  //leftPatientInfo leftPatients 无奈。。
                context.commit("changeExamineLocationResult", reponse.data.result);
                return reponse.data
            }
        },

        async getApprovingPlanInfoAsync(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/Plan/GetApprovingPlanInfoAsync', { params: payload });
            if (reponse.data["success"]) {
                context.commit("changeLeftPatientInfo", reponse.data.result.leftPatients);
                context.commit("changeApprovePlan", reponse.data.result);
                return reponse.data
            }
        },

        async getApprovedTreatmentInfoAsync(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/Plan/GetApprovedTreatmentInfoAsync', { params: payload });
            if (reponse.data["success"]) {
                context.commit("changeLeftPatientInfo", reponse.data.result.leftPatients);
                // context.commit("changePlanApplication", reponse.data.result);
                return reponse.data
            }
        },

        async ctsimOrderAgreedAsync(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/CtsimOrderFlow/CtsimOrderAgreedAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },

        async cancellationCtsimOrderFlowAsync(context: ActionContext<LocationListState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/CtsimOrderFlow/CancellationCtsimOrderFlowAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        }
    };
    mutations = {
        setMoreTargetApplicationTab(state: LocationListState, tabIndex: Number) {
            state.moreTargetApplicationTab = tabIndex
        },
        setMorePlanApplicationTab(state: LocationListState, tabIndex: Number) {
            state.morePlanApplicationTab = tabIndex
        },
        setMoreApprovePlanTab(state: LocationListState, tabIndex: Number) {
            state.moreApprovePlanTab = tabIndex
        },
        setMoreApprovaltTreatmentTab(state: LocationListState, tabIndex: Number) {
            state.moreApprovaltTreatmentTab = tabIndex
        },
        setMoreExamineLocationResultTab(state: LocationListState, tabIndex: Number) {
            state.moreExamineLocationResultTab = tabIndex
        },
        changeLeftPatientInfo(state: LocationListState, sate: LeftPatientInfo) {
            state.leftPatientInfo = sate;
        },
        changeExamineLocationResult(state: LocationListState, sate: ExamineLocationResult) {
            state.examineLocationResult = sate;
        },
        changeApprovePlan(state: LocationListState, sate: ApprovePlan) {
            state.approvePlan = sate;
        },
        changeEditTargetingApplication(state: LocationListState, sate: TargetingApplication) {
            state.editTargetingApplication = sate;
        },
        changeStatus(state: LocationListState, sate: boolean) {
            state.status = sate;
        },
        setRouterName(state: LocationListState, routerName: String) {

            state.routerName = routerName;
        },
        setCurrentColor(state: LocationListState, color: String) {

            state.color = color;
        },
        setCurrentPage(state: LocationListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: LocationListState, pagesize: number) {

            state.pageSize = pagesize;
        },
        changePlanApplication(state: LocationListState, sate: PlanApplication) {
            state.planApplication = sate;
        },
        //临时处理数据
        test(state: LocationListState, sate: any) {
            state.test = sate

        }
    }
}
const locationListModule = new LocationListModule();
export default locationListModule;