<template>
  <!-- 发现-推荐-榜单 -->
  <div id="list">
    <div id="content">
      <div id="a1">
        <h3>榜单</h3>
        <router-link to="/follow/ranking">更多</router-link>
      </div>
      <div id="a2">
        <!-- 飙升榜 -->
        <ol>
          <div>
            <img :src="soar.coverImgUrl + '?param=100y100'" alt="" />
            <h4>飙升榜</h4>
          </div>
          <li
            v-show="index < 10"
            v-for="(item, index) in soar.tracks"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <p
              title="播放"
              @click="
                $store.commit('PlayMusic', { songs: soar.tracks, index: index })
              "
            >
              {{ OmitName(item.name) }}
            </p>
          </li>
          <li id="BottomLi">
            <router-link
              :to="{
                path: '/follow/ranking',
                query: {
                  id: 19723756,
                },
              }"
              >查看全部</router-link
            >
          </li>
        </ol>
        <!-- 新歌榜 -->
        <ol>
          <div>
            <img :src="NewSong.coverImgUrl + '?param=100y100'" alt="" />
            <h4>新歌榜</h4>
          </div>
          <li
            v-show="index < 10"
            v-for="(item, index) in NewSong.tracks"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <p
              title="播放"
              @click="
                $store.commit('PlayMusic', {
                  songs: NewSong.tracks,
                  index: index,
                })
              "
            >
              {{ OmitName(item.name) }}
            </p>
          </li>
          <li id="BottomLi">
            <router-link
              :to="{
                path: '/follow/ranking',
                query: {
                  id: 3779629,
                },
              }"
              >查看全部</router-link
            >
          </li>
        </ol>
        <!-- 原创榜 -->
        <ol>
          <div>
            <img :src="original.coverImgUrl + '?param=100y100'" alt="" />
            <h4>原创榜</h4>
          </div>
          <li
            v-show="index < 10"
            v-for="(item, index) in original.tracks"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <p
              title="播放"
              @click="
                $store.commit('PlayMusic', { songs: soar.tracks, index: index })
              "
            >
              {{ OmitName(item.name) }}
            </p>
          </li>
          <li id="BottomLi">
            <router-link
              :to="{
                path: '/follow/ranking',
                query: {
                  id: 2884035,
                },
              }"
              >查看全部</router-link
            >
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import mixincomputed from '@/common/mixin-computed'

export default {
  name: "List",
  data() {
    return {
      soar: "",
      NewSong: "",
      original: "",
    }
  },
  mixins: [mixincomputed],
  created() {
    //榜单数据
    //飙升榜
    this.$Request({
      url: "/playlist/detail",
      params: {
        id: 19723756,
      },
    })
      .then(({ data: { playlist: a } }) => {
        this.soar = a;
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });

    //新歌榜
    this.$Request({
      url: "/playlist/detail",
      params: {
        id: 3779629,
      },
    })
      .then(({ data: { playlist: a } }) => {
        this.NewSong = a;
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });

    //原创榜
    this.$Request({
      url: "/playlist/detail",
      params: {
        id: 2884035,
      },
    })
      .then(({ data: { playlist: a } }) => {
        this.original = a;
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
  },
};
</script>

<style scoped>
#list {
  position: relative;
}
#content {
  position: relative;
}
#a1 {
  border-bottom: 2.3px solid rgb(211, 1, 1);
  padding-bottom: 10px;
  width: 100%;
}
h3 {
  display: inline-block;
}
a {
  float: right;
  padding: 6px;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;
}
a:hover {
  text-decoration: underline;
}
#a2 {
  display: flex;
  justify-content: center;
  width: 100%;
}
ol {
  display: inline-block;
  margin-top: 35px;
  border: 2px solid rgba(146, 146, 146, 0.5);
  border-right: 0;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  width: 336px;
  background-color: rgb(241, 241, 241);
}
ol:nth-child(3) {
  border-right: 2px solid rgba(146, 146, 146, 0.5);
}
ol div {
  position: relative;
}
ol img {
  margin: 27px;
}
ol h4 {
  position: absolute;
  left: 140px;
  top: 33px;
}
li {
  padding: 5px;
}
li:nth-child(2n),
#BottomLi {
  background-color: rgb(224, 223, 223);
}
ol span {
  display: inline-block;
  margin-left: 20px;
  width: 20px;
  font-size: 20px;
  color: rgb(187, 6, 6);
}
ol p {
  font-size: 16px;
  display: inline-block;
  margin-left: 10px;
}
ol p:hover {
  text-decoration: underline;
  cursor: pointer;
}
ol li a {
  display: block;
  margin-right: -245px;
  float: none;
  padding: 6px;
}
</style>