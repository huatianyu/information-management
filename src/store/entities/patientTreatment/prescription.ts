import Entity from '../entity'
export default class Prescription extends Entity<number>{
    courseId: number;
    rayType: number;
    prescribedDose: number;
    treatmentMethod: number;
    irradiationPosition: number;
    fraction: number;
    remarks: string;
    action: number;
    id: number = 0;
}