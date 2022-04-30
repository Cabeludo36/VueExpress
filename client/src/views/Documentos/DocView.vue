<template>
    teste {{id}}
    <textarea @input="mandarBrodcast" v-model="texto" name="teste" id="breno" cols="30" rows="10"></textarea>
    <h1>oi</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Socket } from 'socket.io-client'
import state from '@/store/index'
import DocService, { Documento } from "@/services/DocService";
import { userStore } from '@/store/userStore';
import router from '@/router/router';

export default defineComponent({
    data() {
        return {
            socket: state.state.socket as Socket,
            id: state.state.socket.id as string,
            texto: ''
        }
    },
    created() {
        state.dispatch('criaSocket');
        this.id = state.state.socket.id;
        this.socket = state.state.socket;

        this.socket.emit('entrarRoom', this.$route.params.id)
        this.getRealtimeData();
    },
    methods: {
        mandarBrodcast() {
            this.socket.emit('mandarTexto', this.texto);
            this.$forceUpdate();
        },
        getRealtimeData() {
            this.socket.on('mandarTextoServer', (data:string) => {
                this.texto = data;
                this.$forceUpdate();
            });
            this.socket.on('novoUserRoom', () => {
                this.mandarBrodcast();
            });

            this.socket.on('primeiraEntrada', (valor:boolean) => {
                if (valor) {
                    DocService.getDoc(Number(this.$route.params.id)).then((doc:Documento) => {
                        this.texto = doc.texto;
                        this.$forceUpdate();
                    });
                }
            });
        },
        
    },
    updated() {
        this.id = state.state.socket.id;
        this.socket = state.state.socket;
    },
    beforeRouteEnter(to, from, next) {
    if (userStore.state.user.name == "" || userStore.state.user.name == null)
      router.push("/users/login");
    next();
  },
    beforeRouteLeave(to, from, next) {
        state.dispatch('desconectaSocket')
        next()
    },
})
</script>
