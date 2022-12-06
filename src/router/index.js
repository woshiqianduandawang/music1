import Vue from 'vue'
import Router from 'vue-router'
//发现页follow及其子组件导入
const Empty = () => import('@/components/empty')
const Follow = () => import('@/components/follow/follow')
  const Suggest = () => import('@/components/follow/suggest/suggest')
  const Ranking = () => import('@/components/follow/ranking/ranking')
  const Songsheet = () => import('@/components/follow/songsheet/songsheet')
  const Artist = () => import('@/components/follow/artist/artist')
    const Hotsuggest = () => import('@/components/follow/artist/hotsuggest')
    const Singers = () => import('@/components/follow/artist/singers')

const ArtistPage = () => import('@/components/follow/artist/ArtistPage')
const Find = () => import('@/views/find/find')
const My = () => import('@/views/my/my')
const Shopping = () => import('@/views/shopping/shopping')
const SearchContent = () => import('@/components/content/search/SearchContent')
const Playlist = () => import('@/components/follow/songsheet/playlist')

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
      children: [
        {
          path: '',
          redirect: 'suggest'
        },
        // 发现页>推荐
        {
          path: 'suggest',
          component: Suggest
        },
        // 发现页>排行榜
        {
          path: 'ranking',
          component: Ranking
        },
        // 发现页>歌单
        {
          path: 'songsheet',
          component: Songsheet
        },
        //发现页>歌手
        {
          path: 'artist',
          component: Artist,
          children: [
            {
              path: '',
              redirect: 'hotsuggest'
            },
              // 热门歌手
            {
              path: 'hotsuggest',
              component: Hotsuggest
            },
            // 男歌手
            {
              path: 'amlesinger',
              component: Singers
            },
            // 女歌手
            {
              path: 'femalesinger',
              component: Singers
            },
            // 乐队
            {
              path: 'band',
              component: Singers
            },
            // 全部
            {
              path: 'whole',
              component: Singers
            },
          ]
        },
        // 歌手主页
        {
          path: 'artist-page',
          component: ArtistPage,
        },
      ],
    },
    // 关注
    {
      path: '/find',
      component: Find,
    },
    // 我的
    {
      path: '/my',
      component: My,
    },
    // 商城
    {
      path: '/shopping',
      component: Shopping,
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
  ]
  const router = new Router({
    routes,
    linkActiveClass: 'active',
    mode: 'history'
  })
  router.beforeEach((to, from, next) => {
    next()
  })
export default router
