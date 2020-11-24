import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PatientTreatmentDetail from '../../entities/patientTreatment/patientTreatmentDetail'
import Role from '../../entities/role'
import PatientDiagnosis from "../../entities/patientTreatment/patientDiagnosis";
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface PatientTreatmentDetailState extends ListState<PatientTreatmentDetail> {
    editPatientTreatmentDetail: PatientTreatmentDetail,
    roles: Role[],
    resetbutton: Boolean,
    status: Boolean,
    patientDiagnosis: PatientDiagnosis

}
class PatientTreatmentDetailMutations extends ListMutations<PatientTreatmentDetail>{

}
class PatientTreatmentDetailModule extends ListModule<PatientTreatmentDetailState, any, PatientTreatmentDetail>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<PatientTreatmentDetail>(),
        loading: false,
        resetbutton: false,
        status: true,
        editPatientTreatmentDetail: new PatientTreatmentDetail(),
        roles: new Array<Role>(),
        patientDiagnosis: new PatientDiagnosis
    }
    actions = {
        async save(context: ActionContext<PatientTreatmentDetailState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/PatientTreatmentDetails/CreateOrUpdatePatientTreatmentDetail', payload.data);
            if (reponse.data["success"]) {
                context.commit("changeStatus", false);
                context.commit("changeResetbutton", true);
            }
        },

        // async getPatientForEdit(context: ActionContext<PatientTreatmentDetailState, any>, payload: any) {
        //     if (Object.keys(payload.data).length === 0) {
        //         return;
        //     }
        //     let reponse = await Ajax.get('/api/services/app/Patients/GetPatientForEdit', { params: payload.data });

        //     if (reponse.data["success"]) {
        //         context.state.patientDiagnosis = reponse.data.result as PatientTreatmentDetail;
        //     }
        // },
        async getPatientDiagnosisForEdit(context: ActionContext<PatientTreatmentDetailState, any>, payload: any) {
            if (Object.keys(payload.data).length === 0) {
                return;
            }
            let reponse = await Ajax.get('/api/services/app/PatientDiagnosis/GetPatientDiagnosisForEdit', { params: payload.data });
            if (reponse.data["success"]) {
                context.state.patientDiagnosis = reponse.data.result as PatientDiagnosis;
            }
            return context.state.patientDiagnosis
        },

    };
    mutations = {

        setResetbutton(state: PatientTreatmentDetailState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: PatientTreatmentDetailState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: PatientTreatmentDetailState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: PatientTreatmentDetailState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: PatientTreatmentDetailState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: PatientTreatmentDetailState, patientTreatmentDetail: PatientTreatmentDetail) {

            state.editPatientTreatmentDetail = patientTreatmentDetail;
        }
    }
}
const patientTreatmentDetailModule = new PatientTreatmentDetailModule();
export default patientTreatmentDetailModule;