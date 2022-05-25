<template>
  <div class="chatCard">
    <h1>{{ room.name }}</h1>
    <p>{{ room.description }}</p>
    <router-link :to="{ name: 'Chat', params: { id: room.id } }">
      <a class="btn btn-primary">Enter</a>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { room } from "@/services/RoomService";

export default defineComponent({
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  room: {} as room,
});
</script>