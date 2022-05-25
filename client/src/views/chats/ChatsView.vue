<template>
  <div id="ChatsView">
    <div class="row">
      <div style="float: left;"><h1>Chats</h1></div>
      <div style="float: right;"><router-link to="/chats/create" class="btn btn-info" >Create Chat</router-link></div>
    </div>
    <div>
      <ChatCard v-for="(room, index) in rooms" :key="index" :room="room" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import RoomService, { room } from '@/services/RoomService';
import ChatCard from '@/components/ChatCard.vue'
import router from '@/router/router';
import { userStore } from '@/store/userStore';

export default defineComponent({
    data() {
        return {
            rooms: [] as room[],
        }
    },
    components: {
      ChatCard
    },
    async created() {
        this.rooms = await RoomService.getRooms()
    },
    beforeRouteEnter (to, from, next) {
      if (userStore.state.user.name == "" || userStore.state.user.name == null)
            router.push("/users/login");
        next();
    }
});
</script>
<style>
#ChatsView {
  text-align: center;
  padding: 40px;
}
</style>
