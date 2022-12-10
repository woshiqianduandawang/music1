<template>
  <div id="a1" v-show="show">
    <div id="a1-b1">
        <li @click="$store.commit('PlayMusic',{songs: songs, index: index})" v-for="(item, index) in songs" :key="index">
            <p >{{item.name}} — {{item.ar[0].name}}</p>
        </li>
    </div>
  </div>
</template>

<script>
import Request from '@/network/request'

export default {
    name: 'HotSongs',
    data() {
        return {
            songs: null,
            oldsongs: null,
            show: false
        }
    },
    methods: {
        // 获取歌手歌曲
        GetSongs() {
            Request({
                url: '/artist/songs', 
                params: {
                    id: this.$route.query.id
                }
            }).then(({data:{songs:songss}}) => {
                this.songs = songss
                this.show = true
            }).catch(arr =>{
                alert('请求数据失败，请刷新重试！')
            })
        }
    },
    created() {
        // 生成组件前获取歌曲
        this.GetSongs()
    },
    activated() {
        // 判断是否是同一个歌手页面
        if(this.$route.query.id != this.oldid) {
            this.GetSongs()
        }else {
            this.show = true
        }
    },
    deactivated() {
        // 离开组件隐藏组件并且保存当前歌手id
        this.show = false
        this.oldid = this.id
    }
}
</script>

<style scoped>
    #a1{
        /* position: relative; */
    }
    #a1-b1{
        position: absolute;
        width: 1280px;
        top: 1027px;
        left: 50%;
        transform: translateX(-50%);
        padding: 80px;
        padding-top: 50px;
        border: 1px solid rgba(67, 67, 67, 0.3);
        border-top: 0;
        box-sizing: border-box;
        background-color: rgb(251, 251, 251);
    }
    li{
        padding: 5px;
        padding-left: 20px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        list-style: none;
        cursor: pointer;
    }
    li:nth-child(2n+1){
        background-color: rgb(244, 244, 244);
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
    p{
        display: inline-block;
    }
</style>