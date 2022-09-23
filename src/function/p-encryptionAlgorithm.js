/*原理篇加密算法*/
import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach';
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	    menuText:'Block chain cryptography symmetric key algorithm',
			step:0,
	  	operaInfo:{mess:'No status, please follow the steps on the right.',infolist:[]},//底部传递的信息
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
	    letterTable:[{number:'inscription',letter:'ciphertext'},{number:0,letter:'R'},{number:1,letter:'A'},{number:2,letter:'Y'},{number:3,letter:'E'},{number:4,letter:'O'},
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
	    
	    category_id:''
	    
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
		//知识点访问
	  getvisit(){  
		  let that = this
		  let obj = {}
		  obj.user_id = sessionStorage.getItem('stu_userId');
		  obj.category_id = that.category_id
		  visitCourse(obj).then(res=>{
        if(res.code==200){   
        }else{
        	 that.$toast(res.message,3000)
        }
      })
    },
		//点击左边的三个工具箱
		poinfun(num){
			//num==1表示加密  num==2表示解密
			let that = this;
			if(num==1 && that.step==1){
				that.isEncryption = true
				that.funNum = 1
			}
			if(num==2 ) {
				
				if(!that.isEncryptionSuc){
					return this.$toast('Please encrypt first',2000)
				}else{				
					that.isEncryption = false
					that.isDecrypt = true;
					that.funNum = 2
				}
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
	  	
	  	if(that.step==1){
	  		if(that.encryptionText==''){
	  			that.isPrompt = true;
	  			that.promptText = 'Please enter the encrypted content'
	  			return;
	  		}
	  		if(that.encryptionText!=that.encryptedContent.result){
	  			that.isPrompt = true;
	  			that.promptText = 'Encrypted content error, please re-enter'
	  			return;
	  		}
	  		
	  		that.isPrompt = true;
	  		that.promptText = 'The encrypted content is correct'
	  	
	  		that.isRight = true;
	  	}
	  	
	  	
	  	if(that.step==2){
	  		if(that.isEncryptionSuc ==true){	
	  			that.isPrompt = true;
	  			that.promptText = 'Encryption is over, please click the decryption button on the right to decrypt'
	  			that.isRight = false;
	  			
	  			return;
	  		}
	  	}
	  	
	  },
	  //解密内容输入确定
	  surefContent(){
	  	let that = this;
	 
	  	if(that.step==2){
	  		if(that.decryptText==''){
	  			that.isPrompt = true;
	  			that.promptText = 'Please input the decryption content'
	  			return;
	  		}
	  		if(that.decryptText!=that.encryptedContent.text){
	  			that.isPrompt = true;
	  			that.promptText = 'Decryption content error, please re-enter';
	  			that.isRight = false;
	  			return;
	  		}	  			  		
	  	  
	
	  	  that.isPrompt = true;
	  		that.promptText = 'The decryption content is correct'
	  		that.isRight = true;
	  		//that.decryptText1 = that.decryptText
	  		//that.isDecryptSuc = true
	  	}
	  	if(that.step==3){
	  		if(that.isEncryptionSuc){	
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
		this.menuText = 'Blockchain cryptography-'+this.$route.params.name
		that.category_id = this.$route.params.id;
	  that.getvisit();
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
