<template>
  <div id="UsersView">
    <div class="row">
      <h1 style="float: left;">Users</h1>
      <router-link class="btn btn-primary" style="float: right;" :to="{name: 'Create User'}">Create User</router-link>
    </div>
    <div class="Users" style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: flex-start;">
      <div v-for="(user, index) in users"
      v-bind:item="user"
      v-bind:index="index"
      v-bind:key="user" :user="user" style="padding: 20px; width: 200px;">
      <UserCard :user="user" />
      <router-link 
      :to="{name:'User', params:{id:user.id}}">
        <a class="btn btn-primary">Profile</a>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserCard from '@/components/UserCard.vue';
import UserService, { User } from '@/services/UserService';

export default defineComponent({
  data() {
    return {
      users: [] as User[],
      error: ''
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
});
</script>

<style scoped>
  #UsersView {
    text-align: center;
    padding: 20px;
  }
</style>