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
		  funNum:0,//左侧点击判断工具箱
		  menuText:'异常篇-重放攻击',
		  category_id:'',//课程id
      iconUrl_1:require('../assets/teachImg/block_a.png'),//
		  step:1,//当前步骤
		  pageName:53,//异常篇重放攻击
		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
      D2:false,//D框

      wprogress:0, //打包的进度
      delayTimer:null,//延迟执行时间
      lineDraw53Show: false,
      
      singleStep:true,//单个步骤提示
      
      userList:[
        {name:'用户A',userId:'A',icon:require('../assets/teachImg/icon_user2.png'),balance:0,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user2_warning.png')},
        {name:'用户B',userId:'B',icon:require('../assets/teachImg/icon_user3.png'),balance:0,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user3_warning.png')},
        {name:'黑客',userId:'3',icon:require('../assets/teachImg/icon_user4_warning.png'),balance:0,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user4_warning.png')}
      ],
      transNumber:0,//转账次数
      tansferInfo:[],//转账区块
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.a_replayAttack
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
	  	that.confirShow = false;
	  	/*
	  	if(that.step==1){
	  		that.step = that.step + 1;
	  	}
      if(that.step==5){
        that.step = that.step + 1;
        that.delayTimer = setTimeout(function(){
          that.confirShow = true
        },1000)
      }
      */
	  	
	  },
    //点击左边的三个工具箱
    poinfun(num){
      //num==2测速
      let that = this;
      if(num==1){
      	if(that.transNumber>=3){
      		return that.$toast('转账最多可达3笔',3000)
      	}      	
    		that.funNum = num;
        that.D2=true; 
      }
      
      if(num==2 ){
      	if(that.transNumber<3){
      		return that.$toast('转账次数必须达到3笔',3000)
      	}  	
        that.funNum = num;
        that.lineDraw53Show = true;
        
        let timer = setInterval(function() {
          that.wprogress++;
          if(that.wprogress == 100) {
            clearInterval(timer)
            that.delayTimer = setTimeout(function(){
             that.lineDraw53Show = false;
            },200)
            that.delayTimer = setTimeout(function(){
              that.confirShow = true;
              that.step= that.step+1;
            },800)
          }
        },50)
      }
      if(num==3&&that.step==3){
      	that.funNum = num;
        that.lineDraw53Show = true;
        that.wprogress = 0
        let timer = setInterval(function() {
          that.wprogress++;
          if(that.wprogress == 100) {
            clearInterval(timer)
            that.delayTimer = setTimeout(function(){
             that.lineDraw53Show = false;
            },200)
            that.delayTimer = setTimeout(function(){
              that.confirShow = true;
              that.step= that.step+1;
            },800)
          }
        },50)
      }

    },
    //透明区域隐藏
    hideTrans(){
    	this.D2=false
    },
    
    
    gotoStep(num){
      let that = this;
      that.step = that.step + 1;
      that.confirShow = true
    },
    
    //确定转账
    D2clickfinish(amount){
      let that = this;
      that.userList[1].balance = that.userList[1].balance + amount;      
      that.tansferInfo.push({
        initiate: 'A',
        object: 'B',
        amount: amount
      })
      that.transNumber = that.transNumber + 1;
      that.D2=false
      that.operaInfo.mess='';
      if(that.transNumber==3){
      	that.delayTimer = setTimeout(function(){
	      	that.confirShow = true; 
	      	that.step = that.step+1;
	      },600)
      }
      

    }
	},
  mounted(){
  let that = this
  this.menuText = '异常篇-'+this.$route.params.name
 	that.category_id = this.$route.params.id;
  that.$nextTick(() => {
    that.confirShow = true;
    that.getvisit();
  })
}
}
