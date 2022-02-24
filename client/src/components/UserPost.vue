<template>
  <div class="UserPost">
    <h2>{{post.title}}</h2>
    <h5><span class="glyphicon glyphicon-time"></span> Post by {{post.userName}}, {{post.time}}.</h5>
    <p>{{post.messege}}</p>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
})
export default class UserCard extends Vue {
  post!: {
    title: string;
    time: string;
    userName: string;
    messege: string;
    id: number;
  };
}
</script>