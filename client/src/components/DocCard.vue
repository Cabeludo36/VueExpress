<template>
  <div class="docCard">
    <h1>{{ doc.nome }}</h1>
    <p>{{ doc.descricao }}</p>
    <router-link :to="{ name: 'Doc', params: { id: doc.id } }">
      <a class="btn btn-primary">Edit</a>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Documento } from "@/services/DocService";

export default defineComponent({
  props: {
    doc: {
      type: Object,
      required: true,
    },
  },
  doc: {} as Documento,
});
</script>
