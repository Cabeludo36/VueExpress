<template>
    teste {{id}}
    <button @click="teste">teste</button>
    <textarea @input="mandarBrodcast" v-model="texto" name="teste" id="breno" cols="30" rows="10"></textarea>
    <h1>oi</h1>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Socket } from 'socket.io-client'
import state from '@/store/index'

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
        },
    },
    updated() {
        this.id = state.state.socket.id;
        this.socket = state.state.socket;
    },
    
    beforeRouteLeave(to, from, next) {
        state.dispatch('desconectaSocket')
        next()
    },
})
</script>
