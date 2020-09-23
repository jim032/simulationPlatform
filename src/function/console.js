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
				 
				  commandList:['tds height',
		        'tds miner start',
		        'tds miner stop',
		        "tds accounts",
		        "tds newAccounts('password')",
		        "tds getBalance('address')"
				 ]
				 
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
		  	if(that.command==''){
		  		return;
		  	}
		  	
		  	if(that.command!='tds accounts' || that.command!='tds miner start'){
		  			that.total.push('\''+that.command+'\'不是内部或外部命令，也不是可运行的程序');
		  	}
		  	
		  	//'ccd' 
		  	if(that.accountList.length==0){
		  	  if(that.command=='tds accounts'){
		  			that.total.push('请先生成账号');
		  			
		  		
		  		}
		  	  if(that.command=='tds height'){
		  			that.total.push('暂无区块');
		  			
		  		}
		  		
		  	}
		  	that.command = '';
		  
		  }
		  
		  
	  }
	}


