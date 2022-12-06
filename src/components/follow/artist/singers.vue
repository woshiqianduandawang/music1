<template>
  <div id="singers">
    <div>
      <router-link v-for="item in ClassSingers" :key="item.id"  :to="{
        path: '/follow/artist-page',
        query: {data:item,id: item.id}
      }">
        <img :src="item.picUrl" alt="">
        <span>{{item.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Network from '@/network/network'

export default {
  name: 'Singers',
  data() {
    return {
      ClassSingers: '',
      GetClassSingers: ''
    }
  },
  created () {
    this.GetClassSingers = () => {
      Network({
        url: '/artist/list', 
        params: {
          type: this.$route.query.type, 
          limit: 24 
        }
      }).then(({data:{artists:ClassSinger}}) => {
        this.ClassSingers = ClassSinger
      })
    }
    this.GetClassSingers()
  },
  watch: {
    '$route.query.type': function(newval, oldval) {
      this.GetClassSingers()
    }
  },
  destroyed () {
    console.log('销毁');
  },
}
</script>

<style scoped>
#singers div{
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