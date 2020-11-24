import Entity from '../entity'
import PatientDiagnosis from './patientDiagnosis'
import PathologyDiagnosis from './pathologyDiagnosis'
import HospitalizedScoreDiagnosis from './hospitalizedScoreDiagnosis'

export default class diagnosis extends Entity<number>{
    patientDiagnosis: PatientDiagnosis = new PatientDiagnosis();
    pathologyDiagnosis: PathologyDiagnosis = new PathologyDiagnosis();
    hospitalizedScoreDiagnosis: HospitalizedScoreDiagnosis = new HospitalizedScoreDiagnosis();
}