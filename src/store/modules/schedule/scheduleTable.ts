import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ScheduleTable from '../../entities/schedule/scheduleTable'
import Role from '../../entities/role'
import Patient from '../../entities/patient'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';
import Schedule from '../../entities/schedule/schedule'
import GetSchedul from '../../entities/schedule/getSchedul'
import RtisDic from '../../entities/schedule/rtisDictList'
import PlanList from '../../entities/schedule/planList'

interface ScheduleTableState extends ListState<ScheduleTable> {
    editScheduleTable: ScheduleTable,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
    patientDetail: Patient
    listDecompost: Schedule[]
    getSchedul: GetSchedul
    planList:PlanList[]
    rtisDictList: RtisDic[]

}
class ScheduleTableMutations extends ListMutations<ScheduleTable>{

}
class ScheduleTableModule extends ListModule<ScheduleTableState, any, ScheduleTable>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<ScheduleTable>(),
        loading: false,
        resetbutton: false,
        status: true,
        patientDetail: new Patient(),
        editScheduleTable: new ScheduleTable(),
        roles: new Array<Role>(),
        listDecompost: Array<Schedule>(),
        getSchedul: new GetSchedul(),
        rtisDictList: new Array<RtisDic>(),
        planList:new Array<PlanList>()
    }
    actions = {

        async createAppointmentAsync(context: ActionContext<ScheduleTableState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/CreateAppointmentAsync', payload.data);
            if (reponse.data["success"]) {
                return true
            } else {
                return false
            }
        },
        async modifySchedulemodeAsync(context: ActionContext<ScheduleTableState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/ModifySchedulemodeAsync', payload.data);
            if (reponse.data["success"]) {
                return true
            } else {
                return false
            }
        },
        async appointmentDetailedListAsync(context: ActionContext<ScheduleTableState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/AppointmentDetailedListAsync', payload.data);
            if (reponse.data["success"]) {
                context.state.listDecompost = reponse.data.result.listDecompost as Schedule[];
                context.state.getSchedul = reponse.data.result.mainPatientInfoDtoData as GetSchedul;
                context.state.planList = reponse.data.result.planList as PlanList[];
                return context.state.listDecompost
            }
        },
        async automaticAppointmentAsync(context: ActionContext<ScheduleTableState, any>, payload: any) {
            if (Object.keys(payload.data).length === 0) {
                return;
            }
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/AutomaticAppointmentAsync', payload.data);
            if (reponse.data["success"]) {
                context.state.listDecompost = reponse.data.result.listDecompost as Schedule[];
            }

            return context.state.listDecompost
        },

    };
    mutations = {

        setResetbutton(state: ScheduleTableState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: ScheduleTableState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: ScheduleTableState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: ScheduleTableState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ScheduleTableState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: ScheduleTableState, scheduleTable: ScheduleTable) {

            state.editScheduleTable = scheduleTable;
        }
    }
}
const scheduleTableModule = new ScheduleTableModule();
export default scheduleTableModule;