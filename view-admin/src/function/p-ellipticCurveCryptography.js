import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	
			step:0,
	  	operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	  	invisable:false,

	  	
	  	confirShow:false,//右侧弹出框是否显示
	  	pageName:5,//代表页面是哈希算法页面
	  	winNum:0,//节点模拟用到此参数这边不需要
	  	
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	    
	    showConfirm:0, //弹出框弹出的次数
	    iconUrl:require('../assets/teachImg/icon_user.png'),//头像 
	    fileFinsh:false,//用户A是否已经把文件传给b  
	    delayTimer:null,//延迟执行时间

	    
	    line1Show:false,//文件传送显示
	    line2Show:false,//攻击线是否显示
	    
	    consoleShow:true,//头部控制台是否显示
	    
	    lineDrawShow:false,//方程图片是否展示
	    
	    isFail:false,//解析失败文字是否显示
	    wprogress:0,//解析进度
	    isParse:false,//是否解析
	    
	    userA:{
	    	userName:'用户A',
	    	publicKey:'ldkewjrewf231fwe5r413ew2132fd1s32fsf2d1f5ew2',
	      privateKey:'fkjekjf13er21t5re1d32a1weq3wr14581gfs3d21fs32'
	    },
	    userB:{
	    	userName:'用户B',
	    	publicKey:'ldkewjrewf231fwe5r413ew2132fd1s32fsf2d1f5ew2',
	      
	    },
	    userC:{
	    	userName:'用户C',
	    	publicKey:'ldkewjrewf231fwe5r413ew2132fd1s32fsf2d1f5ew2',
	     
	    },
	    menuText:'区块链密码学-椭圆线密码算法',
	    singleStep:true
		}
		
		
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.ecc__stepTips
		}
	},
	methods:{
		
		//点击左边的三个工具箱
		poinfun(num){
			//num==1表示生成,2表示发送，3表示校验
			
			let that = this;
			if(num==1 && that.step==1 ){
				that.lineDrawShow = true
				that.funNum = num;
			}
			if(num==2 && that.step==2) {
				that.isParse = true
				that.funNum = num;
				let timer = setInterval(function() {
					that.wprogress++;
					
					that.line1Show = true;
					that.line2Show = true;
					that.delayTimer = setTimeout(function(){
						that.fileFinsh = true;
					},1500)
					
					if(that.wprogress == 70){
						that.operaInfo.mess = '用户B已通过椭圆线密码生成公钥以及私钥';
						that.operaInfo.infolist.push('公钥：'+that.userA.publicKey);
				    that.operaInfo.infolist.push('私钥：'+that.userA.privateKey);
				    that.operaInfo.infolist.push('并且A用户与C用户已收到B用户公布出来的公钥。')
				    
					}
					if(that.wprogress == 100) {
						clearInterval(timer)
						that.isFail= true;
			   	}
				},50)	
			}
			if(num==3 && that.step==3){
				that.funNum = num;
				let timer = setInterval(function() {
				 that.isParse = true
				 that.wprogress++;
					if(that.wprogress == 100) {
						clearInterval(timer)
						that.operaInfo.infolist=[];
					  that.operaInfo.mess = 'B用户已成功收到从A用户发送的文件，中途C用户试图通过B用户的公钥来解析文件但失败。';
			   	}
				},50)
			}
		},
		
	  //点击菜单图标
	  clickMenu(){
	 	  this.menuShow = !this.menuShow
	  },
	  
	  //点击弹出框我知道了方法
	  tipSure(){
	  	let that = this
	  	that.confirShow = false;
	  	if(that.step==0){
	  		that.step = that.step + 1;
	  	}
	  },
	  
	  //椭圆线a,b值输入点击确定
	  sureLine(){
	  	this.lineDrawShow = false;
	  },
	  //椭圆线计算新的点点击确定
	  surePoint(){
	  	let that = this;
	  	that.step = that.step + 1;
	   
	  },
	  
	  //解析完成
	  sureParse(){
	  	let that = this
	  	that.step = that.step + 1;
	  	that.isParse = false;
	  	that.wprogress = 0;
	  	if(that.step==4){
	  		
	  		that.delayTimer = setTimeout(function(){
						that.confirShow = true
				},1000)
	  		
	  	}
	  },
	  //点击用户展示用户信息
	  showUserInfo(obj,num){
	  	let that = this;
	  	if(that.step < 3){
	  		return;
	  	}
	  	if(num==1){
	  		that.operaInfo.infolist=[];
				that.operaInfo.mess = '用户'+obj.userName;
				that.operaInfo.infolist.push('公钥'+obj.publicKey);
				that.operaInfo.infolist.push('私钥'+obj.privateKey)
	  	}else{
	  		that.operaInfo.infolist=[];
	  		that.operaInfo.mess = '用户'+obj.userName;
				that.operaInfo.infolist.push('公钥'+obj.publicKey);
	  	}
	  	
	  }
	  
	},
	mounted(){
		let that = this
		that.$nextTick(() => {
		   that.confirShow = true
		  
		})
	},
	//离开页面清除定时器
   beforeDestroy() {
	   if(this.delayTimer) {　　
				clearTimeout(this.delayTimer); //关闭
			}
   },
}
