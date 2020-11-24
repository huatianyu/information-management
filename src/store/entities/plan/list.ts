import Entity from '../entity'


// export default class PlanApplication extends Entity<number>{
//     patientTop: PatientTop = new PatientTop();
//     list: List[];
// }

export default class List extends Entity<number>{
    name: string = '处方';
    prescription: Prescription = new Prescription();
    targetPrescriptionDoses: TargetPrescriptionDoses[] = [new TargetPrescriptionDoses(), new TargetPrescriptionDoses()];
    imperilOrganLimitedDoses: ImperilOrganLimitedDoses[] = [new ImperilOrganLimitedDoses(), new ImperilOrganLimitedDoses()];
    verifyDto: VerifyDto = new VerifyDto();
}

class VerifyDto {
    doseVerifyCheck: Number = 0;
    doseVerifyId: Number = 0;
    doseVerifySession: DoseVerifySession = new DoseVerifySession();;
    fieldVerifyCheck: Number = 0;
    fieldVerifyId: Number = 0;
    fieldVerifySession: FieldVerifySession = new FieldVerifySession();
    resetVerifyCheck: Number = 0;
    resetVerifyId: Number = 0;
    resetVerifySession: ResetVerifySession = new ResetVerifySession();;
}

class ResetVerifySession {
    sessionId: Number = 0;
    isTakePhoto: Number = 1;
    translationError: Number = 19;
    isImageRelation: Number = 1;
    id: number = 0;;
}

class FieldVerifySession {
    sessionId: Number = 0;
    verifyType: Number = 1;
    verifyCount: Number = 10;
    verifyMode: Number = 2;
    id: number = 0;
}

class DoseVerifySession {
    sessionId: Number = 0;
    verifyMode: Number = 2;
    id: Number = 0;
}

class ImperilOrganLimitedDoses {
    prescriptionId: Number = 0;
    imperilOrganName: string = '1';
    limitedDoseVolume: Number = 0;
    limitedDose: Number = 0;
    id: Number = 0;
}

class TargetPrescriptionDoses {
    prescriptionId: Number = 0;
    targetName: string = '2';
    maxDose: Number = 0;
    minDose: Number = 0;
    averageDose: Number = 0;
    volume: Number = 0;
    id: number = 0;
}

class Prescription {
    courseId: Number = 0;
    rayType: Number = 1;
    prescribedDose: Number = 0;
    treatmentMethod: Number = 1;
    irradiationPosition: Number = 0;
    fraction: Number = 0;
    remarks: string = '1';
    id: Number = 0;
}

