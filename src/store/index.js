import Vue from "vue";
import Vuex from 'vuex'
import Request from '@/network/request'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        songs: '',
        show: false,
        songurl: '',
        index: '',
        stoporplay: false,
        playerif: false,
        close: false //登陆界面是否弹出
    },
    mutations: {
        close(state, trueorfalse) {
            state.close = trueorfalse
        },
        notshow(state) {
            state.show = true
        },
        click(state, item) {
            state.songs = item.songs
            state.index = item.index
            state.show = true
            state.playerif = true
            // 点击歌曲更改播放状态
            if(state.stoporplay){
                state.stoporplay = !state.stoporplay
            }
            //获取歌曲url
            Request({
                url: '/song/url/v1', 
                params: {
                    id: state.songs[state.index].id,
                    level: 'lossless'
                }
            }).then(({data:{data:song}}) => state.songurl = song[0].url )
            .catch(arr =>{
                alert('请求数据失败，请刷新重试！')
            })
            // 获取歌词
            Request({
                url: '/lyric', 
                params: {
                    id: state.songs[state.index].id,
                }
            }).then(({data:{lrc:a}}) => state.lyric = a)
            .catch(arr =>{
                alert('请求数据失败，请刷新重试！')
            })
        },
    }
})