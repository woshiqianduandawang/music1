<template>
    <!-- 歌单页面 -->
  <div id="playlist" v-if="ruin">
    <Follow></Follow>
    <div id="PlaylistBox">
        <div id="detail">
            <!-- 歌单头像 -->
            <img id="photo" :src="detail.coverImgUrl" alt="">
            <div id="DetailContent">
                <!-- 歌单标题 -->
                <h3>{{detail.name}}</h3>
                <!-- 歌单作者信息 -->
                <div id="author">
                    <img :src="detail.creator.avatarUrl" alt="">
                    <!-- 作者昵称 -->
                    <div>
                        <p>{{detail.creator.nickname}}</p>
                        <!-- 创建时间 -->
                        <span>{{GetYear}}{{GetMonths}}{{GetDay}} 创建</span>
                    </div>
                    <div>标签：
                        <p v-for="item in detail.tags" :key="item.id">
                            {{item}}&ensp;
                        </p>
                    </div>
                    <button @click="$store.commit('click',{songs: songs, index: 0})">播放</button>
                </div>
            </div>
        </div>
        <div id="bodyofhead">
            <div>歌曲</div>
            <div>歌手</div>
        </div>
        <li href="" v-for="(item, index) in songs" :key="index">
            <p title="播放" @click="$store.commit('click',{songs: songs, index: index})">{{item.name}}</p>
            <router-link :to="{
            path: '/artist-singer',
            query: {data: item,id: item.ar[0].id}
            }">{{item.ar[0].name}}</router-link>
        </li>
    </div>
  </div>
</template>

<script>
import Follow from '@/components/follow/follow'
import Network from '@/network/network'

export default {
    name: 'Playlist',
    components: {
        Follow
    },
    data() {
        return {
            songs: '', //保存歌曲列表
            ruin: true, //组件的v-if值，控制重新渲染数据
            detail: '', //保存歌单详情
            date: '', //保存创建该歌单时的时间戳
        }
    },
    activated() {
        // 获取歌单歌曲
        Network({
            url: '/playlist/track/all',
            params: {
                id: this.$route.query.id
            }
        }).then( ({data:{songs:a}}) => {
            this.songs = a
            this.ruin = true
        })
        //获取歌单详情
        Network({
            url: '/playlist/detail',
            params: {
                id: this.$route.query.id
            }
        }).then( ({data:{playlist:a}}) => {
            // 赋值给组件的挂载数据
            this.detail = a
            this.date = new Date(a.createTime)
        })
    },
    computed: {
        // 时间戳的转换
        GetYear() {
            // 年
            return this.date.getFullYear() + '-'
        },
        GetMonths() {
            // 月
            return (this.date.getMonth() + 1 < 10 ? '0' + (this.date.getMonth() + 1) : this.date.getMonth() + 1)+ '-'
        },
        GetDay() {
            // 日
            return (this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate()) + ' '
        },
    },
    watch: {
        // 监听路由的变化，发生变化后，控制v-if重新渲染数据
        '$route.path': function() {
            this.ruin = false
        }
    },
}
</script>

<style scoped>
    #playlist{
        position: relative;
    }
    #playlist #PlaylistBox{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 1280px;
    }
    #detail{
        padding: 40px;
        width: 760px;
        height: 400px;
        background-color: rgb(235, 235, 235);
    }
    #detail #photo{
        position: absolute;
        top: 40px;
        left: 30px;
        width: 180px;
        height: 180px;
    }
    #detail #DetailContent{
        position: relative;
        left: 200px;
    }
    #detail #DetailContent img{
        display: inline-block;
        width: 50px;
        height: 50px;
    }
    #author{
        position: absolute;
        top: 40px;
    }
    #author div:nth-child(2){
        position: absolute;
        top: 15px;
        left: 60px;
        width: 370px;
    }
    #author div:nth-child(3){
        margin-top: 10px;
        font-size: 13px;
    }
    #author span{
        font-size: 13px;
        margin-left: 20px;
    }
    #author p{
        display: inline-block;
    }
    #author button{
        padding-left: 5px;
        padding-right: 5px;
        border-color: rgb(184, 184, 184);
        border-radius: 4px;
        margin-top: 5px;
        width: 60px;
        height: 30px;
        cursor: pointer;
        background-color: rgb(131, 131, 131);
        color: #fff;
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
        left: 40%;
    }
    li{
        border-top: 1px solid rgba(142, 142, 142, 0.1);
        padding: 5px;
        padding-left: 20px;
        width: 815px;
        list-style: none;
    }
    li:nth-last-child(1){
        border-bottom: 1px solid rgb(67, 67, 67, 0.1)
    }
    li:hover{
        background-color: rgb(199, 199, 199);
    }
    li p{
        display: inline-block;
        text-align: center;
        cursor: pointer;
    }
    li p:hover{
        color: #fff;
    }
    a{
        position: absolute;
        left: 40%;
        text-decoration: none;
        color: black;
    }
    a:hover{
        color: #fff;
    }
</style>