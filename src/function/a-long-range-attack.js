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
      
      AchainList:[{name:'创世区块',height:0}],
      attackList:[],
      chainNuber:0,
      showAchainList:[],
      curheight:0,
      spaceTimer:null,
      
      attackTimer:null
      
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
				that.chainNuber =  that.AchainList.length-1
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
	  	/*
	  	if(that.step==1){
	  		that.step = that.step + 1;
	  	}
      if(that.step==3){
        that.step = that.step + 1;
        that.delayTimer = setTimeout(function(){
          that.confirShow = true
        },1000)
      }*/
     

	  },
    //点击左边的三个工具箱
    poinfun(num){
      //num==2测速
      let that = this;
       that.funNum = num;
      
      if(num==1){
      	let attHeight =that.curheight	
      	that.attackList.push({name:'区块',height:attHeight})
      	that.attackTimer=setInterval(function(){
					that.attackList.push({name:'区块',height:attHeight+1})		
			},8000)
      	
      }
      if(num==2 ){
        if(that.step<2){
        	that.$toast("请先点击攻击",2000)
        }
        //that.step = that.step + 1;
        //that.confirShow = true
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
  })
}
}
