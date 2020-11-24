import Entity from '../entity'

export default class MedicalOrder extends Entity<number>{
    radiotherapyNum: String;
    ctsOrder?: CtsOrder[] ;
    plannings: Plannings[] ;
    location: false;
    msg: string;
    plan: false;

}

class CtsOrder {
    id: Number
    state: String
    appointmentTime: String 
}
class Plannings {
    id: Number
    state: Number 
    planningDate: String 

}