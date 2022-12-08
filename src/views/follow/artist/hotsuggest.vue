<template>
  <div id="HotSuggest">
    <div>
      <router-link v-for="item in ClassSingers" :key="item.id"  :to="{
        path: '/artist-page',
        query: {data:item,id: item.id}
      }">
        <img :src="item.picUrl" alt="">
        <span>{{item.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Request from '@/network/request'

export default {
    name: 'HotSuggest',
    data() {
      return {
        ClassSingers: '',
      }
    },
    created () {
      //获取热门歌手信息
      Request({
        url: '/top/artists', 
        params: {
          limit: 24 
        }
      }).then(({data:{artists:ClassSinger}}) => {
        this.ClassSingers = ClassSinger
      }).catch(arr =>{
        alert('请求数据失败，请刷新重试！')
      })
    },
    destroyed () {
      console.log('HotSuggest销毁');
    }
}
</script>

<style scoped>
#HotSuggest div{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
a{
    display: inline-block;
    width: 200px;
    height: 227px;
    text-align: center;
}
span{
    display: inline-block;
    margin: 10px;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    color: #000;
}
span:hover{
    text-decoration: underline ;
}
img{
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 162px;
}
.active{
    background-color: rgb(29, 29, 29);
    color: #fff;
}
</style>