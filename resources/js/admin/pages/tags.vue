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
              <Icon type="md-add" />Add Tags
            </button>
          </p>

          <div class="_overflow _table_div">
            <table class="_table">
              <!-- TABLE TITLE -->
              <tr>
                <th>Id</th>
                <th>Tag name</th>
                <th>Created at</th>
                <th>Action</th>
              </tr>
              <!-- TABLE TITLE -->

              <!-- ITEMS -->
              <tr v-for="(tag, i) in tags" :key="i" v-if="tags.length">
                <td>{{ i + 1 }}</td>
                <td class="_table_name">
                  {{ tag.tagName }}
                </td>
                <td>{{ tag.created_at }}</td>
                <td>
                  <button
                    class="_btn _action_btn edit_btn1"
                    type="button"
                    @click="showEditModal(tag)"
                  >
                    Edit
                  </button>
                  <button
                    class="_btn _action_btn make_btn1"
                    @click="showDeletingModal(tag, i)"
                    type="button"
                    :loading="tag.isDeleting"
                  >
                    Delete
                  </button>
                </td>
              </tr>

              <!-- ITEMS -->
            </table>
          </div>
        </div>

        <!-- TAG ADDING MODAL -->
        <Modal
          v-model="addModal"
          title="Add Tags"
          :mask-closable="false"
          :closable="false"
        >
          <Input v-model="data.tagName" placeholder="Add tag name" />

          <div slot="footer">
            <Button type="default" @click="addModal = false">Close</Button>
            <Button
              type="primary"
              @click="addTag"
              :disabled="isAdding"
              :loading="isAdding"
              >{{ isAdding ? "Adding.." : "Add Tags" }}</Button
            >
          </div>
        </Modal>

        <!-- TAG EDIT MODAL -->
        <Modal
          v-model="editModal"
          title="Editar Tags"
          :mask-closable="false"
          :closable="false"
        >
          <Input v-model="editData.tagName" placeholder="Edit tag name" />

          <div slot="footer">
            <Button type="default" @click="editModal = false">Close</Button>
            <Button
              type="primary"
              @click="editTag"
              :disabled="isAdding"
              :loading="isAdding"
              >{{ isAdding ? "Editing.." : "Edit tag" }}</Button
            >
          </div>
        </Modal>

        <Modal v-model="showDeleteModal" width="360">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        tagName: "",
      },
      addModal: false,
      editModal: false,
      isAdding: false,
      tags: [],
      editData: {
        tagName: "",
      },
      showDeleteModal: false,
      deleteItem: {},
      isDeleing: false,
      deletingIndex: -1,
    };
  },
  methods: {
    async addTag() {
      if (this.data.tagName.trim() == "")
        return this.error("Tag name is requeird");
      const res = await this.callApi("post", "app/create_tag", this.data);
      console.log(res.status);
      if (res.status === 201) {
        this.tags.unshift(res.data);
        this.c("Tag has been added succesfully!");
        this.addModal = false;
        this.data.tagName = "";
      } else {
        if (res.status == 422) {
          if (res.data.errors.tagName) {
            this.error(res.data.errors.tagName[0]);
          }
        } else {
          this.swr();
        }
      }
    },
    async editTag() {
      if (this.editData.tagName.trim() == "")
        return this.error("Tag name is required");
      const res = await this.callApi("post", "app/edit_tag", this.editData);
      if (res.status === 200) {
        this.c("Tag has been edited successfully!");
        this.editModal = false;
      } else {
        if (res.status == 422) {
          if (res.data.errors.tagName) {
            this.error(res.data.errors.tagName[0]);
          }
        } else {
          this.swr();
        }
      }
    },
    showEditModal(tag) {
      this.editData = tag;
      this.editModal = true;
    },

    //ELIMINAR
    async deleteTag() {
      this.isDeleing = true;
      const res = await this.callApi("post", "app/delete_tag", this.deleteItem);
      if (res.status === 200) {
        this.tags.splice(this.deletingIndex, 1);
        this.c("Tag has been deleted successsfully");
      } else {
        this.swr();
      }
      this.isDeleing = false;
      this.showDeleteModal = false;
    }, //SHOW MODAL PARA ELIMINAR
    showDeletingModal(tag, i) {
      this.deleteItem = tag;
      this.deletingIndex = i;
      this.showDeleteModal = true;
    },
  },
  async created() {
    const res = await this.callApi("get", "app/get_tags");
    if (res.status == 200) {
      this.tags = res.data;
    } else {
      this.swr();
    }
  },
  /*   async created() {
    const res = await this.callApi("post", "/app/create_tag", {
      tagName: "testtag",
    });

    if (res.status == 200) {
      console.log(res);
    } else {
      console.log("running");
    }
  }, */
};
</script>
