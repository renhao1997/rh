module.exports = {
    devServer: {
        port: 8001, // 端口号，如果端口被占用，会自动提升 1
        open: true, // 启动服务自动打开浏览器
        https: false, // 协议
        host: "localhost", // 主机名，也可以 127.0.0.1 或 做真机测试时候 0.0.0.0
    },
    lintOnSave: false, // 关闭语法检测。默认 true, 警告仅仅会被输出到命令行，且不会使得编译失败。

}