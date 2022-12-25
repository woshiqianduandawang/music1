<template>
  <!-- 登陆界面弹窗 -->
  <div id="signin" ref="signin">
    <div id="a1">
      <p>
        登录
        <i @click="FunClose">×</i>
      </p>
      <!-- 扫码登陆 -->
      <div id="a1-b1" v-show="shiftif">
        <img :src="qrimgurl" alt="" />
        <span>使用网易云音乐app扫码登陆</span>
        <i @click="shift">手机号登录</i>
      </div>
      <!-- 手机号登录 -->
      <div id="a1-b2" v-show="!shiftif">
        <li>
          <input type="number" ref="phone" placeholder="请输入手机号" />
        </li>
        <li>
          <input type="number" ref="captcha" placeholder="短信验证码" />
        </li>
        <span ref="disabled" :class="{ disabled: disabled }" @click="Getcaptcha"
          >获取验证码</span
        >
        <button @click="submit">登录</button>
        <i @click="shift">扫码登录</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      qrimgurl: "",
      key: "",
      shiftif: true,
      phone: "",
      // 匹配正确手机号码的正则表达式
      regexp: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      disabled: false,
    };
  },
  // 传入修改显示或隐藏状态的方法
  props: ["CloseFun"],
  methods: {
    // 隐藏登录弹窗
    FunClose() {
      this.$store.commit("close", false);
    },
    query() {
      this.$Request({
        url: "/login/qr/check",
        params: {
          key: this.key,
        },
      })
        .then((a) => console.log(a))
        .catch((arr) => {
          alert("请求数据失败，请刷新重试！");
        });
      this.$Request({
        url: "/login/status",
      })
        .then((c) => console.log(c))
        .catch((arr) => {
          alert("请求数据失败，请刷新重试！");
        });
    },
    shift() {
      // 切换登录方式
      this.shiftif = !this.shiftif;
    },
    // 获取验证码
    Getcaptcha() {
      // 获取输入的手机号码
      this.phone = this.$refs.phone.value;
      // 正则表达式匹配正确的手机号码
      if (this.regexp.test(this.phone)) {
        // 发送网络请求
        this.$Request({
          url: "/captcha/sent",
          params: {
            phone: this.phone,
          },
        })
          .then((a) => {
            console.log(a);
            // 停用按钮并开启倒计时
            this.disabled = true;
            let time = 60;
            this.$refs.disabled.innerHTML = time;
            const timer = setInterval(() => {
              time--;
              this.$refs.disabled.innerHTML = time;
              if (time == 0) {
                // 倒计时结束，还原到刚开始的状态
                clearInterval(timer);
                this.disabled = false;
                this.$refs.disabled.innerHTML = "获取验证码";
              }
            }, 1000);
          })
          .catch((arr) => {
            alert("请求数据失败，请刷新重试！");
          });
      } else {
        // 提示错误的手机号码
        alert("请输入正确的手机号码");
      }
    },
    // 登录
    submit() {
      this.phone = this.$refs.phone.value;
      const captcha = this.$refs.captcha.value;
      if (this.regexp.test(this.phone)) {
        if (captcha.length == 4) {
          // 发送网络请求
          this.$Request({
            url: "/captcha/verify",
            params: {
              phone: this.phone,
              captcha: captcha,
            },
          }).then((a) => {
            console.log(a);
          });
        } else {
          alert("请输入正确的4位数验证码");
        }
      } else {
        alert("请输入正确的手机号码");
      }
    },
  },
  mounted() {
    this.$Request({
      url: "/login/qr/key",
    })
      .then(
        ({
          data: {
            data: { unikey: key },
          },
        }) => {
          this.key = key;
          this.$Request({
            url: "/login/qr/create",
            params: {
              key: key,
              qrimg: "qrimg",
            },
          }).then(
            ({
              data: {
                data: { qrimg: b },
              },
            }) => {
              this.qrimgurl = b;
              this.$Request({
                url: "/login/qr/check",
                params: {
                  key: key,
                },
              }).then((c) => console.log(c));
            }
          );
        }
      )
      .catch((arr) => {
        alert("请求数据失败，请刷新重试！");
      });
    // 设置弹出登录窗口的遮罩层
    this.$refs.signin.style.width = window.innerWidth + "px";
    this.$refs.signin.style.height = window.innerHeight + "px";
  },
};
</script>

<style scoped>
#signin {
  position: relative;
  background-color: rgb(0, 0, 0, 0.3);
}
#a1 {
  position: absolute;
  top: 340px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid rgb(146, 145, 145);
  border-radius: 10px;
  width: 500px;
  height: 350px;
  background-color: #fff;
}
#a1 p {
  padding: 10px;
  padding-left: 20px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  box-sizing: border-box;
  font-size: 17px;
  color: #fff;
  background-color: rgb(255, 0, 0);
}
#a1 p i {
  position: absolute;
  right: 7px;
  top: -2px;
  font-size: 30px;
  cursor: pointer;
}
#a1-b1 img {
  position: absolute;
  top: 67px;
  left: 50%;
  transform: translateX(-50%);
}
#a1-b1 span {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}
#a1-b1 i,
#a1-b2 i {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 20px;
  cursor: pointer;
  font-size: 13px;
}
#a1-b1 i:hover {
  color: #fff;
  background-color: rgb(183, 183, 183);
}
#a1-b2 {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}
#a1-b2 li {
  border: 1px solid rgba(154, 154, 154, 0.2);
  margin-bottom: 20px;
  border-radius: 15px;
  height: 30px;
}
#a1-b2 li input {
  margin-top: 8px;
  border: 0;
  outline: none;
  margin-left: 13px;
  width: 107px;
}
/* input的placeholder样式 */
input::-webkit-input-placeholder {
  position: absolute;
  top: -3px;
}
#a1-b2 li:nth-child(1) {
  width: 217px;
}
#a1-b2 li:nth-child(1) input {
  width: 190px;
}
#a1-b2 li:nth-child(2) {
  width: 133px;
}
#a1-b2 span {
  position: absolute;
  right: 0;
  top: 53px;
  border-radius: 15px;
  width: 75px;
  height: 30px;
  text-align: center;
  font-size: 13px;
  line-height: 30px;
  cursor: pointer;
  color: #fff;
  background-color: rgb(64, 64, 64);
}
#a1-b2 .disabled {
  border: 1px solid rgb(0, 0, 0, 0.1);
  color: rgb(0, 0, 0);
  background-color: rgb(240, 240, 240);
  cursor: default;
}
#a1-b2 .disabled:hover {
  background-color: rgb(240, 240, 240);
}
#a1-b2 span:hover {
  background-color: rgb(0, 0, 0);
}
/* 去掉input type=number时的箭头 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
#a1-b2 button {
  position: absolute;
  border: 0;
  border-radius: 20px;
  width: 100%;
  height: 30px;
  color: #fff;
  background-color: rgb(255, 0, 0);
  cursor: pointer;
}
#a1-b2 button:hover {
  background-color: rgb(158, 0, 0);
}
#a1-b2 i {
  bottom: -100px;
}
</style>