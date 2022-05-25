<template>
    <div id="chatCreateView">
        <div class="row">
            <div style="float: left;"><h1>Create Chat</h1></div>
        </div>
        <form @submit.prevent="submit()">
            <input type="text" v-model="name" placeholder="Titulo">
            <input type="text" v-model="descricao" placeholder="Descricão">

            <button type="submit" class="btn btn-info">Create</button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import RoomServece from '@/services/RoomService';
import { userStore } from '@/store/userStore';
import router from '@/router/router';

export default defineComponent({
    data() {
        return {
            name: '',
            descricao: ''
        }
    },
    methods: {
        submit() {
            RoomServece.createRoom(this.name, this.descricao, userStore.state.user.id as number, true)
            router.push('/chats');
        }
    },
    beforeRouteEnter: (to, from, next) => {
        if (userStore.state.user.name == "" || userStore.state.user.name == null)
            router.push("/users/login");
        next();
    }
});
</script>
<style>
#chatCreateView {
    text-align: center;
    padding: 40px;
}
</style>