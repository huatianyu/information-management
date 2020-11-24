import Entity from '../entity'
export default class pathologyDiagnosis extends Entity<number>{
    patientDiagnosisId: Number = 0;
    tStage: Number;
    nStage: Number;
    mStage: Number;
    stageMethod: Number;
    stageRemark: String;
}