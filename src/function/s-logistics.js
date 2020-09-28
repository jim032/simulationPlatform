import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach'
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
			step:1,
	  	operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	  	invisable:false,
	  	
	  	confirShow:false,//右侧弹出框是否显示
	  	pageName:'2-4',//表示场景篇 物流追溯过程
	  	winNum:0,//节点模拟用到此参数这边不需要
	  	
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	    
	    navList:[ 
		    {title:'寄件人',icon:require('../assets/teachImg/logi1.png')},
		    {title:'代收点',icon:require('../assets/teachImg/logi2.png')},
		    {title:'物流',icon:require('../assets/teachImg/logi3.png')},
		    {title:'收件人',icon:require('../assets/teachImg/logi4.png')}
	    ],
	    showNav:true,//三个操作按钮是否显示
	    chainFinsh:false,//存证上链是否完成
	    resultMess:'恭喜您信息登记成功！以下是您的上链哈希',//点击存证上链之后的提示信息
	    
	    //登记人
	    rgisteInfo:{
	    	type:'',//登记的物品类型
	    	name:'',//姓名
		    id:'',//身份证
		    phoneNumber:'',
		    intro:'',//创意说明
		    blocHash:'',//区块哈希
		    blockHeight:'', //区块高度
		    affairHash:'',//事务哈希
		    
	    },
	    
	    //代收点登记信息
	    collectionPoint:{
	    	oddNumber:'',//单号
	    	orgin:'',//始发地
	    	destination:'',//目的地
	    	blocHash:'',//区块哈希
		    blockHeight:'', //区块高度
		    affairHash:'',//事务哈希
	    },
	    
	     //物流
	    logistics:{
	    	blockHeight:'',//区块高度
	    	blocHash:'',//区块哈希
	    	affairHash:'',//事务哈希
	    	
	    },
	    
	    searchText:'',//查询hash
      
      searchStep:0,//查询的步骤
      menuText:'场景篇-物流过程追溯',
			singleStep:true,//单个步骤提示
			category_id:''
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.s_logistics
		},
		addresList(){
			let sarray =[];
			sarray.push('2020-05-18 19:15:32  快递件已到达'+this.collectionPoint.orgin+'某某某快递站等待发货。')
			sarray.push('2020-05-18 19:15:32  快递件已由XXXX物流公司签收并发往XXXXXXXXXX。')
			sarray.push('2020-05-18 19:15:32  快递件已由XXXXXXXXXXX签收并发往XXXXXXXXXXX。')
			sarray.push('2020-05-18 19:15:32  快递件已由XXXXXXXXXXX签收并发往'+this.collectionPoint.orgin+'XXXXXXXXXXX。')
			sarray.push('2020-05-18 19:15:32  快递已签收，并由收件人取走。')
			return sarray;
		}
	},
	filters: {
      formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
     return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
 },
