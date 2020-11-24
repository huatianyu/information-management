import { Store, Module, ActionContext } from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Patient from '../entities/patient'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
import url from '../../../src/lib/url';

interface PatientState extends ListState<Patient> {
    editPatient: Patient,
    resetbutton: Boolean,
    status: Boolean,
    isEditStatus: Boolean,
    radiotherapyNum: String,
    patientName: String,
    treatmentMethod: String,
    imgSrc: String,
    imgSrcName: String,
    chiefDoctors: []


}

class PatientModule extends ListModule<PatientState, any, Patient>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<Patient>(),
        loading: false,
        resetbutton: false,
        status: true,
        imgSrc: "../../../../static/noImage.png",
        imgSrcName: null,
        isEditStatus: false,
        editPatient: new Patient(),
        radiotherapyNum: null,
        patientName: null,
        treatmentMethod: null,
        chiefDoctors: new Array()
    }
    actions = {
        async save(context: ActionContext<PatientState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/Patients/CreateOrUpdatePatient', payload.data);
            if (reponse.data["success"]) {
                context.commit("changeStatus", false);
                // context.commit("getRadiotherapyNum", reponse.data.result.patient.radiotherapyNum);
                // context.commit("getPatientName", reponse.data.result.patient.patientName);
                // context.commit("getTreatmentMethod", reponse.data.result.patientDiagnosis.treatmentMethod)
            }
            return reponse.data;
        },


        async saveDiagnosis(context: ActionContext<PatientState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/PatientDiagnosis/CreatePatientDiagnosis', payload.data);
        },

        async uploadFiles(context: ActionContext<PatientState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/UploadFile/UploadFiles', payload.data);
        },

        async uploadBase64(context: ActionContext<PatientState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/UploadFile/UploadBase64', payload.data);
            if (reponse.data["success"]) {
                context.commit("changeImgSrc", reponse.data.result);
            }
        },

        async getChiefDoctors(context: ActionContext<PatientState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/Doctor/GetChiefDoctors', payload.data);
            if (reponse.data["success"]) {
                context.commit("chiefDoctors", reponse.data.result);
            }
        },

        async update(context: ActionContext<PatientState, any>, payload: any) {
            await Ajax.put('/api/services/app/Patient/Update', payload.data);
        },
        async delete(context: ActionContext<PatientState, any>, payload: any) {
            await Ajax.delete('/api/services/app/Patient/Delete?Id=' + payload.data.id);
        },
        async get(context: ActionContext<PatientState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/Patient/Get?Id=' + payload.id);
            return reponse.data.result as Patient;
        },

        async changeLanguage(context: ActionContext<PatientState, any>, payload: any) {
            await Ajax.post('/api/services/app/Profile/ChangeLanguage', payload.data);
        },
        async deleteFiles(context: ActionContext<PatientState, any>, payload: any) {
            let reponse = await Ajax.put('/api/services/app/UploadFile/UpdatePhysicallyDeletedFiles', payload.data);
            if (reponse.data.success) {
                context.commit("changeImgSrc", null);
            }
        },
    };
    mutations = {
        chiefDoctors(state: PatientState, sate: any) {
            state.chiefDoctors = sate as any;

        },
        changeImgSrc(state: PatientState, sate: string) {
            state.imgSrcName = sate
            if (sate === null) {
                state.imgSrc = "../../../../static/noImage.png";
            } else {
                state.imgSrc = url+'upload/' + sate;
            }
        },
        changeStatus(state: PatientState, sate: boolean) {
            state.status = sate;
        },
        isEditStatus(state: PatientState, sate: boolean) {
            state.isEditStatus = sate;
        },
        isEdit(state: PatientState, sate: boolean) {
            state.isEditStatus = true;
            state.status = true;
        },
        isCreat(state: PatientState, sate: boolean) {
            state.isEditStatus = false;
            state.status = true;
        },

        setCurrentPage(state: PatientState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: PatientState, pagesize: number) {
            state.pageSize = pagesize;
        },
        edit(state: PatientState, patient: Patient) {
            state.editPatient = patient;
        },
        getRadiotherapyNum(state: PatientState, radiotherapyNum: String) {
            state.radiotherapyNum = radiotherapyNum;
        },
        getPatientName(state: PatientState, patientName: String) {
            state.patientName = patientName;
        },
        getTreatmentMethod(state: PatientState, treatmentMethod: String) {
            state.treatmentMethod = treatmentMethod;
        },

    }
}
const patientModule = new PatientModule();
export default patientModule;