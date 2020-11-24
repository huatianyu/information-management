import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../../list-module'
import ListState from '../../list-state'
import Consent from '../../../entities/patientTreatment/consent/consent'
import Util from "@/lib/util";
import Role from '../../../entities/role'
import Ajax from '../../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../../list-mutations'

interface ConsentState extends ListState<Consent> {
    consent: Consent


}
class ConsentMutations extends ListMutations<Consent>{

}
class ConsentModule extends ListModule<ConsentState, any, Consent>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<Consent>(),
        loading: false,
        consent: new Consent(),
    }
    actions = {
        async getSinglePatient(context: ActionContext<ConsentState, any>, payload: any) {
            context.state.loading = true;
            let reponse = await Ajax.get('/api/services/app/InformedConsent/GetSinglePatient', { params: payload.data });
            context.commit("changeConsent", reponse.data.result);
        },
    };
    mutations = {
        setCurrentPage(state: ConsentState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: ConsentState, pagesize: number) {

            state.pageSize = pagesize;
        }
        ,
        changeConsent(state: ConsentState, consent: Consent) {
            state.consent = consent;

        }

    }
}
const Module = new ConsentModule();
export default Module;