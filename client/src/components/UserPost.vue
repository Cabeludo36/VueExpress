<template>
  <div class="UserPost">
    <h2>{{post.title}}</h2>
    <h5><span class="glyphicon glyphicon-time"></span> Post by {{post.userName}}, {{post.time}}.</h5>
    <p>{{post.messege}}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

type Post = {
  id: number;
  title: string;
  messege: string;
  userName: string;
  time: string;
}

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  post!: {} as Post,
})
</script>