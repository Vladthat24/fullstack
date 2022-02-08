import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);

export default new vuex.Store({
    state: {
        counter: 1000,
        deleteModalObj: {
            showDeleteModal: false,
            deleteUrl: "",
            data: null,
        },
    },
    getters: {
        getDeleteModalObj(state) {
            return state.deleteModalObj;
        },
    },
    mutations: {},
    actions: {},
});
