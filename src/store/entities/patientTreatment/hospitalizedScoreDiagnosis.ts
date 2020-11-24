import Entity from '../entity'
export default class hospitalizedScoreDiagnosis extends Entity<number>{
    patientDiagnosisId: Number = 0;
    kps: Number;
    zps: Number;
    qol: Number;
    pain: Number;
    nutrition: Number;
    agony: Number;
}