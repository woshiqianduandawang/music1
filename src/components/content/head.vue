<template>
  <div id="tabbar">
    <div id="tabbox">
      <!-- 头部tab部分 -->
      <router-link @click.native="index = 0" to="/follow">
        发现音乐
        <sub v-show="index == 0"></sub>
      </router-link>
      <router-link @click.native="index = 1" to="/find">
        关注
        <sub v-show="index == 1"></sub>
      </router-link>
      <router-link @click.native="index = 2" to="/my">
        我的音乐
        <sub v-show="index == 2"></sub>
      </router-link>
      <router-link @click.native="index = 3" to="/shopping">
        商城
        <sub v-show="index == 3"></sub>
      </router-link>
      <Search></Search>
      <p @click="$store.commit('close', true)">登录</p>
      <!-- <button @click="cc">查询</button> -->
    </div>
    <SigninVue v-if="$store.state.close"></SigninVue>
  </div>
</template>

<script>
import Search from "@/components/content/search/search.vue";
import SigninVue from "@/components/content/signin.vue";
export default {
  name: "Head",
  components: {
    Search,
    SigninVue,
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    cc() {
      this.$Request({
        url: "/login/refresh",
      }).then((b) => console.log(b));
      this.$Request({
        url: "/login/status",
      }).then((a) => console.log(a));
    },
  },
};
</script>

<style scoped>
#tabbar {
  position: relative;
  margin: 0;
  width: 100%;
  height: 65px;
  background-color: rgb(61, 61, 61);
  font-size: 0;
  z-index: 9;
}
#tabbar #tabbox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  height: 100%;
}
a {
  display: inline-block;
  color: rgb(204, 204, 204);
  width: 200px;
  height: 100%;
  text-align: center;
  line-height: 65px;
  font-size: 18px;
  text-decoration: none;
  overflow: hidden;
}
a:hover {
  background-color: rgb(29, 29, 29);
  color: #fff;
}
p {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 66px;
  cursor: pointer;
  color: rgb(204, 204, 204);
  font-size: 16px;
}
sub {
  display: block;
  position: relative;
  top: -3px;
  left: 50%;
  transform: translateX(-50%) rotateZ(45deg);
  width: 20px;
  height: 20px;
  background-color: rgb(194, 12, 12);
}
.active {
  background-color: rgb(29, 29, 29);
  color: #fff;
}
</style>