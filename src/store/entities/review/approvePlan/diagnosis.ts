import Entity from '../../entity'
export default class Diagnosis extends Entity<number> {
    patientDiagnosis: PatientDiagnosis ;
    pathologyDiagnosis: PathologyDiagnosis;
    hospitalizedScoreDiagnosis: HospitalizedScoreDiagnosis;
    ctsimData: CtsimData;
    planOrder: PlanOrder[];
}

export interface PlanOrder {
    name: string;
    prescription: Prescription;
    targetPrescriptionDoses: TargetPrescriptionDoses[];
    imperilOrganLimitedDoses: ImperilOrganLimitedDoses[];
    verifyDto: VerifyDto;
}

export interface VerifyDto {
    doseVerifyCheck: string;
    doseVerifyId: string;
    doseVerifySession: DoseVerifySession;
    fieldVerifyCheck: string;
    fieldVerifyId: string;
    fieldVerifySession: FieldVerifySession;
    resetVerifyCheck: string;
    resetVerifyId: string;
    resetVerifySession: ResetVerifySession;
}

export interface ResetVerifySession {
    sessionId: string;
    isTakePhoto: string;
    translationError: string;
    isImageRelation: string;
    id: string;
}

export interface FieldVerifySession {
    sessionId: string;
    verifyType: string;
    verifyCount: string;
    verifyMode: string;
    id: string;
}

export interface DoseVerifySession {
    sessionId: string;
    verifyMode: string;
    id: string;
}

export interface ImperilOrganLimitedDoses {
    prescriptionId: string;
    imperilOrganName: string;
    limitedDoseVolume: string;
    limitedDose: string;
    id: string;
}

export interface TargetPrescriptionDoses {
    prescriptionId: string;
    targetName: string;
    maxDose: string;
    minDose: string;
    averageDose: string;
    volume: string;
    id: string;
}

export interface Prescription {
    courseId: string;
    rayType: string;
    prescribedDose: string;
    treatmentMethod: string;
    irradiationPosition: string;
    fraction: string;
    remarks: string;
    id: string;
}

export interface CtsimData {
    isFixed: string;
    fixedPosition: string;
    bodyPosition: string;
    requirements: string;
    fixedEquipment: string;
    remarks: string;
    planningSystem: string;
    scanningPurpose: string;
    scanningEquipment: string;
    scanningLocation: string;
    scanningRange: string;
    scanningMode: string;
    scanningLayerThickness: string;
    scanningProcess: string;
    iodineAllergyTest: string;
    otherRequirements: string;
    locationId: string;
    id: string;
}

export interface HospitalizedScoreDiagnosis {
    patientDiagnosisId: string;
    kps: string;
    zps: string;
    qol: string;
    pain: string;
    nutrition: string;
    agony: string;
}

export interface PathologyDiagnosis {
    patientDiagnosisId: string;
    tStage: string;
    nStage: string;
    mStage: string;
    stageMethod: string;
    stageRemark: string;
}

export interface PatientDiagnosis {
    patientInfoId: string;
    diseaseType: string;
    primaryPosition: string;
    diseasesClassification: string;
    clinicalDiagnosis: string;
    pathologicalType: string;
    pathologicalDiagnosis: string;
    physiqueCondition: string;
    id: string;
}

