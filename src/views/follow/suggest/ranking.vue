<template>
    <!-- 发现-推荐-榜单 -->
    <div id="list">
        <div id="content">
            <div id="a1">
                <h3>榜单</h3>
                <i>更多</i>
            </div>
            <div id="a2">
                <!-- 飙升榜 -->
                <ol>
                    <div>
                        <img :src="soar.coverImgUrl + '?param=100y100'" alt="">
                        <h4>飙升榜</h4>
                    </div>
                    <li v-show="index<10" v-for="(item, index) in soar.tracks" :key="index">
                        <span>{{index+1}}</span>
                        <p title="播放" @click="$store.commit('PlayMusic',{songs: soar.tracks, index: index})">{{item.name}}</p>
                    </li>
                </ol>
                <!-- 新歌榜 -->
                <ol>
                    <div>
                        <img :src="NewSong.coverImgUrl + '?param=100y100'" alt="">
                        <h4>新歌榜</h4>
                    </div>
                    <li v-show="index<10" v-for="(item, index) in NewSong.tracks" :key="index">
                        <span>{{index+1}}</span>
                        <p title="播放" @click="$store.commit('PlayMusic',{songs: NewSong.tracks, index: index})">{{item.name}}</p>
                    </li>
                </ol>
                <!-- 原创榜 -->
                <ol>
                    <div>
                        <img :src="original.coverImgUrl + '?param=100y100'" alt="">
                        <h4>原创榜</h4>
                    </div>
                    <li v-show="index<10" v-for="(item, index) in original.tracks" :key="index">
                        <span>{{index+1}}</span>
                        <p title="播放" @click="$store.commit('PlayMusic',{songs: soar.tracks, index: index})">{{item.name}}</p>
                    </li>
                </ol>
            </div>
        </div>  
    </div>
</template>

<script>
import Request from '@/network/request'

export default {
    name: 'List',
    data() {
        return {
            soar:'',
            NewSong: '',
            original: ''
        }
    },
    created() {
    //榜单数据
        //飙升榜
      Request({
        url: '/playlist/detail',
        params: {
            id: 19723756
        }
      }).then( ({data:{playlist:a}}) => {
        this.soar = a
      }).catch( arr =>{
        alert('请求数据失败，请刷新重试！')
      })

        //新歌榜
      Request({
        url: '/playlist/detail',
        params: {
            id: 3779629
        }
      }).then( ({data:{playlist:a}}) => {
        this.NewSong = a
      }).catch( arr =>{
        alert('请求数据失败，请刷新重试！')
      })

        //原创榜
      Request({
        url: '/playlist/detail',
        params: {
            id: 2884035
        }
      }).then( ({data:{playlist:a}}) => {
        this.original = a
      }).catch( arr =>{
        alert('请求数据失败，请刷新重试！')
      })
    }
}
</script>

<style scoped>
    #list{
        position: relative;
    }
    #content{
        position: relative;
    }
    #a1{
        border-bottom: 2.3px solid rgb(211, 1, 1);
        padding-bottom: 10px;
        width: 100%;
    }
    h3{
        display: inline-block;
    }
    i{
        float: right;
        padding: 6px;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        cursor: pointer;
    }
    i:hover{
        text-decoration: underline;
    }
    #a2{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    ol{
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        width: 319px;
    }
    ol div{
        position: relative;
    }
    ol img{
        margin-left: 20px;
    }
    ol h4{
        position:absolute;
        left: 130px;
        top: 8px;
    }

    li{
        padding: 5px;
    }
    ol span{
        width: 20px;
        display: inline-block;
        font-size: 20px;
        color: rgb(187, 6, 6);
    }
    ol p{
        font-size: 16px;
        display: inline-block;
        margin-left: 10px;
    }
    ol p:hover{
        text-decoration: underline;
        cursor: pointer;
    }
</style>