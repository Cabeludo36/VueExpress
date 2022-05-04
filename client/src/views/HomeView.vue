<template>
  <div id="HomeView">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <HelloWorld :msg="msg"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  data() {
    return {
      msg: 'Welcome to Your Vue.js + TypeScript App',
    };
  },
  components: {
    HelloWorld,
  },
});
</script>
<style scoped>
input{
  background-color: rgb(0, 0, 0);
  color: white;
  padding: 4px;
}

#HomeView {
  text-align: center;
  padding: 40px;
}
</style>
