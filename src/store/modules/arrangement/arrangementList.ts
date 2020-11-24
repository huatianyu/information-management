import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ArrangementList from '../../entities/arrangement/arrangementlist'
import Role from '../../entities/role'
import Patient from '../../entities/patient'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface ArrangementListState extends ListState<ArrangementList> {
    editArrangementList: ArrangementList,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
    patientDetail: Patient


}
class ArrangementListMutations extends ListMutations<ArrangementList>{

}
class ArrangementListModule extends ListModule<ArrangementListState, any, ArrangementList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array(),
        loading: false,
        resetbutton: false,
        status: true,
        patientDetail: new Patient(),
        editArrangementList: new ArrangementList(),
        roles: new Array<Role>(),
    }
    actions = {
        async schedulesUnCompleteListQueryAsync(context: ActionContext<ArrangementListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/Schedule/getSchedulesUnCompleteListQueryAsync', { params: payload.data });
            context.state.loading = false;
            let page = reponse.data.result
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;
        },

        async schedulesCompleteListQueryAsync(context: ActionContext<ArrangementListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/Schedule/GetSchedulesCompleteListQueryAsync', { params: payload.data });
            context.state.loading = false;
            let page = reponse.data.result
            context.state.totalCount = page.totalCount;
            context.state.list = page.items;

        },

        async save(context: ActionContext<ArrangementListState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/ArrangementLists/CreateOrUpdateArrangementList', payload.data);
            if (reponse.data["success"]) {
                context.commit("changeStatus", false);
                context.commit("changeResetbutton", true);
            }
        },


    };
    mutations = {
        setResetbutton(state: ArrangementListState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: ArrangementListState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: ArrangementListState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: ArrangementListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ArrangementListState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: ArrangementListState, arrangementList: ArrangementList) {

            state.editArrangementList = arrangementList;
        }
    }
}
const arrangementListModule = new ArrangementListModule();
export default arrangementListModule;