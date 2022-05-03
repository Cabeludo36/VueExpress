<template>
  <div id="DocsView">
    <div class="row">
      <h1 style="float: left;">Documentos</h1>
      <router-link class="btn btn-primary" style="float: right;" to="/doc/create">Novo Documento</router-link>
    </div>
    <div v-for="(doc, index) in documentos"
      v-bind:item="doc"
      v-bind:index="index"
      v-bind:key="doc.id"
      :doc="doc"
      style="padding: 20px"
    >
      <DocCard :doc="doc" />
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
