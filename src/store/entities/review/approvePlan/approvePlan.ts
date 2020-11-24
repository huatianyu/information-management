import Entity from '../../entity'




export default class ApprovePlan extends Entity<number> {
    leftPatients: LeftPatients;
    rigthApproving: RigthApproving[];
}

export interface RigthApproving {
    planId: number;
    planName: string;
    planBuildTime: string;
    fileState: string;
    photoAdder: string;
    photoDvh: string;
    sessionId: number;
    radiotherapyNum: string;
    remarks: object;
    targetVolume: string;
    prescribedDosePercentage: string;
    fractionation: string;
    frescribedDose: string;
    doseAPrp: string;
    noF: string;
    primaryReferencePoint: string;
    planNormalizationValue: string;
    dvhjson: string;
}

export interface LeftPatients {
    patient: Patient;
    diagnosis: Diagnosis;
}

export interface Diagnosis {
    patientDiagnosis: PatientDiagnosis;
    pathologyDiagnosis: object;
    hospitalizedScoreDiagnosis: HospitalizedScoreDiagnosis;
    ctsimData: CtsimData;
    planOrder: PlanOrder[];
}

export interface PlanOrder {
    name: object;
    prescription: Prescription;
    targetPrescriptionDoses: any[];
    imperilOrganLimitedDoses: any[];
    verifyDto: VerifyDto;
}

export interface VerifyDto {
    doseVerifyCheck: boolean;
    doseVerifyId: number;
    doseVerifySession: object;
    fieldVerifyCheck: boolean;
    fieldVerifyId: number;
    fieldVerifySession: object;
    resetVerifyCheck: boolean;
    resetVerifyId: number;
    resetVerifySession: object;
}

export interface Prescription {
    courseId: number;
    rayType: number;
    prescribedDose: number;
    treatmentMethod: number;
    irradiationPosition: number;
    fraction: number;
    remarks: object;
    id: number;
}

export interface CtsimData {
    radiotherapyNum: object;
    isFixed: number;
    fixedPosition: string;
    bodyPosition: number;
    requirements: object;
    fixedEquipment: string;
    remarks: object;
    planningSystem: number;
    scanningPurpose: object;
    scanningEquipment: number;
    scanningLocation: number;
    scanningRange: object;
    scanningMode: number;
    scanningLayerThickness: number;
    scanningProcess: number;
    iodineAllergyTest: number;
    otherRequirements: object;
    locationId: number;
    imgName: string;
    id: number;
}

export interface HospitalizedScoreDiagnosis {
    patientDiagnosisId: number;
    kps: number;
    zps: number;
    qol: number;
    pain: number;
    nutrition: number;
    agony: number;
}

export interface PatientDiagnosis {
    patientInfoId: number;
    diseaseType: number;
    primaryPosition: number;
    diseasesClassification: number;
    clinicalDiagnosis: object;
    pathologicalType: number;
    pathologicalDiagnosis: object;
    physiqueCondition: object;
    radiotherapyNum: object;
    patientName: object;
    patientSpellName: object;
    age: number;
    birthDay: string;
    sex: number;
    idType: number;
    idNumber: object;
    nationality: object;
    folk: object;
    origin: object;
    address: object;
    hisPatientType: number;
    clinicPatientId: object;
    infeePatientId: object;
    requisitionId: object;
    societyId: object;
    weight: number;
    height: number;
    medicalHistory: object;
    allergyHistory: object;
    smokingStatus: number;
    occupation: object;
    workUnit: object;
    phoneNumber: object;
    secondPhone: object;
    remarks: object;
    chiefDoctorId: object;
    inpatientArea: object;
    sickRoomNumber: object;
    sickBedNumber: object;
    payment: object;
    photographPath: object;
    id: number;
}

export interface Patient {
    radiotherapyNum: string;
    patientName: string;
    patientSpellName: object;
    age: number;
    birthDay: string;
    sex: number;
    idType: number;
    idNumber: string;
    nationality: object;
    folk: number;
    origin: object;
    address: string;
    hisPatientType: number;
    clinicPatientId: object;
    infeePatientId: object;
    requisitionId: object;
    societyId: string;
    weight: number;
    height: number;
    medicalHistory: object;
    allergyHistory: object;
    smokingStatus: number;
    occupation: string;
    workUnit: string;
    phoneNumber: string;
    secondPhone: object;
    remarks: object;
    chiefDoctorId: number;
    inpatientArea: string;
    sickRoomNumber: string;
    sickBedNumber: string;
    payment: number;
    photographPath: string;
    id: number;
}