import Entity from '../entity'
export default class headerPatientInfo extends Entity<number>{
    radiotherapyNum: String;
    patientName: String ="123";
    age: Number = 21;
    sex: Number =1;
    hisPatientType: Number = 2;
    clinicPatientId: String = '测试数据';
    inpatientArea: String ='测试数据';
    phoneNumber: String = '13562568562';
    ClinicalDiagnosis: Number = 2;
    sessionRemarks:String ;
    birthDay:Date;
    photographPath?:String
}

