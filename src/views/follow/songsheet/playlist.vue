<template>
  <!-- 歌单页面 -->
  <div id="playlist" v-if="ruin">
    <Follow></Follow>
    <div id="content">
      <div id="a1">
        <div id="detail">
          <!-- 歌单头像 -->
          <img id="photo" :src="detail.coverImgUrl" alt="" />
          <div id="DetailContent">
            <!-- 歌单标题 -->
            <h2>{{ detail.name }}</h2>
            <!-- 歌单作者信息 -->
            <div v-if="authorif" id="author">
              <img :src="detail.creator.avatarUrl" alt="" />
              <!-- 作者昵称 -->
              <div>
                <p>{{ detail.creator.nickname }}</p>
                <!-- 创建时间 -->
                <span>{{ GetYear(date) }}{{ GetMonths(date) }}{{ GetDay(date) }} 创建</span>
              </div>
              <div>
                标签：
                <p v-for="item in detail.tags" :key="item.id">
                  {{ item }}&ensp;
                </p>
              </div>
              <button
                @click="$store.commit('PlayMusic', { songs: songs, index: 0 })"
              >
                播放
              </button>
            </div>
          </div>
          <p id="intro" ref="intro" v-html="intro"></p>
          <div v-if="open" id="ibox" ref="ibox">
            <a @click="FnOpen" ref="open">展开</a>
          </div>
        </div>
        <table>
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
              <div v-for="(item2, inx) in item.ar" :key="inx">
                <span @click="jump(item2.id)" :title="GetArName(item.ar)">
                  {{ item2.name }}
                </span>
                <strong v-if="inx < item.ar.length - 1">/</strong>
              </div>
            </td>
            <!-- 所属专辑 -->
            <td>
              <span :title="item.al.name">{{
                OmitName(item.al.name, 11)
              }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import mixincomputed from '@/common/mixin-computed'
import Follow from "@/views/follow/follow";

export default {
  name: "Playlist",
  components: {
    Follow,
  },
  mixins: [mixincomputed],
  data() {
    return {
      songs: "", //保存歌曲列表
      ruin: true, //组件的v-if值，控制重新渲染数据
      detail: "", //保存歌单详情
      intro: "", //歌单简介
      date: "", //保存创建该歌单时的时间戳
      authorif: false,
      open: false, //是否显示展开按钮
      OpenEl: "", //展开的元素
    };
  },
  activated() {
    // 获取歌单歌曲
    this.$Request({
      url: "/playlist/track/all",
      params: {
        id: this.$route.query.id,
      },
    })
      .then(({ data: { songs: a } }) => {
        this.songs = a;
        this.ruin = true;
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
    //获取歌单详情
    this.$Request({
      url: "/playlist/detail",
      params: {
        id: this.$route.query.id,
      },
    })
      .then(({ data: { playlist: a } }) => {
        // 赋值给组件的挂载数据
        this.detail = a;
        this.intro = "简介：" + a.description.replace(/\n/g, "<br/>");
        this.authorif = true;
        this.date = new Date(a.createTime);
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
  },
  deactivated() {
    this.open = false;
  },
  methods: {
    jump(id) {
      // 跳转至歌手主页
      this.$router.push({
        path: "/artist-page",
        query: {
          id: id,
        },
      });
    },
    FnOpen() {
      if (this.OpenEl.offsetHeight < this.OpenEl.scrollHeight) {
        this.$refs.open.innerHTML = "收起";
        this.OpenEl.style.height = "100%";
      } else {
        this.$refs.open.innerHTML = "展开";
        this.OpenEl.style.height = 125 + "px";
      }
    },
  },
  updated() {
    this.OpenEl = document.querySelector("#intro");
    if (this.OpenEl.clientHeight < this.OpenEl.scrollHeight) {
      this.open = true;
    }
  },
  watch: {
    // 监听路由的变化，发生变化后，控制v-if重新渲染数据
    "$route.path": function () {
      this.ruin = false;
    },
  },
};
</script>

<style scoped>
#playlist {
  position: relative;
}
#playlist #content {
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
#detail #photo {
  position: absolute;
  top: 40px;
  left: 0px;
  width: 180px;
  height: 180px;
}
#detail #intro {
  position: relative;
  top: 80px;
  left: 180px;
  width: 550px;
  height: 125px;
  line-height: 25px;
  overflow: hidden;
}
#detail #ibox {
  position: absolute;
  bottom: 12px;
  right: 30px;
  width: 100%;
}
#ibox a {
  float: right;
  margin-right: 36px;
  margin-top: 5px;
  color: rgb(12, 115, 194);
  cursor: pointer;
}
#ibox a:hover {
  text-decoration: underline;
}
#detail #DetailContent {
  position: relative;
  left: 180px;
}
#detail #DetailContent img {
  display: inline-block;
  width: 50px;
  height: 50px;
}
#author {
  position: relative;
  top: 40px;
}
#author div:nth-child(2) {
  position: absolute;
  top: 15px;
  left: 60px;
  width: 370px;
}
#author div:nth-child(3) {
  margin-top: 10px;
  font-size: 13px;
}
#author span {
  font-size: 13px;
  margin-left: 20px;
}
#author p {
  display: inline-block;
}
#author button {
  position: absolute;
  top: 83px;
  padding-left: 5px;
  padding-right: 5px;
  border-color: rgb(184, 184, 184);
  border-radius: 4px;
  margin-top: 5px;
  width: 60px;
  height: 30px;
  cursor: pointer;
  background-color: rgb(60, 137, 210);
  color: #fff;
}
/* 歌曲 */
table {
  display: block;
  position: relative;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-top: 0;
  border-collapse: collapse;
  width: 840px;
}
tr:nth-child(2n-1) {
  background-color: rgb(237, 237, 237);
}
#tr:hover {
  background-color: rgb(123, 123, 123);
  color: rgb(234, 234, 234);
}
th {
  box-shadow: 0px 2px 5px rgb(0, 0, 0, 0.1);
  line-height: 42px;
  background-color: rgb(232, 232, 232);
}
th:nth-child(1) {
  height: 42px;
}
/* 歌曲列表table的表头和时长数字 */
table i {
  float: left;
}
th,
td {
  display: inline-block;
  white-space: nowrap;
  padding-left: 20px;
  overflow: hidden;
}
th {
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-right: 0;
}
th:nth-child(1),
td:nth-child(1) {
  border-left: 0;
  padding: 0;
  text-align: center;
  width: 50px;
}
th:nth-child(3),
td:nth-child(3) {
  padding-left: 22px;
  width: 80px;
  text-align: center;
  box-sizing: border-box;
}
th:nth-child(2),
td:nth-child(2) {
  width: 236px;
}
th:nth-child(4),
td:nth-child(4) {
  width: 222px;
}
th:nth-child(5),
td:nth-child(5) {
  width: 187px;
}
table span:hover,
table p:hover {
  color: rgb(255, 255, 255);
  text-decoration: underline;
}
table div {
  display: inline-block;
}
table span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  cursor: pointer;
}
td strong {
  font-size: 20px;
  font-weight: 400;
}
</style>