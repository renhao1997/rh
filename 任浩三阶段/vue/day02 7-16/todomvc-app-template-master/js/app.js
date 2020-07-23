(() => {
	/*
			todoMVC
				* 渲染任务列表  1
				* 输入内容回车提交任务1
				* 点击复选框：完成任务1
                * 复选框：全选全不选
				* 双击编辑任务项
				* 删除任务项
				* 统计未完成条数


				//未完成
				
				* 切换不同的状态：数据切换
				* 清除所有完成任务项
				* 数据的存储
		*/
	let taskList = [
		{
			id: 1,
			title: '消费者投诉平台',
			ischeck: true//false：未完成
		}, {
			id: 2,
			title: '121名美女主播被押解回青岛',
			ischeck: false //完成
		}, {
			id: 3,
			title: '消防栓故障多辆私家车排队洗车',
			ischeck: true
		}
	];

	let vm = new Vue({
		el: ".todoapp",

		data: {

			taskList: taskList,
			msg: "",
			dbindex: null
		},

		// 方法
		methods: {

			// 输入内容回车提交任务1
			add() {
				if (this.msg) {

					let obj = {
						id: this.taskList.length + 1,
						title: this.msg,
						ischeck: false
					};
					this.taskList.unshift(obj);
					this.msg = '';
				}

			},
			//双击编辑任务栏
			edit(index) {

				this.dbindex = index;

			},
			// 失去焦点或者按下回车时移除编辑框,如果该任务项内容已经为空，就删除该任务项
			keepBlur(index) {
				this.dbindex = null;
				if (!taskList[index].title) {
					this.taskList.splice(index, 1);
				}
			},
			//点击删除任务选项
			dels(index) {
				console.log(index);
				let istrue = confirm('您确定不要我了吗?');
				if (istrue) {
					this.taskList.splice(index, 1)
				}
			}


		},


		// 计算属性
		computed: {
			//功能：复选框：全选全不选
			allCheck: {
				get() {
					return this.taskList.every(item => item.ischeck == true);

				},
				set(val) {//获取allcheck的值
					// console.log(val);
					this.taskList.forEach(item => {
						item.ischeck = val;
					});
				}
			},
			// 计算未完成的条数
			total() {

				//过滤数组
				return this.taskList.filter(item => item.ischeck == false).length;

			},
		},
		//注册自定义指令
		directives: {
			'focus': {
				inserted(el) {
					el.focus();//底层的方法，没有兼容问题
				}
			}, 'focus2': {
				update(el) {
					el.focus();//底层的方法，没有兼容问题
				}
			}

		}


	})

})();