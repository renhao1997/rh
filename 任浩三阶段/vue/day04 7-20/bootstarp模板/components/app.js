let app = {
    template: `<div>
        <app-head></app-head>
        <!--核心区域:分左右两边-->
        <app-main></app-main>
    </div>`,
    components: {//注册子组件

        appHead,
        appMain

    }
}