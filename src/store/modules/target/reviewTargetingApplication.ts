import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ReviewTargetingApplication from '../../entities/target/reviewTargetingApplication'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface ReviewTargetingApplicationState extends ListState<ReviewTargetingApplication> {
    editReviewTargetingApplication: ReviewTargetingApplication,
    resetbutton: Boolean
    status: Boolean
    routerName: String

}
class ReviewTargetingApplicationMutations extends ListMutations<ReviewTargetingApplication>{

}
class ReviewTargetingApplicationModule extends ListModule<ReviewTargetingApplicationState, any, ReviewTargetingApplication>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<ReviewTargetingApplication>(),
        loading: false,
        routerName: null
    }
    actions = {

        async ctsimOrderAgreedAsync(context: ActionContext<ReviewTargetingApplicationState, any>, payload: any) {
            let  reponse = await Ajax.post('/api/services/app/CtsimOrderFlow/CtsimOrderAgreedAsync', payload.data);

            if (reponse.data["success"]) {
                // context.state.isEditStatus = true
                // context.commit("changeStatus", false);
                // context.commit("setPlanApplication", reponse.data["result"]);
                return reponse.data
            }
        },

    };
    mutations = {

        setRouterName(state: ReviewTargetingApplicationState, routerName: String) {
            state.routerName = routerName;
        },
        setCurrentPage(state: ReviewTargetingApplicationState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ReviewTargetingApplicationState, pagesize: number) {

            state.pageSize = pagesize;
        }

    }
}
const reviewTargetingApplicationModule = new ReviewTargetingApplicationModule();
export default reviewTargetingApplicationModule;