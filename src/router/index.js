import Vue from 'vue'
import Router from 'vue-router'
//发现页follow及其子组件导入
const Empty = () => import('@/components/content/search/empty')
const Follow = () => import('@/views/follow/follow')
const Suggest = () => import('@/views/follow/suggest/suggest')
const Ranking = () => import('@/views/follow/ranking/ranking')
const Songsheet = () => import('@/views/follow/songsheet/songsheet')
const Artist = () => import('@/views/follow/artist/artist')

const ArtistPage = () => import('@/views/follow/artist/ArtistPage/ArtistPage')

const Find = () => import('@/views/find/find')
const My = () => import('@/views/my/my')
const Shopping = () => import('@/views/shopping/shopping')
const SearchContent = () => import('@/components/content/search/SearchContent')
const Playlist = () => import('@/views/follow/songsheet/playlist')
const Song = () => import('@/components/content/song')
const Album = () => import('@/components/content/album')

Vue.use(Router)

const routes = [
  {
    //重定向
    path: '/empty',
    component: Empty
  },
  {
    path: '',
    redirect: '/follow'
  },
  //发现页follow
  {
    path: '/follow',
    component: Follow,
    meta: {
      title: '发现'
    },
    children: [
      {
        path: '',
        redirect: 'suggest'
      },
      // 发现页>推荐
      {
        path: 'suggest',
        component: Suggest,
        meta: {
          title: 'music'
        },
      },
      // 发现页>排行榜
      {
        path: 'ranking',
        component: Ranking,

      },
      // 发现页>歌单
      {
        path: 'songsheet',
        component: Songsheet,
        meta: {
          title: '发现-歌单'
        },
      },
      //发现页>歌手
      {
        path: 'artist',
        component: Artist,
      },
    ],
  },
  // 歌手主页
  {
    path: '/artist-page',
    component: ArtistPage,
    children: [
      {
        path: '',
        redirect: 'hotsongs'
      },
      {
        // 歌手歌曲
        path: 'hotsongs',
        components: {
          artist: () => import('@/views/follow/artist/ArtistPage/HotSongs')
        },
      },
      {
        // 歌手专辑
        path: 'album',
        components: {
          artist: () => import('@/views/follow/artist/ArtistPage/album')
        },
      },
      {
        // 歌手mv
        path: 'mv',
        components: {
          artist: () => import('@/views/follow/artist/ArtistPage/mv')
        },
      },
      {
        // 歌手介绍
        path: 'desc',
        components: {
          artist: () => import('@/views/follow/artist/ArtistPage/desc')
        },
      },
    ]
  },
  // 关注
  {
    path: '/find',
    component: Find,
    meta: {
      title: '关注'
    },
  },
  // 我的
  {
    path: '/my',
    component: My,
    meta: {
      title: '我的音乐'
    },
  },
  // 商城
  {
    path: '/shopping',
    component: Shopping,
    meta: {
      title: '商城'
    },
  },
  // 搜索结果
  {
    path: '/search',
    component: SearchContent,
  },
  // 歌单详情页
  {
    path: '/playlist',
    component: Playlist,
  },
  // 歌曲详情页
  {
    path: '/song',
    component: Song
  },
  // 专辑详情
  {
    path: '/album',
    component: Album
  }
]
const router = new Router({
  routes,
  linkActiveClass: 'active',
  // mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
