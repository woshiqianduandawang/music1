let obj = {};
const Animation = function (div, distance, CallbackFun) {
                          //div:要移动的盒子，
                          //distance:移动距离
                          //CallbackFun:回调函数
  (function fn(boj) {
    // 调用移动函数定时器先清除上一次的移动定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
      // type 每次移动距离
      let type = (distance - div.offsetLeft) / 13;
      // 判断停下条件
      if (div.offsetLeft == distance) {
        clearInterval(obj.timer);
        // 停下时执行的回调函数 如没有传递这个实参 则不执行
        CallbackFun && CallbackFun();
      }
      // 下面两个判断式 控制往前还是后移动 并取整
      else if (type > 0) {
        div.style.left = div.offsetLeft + Math.ceil(type) + 'px';
      }
      else if (type < 0) {
        div.style.left = div.offsetLeft + Math.floor(type) + 'px';
      }
    }, 10);
  })();
}
export default Animation