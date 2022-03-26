<template>
  <div id="UserCreate">
    <form action="POST">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          placeholder="Enter name"
          v-model="user.name"
        />
      </div>
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
      <button type="submit" class="btn btn-primary" @click.prevent="createUser">
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import UserService from "@/services/UserService";
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      error: "",
      text: ""
    };
  },
  methods: {
    async createUser() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await UserService.createUser(this.user).then(() => {
          this.$router.push({ name: "Users" });
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        this.error = err.message;
      }
    }
  }
})

export default class UserHome extends Vue {}
</script>

<style scoped>
#UserCreate {
  text-align: center;
  padding: 40px;
}
</style>
