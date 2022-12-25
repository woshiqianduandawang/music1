<template>
  <!-- 播放器图标 -->
  <div id="player" @mouseover="focus" @mouseleave="mouseleave">
    <div id="content">
      <div id="song" @click="jump($store.state.song.id)">
        <img
          v-if="photo"
          :src="song.al.picUrl + '?param=45y45'"
          alt=""
        />
        <!-- 歌曲名 -->
        <p>
          {{ $store.state.songs[$store.state.index].name
          }}{{ $store.state.songs[$store.state.index].alia[0] }} —
          {{ $store.state.songs[$store.state.index].ar[0].name }}
        </p>
      </div>
      <div id="imgbox">
        <!-- 上一首 -->
        <img @click="prev" src="@/assets/img/player/Player-prev.png" alt="" />
        <!-- 继续播放 -->
        <img
          v-if="$store.state.stoporplay"
          @click="play"
          src="@/assets/img/player/Player-play.png"
          alt=""
        />
        <!-- 暂停 -->
        <img
          v-if="!$store.state.stoporplay"
          @click="stop"
          src="@/assets/img/player/Player-stop.png"
          alt=""
        />
        <!-- 下一首 -->
        <img @click="next" src="@/assets/img/player/Player-next.png" alt="" />
      </div>
      <!-- 播放列表按钮 -->
      <img id="list"
          @click="OpenorHideList"
          src="@/assets/img/player/list.png"
          alt=""
        />
      <!-- 播放列表的x -->
      <span v-show="listif" @click="OpenorHideList">×</span>
      <!-- 播放列表 -->
      <ol v-show="listif">
        <li v-for="(item, index) in $store.state.songs" :key="index">
          <p
            title="播放"
            @click="
              $store.commit('click', {
                songs: $store.state.songs,
                index: index,
              })
            "
          >
            {{ item.name }}-{{ item.ar[0].name }}
          </p>
        </li>
      </ol>
      <audio
        v-show="false"
        :src="$store.state.song.url"
        controls
        autoplay
      ></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "Player",
  data() {
    return {
      // 自动下一曲
      autonexts: setInterval(() => {
        if (document.querySelector("audio").ended) {
          this.next();
        }
      }, 1000),
      timer: null,
      listif: false,
      song: null,
      photo: false,
    };
  },
  // 获取父组件singer的show属性，用于显示或隐藏播放器按钮
  methods: {
    // 播放器暂停键
    stop() {
      document.querySelector("audio").pause();
      this.$store.state.stoporplay = !this.$store.state.stoporplay;
    },
    // 播放器开始/继续
    play() {
      document.querySelector("audio").play();
      this.$store.state.stoporplay = !this.$store.state.stoporplay;
    },
    // 上一首
    prev() {
      if (this.$store.state.index == 0) {
        alert("已经是第一首了");
      } else {
        this.$store.commit("PlayMusic", {
          songs: this.$store.state.songs,
          index: this.$store.state.index - 1,
        });
      }
    },
    //下一首
    next() {
      this.$store.commit("PlayMusic", {
        songs: this.$store.state.songs,
        index: this.$store.state.index + 1,
      });
    },
    // 跳转到播放器主页
    jump(id) {
      this.$router.push({
        path: "/song",
        query: {
          id: id,
        },
      });
    },
    focus() {
      // 获得焦点显示播放器
      // console.log('获得');
      clearInterval(this.timer);
      const player = document.querySelector("#player");
      player.style.bottom = 0 + "px";
    },
    mouseleave() {
      // 失去焦点隐藏播放器
      // console.log('失去');
      this.timer = setInterval(function () {
        player.style.bottom = -58 + "px";
      }, 2000);
    },
    // 显示播放列表
    OpenorHideList() {
      this.listif = !this.listif;
    },
    GetSong() {
      // 获取歌曲信息
      this.$Request({
        url: "/song/detail",
        params: {
          ids: this.$store.state.song.id,
        },
      })
        .then(({ data: { songs: a } }) => {
          this.song = a[0];
          console.log(this.song);
          this.photo = true;
        })
        .catch((arr) => {
          alert("请求歌曲信息失败，请刷新重试！");
        });
    },
  },
  mounted() {
    this.GetSong();
  },
};
</script>

<style scoped>
#player {
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
#content {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
}
#song{
  position: absolute;
  top: 10px;
  left: 170px;
  cursor: pointer;
}
#song img {
  position: absolute;
  top: -3px;
  left: 1px;
}
#song p {
  position: relative;
  top: 10px;
  left: 53px;
}

#imgbox {
  position: absolute;
  top: 6px;
  left: -50px;
}
#imgbox img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
#list {
  position: absolute;
  top: 16px;
  right: 0px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
ol {
  position: absolute;
  top: -1040px;
  right: 0px;
  width: 328px;
  height: 1000px;
  padding: 20px;
  padding-left: 0;
  padding-right: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
}
ol li:hover {
  background-color: rgb(19, 19, 19);
}
p {
  position: relative;
  margin: 5px;
  cursor: pointer;
}
span {
  position: absolute;
  top: -1040px;
  right: 25px;
  cursor: pointer;
  z-index: 4;
  font-size: 25px;
  color: rgb(234, 234, 234);
}
span:hover {
  color: #fff;
}
</style>