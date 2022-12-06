<template>
    <!-- 播放器图标 -->
    <div id="player" @mouseover="focus" @mouseleave="mouseleave">
        <p>{{$store.state.songs[$store.state.index].name}}{{$store.state.songs[$store.state.index].alia
[0]}} — {{$store.state.songs[$store.state.index].ar[0].name}}</p>
        <div id="imgbox">
            <!-- 上一首 -->
            <img @click="prev" src="@/assets/img/player/Player-prev.png" alt="">
            <!-- 继续播放 -->
            <img v-if="$store.state.stoporplay" @click="play" src="@/assets/img/player/Player-play.png" alt="">
            <!-- 暂停 -->
            <img v-if="!$store.state.stoporplay" @click="stop" src="@/assets/img/player/Player-stop.png" alt="">
            <!-- 下一首 -->
            <img @click="next" src="@/assets/img/player/Player-next.png" alt="">
        </div>
        <div id="listbox">
            <!-- 打开播放列表 -->
            <img @click="OpenorHideList" src="@/assets/img/player/list.png" alt="">
        </div>
        <!-- 播放列表的x -->
        <span @click="OpenorHideList">×</span>
        <ol v-if="listif">
            <li v-for="(item, index) in $store.state.songs" :key="index">
                <p title="播放" @click="$store.commit('click',{songs: $store.state.songs, index: index})">
                    {{item.name}}-{{item.ar[0].name}}
                </p>
            </li>
        </ol>
        <audio v-show="false" :src="$store.state.songurl" controls autoplay></audio>
    </div>
</template>

<script>

export default {
    name: 'Player',
    data() {
        return{
            // 自动下一曲
            autonexts: setInterval(() => {
                if(document.querySelector('audio').ended) {
                   this.next()
                }
            },1000),
            timer: null,
            listif: false
        }
    },
    // 获取父组件singer的show属性，用于显示或隐藏播放器按钮
    methods: {
        // 播放器暂停键
        stop() {
            document.querySelector('audio').pause()
            this.$store.state.stoporplay = !this.$store.state.stoporplay
        },
        // 播放器开始/继续
        play() {
            document.querySelector('audio').play()
            this.$store.state.stoporplay = !this.$store.state.stoporplay
        },
        // 上一首
        prev() {
            if(this.$store.state.index == 0) {
                alert('已经是第一首了')
            } else{
                this.$store.commit('click', {
                    songs: this.$store.state.songs,
                    index: this.$store.state.index - 1
                })
            }
        },
        //下一首
        next() {
            this.$store.commit('click', {
                songs: this.$store.state.songs,
                index: this.$store.state.index + 1
            })
        },
        focus() {
            clearInterval(this.timer)
            const player = document.querySelector('#player')
            player.style.bottom = 0 + 'px'
        },
        mouseleave() {
            this.timer = setInterval(function() {
                player.style.bottom = -58 + 'px'
            }, 3000)
        },
        // 显示播放列表
        OpenorHideList() {
            this.listif = !this.listif
        }
    },
    //播放器位置自动调整
    mounted() {
        const player = document.querySelector('#player')
        this.timer = setInterval(function() {
            player.style.bottom = -58 + 'px'
        }, 3000)
        
    }
}
</script>

<style scoped>
    #player{
            position: fixed;
            bottom: 0px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 60px;
            text-align: center;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.8);
    }
    p{
        margin: 5px;
    }
    #imgbox{
        position: absolute;
        top: 24px;
        left: 50%;
        transform: translateX(-50%);
    }
    img{
        width: 30px;
        height: 30px;
        cursor: pointer
    }
    #listbox img{
        position: absolute;
        top: 30px;
        right: 608px;
        width: 20px;
        height: 20px;
    }
    ol{
        position: absolute;
        top: -1040px;
        right: 332px;
        height: 1000px;
        padding: 20px;
        padding-left: 0;
        padding-right: 0;
        overflow-y: scroll;
        overflow-x: hidden;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.8);
    }
    ol li:hover{
        background-color: rgb(19, 19, 19);
    }
    span{
        position: absolute;
        top: -1040px;
        right: 358px;
        cursor: pointer;
        z-index: 3;
        font-size: 25px;
        color: rgb(234, 234, 234);
    }
    span:hover{
        color: #fff;
    }
</style>