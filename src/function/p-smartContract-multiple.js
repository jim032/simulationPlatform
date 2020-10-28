var rid = null;
var length=null,frames=null, chart=null;
var angle= 0;

import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import common from '@/function/common';
import {visitCourse} from '@/API/api-teach';
export default{
	inject:['reload'], //注入app的方法
	data(){
	  return{
	  	
	  	mainheight:0,//中间区域的高度
	  	top:0,//当前区域的中间居中
	  	menuShow:false,//上方菜单按钮是否显示
	  	
	  	winNum:0,//代表当前不显示获胜节点
	  	pageName:'2-multiple',//代表页面是发币页面
	  	 	
    	
    	userId:'',//当前用户登陆的userId
    	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	  	confirShow:false,//右侧弹出框是否显示
	  	//底部传递信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	  	
	  	step:1,
	  	operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~',infolist:[]},//底部传递的信息
	  	//当前页面展示的userList
	    userList:[ //type:0普通用户   1房主  2机器人
	       {
		       icon:require('../assets/teachImg/icon_user1n.png'),
		       icon_1:require('../assets/teachImg/icon_user1.png'),
		       name:'用户1',
		       userId:'',
		       amount:0,//用户余额
		       onlineStatus:false,
		       type:'',
	       },
	       {
		       icon:require('../assets/teachImg/icon_user2n.png'),
		       icon_1:require('../assets/teachImg/icon_user2.png'),
		       name:'用户2',
		       userId:'',
		       amount:0,//用户余额
		       onlineStatus:false,
		       type:'',
	       },
	       {
		       icon:require('../assets/teachImg/icon_user3n.png'),
		       icon_1:require('../assets/teachImg/icon_user3.png'),
		       name:'用户3',
		       userId:'',
		       amount:0,//用户余额
		       onlineStatus:false,
		       type:'',
	       },
	       {
		       icon:require('../assets/teachImg/icon_user4n.png'),
		       icon_1:require('../assets/teachImg/icon_user4.png'),
		       name:'用户4',
		       userId:'',
		       amount:0,//用户余额
		       onlineStatus:false,
		       type:'',
	       }
	    ],
	    onlineUserList:[],//用户在线的userlist
	    transferShow:false,//转账弹出框显示
	    showUser:false,
	    chooseUserObj:{
	    	id:'',
	    	name:'',
	    },//转账选择对象(id)
	    
	    setShow:false,//设置币种弹出框是否显示      
      transUser:{},//当前谁转账,
       

			deployContractPro:0,
			currentTransferUser:0,
			toastShow: false,
	    toastText: '',
			currentLocation:0,
			

			from_userId:'',//转账对象的userId
			to_userId:'',//到账账对象的userId
			transUserList:[],//转账用户列表

			consoleShow:false,//头部控制台是否显示
			menuText:'智能合约部署与调用',
			
			coinName:'', //币种名称
			moneyNumber:'',//设置金额
			transAmout:'',//转账金额
			
			onlineNumber:0,//在线人数
			
			contractDeployment:false,
			
			animateCss:'',
			animateUrl:'',
			showPic:false,//动画效果是否展示
			time:'',//gif动画执行
			
			websock: null,
			category_id:'',
			
			roomid:'',//房间号
			classid:'',//班级id
			
			coin_name:'',//当前房间是否已经发布成功
			initialOwner:{userId:'',name:''},//初始拥有者
			
			onlineName:'',//在线用户名称
			s_timer:null,
		  
		  getNumber:0,
		  
		  timer:null,
		  timer2:null,
		  showReset:false,//头部的重置按钮是否显示
	  }
	},
  components:{comHeader,comFooter,rightTips},
 computed: {
		stepTips(){
			return this.$store.state.sm_multiple_stepTips
		},
		socketUrl(){
			return this.$store.state.socketUrl
		}
	},
	
	watch:{
		screenWidth(val){
	    // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
	    if(!this.timer){
	        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
	        this.screenWidth = val
	        this.timer = true
	        let that = this
	        setTimeout(function(){		       
	            that.timer = false
	        },400)  
	    }   
	  }
  },
 created() {
    this.initWebSocket();
    this.userId = sessionStorage.getItem('stu_userId')
    
    
    
  },
  mounted(){
		 	let that = this;
		 	this.menuText = '区块链密码学-'+this.$route.params.name
		 	that.category_id = this.$route.params.id;
	    that.getvisit();
			window.onresize = () => {
		    return (() => {
		        window.screenWidth = document.body.clientWidth
		        that.screenWidth = window.screenWidth;
		        that.initHeight();
		    })()
			}
	
		this.$nextTick(() => {	  	
	  	that.initHeight();
	  	this.timer = setInterval(function(){
      	let userId = sessionStorage.getItem('stu_userId');
        let params = '{"userID":"'+userId+'","type":"'+5+'","data":{"user_id":"'+userId+'"}}';           
        that.websocketsend(params); 
        
      }, 10000);
      this.timer2 = setInterval(function(){
        that.getNumber++;
        if(that.getNumber==22){
     		   	
  			  sessionStorage.removeItem('stu_userId')
	    	  sessionStorage.removeItem('stu_role_id')
	    	  sessionStorage.removeItem('loginModal');
				  that.$router.push({'path':'/login'})
    	    clearInterval(that.timer2); //关闭
        }
      },1000);
		})	
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
		//初始化socket
		initWebSocket(){ //初始化weosocket
     let that = this
		 if(typeof(WebSocket) == "undefined") {
        that.$toast("您的浏览器不支持WebSocket",3000);
     }else{      	 
         if(this.websock!=null){
            this.websock.close();
            this.websock=null;
          }
          let userId = this.userId
          this.websock = new WebSocket(this.socketUrl+userId);
		      this.websock.onmessage = this.websocketonmessage;
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          //this.websock.onclose = this.websocketclose;
      }
      
      

    },
    
    websocketonopen(){ //连接建立之后执行send方法发送数据 
      let userId = this.userId
      let params = '{"userID":"'+userId+'","type":"'+0+'","data":{"user_id":"'+userId+'"}}';    

      this.websocketsend(params);
    },
    
    //链接失败继续链接
    websocketonerror(){//连接建立失败重连
    	//this.reload();
      this.initWebSocket();
    },
    
    //数据接收
    websocketonmessage(e){ //数据接收
     
     //console.log(e)
     let mess =JSON.parse(e.data)
     let that = this;
     that.getNumber = 0;
     //console.log(e)
   
     //code：201表示加入消息  202退出成功  203代币发行成功  204转账成功  205添加机器人成功
     if(mess.code=='201' && mess.code){         
        that.onlineList(mess,201); 
     }
     //退出
     if(mess.code=='202' && mess.code){ 
       	let data = JSON.parse(mess.data)
     	  let userList = data.userList;
     	  let index = userList.length
     	  for(var i=0;i<that.userList.length;i++){
     	   	that.userList[i].onlineStatus=false
     	   	that.userList[i].name = '用户'+(1+index)
     	   	that.userList[i].amount = 0;
     	  }
     	  that.onlineList(mess,202);
      }
      //加入机器人接收的消息
      if(mess.code=='205' && mess.code){
     	  that.onlineList(mess,205);     
      }
      //用户已添加
      if(mess.code=='501' && mess.code){  
      
        that.onlineList(mess,501); 
      }
      //发币成功
      if(mess.code=='203' && mess.code){         
  
        //that.setShow = false;
			  that.issueCurrencyMess ='智能合约部署完成'
			  that.issueCurrency(mess,203)

     }
      
     //转账成功
     if(mess.code=='204' && mess.code){
     	 //转账成功首先那个
       that.transMess = '转账事务打包成功'
       that.transferOperation(mess,204)
     	
     }
       
    },
    //数据发送
    websocketsend(Data){
    	
       this.websock.send(Data);
     
    },
    //退出
    websocketclose(e){
    	let userId = this.userId
    	let that = this;
    	let  params = '{"userID":"'+userId+'","type":"'+4+'","data":{"user_id":"'+userId+'","room_id":"'+that.roomid+'"}}';
      this.websocketsend(params); 
    },
    
    //发币操作效果
    issueCurrency(mess,code){
    	let that = this;
    	that.isShowMess = true
			that.isBlcok = true;
    	let timer = setInterval(function(){
     	  that.blockPro++;
        if(that.blockPro==100){
            clearInterval(timer)
            that.operaInfo.mess = '当前合约正在部署中:'+that.blockPro+'%';
            that.isBlcok = false;
            clearTimeout(that.timer1);
            /*
					  that.timer1 = setTimeout(function(){
							that.confirShow = true;
						},500)
						*/
            that.top = that.top-40;
						that.operaInfo.mess = that.issueCurrencyMess
						that.operaInfo.infolist.push('合约地址：4b1c95a1ed859cc68abb9819d34ed95d541a6f5c')
						that.operaInfo.infolist.push('资产名称：'+that.coinName)
						that.operaInfo.infolist.push('拥有者：'+that.onlineUserList[0].user_name)						
						that.blockPro = 0;
						//智能合约部署完成
						that.contractDeployment = true;
						that.onlineList(mess,code); 
						sessionStorage.setItem('contractDeployment',true)
						
	      }else{
						that.operaInfo.mess = '当前合约正在部署:'+that.blockPro+'%';
			  }
      },50)
    },
    
    //转账的操作效果
    transferOperation(mess,code){
    	  let that = this
    	  let end ='';
		    that.blockPro = 0;
			  that.isBlcok = true;
			  that.operaInfo.infolist = [];
			  that.transferShow = false 
			  //that.to_userId = that.chooseUserObj.id;
			  let timer = setInterval(function(){
		   	that.blockPro++;  
		   	  if(that.blockPro==35){	
		   	  	let arr = that.userList;
						for(var j = 0; j < arr.length; j++) {
						   if(that.to_userId==arr[j].userId){  	
						   	end = j+1;
						   }				  				
						} 		
		   	  }
		   	  
		      if(that.blockPro==100){
		          clearInterval(timer)
		          that.operaInfo.mess = that.transMess;
		          that.isBlcok = false;
							that.blockPro = 0;						
						  that.onlineList(mess,code); 
						  //that.time = new Date();
					    //that.showAnimate(that.start,end)
											
		      }else{
							that.operaInfo.mess = '转账事务打包中:'+that.blockPro+'%';
				  }
		    },50)
	  } ,
    //在线人数list赋值
    onlineList(mess,code){
    	if(code!=501){
	    	this.$message({
	      message: mess.message,
	          type: 'success',
	          duration:2000
	      }); 
     }
     	let data = JSON.parse(mess.data)
     	let userList = data.userList;
    	let that = this;
    	that.onlineNumber = userList.length;
    	that.roomid = data.id ;
      that.classid = data.class_id;
      that.onlineNumber = userList.length
      that.onlineUserList = userList; //当前在线list表赋值    
      that.coin_name = data.coin_name
    	for(var i = 0;i<userList.length;i++){ 
     	 	 that.userList[i].amount = userList[i].balance;
        	that.userList[i].type=userList[i].type
        	that.userList[i].userId = userList[i].user_id
        	that.userList[i].name = userList[i].user_name
        	that.userList[i].onlineStatus = true;
        	if(userList[i].type==1){
        		that.initialOwner.userId = userList[i].user_id
        	  that.initialOwner.name = userList[i].user_name
        	}
        	if(userList[i].user_id == that.userId){
        	
        		that.onlineName=userList[i].user_name
        	}
       }
      
    },
    


		poinfun(num){
			let that = this;
			if(num==1){				
				//房主权限判断
	    	let arr = that.userList;    	
				that.transUserList= []; 
				for(var j = 0; j < arr.length; j++) {
				   if(arr[j].userId==that.userId){
				   	  if( arr[j].type!=1){
				   	  	this.$toast('您不是房主，无权限添加机器人！',3000);
				   	  	return;
				   	  }		   	
				   }		  
				}
				
				if(that.onlineNumber==4){
					that.$toast('当前小组人数已有4人，可直接设置币种',2000)
				}else{
			    let userId = that.userId;
			    let params =  '{"userID":"'+userId+'","type":"'+1+'","data":{"room_id":"'+that.roomid+'","class_id":"'+that.classid+'"}}';;    
          this.websocketsend(params);
          /*
			    if(that.onlineNumber==3){
			    	that.confirShow = true;
			    }
			    */
				}
			}

			else if(num==2){
				let that = this
					//房主权限判断
	    	let arr = that.userList;    	
				that.transUserList= []; 
				for(var j = 0; j < arr.length; j++) {
				   if(arr[j].userId==that.userId){
				   	  if( arr[j].type!=1){
				   	  	this.$toast('您不是房主，无权设置币种！',3000);
				   	  	return;
				   	  }		   	
				   }		  
				}
				
				if (that.blockPro > 0){
				   return
			   }
				if(that.coin_name!='' || that.coinName!='' ){
					that.$toast('币种已设置',2000)
					return;
				}
				if(that.onlineNumber<4){
					that.$toast('小组人数达到4人，才可设置币种',2000)
					return;
				}			
			
				
				that.transUserList = that.userList
				that.funNum = num;
				that.setShow = true;
				
			} 
		else if (num==3 && !that.isBlcok && !that.contractDeployment){
			let that = this
			//房主权限判断
    	let arr = that.userList;    	
			that.transUserList= []; 
			for(var j = 0; j < arr.length; j++) {
			   if(arr[j].userId==that.userId){
			   	  if( arr[j].type!=1){
			   	  	this.$toast('您不是房主，无权限部署合约！',3000);
			   	  	return;
			   	  }		   	
			   }		  
			}
			if (that.coin_name!=''){
				this.$toast('合约部署已完成！',3000);
				return;
			}
			if(that.coinName==''){
				this.$toast('请先设置币种！',3000);
				return;
			}
			
			

			that.funNum = num;
	   	that.operaInfo.infolist = [];
			if(that.coinName!=''){				
				let params = '{"userID":"'+that.userId+'","type":"'+2+'","data":{"room_id":"'+that.roomid+'","class_id":"'+that.classid+'","name":"'+that.coinName+'","amount":"'+that.moneyNumber+'"}}';
        this.websocketsend(params);
				//that.isShowBlock = false;
			}   
			}
		},

	toast (e) {
  		let self = this
  		self.toastText = e
  		self.toastShow = true
  		setTimeout(function(){
    			self.toastShow = false
  		}, 1500)
		},  

	showBlock(){
		let that = this;
		that.isShowBlock = true;
		that.operaInfo.infolist = [];
		that.operaInfo.mess = ''
	},
    

  //确定转账
  submitTranfer(){
     let that = this; 
     
     
    
     if (that.transUser.amount < that.transAmout){
			  that.$toast('余额不足')
			return
		}
		if (that.transAmout.match(/^-?[0-9]+$/) == null){
			that.$toast('转账金额必须是0-9999区间的正整数')
			return
		}
		
		that.to_userId = that.chooseUserObj.id;

	  //发送转账请求
	  let params = '{"userID":"'+that.userId+'","type":"'+3+'","data":{"room_id":"'+that.roomid+'","amount":"'+that.transAmout+'","from":"'+that.from_userId+'","to":"'+that.to_userId+'","class_id":"'+that.classid+'"}}';
	  this.websocketsend(params);
	  
	  
    
	  
  },  
  		
	//点击转账按钮直接把用户带过来
	showFb(obj,index){
		let that = this;
		that.transUser = obj
		if (that.blockPro > 0){
		   return
	   }
		
	  if(obj.userId!=that.userId && parseInt(obj.type)!=2){
	  	this.$toast('您不是当前用户',2000)
	  	return
	  }
	  that.chooseUserObj.id='';
	  that.chooseUserObj.name='';
	  that.showPic = false;

	  that.from_userId = obj.userId;
   
    that.transUserList= [];    
    that.transAmout = '';
    
	  let arr = that.userList
	  
	  for (var i = 0;i<arr.length;i++){
	  	if(that.from_userId!=arr[i].userId){	
	  		that.transUserList.push(arr[i])
	  	}
	  }

	  that.start = index
	  that.transferShow = true;
	},
	//点击菜单图标
	 clickMenu(){
	 	 this.menuShow = !this.menuShow
	 },
	 //点击选择转账用户
	 chooseUser(id,name){
	 	this.showUser = false
	 	this.chooseUserObj.id = id; 
	 	this.chooseUserObj.name = name; 
	 },
	 //展示金币动画
	 showAnimate(start,end){
	 	let that = this
	 	that.showPic = true;
	 	let Start = parseInt(start);
	 	let End = parseInt(end)
	 	let p = End - Start;
	 	if(p==1){
	 		switch(Start){
	 			case 1:
	 			  that.animateCss="i-img12"
	 			  break;
	 		  case 2:
	 		    that.animateCss="i-img23"
	 			  break;
	 			case 3:
	 		    that.animateCss="i-img34"
	 			  break;
	 		}
	 		that.animateUrl= require('../assets/teachImg/12.gif')
	 	}else if(p==-1){
	 		switch(Start){
	 			case 2:
	 			  that.animateCss="i-img21"
	 			  break;
	 		  case 3:
	 		    that.animateCss="i-img32"
	 			  break;
	 			case 4:
	 		    that.animateCss="i-img43"
	 			  break;
	 		}
	 		that.animateUrl= require('../assets/teachImg/21.gif')
	 	}else if(p==2){
	 		switch(Start){
	 			case 1:
	 			  that.animateCss="i-img13"
	 			  break;
	 		  case 2:
	 		    that.animateCss="i-img24"
	 			  break;
	 			
	 		}
	 		that.animateUrl= require('../assets/teachImg/13.gif')
	 	}else if(p==-2){
	 		switch(Start){
	 			case 3:
	 			  that.animateCss="i-img31"
	 			  break;
	 		  case 4:
	 		    that.animateCss="i-img42"
	 			  break;
	 			
	 		}
	 		that.animateUrl= require('../assets/teachImg/31.gif')
	 	}else if(p==3){
	 		switch(Start){
	 			case 1:
	 			  that.animateCss="i-img14"
	 			  break;	
	 		}
	 		that.animateUrl= require('../assets/teachImg/14.gif')
	 	}else if(p==-3){
	 		switch(Start){
	 			case 4:
	 			  that.animateCss="i-img41"
	 			  break;	
	 		}
	 		that.animateUrl= require('../assets/teachImg/41.gif')
	 	}
	 	
	 	
	 },
	 //初始化高度
	 initHeight(){
		let that = this;
		let height= this.$refs.header.$el.offsetHeight+30;  //
	  let bottom= this.$refs.bottom.$el.offsetHeight;  //100
	  let mainh = window.innerHeight-height-bottom  	
	  this.mainheight = mainh > 300 ? mainh : 300 
	
  	let pdiv = this.$refs.box_point.offsetTop 
	  this.top = (that.mainheight-560)/2;     
	 },
      
    //点击信息展示
   showPointInfo(obj){
	   let that = this;
	   if (that.coin_name==''){
		   return this.$toast('智能合约部署未完成',2000)
	   }
	 
	   that.isShowBlock = false
	   that.isShowMess = true
	
	  	
	  	that.operaInfo.infolist = [];
	   if(that.coinName ==''){
				  that.operaInfo.mess =''
				  that.operaInfo.infolist.push('余额：'+ obj.amount)
	  	 	      that.operaInfo.infolist.push('姓名：'+ obj.name)
	  	 	   } else{
					  that.operaInfo.mess = '币种名称: '+that.coinName;
					  that.operaInfo.infolist.push('账户余额：'+ obj.amount)
					  that.operaInfo.infolist.push('姓名：'+ obj.name)
			}
   },
       
  
  //币种名称验证
  validateCoinName(value){
  	var reg = /^[A-Za-z]{3,8}$/
  	if(this.coinName!='' && this.coinName != undefined){
  		if (!reg.test(this.coinName)) {
	        this.$toast('币种名称为3-8个英文字符',2000)
	        this.coinName='';
	        this.$refs.coinName.focus()
	    	}
  	}
  	
  },
  
   validateNum(value) { //验证只能填入数字
	    //var reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
	    var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
	     //验证警戒值
	    if(this.moneyNumber!='' && this.moneyNumber != undefined){
	    	if (!reg.test(this.moneyNumber)) {
	        this.$toast('请输入0-9999区间正整数',2000)
	        this.moneyNumber='';
	          this.$refs.moneyNumber.focus()
	    	}
	  	}
	  
  },
  validateNum1(value) { //验证只能填入数字
	    //var reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
	    var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
	     //验证警戒值
	    if(this.transAmout!='' && this.transAmout != undefined){
	    	if (!reg.test(this.transAmout)) {
	        this.$toast('请输入0-9999区间',2000)
	        this.transAmout='';
	         this.$refs.transAmout.focus()
	    	}
	  	}
	   
  },
  

 //点击弹出框我知道了方法
  tipSure(){
  	let that = this
  	that.confirShow = false;
  	that.step = that.step +1;
  },
    
  //设置币种
	chooseCompleted(){  
		let that = this
		// that.funNum = 0;
		if(that.coinName == ''){
			that.$toast('请输入币种名称',3000)
			return
		}
		if (that.moneyNumber == ''){
			that.$toast('币种数量不能为空且只能为数字',3000)
			return
		}
		/*
		if(that.chooseUserObj.name == ''){
			that.$toast('请选择初始拥有者',3000)
			return
		}
		*/
		/*let arr = that.userList;
		for(var j = 0; j < arr.length; j++) {
		   if(arr[j].userId==that.chooseUserObj.id){
		   	 that.userList[j].amount = that.moneyNumber;
		   }
		} 
		*/
   
     /*
		that.setShow = false;
	  that.hasSettedShowUser = true;
	  
		clearTimeout(that.timer1);
		that.timer1 = setTimeout(function(){
			 that.confirShow = true;
		},500)
	  
	  */
	 
	//设置币种
	that.setShow = false;
  
	} 
	  
 },
  	
	//离开页面清除定时器
   beforeDestroy() {
	   if(this.timer) {
		　　clearInterval(this.timer); //关闭
		
	   }
	   if(this.timer1) {　　
				clearTimeout(this.timer1); //关闭
        clearInterval(this.timer2); //关闭
			}
	
	  this.websocketclose();
   },
   destroyed() {
      window.onresize = null;
     
    }
  }
