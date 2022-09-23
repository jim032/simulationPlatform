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
		  menuText:'Abnormal part - transaction malleability',
		  category_id:'',//课程id
		  step:1,//当前步骤
		  pageName:'54',

		  operaInfo:{mess:'No status, please follow the steps on the right.',infolist:[]},//底部传递的信息
		
		  
		  confirShow:false,

      lineDrawMalleabilityShow: false, //交易延展性交易框展示
      
      tansferInfo: [], //底部展示的事务列表
      tansferInfoEdit: [],
      singleStep:false,//单个步骤提示
      wprogressmalleability:0, //打包的进度
      delayTimer:null,//延迟执行时间
      editAmount: 0.0,
      selectIndexDataM: [], //事务修改

      isShowAmount: false,
      toEditAmount: '',
      
       userList:[
        {name:'userA',userId:'A',icon:require('../assets/teachImg/icon_user2.png'),balance:850,},
        {name:'userB',userId:'B',icon:require('../assets/teachImg/icon_user3.png'),balance:850,},
        {name:'userC',userId:'C',icon:require('../assets/teachImg/icon_user4.png'),balance:850,}
      ],
      transNumber:0,//转账次数
      cureditIndex:'',//当前修改的是哪一个事务
      editNumber:0,//修改次数
      D1:false,//转账是否显示
    }
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.a_malleabilityAttack
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
	  	/*if(that.step==1){
	  		that.step = that.step + 1;
	  	}
	  	*/
	  },
    //点击左边的三个工具箱
    poinfun(num){
      let that = this;
      
 
       if(num==1&& that.step<=2){
        if(that.transNumber<2) {
	        that.lineDrawMalleabilityShow = true
	        that.isShowAmount = false;
		        that.funNum = num;
		        if(that.transNumber==0){
		        	that.operaInfo.mess = 'No status, please follow the steps on the right.'
		        }else{
		          	that.operaInfo.mess = ''
		            that.operaInfo.infolist = [];
		        }
	
	      }else{
	      	that.$toast('Transfer transaction completed, please proceed to the next step',3000)
	      }
        
      }
      if(num==2){
      	if(that.transNumber<2){
      		that.$toast('There must be 2 transfers',3000);
      		return;
      	}
      	if(that.tansferInfo.length==that.editNumber){
      	 	that.$toast('All transfer transactions have been modified',3000);
      		return;
        }
      	if(that.step<=3 && that.tansferInfo.length>0){
      		that.D1=true
	        that.lineDrawMalleabilityShow = true
	        that.funNum = num;
	        that.operaInfo.mess = ''
	        that.operaInfo.infolist = [];
	        that.selectIndexDataM = [];
	        that.toEditAmount!='';
	        for(let i = 0;i < that.tansferInfo.length;i ++) {
	          that.selectIndexDataM.push(that.tansferInfo[i])
	        }
      	}
      }

      
      if(num==3 && that.wprogressmalleability==0){
      	if(that.tansferInfo.length==0){
      		that.$toast('Please transfer money first to generate transaction',2000);
      		return;
      	}
      	if(that.tansferInfo.length>0){
      		if(that.editNumber==0){
      			that.$toast('Please modify the transaction first',2000);
      			return;
      		}else{
      			that.step = 4
		        that.lineDrawMalleabilityShow = true
		        that.funNum = num;
		        that.operaInfo.mess = ''
		        that.operaInfo.infolist = [];
		        let timer = setInterval(function() {
		          that.wprogressmalleability++;
		          if(that.wprogressmalleability == 100) {
		            clearInterval(timer)
		            that.step = 12
		            that.lineDrawMalleabilityShow = false
		            that.delayTimer = setTimeout(function(){
		              that.confirShow = true;
		            },500)
		          }
		        },50)
		      }
      	}
      }
        
      
      
    },
    //事务修改
    sureEditAmount(id) {
      let that = this;
      for(var i =0;i<that.tansferInfo.length;i++){
      	if(id==that.tansferInfo[i].id){    		
   
      		that.tansferInfo[i].isEdit = true;
          let temp = {};
      		temp = JSON.parse(JSON.stringify(that.tansferInfo[i]));
      		temp.id = "e"+that.tansferInfo[i].id
      		temp.amount = parseInt(that.tansferInfo[i].amount).toFixed(1);
      		that.tansferInfoEdit.push(temp)
      	}
      	
      	//console.log(that.tansferInfo[i]);
      	
      }
     that.step=3
      that.lineDrawMalleabilityShow = false
      that.editNumber = that.editNumber+1;
      /*
      if(that.tansferInfo.length==that.editNumber){
      	 that.step = 4
      }
      */
    
     
    },
    //转账确定
    sureTransfer(tansferInfo) {
      let that = this;
      that.lineDrawMalleabilityShow = false

      for(var i=0;i<that.userList.length;i++){
      	if(tansferInfo.initiate==that.userList[i].userId){
      		that.userList[i].balance=that.userList[i].balance-parseInt(tansferInfo.amount);
      	}
      	if(tansferInfo.object==that.userList[i].userId){
      		that.userList[i].balance=that.userList[i].balance+parseInt(tansferInfo.amount)
      	}
      }
      that.isShowAmount = false;
      that.tansferInfo.push({
        initiate: tansferInfo.initiate,
        object: tansferInfo.object,
        amount: tansferInfo.amount,
        id:'1'+parseInt(that.transNumber+1),
        isEdit:false,  
        name:'transaction'+parseInt(that.transNumber+1)
      })
      that.transNumber = that.transNumber + 1;
      if(that.transNumber==2){
      	that.step=2
      	that.delayTimer = setTimeout(function(){
	      	that.confirShow = true;
	      },500)
      }
      that.operaInfo.mess = ''
      that.operaInfo.infolist = [];
    },
    
    
    noShowAmount() {
      let that = this;
      that.operaInfo.mess = ''
      that.operaInfo.infolist = [];
      that.isShowAmount = false;
      that.lineDrawMalleabilityShow = false
      if(that.tansferInfo.length==0){
        that.operaInfo.mess = 'No status, please follow the steps on the right.'
      }
    },
    //点击透明区域隐藏
    hideLineDrawShow(){
    	 this.lineDrawMalleabilityShow = false
    },
    showUserAmount(user) {
      let that = this;
      that.isShowAmount = true;
      that.operaInfo.mess=user.name+','+'The account balance is'+user.balance;
      that.operaInfo.infolist = [];
      if(that.step==12){
	      for(var i=0;i<that.tansferInfo.length;i++){
	        if(user.userId==that.tansferInfo[i].initiate || user.userId==that.tansferInfo[i].object){
	        	if(that.tansferInfo[i].isEdit==true){
	        		that.operaInfo.infolist.push(that.tansferInfo[i].initiate+'to'+that.tansferInfo[i].object+'transfer transaction not completed')
	        	}else{
	        		that.operaInfo.infolist.push(that.tansferInfo[i].initiate+'to'+that.tansferInfo[i].object+'transfer transaction completed')
	        	}
	        	
	        }
	
	      }
      }
      
    },
    //修改选择事务，获取修改金额格式
    upToEditAmount(value) {
	    let that = this;

	    for(var i=0;i<that.tansferInfo.length;i++){
	    	if(that.tansferInfo[i].id==value){
	    		 that.toEditAmount = parseInt(that.tansferInfo[i].amount).toFixed(1)
	    		 that.cureditIndex = i;
	    	}
	    }
	   
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
    
    document.onkeydown = function (e) {
		var ev = e || window.event // 获取event对象
		var obj = ev.target || ev.srcElement // 获取事件源
	    var readOnly = obj.readOnly || obj.getAttribute('readonly')
	    if (ev.keyCode === 8) { // 等于8则是退格键被按下
	   		if (condition) { // 在这里可以对屏蔽条件进行进一步限制
	          return false
	        }
	    }
	}
    
  },
  beforeDestroy(){
  	let that = this;
  	if(that.delayTimer){
  		 clearTimeout(that.delayTimer)
  	}

  }
}
