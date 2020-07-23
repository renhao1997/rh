let appNews = {
  template: `
    <div><h2 class="sub-header">Section title</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>工资</th>
          <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in salary">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.salary }}</td>
            <td><a href="###"  @click="remove(index)">删除</a></td>
          </tr>
          
        </tbody>
      </table>
    </div></div>`,
  props: ["salary"],
  methods: {
    remove(index) {
      // console.log(index, 888);
      this.$emit('deleteItem', index)//触发自定义事件：参数一:自定义事件名称；参数二起:数据
    }
  }
}