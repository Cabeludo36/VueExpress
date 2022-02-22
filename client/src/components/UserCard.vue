<template>
<div class="UserCard">
  <h1>{{user.name}}</h1>
  <p>{{user.email}}</p>
  <router-link :to="{ name: 'User', params: { id: user.id }}">Perfil</router-link>
</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
})
export default class UserCard extends Vue {
  user!: string
}
</script>