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
  </div>
</template>

<script>

export default {
  name: 'Follow',
  components: {
  },
  methods: {
  },
  created() {
    // this.$Request({
    //   url: '/playlist/track/all',
    //   params: {
    //     id: 11972054
    //   }
    // }).then( a => {
    //   console.log(a);
    // })
  }
}
</script>

<style scoped>
  #follow{
    position: relative;
    width: 100%;
    height: 40px;
    background-color: rgb(194, 12, 12);
  }
  #FollowBigBox{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding-left: 73px;
    width: 1280px;
    height: 100%;
  }
  #FollowBox{
    display: inline-block;
    width: 130px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  a{
    padding: 3px;
    padding-left: 30px;
    padding-right: 30px;
    border-radius: 20px;
    text-decoration: none;
    text-align: center;
    font-size: 16px;
    color: #fff;
  }
  a:hover{
    background-color: rgb(29, 29, 29, 0.6);
    color: #fff;
  }
  .active{
    background-color: rgb(29, 29, 29, 0.6);
    color: #fff;
  }
</style>