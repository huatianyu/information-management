import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import PatientResource from '../../entities/patientTreatment/patientResource'
import HeaderPatientInfo from '../../entities/patientTreatment/headerPatientInfo'
import Prescription from '../../entities/patientTreatment/prescription'
import CtsimOrders from '../../entities/patientTreatment/ctsimOrders'
import PrescriptionDetail from '../../entities/patientTreatment/prescriptionDetail'
import Util from "@/lib/util";

import Role from '../../entities/role'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import PlanApplication from '../../entities/plan/planApplication'
import PatientInfo from '../../entities/plan/patientTop'

interface PatientResourceState extends ListState<PatientResource> {
    patientResource: PatientResource,
    headerPatientInfo: HeaderPatientInfo,
    prescription: Prescription,
    prescriptionDetail: PrescriptionDetail,
    ctsimOrders: CtsimOrders,
    isEditStatus: Boolean
    planApplication: PlanApplication,
    status: Boolean,
    remarkDisabled: Boolean,
    radiotherapyNum: Number,
    patientInfo: PatientInfo

}
class PatientResourceMutations extends ListMutations<PatientResource>{

}
class PatientResourceModule extends ListModule<PatientResourceState, any, PatientResource>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<PatientResource>(),
        loading: false,
        patientResource: new PatientResource(),
        headerPatientInfo: new HeaderPatientInfo(),
        prescription: new Prescription(),
        ctsimOrders: new CtsimOrders(),
        isEditStatus: false,
        prescriptionDetail: new PrescriptionDetail(),
        planApplication: new PlanApplication(),
        status: true,
        remarkDisabled: false,
        radiotherapyNum: null,
        patientInfo: new PatientInfo(),


    }
    actions = {

        async getDiagnosisInfoAndListDto(context: ActionContext<PatientResourceState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/Patients/GetDiagnosisInfoAndListDto', { params: payload.data });
            context.commit("changePatientResource", reponse.data.result);
            context.commit("changePatientInfo", reponse.data.result.leftPatients.patient);

            // context.commit("changeRadiotherapyNum", reponse.data.result.patientInfo.patient.radiotherapyNum);
            return reponse.status === 200
        },

        async getPatientTop(context: ActionContext<PatientResourceState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/Patients/GetPatientTop', { params: payload.data });
            context.commit("changeHeaderPatientInfo", reponse.data.result);
            return reponse.status === 200
        },
        async getPrescription(context: ActionContext<PatientResourceState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/Prescription/GetPrescription', { params: payload.data });
            context.commit("changePrescriptionDetail", reponse.data.result);
            return reponse.status === 200
        }
        ,
        async createAndUpdatePrescription(context: ActionContext<PatientResourceState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.post('/api/services/app/Prescription/CreateAndUpdatePrescription', payload.data);
            context.commit("changePrescription", reponse.data.result);
            context.dispatch({
                type: "getDiagnosisInfoAndListDto",
                data: { radiotherapyNum: context.state.patientResource.radiotherapyNum }
            });
            return reponse.status === 200
        },
        async createSimulatedPositioningAsync(context: ActionContext<PatientResourceState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/CtsimOrderFlow/CreateSimulatedPositioningAsync', payload.data);
            context.dispatch({
                type: "getDiagnosisInfoAndListDto",
                data: { radiotherapyNum: context.state.patientResource.radiotherapyNum }
            });

            if (reponse.data["success"]) {
                context.state.status = false
            }
            return reponse.status === 200
        },
        async createPlanOrder(context: ActionContext<PatientResourceState, any>, payload: any) {
            let reponse = null
            if (context.state.isEditStatus) {
                reponse = await Ajax.post('/api/services/app/Plan/SavePlanOrder', payload.data);
            } else {
                reponse = await Ajax.post('/api/services/app/Plan/CreatePlanOrder', payload.data);
            }
            context.dispatch({
                type: "getDiagnosisInfoAndListDto",
                data: { radiotherapyNum: context.state.patientResource.radiotherapyNum }
            });
            if (reponse.data["success"]) {
                context.state.remarkDisabled = true
                context.state.isEditStatus = true
                context.commit("changeStatus", false);
                context.commit("setPlanApplication", reponse.data["result"]);
                return reponse.data
            }
        },

        async iinformedDisagreeAsync(context: ActionContext<PatientResourceState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/InformedConsent/IinformedDisagreeAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },

        async iinformedAgreedAsync(context: ActionContext<PatientResourceState, any>, payload: any) {

            let reponse = await Ajax.post('/api/services/app/InformedConsent/IinformedAgreedAsync', payload.data);
            if (reponse.status === 200) {
                context.state.remarkDisabled = true
            }
            return reponse.status === 200
        },



    };
    mutations = {

        changePatientInfo(state: PatientResourceState, sate: PatientInfo) {
            state.patientInfo = sate;
        },
        setCurrentPage(state: PatientResourceState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: PatientResourceState, pagesize: number) {

            state.pageSize = pagesize;
        },
        changePatientResource(state: PatientResourceState, sate: PatientResource) {
            state.patientResource = sate;
        },
        changeRadiotherapyNum(state: PatientResourceState, sate: Number) {
            state.radiotherapyNum = sate;
        },

        changeHeaderPatientInfo(state: PatientResourceState, sate: HeaderPatientInfo) {
            state.headerPatientInfo = sate;
        },
        changePrescription(state: PatientResourceState, sate: Prescription) {
            state.prescription = sate;
        }
        ,

        changeCtsimOrders(state: PatientResourceState, sate: CtsimOrders) {
            state.ctsimOrders = sate;
        },
        changePrescriptionDetail(state: PatientResourceState, sate: PrescriptionDetail) {
            state.prescriptionDetail = sate;
        },


        setPlanApplication(state: PatientResourceState, planApplication: PlanApplication) {
            state.planApplication = planApplication;
        },


        changeStatus(state: PatientResourceState, sate: boolean) {
            state.status = sate;
        },



    }
}
const Module = new PatientResourceModule();
export default Module;