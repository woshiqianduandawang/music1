<template>
  <div id="ArtistPage" v-if="liveif">
    <div><img :src="$route.query.data.picUrl" alt=""></div>
    <span>热门50首：</span>
    <li @click="$store.commit('click',{songs: songs, index: index})" v-for="(item, index) in songs" :key="index">
        <p >{{item.name}} — {{item.ar[0].name}}</p>
    </li>
  </div>
</template>

<script>

import Request from '@/network/request'

export default {
    name: 'ArtistPage',
    data() {
        return {
            songindex: '',
            songs: '',
            liveif: true,
        }
    },
    methods: {
        click(a) {
            console.log(a);
        }
    },
    activated() {
        // 获取歌手歌曲
        Request({
            url: '/artist/songs', 
            params: {
                id: this.$route.query.id
            }
        }).then(({data:{songs:songss}}) => {
            this.songs = songss
            if(songss){
                this.liveif = true
            }
        })
    },
    deactivated() {
        this.liveif = false
    },
    destroyed () {
      console.log('ArtistPage销毁');
    }
}
</script>

<style scoped>
#ArtistPage{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    top: 40px;
    width: 1280px;
    background-color: #fff;
}
span{
    display: block;
    padding-left: 20px;
    margin: 8px;
    font-size: 20px;
}
li{
    border-top: 1px solid rgba(142, 142, 142, 0.1);
    padding: 5px;
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    list-style: none;
    cursor: pointer;
}
li:nth-last-child(1){
    border-bottom: 1px solid rgb(67, 67, 67, 0.1)
}
li:hover{
    background-color: rgb(199, 199, 199);
    color: #fff;
}
li p{
    font-size: 20px;
}
img{
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 960px;
    text-align: center;
}
p{
    display: inline-block;
}
</style>