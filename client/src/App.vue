<template>
  <nav>
   <ul class="nav nav-tabs">
  <li class="nav-item">
<router-link to="/" style="float: left;">Home</router-link>
  </li>
  <li class="nav-item">
    <router-link to="/about">About</router-link>
  </li>
  <li class="nav-item">
    <router-link to="/users">Users</router-link>  
  </li>
  <li class="nav-item">
    <router-link to="/docs">Documents</router-link>
  </li>
  <li class="nav-item">
    <router-link to="/chats">Chats</router-link>
  </li>
</ul>
  <div v-if="!temUser()" style="float: right;">
      <router-link :to="{name: 'Create User'}">Logon |</router-link>
      <router-link :to="{name: 'Login User'}"> Login</router-link>
    </div>
    <div v-else style="float: right;">
      <button type="button" class="btn btn-black" @click="logout">Logout</button>
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
      if (userStore.state.user.name != '' && userStore.state.user.name != null)
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

body {
  background-color: #aee6b6;
}

nav{
    background-color: #000000;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

nav {
  padding: 20px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a:hover {
  color: #3cdd6c;
}

nav a.router-link-exact-active {
  color: #3cdd6c;
}

nav a.router-link-exact-active:focus {
  color: #3cdd6c;
}

</style>
