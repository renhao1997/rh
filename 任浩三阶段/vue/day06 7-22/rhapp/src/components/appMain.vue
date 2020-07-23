<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <!--左边菜单栏区域-->
        <app-left></app-left>
        <!--右边主页面区域: 分上下两个区域-->
        <!-- <app-rigth></app-rigth> -->
        <!-- 设置路由出口：可变 -->
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import appLeft from "@/components/appLeft"; //1、导入组件
import appRigth from "@/components/appRigth.vue";
export default {
  data() {
    return {};
  },

  components: {
    appLeft,
    appRigth
  },

  methods: {}
};
</script>

<style>
</style>