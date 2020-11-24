import { Store, Module, ActionContext } from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Home from '../entities/home'
import Role from '../entities/role'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'

interface HomeState extends ListState<Home> {
    homeContent: Home,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean

}
class HomeMutations extends ListMutations<Home>{

}
class HomeModule extends ListModule<HomeState, any, Home>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array(),
        loading: false,
        resetbutton: false,
        status: true,
        homeContent: new Home(),
        roles: new Array<Role>()
    }
    actions = {

        async getMainHomeList(context: ActionContext<HomeState, any>, payload: any) {

            let reponse = await Ajax.get('/api/services/app/HomePageAppFlowService/GetMainHomeList', { params: payload.data });
           
            if (reponse.status == 200) {
                context.state.homeContent = reponse.data.result;
            }


        },

        // async getAll(context: ActionContext<HomeState, any>, payload: any) {
        //     context.state.loading = true;
        //     let reponse = await Ajax.get('/api/services/app/Home/GetHomes', { params: payload.data });
        //     context.state.loading = false;
        //     let page = reponse.data.result as PageResult<Home>;
        //     context.state.totalCount = page.totalCount;
        //     context.state.list = page.items;

        // },
        // async save(context: ActionContext<HomeState, any>, payload: any) {
        //     let reponse = await Ajax.post('/api/services/app/Homes/CreateOrUpdateHome', payload.data);
        //     if (reponse.data["success"]) {
        //         context.commit("changeStatus", false);
        //         context.commit("changeResetbutton", true);

        //     }
        // },
        // async update(context: ActionContext<HomeState, any>, payload: any) {
        //     await Ajax.put('/api/services/app/Home/Update', payload.data);
        // },
        // async delete(context: ActionContext<HomeState, any>, payload: any) {
        //     await Ajax.delete('/api/services/app/Home/Delete?Id=' + payload.data.id);
        // },
        // async get(context: ActionContext<HomeState, any>, payload: any) {
        //     let reponse = await Ajax.get('/api/services/app/Home/Get?Id=' + payload.id);
        //     return reponse.data.result as Home;
        // },
        // async getRoles(context: ActionContext<HomeState, any>) {
        //     let reponse = await Ajax.get('/api/services/app/Role/GetRoles');
        //     context.state.roles = reponse.data.result.items as Role[];
        // },
        // async changeLanguage(context: ActionContext<HomeState, any>, payload: any) {
        //     await Ajax.post('/api/services/app/Profile/ChangeLanguage', payload.data);
        // }
    };
    mutations = {

        setResetbutton(state: HomeState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: HomeState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: HomeState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: HomeState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: HomeState, pagesize: number) {

            state.pageSize = pagesize;
        }

    }
}
const homeModule = new HomeModule();
export default homeModule;