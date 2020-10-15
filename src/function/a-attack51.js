import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach'
export default{
	data(){
		return{
		  menuShow:false,//上方菜单按钮是否显示
		  showTool:false,//左侧工具箱是否显示		
		  funNum:0,//左侧点击判断工具箱
		  menuText:'异常篇-51%攻击',
		  category_id:'',//课程id
		  step:1,//当前步骤
		  
		  pageName:'51',

		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
		  singleStep:true,//单步骤提示
		  
		  confirShow:false,
  
      iconUrl_1:require('../assets/teachImg/icon_user2.png'),//头像
      iconUrl_2:require('../assets/teachImg/icon_user3.png'),//头像
      iconUrl_3:require('../assets/teachImg/icon_user4.png'),//头像

      lineDraw51Show: false, //51%攻击弹出框展示
      tansferInfo: [], //转账事务列表
      wprogress51:0, //打包的进度   
      delayTimer:null,//延迟执行时间
      isshowdel: -1, // 是否显示删除按钮
      upComputeUser: '',
      del51: -1,
    
      isShowAmount: false,
      
      transNumber:0,//转账次数
      
      userList:[
        {name:'用户A',userId:'A',icon:require('../assets/teachImg/icon_user2.png'),balance:850,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user2_warning.png')},
        {name:'用户B',userId:'B',icon:require('../assets/teachImg/icon_user3.png'),balance:850,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user3_warning.png')},
        {name:'用户C',userId:'C',icon:require('../assets/teachImg/icon_user4.png'),balance:850,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user4_warning.png')}
      ],
      delNumber:0,//事务删除个数
      
      isPack:false
      
    }
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.a_51attack
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
	  	//that.step = that.step + 1;	
	  },
    //点击左边的三个工具箱
    poinfun(num){
      let that = this;
      //转账
      if(num==1&& that.step<=2){
      	if(that.transNumber<3) {
	        that.lineDraw51Show = true
	        that.isShowAmount = false;
	        that.funNum = num;
	        if(that.transNumber==0){
	        	that.operaInfo.mess = '暂无状态，请先按照右侧步骤提示操作~。'
	        }else{
	          	that.operaInfo.mess = ''
	            that.operaInfo.infolist = [];
	        }
	
	      }else{
	      	that.$toast('转账最多可达3笔',3000)
	      }
      }
      
      //提升算力     
      if(num==2  && that.tansferInfo.length>0 && that.step<=3){ 
        that.lineDraw51Show = true
        that.funNum = num;
        that.step=3
      }

      //打包      
      if(num==3 && that.step == 4 && !that.isPack){
       if(that.tansferInfo.length>1){
       	 if(that.delNumber==0){
       	 	this.$toast('打包前，至少删除一个事务',3000);
       	 	return;
       	 }
       }
        
        that.lineDraw51Show = true
        that.funNum = num;
        that.operaInfo.mess = ''
        that.operaInfo.infolist = [];
        let timer = setInterval(function() {
          that.wprogress51++;
          if(that.wprogress51 == 100) {
            clearInterval(timer)
            that.delayTimer = setTimeout(function(){
              that.lineDraw51Show = false
              that.confirShow = true;
              that.isPack = true;
              that.step=12
            },500)
          }
        },50)
      }
    },
    //提升算力确定
    sureUpCompute(upComputeUser) {
      let that = this;
      that.lineDraw51Show = false
      that.step = that.step + 1
      that.confirShow = true;
      that.upComputeUser = upComputeUser
      
      for(var i =0;i<that.userList.length;i++){
      	if(that.upComputeUser==that.userList[i].userId){
      		that.userList[i].isWarning=true;
      	}
      }

    },
    //转账
    sureTransfer(tansferInfo) {
      let that = this;
      that.lineDraw51Show = false;
      if(that.step==1){
      	that.step=2
      }
      
      for(var i=0;i<that.userList.length;i++){
      	if(tansferInfo.initiate==that.userList[i].userId){
      		that.userList[i].balance=that.userList[i].balance-parseInt(tansferInfo.amount);
      	}
      	if(tansferInfo.object==that.userList[i].userId){
      		that.userList[i].balance=that.userList[i].balance+parseInt(tansferInfo.amount)
      	}
      }
      that.tansferInfo.push({
        initiate: tansferInfo.initiate,
        object: tansferInfo.object,
        amount: tansferInfo.amount
      })
      that.transNumber = that.transNumber + 1;
      if(that.transNumber==1){
      	that.delayTimer = setTimeout(function(){
	      	that.confirShow = true;
	      },500)
      }
      
      that.operaInfo.mess = ''
      that.operaInfo.infolist = [];
      
    },
    sureBale() {
      let that = this;
      that.lineDraw51Show = false
      that.confirShow = true;
      that.step = that.step + 1;
    },
    showdel(index) {
      let that = this;
      that.del51 = index;
      that.step = 11    
      that.lineDraw51Show = true;
    },
    //事务删除
    del () {
	    let that = this
      that.lineDraw51Show = false
      that.delNumber = that.delNumber+1;
      that.tansferInfo.splice(that.del51, 1)
      if(that.tansferInfo.length>=1){
      	 that.step = 4   
      }
      
    },
    canc() {
      let that = this
      that.lineDraw51Show = false
    },
    enter(index) {
      let that = this;
      if (that.tansferInfo.length > 1) {
        that.isshowdel = index;
      }
    },
    leave() {
      let that = this;
      that.isshowdel = -1;
    },
    showAmount(user) {
      let that = this;
      that.isShowAmount = true;
      that.operaInfo.mess=user.name+','+'账户余额为'+user.balance
      that.operaInfo.infolist = [];
      
    },
    noShowAmount() {
      let that = this;
      
      that.lineDraw51Show = false
      if(that.tansferInfo.length==0){
      	that.operaInfo.mess = '暂无状态，请先按照右侧步骤提示操作~。'
        that.operaInfo.infolist = [];
      }else{
      	that.operaInfo.mess = ''
        that.operaInfo.infolist = [];
        that.isShowAmount = false;
      }
     
    },
    
    //点击透明区域隐藏
    hideLineDrawShow(){
    	 this.lineDraw51Show = false
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
	   if(this.delayTimer) {
		　　clearInterval(this.delayTimer); //关闭
		 }
	 
   }
}
