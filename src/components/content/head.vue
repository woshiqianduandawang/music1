<template>
  <div id="tabbar">
    <div id="tabbox">
      <!-- 头部tab部分 -->
      <router-link to="/follow">发现音乐</router-link>
      <router-link to="/find">关注</router-link>
      <router-link to="/my">我的音乐</router-link>
      <router-link to="/shopping">商城</router-link>
      <Search></Search>
      <p @click="$store.commit('close',true)">登录</p>
      <!-- <button @click="cc">查询</button> -->
    </div>
    <SigninVue v-if="$store.state.close"></SigninVue>
  </div>
</template>

<script>
import Request from '@/network/request'
import Search from '@/components/content/search/search.vue'
import SigninVue from '@/components/content/signin.vue';
export default {
  name: 'Head',
  components: {
    Search,
    SigninVue
  },
  data() {
    return {
    }
  },
  methods: {
    cc() {
      Request({
        url: '/login/refresh',
      }).then( b => console.log(b))
      Request({
        url: '/login/status',
      }).then( a => console.log(a))
    }
  }
}
</script>

<style scoped>
  #tabbar{
    position: relative;
    margin: 0;
    width: 100%;
    height: 65px;
    background-color: rgb(61, 61, 61);
    font-size: 0;
    z-index: 9;
  }
  #tabbar #tabbox{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1280px;
    height: 100%;
  }
  a{
    display: inline-block;
    color: #fff;
    width: 200px;
    height: 100%;
    text-align: center;
    line-height: 65px;
    font-size: 18px;
    text-decoration: none;
  }
  a:hover {
    background-color:rgb(29, 29, 29);
  }
  p{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 66px;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
  }
  .active{
    background-color: rgb(29, 29, 29);
    color: #fff;
  }
  
</style>