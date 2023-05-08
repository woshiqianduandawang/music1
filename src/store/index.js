import Vue from "vue";
import Vuex from 'vuex'
import Request from '@/network/request'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: '', //歌曲播放列表
    song: '',  //歌曲信息
    index: '', //index决定播放哪首歌
    stoporplay: false, //播放器播放状态
    playerif: false, //是否创建播放器
    close: false, //登陆界面是否弹出
    mask: true
  },
  mutations: {
    close(state, trueorfalse) {
      state.close = trueorfalse
    },
    PlayMusic(state, item) {
      state.songs = item.songs
      state.index = item.index
      state.show = true

      // 检查音乐是否可用
      Request({
        url: '/check/music',
        params: {
          id: state.songs[state.index].id,
        }
      }).then(({ data: b }) => {
        // 当前歌曲可用
        if (b.success) {
          //更改播放器播放状态
          if (state.stoporplay) {
            state.stoporplay = !state.stoporplay
          }
          //获取歌曲url
          Request({
            url: '/song/url/v1',
            params: {
              id: state.songs[state.index].id,
              level: 'lossless'
            }
          }).then(({ data: { data: song } }) => {
            state.song = song[0]
            state.playerif = true
          })
            .catch(arr => {
              alert('请求歌曲url失败，请刷新重试！')
            })
        } else {
          // 歌曲不可用：
          alert(b.message)
        }
      })
    },
  }
})