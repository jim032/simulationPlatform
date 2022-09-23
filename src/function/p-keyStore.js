import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach';
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	
			step:1,
	  	operaInfo:{mess:'No status, please follow the steps on the right.',infolist:[]},//底部传递的信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	  	invisable:false,
	  	
	  	confirShow:false,//右侧弹出框是否显示
	  	pageName:4,//代表页面是哈希算法页面
	  	winNum:0,//节点模拟用到此参数这边不需要
	  	
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	    
	    progressMess:'Hash generation',
	    /*页面中间操作框信息*/
	    operaTips:{
	    	mess:'There is a string of private key and a string of randomly generated random salt here. Please enter a password in the box below:',
	    	info:['Private key：3215e12qwe5qwe5d1a2sd1f12dsg2dgs5fwe6r6we5r','Random salt:3f78d45833f293f7622876f121e90ab24be0043fef6475047']
	    },
	    /*操作步骤*/
	   operaStep:['Input password','Hash computation','Symmetric encryption','Encryption complete'],
	   ipassword:'',//当前用户输入的密码
	   
	   isShowProgress:false,
	   
	   stepFinsh:false,//步骤是否结束
	   
	   hashProgress:0,//hash计算的宽度
	   
	   consoleShow:true,//头部控制台是否显示
	   
	   menuText:'Blockchain cryptography keystore',
	   isPrompt:false,
	   promptText:'No tools available at present!',
	   singleStep:true,//单个步骤提示
	   category_id:''
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.keyStore_stepTips
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
		//点击菜单图标
	  clickMenu(){
	 	  this.menuShow = !this.menuShow
	  },
	   //点击弹出框我知道了方法
	  tipSure(){
	  	let that = this
	  	//that.step = that.step +1;
	  	that.confirShow = false; 	
	  },
	  //密码输入确认
	  surePasword(){
	  	let that = this
	  	if(that.ipassword==''){
	  		this.$toast('Please enter password',3000)
	  	}else{
	  		this.step = that.step+1;
	  		that.operaTips.mess='We combine the randomly generated salt with the password input in step 1, and generate a string of keys through hash calculation:'
	      that.operaTips.info =[];
	      that.operaTips.info.push('Random salt：3f78d45833f293f7622876f121e90ab24be0043fef6475047')
	      that.operaTips.info.push('Password:'+that.ipassword)
	      that.isShowProgress = true;
	  	}
	  },
	  //点击hash计算
	  sureHash(num){
	  	let that = this
	  	let r_num = num;
	  	if(that.hashProgress==0){
	  	 let timer = setInterval(function(){
       	  that.hashProgress++;
       	  if(that.hashProgress==100){
       	  	 clearInterval(timer)
       	  	 that.progressMess = r_num==1?'Finished!':'Encryption complete!'
       	  }
       },50)
	  	}
	  },
	  //点击下一步
	  surePath(){
	  	let that = this;
	  	this.step = that.step+1;
	  	that.operaTips.mess='We have obtained a series of keys after hashing the random salt and password in step 2. We will encrypt the private key through the key:'
	    that.operaTips.info =[];
	    that.operaTips.info.push('Key：7eecd8beca1f6528c48efc8b7e5396b1132af8409a0f')
	    that.operaTips.info.push('Private key：3215e12qwe5qwe5d1a2sd1f12dsg2dgs5fwe6r6we5r')
	    that.isShowProgress = true;
	    that.hashProgress = 0;
	    that.progressMess='Key encryption'
	  },
	  //最后点击下一步
	  surefinsh(){
	  	let that = this
	  	that.step = that.step+1;
	  	that.operaTips.mess='The key obtained in step 2 has been used to encrypt and protect the private key through symmetric encryption, and the generated new string is keystore'
	    that.operaTips.info =[];
	    
	    that.operaTips.info.push('Therefore, keystore is actually a form of using symmetric encryption to protect the private key')
	    that.isShowProgress = false;
	  },
	  //点击我知道了页面弹窗
	  sureResult(){
	  	let that = this;
	  	if(that.stepFinsh==false){
	   	  that.confirShow = true
	   	  that.stepFinsh = true
	    }
	  },
	  //点击左侧工具箱
	  clickTool(){
	  	let that = this;
	  	that.menuShow = false;
	  
	  	that.isPrompt = true;
	  },
	  //提示框确定
	  surePrompt(num){
	  	this.isPrompt = false;
	  }
	},
	mounted(){
		let that = this;
		this.menuText = 'Blockchain cryptography-'+this.$route.params.name
		that.category_id = this.$route.params.id;
	  that.getvisit();
	}
}
