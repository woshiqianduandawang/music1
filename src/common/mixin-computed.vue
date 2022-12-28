<template></template>

<script>
export default {
  name: "mixin-OmitName",
  data() {
    return {
    };
  },
  computed: {
    // 时间戳的转换
    GetYear() {
      // 年
      return function (date) {
        return date.getFullYear() + "-";
      };
    },
    GetMonths() {
      // 月
      return function (date) {
        return (
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-"
        );
      };
    },
    GetDay() {
      // 日
      return function (date) {
        return (
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " "
        );
      };
    },

    // 省略过长的字符串
    OmitName() {
      return function (name, length) {
        if (name.length > length) {
          return name.substr(0, length) + "…";
        } else {
          return name;
        }
      };
    },
    GetTime() {
      // 歌曲时长，自动补0
      return function (time) {
        let a = parseInt(time) <= 10 ? "0" + parseInt(time) : parseInt(time);
        return a;
      };
    },
    GetArName() {
      // 作者名字拼接
      return function (ar) {
        let name = null;
        ar.forEach((item) => {
          if (name) {
            name = name + "/" + item.name;
          } else {
            name = item.name;
          }
        });
        return name;
      };
    },
  },
};
</script>

<style>
</style>