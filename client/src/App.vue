<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/users">Users</router-link> | 
    <router-link to="/docs">Documents</router-link>
    <div v-if="!temUser()" style="float: right;">
      <router-link :to="{name: 'Create User'}">Logon</router-link> |
      <router-link :to="{name: 'Login User'}">Login</router-link>
    </div>
    <div v-else style="float: right;">
      <button type="button" class="btn btn-secondary" @click="logout">Logout</button>
    </div>
  </nav>
  <router-view/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { userStore } from '@/store/userStore'
import  { User } from '@/services/UserService'

export default defineComponent({
  data() {
    return {
      user: {} as User,
      error: ""
    };
  },
  methods: {
    temUser() {
      if (userStore.state.uname != '' && userStore.state.uname != null)
        return true;
      // eslint-disable-next-line no-unreachable
      return false;
    },
    async logout() {
      await userStore.dispatch('logout');
    }
  }
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
