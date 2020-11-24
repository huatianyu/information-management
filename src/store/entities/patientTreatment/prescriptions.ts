import Entity from '../entity'


export default class Prescriptions extends Entity<number>{
    courseId: Number;
    rayType: Number;
    prescribedDose: Number;
    treatmentMethod: Number;
    irradiationPosition: Number;
    fraction: Number;
    remarks: String;
    action: Number;
    id: number;
}