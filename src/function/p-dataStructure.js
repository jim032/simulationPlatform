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
	    

	   isShowProgress:false,
	   
	   stepFinsh:false,//步骤是否结束
	   
	   hashProgress:0,//hash计算的宽度
	   
	   consoleShow:true,//头部控制台是否显示
	   
	   menuText:'Principles - Principles of data structure',
	   isPrompt:false,
	   promptText:'No tools available at present!',
	   
	   showContent:false,
	   category_id:''
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.data_stepTips
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
	 
	  //点击区块
	  showBlock(){
	  	let that = this
	  	that.showContent = true
	  },
	  
	 
	 
	  //提示框确定
	  surePrompt(num){
	  	this.isPrompt = false;
	  },
	  //点击左侧工具箱
	  clickTool(){
	  	let that = this;
	  	that.menuShow = false;
	  
	  	that.isPrompt = true;
	  },
	},
	mounted(){
		let that = this;
		that.menuText = 'Blockchain cryptography-'+this.$route.params.name
		that.category_id = this.$route.params.id;
	  that.getvisit();
	}
}
