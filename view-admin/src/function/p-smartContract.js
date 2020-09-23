var rid = null;
var length=null,frames=null, chart=null;
var angle= 0;

import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import common from '@/function/common';

export default{
	data(){
	  return{
	  	
	  	mainheight:0,//中间区域的高度
	  	top:0,//当前区域的中间居中
	  	menuShow:false,//上方菜单按钮是否显示
	  	
	  	winNum:0,//代表当前不显示获胜节点
	  	pageName:2,//代表页面是发币页面
	  	 	
    	userInfo:[{id:1,text:'用户1'},{id:2,text:'用户2'},{id:3,text:'用户3'},{id:4,text:'用户4'}].reverse(),//左侧拖拽设置四个用户信息进行遍历
    	
    	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	  	confirShow:false,//右侧弹出框是否显示
	  	//底部传递信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	    invisable:true,	 
	  	step:1,
	  	operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~',infolist:[]},//底部传递的信息
	    pointList:[],//四个div的四个点坐标
	    
	    isDrag:false,//拖拽是否放入到指定元素中
	    
	    divInfo1:{status:0},//每个div显示的内容 status = 0 没有完成拖拽 1完成拖拽
	    divInfo2:{status:0},
	    divInfo3:{status:0},
	    divInfo4:{status:0},
	    userList:[],//已经拖拽完成的用户
	    
	    transferShow:false,//转账弹出框显示
	    showUser:false,
	    chooseUserObj:'',//转账选择对象(id)
	    
	    setShow:false,//设置币种弹出框是否显示

			hasSettedShowUser:false, 
	
			coinName:'', //币种名称
			coinNumber:0, 
			deployContractPro:0,
			currentTransferUser:0,
			toastShow: false,
	    toastText: '',
			currentLocation:0,
			
			iconUrl1:require('../assets/teachImg/icon_user1.png'),
			iconUrl2:require('../assets/teachImg/icon_user2.png'),
			iconUrl3:require('../assets/teachImg/icon_user3.png'),
			iconUrl4:require('../assets/teachImg/icon_user4.png'),
			
			lineFinsh:false,//广播划线是否完成
			
			curtransfer:'',//当前转账对象
			transUserList:[],//转账用户列表

			consoleShow:true,//头部控制台是否显示
			menuText:'智能合约部署与调用',
			moneyNumber:'',//设置金额
			transAmout:'',//转账金额
			
			animateCss:'',
			animateUrl:'',
			showPic:false,//动画效果是否展示
			time:'',//gif动画执行
			
			
	  }
	},
  components:{comHeader,comFooter,rightTips},
 computed: {
		stepTips(){
			return this.$store.state.sm_stepTips
		}
	},
	filters:{
		userName:function(value){
		  let str = '';
		  switch(parseInt(value)){
		     case 1:
		       str='用户1'
		       break;
		     case 2:
		       str='用户2'
		       break;
		     case 3:
		       str='用户3'
		       break;
		     case 4:
		       str='用户4'
		       break;
		  }
		  return str	  
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
	methods:{
		poinfun(num){
			let that = this;
			//表示转账

			if(num==2 && that.step==2){
				if (that.hasSettedShowUser){
					return;
				}   
				that.funNum = num;
				that.setShow = true;
				that.hasSettedShowUser = true;
			}  
		
		if (num==3 && that.step==3 && !that.isBlcok){
				that.funNum = num;
	   		that.operaInfo.infolist = [];
			if(that.userList.length==4 && that.step==3){
				that.isBlcok = true;
				//that.isShowBlock = false;
				that.isShowMess = true
				let timer = setInterval(function(){
       	  that.blockPro++;
          if(that.blockPro==100){
	            clearInterval(timer)
	            that.operaInfo.mess = '当前合约正在部署中:'+that.blockPro+'%';
	            that.isBlcok = false;
	            clearTimeout(that.timer1);
						  that.timer1 = setTimeout(function(){
								that.confirShow = true;
							},500)
	            //that.confirShow = true; 
	            that.top = that.top-40;
							that.operaInfo.mess = "当前合约部署完成"
							that.operaInfo.infolist.push('合约地址：合约地址：4b1c95a1ed859cc68abb9819d34ed95d541a6f5c')
							that.operaInfo.infolist.push('资产名称：'+that.coinName)
							that.operaInfo.infolist.push('创建者：'+'用户'+that.chooseUserObj)
							that.$set(that.divInfo1,'operable',1)
   	   	    	that.$set(that.divInfo2,'operable',1)
   	   	    	that.$set(that.divInfo3,'operable',1)
   	   	    	that.$set(that.divInfo4,'operable',1)
							that.blockPro = 0;
		      }else{
							that.operaInfo.mess = '当前合约正在部署:'+that.blockPro+'%';
				  }
        },50)
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
    
  //获取用户余额
	getCurrentTranferBalance(location){
    let that = this;
		switch (location){
			case 1:
				return that.divInfo1.balance
			case 2:
				return that.divInfo2.balance
			case 3:
				return that.divInfo3.balance
			case 4:
				return that.divInfo4.balance
		}
  },
  //确定转账
  submitTranfer(){
      let that = this;
      let  start = null;
      let end = null;
      let transferAmount = document.getElementById("transferAmount").value;
      if (that.getCurrentTranferBalance(that.currentLocation) < transferAmount){
			  that.toast('余额不足')
			return
		}
		if (transferAmount.match(/^-?[0-9]+$/) == null){
			that.toast('转账金额必须是数字')
			return
		}
		
		that.blockPro = 0;
	  that.isBlcok = true;
	  that.operaInfo.infolist = [];
	  that.transferShow = false
	  let timer = setInterval(function(){
   	  that.blockPro++;
   	  start = that.currentLocation;
   	  
   	  if(that.blockPro==40){
   	  	if (that.chooseUserObj == that.divInfo1.userId){
   	  		that.timer1 = setTimeout(function(){
						 	that.divInfo1.balance = parseInt(that.divInfo1.balance) + parseInt(transferAmount)
					},2800)
				
				 	end = that.divInfo1.div
				}
				if (that.chooseUserObj == that.divInfo2.userId){
					that.timer1 = setTimeout(function(){
					that.divInfo2.balance = parseInt(that.divInfo2.balance) + parseInt(transferAmount)
					},2800)
					end = that.divInfo2.div
				}
				if (that.chooseUserObj == that.divInfo3.userId){
					that.timer1 = setTimeout(function(){
					that.divInfo3.balance = parseInt(that.divInfo3.balance) + parseInt(transferAmount)
					},2800)
					end = that.divInfo3.div
				}
				if (that.chooseUserObj == that.divInfo4.userId){
					that.timer1 = setTimeout(function(){
					that.divInfo4.balance = parseInt(that.divInfo4.balance) + parseInt(transferAmount)
					},2800)
					end = that.divInfo4.div
				}
				that.time = new Date();
				that.showAnimate(start,end)
				
   	  }
   	  
      if(that.blockPro==100){
          clearInterval(timer)
          that.operaInfo.mess = '转账事务打包完成';
          that.isBlcok = false;
         
         
					that.blockPro = 0;
					
					switch (that.currentLocation){
						case 1:
							that.divInfo1.balance = parseInt(that.divInfo1.balance) - parseInt(transferAmount)		
							break
						case 2:
							that.divInfo2.balance = parseInt(that.divInfo2.balance) - parseInt(transferAmount)
							break
						case 3:
							that.divInfo3.balance = parseInt(that.divInfo3.balance) - parseInt(transferAmount)
							break
						case 4:
							that.divInfo4.balance = parseInt(that.divInfo4.balance) - parseInt(transferAmount)
							break
					}
					
      }else{
					that.operaInfo.mess = '转账事务打包中:'+that.blockPro+'%';
		  }
    },50)
	  
		/*
		
		
		
	
	
    //调用金币效果	  
	  
	  */
	  
  },  
  		
	//点击转账按钮Location表示第几个div
	showFb(location,userId){
		let that = this;
		if (that.blockPro > 0){
		   return
	   }
	  that.currentLocation = location;
	  that.showPic = false;

	  that.curtransfer = userId;
    that.transUserList= [];
    that.transAmout = '';
	  let arr = that.userList
	  
	  for (var i = 0;i<arr.length;i++){
	  	if(userId!=arr[i].userId){
	  		that.transUserList.push(arr[i])
	  	}
	  }

	  
	  that.chooseUserObj = that.transUserList[0].userId
	  that.transferShow = true;
	},
	//点击菜单图标
	 clickMenu(){
	 	 this.menuShow = !this.menuShow
	 },
	 //点击选择转账用户
	 chooseUser(id){
	 	this.showUser = false
	 	this.chooseUserObj = id;
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
	
	let startx = 0
	let starty = 0
	    
	    
	$(".droppoint").draggable({
	    containment:'.pageWrap',
		  addClasses: true,
		  start:function(event,ui){
		 	   startx = ui.position.left - ui.offset.left
		 	   starty = ui.offset.top - ui.position.top
		     $(".info").addClass("usable");
		     $(this).children(".n_ltips").css({'display':'none'})
		 	   that.menuShow = false
		     //that.operaInfo.mess ='当前节点网络已部署完毕，如需重新学习，请点击上方目录按钮，选择“运行原理”。' 	
		 },
		 stop:function(event,ui){
		 	//临时存放数组和索引的距离
		   	let distanceArray = [];
		   	let id = $(this)[0].getAttribute("data-id")
		   	$(this).draggable({ disabled :true, })
		    //判断是否拖进了目标元素中
		 	if(that.isDrag){
		 		that.isDrag = false;
		 		$(this).remove()
		 		that.userStart(id,that.divnum)
		   }else{
		   	 //未拖拽到目标元素中
		   	  let array = that.pointList 
	 		  for(let j = 0,len=array.length; j < len; j++) {
		 	     let distance = common.distance(ui.offset.left,ui.offset.top+20,array[j].x,array[j].y)
		 	     distanceArray.push({distance,point:{x:array[j].x,y:array[j].y},num:array[j].num,div:array[j].div})   
	      }
	 		  //离他最近的坐标和索引
		 	   let pointInfo = common.getMinIndex(distanceArray);
		 	   let num = pointInfo.num 
		 	   let div = pointInfo.div
		 	    switch(num){
		 	      case 1:
		 	        $(this).animate({left:pointInfo.point.x+4,top:pointInfo.point.y-starty})
		 	        break;
		 	      case 2:
		 	         $(this).animate({left:pointInfo.point.x-45,top:pointInfo.point.y-starty})
		 	         break;
		 	      case 3: 
		 	         $(this).animate({left:pointInfo.point.x-45,top:pointInfo.point.y-starty-45})
		 	         break;
		 	      case 4:
		 	         $(this).animate({left:pointInfo.point.x+4,top:pointInfo.point.y-starty-45})
		 	         break;
		 		}
		 	   this.timer = setTimeout(()=>{ //设置延迟执行
		 	   	  if(div==1){
			 	    	$(".info1").droppable({'disabled':true})
			 	    	$(this).remove()
			 	    }
			 	    else if(div==2){
			 	    	$(".info2").droppable({'disabled':true})
			 	    	$(this).remove()
			 	    }
			 	    else if(div==3){
			 	    	$(".info3").droppable({'disabled':true})
			 	    	$(this).remove()
			 	    }
			 	    else{
			 	    	$(".info4").droppable({'disabled':true})	
			 	    	$(this).remove()
			 	    }
			 	    that.userStart(id,div)
		 	   },400);
		 	   common.clear(pointInfo.div,that.pointList)
		   }
		 }
	    })
	    
	    //可放置拖拽元素放置事件封装
	    $(".info").droppable({
		      accept: ".droppoint",
	        drop: function( event, ui ) {
	        that.isDrag = true;  
	        $(this).droppable({'disabled':true})
	          var  num = event.target.dataset.div			        
	          common.clear(num,that.pointList)     
	          that.divnum = num;  
	      }      
	  	}) 
	      
	 },
      
    //点击信息展示
   showPointInfo(location){
	   let that = this;
	   if (that.blockPro > 0){
		   return
	   }
	   that.isShowBlock = false
	   that.isShowMess = true
	    let obj = {};
	  	switch(parseInt(location)){
				case 1:
		  	 	obj = that.divInfo1; 
		  	 	break;
				case 2:
          obj = that.divInfo2;
		  	 	break;
				case 3:
			     obj = that.divInfo3;  
	  	 	   break;
				case 4:
		  	 	 obj = that.divInfo4;  
	  	 	   break;	  	  	  
			}
	  	that.operaInfo.infolist = [];
	  	if(obj.status==0){
	  	 	   	  that.operaInfo.mess ='您还未拖动用户'
	  	}else if(that.coinName ==''){
				  that.operaInfo.mess =''
				  that.operaInfo.infolist.push('余额：'+ obj.balance)
	  	 	      that.operaInfo.infolist.push('用户地址：'+ obj.address)
	  	 	   } else{
					  that.operaInfo.mess = '币种名称: '+that.coinName;
					  that.operaInfo.infolist.push('账户余额：'+ obj.balance)
					  that.operaInfo.infolist.push('用户地址：'+ obj.address)
			}
   },
       
  //获取可放置拖拽元素四个div的四个点坐标
  initPointInfo(){
     	let that = this;
	  	let top = that.top
	  	let p1 = that.$refs.info1.getBoundingClientRect()
	  	let p2 = that.$refs.info2.getBoundingClientRect()
	  	let p3 = that.$refs.info3.getBoundingClientRect()
	  	let p4 = that.$refs.info4.getBoundingClientRect() 
      let scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
      //引用初始化方法
      that.pointList = common.initPointInfo(top,p1,p2,p3,p4,scrollTop,that.pointList);
  },
  
   validateNum(value) { //验证只能填入数字
	    var reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
	     //验证警戒值
	    if(this.moneyNumber!='' && this.moneyNumber != undefined){
	    	if (!reg.test(this.moneyNumber)) {
	        this.$toast('请输入正整数',2000)
	        this.moneyNumber='';
	        return ;
	    	}
	  	}
  },
  validateNum1(value) { //验证只能填入数字
	    var reg = /(^([-]?)[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^([-]?)(0){1}$)|(^([-]?)[0-9]\.[0-9]([0-9])?$)/
	     //验证警戒值
	    if(this.transAmout!='' && this.transAmout != undefined){
	    	if (!reg.test(this.transAmout)) {
	        this.$toast('请输入正整数',2000)
	        this.transAmout='';
	        return ;
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
		that.coinName = document.getElementById("coinName").value;
		that.coinNumber = document.getElementById("coinNumber").value;
		
		if(that.coinName == ''){
			that.toast('请输入币种名称')
			return
		}
		
		if (that.coinNumber == ''){
			that.toast('币种数量不能为空且只能为数字')
			return
		}
		
		if(that.chooseUserObj == ''){
			that.toast('请选择初始拥有者')
			return
		}
		if (parseInt(this.chooseUserObj) == that.divInfo1.userId){
			that.divInfo1.balance = parseInt(that.coinNumber);
	
		}
		if (parseInt(this.chooseUserObj) == that.divInfo2.userId){
			that.divInfo2.balance = parseInt(that.coinNumber);
		}
		if (parseInt(this.chooseUserObj) == that.divInfo3.userId){
			that.divInfo3.balance = parseInt(that.coinNumber);
		}
		if (parseInt(this.chooseUserObj) == that.divInfo4.userId){
			that.divInfo4.balance = parseInt(that.coinNumber);
		}
		

		that.setShow = false;
	
		clearTimeout(that.timer1);
		that.timer1 = setTimeout(function(){
			 that.confirShow = true;
		},500)
	  },
	  
	  //用户拖拽方法
	  userStart(id,num){
	  	 //id表示用户id,num表示第几个div
	     let that = this;
	     let obj = {}
	     switch(parseInt(num)){
	     	case 1:
         
          that.divInfo1 =that.sragSetInfo(obj,id,num,that.iconUrl1)
	     	  break;
	     	case 2:
          that.divInfo2 =that.sragSetInfo(obj,id,num,that.iconUrl2)
         // that.sragSetInfo(obj,id,num,that.iconUrl)
	     	   break;
	     	case 3:
           that.divInfo3 =that.sragSetInfo(obj,id,num,that.iconUrl3)
           //that.sragSetInfo(obj,id,num,that.iconUrl)
	     	   break;
	     	case 4:
	         that.divInfo4 =that.sragSetInfo(obj,id,num,that.iconUrl4)
            //that.sragSetInfo(obj,id,num,that.iconUrl,)
            break;
	     }
		 
	  },
	  //拖拽完成信息保存
		sragSetInfo(obj,id,num,iconUrl){
			  let that = this;
		  	obj.userId = id;
		  	obj.userName = '用户'+id;
		  	obj.icon = iconUrl;
		  	obj.div = num;
		  	obj.balance = 0;
		  	obj.address = num==1?'6050758d80d291fb21474fbf0830c9852e6462f8':
		  	num==2?'acde4cef5ee607adf56ce582f89fe1050f8a478d':
		  	num==3?'f2c94fff78bdab1ff5078cddd3e62edab5b0e31f':'a0a2cf9e1ef6f4edc314fea2833a3400a3a6af12'
		  	obj.status = 1 ;
		  	that.userList.push(obj);	
		  	if (that.userList.length == 4){
				that.operaInfo.infolist = [];
				clearTimeout(that.timer1);
			  that.timer1 = setTimeout(function(){
					that.confirShow = true;
				},500)
			 }
		  return obj;
		},
	
 },
  	mounted(){
		 	let that = this;
			window.onresize = () => {
		    return (() => {
		        window.screenWidth = document.body.clientWidth
		        that.screenWidth = window.screenWidth;
		        that.initHeight();
		        that.initPointInfo();
		       
		     
		    })()
			}
	
		this.$nextTick(() => {	  	
		  	that.initHeight();
	      that.initPointInfo();
	   
		  })	
	},
	//离开页面清除定时器
   beforeDestroy() {
	   if(this.timer) {
		　　clearInterval(this.timer); //关闭
		
	   }
	   if(this.timer1) {　　
				clearTimeout(this.timer1); //关闭

			}
   },
   destroyed() {
      window.onresize = null;
    }
  }
