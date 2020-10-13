import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach';
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	
			step:1,
	  	operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	  	invisable:false,
	  	
	  	confirShow:false,//右侧弹出框是否显示
	  	pageName:4,//代表页面是哈希算法页面
	  	winNum:0,//节点模拟用到此参数这边不需要
	  	
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	    
	    progressMess:'哈希生成',
	    /*页面中间操作框信息*/
	    operaTips:{
	    	mess:'此处已有一串私钥与一串随机生成的随即盐，请在下方方框内随意输入一段密码：',
	    	info:['私钥：3215e12qwe5qwe5d1a2sd1f12dsg2dgs5fwe6r6we5r','随机盐：XXXXXXXXXXXXXXXXXXXX']
	    },
	    /*操作步骤*/
	   operaStep:['输入密码','哈希计算','对称加密','加密完成'],
	   ipassword:'',//当前用户输入的密码
	   
	   isShowProgress:false,
	   
	   stepFinsh:false,//步骤是否结束
	   
	   hashProgress:0,//hash计算的宽度
	   
	   consoleShow:true,//头部控制台是否显示
	   
	   menuText:'区块链密码学-keystore',
	   isPrompt:false,
	   promptText:'当前无工具可用！',
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
	  		this.$toast('请输入密码',3000)
	  	}else{
	  		this.step = that.step+1;
	  		that.operaTips.mess='我们通过随机生成的盐与步骤一输入的密码相结合，并通过哈希计算 生成一串密钥：'
	      that.operaTips.info =[];
	      that.operaTips.info.push('随机盐：XXXXXXXXXXXXXXXXXXXX')
	      that.operaTips.info.push('密码:'+that.ipassword)
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
       	  	 that.progressMess = r_num==1?'生成完毕！':'加密完毕！'
       	  }
       },50)
	  	}
	  },
	  //点击下一步
	  surePath(){
	  	let that = this;
	  	this.step = that.step+1;
	  	that.operaTips.mess='我们已通过步骤二的随机盐与密码，哈希计算之后得到了一串密钥， 我们将通过密钥把私钥进行加密处理：'
	    that.operaTips.info =[];
	    that.operaTips.info.push('密钥：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
	    that.operaTips.info.push('私钥：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
	    that.isShowProgress = true;
	    that.hashProgress = 0;
	    that.progressMess='密钥加密'
	  },
	  //最后点击下一步
	  surefinsh(){
	  	let that = this
	  	that.step = that.step+1;
	  	that.operaTips.mess='已使用步骤二获得的密钥通过对称加密将私钥进行了加密保护，生成的新字符串即为keystore：'
	    that.operaTips.info =[];
	    that.operaTips.info.push('keystore：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
	    that.operaTips.info.push('由此可知，keystore其实是利用对称加密对私钥进行加密保护的一种 形式，特点文本特点文本特点文本特点文本特点文本特点文本特点文 特点文本特点文本特点文本特点文本。')
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
		this.menuText = '区块链密码学-'+this.$route.params.name
		that.category_id = this.$route.params.id;
	  that.getvisit();
	}
}