mounted(){
		let that = this;
	  this.menuText = '场景篇-'+this.$route.params.name
	  that.category_id = this.$route.params.id;
		that.getvisit();
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
	  	//that.step = that.step +1;
	  	that.confirShow = false; 	
	  },
	  //点击当前操作状态
	  functionStep(num){
	  	let that = this
	  	if(num==1){
	  		if(that.step!=1){	
	  			that.operaInfo.infolist=[]
	  	  	that.operaInfo.mess='寄件人登记信息。'//底部传递的信息
	  		  that.operaInfo.infolist.push('哈希：'+that.rgisteInfo.affairHash)
	  		}else{
	  		that.showNav = false
	  		
	  		}
	  	}else if(num==2){		
	  		switch(parseInt(that.step)){
	  			case 1:
	  			  that.$toast('请先寄件人信息存证上链',2000)
	  			  break;
	  			case 2:
	  			  that.showNav = false	  			
	  			  break;
	  			default:
	  			  that.operaInfo.infolist=[]
	  			  that.operaInfo.mess='代收点登记信息。'//底部传递的信息
	  			  that.operaInfo.infolist.push('哈希：'+that.collectionPoint.affairHash)
	  			  that.operaInfo.infolist.push('单  号：'+that.collectionPoint.oddNumber)
	  			  break
	  		}
	  	}else if(num==3){
	  		switch(parseInt(that.step)){
	  			case 1:
	  			  that.$toast('请先寄件人信息存证上链',2000)
	  			  break;
	  			case 2:
	  			  that.$toast('请先点击代收点存证上链',2000)
	  			  break;
	  			case 3:
	  			  that.showNav=false;
	  			  break;
	  			default:
	  			  that.operaInfo.infolist=[]
	  			  that.operaInfo.mess='物流存证上链。'//底部传递的信息
	  			  that.operaInfo.infolist.push('哈希：'+that.logistics.affairHash)
	  			   break;
	  		}
	  	}else{
	  		that.searchText = '';
	  		switch(parseInt(that.step)){
	  			case 1:
	  			  that.$toast('请先寄件人信息存证上链',2000)
	  			  break;
	  			case 2:
	  			  that.$toast('请先点击代收点存证上链',2000)
	  			  break;
	  			case 3:
	  			  that.$toast('请先点击物流存证上链',2000)
	  			  
	  			  break;
	  			default:
	  			  that.showNav=false;
	  			  break;
	  		}
	  	}
	  	
	  },
	  //点击输入框的返回按钮
	  stepBack(){
	  	let that = this
	  	that.showNav = true
	  },
	  //登记人信息
	  funstep1(){
	  	let that = this;
	  	let obj = that.rgisteInfo
	  	if(obj.type==''){
	  		that.$toast('请输入物品类型',2000)
	  		return;
	  	}
	  	
	  	if(obj.name==''){
	  		that.$toast('请输入登记姓名',2000)
	  		return;
	  	}
	    if(obj.workTitle == ''){
	      that.$toast('请输入 著作标题',2000)
	  		return;
	    }
	    if(obj.id == ''){
	    	that.$toast('请输入身份证号',2000)
	  		return;
	    }
	 
	    if(obj.id.length != 18){
	    	that.$toast('请输入正确的身份证号',2000)
	  		return;
	    }
	    if(!that.checkIDCard(obj.id)){
	    	that.$toast('请输入正确的身份证号',2000)
	  		return;
	    }
	    if(obj.phoneNumber== ''){
	    	that.$toast('请输入手机号',2000)
	    	return;
	    }
	    if(!/^1[3456789]\d{9}$/.test(obj.phoneNumber)){
	    	that.$toast('请输入正确的手机号',2000)
	    	return;
	    }
	    if(obj.intro == ''){
	    	that.$toast('请输入创意说明',2000)
	  		return;
	    }
	   
	    that.showNav = false;
	    that.chainFinsh = true;	    
	    that.rgisteInfo.affairHash = 'abe78a5340b66ca5f75b94fa5c4d06b589fe30f7b751b8cdb3a7e4833278bbe2'
	    that.rgisteInfo.time = Date.parse(new Date())
	  },
	  
	  //代收点登记
	  funstep2(){
	  	let that = this;
	  	let obj = that.collectionPoint
	  	if(obj.oddNumber == ''){
	  		that.$toast('请输入订单号',2000)
	  		return;
	  	}
	  	if(!/^[A-Za-z0-9]+$/.test(obj.oddNumber)){
	  		that.$toast('请输入正确的物流单号',2000)
	  		return;
	  	}
	  	if(obj.orgin == ''){
	  		that.$toast('请输入始发地',2000)
	  		return;
	  	}
	  	if(obj.destination == ''){
	  		that.$toast('请输入目的地',2000)
	  		return;
	  	}
	  	that.showNav = false;
	    that.chainFinsh = true;	    
	    that.collectionPoint.affairHash = 'q2e3w2eq3w2e3qe295da6s5da6d5415e1q4w56e4q6w54e6565dasd'
	    that.collectionPoint.time = Date.parse(new Date())
	  },
	  
	  
	  //物流存证上链
	  funstep3(){
	  	let that = this
	  	that.showNav = false;
	    that.chainFinsh = true 
	    that.logistics.affairHash = '12e3w2eq3w2e3qe295da6s5da6d5fffde1q4w56e4q6w54e6565das3'
	    that.logistics.time = Date.parse(new Date())
	  },
	  
	  //存证上链确认
	  sureChain(){
	  	 let  that = this
	  	 that.showNav = true;
	  	 that.chainFinsh = false
	  	 if(that.step==1){
	  	  	that.rgisteInfo.blockHeight = '256'
	  			that.rgisteInfo.blocHash = 'd5asw5e4qw512das2d6we99q7e54f3a5s14a32f1afgfdg32eqw5e';
	  			that.step = that.step + 1;
	  			return;
	  	 }
	  	 if(that.step==2){
	  	  	that.collectionPoint.blockHeight = '368'
	  			that.collectionPoint.blocHash = 'f5abw5e4qw512dfs2d6we99q7e54f3a5s14a32f1afgfdg32eqw55'
	  			that.step = that.step + 1;
	  			return;
	  	 }
	  	 if(that.step==3){
	  	  	that.logistics.blockHeight = '600'
	  			that.logistics.blocHash = 'weq3595cdas12d6q5we610f2a1ds563665c9as8d8asdasdczxc'
	  			that.step = that.step + 1;
	  			return;
	  	 }
	  	 
	  	
	  },
	  
	  //点击查询hash
	  serach(){
	  	let that = this;
	  	if(that.searchText.replace(/\s*/g,'')!=that.rgisteInfo.affairHash){
	  		
	  		that.$toast('请输入正确的哈希值',2000)
	  	}else{
	  		that.searchStep = 1
	  	}
	  },
	  
	  //信息查询back
	  searchBack(){
	  	if(this.searchStep!=1){
	  		this.searchStep = this.searchStep -1;
	  	}
	  	
	  },
	  
	  //点击查询结果中的下一页
	  nextSearch(num){
	  	let that = this
	  	console.log(num)
	  	if(num==1){
	  		//num为1表示点击下一步
	  		that.searchStep = 2
	  	}else if(num==2){
	  		that.searchStep = 3
	  	}
	  	else{
	  		that.searchStep = 0
	  		that.showNav = true;
	  		that.confirShow = true;
	  		that.searchHash ='';
	  	}
	  	//console.log(that.searchStep);
	  },
	  //验证身份证号的合法性  
	  checkIDCard(idcode){
    // 加权因子
    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    // 校验码
    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
    var code = idcode + "";
    var last = idcode[17];//最后一位
    var seventeen = code.substring(0,17);
    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for(var i = 0; i < len; i++){
        num = num + arr[i] * weight_factor[i];
    } 
    // 获取余数
    var resisue = num%11;
    var last_no = check_code[resisue];
    // 格式的正则 
    /*
		  第一位不可能是0
		  第二位到第六位可以是0-9
		  第七位到第十位是年份，所以七八位为19或者20
		  十一位和十二位是月份，这两位是01-12之间的数值
		  十三位和十四位是日期，是从01-31之间的数值
		  十五，十六，十七都是数字0-9
		  十八位可能是数字0-9，也可能是X
    */
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    // 判断格式是否正确
    var format = idcard_patter.test(idcode);
    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format ? true : false;
   },
   

	}
}