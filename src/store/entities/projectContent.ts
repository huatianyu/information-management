import Entity from './entity'


// export interface ProjectTime {
//     timeListEnent: TimeListEnent[];
// }

// export interface TimeListEnent {
//     title: string;
//     start: string;
//     end: string;
// }


export default class ProjectContent extends Entity<number>{

    locationCtismList?: LocationCtismList[];
    projectLocationDetailed?: ProjectLocationDetailed[];
    examineLocationResult?: ExamineLocationResult[];
    examinetPlanDetailed?: ExaminetPlanDetailed[];
    approvaltPlanDetailed?: any[];
    approvaltTreatment?: any[];
    planOrderList?: PlanOrderList[];
}

type PlanOrderList = ExaminetPlanDetailed;

export interface ExaminetPlanDetailed {
    id: number;
    patientName: string;
    photographPath: object;
    radiotherapyNum: string;
    startTime: string;
    state: string;
    chiefDoctorId: number;
    treatmentMethod: number;
    deviceId: number;
    workstationId: number;
}

export interface ExamineLocationResult {
    patientName: string;
    radiotherapyNum: string;
    imageDate: string;
    state: string;
    planningSystem: number;
    scanningLocation: number;
    chiefDoctorId: number;
    locationId: number;
    id: number;
    imageId: number;
}

export interface ProjectLocationDetailed {
    scanningLocation: object;
    chiefDoctorId: number;
    patientName: string;
    homeDateTime: string;
    scanningEquipment: object;
    state: object;
    radiotherapyNum: string;
    locationId: number;
    photographPath: object;
    id: number;
}

export interface LocationCtismList {
    chiefDoctorId: number;
    patientName: string;
    homeDateTime: string;
    state: object;
    radiotherapyNum: string;
    locationId: number;
    id: number;
}

export interface ProjectTop {
    locationCount: number;
    pictureRoute: string | object;
    entryName: string;
}

