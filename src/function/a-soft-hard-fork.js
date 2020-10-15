import comHeader from '@/components-teach/sheader';
import comFooter from '@/components-teach/footer';
import rightTips from '@/components-teach/tips';
import {visitCourse} from '@/API/api-teach'
export default{
	data(){
		return{
		  menuShow:false,//上方菜单按钮是否显示
		  showTool:false,//左侧工具箱是否显示
      confirShow:false,//右侧弹窗
		  funNum:0,//左侧点击判断工具箱
		  menuText:'软分叉与硬分叉',
		  category_id:'',//课程id
      iconUrl_1:require('../assets/teachImg/block_a.png'),//
		  step:1,//当前步骤
		  pageName:52,//
		  operaInfo:{mess:'暂无状态，请先按照右侧步骤提示操作~。',infolist:[]}//底部传递的信息

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
	  	if(that.step==1){
	  		that.step = that.step + 1;
	  	}
      if(that.step==3){
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
      if(num==2 && that.step==2 ){
        that.funNum = num;
        that.step = that.step + 1;
        that.confirShow = true
      }


    },

    gotoStep(num){
      let that = this;
      that.step = that.step + 1;
      that.confirShow = true
    },
    //提现金额提交完成
    D1clickfinish(){
      let that = this;
      that.step = that.step + 1;
      that.confirShow = true
    }
	},
  mounted(){
  let that = this
  this.menuText = '异常篇-'+this.$route.params.name
 	that.category_id = this.$route.params.id;
  that.$nextTick(() => {
    that.confirShow = true
    that.getvisit();
  })
}
}
