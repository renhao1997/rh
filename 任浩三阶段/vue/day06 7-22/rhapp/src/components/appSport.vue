<template>
  <div>
    <!--体育栏目-->
    <div>
      <ul>
        <li>
          <a href="#">世界杯开赛啦</a>
        </li>
        <li>
          <a href="#">NBA开赛倒计时</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    //功能：获取数据
    async getdata() {
      // console.log(this);
      try {
        let p = await this.$axios.get("../db/sport.json");
        console.log(p);
        this.list = p.data;
        console.log(this.list, 111);
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getdata(); //进入页面就开始发送ajax获取数据
  }
};
</script>

<style scoped>
</style>