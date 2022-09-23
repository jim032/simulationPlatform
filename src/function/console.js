	import comHeader from '@/components-teach/sheader';
	export default{
		data(){
			return{
				 menuShow:false,//上方菜单按钮是否显示
				 menuText:'Console',
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
				 
				 delayTimer:null
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
		  getFocus(event){
		  	 var el = event.currentTarget;
		  	// event.stopPropagation()
		    el.focus()
		  },
		  autoFocus () {
	      $('#in').focus()
	    },
	   mouseLeave(){
	    	$('#in').focus()
	   },
		  enter () {
		  	let that = this;
		  	let command_type = 0
		  	if(that.command==''){
		  		return;
		  	}
		  	let command = that.command
		  	//console.log(that.command);
		  	if (command.indexOf('newAccounts') != -1) {
		  		let command_start = command.substring(0, 17)
		  		let command_end = command.substring(command.length-2, command.length)
		  		if (!(command_start == "tds newAccounts('" && command_end=="')")) {
		  			that.total.push(that.command);
		  			that.total.push('\''+that.command+'\'It is not an internal or external command, nor a runnable program');
		  		} else {
		  			command_type = 1
		  		}
		  	}
		  	else if (command.indexOf('getBalance') != -1) {
		  		let command_start = command.substring(0, 16)
		  		let command_end = command.substring(command.length-2, command.length)
		  		if (!(command_start == "tds getBalance('" && command_end=="')")) {
		  			that.total.push(that.command);
		  			that.total.push('\''+that.command+'\'It is not an internal or external command, nor a runnable program');
		  		} else {
		  			command_type = 2
		  		}
		  	}
		  	else if (that.commandList.indexOf(that.command) == -1) {
		  		that.total.push(that.command);
		  		that.total.push('\''+that.command+'\'It is not an internal or external command, nor a runnable program');
		  	}
		  	if(that.accountList.length==0){
		  	  if(that.command=='tds height'){
		  	  	that.total.push('tds height');
		  			that.total.push('No block');
		  		}
		  	  if(that.command=='tds miner start'){
		  	  	that.total.push('tds miner start');
		  			that.total.push('Please give me your address');
		  		}
		  	  if(that.command=='tds accounts'){
		  	  	that.total.push('tds accounts');
		  			that.total.push('No address');
		  		}
		  	  if(that.command=='tds miner stop'){
		  	  	that.total.push('tds miner stop');
		  			that.total.push('Please give me your address');
		  		}
		  	  if (command_type == 1) {
		  	  	let index = Math.floor(Math.random()*that.duserList.length)
		  	  	that.accountList.push(that.duserList[index])
		  	  	that.total.push(that.command);
		  	  	that.total.push('Address generation, address：'+that.duserList[index] +' default: miner');
		  	  	that.duserList.splice(index, 1)
		  	  	let password = command.substring(17, command.length-2)
		  	  	that.passwordList.push(password)
		  	  }
		  	  if (command_type == 2) {
		  	  	that.total.push(that.command);
		  	  	that.total.push('The address does not exist');
		  	  }
		  	} else {
		  		if (command_type == 1) {
		  			let password = command.substring(17, command.length-2)
		  			if (that.accountList.length == 10) {
		  				that.total.push(that.command);
		  				that.total.push('Generate up to 10 users');
		  			} else if (that.passwordList.indexOf(password) != -1) {
		  				that.total.push(that.command);
		  				that.total.push('The password has been used')
		  			} else {
		  				that.passwordList.push(password)
		  				let index = Math.floor(Math.random()*that.duserList.length)
			  	  	that.accountList.push(that.duserList[index])
			  	  	that.total.push('Address generation, address:'+that.duserList[index]);
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
		  	    
		  	    if(that.accountList.indexOf(command_str)!=-1){
		  	    	if(command_str != account){
		  	    		that.total.push(that.command);
	  							that.total.push('Address balance: 0');	  
	  						}
		  	    	else{
		  	    		that.total.push(that.command);
					  		that.total.push('Address balance:' + that.money);
					  	}
		  	    }else{
		  	    	that.total.push(that.command);
		  	    	that.total.push('The address does not exist');
		  	    }
	  				
		  		
		  		}
		  		if (that.command=='tds height') {
		  			
  					
	  				//最新的区块在后面显示
  					/*let index = blockList.length - 1
  					let obj = blockList[index]*/
  					let length = that.blockList.length;
  					if(length==0){
  						that.total.push('tds height')
  						that.total.push('No block');
  					}else{
  						//最新的区块在前面显示
  					   let obj = that.blockList[0];
  					   that.total.push('tds height');
  					   that.total.push('Block height:' + obj.value);
  					}
  					
		  		}
		  		if (that.command=='tds accounts') {
		  			that.total.push('tds accounts')
		  			for(let i=0; i< that.accountList.length; i++) {
		  				if(i==0){
		  					that.total.push(that.accountList[i]+'(Miner)');
		  				}else{
		  					that.total.push(that.accountList[i]);
		  				}
		  				
		  			}
		  		}
		  		if (that.command=='tds miner start') {
		  			
		  			//这个表示接着挖矿
		  			if(that.blockList.length>0){
		  				that.total.push('tds miner start');
			  			that.total.push('Start mining');
			  			let curLength = that.blockList.length;
			  			let temp = that.blockList[0].value;
			  			let tmpobj = {}
			  			tmpobj.name= 'block'+temp
			  			tmpobj.value= temp+1
			  			that.money = parseInt(that.money + 3)
			  			that.blockList.unshift(tmpobj)
			  			if (that.blockList.length == 8) {
		  					that.blockList.splice(7, 1)
		  				}
			  			
			  			that.timer = setInterval(() => {
			  				let obj = {}
			  				//最新的区块在前面显示
		  					let new_obj = that.blockList[0]
		  					obj.name = 'block' + parseInt(new_obj.value + 1)
		  					obj.value = parseInt(new_obj.value+ 1)

		  					that.blockList.unshift(obj)
		  					if(that.blockList.length > 7) {
		  						that.blockList.splice(7, that.blockList.length-7)
		  					}
			  				that.money = parseInt(that.money + 3)
							}, 5000)
			  		
		  			}else{
		  				that.total.push('tds miner start');
			  			that.total.push('Start mining');
			  			let obj = {}
			  			obj.name = 'block1'
	  					obj.value = 1
	  					that.blockList.push(obj)
	  					that.money = parseInt(that.money + 3)
			  			that.timer = setInterval(() => {
			  				let obj = {}
			  				//最新的区块在前面显示
		  					let new_obj = that.blockList[0]
		  					obj.name = 'block' + parseInt(new_obj.value + 1)
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
		  			
		  		}
		  		if (that.command=='tds miner stop') {
		  			that.total.push('tds miner stop');
		  			clearInterval(that.timer);
		  			that.total.push('Close mining');
		  		}
		  		
		  	}
		  	that.command = '';
		  	
		  	var div = this.$refs.commmain;
				that.delayTimer=setTimeout(()=>{   
		       div.scrollTop = div.scrollHeight;
		    },0)
		  	
		  }
		  
		  
 
	  },

	beforeDestroy() {
	    if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
	        clearInterval(this.timer); //关闭
	    }
	}
	  
	}
	


