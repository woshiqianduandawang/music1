<template>
  <div id="ClassifyBox">
    <div id="ClassBox">
        歌手分类：
        <router-link to="/follow/artist/hotsuggest">
            热门推荐
        </router-link>
        <router-link :to="{
            path:'/follow/artist/amlesinger',
            query:{type: 1}
        }">男歌手</router-link>
        <router-link :to="{
            path:'/follow/artist/femalesinger',
            query:{type: 2}
        }">女歌手</router-link>
        <router-link :to="{
            path: '/follow/artist/band',
            query: {type: 3}
        }">乐队</router-link>
        <router-link :to="{
            path: '/follow/artist/whole',
            query:{type: -1}
        }">全部</router-link>
        <a  v-if="classnumb!=''" href="#" @click="click2">>>更多>></a>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
  </div>
</template>

<script>
import Network from '@/network/network'

export default {
    name: 'Artist',
    data() {
        return {
            ClassSingers: '',
            songs: '',
            singerfund: 10,
            classnumb: ''
        }
    },
    components: {
    },
    created () {
        // 默认获取热门歌手
        Network({
            url: '/top/artists', 
            limit: 10,
            offset: (5-1)*50
        }).then(({data:{artists:ClassSinger}}) => this.ClassSingers = ClassSinger)
    },
    methods: {
        
        // 获取某分类下的歌手
        click1(itemid, fund) {
            this.classnumb = itemid //保存歌手的数量
            Network({
                url: '/artist/list', 
                params: {
                    type: itemid, //决定获取哪个分类
                    limit: fund //获取的数量
                }
            }).then(({data:{artists:ClassSinger}}) => this.ClassSingers = ClassSinger)
        },
        // 获取更多歌手
        click2() {
            this.singerfund += 10 //点击更多每次增加的歌手数量
            this.click1(this.classnumb, this.singerfund)//重新调用接口获取最新的歌手数
        }
    },
    
}
</script>

<style scoped>
#ClassifyBox{
    position: relative;
}
#ClassBox{
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    padding: 20px;
    padding-top: 0;
    width: 1280px;
    background-color: #fff;
}
a{
    display: inline-block;
    margin: 10px;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    color: #000;
}
a:hover{
    color: #fff;
    background-color: rgb(251, 1, 1);
}
img{
    display: block;
    margin: 0 auto;
    width: 50px;
    height: 50px;
    /* border-radius: 25px; */
}
.active{
    background-color: rgb(29, 29, 29);
    color: #fff;
}
</style>