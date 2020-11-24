import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import ReviewList from '../../entities/review/reviewList'
import Role from '../../entities/role'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface ReviewListState extends ListState<ReviewList> {
    reviewList: ReviewList,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
}
class ReviewListMutations extends ListMutations<ReviewList>{

}
class ReviewListModule extends ListModule<ReviewListState, any, ReviewList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<ReviewList>(),
        loading: true,
        status: true,
        reviewList: new ReviewList(),
        roles: new Array<Role>(),
    }
    actions = {

        async getExamineCountAsync(context: ActionContext<ReviewListState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/ExamineFlowAppFlowService/GetExamineCountAsync', { params: payload.data });
            if (reponse.data["success"]) {
                context.commit("setReviewList", reponse.data["result"]);
                context.state.loading = false;
            }
        }

    };
    mutations = {
        setCurrentPage(state: ReviewListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ReviewListState, pagesize: number) {
            state.pageSize = pagesize;
        },
        setReviewList(state: ReviewListState, reviewList: ReviewList) {
            state.reviewList = reviewList;
        }
    }
}
const reviewListModule = new ReviewListModule();
export default reviewListModule;