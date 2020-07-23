(() => {
    /*
            * 加减数量
            * 删除某行
            * 全选反选
            * 
            * 
            * 
            * 总数量和总价格
            * 数据持久化:存到本地
        */

    let vm = new Vue({

        el: "#app",

        data: {
            goodlists: [{
                shop_isok: false,//店铺复选框
                shop_id: 10001,//店铺id
                shop_name: '成人用品',//店铺名称
                shop_comm: [{ //店铺的商品
                    comm_isok: false,//商品复选框
                    comm_id: 1008,//商品id
                    comm_img: './images/time3.jpg',//商品img路径
                    comm_int: '这是一家很不错的店里面的货物',//标题
                    comm_big: '259g', //规格
                    comm_price: '89', //单价
                    num: 1, //数量
                    total: 8998,//总价
                    stock: 6
                }, {
                    comm_isok: false,
                    comm_img: './images/time1.jpg',
                    comm_id: 1008,
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '19',
                    num: 3,
                    total: 1998,
                    stock: 10
                }]
            },
            {
                shop_isok: false,
                shop_id: 10003,
                shop_name: '娃娃情趣',
                shop_comm: [{
                    comm_isok: false,
                    comm_id: 1008,
                    comm_img: './images/time3.jpg',
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '59',
                    num: 1,
                    total: 5998,
                    stock: 6
                }, {
                    comm_isok: false,
                    comm_id: 1008,
                    comm_img: './images/timg2.jpg',
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '89',
                    num: 1,
                    total: 8998,
                    stock: 6
                }, {
                    comm_isok: false,
                    comm_img: './images/time1.jpg',
                    comm_id: 1008,
                    comm_int: '这是一家很不错的店里面的货物',
                    comm_big: '259g',
                    comm_price: '19',
                    num: 1,
                    total: 1998,
                    stock: 6
                }]
            },
            ],
            showMe: true,
        },
        methods: {
            // cut(index, idx) {

            //     let num = this.goodlists[index].shop_comm[idx].num * 1;
            //     num--;
            //     // console.log(num);
            //     this.goodlists[index].shop_comm[idx].num = num;


            //     // if (num < 1) {

            //     //     this.goodlists[index].shop_comm[idx].num = 1;
            //     // }
            // }
            remove(index, idx) {
                console.log(999);
                //点击删除按钮：打开会话框
                this.showMe = false;
                localStorage.setItem('shopindex', index);
                localStorage.setItem('goodindex', idx);
                // let ha = confirm("sss")
                // if (ha) {
                //     this.goodlists[index].shop_comm.splice(idx, 1);
                // }
                // if (!this.goodlists[index].shop_comm.length) {
                //     this.goodlists.splice(index, 1);//如果该商品没有商品，则删除整个店铺
                // }
            },
            removeGood() {

                // this.goodlists[index].shop_comm.splice(idx, 1);
                let index = localStorage.getItem('shopindex');
                let idx = localStorage.getItem('goodindex');

                this.goodlists[index].shop_comm.splice(idx, 1);//确定删除
                if (!this.goodlists[index].shop_comm.length) {
                    this.goodlists.splice(index, 1);//如果该商品没有商品，则删除整个店铺
                }
                this.showMe = true;//关闭会话框
            },
            change(index) {
                console.log("aa");
                this.goodlists[index].shop_comm.forEach(good => {
                    // console.log(good.comm_isok);
                    // console.log(this.goodlists[index].shop_isok);
                    good.comm_isok = !this.goodlists[index].shop_isok;
                })
            }

        },
        watch: {
            goodlists: {
                deep: true,
                handler(newval) {
                    // console.log(newval);
                    //监听数量的变化，不能超过库存量
                    newval.forEach(item => {
                        // console.log(item.shop_comm);
                        item.shop_comm.forEach(good => {

                            // console.log(good.num);
                            if (good.num < 1) {
                                //最小买一份
                                good.num = 1;
                                alert('最少买一份')
                            } else if (good.num > good.stock) {
                                //最大买库存量
                                good.num = good.stock;
                                alert('最多买' + good.stock + '份');
                            }
                        })

                    });
                    newval.forEach(item => {
                        //item：某个店铺，三级复选框控制二级复选框
                        item.shop_isok = item.shop_comm.every(good => good.comm_isok == true);
                    })
                }
            }

        },
        computed: {
            //功能:一三级复选框的互相制约
            allcheck: {
                get() {
                    //三级复选框控制一级复选框
                    let arr = [];
                    this.goodlists.forEach(item => {
                        // console.log(item);
                        let res = item.shop_comm.every(good => good.comm_isok == true);

                        arr.push(res)
                    })
                    // console.log(arr.every(item => item == true));
                    return arr.every(item => item == true);
                    // return true
                },
                set(val) {
                    //一级复选框控制三级复选框
                    this.goodlists.forEach(item => {
                        let res = item.shop_comm.forEach(good => {
                            good.comm_isok = val;
                        })
                    })
                }
            }
        }


    })

})();