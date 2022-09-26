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
		  menuText:'Abnormal chapter - 51% attack',
		  category_id:'',//课程id
		  step:1,//当前步骤
		  
		  pageName:'51',

		  operaInfo:{mess:'No status, please follow the steps on the right.',infolist:[]},//底部传递的信息
		  singleStep:false,//单步骤提示
		  
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
        {name:'miner A',userId:'A',icon:require('../assets/teachImg/icon_user2.png'),balance:850,useBalance:850,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user2_warning.png'),isAva:false},
        {name:'miner B',userId:'B',icon:require('../assets/teachImg/icon_user3.png'),balance:850,useBalance:850,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user3_warning.png'),isAva:false},
        {name:'miner C',userId:'C',icon:require('../assets/teachImg/icon_user4.png'),balance:850,useBalance:850,isWarning:false,
        warnIcon:require('../assets/teachImg/icon_user4_warning.png'),isAva:false}
      ],
      delNumber:0,//事务删除个数
      
      isPack:false,
      isPower:false,//是否提升算力
      isDelete:false, //那个事务是否删除
      isShowDelete:false,//删除是否显示
       D1:false//三笔转账是否完成
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
  		if(that.step==1 && that.transNumber==3){
  			 	that.delayTimer = setTimeout(function(){
  			 		
	      	that.step=2
	      },300)
	    }
  		if(that.isPower && !that.isPack){
  			that.step = that.step + 1
  		}
	  	//that.step = that.step + 1;	
	  },
    //点击左边的三个工具箱
    poinfun(num){
      let that = this;
      //转账
      that.funNum = num;
      if(num==1){
      	if(that.transNumber<3) {
	        that.lineDraw51Show = true
	        that.isShowAmount = false;
	        
	        if(that.transNumber==0){
	        	that.operaInfo.mess = 'No status, please follow the steps on the right.'
	        }else{
	          	that.operaInfo.mess = ''
	            that.operaInfo.infolist = [];
	        }
	
	      }else{
	      	that.$toast('Up to 3 transfers',3000)
	      }
      }
      
      if(num==2){
      	if(that.transNumber<3){
      		that.$toast('There must be three transfers',3000);
      		return;
      	}
      	if(that.isPower){
      		that.$toast('Computing power has been improved',3000);
      		return;
      	}
      	if(that.tansferInfo.length>0 && that.step<=3){
      		that.lineDraw51Show = true
	        //that.funNum = num;
	        
      	}
      }
      

      //打包     
      if(num==3){
      
      	if(that.transNumber<3){
      		that.$toast('Up to 3 transfers',3000);
      		return;
      	}
      	if(!that.isPower){
      		that.$toast('Please improve your computing power first',3000);
      		return;
      	}
      	if(that.tansferInfo.length>1){
       	 if(that.delNumber==0){
       	 	this.$toast('Delete at least one transaction before packaging',3000);
       	 	return;
       	 }
        }
      	if(that.isPack){
      		this.$toast('The current transaction is packaged',3000);
       	 	return;
      	}
      	
   
      	
      	that.lineDraw51Show = true
        //that.funNum = num;
        that.operaInfo.mess = ''
        that.operaInfo.infolist = [];
        that.wprogress51 = 0;
        let timer = setInterval(function() {
          that.wprogress51++;
          
          if(that.wprogress51 == 100) {
            clearInterval(timer)
            that.delayTimer = setTimeout(function(){
              that.lineDraw51Show = false
              that.confirShow = true;
              that.isPack = true;
              that.step=12;
              
              //转账结束后,两数组遍历
              for(var j=0;j<that.tansferInfo.length;j++){
              
	              for(var i=0;i<that.userList.length;i++){
	      	
						      	if(that.tansferInfo[j].initiate==that.userList[i].userId  && !that.tansferInfo[j].isDelete){
						      		that.userList[i].balance=that.userList[i].balance-parseInt(that.tansferInfo[j].amount);
						      	}  	
						      	if(that.tansferInfo[j].object==that.userList[i].userId  && !that.tansferInfo[j].isDelete){
						      		that.userList[i].balance=that.userList[i].balance+parseInt(that.tansferInfo[j].amount);
						      	}
						      	if(that.tansferInfo[j].object==that.userList[i].userId &&　that.tansferInfo[j].isDelete){
						      		that.userList[i].isAva=true;
						      	}
						      
						    }
					    }          
              
              
            },500)
          }
        },50)
      	
      }
  
    },
    //提升算力确定
    sureUpCompute(upComputeUser) {
      let that = this;
      that.lineDraw51Show = false
      
      that.confirShow = true;
      that.upComputeUser = upComputeUser
      
      for(var i =0;i<that.userList.length;i++){
      	if(that.upComputeUser==that.userList[i].userId){
      		that.userList[i].isWarning=true;
      	}
      }

     that.isPower=true
     
    },
    //转账
    sureTransfer(tansferInfo) {
      let that = this;
      that.lineDraw51Show = false;
      
      
      for(var i=0;i<that.userList.length;i++){
      	
      	if(tansferInfo.initiate==that.userList[i].userId ){
      		that.userList[i].useBalance=that.userList[i].useBalance-parseInt(tansferInfo.amount);
      	}
      	/*
      	if(tansferInfo.object==that.userList[i].userId){
      		that.userList[i].balance=that.userList[i].balance+parseInt(tansferInfo.amount)
      	}
      	*/
      }
 

      
      that.tansferInfo.push({
        initiate: tansferInfo.initiate,
        object: tansferInfo.object,
        amount: tansferInfo.amount,
        isDelete:false
      })
      
      that.transNumber = that.transNumber + 1;
      if(that.transNumber==3){
      	that.delayTimer = setTimeout(function(){
      		 that.D1=true
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
      //that.step = 11  
      that.isShowDelete = true;
      that.lineDraw51Show = true;
    },
    //事务删除
    del () {
	    let that = this
      that.lineDraw51Show = false
      that.delNumber = that.delNumber+1;
      
      //that.tansferInfo.splice(that.del51, 1)
      that.tansferInfo[that.del51].isDelete = true;
      
      if(that.tansferInfo.length>=1){
      	 
      	 that.delayTimer = setTimeout(function(){
	    
	      	that.isDelete = true;
	      	that.isShowDelete = false;
	      },500)
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
      that.operaInfo.mess=user.name+','+'The account balance is'+user.balance
      that.operaInfo.infolist = [];
      
    },
    noShowAmount() {
      let that = this;
      
      that.lineDraw51Show = false
      if(that.tansferInfo.length==0){
      	that.operaInfo.mess = 'No status, please follow the steps on the right.'
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
    this.menuText = 'Abnormal-'+this.$route.params.name
 	  that.category_id = this.$route.params.id;
    that.$nextTick(() => {
      that.confirShow = true
      that.getvisit();
    })
  },
  beforeDestroy() {
	   if(this.delayTimer) {
		　　clearTimeout(this.delayTimer); //关闭
		 }
	 
   }
}
