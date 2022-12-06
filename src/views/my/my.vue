<template>
  <div>
    <span>登录发现更多精彩</span>
    <button @click="$store.commit('close', true)">立即登录</button>
  </div>
</template>

<script>
import Network from '@/network/network'
export default {
  neme: 'My',
  methods: {
  },
  activated() {
    // this.$store.commit('close', true)
  }
}
</script>

<style scoped>
  div{
    position: absolute; 
    left: 50%;
    transform: translateX(-50%);
    top: 300px;
  }
  span{
    display: block;
    font-size: 30px;
  }
  button{
    border: 0;
    border-radius: 13px;
    width: 132px;
    height: 41px;
    font-size: 20px;
    color: #fff;
    background-color: rgb(255, 0, 0);
    cursor: pointer;
  }
</style>