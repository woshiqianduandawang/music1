<template>
  <!-- 搜索结果页面 -->
  <div id="SearchContent">
    <followVue></followVue>
    <div v-if="searchif" id="content">
      以下是搜索{{ this.$route.query.content }}的结果：
      <!-- 遍历搜索到的歌手 -->
      <router-link
        id="SearchSingerBox"
        :to="{
          path: '/artist-page',
          query: {
            id: singer.id,
          },
        }"
        v-show="SingerShow"
      >
        <img :src="singer.img1v1Url" alt="" />
        <span>{{ singer.name }}</span>
      </router-link>
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
            <span :title="item.al.name">{{ OmitName(item.al.name, 11) }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import mixincomputed from "@/common/mixin-computed";
import followVue from "@/views/follow/follow.vue";
export default {
  name: "SearchContent",
  components: {
    followVue,
  },
  mixins: [mixincomputed],
  data() {
    return {
      songs: "", //搜索到的歌曲
      singer: "", //搜索到的歌手
      searchif: true, //是否重新渲染页面
      SingerShow: false, //是否显示搜索到的歌手
    };
  },
  activated() {
    this.singer = "";
    this.SingerShow = false;
    this.searchif = false;
    // 搜索结果-歌曲
    this.$Request({
      url: "/cloudsearch",
      params: {
        keywords: this.$route.query.content,
      },
    })
      .then(
        ({
          data: {
            result: { songs: a },
          },
        }) => {
          this.songs = a;
          this.searchif = true;
          // console.log(a);
        }
      )
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
    // 搜索结果-多重匹配
    this.$Request({
      url: "/search/multimatch",
      params: {
        keywords: this.$route.query.content,
      },
    })
      .then(({ data: { result: a } }) => {
        if (a.artist) {
          this.SingerShow = true;
          this.singer = a.artist[0];
        }
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
  },
  methods: {},
};
</script>

<style scoped>
#SearchContent {
  position: relative;
}
#content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
}
#SearchSingerBox {
  display: block;
  padding-top: 20px;
  width: 150px;
  height: 150px;
  text-align: center;
}
#SearchSingerBox span {
  display: block;
}
#SearchSingerBox span:hover {
  text-decoration: underline;
}
#SearchSingerBox img {
  border-radius: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
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