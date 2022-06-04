<template>
    <div>
        <Modal
            :value="getDeleteModalObj.showDeleteModal"
            :mask-closable="false"
            :closable="false"
            width="360"
        >
            <p slot="header" style="color: #f60; text-align: center">
                <Icon type="ios-information-circle"></Icon>
                <span>Delete confirmation</span>
            </p>
            <div style="text-align: center">
                <p>Are yout sure you want to delete tag?</p>
            </div>
            <div slot="footer">
                <Button
                    type="default"
                    size="large"
                    :disabled="isDeleing"
                    @click="closeModal"
                    >Close
                </Button>
                <Button
                    type="error"
                    size="large"
                    :loading="isDeleing"
                    :disabled="isDeleing"
                    @click="deleteTag"
                    >Delete
                </Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            isDeleing: false,
        };
    },
    methods: {
        async deleteTag() {
            this.isDeleing = true;
            const res = await this.callApi(
                "post",
                this.getDeleteModalObj.deleteUrl,
                this.getDeleteModalObj.data
            );
            if (res.status === 200) {
                this.c("Tag has been deleted successsfully");
                this.$store.commit("setDeleteModal", true);
            } else {
                this.swr();
                this.$store.commit("setDeleteModal", false);
            }
        },
        closeModal() {
            this.$store.commit("setDeleteModal", false);
        },
    },
    computed: {
        ...mapGetters(["getDeleteModalObj"]),
    },
};
</script>
