<template>
    <!-- 点击分类按钮显示的详细分类盒子 -->
  <div id="ClassBox">
    <slot name="h3"></slot>
    <button @blur="blur" @click="click">选择分类</button>
      <!-- 选择分类的盒子 -->
    <div v-show="ClassShow" id="category" @mouseover="mouseover" @mouseleave="mouseleave">
      <li>
        <p>语种：</p>
        <div>
          <router-link to="" @click.native="jump(item.name)" v-for="item in category.languages" :key="item.id">
            {{item.name}}<span>I</span>
          </router-link>
        </div>
      </li>

      <li>
        <p>风格：</p>
        <div>
          <router-link to="" @click.native="jump(item.name)" v-for="item in category.style" :key="item.id">
            {{item.name}}<span>I</span>
          </router-link>
        </div>
      </li>

      <li>
        <p>场景：</p>
        <div>
          <router-link to="" @click.native="jump(item.name)" v-for="item in category.scene" :key="item.id">
            {{item.name}}<span>I</span>
          </router-link>
        </div>
      </li>

      <li>
        <p>情感：</p>
        <div>
          <router-link to="" @click.native="jump(item.name)" v-for="item in category.emotion" :key="item.id">
            {{item.name}}<span>I</span>
          </router-link>
        </div>
      </li>
      
      <li>
        <p>情感：</p>
        <div>
          <router-link to="" @click.native="jump(item.name)" v-for="item in category.theme" :key="item.id">
            {{item.name}}<span>I</span>
          </router-link>
        </div>
      </li>
    </div>
  </div>
</template>

<script>

export default {
    name: 'ClassBox',
    data() {
        return {
            ClassShow: false,
            // 歌单分类
            category: {
                languages: '', //语种
                style: '', //风格
                scene: '', //场景
                emotion: '', //情感
                theme: '' //主题
            },
            mouseov: false
        }
    },
    created() {
        // 请求歌单的分类
        this.$Request({
          url: '/playlist/catlist',
        }).then( ({data:a}) => {
            // 根据category属性的不同将得到的数据分别放进对应的数组
          this.category.languages = a.sub.filter((value,index) => {
            return value.category == 0
          })
          this.category.style = a.sub.filter((value,index) => {
            return value.category == 1
          })
          this.category.scene = a.sub.filter((value,index) => {
            return value.category == 2
          })
          this.category.emotion = a.sub.filter((value,index) => {
            return value.category == 3
          })
          this.category.theme = a.sub.filter((value,index) => {
            return value.category == 4
          })
        }).catch(arr =>{
          alert('请求数据失败，请刷新重试！')
        })
    },
    methods: {
      // 失去焦点先判断鼠标是否悬停在页面，再决定是否隐藏
      blur() {
        if(this.mouseov == false){
          this.ClassShow = false
        }
      },
      //点击按钮隐藏
      click() {
        if(this.ClassShow){
          this.ClassShow = false
        }else {
          this.ClassShow = true
        }
      },
      //鼠标悬停在页面
      mouseover() {
        // 传递鼠标悬停的状态并保持按钮获得焦点
        document.querySelector('button').focus()
        this.mouseov = true
      },
      mouseleave() {
        this.mouseov = false
      },
      // 跳转到某分类下的歌单
      jump(name) {
        this.$router.push({
          path: '/follow/songsheet',
          query: {
            cat: name
          }
        })
        this.ClassShow = false
      }
    }
}
</script>

<style scoped>
    #ClassBox{
        position: relative;
        border-bottom: 3px solid #000;
        margin-bottom: 20px;
        z-index: 2;
        height: 40px;
    }
    #ClassBox h3{
        display: inline-block;
    }
    /* 隐藏的歌单分类最大盒子 */
    #ClassBox #category{
        position: absolute;
        padding-left: 30px;
        padding-top: 20px;
        border-radius: 10px;
        box-sizing: border-box;
        width: 500px;
        height: 500px;
        background-color: rgb(234, 234, 234);
    }
    /* 歌单5大分类的大盒子 */
    #category li{
        margin-top: -3px;
    }
    /* 5大分类文字 */
    #category li P{
        position: relative;
        margin-top: 10px;
        height: 100%;
        font-weight: 700;
    }
    /* 歌单类型大盒子 */
    #category li div {
        position: relative;
        top: -25px;
        left: 50px;
        width: 400px;
    }
    /* 各分类下的所有类型 */
    #category li div a{
        display: inline-block;
        padding: 6px;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
    }
    #category li div a:hover{
      text-decoration: underline;
    }
    /* 分割的竖线 */
    #category li div span{
        position: relative;
        top:2px;
        left: 6px;
        color: rgb(255, 255, 255, 0.5);
        font-size: 18px;
        font-weight: 200;
    }
</style>