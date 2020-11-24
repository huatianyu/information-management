import { Store, Module, ActionContext } from 'vuex'
import ListModule from '../list-module'
import ListState from '../list-state'
import LocationList from '../../entities/locationList'
import Role from '../../entities/role'
import Patient from '../../entities/patient'
import Ajax from '../../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from '../list-mutations'
import { router } from '@/router/index';

interface LocationListState extends ListState<LocationList> {
    editLocationList: LocationList,
    roles: Role[],
    resetbutton: Boolean
    status: Boolean
    patientDetail: Patient


}
class LocationListMutations extends ListMutations<LocationList>{

}
class LocationListModule extends ListModule<LocationListState, any, LocationList>{
    state = {
        totalCount: 0,
        currentPage: 1,
        pageSize: 10,
        list: new Array<LocationList>(),
        loading: false,
        resetbutton: false,
        status: true,
        patientDetail: new Patient(),
        editLocationList: new LocationList(),
        roles: new Array<Role>(),
    }
    actions = {
        async createResetConditionsAndCtsimrecordAsync(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.post('/api/services/app/ResetConditions/CreateResetConditionsAndCtsimrecordAsync', payload.data);
            if (reponse.data["success"]) {
                return reponse.data;

            }
        },

        async updateResetConditionsAndCtsimrecord(context: ActionContext<LocationListState, any>, payload: any) {
            let reponse = await Ajax.put('/api/services/app/ResetConditions/UpdateResetConditionsAndCtsimrecord', payload.data);
            if (reponse.data["success"]) {
                return reponse.data;

            }
        }
    };
    mutations = {

        setResetbutton(state: LocationListState, sate: boolean) {
            state.resetbutton = sate;
        },
        changeStatus(state: LocationListState, sate: boolean) {

            state.status = sate;
        },
        changeResetbutton(state: LocationListState, sate: boolean) {
            state.resetbutton = sate;
        }
        ,
        setCurrentPage(state: LocationListState, page: number) {
            state.currentPage = page;
        },
        setPageSize(state: LocationListState, pagesize: number) {

            state.pageSize = pagesize;
        },
        edit(state: LocationListState, locationList: LocationList) {

            state.editLocationList = locationList;
        }
    }
}
const locationListModule = new LocationListModule();
export default locationListModule;