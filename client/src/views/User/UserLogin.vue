<template>
  <div id="UserCreate">
    <form action="get">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Enter password"
          v-model="user.password"
        />
      </div>
      <div class="text-danger my-2">{{error}}</div>
      <button type="submit" class="btn btn-primary" @click.prevent="login">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserAuth } from "@/services/UserService";
import { userStore } from "@/store/userStore";

export default defineComponent({
  data() {
    return {
      user: {} as UserAuth,
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        await userStore.dispatch("login", this.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        this.error = userStore.state.err;
      }
    }
  }
});
</script>

<style scoped>
#UserCreate {
  text-align: center;
  padding: 40px;
}
</style>