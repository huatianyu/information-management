import Entity from './entity'
export default class Patient extends Entity<number>{
    //  id = 0; 

    // password: string;
    // hospitalId: Number = 1;
    // methodId: Number = 1;
    // // //类型：Number  必有字段  备注：院区ID
    // prescriptionId: Number;
    // key: String = "1";
    // patientName: String = "1";
    // patientSpellName: String = "1";
    // age: Number = 11;
    // sex: Number = 1;
    // idType: Number 
    // idNumber: String = "211322199104121516";
    // nationality: String = "1";
    // folk: Number = 1;
    // origin: String = "1";
    // address: String = "1";
    // hisPatientType: Number = 1;
    // clinicPatientId: String = "1";
    // infeePatientId: String = "1";
    // requisitionId: String = "1";
    // societyId: String = "1";
    // weight: Number = 1;
    // height: Number = 1;
    // medicalHistory: String = "1";
    // allergyHistory: String = "1";
    // smokingStatus: Number = 1;
    // occupation: String = "1";
    // workUnit: String = "1";
    // phoneNumber: String = "0421-2562354";
    // chiefDoctorIdStrs: String[] = ['zuyi', 'zhangsan'];
    // radiotherapyNum: String = "1";
    // // outpatientDepartmentNumber: String = "1";
    // pathologicalNumber: String = "1";
    // sickroomNumber: String = "1";
    // creatorUserId: String = "1";
    // secondPhone: String = "1";
    // remarks: String = "1";
    // chiefDoctorId: Number =4;
    // inpatientArea: String = "1";
    // sickRoomNumber: String = "1";
    // sickBedNumber: String = "1";
    // payment: Number = 1;
    // photographPath: String = "1";










    password: string;
    hospitalId: Number = 1;
    methodId: Number = 1;
    // //类型：Number  必有字段  备注：院区ID
    prescriptionId: Number;
    key: String;
    patientName: String;
    patientSpellName: String;
    age: Number = 222221;
    sex: Number ;
    idType: Number;
    idNumber: String;
    nationality: String;
    folk: Number;
    origin: String;
    address: String;
    hisPatientType: Number;
    clinicPatientId: String;
    infeePatientId: String;
    requisitionId: String;
    societyId: String;
    weight: Number;
    height: Number;
    medicalHistory: String;
    allergyHistory: String;
    smokingStatus : smoke = new smoke();
    occupation: String;
    workUnit: String;
    phoneNumber: String;
    chiefDoctorIdStrs: String[];
    radiotherapyNum: String;
    pathologicalNumber: String;
    sickroomNumber: String;
    creatorUserId: String;
    secondPhone: String;
    remarks: String;
    chiefDoctorId: Number;
    inpatientArea: String;
    sickRoomNumber: String;
    sickBedNumber: String;
    payment: Number;
    photographPath: String;

}

class smoke {
    id:number = 1
        title: string =""
        value:string = "有";
}