<template>
    <div>
        <div class="content">
            <div class="container-fluid">
                <!--~~~~~~~ TABLE ONE ~~~~~~~~~-->
                <div
                    class="
                        _1adminOverveiw_table_recent
                        _box_shadow
                        _border_radious
                        _mar_b30
                        _p20
                    "
                >
                    <p class="_title0">
                        Tags
                        <button @click="addModal = true">
                            <Icon type="md-add" />Add Category
                        </button>
                    </p>

                    <div class="_overflow _table_div">
                        <table class="_table">
                            <!-- TABLE TITLE -->
                            <tr>
                                <th>Id</th>
                                <th>Category image</th>
                                <th>Category name</th>
                                <th>Created at</th>
                                <th>Action</th>
                            </tr>
                            <!-- TABLE TITLE -->

                            <!-- ITEMS -->
                            <tr
                                v-for="(category, i) in categoryList"
                                :key="i"
                                v-if="categoryList.length"
                            >
                                <td>{{ i + 1 }}</td>
                                <td class="table_image">
                                    <img :src="category.iconImage" />
                                </td>
                                <td class="_table_name">
                                    {{ category.categoryName }}
                                </td>
                                <td>{{ category.created_at }}</td>
                                <td>
                                    <button
                                        class="_btn _action_btn edit_btn1"
                                        type="button"
                                        @click="showEditModal(category)"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        class="_btn _action_btn make_btn1"
                                        @click="showDeletingModal(category, i)"
                                        type="button"
                                        :loading="category.isDeleting"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>

                            <!-- ITEMS -->
                        </table>
                    </div>
                </div>

                <!-- CATEGORY ADDING MODAL -->
                <Modal
                    v-model="addModal"
                    title="Add Category"
                    :mask-closable="false"
                    :closable="false"
                >
                    <Input
                        v-model="data.categoryName"
                        placeholder="Add Category name"
                    />
                    <div class="space"></div>

                    <Upload
                        ref="uploads"
                        type="drag"
                        :headers="{
                            'x-csrf-token': token,
                            'X-Requested-With': 'XMLHttpRequest',
                        }"
                        :on-success="handleSuccess"
                        :on-error="handlerError"
                        :format="['jpg', 'jpeg', 'png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handlerMaxSize"
                        action="/app/upload"
                    >
                        <div style="padding: 20px 0">
                            <Icon
                                type="ios-cloud-upload"
                                size="52"
                                style="color: #3399ff"
                            ></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>

                    <div class="demo-upload-list" v-if="data.iconImage">
                        <img :src="`${data.iconImage}`" />
                        <div class="demo-upload-list-cover">
                            <Icon
                                type="ios-trash-outline"
                                @click="deleteImage"
                            ></Icon>
                        </div>
                    </div>

                    <div slot="footer">
                        <Button type="default" @click="addModal = false"
                            >Close</Button
                        >
                        <Button
                            type="primary"
                            @click="addCategory"
                            :disabled="isAdding"
                            :loading="isAdding"
                            >{{
                                isAdding ? "Adding.." : "Add Category"
                            }}</Button
                        >
                    </div>
                </Modal>

                <!-- CATEGORIA EDIT MODAL -->
                <Modal
                    v-model="editModal"
                    title="Editar Category"
                    :mask-closable="false"
                    :closable="false"
                >
                    <Input
                        v-model="editData.categoryName"
                        placeholder="Add Category name"
                    />
                    <div class="space"></div>

                    <Upload
                        v-show="isIconImageNew"
                        ref="editDataUploads"
                        type="drag"
                        :headers="{
                            'x-csrf-token': token,
                            'X-Requested-With': 'XMLHttpRequest',
                        }"
                        :on-success="handleSuccess"
                        :on-error="handlerError"
                        :format="['jpg', 'jpeg', 'png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handlerMaxSize"
                        action="/app/upload"
                    >
                        <div style="padding: 20px 0">
                            <Icon
                                type="ios-cloud-upload"
                                size="52"
                                style="color: #3399ff"
                            ></Icon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </Upload>

                    <div class="demo-upload-list" v-if="editData.iconImage">
                        <img :src="`${editData.iconImage}`" />
                        <div class="demo-upload-list-cover">
                            <Icon
                                type="ios-trash-outline"
                                @click="deleteImage(false)"
                            ></Icon>
                        </div>
                    </div>

                    <div slot="footer">
                        <Button type="default" @click="closeEditModal"
                            >Close</Button
                        >
                        <Button
                            type="primary"
                            @click="editCategory"
                            :disabled="isAdding"
                            :loading="isAdding"
                            >{{
                                isAdding ? "Editing.." : "Edit Category"
                            }}</Button
                        >
                    </div>
                </Modal>
                <!-- TAG ELIMINAR MODAL -->

                <deleteModal></deleteModal>
            </div>
        </div>
    </div>
</template>

