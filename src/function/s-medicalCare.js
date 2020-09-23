import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
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
	  	pageName:'2-1',//表示场景篇 病历信息共享
	  	winNum:0,//节点模拟用到此参数这边不需要
	  	
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	    
	    navList:[ 
		    {title:'医院A',icon:require('../assets/teachImg/logi1.png')},
		    {title:'医院B',icon:require('../assets/teachImg/logi2.png')},
		    {title:'医院C',icon:require('../assets/teachImg/logi3.png')},
		    {title:'病人',icon:require('../assets/teachImg/yy_2.png')}
	    ],
	    showNav:true,//三个操作按钮是否显示
	    chainFinsh:false,//存证上链是否完成
	    resultMess:'恭喜您信息登记成功！以下是您的上链哈希',//点击存证上链之后的提示信息
	    
	    hospitalA:{
	    	id:'A',
	    	authorized:false,//是否授权
	    	name:'医院A',
	    	islinked:false,//是否对病人进行上链
	    },
	    hospitalB:{
	    	id:'B',
	    	authorized:false,
	    	name:'医院B',
	    	islinked:false,
	    },
	    hospitalC:{
	    	id:'C',
	    	authorized:false,
	    	name:'医院C',
	    	islinked:false,
	    },
	    
	    rgisteInfo:{
	    	name:'',//病人姓名
	    	medicalTime:'',//就诊时间
	    	doctor:'',//就诊医生
	    	medicalDescription:'',//就诊描述
	    	affairHash:'',//事务哈希
	    	blockHash:'',//事务哈希
	    	blockHeight:'',//区块高度	
	    	linkTime:''//上链时间
	    
	    },
	    
	    cur_Hospital:{},//表示当前点击的是哪个对象
	     
	     medicalRecord:[],//就诊记录
	     
	    searchText:'',//查询hash   
      menuText:'场景篇-病历信息共享',
      showAuthorize:false,//授权列表框是否显示
      
      curHospital:0,
      
      showOperation:false,//用户查询和操作的那个是否显示
      
      showForm:false,//上链表单是否显示
      
      searchFunction:false,//查询操作框
      
      showSearch:false, //查询框单独框是否显示
      
      showResult:false,//信息查询结果
      singleStep:true,//单个步骤提示
			
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.s_medicalCare
		},
		
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

	methods:{
		//点击菜单图标
	  clickMenu(){
	 	  this.menuShow = !this.menuShow
	  },
	   //点击弹出框我知道了方法
	  tipSure(){
	  	let that = this
	  	//that.step = that.step +1;
	  	that.confirShow = false;
	  	that.showNav = true;
	  	that.showResult =false
	  },
	  //点击当前操作状态
	  functionStep(num){
	  	let that = this;
	  
	  	//点一个点击的医院，默认用户对该医院进行授权
      switch(parseInt(num)){
      	case 1: 
      	  that.showNav = false
      	  that.searchFunction = true;
      	  that.curHospital = 1;
          that.cur_Hospital = that.hospitalA;
      	  break;
      	case 2:
      	  that.curHospital = 2
      	  that.showNav = false
      	  that.searchFunction = true;
      	  that.cur_Hospital = that.hospitalB;
      	  break;
      	case 3:
      	  that.curHospital = 3
      	  that.showNav = false
      	  that.searchFunction = true;
          that.cur_Hospital = that.hospitalC;
      	  break;      	  
      	case 4:
      	    that.showNav = false
      	    that.showAuthorize = true
      	  return;
      	  break;
      }
	  },
	  //点击输入框的返回按钮
	  stepBack(){
	  	let that = this
	  	that.showNav = true
	  	
	  	that.showAuthorize = false //授权框
	  	that.showForm = false //信息填写框
	    that.searchFunction = false //搜索框和上链框
      that.showSearch = false //搜索框
      
      that.showResult =false//信息查询结果
	  },
	  
	  //点击查询，弹出查询框
	  f_showSearch(){
	  	let that = this;
	  	console.log('123:'+that.rgisteInfo.affairHash)
	  	if(that.rgisteInfo.affairHash==''){
	  		that.$toast('暂无病人信息，请先上链病人信息',3000);
	  		return;
	  	}
	  	if(!that.cur_Hospital.authorized){
	  		that.$toast('请点击用户对该医院进行授权',3000);
	  		return;
	  	}
	  	that.showSearch = true;
	  
	  	that.searchFunction = false;
	  },
	  
	  //点击上链 上链默认上链成功
	  LinkedForm(){
	  	let that = this;
	  	if(that.rgisteInfo.affairHash!=''){
	  		that.$toast("病人信息已完善！",2000)
	  	}else{
	  	that.showNav = false
	  	that.showForm = true;
	  	that.searchFunction = false //搜索框和上链框
	  	}
	  },
	  //点击用户对医院权限控制
	  hauthorize(num){
	  	let that = this;
	  	switch(parseInt(num)){
	  		case 1:
	  		  that.hospitalA.authorized = !that.hospitalA.authorized
	  		  that.showAuthorize = false;
	  		  that.showNav = true;
	  		  break;
	  		case 2:
	  		  that.hospitalB.authorized = !that.hospitalB.authorized
	  		  that.showAuthorize = false;
	  		  that.showNav = true;
	  		  break;
	  		case 3:
	  		  that.hospitalC.authorized = !that.hospitalC.authorized
	  		  that.showAuthorize = false;
	  		  that.showNav = true;
	  		  break;
	  	}
	  },
	  //登记人信息
	  funstep1(){
	  	let that = this;
	  	let obj = that.rgisteInfo
	  	if(obj.name==''){
	  		that.$toast('请输入病人姓名',2000)
	  		return;
	  	}
	  	
	  	if(obj.medicalTime==''){
	  		that.$toast('请输入病人就诊时间',2000)
	  		return;
	  	}
	    if(obj.doctor == ''){
	      that.$toast('请输入 病人就诊医生',2000)
	  		return;
	    }
	  
	    if(obj.medicalDescription== ''){
	    	that.$toast('请输入病人的就诊描述',2000)
	    	return;
	    }
   
	    that.showNav = false;
	    that.chainFinsh = true;	 
	  	that.showForm = false //信息填写框
	  	if(that.curHospital==1){	
	  		
	  		that.rgisteInfo.hid = 'A'
	  		that.hospitalA.islinked = true;	 
	  		that.cur_Hospital = that.hospitalA;
	  	}else if(that.curHospital==2){
	  		that.hospitalB.islinked = true
	  		that.rgisteInfo.hid = 'B'	
	  		that.cur_Hospital = that.hospitalB;
	  	}else{	  		
	  		that.hospitalC.islinked = true
	  		that.rgisteInfo.hid = 'C'	  	
	  		that.cur_Hospital = that.hospitalC;
	  	}  
	  	that.rgisteInfo.affairHash = 'abe78a5340b66ca5f75b94fa5c4d06b5cdb3a7e4833278bbe2'
	    that.rgisteInfo.linkTime = Date.parse(new Date())
	  },
	  
	  
	  
	  //存证上链确认
	  sureChain(){
	  	 let  that = this
	  	 that.showNav = true;
	  	 that.chainFinsh = false;
	  	 if(that.curHospital==1){
	  	  	that.rgisteInfo.blockHeight = '68'
	  			that.rgisteInfo.blocHash = 'd5asw5e4qw512das2d6we99q7e54f3a5s14a32f2eqw5e';	  		
	  			that.hospitalA.authorized = true;
	  			return;
	  	 }
	  	 if(that.curHospital==2){
	  	  	that.rgisteInfo.blockHeight = '68'
	  			that.rgisteInfo.blocHash = 'd5asw5e4qw512das2d6we99q7e54f3a5s14a32f2eqw5e';
	  			that.hospitalA.authorized = true;
	  			return;
	  	 }
	  	 if(that.curHospital==3){
	  	  	that.rgisteInfo.blockHeight = '68'
	  			that.rgisteInfo.blocHash = 'd5asw5e4qw512das2d6we99q7e54f3a5s14a32f2eqw5e';	  			
	  			that.hospitalA.authorized = true;
	  			return;
	  	 }
	  	 
	  	
	  },
	  nextSearch(){
	  	this.confirShow = true;
	  },
	  
	  //点击查询hash
	  serach(){
	  	let that = this;
	  	let searchValue = '';
	  	
	  	if(that.searchText.replace(/\s*/g,'')!=that.rgisteInfo.affairHash){
	  		that.$toast('请输入正确的hash',3000)
	  	}
	  	that.showResult = true
	  	that.showNav = false
	  	that.showSearch =false
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