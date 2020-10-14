import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach'

export default{
	data(){
		return{
		  menuShow:false,//上方菜单按钮是否显示
		  showTool:false,//左侧工具箱是否显示
      confirShow:false,//右侧弹窗
	
		  menuText:'异常篇-合约漏洞',
      iconUrl_1:require('../assets/teachImg/icon_user1.png'),//头像
		  step:1,//当前步骤
		  pageName:56,//异常-合约漏洞
		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
      D1:false,//提现金额对话框
      inputMoney:0,
     
      isPrompt:false,
	    promptText:'当前无工具可用！',
	    singleStep:true,//单个步骤提示
	    
	    cashNumber:0,//0提现次数 第一次余额为0 0-1 =255

		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.a_smartLoophole
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
	  
	  
	   //当前无工具提示框
	  surePrompt(num){
	  	this.isPrompt = false;
	  },
	  //点击左侧工具箱
	  clickTool(){
	  	let that = this;
	  	that.menuShow = false;
	  
	  	that.isPrompt = true;
	  },
	  
	  //点击弹出框我知道了方法
	  tipSure(){
	  	let that = this
	  	that.confirShow = false;
	  	
	  },
    //点击左边的三个工具箱
    clickCash(){
      //num==1提现
      let that = this;     
      that.D1 = true
      
    },
    //提现金额提交完成
    D1clickfinish(){
      let that = this;
      that.D1 = false;
      that.step = 2;
      //that.confirShow = true
      
      if(that.cashNumber==0){
      	that.inputMoney = 256- 1;
      	that.timer = setTimeout(function(){
		      	that.confirShow = true
		    },800)
      }else{
      	that.inputMoney = that.inputMoney - 1;
      }
      that.cashNumber = that.cashNumber+1;

    }
	},
  mounted(){
	  let that = this
	  this.menuText = '异常篇-'+this.$route.params.name
 	  that.category_id = this.$route.params.id;
	  that.$nextTick(() => {
	    that.confirShow = true
	    that.getvisit();
	  })
	},
 beforeDestroy() {
	  if(this.timer) {
		　clearInterval(this.timer); //关闭
	  }
	  
   },
}
