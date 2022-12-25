<template>
  <div id="album">
    <div>
      <ol ref="ol">
        <router-link :to="{
          path: '/album',
          query: {
            id: item.id
          }
        }" v-for="(item, index) in albums" :key="index">
          <li>
            <img
              id="background"
              src="@/assets/img/song/background.png"
              alt=""
            />
            <img id="img" :src="item.picUrl + '?param=120y120'" alt="" />
            <p>{{ OmitName(item.name, 18) }}</p>
            <p>
              {{ GetYear(new Date(item.publishTime))
              }}{{ GetMonths(new Date(item.publishTime))
              }}{{ GetDay(new Date(item.publishTime)) }}
            </p>
          </li>
        </router-link>
      </ol>
    </div>
  </div>
</template>

<script>
import mixincomputed from "@/common/mixin-computed";

export default {
  name: "Album",
  mixins: [mixincomputed],
  data() {
    return {
      albums: null,
      date: null,
    };
  },
  methods: {
    jump(id) {
      this.$Request({
        url: "/album",
        params: {
          id: id,
        },
      })
        .then((a) => {
          console.log({ data: a });
        })
        .catch((arr) => {
          alert("请求数据失败，请刷新重试！");
        });
    },
  },
  created() {
    this.$Request({
      url: "/artist/album",
      params: {
        id: this.$route.query.id,
      },
    })
      .then(({ data: { hotAlbums: a } }) => {
        this.albums = a;
        console.log(a);
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
  },
};
</script>

<style scoped>
ol {
  display: block;
  position: relative;
  margin: 0 auto;
  border: 2px solid rgba(79, 79, 79, 0.1);
  padding: 10px;
  box-sizing: border-box;
  width: 640px;
}
#img {
  position: absolute;
  border-radius: 10px;
  box-shadow: 3px 3px 4px rgb(0 0 0 / 50%);
  z-index: 2;
}
ol li {
  position: relative;
  display: inline-block;
  margin: 16px 0 0 16px;
  width: 138px;
  height: 188px;
  box-sizing: border-box;
  cursor: pointer;
}
ol li #background {
  position: absolute;
  left: 16px;
  border-radius: 999px;
  width: 120px;
  height: 120px;
  box-shadow: 0px 5px 5px rgb(0 0 0 / 50%);
  z-index: 1;
}
li p {
  position: absolute;
  bottom: 2px;
  font-size: 13px;
  color: rgb(107, 102, 102);
}
li p:nth-child(3) {
  top: 126px;
  font-size: 16px;
}
</style>