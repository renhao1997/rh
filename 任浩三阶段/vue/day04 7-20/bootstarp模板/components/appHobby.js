let appHobby = {
  template: `
   <div>
   <h1 class="page-header">
   Dashboard
   <slot name="aaa"></slot>
   <slot name="default"></slot>
   </h1>
   <div class="row placeholders">
     <div class="col-xs-6 col-sm-3 placeholder" v-for="(item,index) in hobbies">
       <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1442998595,1306184984&fm=26&gp=0.jpg" 
       width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
       <h4>{{item}}</h4>
       <span class="text-muted"  @click="remove(index)"><a href="###" >删除</a></span>
     </div>
  
   </div>
   </div>`,
  props: ['hobbies', "remove"],
}