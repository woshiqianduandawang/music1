<template>
  <div id="find">
    <div id="head"></div>
    <div id="content">
      <span>喜欢的歌手找不到了？立即登录吧</span>
      <button @click="$store.commit('close', true)">立即登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Find",
  methods: {},
};
</script>

<style scoped>
#find {
  position: relative;
}
#find #head {
  height: 20px;
  background-color: rgb(255, 0, 0);
}
#find #content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 300px;
}
span {
  display: block;
  font-size: 30px;
}
button {
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