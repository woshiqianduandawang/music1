<template>
  <div id="banner">
    <div id="BannerCenter">
      <!-- 右按钮 -->
      <div id="btnbox">
        <img
          id="btn1"
          class="btn"
          src="@/assets/img/banner/rigth.png"
          @click="clickrigth('timer')"
          alt=""
        />
      </div>
      <!-- 左按钮 -->
      <div id="btnbox">
        <img
          id="btn2"
          class="btn"
          src="@/assets/img/banner/left.png"
          @click="clickleft('timer')"
          alt=""
        />
      </div>
      <!-- 轮播图大盒子 -->
      <div id="father">
        <ul id="picture" ref="ul">
          <!-- 第一张图前面放最后一张实现无缝衔接 -->
          <li v-if="connect">
            <a :href="banners[banners.length - 1].url">
              <img id="img" :src="banners[banners.length - 1].pic" alt="" />
            </a>
          </li>
          <!-- 遍历轮播图 -->
          <li v-for="item in banners" :key="item.id">
            <a :href="item.url">
              <img id="img" :src="item.pic" alt="" />
            </a>
          </li>
          <!-- 最后一张后面也放上第一张实现无缝衔接 -->
          <li v-if="connect">
            <a :href="banners[0].url">
              <img id="img" :src="banners[0].pic" alt="" />
            </a>
          </li>
        </ul>
        <!-- 轮播图下面的药丸按钮 -->
        <ol id="active">
          <li
            v-for="(item1, index) in banners"
            :key="index"
            :class="{ activeli: index == count - 1 }"
            @click="clickrigth('timer', index + 1)"
          ></li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import Animation from "@/assets/js/animation-x";
export default {
  name: "Banner",
  data() {
    return {
      banners: "", //轮播图数据
      timer: null, //自动轮播定时器
      count: 1, //轮播时计数（记录轮播到第几张图了）
      connect: false, //首尾轮播图需等到得到数据后才能创建对应bom
      flag: "true", //节流阀
    };
  },
  created() {
    // 发送网络请求
    this.$Request({
      url: "/banner",
      params: {
        type: 1,
      },
    })
      .then(({ data: { banners: banners } }) => {
        this.banners = banners;
        this.connect = true; //得到数据后控制首位无缝衔接的bom的v-if
      })
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
    // 设置自动轮播定时器
    this.timer = setInterval(() => {
      this.clickrigth(1);
    }, 5000);
  },
  methods: {
    // 向右按钮
    clickrigth(timer, index) {
      // timer识别是否是通过点击调用的此函数
      // index识别是否通过点击要玩按钮调用
      // 节流阀
      if (this.flag) {
        this.flag = false;
        if (timer) {
          // 有timer则说明不是自动轮播调用,先清除定时器
          // ,再添加一个新的定时器
          clearTimeout(this.timer);
          this.timer = setInterval(() => {
            this.clickrigth(1);
          }, 5000);
        }
        if (index || index == 0) {
          // 有index则为小药丸按钮点击后调用
          this.count = index;
        } else {
          if (this.count == this.banners.length) {
            // 到最后一张图片时跳到第一张前面的图,
            // 达到无缝衔接效果
            this.$refs.ul.style.left = 0 + "px";
            this.count = 1;
          } else {
            // 计数增加
            this.count++;
          }
        }
        // 调用动画函数
        Animation(this.$refs.ul, 1080 * -this.count, () => {
          // 第一个参数:要动的盒子
          // 第二个参数:移动的距离
          // 第三个:动画完成后的回调函数
          this.flag = true;
        });
      }
    },
    // 向左按钮
    clickleft(timer) {
      if (this.flag) {
        this.flag = false;
        if (timer) {
          clearTimeout(this.timer);
          this.timer = setInterval(() => {
            this.clickrigth(1);
          }, 2500);
        }
        if (this.count == 1) {
          // 到第一张图片的前面图片时,跳到最后
          // 一张图后面的图, 达到无缝衔接效果
          this.$refs.ul.style.left = (this.banners.length + 4) * -800 + "px";
          this.count = this.banners.length;
        } else {
          this.count--;
        }
        Animation(this.$refs.ul, 1080 * -this.count, () => {
          this.flag = true;
        });
      }
    },
  },
};
</script>

<style scoped>
/* 大盒子 */
#banner {
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  height: 420px;
}
#BannerCenter {
  position: absolute;
  width: 1280px;
  left: 50%;
  transform: translateX(-50%);
}
/* 装按钮的盒子和装轮播图的大盒子 */
#btnbox,
#father {
  display: flex;
  position: absolute;
  border-left: 2px solid rgba(38, 38, 38, 0.4);
  border-right: 2px solid rgba(38, 38, 38, 0.4);
  width: 1080px;
  height: 420px;
  background-color: rgb(237, 237, 237);
  box-sizing: border-box;
  overflow: hidden;
}
/* 装按钮的盒子 */
#btnbox {
  overflow: visible;
}
/* 装轮播图片的ul */
#picture {
  display: flex;
  position: absolute;
  left: -1080px;
}
#picture li #img {
  display: block;
}
li {
  list-style: none;
}
/* 左右按钮通用样式 */
.btn {
  position: absolute;
  transform: translateY(-50%);
  border: 0;
  width: 30px;
  height: 45px;
  font-size: 30px;
  cursor: pointer;
  color: #fff;
  background-color: rgb(255, 4, 4, 0.1);
}
#btn:hover {
  background-color: rgb(0, 0, 0, 0.2);
}
/* 右按钮 */
#btn1 {
  top: 50%;
  right: -50px;
}
/* 左按钮 */
#btn2 {
  top: 50%;
  left: -50px;
}
ul img{
  width: 1080px;
  height: 420px;
}
/* 装小药丸按钮的ol */
#active {
  display: flex;
  justify-content: space-evenly;
  position: absolute;
  bottom: 0;
  width: 40%;
  height: 50px;
}
#active li {
  border-radius: 10px;
  width: 27px;
  height: 10px;
  background-color: rgb(255, 255, 255, 0.5);
}
#active li:hover {
  background-color: rgb(255, 0, 0);
  cursor: pointer;
}
/* 处于活跃的小药丸按钮 */
#active .activeli {
  background-color: rgb(255, 0, 0);
}
</style>