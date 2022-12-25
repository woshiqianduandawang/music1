<template>
  <!-- 搜索框部分 -->
  <div id="searchbox">
    <!-- inpu盒子和路由跳转 -->
    <div id="inputhbox">
      <input
        type="text"
        placeholder="歌手/歌曲/歌单"
        @input="input"
        @focus="focus"
        @blur="blur"
        @keyup="keyup"
      />
      <!-- 搜索图标 -->
      <router-link id="SearchRouterlink" @click.native="click(value)" to="">
        <img id="searchimg" src="@/assets/img/search/search.png" alt="" />
      </router-link>
    </div>
    <!-- 搜索历史盒子 -->
    <div
      v-show="SearchRecordShow"
      id="SearchRecord"
      @mouseover="mouseover"
      @mouseleave="mouseleave"
    >
      <div>搜索历史：</div>
      <li v-for="(item, index) in record" :key="index">
        <p :title="item" @click="click(item, 'yes')">{{ item }}</p>
        <span title="删除" @click="deleterecord(index)">×</span>
      </li>
    </div>
    <!-- 搜索建议盒子 -->
    <div
      id="SearchSuggest"
      v-show="SuggestShow"
      @mouseover="mouseover"
      @mouseleave="mouseleave"
    >
      <div>搜索建议：</div>
      <ol v-for="item in suggest" :key="item.id">
        <!-- 搜索建议>歌手 -->
        <div v-if="item == suggest.artists" id="artists">
          <span>歌手：</span>
          <div id="libox">
            <li v-for="item1 in item" :key="item1.id">
              <p @click="click(item1.name, 'yes')">{{ item1.name }}</p>
            </li>
          </div>
        </div>
        <!-- 搜索建议>歌曲 -->
        <div v-if="item == suggest.songs" id="songs">
          <span>歌曲：</span>
          <div id="libox">
            <li v-for="item1 in item" :key="item1.id">
              <p
                v-for="(item2, index) in item1.artists"
                :key="item2.id"
                @click="play(item1, index)"
              >
                {{ item1.name }} — {{ item2.name }}
              </p>
            </li>
          </div>
        </div>
        <!-- 搜索建议>歌单 -->
        <div v-if="item == suggest.playlists" id="playlists">
          <span>歌单：</span>
          <div id="libox">
            <li v-for="item1 in item" :key="item1.id">
              <p>{{ item1.name }}</p>
            </li>
          </div>
        </div>
        <!-- 搜索建议>专辑 -->
        <div v-if="item == suggest.albums" id="albums">
          <span>专辑：</span>
          <div id="libox">
            <li v-for="item1 in item" :key="item1.id">
              <p>{{ item1.name }} — {{ item1.artist.name }}</p>
            </li>
          </div>
        </div>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      value: "", //input输入内容
      record: [], //跟本地本地储存同步的挂载数据（搜索记录）
      SearchRecordShow: false, //搜索记录盒子显示或隐藏
      SuggestShow: false, //搜索建议盒子显示或隐藏
      mouseoverif: true, //鼠标停留搜索建议或者搜索记录盒子
      timeout: null, //防抖的定时器
      suggest: "", //搜索建议内容
    };
  },
  methods: {
    click(value, judge) {
      this.SuggestShow = false;
      //携带搜索内容跳转到搜索结果组件
      if (value == "") {
        alert("内容不能为空");
      } else {
        this.$router.push({
          path: "/empty",
          query: {
            router: {
              path: "/search",
              content: value,
            },
          },
        });
        // 保存数据到data.value和本地存储
        if (judge) {
          this.SearchRecordShow = false;
        } else {
          this.record.unshift(value);
          sessionStorage.setItem("record", this.record);
        }
      }
    },
    input() {
      // 获取input输入内容
      this.value = document.querySelector("input").value;
      //搜索建议部分
      this.SuggestShow = true;
      if (this.value == "") {
        this.SuggestShow = false;
        clearTimeout(this.timeout);
      }
      if (this.timeout != null) {
        // 设置定时器防抖
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.$Request({
          // 发送搜索建议网络请求
          url: "/search/suggest",
          params: {
            keywords: this.value,
          },
        })
          .then(({ data: { result: a } }) => (this.suggest = a))
          .catch((arr) => {
            alert("请求数据失败，请刷新重试！");
          });
      }, 500);
    },
    focus() {
      this.SuggestShow = false;
      if (this.value != "") {
        this.SuggestShow = true;
      }
      // input框获得焦点显示搜索历史盒子
      this.SearchRecordShow = true;
    },
    blur() {
      // input失去焦点先判断鼠标是否悬停在搜索历史再决定是否隐藏
      if (this.mouseoverif) {
        this.SuggestShow = false;
        this.SearchRecordShow = false;
      }
    },
    keyup(e) {
      //添加enter键也能实现跳转
      if (e.key == "Enter") {
        //让input失去焦点
        document.querySelector("input").blur();
        //跳转
        this.click(this.value);
      }
    },
    deleterecord(index) {
      //删除本地搜索记录
      this.record.splice(index, 1);
      // 更新本地存储
      sessionStorage.setItem("record", this.record);
    },
    mouseover() {
      // 判断鼠标是否悬停在搜索盒子，
      // 如果是，就让input失去焦点也不隐藏搜索记录
      this.mouseoverif = false;
      document.querySelector("input").focus();
    },
    mouseleave() {
      //鼠标离开搜索盒子，让input失去焦点后能正常隐藏搜索记录
      this.mouseoverif = true;
    },

    play(song, index) {
      // 给数据进行包装，防止player拿不到数据报错
      song.ar = [{ name: song.artists[index].name }];
      song.alia = [];
      let songs = [song];
      //发送歌曲到vuex再到player播放
      this.$store.commit("click", { songs: songs, index: 0 });
    },
  },
  created() {
    // 加载组件前先获取本地存储的历史搜索记录
    if (sessionStorage.getItem("record")) {
      this.record = sessionStorage.getItem("record").split(",");
    }
  },
};
</script>

