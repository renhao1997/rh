<template>
  <div id="app">
    <div>
      <!-- 3、调用组件 -->
      <app-head></app-head>
      <!--核心区域:分左右两边-->
      <app-main></app-main>
      <!-- <appbug></appbug> -->
    </div>
  </div>
</template>
<script>
//根组件：@指的是src目录
import appHead from "@/components/appHead.vue"; //1、导入组件
import appMain from "@/components/appMain.vue";
// import appbug from "@/components/appbug.vue";

export default {
  components: {
    //2、注册组件
    appHead,
    appMain
    // appbug
  }
};
</script>
<style lang="scss">
</style>

