<template>
    <div id="chatView">
        <div style="width: 90%; background-color: white; display: flex; flex-direction: column; padding: 5px;">
            <div v-for="(msg,index) in msgs" :key="index">
                <p v-if="msg.user_id == user.id && msg.content !== ''" style="float: right; background-color: forestgreen; margin-right: 2%; padding: 5px; border-radius: 5px;">{{msg.content}}</p>
                <p v-else-if="msg.content !== ''" style="float: left; background-color: darkgrey; margin-left: 2%; padding: 5px; border-radius: 5px;">{{msg.content}}</p>
            </div>
        </div>
        <form @submit.prevent="sendMsg()" class="fixed-bottom">
            <input type="text" style="width: 90%;" v-model="texto" placeholder="Digite sua mensagem">
            <button style="margin-left: 5px;" type="submit" class="btn btn-info" @click="sendMsg()">Enviar</button>
        </form>
    </div>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import state from '@/store/index'

import { Socket } from 'socket.io-client'
import MsgService, { msg } from '@/services/MsgService';
import router from '@/router/router';
import { userStore } from '@/store/userStore';
import { User } from '@/services/UserService';

export default defineComponent({
    data() {
        return {
            texto: '',
            socket: state.state.socket as Socket,
            id: state.state.socket.id as string,
            user: userStore.state.user as User,
            msgs: [{}] as msg[],
        }
    },
    async created() {
        state.dispatch('criaSocket');

        this.id = state.state.socket.id;
        this.socket = state.state.socket;

        this.msgs = await MsgService.getMsgs(Number(this.$route.params.id))

        this.getRealtimeData();
    },
    methods: {
        sendMsg() {
            this.socket.emit('sendMsg', {
                content: this.texto,
                user_id: this.user.id as number,
                room_id: Number(this.$route.params.id) as number,
            } as msg)
            this.texto = ''
            this.$forceUpdate();
        },
        getRealtimeData() {
            this.socket.on('receberMsg', (msg:msg) => {
                console.log('recebi: ' + msg.content )
                MsgService.getMsgs(Number(this.$route.params.id)).then((msgs:msg[]) => {
                    this.msgs = msgs;
                    this.$forceUpdate();
                });
                this.$forceUpdate();
            });
        }
    },
    updated() {
        this.id = state.state.socket.id;
        this.socket = state.state.socket;

        MsgService.getMsgs(Number(this.$route.params.id)).then((msgs:msg[]) => {
            this.msgs = msgs
            this.$forceUpdate();
        });
    },
    beforeRouteEnter (to, from, next) {
        if (userStore.state.user.name == "" || userStore.state.user.name == null)
            router.push("/users/login");
        next();
    },
    beforeRouteLeave (to, from, next) {
        state.dispatch('desconectaSocket');
        next();
    },
});
</script>
<style>
    #chatView {
        text-align: center;
        padding: 40px;
    }
</style>