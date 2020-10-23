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
		  menuText:'异常篇-长程攻击',
		   category_id:'',//课程id
      iconUrl_1:require('../assets/teachImg/icon_user1.png'),//头像
		  step:1,//当前步骤
		  pageName:55,//异常-长程攻击
		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
      D1:false,//提现金额对话框
      inputMoney:0,
      singleStep:true,//单个步骤提示
      
      AchainList:[{name:'创世区块',height:0}],//A链
      attackList:[],//B链
      chainNuber:0,//A链
      mergedChainList:[],//合并链
      
      curheight:0,
      spaceTimer:null, //A链定时器
      
      attackTimer:null,//B链定时器
      attackNumber:0,
      
      attack_Number:0,//攻击的初始增长
      delaytimer:null,//延迟时间
      
      isAttacked:false,
      isCovered:false,
      
      click_attackNumber:0,//点击攻击的位置
      
      

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
		getBlockList(){
			let that = this;
			that.spaceTimer=setInterval(function(){
				that.curheight++;
				that.AchainList.push({height:that.curheight,name:'区块'})
				that.chainNuber =  that.AchainList.length-1;
				if(that.curheight==2){
					clearInterval(that.spaceTimer);
					if(that.isAttacked){
					   that.confirShow = true
					}
				}
				if(that.curheight==6){
					clearInterval(that.spaceTimer);
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
	  		that.getBlockList()
	  	}
	  	if(that.step==4){
	  		that.step= that.step+1
	  		that.mergedChainList = that.attackList;
	  		//console.log(that.click_attackNumber)
	  		if(that.click_attackNumber==1){
	  			that.mergedChainList.unshift({name:'创世区块',height:0}) 
	  		}else{
	  			
	  			that.mergedChainList.unshift({name:'区块1',height:1})
          that.mergedChainList.unshift({name:'创世区块',height:0}) 
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
      //num==2测速
      let that = this;
      that.funNum = num;
      
      /*攻击*/
      if(num==1){
      	if(that.AchainList.length<2){
      		return that.$toast("创世区块不可攻击",2000)
      	}
      	if(that.isAttacked){
      		return that.$toast("已攻击",2000)
      	}
      	if(that.isCovered){
      	 	return that.$toast("长程攻击模拟已结束",2000)
      	 }
      	that.step=3;
      	that.isAttacked=true
      	that.getBlockList();
      	let attHeight =that.curheight	
      	that.attackNumber = that.chainNuber
      	that.click_attackNumber  = that.chainNuber
      	that.attackList.push({name:'区块'+that.attackNumber,height:attHeight})
      	that.attackTimer=setInterval(function(){
      		that.attack_Number++;
      	
      		if(that.attackList.length==4){
      			clearInterval(that.attackTimer)
      			if(that.mergedChainList.length==6){
      				that.confirShow=true
      			}
      		}
					that.attackList.push({name:'区块'+parseInt(that.attackNumber+that.attack_Number),height:attHeight+1})	
					
					
			 },8000)
      	
      }
      /*覆盖*/
      if(num==2){
      	 if(!that.isAttacked){
      	 	return that.$toast("请先点击攻击",2000)
      	 }
      	 if(that.isCovered){
      	 	return that.$toast("长程攻击模拟已结束",2000)
      	 }else{
      	 	 that.step=4
           that.confirShow=true
      	 	 that.isCovered=true;
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
	  this.menuText = '异常篇-'+this.$route.params.name
	 	that.category_id = this.$route.params.id;
	  that.$nextTick(() => {
	    that.confirShow = true;
	    that.getvisit();
	    clearInterval(this.attackTimer);
	    clearInterval(this.spaceTimer);
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
