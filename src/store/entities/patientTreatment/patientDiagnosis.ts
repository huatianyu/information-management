import Entity from '../entity'
export default class patientDiagnosis extends Entity<number>{
    patientInfoId: Number;
    diseaseType: Number;
    primaryPosition: Number;
    diseasesClassification: Number;
    clinicalDiagnosis: String;
    pathologicalType: Number;
    pathologicalDiagnosis: String;
    physiqueCondition: String;
    id: number;
}