<style scoped>
/* 最大的盒子 */
#searchbox {
  position: absolute;
  right: 200px;
  top: 17px;
  border: 0;
  border-radius: 15px;
  outline: none;
  width: 150px;
  height: 30px;
  background-color: #fff;
}
/* 装input的盒子 */
#inputhbox {
  width: 120px;
  height: 20px;
}
#inputhbox input {
  position: absolute;
  top: 0px;
  left: 14px;
  border: 0;
  outline: none;
  width: 120px;
  height: 30px;
  font-size: 16px;
  z-index: 5;
}
/* input的placeholder样式 */
input::-webkit-input-placeholder {
  position: absolute;
  top: 4px;
  font-size: 15px;
  line-height: 30px;
  color: #aab2bd;
}
/* 搜索记录的盒子 */
#SearchRecord {
  position: absolute;
  top: 43px;
  left: -50px;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #aab2bd;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 200%;
  height: 200px;
  z-index: 5;
  font-size: 13px;
  background-color: #fff;
}
/* 隐藏x轴的滚动条 */
::-webkit-scrollbar {
  display: none;
}
#SearchRecord li {
  height: 20px;
  z-index: 666;
  list-style: none;
  cursor: pointer;
}
#SearchRecord li p {
  float: left;
  width: 266px;
  overflow: hidden;
  white-space: nowrap;
}
#SearchRecord li p:hover {
  background-color: rgb(224, 224, 224);
  color: #fff;
}
#SearchRecord li span {
  float: right;
  margin-right: -5px;
  font-size: 20px;
  line-height: 13px;
  cursor: pointer;
}
/* 放大镜图标 */
#searchimg {
  position: absolute;
  top: 3px;
  right: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  z-index: 5;
}
#SearchRouterlink {
  width: 0;
  height: 0;
}
/* 搜索建议的盒子 */
#SearchSuggest {
  position: absolute;
  top: 43px;
  left: -50px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 3px #aab2bd;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 300%;
  height: 300px;
  z-index: 6;
  font-size: 16px;
  background-color: #fff;
}

#SearchSuggest ol {
  border-bottom: 1px solid rgba(186, 186, 186, 0.3);
}
#SearchSuggest ol:nth-last-child(1) {
  border: 0;
}
#SearchSuggest ol div #libox {
  margin-left: 20px;
  overflow: hidden;
  width: 275px;
}
#SearchSuggest ol div #libox li {
  margin: 5px;
  list-style: none;
}
#SearchSuggest ol div li p:hover {
  cursor: pointer;
  background-color: rgba(186, 186, 186, 0.3);
}
#SearchSuggest ol div span {
  float: left;
  margin-top: 5px;
  height: 100%;
}
#SearchSuggest ol div #libox {
  display: inline-block;
}
</style>