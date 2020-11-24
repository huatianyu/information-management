import Entity from '../../entity'
import Patient from './patient'
import Diagnosis from './diagnosis'
export default class LeftPatientInfo extends Entity<number> {
    patient?: Patient;
    diagnosis?: Diagnosis 
}
