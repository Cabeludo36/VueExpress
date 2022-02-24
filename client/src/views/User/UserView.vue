<template>
  <div class="User">
    <div class="container-fluid">
      <div class="row content">
        <div class="col-sm-3 sidenav">
          <h4>{{ user.name }}</h4>
          <ul class="nav nav-pills nav-stacked">
            <li :class="[$route.name === 'User Home' ? 'active' : '']">
              <router-link :to="{ name: 'User Home' }">Home</router-link>
            </li>
            <li :class="[$route.name === 'User Friends' ? 'active' : '']">
              <router-link :to="{ name: 'User Friends' }">Friends</router-link>
            </li>
            <li :class="[$route.name === 'User Family' ? 'active' : '']">
              <router-link :to="{ name: 'User Family' }">Family</router-link>
            </li>
            <li :class="[$route.name === 'User Photos' ? 'active' : '']">
              <router-link :to="{ name: 'User Photos' }">Photos</router-link>
            </li>
          </ul>
          <br />
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search Blog.." />
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </span>
          </div>
        </div>

        <router-view />
        
      </div>
    </div>

    <footer class="container-fluid">
      <p>Footer Text</p>
    </footer>
  </div>
</template>
<script  lang="ts">
import { Options, Vue } from "vue-class-component";
import UserCard from "@/components/UserCard.vue";
import UserService from "@/services/UserService";

@Options({
  data() {
    return {
      user: [],
      error: "",
      text: "",
    };
  },
  components: {
    UserCard,
  },
  async created() {
    try {
      this.user = await UserService.getUser(this.$route.params.id);
      this.$router.push({ name: "User Home" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      this.error = err.messege;
    }
  },
})



export default class UserView extends Vue {}
</script>
<style scoped>
/* Set height of the grid so .sidenav can be 100% (adjust if needed) */
.row.content {
  height: 1500px;
}

/* Set gray background color and 100% height */
.sidenav {
  background-color: #f1f1f1;
  height: 100%;
}

/* Set black background color, white text and some padding */
footer {
  background-color: #555;
  color: white;
  padding: 15px;
}

/* On small screens, set height to 'auto' for sidenav and grid */
@media screen and (max-width: 767px) {
  .sidenav {
    height: auto;
    padding: 15px;
  }
  .row.content {
    height: auto;
  }
}
</style>
