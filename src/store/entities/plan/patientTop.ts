import Entity from '../entity'
import List from './list'


export default class PatientTop extends Entity<number>{
    radiotherapyNum: string;
    patientName: string;
    age: number;
    sex: number;
    hisPatientType: number;
    clinicPatientId: string;
    inpatientArea: string;
    phoneNumber: string;
    clinicalDiagnosis: string;
}

