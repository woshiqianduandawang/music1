<template>
  <div id="a1" v-if="show">
    <table>
      <tr v-for="(item, index) in songs" :key="index" id="tr">
        <!-- 序号 -->
        <td>
          {{ index + 1 }}
        </td>
        <!-- 歌曲名 -->
        <td>
          <span
            :title="item.name"
            @click="$store.commit('PlayMusic', { songs: songs, index: index })"
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
        <!-- 所属专辑 -->
        <td>
          <span :title="item.al.name">{{ OmitName(item.al.name, 14) }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import mixincomputed from '@/common/mixin-computed'

export default {
  name: "HotSongs",
  data() {
    return {
      songs: null,
      show: false,
    };
  },
  // 混入mixin-computed里的名字过长省略的方法
  mixins: [mixincomputed],
  methods: {
    // 获取歌手歌曲
    GetSongs() {
      this.$Request({
        url: "/artist/songs",
        params: {
          id: this.$route.query.id,
        },
      })
        .then(({ data: { songs: songss } }) => {
          this.songs = songss;
          this.show = true;
        })
        .catch((arr) => {
          alert("请求数据失败，请刷新重试！");
        });
    },
  },
  created() {
    // 生成组件前获取歌曲
    this.GetSongs();
  },
  activated() {
    this.GetSongs();
  },
  deactivated() {
    // 离开组件隐藏组件并且保存当前歌手id
    this.show = false;
  },
};
</script>

<style scoped>
#a1 {
  position: relative;
  width: 640px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid rgba(79, 79, 79, 0.1);
  border-top: 0;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
}
#a1-b1 {
  position: relative;
}
/* 歌曲 */
table {
  display: block;
  position: relative;
  /* border: 1px solid rgb(0, 0, 0, 0.1); */
  border-top: 0;
  border-collapse: collapse;
}
tr{
  width: 100%;
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
td {
  display: inline-block;
  white-space: nowrap;
  padding-left: 20px;
  overflow: hidden;
}
td:nth-child(1) {
  border-left: 0;
  padding: 0;
  text-align: center;
  width: 50px;
}
td:nth-child(3) {
  padding-left: 22px;
  width: 80px;
  text-align: center;
  box-sizing: border-box;
}
td:nth-child(2) {
  width: 236px;
}
td:nth-child(4) {
  width: 230px;
}
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