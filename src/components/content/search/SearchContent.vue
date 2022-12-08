<template>
    <!-- 搜索结果页面 -->
  <div v-if="searchif" id="search">
    以下是搜索{{this.$route.query.content}}的结果：
    <!-- 遍历搜索到的歌手 -->
    <router-link id="SearchSingerBox" :to="{
        path:'/artist-page',
        query:{
            id: singer.id
        }
    }" v-show="SingerShow" >
        <img :src="singer.img1v1Url" alt="">
        <span>{{singer.name}}</span>
    </router-link>
    <div id="bodyofhead">
        <div>歌曲</div>
        <div>歌手</div>
    </div>
    <!-- 遍历搜索歌曲 -->
    <li v-for="(item, index) in songs" :key="index">
        <p title="播放" @click="$store.commit('click',{songs: songs, index: index})">{{item.name}}</p>
        <router-link :to="{
          path: '/artist-page',
          query: {data: item,id: item.ar[0].id}
        }">
            {{item.ar[0].name}}
        </router-link>
    </li>
  </div>
</template>

<script>
import Request from '@/network/request'

export default {
    name: 'SearchContent',
    data() {
        return {
            songs: '', //搜索到的歌曲
            singer: '', //搜索到的歌手
            searchif: true, //是否重新渲染页面
            SingerShow: false //是否显示搜索到的歌手
        }
    },
    activated() {
        this.singer = ''
        this.SingerShow = false
        this.searchif = false
        // 搜索结果-歌曲
        Request({
            url: '/cloudsearch', 
            params: {
                keywords: this.$route.query.content
            }
        }).then(({data:{result:{songs:a}}}) => {
                this.songs = a
                this.searchif = true
                // console.log(a);
        }).catch(arr =>{
            alert('请求数据失败，请刷新重试！')
        })
        // 搜索结果-多重匹配
        Request({
            url: '/search/multimatch', 
            params: {
                keywords: this.$route.query.content
            }
        }).then(({data:{result:a}}) => {
            console.log(a);
            if(a.artist){
                this.SingerShow = true
                this.singer = a.artist[0]
            }
        }).catch(arr =>{
            alert('请求数据失败，请刷新重试！')
        })
    },
    methods: {
    }
}
</script>

<style scoped>
#search{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 1280px;
}
#SearchSingerBox{
    display: block;
    padding-top: 20px ;
    width: 150px;
    height: 150px;
    text-align: center;
}
#SearchSingerBox span{
    display: block;
}
#SearchSingerBox span:hover{
    text-decoration:underline ;
}
#SearchSingerBox img{
    border-radius: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
}
#bodyofhead{
    height: 25px;
    font-weight: 700;
}
#bodyofhead div:nth-child(1){
    position: absolute;
    left: 20px;
}
#bodyofhead div:nth-child(2){
    position: absolute;
    left: 50%;
}
li{
    padding: 5px;
    padding-left: 20px;
    height: 30px;
    font-size: 20px;
    list-style: none;
}

li:nth-child(2n){
    background-color: rgb(234, 234, 234);
}
li:hover{
    background-color: rgb(199, 199, 199);
}
p{
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
p:hover{
    color: #fff;
}
li a{
    position: absolute;
    left: 50%;
    text-decoration: none;
    color: black;
}
li a:hover{
    color: #fff;
}
</style>