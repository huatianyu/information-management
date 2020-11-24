import Entity from '../entity'


export default class ProjectLocationDetailed extends Entity<number> {
    scanningLocation: string = '1';
    chiefDoctorId: number =1 ;
    patientName: string = '1';;
    homeDateTime: string = '1';;
    scanningEquipment: string = '1';;
    documentStatus: string = '1';;
    radiotherapyNum: string = '1';;
    locationId: number =1;
    photographPath:string = "./../../../public/static/noImage.png"
}
