import Vue from "vue";
import Vuex from 'vuex'
import Request from '@/network/request'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        songs: '', //歌曲播放列表
        // show: false, //什么用？
        songurl: '',  //歌曲url
        index: '', //index决定播放哪首歌
        stoporplay: false, //播放器播放状态
        playerif: false, //是否创建播放器
        close: false //登陆界面是否弹出
    },
    mutations: {
        close(state, trueorfalse) {
            state.close = trueorfalse
        },
        //什么用？
        // notshow(state) {
        //     state.show = true
        // },
        PlayMusic(state, item) {
            state.songs = item.songs 
            state.index = item.index 
            state.show = true
            state.playerif = true

            // 检查音乐是否可用
            Request({
                url: '/check/music', 
                params: {
                    id: state.songs[state.index].id,
                }
            }).then( ({data:b}) => {
                // 当前歌曲可用
                if(b.success) {
                    //更改播放器播放状态
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
                }else {
                    // 歌曲不可用：
                    alert(b.message)
                }
            })
        },
    }
})