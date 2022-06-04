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
            deletingIndex: -1,
            isDeleted: false,
        },
    },
    getters: {
        getDeleteModalObj(state) {
            return state.deleteModalObj;
        },
    },
    mutations: {
        setDeleteModal(state, data) {
            const deleteModalObj = {
                showDeleteModal: false,
                deleteUrl: "",
                data: null,
                deletingIndex: -1,
                isDeleted: data,
            };
            state.deleteModalObj = deleteModalObj;
            /*            state.deleteModalObj.isDeleted = data; */
        },
        setDeletingModalObj(state, data) {
            state.deleteModalObj = data;
        },
    },
    actions: {},
});
