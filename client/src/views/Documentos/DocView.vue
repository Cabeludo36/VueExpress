<template>
    teste {{id}}
    <button @click="teste">teste</button>
    <textarea @input="teste" name="teste" id="breno" cols="30" rows="10"></textarea>
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
        }
    },
    created() {
        state.dispatch('criaSocket')
    },
    methods: {
        teste() {
            console.log(this.id)
            console.log(this.socket)
            console.log(state.state.socket)
            this.id = state.state.socket.id
            this.$forceUpdate()
        },
    },
    beforeRouteLeave(to, from, next) {
        state.dispatch('desconectaSocket')
        next()
    },
})
</script>