<script>
import deleteModal from "../components/deleteModal.vue";
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            data: {
                iconImage: "",
                categoryName: "",
            },
            addModal: false,
            editModal: false,
            isAdding: false,
            categoryList: [],
            editData: {
                iconImage: "",
                categoryName: "",
            },
            index: -1,
            showDeleteModal: false,
            deleteItem: {},
            isDeleing: false,
            deletingIndex: -1,
            token: "",
            isIconImageNew: false,
            isEditingItem: false,
            webiteSettings: [],
        };
    },
    methods: {
        async addCategory() {
            if (this.data.categoryName.trim() == "")
                return this.error("Category name is requeird");
            if (this.data.iconImage.trim() == "")
                return this.error("Icon image is required");
            /* this.data.iconImage = `/uploads/${this.data.iconImage}`; */
            this.data.iconImage = `${this.data.iconImage}`;
            const res = await this.callApi(
                "post",
                "app/create_category",
                this.data
            );
            console.log(res.status);
            if (res.status === 201) {
                this.categoryList.unshift(res.data);
                this.c("Category has been added succesfully!");
                this.addModal = false;
                this.data.categoryName = "";
                this.data.iconImage = "";
            } else {
                if (res.status == 422) {
                    if (res.data.errors.categoryName) {
                        this.error(res.data.errors.categoryName[0]);
                    }
                    if (res.data.errors.iconImage) {
                        this.error(res.data.errors.iconImage[0]);
                    }
                } else {
                    this.swr();
                }
            }
        },
        async editCategory() {
            if (this.editData.categoryName.trim() == "")
                return this.error("Category name is requeird");
            if (this.editData.iconImage.trim() == "")
                return this.error("Icon image is required");
            const res = await this.callApi(
                "post",
                "app/edit_category",
                this.editData
            );
            if (res.status === 200) {
                this.categoryList[this.index] = this.editData.categoryName;
                this.c("Category has been edited successfully!");
                this.editModal = false;
            } else {
                console.log("Error");
                if (res.status == 422) {
                    console.log("Error If 422");
                    if (res.data.errors.categoryName) {
                        this.error(res.data.errors.categoryName[0]);
                    }
                    if (res.data.errors.iconImage) {
                        this.error(res.data.errors.iconImage[0]);
                    }
                } else {
                    this.swr();
                }
            }
        },
        showEditModal(category, index) {
            this.editData = category;
            this.editModal = true;
            this.index = index;
            this.isEditingItem = true;
        },

        //SHOW MODAL PARA ELIMINAR
        showDeletingModal(category, i) {
            const deleteModalObj = {
                showDeleteModal: true,
                deleteUrl: "app/delete_category",
                data: category,
                deletingIndex: i,
                isDeleted: false,
            };
            this.$store.commit("setDeletingModalObj", deleteModalObj);
            /*
            this.deleteItem = tag;
            this.deletingIndex = i;
            this.showDeleteModal = true;
            */
        },
        handleSuccess(res, file) {
            res = `/uploads/${res}`;
            if (this.isEditingItem) {
                return (this.editData.iconImage = res);
            }
            this.data.iconImage = res;
        },
        handlerError(res, file) {
            this.$Notice.warning({
                title: "The file format is incorrect",
                desc: `${
                    file.errors.file.length
                        ? file.errors.file[0]
                        : "Something went wrong!"
                }`,
            });
        },
        handleFormatError(file) {
            console.log(data.iconImage);
            this.$Notice.warning({
                title: "The file format is incorrect",
                desc:
                    "File format of " +
                    file.name +
                    "is incorrect, please select jpg or png",
            });
        },
        handlerMaxSize(file) {
            this.$Notice.warning({
                title: "Exceeding file size limit",
                desc: "File " + file.name + "is too large, no more than 2M",
            });
        },
        async deleteImage(isAdd = true) {
            let image = "";
            if (!isAdd) {
                this.isIconImageNew = true;
                image = this.editData.iconImage;
                this.editData.iconImage = "";
                this.$refs.editDataUploads.clearFiles();
            } else {
                image = this.data.iconImage;
                this.data.iconImage = "";
                this.$refs.uploads.clearFiles();
            }

            const res = await this.callApi("post", "app/delete_image", {
                imageName: image,
            });
            if (res.status != 200) {
                this.data.iconImage = image;
                this.swr();
            }
            console.log(this.editData.iconImage);
        },
        closeEditModal() {
            (this.isEditingItem = false), (this.editModal = false);
        },
    },
    async created() {
        this.token = window.Laravel.csrfToken;
        const res = await this.callApi("get", "app/get_category");
        if (res.status == 200) {
            this.categoryList = res.data;
        } else {
            this.swr();
        }
    },
    components: {
        deleteModal,
    },
    //Para visualizar y actualizar lo eliminado
    computed: {
        ...mapGetters(["getDeleteModalObj"]),
    },
    watch: {
        getDeleteModalObj(obj) {
            console.log(obj);
            if (obj.isDeleted) {
                this.categoryList.splice(obj.deletingIndex, 1);
            }
        },
    },
};
</script>
