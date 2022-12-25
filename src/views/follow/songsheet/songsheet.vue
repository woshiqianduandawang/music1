<template>
  <!-- 歌单组件 -->
  <div id="SongSheet">
    <!-- 歌单版心 -->
    <div id="SongSheetCenter">
      <ClassBoxVue>
        <h3 slot="h3">
          {{$route.query.cat ?$route.query.cat :'热门'}}
        </h3>
      </ClassBoxVue>
      <!-- 遍历歌单 -->
      <div id="SongSheetCenter-a">
        <div id="ContentBox" v-for="(item, index) in tags" :key="index" @click="click(item.id)">
        <!-- 歌单头像 -->
        <img :src="item.coverImgUrl" alt="">
        <!-- 歌单的播放量小条 -->
        <div id="PlayCount">
          <img src="@/assets/img/songsheet/play.png" alt="">
          <!-- 三元表达式区分一万以下和以上播放数的显示模式 -->
          <p>{{item.playCount >= 10000 ?parseInt(item.playCount/10000) + '万' :item.playCount}}</p>
          <img src="@/assets/img/songsheet/headphones.png" alt="">
        </div>
        <!-- 歌单标题 -->
        <span>{{item.name}}</span>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassBoxVue from './ClassBox.vue'
export default {
  name: 'SongSheet',
  components: {
    ClassBoxVue
  },
  data() {
    return {
      tags: '',
      PlayCount: '',
    }
  },
  created() {
    // 请求歌单数据
    this.$Request({
      url: '/top/playlist',
    }).then( ({data:{playlists:a}}) => {
      this.tags = a
    }).catch(arr =>{
      alert('请求数据失败，请刷新重试！')
    })
  },
  watch: {
    '$route.query.cat': function(newval, oldval) {
      // 当$route.query.cat存在时才发送网络请求，防止闪烁
      if(newval){
        this.tags = '' //页面发生变化时，防止闪烁
        this.$Request({
          url: '/top/playlist/highquality',
          params: {
            cat: this.$route.query.cat
          }
        }).then( ({data:{playlists:b}}) => {
          this.tags = b;
        }).catch(arr =>{
          alert('请求数据失败，请刷新重试！')
        })
      }
      
      
    }
  },
  methods: {
    // 歌单的点击事件,携带歌单id跳转到playlist
    click(id) {
      this.$router.push({
        path: '/playlist',
        query: {
          id: id
        }
      })
    },
  }
}
</script>

<style scoped>
/* 最大的盒子 */
  #SongSheet{
    position: relative;
    top: 40px;
  }
  /* 版心 */
  #SongSheetCenter{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    padding-bottom: 50px;
    border: 2px solid rgba(79, 79, 79, 0.1);
    border-top: 0;
    box-sizing: border-box;
    width: 1280px;
    background-color: #fff;
  }
  #SongSheetCenter-a{
    display: flex;
    flex-wrap: wrap;
  }
  /* 放遍历数据的大盒子 */
  #SongSheetCenter #ContentBox {
    display: inline-block;
    margin: 38px;
    margin-top: 30px;
    margin-bottom: 50px;
    width: 130px;
    height: 130px;
    cursor: pointer;
  }
  /* 歌单头像 */
  #ContentBox img{
    border-radius: 10px;
    width: 130px;
    height:130px;
    box-shadow: 0px 0px 3px rgb(0, 0, 0, 0.1);
  }
  /* 标题 */
  #ContentBox span{
    display: block;
    position: relative;
    top: -12px;
    width: 130px;
    height: 66px;
    overflow: hidden;
  }
  /* 标题鼠标悬停 */
  #ContentBox span:hover{
    text-decoration: underline rgb(129, 129, 129);
  }
  /* 头像里下边的播放数小条 */
  #ContentBox #PlayCount{
    position: relative;
    height: 20px;
    top: -24px;
    border-radius: 0 0 10px 10px;
    color: rgb(217, 217, 217);
    font-size: 14px;
    background-color: rgb(94, 94, 94, 0.3);
  }
  #ContentBox div img{
    position: absolute;
    opacity: 0.5;
    width: 15px;
    height: 15px;
  }
  #ContentBox div img:nth-child(1){
    left: 3px;
    top: 3px;
  }
  #ContentBox div img:nth-child(3){
    left: 96px;
    top: 3px;
  }
  #ContentBox div p{
    position: absolute;
    left: 25px;
  }
  
    /* 点击显示出来的歌单分类盒子 */
</style>