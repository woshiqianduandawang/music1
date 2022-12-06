<template>
  <div id="suggest">
    <Banner></Banner>
    <div id="a1">
      <div id="a1-b1">
        <div id="a1-b1-c1">
          <h3>热门推荐</h3>
          <router-link :to="{
            path: '/follow/songsheet',
            query: {
              cat: '华语'
            }
          }">华语<span>I</span></router-link>

          <router-link :to="{
            path: '/follow/songsheet',
            query: {
              cat: '流行'
            }
          }">流行<span>I</span></router-link>

          <router-link :to="{
            path: '/follow/songsheet',
            query: {
              cat: '摇滚'
            }
          }">摇滚<span>I</span></router-link>

          <router-link :to="{
            path: '/follow/songsheet',
            query: {
              cat: '民谣'
            }
          }">民谣<span>I</span></router-link>

          <router-link :to="{
            path: '/follow/songsheet',
            query: {
              cat: '电子'
            }
          }">电子<span>I</span></router-link>

          <router-link to="/follow/songsheet">更多</router-link>
        </div>
        <div id="a1-b1-c2">
          <div id="a1-b1-c2-d1" v-for="(item, index) in tags" :key="index" @click="click(item.id)">
            <!-- 歌单头像 -->
            <img :src="item.coverImgUrl" alt="">
            <!-- 歌单的播放量小条 -->
            <div>
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
  </div>
</template>
<script>
import Banner from './banner/banner.vue'
import Network from '@/network/network'
export default {
    name: 'Suggest',
    components: {
      Banner
    },
    data() {
      return {
        tags: ''
      }
    },
    methods: {
      click(id) {
      this.$router.push({
        path: '/playlist',
        query: {
          id: id
        }
      })
    },
    },
    created() {
      Network({
        url: '/top/playlist',
        params: {
          limit: 10
        }
      }).then( ({data:{playlists:a}}) => {
        this.tags = a
      })
    }
}
</script>

<style scoped>
  #suggest{
    position: relative;
    top: 40px;
  }
  #a1{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1280px;
  }
  #a1-b1{
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    padding: 20px;
    box-sizing: border-box;
    width: 1080px;
  }
  #a1-b1-c1{
    border-bottom: 2.3px solid #000;
    padding-bottom: 10px;
    width: 100%;
  }
  #a1-b1-c1 h3{
    display: inline-block;
  }
  #a1-b1-c1 a{
    display: inline-block;
    padding: 6px;
    text-align: center;
    font-size: 14px;
    line-height: 14px;
  }
  #a1-b1-c1 a span{
    position: relative;
    top:2px;
    left: 6px;
    color: rgba(197, 197, 197, 0.5);
    font-size: 18px;
    font-weight: 200;
  }
  /* 放遍历数据的大盒子 */
  #a1-b1-c2-d1 {
    display: inline-block;
    margin: 38px;
    margin-top: 30px;
    margin-bottom: 50px;
    width: 130px;
    height: 130px;
    cursor: pointer;
  }
  /* 歌单头像 */
  #a1-b1-c2-d1 img{
    border-radius: 10px;
    width: 130px;
    height:130px;
  }
  /* 标题 */
  #a1-b1-c2-d1 span{
    display: block;
    position: relative;
    top: -12px;
    width: 130px;
    height: 66px;
    overflow: hidden;
  }
  /* 标题鼠标悬停 */
  #a1-b1-c2-d1 span:hover{
    text-decoration: underline rgb(129, 129, 129);
  }
  /* 头像里下边的播放数小条 */
  #a1-b1-c2-d1 div{
    position: relative;
    height: 20px;
    top: -24px;
    border-radius: 0 0 10px 10px;
    color: rgb(217, 217, 217);
    font-size: 14px;
    background-color: rgb(94, 94, 94, 0.3);
  }
  #a1-b1-c2-d1 div img{
    position: absolute;
    opacity: 0.5;
    width: 15px;
    height: 15px;
  }
  #a1-b1-c2-d1 div img:nth-child(1){
    left: 3px;
    top: 3px;
  }
  #a1-b1-c2-d1 div img:nth-child(3){
    left: 96px;
    top: 3px;
  }
  #a1-b1-c2-d1 div p{
    position: absolute;
    left: 25px;
  }
</style>