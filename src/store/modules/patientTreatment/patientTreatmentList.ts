import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PatientTreatmentList from '../../entities/patientTreatment/patientTreatmentList'
import MedicalOrder from '../../entities/patientTreatment/medicalOrder'
import Role from '../../entities/role'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';
import PatientTreatmentDetail from "../../../store/entities/patientTreatment/patientTreatmentDetail";



interface PatientTreatmentListState extends ListState<PatientTreatmentList> {
    editPatientTreatmentList: PatientTreatmentList,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
    patientDetail: PatientTreatmentDetail
    radiotherapyNumParmas: String
    medicalOrder: MedicalOrder
    currentTab: Number
    numberCount: []

}
class PatientTreatmentListMutations extends ListMutations<PatientTreatmentList>{

}
class PatientTreatmentListModule extends ListModule<PatientTreatmentListState, any, PatientTreatmentList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 6,
        list: new Array<PatientTreatmentList>(),
        loading: false,
        resetbutton: false,
        status: true,
        patientDetail: new PatientTreatmentDetail(),
        editPatientTreatmentList: new PatientTreatmentList(),
        roles: new Array<Role>(),
        radiotherapyNumParmas: String,
        medicalOrder: new MedicalOrder(),
        currentTab: 0 ,
        numberCount: new Array()
    }
    actions = {
        async getAll(context: ActionContext<PatientTreatmentListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/Patients/GetPatients', { params: payload.data });
            context.state.loading = false;
            let page = reponse.data.result as PageResult<PatientTreatmentList>;
            context.state.totalCount = page.totalCount;
            context.state.list = page.items[0]["patientList"]; 
            context.state.numberCount = page.items[0]["numberCount"]; 

            // page.items[0]["numberCount"]

        },
        // async save(context: ActionContext<PatientTreatmentListState, any>, payload: any) {
        //     let reponse = await Ajax.post('/api/services/app/PatientTreatmentLists/CreateOrUpdatePatientTreatmentList', payload.data);
        //     if (reponse.data["success"]) {
        //         context.commit("changeStatus", false);
        //         context.commit("changeResetbutton", true);
        //     }
        // },
        // async getPatientForEdit(context: ActionContext<PatientTreatmentListState, any>, payload: any) {

        //     if (Object.keys(payload.data).length === 0) {
        //         return;
        //     }
        //     let reponse = await Ajax.get('/api/services/app/Patients/GetPatientInfo', { params: payload.data });
        //     if (reponse.data["success"]) {
        //         // context.state.patientDetail = reponse.data.result as PatientTreatmentDetail
        //         // context.rootState.patient.patientName = context.state.patientDetail.patient.patientName
        //         // context.rootState.patient.treatmentMethod = context.state.patientDetail.patientDiagnosis.treatmentMethod
        //         // context.rootState.patient.radiotherapyNum = context.state.patientDetail.patient.radiotherapyNum
        //     }

        //     return context.state.patientDetail
        // },
        // async CtsimAndPlanningDesignList(context: ActionContext<PatientTreatmentListState, any>, payload: any) {
        //     context.state.radiotherapyNumParmas =  payload.data
        //     let reponse = await Ajax.post('/api/services/app/PatientDiagnosis/CtsimAndPlanningDesignList', payload.data);
        //     if (reponse.data["success"]) {
        //         context.state.medicalOrder = reponse.data.result as MedicalOrder;
        //     }
        //     return context.state.medicalOrder
        // },

    };
    mutations = {
        setCurrentTab(state: PatientTreatmentListState, tabIndex: Number) {
            state.currentTab = tabIndex
        },
        setResetbutton(state: PatientTreatmentListState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: PatientTreatmentListState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: PatientTreatmentListState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: PatientTreatmentListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: PatientTreatmentListState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: PatientTreatmentListState, patientTreatmentList: PatientTreatmentList) {

            state.editPatientTreatmentList = patientTreatmentList;
        }
    }
}
const patientTreatmentListModule = new PatientTreatmentListModule();
export default patientTreatmentListModule;