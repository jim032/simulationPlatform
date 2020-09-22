/*原理篇加密算法*/
import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	    menuText:'区块链密码学-对称密钥算法',
			step:0,
	  	operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	  	confirShow:false,//右侧弹出框是否显示
	  	pageName:6,//代表页面是加密算法页面
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示

	    fileFinsh:false,//用户A是否已经把文件传给b  
	    delayTimer:null,//延迟执行时间

	    consoleShow:true,//头部控制台是否显示
	    //字母置换表
	    letterTable:[{number:'铭文',letter:'密文'},{number:0,letter:'R'},{number:1,letter:'A'},{number:2,letter:'Y'},{number:3,letter:'E'},{number:4,letter:'O'},
	    {number:5,letter:'I'},{number:6,letter:'P'},{number:7,letter:'W'},{number:8,letter:'L'},{number:9,letter:'D'}],
	    encryptedContent:{text:'64730',result:'POWER'},//加密内容
	    
	    isPrompt:false,//弹出框是确认框还是操作提示框
	    
	    isEncryption:false,//是否加密 
	    isDecrypt:false,//是否解密
	    encryptionText:'',//输入的加密内容
	    decryptText:'',//输入的解密内容
	    promptText:'',
	    
	    isEncryptionSuc:false,//加密结果true代表加密成功
	    
	    isDecryptSuc:false,//表示解密是否成功
	    
	    isRight:false,//标书输入的内容是否正确
	    
	    singleStep:true,//单个步骤提示
	    
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.encrAlgorithm_stepTips
		}
	},
	methods:{
		
		//点击左边的三个工具箱
		poinfun(num){
			//num==1表示加密  num==2表示解密
			let that = this;
			if(num==1 && that.step==1){
				that.isEncryption = true
			}
			if(num==2 && that.step==2 ) {
				that.isEncryption = false
				that.isDecrypt = true;
			}
			
		},
		
	  //点击菜单图标
	  clickMenu(){
	 	  this.menuShow = !this.menuShow
	  },
	  
	  //点击弹出框我知道了方法
	  tipSure(){
	  	let that = this
	  	
	  	if(that.step!=3){
	  		that.step = that.step +1;
	  	}
	  	that.confirShow = false;
	  	
	  },
	  
	  //内容输入确定
	  sureContent(){
	  	let  that = this;
	  	that.isRight = false;
	  	//num==1表示加密内容确定，num==2表示解密内容确定
	  	if(that.step==1){
	  		if(that.encryptionText==''){
	  			that.isPrompt = true;
	  			that.promptText = '请输入加密内容'
	  			return;
	  		}
	  		if(that.encryptionText!=that.encryptedContent.result){
	  			that.isPrompt = true;
	  			that.promptText = '加密内容错误，请重新输入'
	  			return;
	  		}
	  		
	  		that.isPrompt = true;
	  		that.promptText = '加密内容正确'
	
	  		that.isRight = true;
	  	}
	  	
	  	
	  	if(that.step==2){
	  		if(that.isEncryptionSuc ==true){	
	  			that.isPrompt = true;
	  			that.promptText = '加密已结束，请点击右侧的解密按钮进行解密'
	  			that.isRight = false;
	  			return;
	  		}
	  	}
	  	
	  },
	  //解密内容输入确定
	  surefContent(){
	  	let that = this;
	    
	    console.log(that.step)
	  	if(that.step==2){
	  		if(that.decryptText==''){
	  			that.isPrompt = true;
	  			that.promptText = '请输入解密内容'
	  			return;
	  		}
	  		if(that.decryptText!=that.encryptedContent.text){
	  			that.isPrompt = true;
	  			that.promptText = '解密内容错误，请重新输入'
	  			return;
	  		}	  			  		
	  	
	  	  that.isPrompt = true;
	  		that.promptText = '解密内容正确'
	  		that.isRight = true;
	  	}
	  	if(that.step==3){
	  		if(that.isEncryptionSuc ==true){	
	  			that.isPrompt = false;
	  			that.promptText = ''
	  			that.isRight = false;
	  			that.confirShow = true
	  			return;
	  		}
	  	}
	  	
	  },
	  
	  //提示框点击确定
	  surePrompt(num){
	  	//num传1表示输入正确   //num传1表示输入错误
	  	let that = this;
	  	
	  	if(that.isRight==true){
		  	if(num==1 && that.step==1){
		  		that.isEncryptionSuc = true
		  		that.isPrompt = false;
		  			that.step = that.step+1
		  		return;
		  	}
		  	if(num==1 && that.step==2 ){
		  		that.isDecryptSuc = true
		  		that.isPrompt = false;
		  			that.step = that.step+1
		  		return;
		  	}
		  	 
	  	}
	 
	  	that.isPrompt = false;
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
