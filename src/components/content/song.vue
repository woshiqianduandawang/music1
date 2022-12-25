<template>
  <div id="PlayerPage" v-if="ruin">
    <Song>
      <div slot="imgbox">
        <!-- 头像 -->
        <img :src="song.al.picUrl + '?param=130y130'" alt="" />
        <img src="@/assets/img/song/background.png" alt="" />
      </div>
      <div slot="DetailContent">
        <!-- 歌曲标题 -->
        <h2>{{ song.name }}</h2>
        <router-link to="path">
          歌手：<span>{{ song.ar[0].name }}</span>
        </router-link>
        <router-link to="path">
          专辑：<span>{{ song.al.name }}</span>
        </router-link>
        <div id="action">
          <button
            @click="$store.commit('PlayMusic', { songs: songs, index: 0 })"
          >
            播放
          </button>
          <button
            @click="$store.commit('PlayMusic', { songs: songs, index: 0 })"
          >
            +
          </button>
          <button>收藏</button>
          <button>下载</button>
          <button>分享</button>
          <button>评论</button>
        </div>
      </div>

      <!-- 简介 -->
      <p slot="intro" v-html="lyric"></p>
      
      <!-- 评论区 -->
      <li
        slot="comments"
        v-for="(item, index) in comments.comments"
        :key="index"
      >
        <!-- 头像 -->
        <img :src="item.user.avatarUrl + '?param=50y50'" alt="" />
        <!-- 昵称和评论 -->
        <div>
          <a>{{ item.user.nickname }}</a>
          : {{ item.content }}
        </div>
        <div>
          <!-- 评论时间 -->
          <i>{{ item.timeStr }}</i>
          <!-- 点赞 -->
          <span ref="like" @click="like(index)">{{ item.likedCount }}</span>
        </div>
      </li>
    </Song>
  </div>
</template>

<script>
import Follow from "@/views/follow/follow";
import Song from "@/components/common/song";

export default {
  name: "song",
  components: {
    Follow,
    Song,
  },
  data() {
    return {
      song: null, //歌曲信息
      lyric: null, //歌词
      ruin: false, //v-if的值，防止闪屏
      upwatch: null, //接收watch返回停止监听的函数
      comments: "", //评论
    };
  },
  methods: {
    GetData() {
      // 获取歌词
      this.$Request({
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
      this.$Request({
        url: "/song/detail",
        params: {
          ids: this.$route.query.id,
        },
      })
        .then(({ data: { songs: a } }) => {
          this.song = a[0];
          this.ruin = true;
        })
        .catch((arr) => {
          alert("请求歌曲信息失败，请刷新重试！");
        });

      // 获取歌曲评论
      this.$Request({
        url: "/comment/new",
        params: {
          id: this.$route.query.id,
          type: 0,
          sortType: 2,
        },
      }).then(({ data: { data: a } }) => {
        this.comments = a;
      });
    },

    like(index) {
      const like = this.$refs.like[index];
      if (like.className) {
        like.className = "";
        like.innerHTML = parseFloat(like.innerHTML) - 1;
      } else {
        like.className = "backgroundImge";
        like.innerHTML = parseFloat(like.innerHTML) + 1;
      }
      this.$watch("Count", () => {
        console.log(1);
      });
    },
  },
  computed: {},
  activated() {
    this.GetData();
    this.upwatch = this.$watch("$route.query", function () {
      this.GetData();
    });
  },
  deactivated() {
    this.ruin = false;
    this.upwatch();
  },
};
</script>

<style scoped>
  a span {
    color: rgb(12 115 194);
  }
  a span:hover{
    text-decoration: underline;
  }
</style>