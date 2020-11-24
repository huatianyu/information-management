import Entity from '../entity'
import PatientTreatmentDetail from './patientTreatmentDetail'
import DiagnosisSets from './diagnosisSets'


export default class PatientResource extends Entity<number>{
    patientInfo: PatientTreatmentDetail = new PatientTreatmentDetail();
    diagnosisSets: DiagnosisSets = new DiagnosisSets();
    radiotherapyNum: String;
    courseId: Number

}