<template>
  <div id="DocNovoView" class="container p-5 text-white text-center">
    <div>
      <h1 style="float:center;">New Document</h1>
    </div>
    <div class="container p-5 text-white text-left">
      <form @submit.prevent="submit">
        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" v-model="titulo" placeholder="Nome do documento">
          <label for="desc">Descrição</label>
          <input type="text" class="form-control" id="desc" v-model="descricao" placeholder="Descrição do documento">
        </div>
        <button type="submit" class="btn btn-primary">Criar</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import router from '@/router/router';
import DocService, { Documento } from '@/services/DocService';
import { userStore } from '@/store/userStore';
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      titulo: '',
      descricao: '',
    }
  },
  methods: {
    submit() {
      DocService.create(this.titulo, this.descricao, Number(userStore.state.user.id)).then((doc:Documento) => {
        router.push({ name: 'Doc', params: { id: doc.id } });
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (userStore.state.user.name === "" || userStore.state.user.email == null)
      router.push("/users/login");
    next();
  },
})
</script>
