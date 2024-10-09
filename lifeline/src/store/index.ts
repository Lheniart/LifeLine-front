import { defineStore } from 'pinia';
import type { DaeWithDistance } from '@/api/models';

export const useDaeStore = defineStore('dae', {
    state: () => ({
        daeList: null as DaeWithDistance[] | null,
        daeSelected: null as DaeWithDistance | null,
    }),
    actions: {
        setDaeList(daeList: DaeWithDistance[]) {
            this.$patch({ daeList });
        },
        setDaeSelected(dae: DaeWithDistance) {
            console.log(dae)
            this.$patch({ daeSelected : dae });
            console.log(this.daeSelected)

        },
    },
    getters: {
        daeListCount: (state) => state.daeList?.length || 0,
    },
    persist: true
});

export default useDaeStore;
