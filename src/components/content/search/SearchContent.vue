<template>
    <!-- 搜索结果页面 -->
  <div v-if="searchif" id="search">
    以下是搜索{{this.$route.query.content}}的结果：
    <!-- 搜索到的歌手，接口失效暂时弃用 -->
    <!-- <div id="SearchSingerBox">
        <img :src="singer.img1v1Url" alt="">
        <span>{{singer.name}}</span>
    </div> -->
    <div id="bodyofhead">
        <div>歌曲</div>
        <div>歌手</div>
    </div>
    <!-- 遍历搜索歌曲响应数据 -->
    <li v-for="(item, index) in songs" :key="index">
        <p title="播放" @click="$store.commit('click',{songs: songs, index: index})">{{item.name}}</p>
        <router-link :to="{
          path: '/artist-page',
          query: {data: item,id: item.ar[0].id}
        }">{{item.ar[0].name}}</router-link>
    </li>
  </div>
</template>

<script>
import Request from '@/network/request'

export default {
    name: 'SearchContent',
    data() {
        return {
            songs: '',
            singer: '',
            searchif: true
        }
    },
    activated() {
        // 搜索结果-歌曲
        Request({
            url: '/cloudsearch', 
            params: {
                keywords: this.$route.query.content
            }
        }).then(({data:{result:{songs:a}}}) => {
                this.songs = a
                // console.log(a);
        })
        // 搜索结果-多重匹配，接口失效
        Request({
            url: '/artist/desc', 
            params: {
                id: 6452
            }
        }).then(a => {
            console.log(a);
            // this.singer = a.artist[0]
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
    padding-top: 20px ;
    width: 150px;
    height: 150px;
    /* background-color: rgb(151, 33, 33); */
    text-align: center;
}
span{
    display: block;
}
img{
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
a{
    position: absolute;
    left: 50%;
    text-decoration: none;
    color: black;
}
a:hover{
    color: #fff;
}
</style>