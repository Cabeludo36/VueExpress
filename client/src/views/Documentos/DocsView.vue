<template>
  <div id="DocsView" style="padding: 20px">
    <div class="row">
      <h1 style="float: left;"> Documents</h1>
      <router-link class="btn btn-primary" style="float: right;" to="/doc/create">New Document</router-link>
    </div>
   <div class="Users" style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: flex-start;">
    <div v-for="(doc, index) in documentos "
      v-bind:item="doc"
      v-bind:index="index"
      v-bind:key="doc.id"
      :doc="doc"
      style="padding: 40px">
      <DocCard :doc="doc" />
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DocService, { Documento } from "@/services/DocService";
import { userStore } from "@/store/userStore";
import router from "@/router/router";
import DocCard from "@/components/DocCard.vue";

export default defineComponent({
  data() {
    return {
      documentos: [] as Documento[],
      error: "",
    };
  },
  async created() {
    try {
      this.documentos = await DocService.getDocs();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.error = err.messege;
    }
  },
  components: {
    DocCard,
  },
  beforeRouteEnter(to, from, next) {
    if (userStore.state.user.name === "" || userStore.state.user.name == null)
      router.push("/users/login");
    next();
  },
});
</script>


