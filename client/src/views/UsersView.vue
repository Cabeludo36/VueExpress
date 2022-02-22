<template>
  <div class="Users">
    <h1>Users</h1>
    <UserCard 
    v-for="(user, index) in users"
    v-bind:item="user"
    v-bind:index="index"
    v-bind:key="user" :user="user" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import UserCard from '@/components/UserCard.vue';
import UserService from '@/services/UserService';

@Options({
  data() {
    return {
      users: [],
      error: '',
      text: ''
    };
  },
  components: {
    UserCard,
  },
  async created() {
    try {
      this.users = await UserService.getUsers();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.error = err.messege;
    }
  }
})
export default class UsersView extends Vue {}
</script>

<style>

</style>