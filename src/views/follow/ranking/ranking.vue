<template>
  <!-- 榜单 -->
  <div id="ranking">
    <div id="content">
        <!-- 榜单分类 -->
      <div id="a1" ref="a1">
        <ol :class="{'active': item.id == $route.query.id || active == item.id}" v-for="(item) in RankingData" :key="item.id" @click="router(item.id)" >
          {{item.name}}
        </ol>
      </div>
      <!-- 榜单数据 -->
      <table>
        <tr>
          <th></th>
          <th><i>歌曲</i></th>
          <th><i>时长</i></th>
          <th><i>歌手</i></th>
        </tr>
        <tr v-for="(item, index) in list.tracks" :key="index" id="tr">
          <!-- 序号 -->
          <td>
            {{index + 1}}
          </td>
          <!-- 歌曲名 -->
          <td>
            <p :title=item.name  @click="$store.commit('PlayMusic',{songs: list.tracks, index: index})">{{OmitName(item.name, 16)}}</p>
          </td>
          <!-- 歌曲时长 -->
          <td>
            <i>
              {{GetTime(item.dt / 1000 / 60)}}:
              {{GetTime(item.dt / 1000 % 60)}}
            </i>
          </td>
          <!-- 拼接歌手名(如果有多个创作者) -->
          <td>
              <div v-for="(item2, inx) in item.ar" :key="inx">
                <span @click="jump(item2.id)" :title=GetArName(item.ar) >
                  {{item2.name}}
                </span>
                <strong v-if="inx < item.ar.length-1">/</strong>
              </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import mixincomputed from '@/common/mixin-computed'

export default {
    name: 'Ranking',
    mixins: [mixincomputed],
    data() {
      return {
        RankingData: '', //榜单类型数据
        list: '', //榜单数据
        active: 19723756, //创建组件默认设置第一个分类的样式
        unwatch: '', //保存取消watch的回调函数
      }
    },
    activated() {
      //获取榜单分类
      this.$Request({
        url: '/toplist',
      }).then( ({data:{list:a}}) => {
        this.RankingData = a
      }).catch( arr =>{
        alert('请求数据失败，请刷新重试！')
      })
      // 请求默认加载的飙升榜
      this.Getdata()
      // watch监听list的变化，watch返回一个取消监听的函数，赋值接收
      this.unwatch = this.$watch('$route.query', function() {
        this.Getdata()
      })
    },
    methods: {
      // 获取榜单数据
      Getdata() {
        // 判断是否是第一次创建组件
        this.$route.query.id ?this.active = null :''
        // 跳到页面最上端
        window.scroll(0,0)
        // 请求榜单数据
        this.$Request({
          url: '/playlist/detail',
          params: {
            id: this.$route.query.id ?this.$route.query.id :19723756 
          }
        }).then( ({data:{playlist:a}}) => {
          this.list = a
          // 设置title
          document.title = '榜单-' + this.list.name
        }).catch( arr =>{
          alert('请求数据失败，请刷新重试！')
        })
      },
      router(id) {
        // 榜单分类按钮跳转
        this.$router.push({
          path: '/follow/ranking',
          query: {
            id: id
          }
        })
      },
      jump(id) {
        // 跳转至歌手主页
        this.$router.push({
          path:'/artist-page',
          query:{
            id: id
          }
        })
      }
    },
    deactivated() {
      // 离开组件停止watch监听
      this.unwatch()
    },
}
</script>

<style scoped>
  #ranking{
    position: relative;
    top: 40px;
  }
  /* 版心 */
  #content{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 100px;
    padding-top: 35px;
    border: 2px solid rgba(79, 79, 79, 0.1);
    box-sizing: border-box;
    width: 1280px;
    background-color: #fff;
  }
  /* 榜单分类 */
  #a1{
    position: absolute;
    top: -3px;
    left: -240px;
    border-left: 1px solid rgb(0, 0, 0, 0.3);
    border-bottom: 1px solid rgb(0, 0, 0, 0.3);
    padding: 20px;
    width: 200px;

  }
  ol{
    display: block;
    padding: 13px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
  }
  ol:hover{
    text-decoration: underline;
  }
  /* 歌曲 */
  table{
    display: block;
    position: relative;
    top: 26px;
    border: 1px solid rgb(0, 0, 0, 0.1);
    border-top: 0;
    border-collapse: collapse;
  }
  tr:nth-child(2n){
    background-color: rgb(245, 244, 244);
  }
  #tr:hover{
    background-color: rgb(208, 208, 208);
  }
  tr td:nth-child(4){
    padding-left: 20px;
    width: 427px
  }
  th{
    box-shadow: 0px 2px 5px rgb(0, 0, 0, 0.1);
    height: 42px;
    line-height: 42px;
  }
  table i {
    float: left;
    padding-left: 20px;
  }
  th,
  td{
    display: inline-block;
    width: 447px;
    white-space: nowrap;
    overflow: hidden;
  }
  th{
    border: 1px solid rgb(0, 0, 0, 0.1);
    border-right: 0;
    box-sizing: border-box;
  }
  th:nth-child(1){
    border-left: 0;
    padding-left: 100px;
    width: 50px;
    height: 42px;
  }
  td:nth-child(1){
    padding-left: 50px;
    width: 50px;
  }
  th:nth-child(3),
  td:nth-child(3){
    width: 80px;
  }
  table p{
    padding-left: 20px;
    width: 0;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
  table span:hover,
  table p:hover{
    color: #fff;
  }
  table div{
    display: inline-block;
  }
  table span{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
  td strong{
    font-size: 20px;
    font-weight: 400;
  }
  .active{
    border: 1px solid rgba(65, 65, 65, 0.1);
    border-radius: 3px;
    color: rgb(255, 0, 0);
    background-color: rgb(249, 249, 249);
  }
</style>