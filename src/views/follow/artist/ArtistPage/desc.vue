<template>
  <div id="a1">
    <div id="a1-b1">
      <h4>{{ SingerData.name }}简介</h4>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ SingerData.briefDesc }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "SingerDesc",
  data() {
    return {
      SingerData: "",
    };
  },
  created() {
    this.Getdata();
  },
  methods: {
    Getdata() {
      // 获取歌手信息
      this.$Request({
        url: "/artist/detail",
        params: {
          id: this.$route.query.id,
        },
      })
        .then(
          ({
            data: {
              data: { artist: a },
            },
          }) => {
            this.SingerData = a;
          }
        )
        .catch((arr) => {
          alert("请求数据失败，请刷新重试！");
        });
    },
  },
  activated() {},
};
</script>

<style scoped>
#a1 {
  position: relative;
}
#a1-b1 {
  position: relative;
  width: 640px;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px;
  padding-top: 40px;
  border: 1px solid rgba(67, 67, 67, 0.3);
  border-top: 0;
  box-sizing: border-box;
  background-color: #fff;
}
p {
  line-height: 30px;
  font-size: 16px;
}
</style>