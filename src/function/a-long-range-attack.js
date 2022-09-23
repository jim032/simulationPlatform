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
		  menuText:'Long range attack',
		   category_id:'',//课程id
      iconUrl_1:require('../assets/teachImg/icon_user1.png'),//头像
		  step:1,//当前步骤
		  pageName:55,//异常-长程攻击
		  operaInfo:{mess:'No status, please follow the steps on the right.',infolist:[]},//底部传递的信息
      D1:false,//提现金额对话框
      inputMoney:0,
      singleStep:true,//单个步骤提示
      
      AchainList:[{name:'Genesis block',height:1}],//A链
      attackList:[],//B链
      chainNuber:0,//A链
      mergedChainList:[],//合并链
      
      curheight:0,
      spaceTimer:null, //A链定时器
      spaceTimer1:null,//A链被攻击之后的定时器
      
      attackTimer:null,//B链定时器
      attackNumber:0,
      
      attack_Number:0,//攻击的初始增长
      delaytimer:null,//延迟时间
      
      isAttacked:false,
      isCovered:false,
      
      click_attackNumber:0,//点击攻击的位置
      cz_type: 5,
     
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.a_longRangAttack
		}
	},
	methods:{
		
		//页面刚进来点击我知道了区块产生
		getBlockList(type){
			let that = this;
			that.spaceTimer=setInterval(function(){
				that.curheight++;
				that.chainNuber++;
				that.AchainList.push({height:that.curheight,name:'block'})
			//	console.log('定时器主体')
				if(that.curheight==2 && !that.isAttacked){
					clearInterval(that.spaceTimer);
					that.step=2;
					//console.log('清除1');
					if(!that.isAttacked){
					   that.confirShow = true
					}
				}
				if(that.curheight==6){
					clearInterval(that.spaceTimer);
					//console.log('清除2');
				}
			},10000)
	
		},

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
	  	
	  	
	  	if(that.step==1){
	  		if(that.isAttacked || that.curheight==0){  			
	  			that.getBlockList()
	  		}		
	  	}
	  	if(that.step==4){
	  		that.step= that.step+1
	  		that.mergedChainList = that.attackList;
	  		if(that.click_attackNumber==1){
	  			that.mergedChainList.unshift({name:'Genesis block',height:0}) 
	  		}else{
	  			
	  			that.mergedChainList.unshift({name:'block1',height:1})
          that.mergedChainList.unshift({name:'Genesis block',height:0}) 
	  		}

       if(that.mergedChainList.length==7){
       	  that.delaytimer =setTimeout(function(){
       	  	that.confirShow=true
       	  },2000)
      		
      	}
	  	}
	  	

	  },
    //点击左边的三个工具箱
    poinfun(num){
   
      let that = this;
      that.funNum = num;
      
      /*攻击*/
      if(num==1){
      	//that.spaceTimer=null;
      	if(that.AchainList.length<2){
      		return that.$toast("Genesis block is not attachable",2000)
      	}
      	if(that.isAttacked){
      		return that.$toast("Attacked",2000)
      	}
      	if(that.isCovered){
      	 	return that.$toast("Long range attack simulation ended",2000)
      	 }
      	that.step=3;
      	clearInterval(that.spaceTimer);
      	that.isAttacked=true
      	that.getBlockList();
      	
      	let attHeight =that.curheight	
      	that.attackNumber = that.chainNuber
      	that.click_attackNumber = that.chainNuber
      	that.attackList.push({name:'block'+that.attackNumber,height:attHeight})
      	that.attackTimer=setInterval(function(){
      		that.attack_Number++;     	
      		if(that.click_attackNumber==1){
      			if(that.attack_Number==5){
      				clearInterval(that.attackTimer)
      				if(that.isCovered){
      			   	that.confirShow=true;
      				}
      			}
      		}else{
	      		if(that.attack_Number==4){
      				clearInterval(that.attackTimer)
      				//that.confirShow=true
      			}
	      		
      		}
					that.attackList.push({name:'block'+parseInt(that.attackNumber+that.attack_Number),height:attHeight+1})	
			 },8000)
      	
      }
      /*覆盖*/
      if(num==2){
      	 if(!that.isAttacked){
      	 	return that.$toast("Please click attack first",2000)
      	 }
      	 if(that.isCovered){
      	 	return that.$toast("Long range attack simulation ended",2000)
      	 }else{
      	 	 that.step=4
      	 	 
      	 	 console.log( that.step=4);
      	 	 if(that.click_attackNumber==1 && that.attack_Number!=6){
      	 	 	
      	 	 	 that.confirShow=true
      	 	 }
      	 	 if(that.click_attackNumber==2 && that.attack_Number!=5){
      	 	 	 that.confirShow=true
      	 	 }
          
      	 	 that.isCovered=true;
      	 	 //that.cz_type = 6//针对覆盖的情况设置判断长度为6 (165行代码判断处)
      	 	 if(that.mergedChainList.length==7){
      	 	 		clearInterval(that.attackTimer)
      	 	 		that.confirShow=true
      		
	      	 }
      	 	 	 
      	 }
      }
      
      
    },
    //提现金额提交完成
    D1clickfinish(){
      let that = this;
      that.D1 = false;
      that.step = that.step + 1;
      that.confirShow = true
      that.inputMoney = 255;
    }
	},
  mounted(){
	  let that = this
	  this.menuText = 'Abnormal-'+this.$route.params.name
	 	that.category_id = this.$route.params.id;
	  that.$nextTick(() => {
	    that.confirShow = true;
	    that.getvisit();
	  
	  })
  },
  beforeDestroy() {    //页面关闭时清除定时器  
	  clearInterval(this.attackTimer);
	  clearInterval(this.spaceTimer);
	  if(this.delaytimer){
	  	clearTimeout(this.delaytimer)
	  }
	},
	  
}
