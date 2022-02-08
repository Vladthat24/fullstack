<template>
    <div>
        <Modal :value="getDeleteModalObj.showDeleteModal" width="360">
            <p slot="header" style="color: #f60; text-align: center">
                <Icon type="ios-information-circle"></Icon>
                <span>Delete confirmation</span>
            </p>
            <div style="text-align: center">
                <p>Are yout sure you want to delete tag?</p>
            </div>
            <div slot="footer">
                <Button
                    type="error"
                    size="large"
                    long
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
    computed: {
        ...mapGetters(["getDeleteModalObj"]),
    },
};
</script>
