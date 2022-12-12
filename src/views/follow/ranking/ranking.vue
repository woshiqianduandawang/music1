<template>
  <!-- 榜单 -->
  <div id="ranking">
    <div id="content">
      <div id="a1" ref="a1">
        <ol :class="{'active': active == index}" v-for="(item, index) in RankingData" :key="item.id" @click="GetData(item.id, index)" >
          {{item.name}}
        </ol>
      </div>
      <table>
        <tr>
          <th></th>
          <th><i>歌曲</i></th>
          <th><i>时长</i></th>
          <th><i>歌手</i></th>
        </tr>
        <tr v-for="(item, index) in songs" :key="index" id="tr">
          <td>
            {{index + 1}}
          </td>
          <td>
            <p title="播放"  @click="$store.commit('PlayMusic',{songs: songs, index: index})">{{item.name}}</p>
          </td>
          <td>
            <i>
              {{GetTime(item.dt / 1000 / 60)}}:
              {{GetTime(item.dt / 1000 % 60)}}
            </i>
          </td>
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
import Request from '@/network/request'

export default {
    name: 'Ranking',
    data() {
      return {
        RankingData: '',
        songs: '',
        active: 0,
      }
    },
    mounted() {
      //榜单名
      Request({
        url: '/toplist',
      }).then( ({data:{list:a}}) => {
        this.RankingData = a
        this.GetData(this.RankingData[0].id, 0)
      }).catch( arr =>{
        alert('请求数据失败，请刷新重试！')
      })
    },
    methods: {
      GetData(id, index) {
          this.active = index
          // 榜单数据
        Request({
          url: '/playlist/detail',
          params: {
            id: id
          }
        }).then( ({data:{playlist:a}}) => {
          this.songs = a.tracks
        }).catch( arr =>{
          alert('请求数据失败，请刷新重试！')
        })
      },
      jump(id) {
        this.$router.push({
          path:'/artist-page',
          query:{
            id: id
          }
        })
      }
    },
    computed: {
      GetTime() {
        // 歌曲时长
        return function(time) {
          let a = parseInt(time) <= 10  ?'0' + parseInt(time) :parseInt(time)
          return a
        }
      },
      GetArName() {
        // 作者名字
        return function(ar) {
          let name = null
          ar.forEach((item) => {
            if(name) {
              name = name + '/' + item.name
            }else {
              name = item.name
            }
          });
          return name
        }
      },
    }
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
    background-color: rgb(217, 217, 217);
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