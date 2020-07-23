<template>
  <div>
    <!--右边主页面区域-->
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <div class="header clearfix">
        <nav>
          <ul class="nav nav-pills">
            <!-- <li class="active">
              <a href="#/goods/sport">体育</a>
            </li>
            <li>
              <a href="#/goods/tech">科技</a>
            </li>-->
            <router-link to="/goods/sport" active-class="active" tag="li">
              <a href="###">体育</a>
            </router-link>
            <router-link to="/goods/cetr" active-class="active" tag="li">
              <a href="###">科技</a>
            </router-link>
          </ul>
        </nav>
        <hr />
      </div>
      <!-- 内容抽取出去做成组件 -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {}
};
</script>

<style scoped>
</style>