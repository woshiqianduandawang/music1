<template>
  <div id="PlayerPage" v-if="ruin">
    <Follow></Follow>
    <div id="content">
      <div id="a1">
        <div id="detail">
          <!-- 歌曲头像 -->
          <img :src="song.al.picUrl + '?param=130y130'" alt="" />
          <div id="DetailContent">
            <!-- 歌曲标题 -->
            <h2>{{ song.name }}</h2>
            <span>歌手：{{ song.ar[0].name }}</span>
            <button
              @click="$store.commit('PlayMusic', { songs: songs, index: 0 })"
            >
              播放
            </button>
          </div>
          <!-- 歌词 -->
          <p id="intro" ref="intro" v-html="lyric"></p>
          <div v-if="'open'" id="ibox" ref="ibox">
            <i @click="FnOpen" ref="open">展开</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "@/network/request";
import Follow from "@/views/follow/follow";

export default {
  name: "song",
  components: {
    Follow,
  },
  data() {
    return {
      song: null, //歌曲信息
      lyric: null, //歌词
      ruin: false, //v-if的值，防止闪屏
      upwatch: null //接收watch返回停止监听的函数
    };
  },
  methods: {
    GetData() {
      // 获取歌词
      Request({
        url: "/lyric",
        params: {
          id: this.$route.query.id,
        },
      })
        .then(
          ({
            data: {
              lrc: { lyric: a },
            },
          }) => {
            // 利用字符串里的换行符把歌词字符串转换成
            // 每一行歌词为一个成员的数组
            let arr = a.split(/\n/g);
            // 遍历数组去掉每行歌词前的时间
            let newlyric = arr.map((value) => {
              return value.substring(11, 999);
            });
            // join分隔符把逗号换成换行符
            this.lyric = newlyric.join("<br/>");
          }
        )
        .catch((arr) => {
          alert("请求数据失败，请刷新重试！");
        });
        // 获取歌曲信息
      Request({
        url: "/song/detail",
        params: {
          ids: this.$route.query.id,
        },
      })
        .then(({ data: { songs: a } }) => {
          this.song = a[0];
          this.ruin = true
        })
        .catch((arr) => {
          alert("请求数据失败，请刷新重试！");
        });
    },
    FnOpen() {
      // 判断内容是否溢出
      if (this.$refs.intro.offsetHeight < this.$refs.intro.scrollHeight) {
        this.$refs.open.innerHTML = "收起";
        this.$refs.intro.style.height = "100%";
      } else {
        this.$refs.open.innerHTML = "展开";
        this.$refs.intro.style.height = 600 + "px";
      }
    },
  },
  activated() {
    this.GetData()
    this.upwatch = this.$watch("$route.query", function () {
      this.GetData()
    });
  },
  deactivated() {
    this.ruin = false
    this.upwatch()
  }
};
</script>

<style scoped>
#content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  background-color: #fff;
}
#a1 {
  padding: 56px;
  padding-top: 30px;
  border: 2px solid rgba(79, 79, 79, 0.1);
  width: 840px;
}
#detail {
  position: relative;
  padding: 40px;
  padding-bottom: 120px;
  border-bottom: 0;
  width: 840px;
  box-sizing: border-box;
}
h2 {
  font-size: 30px;
  font-weight: 500;
}
span {
  display: block;
  padding: 6px;
  padding-left: 3px;
}
#detail img {
  position: absolute;
  top: 40px;
  left: 0px;
}
#detail #intro {
  position: relative;
  top: 40px;
  left: 180px;
  width: 550px;
  height: 600px;
  line-height: 40px;
  overflow: hidden;
}
button {
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  border-color: rgb(184, 184, 184);
  border-radius: 4px;
  margin-top: 5px;
  width: 60px;
  height: 30px;
  cursor: pointer;
  background-color: rgb(131, 131, 131);
  color: #fff;
}
#detail #ibox {
  position: absolute;
  bottom: 12px;
  right: 30px;
  width: 100%;
}
#ibox i {
  float: right;
  margin-right: 36px;
  margin-top: 5px;
  color: rgb(12, 115, 194);
  cursor: pointer;
}
#ibox i:hover {
  text-decoration: underline;
}
#detail #DetailContent {
  position: relative;
  left: 180px;
}
</style>