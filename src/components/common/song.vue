<template>
  <div id="PlayerPage">
    <Follow></Follow>
    <div id="content">
      <div id="a1">
        <div id="detail">
          <!-- 头像 -->
          <div id="imgbox">
            <slot name="imgbox"></slot>
            <div></div>
          </div>
          <!-- 标题，歌手，按钮 -->
          <div id="DetailContent">
            <slot name="DetailContent"></slot>
          </div>

          <!-- 歌词 -->
          <div id="intro" ref="intro">
            <slot name="intro"></slot>
          </div>

          <!-- 展开按钮 -->
          <div id="ibox" ref="ibox">
            <i @click="FnOpen" ref="open">展开</i>
          </div>
        </div>

        <!-- 歌曲(table) -->
        <slot name="songs"></slot>

        <!-- 评论区 -->
        <ol id="comments">
          <li>
            <h3>评论</h3>
          </li>
          <!-- li -->
          <slot name="comments"></slot>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import Follow from "@/views/follow/follow";
export default {
  name: "Song",
  components: {
    Follow,
  },
  methods: {
    FnOpen() {
      // 判断内容是否溢出
      if (this.$refs.intro.offsetHeight < this.$refs.intro.scrollHeight) {
        this.$refs.open.innerHTML = "收起";
        this.$refs.intro.style.height = "100%";
      } else {
        this.$refs.open.innerHTML = "展开";
        this.$refs.intro.style.height = 350 + "px";
      }
    },
  },
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
  left: 70px;
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
#DetailContent a {
  display: block;
  position: relative;
  top: 10px;
  padding-bottom: 6px;
  padding-left: 3px;
  font-size: 13px;
}
#DetailContent span {
  font-size: 13px;
  color: rgb(12 115 194);
}
#imgbox {
  position: absolute;
  top: 59px;
  left: -28px;
}
#imgbox img,
#imgbox div {
  border-radius: 300px;
}
#imgbox img:nth-child(1) {
  position: absolute;
  z-index: 3;
  box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.9);
}
#imgbox img:nth-child(2) {
  position: relative;
  top: -36px;
  left: -36px;
  width: 200px;
  height: 200px;
  z-index: 1;
}
#imgbox div:nth-child(3) {
  position: absolute;
  top: -35px;
  left: -35px;
  width: 198px;
  height: 198px;
  box-shadow: 0px 0px 10px rgb(0 0 0);
  z-index: 2;
}
#detail #intro {
  position: relative;
  top: 40px;
  left: 180px;
  width: 550px;
  height: 350px;
  line-height: 40px;
  font-size: 14px;
  overflow: hidden;
}
#action {
  position: relative;
  top: 13px;
}
#action button {
  position: relative;
  padding-left: 5px;
  padding-right: 5px;
  border-color: rgb(184, 184, 184);
  margin-top: 5px;
  border-radius: 4px;
  width: 60px;
  height: 30px;
  cursor: pointer;
  background-color: rgb(60, 137, 210);
  color: #fff;
}
#action button:nth-child(1) {
  border-radius: 4px 0 0 4px;
}
#action button:nth-child(2) {
  left: -5px;
  padding: 0;
  border-left: 0;
  border-radius: 0 4px 4px 0;
  width: 30px;
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
li:nth-child(1) {
  border-bottom: 2px solid rgb(194, 12, 12);
  margin-bottom: 44px;
  padding: 15px;
  padding-left: 0;
}
li div {
  display: inline-block;
  position: relative;
  top: -50px;
  left: 67px;
  width: 800px;
}
li div:nth-child(3) {
  margin-top: 10px;
}
li a {
  display: inline-block;
  position: relative;
  font-size: 16px;
  color: rgb(12, 115, 194);
  cursor: pointer;
}
li a:hover {
  text-decoration: underline;
}
li i {
  /* 发表时间 */
  position: relative;
  color: rgb(176, 159, 153);
}
li span {
  /* 点赞 */
  position: absolute;
  right: 0px;
  padding-left: 30px;
  background: url(../../assets/img/song/LikedCount.png) no-repeat;
  background-position: 7px 2px;
  background-size: 20px 20px;
  cursor: pointer;
}
li span:hover {
  text-decoration: underline;
}
li .backgroundImge {
  background: url(../../assets/img/song/LikedCount-active.png) no-repeat;
  background-position: 7px 2px;
  background-size: 20px 20px;
}

table {
  display: block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
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