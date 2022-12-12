<template>
  <div id="ClassifyBox">
        <div id="content">
            <div id="ClassBox">
                歌手分类：
                <div>
                    <i @click="jump({type: -1, area: -1}, 0)" :class="{'AcitveElement': active == 0}">
                        推荐歌手
                    </i>
                </div>

                <!-- 华语 -->
                <div>
                    <i @click="jump({type: 1, area: 7}, 1)" :class="{'AcitveElement': active == 1}">华语男歌手</i>
                    <i @click="jump({type: 2, area: 7}, 2)" :class="{'AcitveElement': active == 2}">华语女歌手</i>
                    <i @click="jump({type: 3, area: 7}, 3)" :class="{'AcitveElement': active == 3}">华语乐队/组合</i>
                </div>
                
                <!-- 欧美 -->
                <div>
                    <i @click="jump({type: 1, area: 96}, 4)" :class="{'AcitveElement': active == 4}">欧美男歌手</i>
                    <i @click="jump({type: 2, area: 96}, 5)" :class="{'AcitveElement': active == 5}">欧美女歌手</i>
                    <i @click="jump({type: 3, area: 96}, 6)" :class="{'AcitveElement': active == 6}">欧美乐队/组合</i>
                </div>

                <!-- 日本 -->
                <div>
                    <i @click="jump({type: 1, area: 8}, 7)" :class="{'AcitveElement': active == 7}">日本男歌手</i>
                    <i @click="jump({type: 2, area: 8}, 8)" :class="{'AcitveElement': active == 8}">日本女歌手</i>
                    <i @click="jump({type: 3, area: 8}, 9)" :class="{'AcitveElement': active == 9}">日本乐队/组合</i>
                </div>

                <!-- 韩国 -->
                <div>
                    <i @click="jump({type: 1, area: 16}, 10)" :class="{'AcitveElement': active == 10}">韩国男歌手</i>
                    <i @click="jump({type: 2, area: 16}, 11)" :class="{'AcitveElement': active == 11}">韩国女歌手</i>
                    <i @click="jump({type: 3, area: 16}, 12)" :class="{'AcitveElement': active == 12}">韩国乐队/组合</i>
                </div>

                <!-- 其他 -->
                <div>
                    <i @click="jump({type: 1, area: 0}, 13)" :class="{'AcitveElement': active == 13}">其他男歌手</i>
                    <i @click="jump({type: 2, area: 0}, 14)" :class="{'AcitveElement': active == 14}">其他女歌手</i>
                    <i @click="jump({type: 3, area: 0}, 15)" :class="{'AcitveElement': active == 15}">其他乐队/组合</i>
                </div>
            </div>
            <div id="singers">
                <div>
                    <router-link v-for="(item, index) in ClassSingers" :key="item.id"  :to="{
                        path: '/artist-page',
                        query: {id: item.id}
                    }" :class="{'router-link':index >= 24}">
                        <li v-if="index < 24">
                            <img :src="item.picUrl+ '?param=130y130'" alt="">
                            <span>{{item.name}}</span>
                        </li>
                        <p v-if="index >= 24">
                            <i>{{item.name}}</i>
                        </p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Request from '@/network/request'

export default {
    name: 'Artist',
    data() {
        return {
            ClassSingers: '',
            singerfund: 10,
            GetClassSingers: '',
            active: 0,
            type: -1,
            area: -1
        }
    },
    components: {
    },
    created () {
        // 获取歌手数据
        this.GetClassSingers = () => {
            Request({
                url: '/artist/list', 
                params: {
                type: this.$route.query.type ?this.$route.query.type :-1, 
                area: this.$route.query.area ?this.$route.query.area :-1,
                limit: 99 
                }
            }).then(({data:{artists:ClassSinger}}) => {
                this.ClassSingers = ClassSinger
            }).catch(arr =>{
                alert('请求数据失败，请刷新重试！')
            })
        }
        this.GetClassSingers()
    },
    methods: {
        jump(query, index) {
            this.active = index
            this.$router.push({
                path: "/follow/artist",
                query: query
            })
        }
    },
    watch: {
        '$route.query': function(newval, oldval) {
            this.GetClassSingers()
        }
    },
}
</script>

<style scoped>
    #ClassifyBox{
        position: relative;
        top: 40px;
    }
    #content{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding: 20px;
        padding-top: 35px;
        box-sizing: border-box;
        width: 1280px;
        background-color: #fff;
    }
    #ClassBox{
        position: absolute;
        top: 26px;
        left: -164px;
    }
    #ClassBox div{
        margin-top: 30px;
        border-bottom: 1px solid rgb(0, 0, 0, 0.1);
    }
    #ClassBox i{
        display: block;
        margin: 10px;
        padding: 10px;
        width: 100px;
        font-size: 13px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
    }
    #ClassBox i:hover{
        text-decoration: underline;
    }
    /* 歌手 */
    #singers div{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }
    #singers a{
        margin: 0 38px;
    }
    li{
        display: inline-block;
        width: 130px;
        height: 191px;
        text-align: center;
    }
    span{
        display: inline-block;
        margin: -5px;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        overflow: visible;
        white-space: nowrap;
        color: #000;
    }
    span:hover{
        text-decoration: underline ;
    }
    img{
        display: block;
        margin: 0 auto;
    }
    .AcitveElement{
        border: 1px solid rgba(65, 65, 65, 0.1);
        border-radius: 3px;
        color: rgb(255, 0, 0);
        background-color: rgb(249, 249, 249);
    }
    #singers p{
        width: 10px;
        font-size: 16px;
        text-align: center;
        white-space: nowrap;
    }
    #singers i:hover{
        text-decoration: underline;
        color: rgb(255, 0, 0);
    }
    #singers .router-link{
        margin: 0 38px;
        margin-right: 157px;
        margin-top: 12px;
    }
</style>