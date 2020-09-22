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
			transAmout:''//转账金额
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
							that.operaInfo.mess = '此处文本内容为告知正在进行合约的部署:'+that.blockPro+'%';
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
		start = that.currentLocation;
		if (that.chooseUserObj == that.divInfo1.userId){
			that.divInfo1.balance = parseInt(that.divInfo1.balance) + parseInt(transferAmount)
		 	end = that.divInfo1.div
		}
		if (that.chooseUserObj == that.divInfo2.userId){
			that.divInfo2.balance = parseInt(that.divInfo2.balance) + parseInt(transferAmount)
			end = that.divInfo2.div
		}
		if (that.chooseUserObj == that.divInfo3.userId){
			that.divInfo3.balance = parseInt(that.divInfo3.balance) + parseInt(transferAmount)
			end = that.divInfo3.div
		}
		if (that.chooseUserObj == that.divInfo4.userId){
			that.divInfo4.balance = parseInt(that.divInfo4.balance) + parseInt(transferAmount)
			end = that.divInfo4.div
		}
		that.transferShow = false
	  //that.broadCastLine(start,end);//调用划线
  },  
  		
	//点击转账按钮Location表示第几个div
	showFb(location,userId){
		let that = this;
	  that.currentLocation = location;
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
	  let chart = document.getElementById("chart")
	  let arrow = document.getElementById("arrow")  
	  let qarrow = document.getElementById("markerArrow")
	  arrow.style.display = "none"
	  qarrow.style.display = 'block'
	  chart.setAttribute("d", '');
	  chart.removeAttribute("marker-end",'')
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
	 //初始化高度
	 initHeight(){
		let that = this;
		let height= this.$refs.header.$el.offsetHeight+30;  //
	let bottom= this.$refs.bottom.$el.offsetHeight;  //100
	let mainh = window.innerHeight-height-bottom  	
	this.mainheight = mainh > 300 ? mainh : 300 
	
	let pdiv = this.$refs.box_point.offsetTop 
	this.top = (that.mainheight-315)/2;
	
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
  
  
  circleMove(json){
  	let that = this;
    //要操作的元素
    var obj = json.obj;
    //方向(顺时针'+'或逆时针'-')
    var dir = json.dir;
    dir = dir || '+';
    //最大圈数
    var max = json.max;
    max = Number(max) || 'all'; 
    //半径
    var r = json.r;
    r = Number(r) || 100;
    //圆心x轴坐标
     var x0 = json.x0 || parseFloat(that.getCSS(obj,'left'));
    //圆心y轴坐标
    var y0 = json.y0 ||  parseFloat(that.getCSS(obj,'top')) - r;
    //初始夹角，以角度为单位
    var a0 = json.a0;
    a0 = Number(a) || 90;
    //当前夹角
    var a = json.a ||a0;
    //当前圈数
    var num = json.num || 0;
    //清除定时器
    if(obj.timer){return;}
    //声明当前值cur
    var cur = {};
    obj.timer = setInterval(function(){
        //将这些瞬时值储存在obj对象中的属性中
        obj.a = a;
        obj.x0 = x0;
        obj.y0 = y0;
        obj.x = x;
        obj.y = y;
        obj.num = num;
        //如果元素运动到指定圈数则停止定时器
        if(num == max){
            clearInterval(obj.timer);
        }
        //顺时针
        if(dir == '+'){
            a++;
            if(a == a0 + 360){
                a = a0;
                num++;
            }
        //逆时针
        }else{
            a--;
            if(a == a0 - 360){
                a = a0;
                num++;
            }
        }
         cur.left = parseFloat(that.getCSS(obj,'left'));
         cur.top = parseFloat(that.getCSS(obj,'top')); 
         
         
      
         
        //更新left和top值
			        var x = x0 + r*Math.cos(a*Math.PI/180);
			        var y = y0 + r*Math.sin(a*Math.PI/180)
			        test.style.left = x + 'px';
			        test.style.top = y + 'px';    
			    },15);
			 },
			 
			 
			 getCSS(obj,style){
			
			    if(window.getComputedStyle){
			        return getComputedStyle(obj)[style];
			    }
			    return obj.currentStyle[style];
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
	
	//转账成功划线 参数表示划线的开始和结束div
	broadCastLine(start,end) {
		let that = this
		var mysvg = document.getElementById("b_line");
    chart = document.getElementById("chart")
    chart.setAttribute("marker-end",'')
    //调用划线坐标方法获取path的路径
    let lineLoc = that.lineLocation(start,end)
		if(chart) {
		  	chart.setAttribute("d", lineLoc);
			 	length = chart.getTotalLength();
        frames = length;
			//IE代码
			if(!!window.ActiveXObject || "ActiveXObject" in window) {
				var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
				var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
				if(isIE11){
				  if(frames){
					that.Frame();
				  }
				}else{
					that.lineFinsh = true
				  chart.setAttribute("class", 'g-rect-IE1');
				  markerArrow.style.display = 'block'
				  chart.setAttribute("marker-end",'url(#markerArrow)')
				}
			
			} else {
				if(frames){
					that.Frame();
				  }
			}
		}
	},
	//划线动画效果
  Frame() {
  	let that = this;
	  window.clearInterval(rid);
	  chart = document.getElementById("chart")
	  arrow.style.display = "block"
	  chart.style.strokeDasharray = length;
	  chart.style.strokeDashoffset = length-10;
	  let point1, point2; 
	  rid = setInterval(that.Frame,100);
	  
	  chart.style.strokeDashoffset = frames;
	
	  point1 = chart.getPointAtLength(length - frames);
	  point2 = chart.getPointAtLength((length - frames + 2) % length);
	  angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
	  arrow.setAttribute(
	    "transform",
	    "translate(" +
	      [point1.x, point1.y+1] +
	      ")" +
	      "rotate(" +
	      angle * 180 / Math.PI +
	      ")"
	  );
	  frames-=20;
	  if (frames <= 0) {
	   window.clearInterval(rid);
	   arrow.style.display = "none"
	   markerArrow.style.display = 'block'
	   chart.setAttribute("marker-end",'url(#markerArrow)')
	   rid = null;
	   that.lineFinsh = true
	  }
	},
	
	//划线坐标确定
	lineLocation(start,end){
		let lines = ''
		if(start==1){
			end==2?lines='M 100,120 C 166,50 232,50 295,108':end==3?lines='M 100,120 C 233,30 366,30 495,108':lines='M 100,120 C 300,10 500,10 695,108'
		}else if(start==2){
			end==1?lines='M 300,120 C 232,50 166,50 95,108':end==3?lines='M 300,120 C 366,50 432,50 495,108':lines='M 300,120 C 433,30 566,30 695,108'
		}else if(start==3){
			end==1?lines='M 500,120 C 366,30 233,30 95,108':end==2?lines='M 500,120 C 432,50 366,50 295,108':lines='M 500,120 C 566,30 632,30 695,108'
		}
		 else if(start==4){
			end==1?lines='M 700,120 C 500,10 300,10 95,108':end==2?lines='M 700,120 C 566,30 433,30 295,108':lines='M 700,120 C 632,30 566,30 495,108'
		}

		return lines;
		
	}

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
	      
	       //that.circleMove({obj:test,r:150,dir:'-',x0:test.x0,y0:test.y0,a:test.a,num:test.num});
	       //that.circleMove({obj:test,r:150,dir:'-',x0:test.x0,y0:test.y0,a:test.a,num:test.num,max:1});
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
