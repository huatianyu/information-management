import Entity from '../entity'
import List from './list'


export default class PlanApplication extends Entity<number>{
    patientTop: PatientTop = new PatientTop();
    list: List[] = [new List()];
    device: Number
    id: number =0 
    workstation: Number
    remarks:string
}


class PatientTop {
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

