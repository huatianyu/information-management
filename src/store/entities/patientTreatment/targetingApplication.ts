import Entity from '../entity'
import Patient from '../../entities/patientTreatment/headerPatientInfo'
import CtsimOrder from '../target/ctsimOrder'



export default class TargetingApplication {
    ctsimPatients: Patient = new Patient;
    ctsimOrder: CtsimOrder = new CtsimOrder;
    // radiotherapynum: String ; //放疗号
    // planningSystem: Number ; //计划系统
    // scanningPurpose: String ; //扫描目的
    // scanningEquipment: Number ; //扫描设备
    // appointmentTime: String ; //预约时间
    // scanningLocation: Number ; //扫描部位
    // scanningRangeUpper: Number ; //扫描范围上界
    // scanningRangeLower: Number ; //扫描范围下界
    // scanningMode: Number; //扫描方式
    // scanningLayerThickness: Number; //扫描层厚
    // scanningProcess: Number; //扫描过程
    // iodineAllergyTest: Number; //碘过敏试验
    // otherRequirements: String ; //其它要求
    // state: Number; //申请状态{ 1: 开出, 2: 审核, 3: 已体位固定4: 已模拟定位, 5: 已完成 } 展开
    // isFixed: Number; //是否制模（0: 不需要制模, 1: 需要制模）	展开
    // fixedPosition: Number; //固定部位
    // bodyPosition: Number;  // 体位
    // requirements: Number;  // 特殊要求
    // fixedEquipment: Number;  // 固定装置
    // remarks: String; //备注
    // sex: Number; //性别
    // age: Number; //年龄
    // radiotherapyNum: Number; //年龄
    // inpatientArea: String; //病区
    // phoneNumber: String; //联系方式
    // patientName: String ;
    // clinicalDiagnosis: String ;
    // infeePatientId: String ;
    // contrastAgent: string = "碘帕醇" ;
    // resetConditionRemark: Number = 1 ;
    // locationDoctor: Number = 1 ;
}




