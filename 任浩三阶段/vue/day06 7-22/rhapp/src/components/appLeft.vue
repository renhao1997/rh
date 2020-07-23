<template>
  <div class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
      <!-- <li class="active" v-for="(item) in menu" :key="item.id">
        <a href="#">
          {{item.title}}
          <span class="sr-only">(current)</span>
        </a>
      </li>-->

      <router-link
        active-class="active"
        exact
        tag="li"
        v-for="item in menu"
        :key="item.id"
        :to="item.path"
      >
        <!-- {{ item.title }} -->
        <a href="###">{{ item.title }}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          id: 1,
          title: "用户管理",
          path: "/user"
        },
        {
          id: 2,
          title: "商品管理",
          path: "/goods"
        },
        {
          id: 3,
          title: "订单管理",
          path: "/orders" //默认是模糊匹配： /orders  /  /orders
        }
      ]
    };
  }
};
</script>

<style>
</style>