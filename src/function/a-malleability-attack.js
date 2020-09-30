import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
export default{
	data(){
		return{
		  menuShow:false,//上方菜单按钮是否显示
		  showTool:false,//左侧工具箱是否显示		
		  funNum:0,//左侧点击判断工具箱
		  menuText:'异常篇-交易延展性',
		  
		  step:1,//当前步骤
		  pageName:'54',

		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
		  singleStep:true,//单步骤提示
		  
		  confirShow:false,

      iconUrl_1:require('../assets/teachImg/icon_user2.png'),//头像
      iconUrl_2:require('../assets/teachImg/icon_user3.png'),//头像
      iconUrl_3:require('../assets/teachImg/icon_user4.png'),//头像

      lineDrawMalleabilityShow: false,
      tansferInfo: [],
      tansferInfoEdit: [],
      wprogressmalleability:0, //打包的进度
      delayTimer:null,//延迟执行时间
      editAmount: 0.0,
      selectIndexDataM: [],
      balance: 850, // tips显示的余额
      balance1: 850,
      balance2: 850,
      balance3: 850,
      isShowAmount: false,
      toEditAmount: ''
    }
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.ecc__stepTips
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
	  	that.confirShow = false;
	  	if(that.step==1){
	  		that.step = that.step + 1;
	  	}
	  },
    //点击左边的三个工具箱
    poinfun(num){
      let that = this;
      if(num==1 && that.step < 3 ){
        that.lineDrawMalleabilityShow = true
        that.isShowAmount = false;
        that.funNum = num;
        that.operaInfo.mess = ''
        that.operaInfo.infolist = [];
      }
      console.log(that.step)
      if(num==2 && that.step==2 && that.tansferInfo.length>0 ) {
        that.step = 3
        that.lineDrawMalleabilityShow = true
        that.funNum = num;
        that.operaInfo.mess = ''
        that.operaInfo.infolist = [];
        for(let i = 0;i < that.tansferInfo.length;i ++) {
          that.selectIndexDataM.push({value: i + 1})
        }
      }
      if(num==3 && that.step == 4){
        that.step = that.step + 1
        that.lineDrawMalleabilityShow = true
        that.funNum = num;
        that.operaInfo.mess = ''
        that.operaInfo.infolist = [];
        let timer = setInterval(function() {
          that.wprogressmalleability++;
          if(that.wprogressmalleability == 100) {
            clearInterval(timer)
            that.lineDrawMalleabilityShow = false
            that.delayTimer = setTimeout(function(){
              that.confirShow = true;
            },500)
          }
        },50)
      }
    },
    sureEditAmount(index) {
      let that = this;
      if(index > 0) {
        that.tansferInfoEdit = [];
        that.tansferInfoEdit.push({
          initiate: that.tansferInfo[index-1].initiate,
          object: that.tansferInfo[index-1].object,
          amount: parseInt(that.tansferInfo[index-1].amount).toFixed(1)
        })
      }
      that.lineDrawMalleabilityShow = false
      that.step = that.step + 1;
    },
    sureTransfer(tansferInfo) {
      let that = this;
      if (that.tansferInfo.length > 2) {
        that.lineDrawMalleabilityShow = false
        return;
      }
      that.lineDrawMalleabilityShow = false
      that.step = 2
      that.confirShow = true;
      if (tansferInfo.initiate == 'A') {
        that.balance1 = that.balance1 - parseInt(tansferInfo.amount)
        if (tansferInfo.object == 'B') {
          that.balance2 = that.balance2 + parseInt(tansferInfo.amount)
        } else if (tansferInfo.object == 'C') {
          that.balance3 = that.balance3 + parseInt(tansferInfo.amount)
        }
        that.balance = that.balance1
      } else if (tansferInfo.initiate == 'B') {
        that.balance2 = that.balance2 - parseInt(tansferInfo.amount)
        if (tansferInfo.object == 'A') {
          that.balance1 = that.balance1 + parseInt(tansferInfo.amount)
        } else if (tansferInfo.object == 'C') {
          that.balance3 = that.balance3 + parseInt(tansferInfo.amount)
        }
        that.balance = that.balance2
      } else if (tansferInfo.initiate == 'C') {
        that.balance3 = that.balance3 - parseInt(tansferInfo.amount)
        if (tansferInfo.object == 'A') {
          that.balance1 = that.balance1 + parseInt(tansferInfo.amount)
        } else if (tansferInfo.object == 'B') {
          that.balance2 = that.balance2 + parseInt(tansferInfo.amount)
        }
        that.balance = that.balance3
      }
      that.tansferInfo.push({
        initiate: tansferInfo.initiate,
        object: tansferInfo.object,
        amount: tansferInfo.amount
      })
    },
    del(index) {
      let that = this;
	    that.tansferInfo.splice(index)
    },
    enter(index) {
      let that = this;
      that.isshowdel = index;
    },
    leave() {
      let that = this;
      that.isshowdel = -1;
    },
    showAmount(user) {
      let that = this;
      that.isShowAmount = true;
      if (user == 1) {
        that.balance = that.balance1;
        that.operaInfo.mess = '当前余额为￥' + that.balance +'。'
        that.operaInfo.infolist = [];
      } else if(user == 2) {
        that.balance = that.balance2;
        that.operaInfo.mess = '当前余额为￥' + that.balance +'。'
        that.operaInfo.infolist = [];
      } else if(user == 3) {
        that.balance = that.balance3;
        that.operaInfo.mess = '当前余额为￥' + that.balance +'。'
        that.operaInfo.infolist = [];
      }
    },
    noShowAmount() {
      let that = this;
      that.operaInfo.mess = ''
      that.operaInfo.infolist = [];
      that.isShowAmount = false;
    },
    showUserAmount(user) {
      let that = this;
      if (user == 'A') {
        that.balance = that.balance1;
      } else if(user == 'B') {
        that.balance = that.balance2;
      } else if(user == 'C') {
        that.balance = that.balance3;
      }
    },
    upToEditAmount(value) {
	    let that = this;
	    that.toEditAmount = parseInt(that.tansferInfo[value-1].amount).toFixed(1)
    }
 	},
  mounted(){
    let that = this
    that.$nextTick(() => {
      that.confirShow = true
    })
  }
}
