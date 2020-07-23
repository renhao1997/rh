let appRigth = {
  template: `
  <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
<appHobby :hobbies="hobby" :remove="removeone">
<template v-slot:aaa><i>兴趣爱好6666</i></template>

</appHobby>
<appNews :salary="empList" @deleteItem="removeMan"></appNews>

  </div>
    `,
  components: {
    appHobby,
    appNews
  },
  data() {
    return {
      //1.在父组件准备好要传输的数据
      hobby: ['小保健', '敲代码', '电影', '游戏'],
      empList: [{
        id: 1,
        name: '马云',
        salary: 2000
      },
      {
        id: 2,
        name: '马化腾',
        salary: 1500
      },
      {
        id: 3,
        name: '罗永浩',
        salary: 200
      },
      {
        id: 4,
        name: '李彦宏',
        salary: 2000
      }
      ]
    }
  },
  methods: {
    removeone(index) {
      console.log(index);
      this.hobby.splice(index, 1);//删除下标为index的一项数据
    },
    removeMan(index) {
      console.log(index);
      this.empList.splice(index, 1);
    }

  }
}