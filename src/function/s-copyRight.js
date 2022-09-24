import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach'
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
			step:1,
	  	operaInfo:{mess:'No status, please follow the steps on the right.',infolist:[]},//底部传递的信息
	  	blockPro:0, //部署合约的进度
	  	isBlcok:false,//是否展示节点计算进度条
	  	invisable:false,
	  	
	  	confirShow:false,//右侧弹出框是否显示
	  	pageName:'2-3',//表示场景篇 区块链加版权
	  	winNum:0,//节点模拟用到此参数这边不需要
	  	
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示
	    
	    navList:[ 
		    {title:'Registrant',icon:require('../assets/teachImg/cr_1.png')},
		    {title:'Publisher',icon:require('../assets/teachImg/cr_2.png')},
		    {title:'Investigation Division',icon:require('../assets/teachImg/cr_3.png')}
	    ],
	    showNav:true,//三个操作按钮是否显示
	    chainFinsh:false,//存证上链是否完成
	    resultMess:'Congratulations! Copyright certificate on the chain successfully! Here is your uplink hash. You can query it through the verification office:',
	    resultMess1:'Congratulations! Copyright certificate on the chain successfully! Here is your uplink hash:',
	    //登记人
	    rgisteInfo:{
	    	name:'',//姓名
		    workTitle:'',//版权
		    id:'',//身份证
		    intro:'',//创意说明
		    blockHeight:'',//区块高度
		    blocHash:'',//区块哈希
		    affairHash:'',
	    },
	     //出版社
	    press:{
	    	blockHeight:'',//区块高度
	    	blocHash:'',//区块哈希
	    	affairHash:'',//事务哈希
	    },
	    searchHash:'',//查询hash
      
      searchStep:0,//查询的步骤
      menuText:'Scenes - Copyright preservation',
      singleStep:true,//单个步骤提示
			category_id:''
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.s_copyRight
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
 	this.menuText = 'Scenes-'+this.$route.params.name
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
	  	  	that.operaInfo.mess='Registration information.'//底部传递的信息
	  		  that.operaInfo.infolist.push('Hash：'+that.rgisteInfo.affairHash)
	  		}else{
	  		that.showNav = false
	  		
	  		}
	  	}else if(num==2){
	  		switch(parseInt(that.step)){
	  			case 1:
	  			  that.$toast('Please register the information first',2000)
	  			  break;
	  			case 2:
	  			  that.showNav = false

	  			  break;
	  			case 3:
	  			  that.operaInfo.infolist=[]
	  			  that.operaInfo.mess='The publishing house supports the chain of the deposit certificate.'//底部传递的信息
	  			  that.operaInfo.infolist.push('Hash：'+that.press.affairHash)
	  			  break
	  		}
	  	}else{
	  		that.searchText = '';
	  		switch(parseInt(that.step)){
	  			case 1:
	  			  that.$toast('Please register the information first',2000)
	  			  break;
	  			case 2:
	  			  that.$toast('Please click the publishing house certificate to link',2000)
	  			  break;
	  			case 3:
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
	  //输入密码存证上链
	  funstep1(){
	  	let that = this;
	  	let obj = that.rgisteInfo
	  	if(obj.name==''){
	  		that.$toast('Please enter your registered name',2000)
	  		return;
	  	}
	    if(obj.workTitle == ''){
	      that.$toast('Please enter the title of the work',2000)
	  		return;
	    }
	    if(obj.id == ''){
	    	that.$toast('Please enter your ID number.',2000)
	  		return;
	    }
	 
	    if(obj.id.length != 18){
	    	that.$toast('Please input the correct ID number.',2000)
	  		return;
	    }
	    if(!that.checkIDCard(obj.id)){
	    	that.$toast('Please input the correct ID number.',2000)
	  		return;
	    }
	    if(obj.intro == ''){
	    	that.$toast('Please input the description of your idea',2000)
	  		return;
	    }
	   
	    that.showNav = false;
	    that.chainFinsh = true;	    
	    that.rgisteInfo.affairHash = 'd5asw5e4qw512das2d6we99q7e54f3a5s14a32f1afgfdg32eqw5e'	
	    that.rgisteInfo.time = Date.parse(new Date())
	  },
	  
	  //出版社存证上链
	  funstep2(){
	  	let that = this
	  	that.showNav = false;
	    that.chainFinsh = true 
	    that.press.affairHash = 'f5abw5e4qw512dfs2d6we99q7e54f3a5s14a32f1afgfdg32eqw55'
	    that.press.time = Date.parse(new Date())
	  },
	  
	  //存证上链确认
	  sureChain(){
	  	 let  that = this
	  	
	  	 that.showNav = true;
	  	 that.chainFinsh = false
	  	 if(that.step==1){
	  	 	  that.rgisteInfo.blockHeight = '78'
	  			that.rgisteInfo.blocHash = 'e1qw5e4qw5r4q5w12fd1sf5we4r5ewr5ewrwer21fs2'
	  			that.step = that.step + 1;
	  			return;
	  	 }
	  	 if(that.step==2){
	  	 	that.press.blockHeight = '120'
  			that.press.blocHash = 'q2e3w2eq3w2e3qe295da6s5da6d5415e1q4w56e4q6w54e6565dasd'
  			that.step = that.step + 1;
  			return;
	  	 }
	  },
	  
	  //点击查询hash
	  serach(){
	  	let that = this;
	  	
	  	if(that.searchHash.replace(/\s*/g,'')!=that.rgisteInfo.affairHash){
	  		that.$toast('Please enter the correct hash value',2000)
	  	}else{
	  		that.searchStep = 1
	  	}
	  },
	  
	  //点击查询结果中的下一页
	  nextSearch(num){
	  	let that = this
	  	if(num==1){
	  		//num为1表示点击下一步
	  		that.searchStep = 2
	  	}else{
	  		that.searchStep = 0
	  		that.showNav = true;
	  		that.confirShow = true;
	  		that.searchHash ='';
	  	}
	  	
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