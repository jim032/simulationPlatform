	import comHeader from '@/components-teach/sheader';
	export default{
		data(){
			return{
				 menuShow:false,//上方菜单按钮是否显示
				 menuText:'控制台',
				 courseId:0,
				 total:[] ,//命令结果
				 
				 command:'',//当前输入的命令
				 //默认地址列表
				 duserList:[
				   'd8083a108fda57c680e7c7e32c6d3108c3e45e7b',
				   'b4b3af005fdc46a0cb43ca507d22e3ee8abd5f05',
				   'b7063335a93597dc5f3b65264850b1bbcc4bd54e',
				   '10e55d243203f1d595e022621294565f5682a312',
				   '9ffd8f2157d92cdccba0b1afd1c234fe2c28621a',
				   '566f43f37d68e60d760d1bf9fe9c24ac7ab457af',
				   'a0b1f51318a32df937316f37e0c3318a96c2d6b4',
				   '98f1b86bb8e3b66d7580a3ecdad7760712084ecf',
				   '9be8bf15c34addb4dc3b15c5a71539034b782f9e',
				   '41260bc30deec90494324b29d8774e98772aba32'
				  ],
				  //通过账户获取的列表
				  accountList:[],
				 	money: 0,
				 	blockList:[],
				  commandList:['tds height',
		        'tds miner start',
		        'tds miner stop',
		        "tds accounts",
		        //"tds newAccounts('password')",
		        //"tds getBalance('address')"
				 ],
				 timer: '',
				 passwordList: [],
			}
		},
		components:{
		   comHeader
	  },
	 directives: {
		 focus: {
		// 指令的定义
				inserted: function (el) {
				el.focus()
				}
		 }
		},
	  methods:{
	  	//点击菜单图标
		  clickMenu(){
		 	  this.menuShow = !this.menuShow
		  },
		  autoFocus () {
	      $('#in').focus()
	   },
	   
		  enter () {
		  	let that = this;
		  	let command_type = 0
		  	if(that.command==''){
		  		return;
		  	}
		  	let command = that.command
		  	if (command.indexOf('newAccounts') != -1) {
		  		let command_start = command.substring(0, 17)
		  		let command_end = command.substring(command.length-2, command.length)
		  		if (!(command_start == "tds newAccounts('" && command_end=="')")) {
		  			that.total.push('\''+that.command+'\'不是内部或外部命令，也不是可运行的程序');
		  		} else {
		  			command_type = 1
		  		}
		  	}
		  	else if (command.indexOf('getBalance') != -1) {
		  		let command_start = command.substring(0, 16)
		  		let command_end = command.substring(command.length-2, command.length)
		  		if (!(command_start == "tds getBalance('" && command_end=="')")) {
		  			that.total.push('\''+that.command+'\'不是内部或外部命令，也不是可运行的程序');
		  		} else {
		  			command_type = 2
		  		}
		  	}
		  	else if (that.commandList.indexOf(that.command) == -1) {
		  		that.total.push('\''+that.command+'\'不是内部或外部命令，也不是可运行的程序');
		  	}
		  	if(that.accountList.length==0){
		  	  if(that.command=='tds height'){
		  			that.total.push('暂无区块');
		  		}
		  	  if(that.command=='tds miner start'){
		  			that.total.push('请先生成账号');
		  		}
		  	  if(that.command=='tds accounts'){
		  			that.total.push('暂无账号');
		  		}
		  	  if(that.command=='tds miner stop'){
		  			that.total.push('请先生成账号');
		  		}
		  	  if (command_type == 1) {
		  	  	let index = Math.floor(Math.random()*that.duserList.length)
		  	  	that.accountList.push(that.duserList[index])
		  	  	that.total.push('账号生成，账号为：'+that.duserList[index] +' 默认为:矿工');
		  	  	that.duserList.splice(index, 1)
		  	  	let password = command.substring(17, command.length-2)
		  	  	that.passwordList.push(password)
		  	  }
		  	  if (command_type == 2) {
		  	  	that.total.push('账号不存在');
		  	  }
		  	} else {
		  		if (command_type == 1) {
		  			let password = command.substring(17, command.length-2)
		  			if (that.accountList.length == 10) {
		  				that.total.push('最多生成10个用户');
		  			} else if (that.passwordList.indexOf(password) != -1) {
		  				that.total.push('该密码已被使用')
		  			} else {
		  				that.passwordList.push(password)
		  				let index = Math.floor(Math.random()*that.duserList.length)
			  	  	that.accountList.push(that.duserList[index])
			  	  	that.total.push('账号生成，账号为：'+that.duserList[index]);
			  	  	that.duserList.splice(index, 1)
		  			}
		  	  }
		  		if (command_type == 2) {//查询余额
		  			let account = that.accountList[0]
		  			//console.log(command)
		  			//console.log(account)
		  			//console.log(account.length)
		  			let command_str = command.substring(16, command.length-2)
		  			//console.log(command_str)
		  			if (command_str != account) {
		  				that.total.push('账号不存在');
		  			} else {
		  				that.total.push('账号余额：' + that.money);
		  			}
		  		}
		  		if (that.command=='tds height') {
		  			//最新的区块在前面显示
  					let obj = that.blockList[0]
  					
	  				//最新的区块在后面显示
  					/*let index = blockList.length - 1
  					let obj = blockList[index]*/
  					
  					that.total.push('区块高度:' + obj.value);
		  		}
		  		if (that.command=='tds accounts') {
		  			for(let i=0; i< that.accountList.length; i++) {
		  				if(i==0){
		  					that.total.push(that.accountList[i]+'(矿工)');
		  				}else{
		  					that.total.push(that.accountList[i]);
		  				}
		  				
		  			}
		  		}
		  		if (that.command=='tds miner start') {
		  			that.total.push('开启挖矿');
		  			let obj = {}
		  			obj.name = '区块1'
  					obj.value = 1
  					that.blockList.push(obj)
  					that.money = parseInt(that.money + 3)
		  			that.timer = setInterval(() => {
		  				let obj = {}
		  				//最新的区块在前面显示
	  					let new_obj = that.blockList[0]
	  					obj.name = '区块' + parseInt(new_obj.value + 1)
	  					obj.value = parseInt(new_obj.value+ 1)
	  					that.blockList.unshift(obj)
	  					if (that.blockList.length == 8) {
	  						that.blockList.splice(7, 1)
	  					}
	  					//最新的区块在后面显示
	  					/*let index = blockList.length - 1
	  					let new_obj = blockList[index]
	  					obj.name = '区块' + parseInt(new_obj.id + 1)
	  					obj.value = parseInt(new_obj.id + 1)
							if (that.blockList.length == 8) {
	  						that.blockList.splice(0, 1)
	  					}*/
		  				that.money = parseInt(that.money + 3)
						}, 5000)
		  		}
		  		if (that.command=='tds miner stop') {
		  			clearInterval(that.timer);
		  			that.total.push('关闭挖矿');
		  		}
		  		
		  	}
		  	that.command = '';
		  }
		  
		  
	  }
	}


