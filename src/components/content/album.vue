<template>
  <!-- 专辑 -->
  <div v-if="albumif">
    <Song>
      <!-- 头像 -->
      <div slot="imgbox">
        <img :src="AlbumData.album.blurPicUrl + '?param=130y130'" />
        <img src="@/assets/img/song/background.png" />
      </div>
      <!-- 专辑名 歌手 按钮-->
      <div slot="DetailContent">
        <h2>
          {{ AlbumData.album.name }}
        </h2>
        <router-link to="path">
          歌手：<span>{{ songs[0].ar[0].name }}</span>
        </router-link>
        <div id="date">
          发行时间：
          <span>
            {{ GetYear(date) }}{{ GetMonths(date) }}{{ GetDay(date) }}
          </span>
        </div>
        <div id="company" v-if="AlbumData.album.company">
          发行公司：<span>{{ AlbumData.album.company }}</span>
        </div>
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
          <button @click="&quot;&quot;;">收藏</button>
          <button @click="&quot;&quot;;">下载</button>
          <button @click="&quot;&quot;;">分享</button>
          <button @click="&quot;&quot;;">评论</button>
        </div>
      </div>

      <!-- 专辑介绍 -->
      <p slot="intro">{{ AlbumData.album.description }}</p>
      
      <!-- 专辑歌曲 -->
      <table slot="songs">
        <tr>
          <th></th>
          <th><i>歌曲</i></th>
          <th><i>时长</i></th>
          <th><i>歌手</i></th>
          <th><i>专辑</i></th>
        </tr>
        <tr v-for="(item, index) in songs" :key="index" id="tr">
          <!-- 序号 -->
          <td>
            {{ index + 1 }}
          </td>
          <!-- 歌曲名 -->
          <td>
            <span
              :title="item.name"
              @click="
                $store.commit('PlayMusic', { songs: songs, index: index })
              "
              >{{ OmitName(item.name, 16) }}</span
            >
          </td>

          <td>
            <!-- 歌曲时长 -->
            <i>
              {{ GetTime(item.dt / 1000 / 60) }}:
              {{ GetTime((item.dt / 1000) % 60) }}
            </i>
          </td>
          <td>
            <!-- 拼接歌手名(如果有多个创作者) -->
            <div id="singers" v-for="(item2, inx) in item.ar" :key="inx">
              <span @click="jump(item2.id)" :title="GetArName(item.ar)">
                {{ item2.name }}
              </span>
              <strong v-if="inx < item.ar.length - 1">/</strong>
            </div>
          </td>
          <!-- 所属专辑 -->
          <td>
            <span :title="item.al.name">{{ OmitName(item.al.name, 11) }}</span>
          </td>
        </tr>
      </table>
      <!-- 评论区 -->
      <li slot="comments" v-for="(item, index) in comments.comments" :key="item.id">
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
import Song from "@/components/common/song";
import mixinComputed from "../../common/mixin-computed.vue";
export default {
  name: "Album",
  components: {
    Song,
  },
  mixins: [mixinComputed],
  data() {
    return {
      AlbumData: null, //专辑数据
      comments: null, //评论
      songs: null,
      albumif: false, //是否创建当前组件
      date: null, //创建时间
    };
  },
  activated() {
    this.$Request({
      url: "/album",
      params: {
        id: this.$route.query.id,
      },
    })
      .then(({ data: a }) => {
        this.AlbumData = a;
        this.songs = a.songs;
        console.log(a);
        this.date = new Date(a.album.publishTime);
        this.albumif = true;
      })
      .catch((arr) => {
        alert("请求专辑信息失败，请刷新重试！");
      });
    // 获取专辑评论
    this.$Request({
      url: "/comment/new",
      params: {
        id: this.$route.query.id,
        type: 3,
        sortType: 2,
      },
    }).then(({ data: { data: a } }) => {
      this.comments = a;
      // console.log(a);
    });
  },
  methods: {
    // 点赞
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
  deactivated() {
    this.albumif = false;
  },
};
</script>

<style scoped>
a span {
  color: rgb(12 115 194);
}
div #company,
div #date {
  display: block;
  position: relative;
  top: 10px;
  padding-bottom: 6px;
  padding-left: 3px;
  font-size: 13px;
}
div #company span,
div #date span {
  color: black;
}
#singers {
  display: inline-block;
}
</style>