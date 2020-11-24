import Entity from '../entity'
import Diagnosis from './diagnosis'
import Patient from './patient'
export default class PatientTreatmentDetail extends Entity<number>{
    patient: Patient= new Patient();
    diagnosis: Diagnosis =  new Diagnosis();
}