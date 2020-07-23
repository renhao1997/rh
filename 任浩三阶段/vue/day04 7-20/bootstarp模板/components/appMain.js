let appMain = {
  template: `<div class="container-fluid">
    <div class="row">

      <!--左边菜单栏区域-->
      <app-left></app-left>
      <!--右边主页面区域: 分上下两个区域-->
      <app-rigth></app-rigth>
      
    </div>
  </div>`,
  components: {
    appLeft,
    appRigth
  }
}