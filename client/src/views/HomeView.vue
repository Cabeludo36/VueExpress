<template>
  <div id="HomeView">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <input type="text" v-model="msg" style="width: 267px;">
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
#HomeView {
  text-align: center;
  padding: 40px;
}
</style>
