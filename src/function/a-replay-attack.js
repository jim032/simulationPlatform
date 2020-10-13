import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
export default{
	data(){
		return{
		  menuShow:false,//上方菜单按钮是否显示
		  showTool:false,//左侧工具箱是否显示
      confirShow:false,//右侧弹窗
		  funNum:0,//左侧点击判断工具箱
		  menuText:'异常篇-重放攻击',
      iconUrl_1:require('../assets/teachImg/block_a.png'),//
		  step:1,//当前步骤
		  pageName:53,//异常篇重放攻击
		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]},//底部传递的信息
      D2:false,//D框

      wprogress:0, //打包的进度
      delayTimer:null,//延迟执行时间
      lineDraw53Show: false,
      
      singleStep:true,//单个步骤提示
		}
	},
	components:{
		comHeader,comFooter,rightTips
	},
	computed: {
		stepTips(){
			return this.$store.state.a_replayAttack
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
      if(that.step==5){
        that.step = that.step + 1;
        that.delayTimer = setTimeout(function(){
          that.confirShow = true
        },1000)
      }
	  	// if(that.step==4){
      //   that.step = that.step + 1;
      //   that.delayTimer = setTimeout(function(){
      //     that.confirShow = true
      //   },1000)
      // }
	  },
    //点击左边的三个工具箱
    poinfun(num){
      //num==2测速
      let that = this;
      if(num==1  && that.step==2 ){
        that.funNum = num;
        that.D2=true;
        that.step = that.step + 1;
      }
      if(num==2 && that.step==4 ){
        that.funNum = num;
        that.step = that.step + 1;
        that.lineDraw53Show = true;
        let timer = setInterval(function() {
          that.wprogress++;
          if(that.wprogress == 100) {
            clearInterval(timer)
            that.delayTimer = setTimeout(function(){
              that.lineDraw53Show = false;
              that.confirShow = true;
            },500)
          }
        },50)
      }

    },
    gotoStep(num){
      let that = this;
      that.step = that.step + 1;
      that.confirShow = true
    },
    //
    D2clickfinish(){
      let that = this;
      that.step = that.step + 1;
      that.confirShow = false
      that.D2=false
      //增加新的区块

    }
	},
  mounted(){
  let that = this
  that.$nextTick(() => {
    that.confirShow = true
  })
}
}
