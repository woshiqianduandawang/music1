<template>
  <div id="follow">
    <div id="FollowBigBox">
      <div id="FollowBox">
        <router-link to="/follow/suggest">推荐</router-link>
      </div>
      <div id="FollowBox">
        <router-link to="/follow/ranking">排行榜</router-link>
      </div>
      <div id="FollowBox">
        <router-link to="/follow/songsheet">歌单</router-link>
      </div>
      <div id="FollowBox">
        <router-link to="/follow/artist">歌手</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <span id="mask" v-show="$store.state.mask" ref="mask">
      <p>加载中,请稍后</p>
    </span>
  </div>
</template>

<script>
export default {
  name: "Follow",
  created() {
    // this.$Request({
    //   url: '/playlist/track/all',
    //   params: {
    //     id: 11972054
    //   }
    // }).then( a => {
    //   console.log(a);
    // })
  },
  mounted() {
    // 加载中的遮罩层
    this.$refs.mask.style.width = window.innerWidth + "px";
    this.$refs.mask.style.height = window.innerHeight + "px";
    window.addEventListener("resize", () => {
      this.$refs.mask.style.width = window.innerWidth + "px";
      this.$refs.mask.style.height = window.innerHeight + "px";
    });
    window.addEventListener("scroll", () => {
      this.$refs.mask.style.top = window.scrollY - 65 + 'px'
    });
  },
};
</script>

<style scoped>
#follow {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: rgb(194, 12, 12);
}
#FollowBigBox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 73px;
  width: 1280px;
  height: 100%;
}
#FollowBox {
  display: inline-block;
  width: 130px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
a {
  padding: 3px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
a:hover {
  background-color: rgb(29, 29, 29, 0.6);
  color: #fff;
}
#mask {
  position: absolute;
  left: 0;
  top: -65px;
  z-index: 99;
  background-color: rgb(0, 0, 0, 0.3);
}
#mask p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: #fff;
}
.active {
  background-color: rgb(29, 29, 29, 0.6);
  color: #fff;
}
</style>