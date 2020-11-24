import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ScheduleList from '../../entities//schedule/schedulelist'
import Role from '../../entities/role'
import Patient from '../../entities/patient'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface ScheduleListState extends ListState<ScheduleList> {
    editScheduleList: ScheduleList,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
    patientDetail: Patient


}
class ScheduleListMutations extends ListMutations<ScheduleList>{

}
class ScheduleListModule extends ListModule<ScheduleListState, any, ScheduleList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 6,
        list: new Array(),
        loading: false,
        resetbutton: false,
        status: true,
        patientDetail: new Patient(),
        editScheduleList: new ScheduleList(),
        roles: new Array<Role>(),
    }
    actions = {
        async appointmentUncompleteListQueryAsync(context: ActionContext<ScheduleListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/AppointmentUncompleteListQueryAsync', payload.data);
            context.state.loading = false;
            let page = reponse.data.result
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;

        },

        async appointmentCompleteListQueryAsync(context: ActionContext<ScheduleListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.post('/api/services/app/AppointmentWorkFlowService/AppointmentCompleteListQueryAsync', payload.data);
            context.state.loading = false;
            let page = reponse.data.result
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;

        },

        async save(context: ActionContext<ScheduleListState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/ScheduleLists/CreateOrUpdateScheduleList', payload.data);
            if (reponse.data["success"]) {
                context.commit("changeStatus", false);
                context.commit("changeResetbutton", true);
            }
        },


    };
    mutations = {
        setResetbutton(state: ScheduleListState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: ScheduleListState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: ScheduleListState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: ScheduleListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ScheduleListState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: ScheduleListState, scheduleList: ScheduleList) {

            state.editScheduleList = scheduleList;
        }
    }
}
const scheduleListModule = new ScheduleListModule();
export default scheduleListModule;