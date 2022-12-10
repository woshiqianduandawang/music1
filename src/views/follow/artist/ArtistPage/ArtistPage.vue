<template>
  <div id="ArtistPage">
        <followVue></followVue>
        <div id="ArtistBox" v-if="liveif">
            <div>
                <img :src="SingerData.artist.cover" alt="">
            </div>
            <div id="RouterBox">
                <router-link :to="{
                    path: '/artist-page/hotsongs',
                    query: {
                        id: this.$route.query.id
                    }
                }">热门歌曲</router-link>
                <router-link :to="{
                    path: '/artist-page/album',
                    query: {
                        id: this.$route.query.id
                    }
                }">所有专辑</router-link>
                <router-link :to="{
                    path: '/artist-page/mv',
                    query: {
                        id: this.$route.query.id
                    }
                }">相关mv</router-link>
                <router-link :to="{
                    path: '/artist-page/desc',
                    query: {
                        id: this.$route.query.id
                    }
                }">艺人介绍</router-link>
            </div>
        </div>
  </div>
</template>

<script>
import Request from '@/network/request'
import followVue from '@/views/follow/follow.vue';
export default {
    name: 'ArtistPage',
    components: {
        followVue
    },
    data() {
        return {
            SingerData: '',
            liveif: false,
        }
    },
    methods: {
        click(a) {
            console.log(a);
        }
    },
    activated() {
        // 获取歌手信息
        Request({
            url: '/artist/detail', 
            params: {
                id: this.$route.query.id
            }
        }).then(({data:{data:a}}) => {
            this.SingerData = a
            this.liveif = true
        }).catch(arr =>{
            alert('请求数据失败，请刷新重试！')
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
}
#ArtistBox{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 40px;
    border-bottom: 1px solid rgba(67, 67, 67, 0.3);
    width: 1280px;
    box-sizing: border-box;
    background-color: #fff;

}
#RouterBox{
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    background-color: rgb(242, 242, 242);
}
a{
    display: inline-block;
    width: 200px;
    height: 48px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    box-sizing: border-box;
    background-color: rgb(242, 242, 242);
}
a:nth-child(1){
    border-left: 1px solid rgb(0, 0, 0, 0.3);
}
img{
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 960px;
    text-align: center;
}

.active{
    border: 1px solid rgb(0, 0, 0, 0.3);
    border-bottom: 0;
    border-top: 2px solid rgb(255, 0, 0);
    height: 51px;
  }
</style>