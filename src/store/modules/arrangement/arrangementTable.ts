import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ArrangementTable from '../../entities/arrangement/arrangementTable'
import Role from '../../entities/role'
import Patient from '../../entities/patient'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';
import Arrangement from '../../entities/arrangement/arrangement'
import GetArrangement from '../../entities/arrangement/getArrangement'
import RtisDic from '../../entities/arrangement/rtisDictList'

interface ArrangementTableState extends ListState<ArrangementTable> {
    editArrangementTable: ArrangementTable,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
    patientDetail: Patient
    listDecompost: Arrangement[]
    getArrangement: GetArrangement
    rtisDictList: RtisDic[]

}
class ArrangementTableMutations extends ListMutations<ArrangementTable>{

}
class ArrangementTableModule extends ListModule<ArrangementTableState, any, ArrangementTable>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<ArrangementTable>(),
        loading: false,
        resetbutton: false,
        status: true,
        patientDetail: new Patient(),
        editArrangementTable: new ArrangementTable(),
        roles: new Array<Role>(),
        listDecompost: Array<Arrangement>(),
        getArrangement: new GetArrangement(),
        rtisDictList: new Array<RtisDic>()

    }
    actions = {

        async createOrUpdateSchedule(context: ActionContext<ArrangementTableState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/Schedule/CreateOrUpdateSchedule', payload.data);
            if (reponse.data["success"]) {
                return true
            } else {
                return false
            }
        },
        async modifyArrangementmodeAsync(context: ActionContext<ArrangementTableState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/ModifyArrangementmodeAsync', payload.data);
            if (reponse.data["success"]) {
                return true
            } else {
                return false
            }
        },
        async getScheduleDetailedList(context: ActionContext<ArrangementTableState, any>, payload: any) {
            let reponse = await Ajax.get('/api/services/app/Schedule/GetScheduleDetailedList',{ params: payload.data});
            if (reponse.data["success"]) {
                
                // context.state.listDecompost = reponse.data.result.listDecompost as Arrangement[];
                context.state.getArrangement = reponse.data.result as GetArrangement;
                // context.state.rtisDictList = reponse.data.result.listDecompost as RtisDic[];
                // return context.state.listDecompost
            }
        },
        async automaticAppointmentAsync(context: ActionContext<ArrangementTableState, any>, payload: any) {
            if (Object.keys(payload.data).length === 0) {
                return;
            }
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/AutomaticAppointmentAsync', payload.data);
            if (reponse.data["success"]) {
                context.state.listDecompost = reponse.data.result.listDecompost as Arrangement[];
            }

            return context.state.listDecompost
        },

    };
    mutations = {

        setResetbutton(state: ArrangementTableState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: ArrangementTableState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: ArrangementTableState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: ArrangementTableState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ArrangementTableState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: ArrangementTableState, arrangementTable: ArrangementTable) {

            state.editArrangementTable = arrangementTable;
        }
    }
}
const arrangementTableModule = new ArrangementTableModule();
export default arrangementTableModule;