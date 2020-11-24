import Entity from '../entity'
import Prescriptions from './prescriptions'


export default class DiagnosisSets extends Entity<number>{
    prescriptions:Prescriptions[]

}