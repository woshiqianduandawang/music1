<template>
  <div id="app">
    <Hade></Hade>
    <keep-alive>
      <router-view />
    </keep-alive>
    <Player v-if="$store.state.playerif"></Player>
  </div>
</template>

<script>
import Hade from "./components/content/head.vue";
import Player from "@/components/content/player";
export default {
  name: "App",
  components: {
    Hade,
    Player,
  },
};
</script>

<style>
@import url(./assets/css/base.css);
#app {
  box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.3);
}
</style>
