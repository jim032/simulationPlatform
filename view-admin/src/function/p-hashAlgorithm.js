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
	  	pageName:3,//代表页面是哈希算法页面
	  	winNum:0,//节点模拟用到此参数这边不需要
	  	
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	    
	    showConfirm:0, //弹出框弹出的次数
	    iconUrl:require('../assets/teachImg/icon_user.png'),//头像 
	    fileFinsh:false,//用户A是否已经把文件传给b  
	    delayTimer:null,//延迟执行时间
	    
	    isAttack:0,//文件是否攻击0表示未选择，1攻击，2为不攻击
	    isShowAttack:false,//选择弹出框是否显示
	    
	    line1Show:false,//文件传送显示
	    line2Show:false,//攻击线是否显示
	    
	    consoleShow:true,//头部控制台是否显示
	    
	    menuText:'区块链密码学-哈希算法',
	    singleStep:true,//单个步骤提示
	    
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.hash_stepTips
		}
	},
	methods:{
		
		//点击左边的三个工具箱
		poinfun(num){
			//num==1表示生成hash,2表示发送，3表示校验
			let that = this;
			if(num==1 && that.step==1 && that.blockPro==0){
				that.funNum = num;
				that.isBlcok = true;
				that.operaInfo.mess = ''
				that.operaInfo.infolist = [];
				let timer = setInterval(function() {
					that.blockPro++;
					if(that.blockPro == 100) {
						clearInterval(timer)
						that.operaInfo.mess = 'hash值已生成';
						that.operaInfo.infolist.push('当前hash值：e5q4wq5e32d1as321c65sad465w4eq56weq56d6asda');
						that.isBlcok = false;
						that.delayTimer = setTimeout(function(){
							that.confirShow = true;
						},500)
						
			   	}
				},50)		
			}
			if(num==2 && that.step==2 && that.isAttack==0) {
				that.isShowAttack = true;
				that.funNum = num;
			}
			if(num==3 && that.step==3 && that.blockPro==0){
				that.funNum = num;
				that.isBlcok = true;
				that.operaInfo.mess = ''
				that.operaInfo.infolist = [];
				let timer = setInterval(function() {
					that.blockPro++;
					if(that.blockPro == 100) {
						clearInterval(timer)
						if(that.isAttack==1){
							that.operaInfo.mess = '由A输送到B的“文件A”已被篡改变为“文件B”，hash值已由：';
						  that.operaInfo.infolist.push('e5q4wq5e32d1as321c65sad465w4eq56weq56d6asda变为f5q4wq9e32d1as821c65sad465w4eq56weq56d6asda');
						  
						}else{
							that.operaInfo.mess = '此处文本提示由A输送过来的“文件A”未受到篡改';
						  that.operaInfo.infolist.push('hash值为： e5q4wq5e32d1as321c65sad465w4eq56weq56d6asda');
						}
						
						that.isBlcok = false;
						that.delayTimer = setTimeout(function(){
							that.confirShow = true;
						},500)
						
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
	  	
	
	  	that.step = that.step +1;
	 
	  	that.confirShow = false;
	  	
	  },
	  //选择的攻击方式
	  attackMode(num){
	  	let that = this
	  	that.isAttack = num;
	  	that.blockPro = 0;
	  	//num为1攻击，num为2不攻击
	  	if(num==2){
	  		that.line1Show = true
				that.delayTimer = setTimeout(function(){
				   that.operaInfo.mess = 'A成功将“文件A”输送给了B，中途没有受到攻击篡改。'
				   that.operaInfo.infolist = [];
				   that.confirShow = true
				   that.fileFinsh = true;
				},1500)
				that.delayTimer = setTimeout(function(){
					that.confirShow = true
				},2000)
	  
	  	}else{
	  		that.line1Show = true
	  		that.line2Show = true
	  		that.delayTimer = setTimeout(function(){
					that.fileFinsh = true;
					that.operaInfo.mess = 'A在给B传输“文件”时遭到了C的攻击，文件已被篡改'
				  that.operaInfo.infolist = [];
				  
				},2000)
	  		that.delayTimer = setTimeout(function(){
	  	  	that.confirShow = true
	  		},2500)
	  	}

	  	that.isShowAttack = false
	  	//that.step = that.step +1;
	  
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
