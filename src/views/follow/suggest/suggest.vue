<template>
  <div id="suggest">
    <!-- 轮播图组件 -->
    <Banner></Banner>
    
    <div id="a1">
      <div id="a1-b1">
        <!-- 热门分类推荐的几个routerlink -->
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

          <router-link tag="i" to="/follow/songsheet">更多</router-link>
        </div>
        <!-- 推荐歌单 -->
        <div id="a1-b1-c2">
          <div id="a1-b1-c2-d1" v-for="(item, index) in tags" :key="index" @click="click(item.id)">
            <!-- 歌单头像 -->
            <img :src="item.coverImgUrl + '?param=130y130'" alt="">
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
        <!-- 新碟部分 -->
        <div id="a1-b1-c3">
          <h3>新碟上架</h3>
          <i>更多</i>
        </div>
        <div id="a1-b1-c4">
          <!-- 左右滑动按钮 -->
          <img id="img" src="@/assets/img/right.png" @click="RightMove" alt="">
          <img id="img" src="@/assets/img/left.png" @click="LeftMove" alt="">
          <!-- 用于展示新碟的盒子 -->
          <div>
            <!-- 所有新碟数据，他的left决定显示什么位置的新碟 -->
            <ol id="a1-b1-c4-d1" ref="ol">
              <!-- 遍历所有新碟的li -->
              <li v-for="(item, index) in monthData" :key="index" @click="jump(item.id)">
                <img :src="item.picUrl + '?param=130y130'" alt="">
                <img src="@/assets/img/song/background.png" alt="">
                <p>{{item.name}}</p>
                <p>{{item.artist.name}}</p>
              </li>
            </ol>
          </div>
        </div>
        <!-- 榜单 -->
        <List></List>
     </div>
    </div>
  </div>
</template>
<script>
import Banner from './banner.vue'
import List from './list.vue'
import Animation from '@/assets/js/animation-x-copy.js'
export default {
    name: 'Suggest',
    components: {
      Banner,
      List
    },
    data() {
      return {
        tags: '', //歌单数据
        monthData: '', //新碟数据
        list: '', //榜单数据
        flag: true //节流阀
      }
    },
    created() {
      // 请求歌单数据
      this.$Request({
        url: '/top/playlist',
        params: {
          limit: 10
        }
      }).then( ({data:{playlists:a}}) => {
        this.tags = a
      }).catch( arr =>{
        alert('请求数据失败，请刷新重试！')
      })
      // 请求新碟数据
      this.$Request({
        url: '/album/new',
        params: {
          type: 'hot',
          limit: 100
        }
      }).then( ({data:{albums:a}}) => {
        this.monthData = a
        // console.log(a);
      }).catch( arr =>{
        alert('请求数据失败，请刷新重试！')
      })
    },
    methods: {
      // 点击歌单跳转
      click(id) {
        this.$router.push({
          path: '/playlist',
          query: {
            id: id
          }
        })
      },
      // 新碟点击事件
      jump(id) {
        this.$Request({
          url: '/album/detail/dynamic',
          params: {
            id: id
          }
        }).then( a => {
          this.list = a
          console.log(a);
        }).catch( arr =>{
          alert('请求数据失败，请刷新重试！')
        })
      },
      // 新碟左滑按钮
      LeftMove() {
        if(this.flag) {
          this.flag = false
          if(this.$refs.ol.offsetLeft == -12) {
            this.$refs.ol.style.left = 500 + 'px'
            Animation(this.$refs.ol, -12, () => {
              this.flag = true
            })
          }else {
            Animation(this.$refs.ol, this.$refs.ol.offsetLeft + 970, () => {
              this.flag = true
            })
          }
        }
      },
      // 新碟右滑按钮
      RightMove() {
        if(this.flag) {
          this.flag = false
          if(this.$refs.ol.offsetLeft == -18442) {
            this.$refs.ol.style.left = -18442 - 500 + 'px'
              Animation(this.$refs.ol, -18442, () => {
              this.flag = true
            })
          }else {
            Animation(this.$refs.ol, this.$refs.ol.offsetLeft - 970, () => {
              this.flag = true
            })
          }
        }
      }
    },
    
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
    background-color: #fff;
  }
  #a1-b1{
    /* border-left: 1px solid #000;
    border-right: 1px solid #000; */
    border: 2px solid rgba(79, 79, 79, 0.1);
    padding: 20px;
    box-sizing: border-box;
    width: 1080px;
  }
  #a1-b1-c1,
  #a1-b1-c3{
    border-bottom: 2.3px solid rgb(211, 1, 1);
    padding-bottom: 10px;
    width: 100%;
  }
  h3{
    display: inline-block;
  }
  i,
  a{
    display: inline-block;
    padding: 6px;
    text-align: center;
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
  }
  i:hover,
  a:hover{
    text-decoration: underline;
  }
  i{
    float: right;
  }
  #a1-b1-c1 a span{
    position: relative;
    top:2px;
    left: 6px;
    cursor: default;
    color: rgba(197, 197, 197, 0.5);
    font-size: 18px;
    font-weight: 200;
  }
  /* 放遍历数据的大盒子，包括歌单和新碟 */
  #a1-b1-c2-d1{
    display: inline-block;
    margin: 38px;
    margin-top: 30px;
    margin-bottom: 50px;
    width: 130px;
    height: 130px;
    cursor: pointer;
  }
  /* 推荐歌单和新碟的头像 */
  #a1-b1-c2-d1 img,
  #a1-b1-c4-d1 img{
    border-radius: 10px;
    width: 130px;
    height:130px;
  }
  /* 推荐歌单标题 */
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
    border-top: 1px solid rgb(0, 0, 0, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 1px 5px rgb(0, 0, 0, 0.6);
    border-radius: 0 0 10px 10px;
    color: rgb(217, 217, 217);
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.5);
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

  /* 新碟 */
  #a1-b1-c4{
    position: relative;
    width: 1039px;
    height: 217px;
    white-space:nowrap;
    overflow: hidden;
  }
  #a1-b1-c4 #img{
    position: fixed;
    top: 670px;
    width: 26px;
    height: 30px;
    font-size: 30px;
    font-weight: 700;
    opacity: 0.5;
    cursor: pointer;
  }
  #a1-b1-c4 #img:nth-child(1) {
    right: 223px;
  }
  #a1-b1-c4 div {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 965px;
    height: 100%;
    overflow: hidden;
  }
  #a1-b1-c4 div ol{
    display: flex;
    position: absolute;
    left: -12px;
  }
  #a1-b1-c4 ol li {
    position: relative;
    display: inline-block;
    padding: 20px 32px 0 32px;
    width: 194px;
    height: 188px;
    box-sizing: border-box;
    cursor: pointer;
  }
  #a1-b1-c4 ol li img:nth-child(1){
    position:relative;
    z-index: 3;
    box-shadow: 3px 3px 4px rgb(0, 0, 0, 0.5);
  }
  #a1-b1-c4 ol li img:nth-child(2){
    position:relative;
    left: -102px;
    z-index: 2;
  }
  #a1-b1-c4 ol li p:nth-last-child(2) {
    width: 156px;
    overflow: hidden;
  }
  #a1-b1-c4 ol li i{
    display: inline-block;
    position: relative;
    top: -28px;
    left: -189px;
    width: 72px;
    height: 77px;
    border-radius: 65px;
    box-shadow: 3px 3px 5px rgb(0, 0, 0, 0.8);
    background-color: rgb(82, 82, 82);
    z-index: 1;
  }
</style>