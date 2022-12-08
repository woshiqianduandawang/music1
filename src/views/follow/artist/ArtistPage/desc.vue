<template>
    <div id="a1">
        <div id="a1-b1">
            <h4>{{SingerData.name}}简介</h4>
            <p>&ensp;&ensp;&ensp;{{SingerData.briefDesc}}</p>
        </div>
    </div>
</template>

<script>
import Request from '@/network/request'

export default {
    name: 'Desc',
    data() {
        return {
            SingerData: '',
        }
    },
    activated() {
        // 获取歌手信息
        Request({
            url: '/artist/detail', 
            params: {
                id: this.$route.query.id
            }
        }).then(({data:{data:{artist:a}}}) => {
            console.log(a);
            this.SingerData = a
        }).catch(arr =>{
            alert('请求数据失败，请刷新重试！')
        })
    },
}
</script>

<style scoped>
    #a1{
        position: relative;
    }
    #a1-b1{
        position: absolute;
        width: 1280px;
        top: 1027px;
        left: 50%;
        transform: translateX(-50%);
        padding: 30px;
        padding-top: 40px;
        border: 1px solid rgba(67, 67, 67, 0.3);
        border-top: 0;
        box-sizing: border-box;
        font-size: 20px;
        background-color: #fff;
    }
    p{
        line-height: 50px;
        letter-spacing: 2px
    }
</style>