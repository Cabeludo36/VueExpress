<template>
<div class="container p-5 bg-gradient-dark text-light text-left">
  <h2>{{documento.name}}</h2>
    <textarea  @input="mandarBrodcast" v-model="documento.texto" name="teste" id="breno" style="width:100%;height:1000px" placeholder="Enter a text message..."></textarea>
    </div>
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
            documento: {} as Documento,
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
            this.socket.emit('mandarTexto', this.documento.texto);
            this.$forceUpdate();
        },
        getRealtimeData() {
            this.socket.on('mandarTextoServer', (data:string) => {
                this.documento.texto = data;
                this.$forceUpdate();
            });
            this.socket.on('novoUserRoom', () => {
                this.mandarBrodcast();
            });

            this.socket.on('primeiraEntrada', (valor:boolean) => {
                if (valor) {
                    DocService.getDoc(Number(this.$route.params.id)).then((doc:Documento) => {
                        this.documento = doc;
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
        this.socket.emit('sairRoom', this.$route.params.id);
        this.socket.on('ultimaSaida', (value:boolean) => {
            if (value) {
                DocService.update(this.documento)
            }
            state.dispatch('desconectaSocket');
        });
        next()
    },
})
</script>
