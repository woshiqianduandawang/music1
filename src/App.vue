<template>
  <div id="app">
    <Hade></Hade>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Player v-if="$store.state.playerif"></Player>
  </div>
</template>

<script>
import Hade from './components/head.vue'
import Player from './player.vue';

export default {
  name: 'App',
  components: {
    Hade,
    Player
  },
}
</script>

<style>
  #app{
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.3);
  }
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background-color: rgb(244, 244, 244);
  }
  li{
    list-style: none;
  }
  a{
    text-decoration: none;
    color: black;
  }
  i{
    font-style: normal;
  }
</style>
