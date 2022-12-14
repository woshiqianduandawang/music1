<template>
  <div id="shopping">
    <div id="head"></div>
    <div id="content">
      <span>系统建设中~</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopping",
  methods: {},
};
</script>

<style scoped>
#shopping {
  position: relative;
}
#head {
  height: 20px;
  background-color: rgb(255, 0, 0);
}
#content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 300px;
}
span {
  left: 40%;
  font-size: 50px;
}
</style>