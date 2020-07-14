


function show() {
    console.log('这是一个模块的功能');
};

let obj = {
    name: '杨超越',
    age: '18',
    sing: function () {
        //this是指obj
        console.log(this.name + '唱歌很好听');
    }
}
// module.exports = show;
// module.exports = obj;
module.exports={
    show,
    obj
}