import Entity from '../entity'
import Info from './prescription'
import PatientTop from './headerPatientInfo'

export default class PrescriptionDetail extends Entity<number>{
    info:Info= new Info()
    patientTop:PatientTop = new PatientTop()
}