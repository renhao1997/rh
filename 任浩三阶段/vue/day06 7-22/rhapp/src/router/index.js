import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

//引入子路由 @指src目录

import appRigth from '@/components/appRigth.vue';
import appGoods from '@/components/appGoods.vue';
import appOrders from '@/components/appList.vue';
import appSport from '@/components/appSport.vue';
import appCetr from '@/components/appCetr';
import appdetail from '@/components/appdetail.vue';
import appTechdetail from '@/components/appTechdetail.vue';//详情组件
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


Vue.use(VueRouter);

const routes = [
  {
    path: '/user',//用户管理：路径
    component: appRigth, //子组件

  },
  {
    path: '/goods',//用户管理：路径
    redirect: '/goods/sport', //重定向
    component: appGoods,
    children: [
      {
        // path: '/goods/sport',//待会就用 /goods/sport访问appSport组件
        path: 'sport',//待会就用 /goods/sport访问appSport组件
        component: appSport,
        name: 'sport',
        children: [
          {
            path: 'detail/:id',//:id 占位符，动态路由  /goods/sport/detail/2
            component: appdetail, //共用同一个组件
            name: 'sportdetail'
          }
        ]
      },
      {
        // path: '/goods/sport',//待会就用 /goods/sport访问appSport组件
        path: 'cetr',//待会就用 /goods/sport访问appSport组件
        component: appCetr,
        name: 'cetr',
        children: [
          {
            path: 'detail/:id',//:id 占位符，动态路由  /goods/tech/detail/2
            // path: 'detail?' + new Date(),//:id 占位符，动态路由  /goods/tech/detail/2
            // path: 'detail',//:id 占位符，动态路由  /goods/tech/detail
            component: appTechdetail, //共用同一个组件
            name: 'techdetail'
          }
        ]
      },
    ] //子组件

  }, {
    path: '/orders',//用户管理：路径
    component: appOrders, //子组件

  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
