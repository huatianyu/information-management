
export default class GetArrangement {

  radiotherapyNum: string;
  sessionId: number;
  schedulePlan: SchedulePlan;
}

export interface SchedulePlan {
  planTop: PlanTop[];

}

export interface PlanTop {
  planId: number;
  planName: string;
  state: string;
  prescibedDose: number;
  dosePerFraction: number;
  fractionCount: number;
  postpone: number;
  fractionGroupId: number;
  scheduleInfo: ScheduleInfo[];
  rowHeaders: any[];
}

export interface ScheduleInfo {

}