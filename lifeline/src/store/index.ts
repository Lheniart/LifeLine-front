import type {DaeWithDistance} from "@/api/models";
import {createStore} from "vuex";

interface State {
    daeList: DaeWithDistance[] | null;
}

const store = createStore<State>(
    {
        state:{
            daeList: null
        },
        mutations:{
            setDaeList(state: State, daeList: DaeWithDistance[]){
                state.daeList = daeList;
                console.log(state.daeList)
            }
        },
        getters: {
            daeList(state: State){
                return state.daeList;
            }
        }
    }
)
export default store;
