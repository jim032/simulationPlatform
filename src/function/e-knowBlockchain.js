import comHeader from '@/components-teach/sheader';
import Swiper , { Navigation, Pagination }from 'swiper';
import {visitCourse,courseDatail} from '@/API/api-teach'
Swiper.use([Navigation, Pagination]);
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示	 
	    menuText:'启蒙篇-初识区块链',
	    courseId:1,
	    
	    cateList:[
	      {icon:require('../assets/teachImg/logi4.png'),name:'区块链与比特币',intro:['区块链技术是比特币的底层技术','比特币是基于区块链 技术的第一个应用']},
	      {icon:require('../assets/teachImg/logi4.png'),name:'区块链与大数据',intro:['区块链与大数据的联系','两者区别']},
	      {icon:require('../assets/teachImg/logi4.png'),name:'区块链与数据库',intro:['分散式控制','历史技术','适用范围']},
	      {icon:require('../assets/teachImg/logi4.png'),name:'区块链与网络',intro:['从互联网看区块链','从区块链看互联网']},
	    ],
	    dialogWidth:0,
	    //点击详情弹出框
	    centerDialogVisible:false,
      
      category_id:'',
      specific_pic:'',//点击查看详情显示的文字
      specific_title:'',//点击查看详情的标题
      
      prevnextShow:false,//左右滑动按钮是否显示
      
		}
		
	},
	created() {
    this.setDialogWidth()
  },
	filters: {
    //超过20位显示 ...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    }
 },
	components:{
		comHeader,Swiper,Pagination
	},
	computed: {
		 
	},

	methods:{
		//设置弹出框宽度
	    setDialogWidth() {

	      var val = document.body.clientWidth
	      const def = 700 // 默认宽度
	      if (val < def) {
	        this.dialogWidth =  '80%'
	      } else {
	        this.dialogWidth = def + 'px'
	        
	      }
	    },
		//点击菜单图标
	  clickMenu(){
	 	  this.menuShow = !this.menuShow
	  },
	  swiper(){
	  	new Swiper ('.swiper-container', {
			    slidesPerView:3,
			    spaceBetween:50,
			   // 如果需要分页器
			     pagination:{
	          el:'.swiper-pagination',
	          clickable:true,
	          
	          renderBullet: function (index, className) {
		          return '<span class="' + className + '">' + (index + 1) + '</span>';
		        },
	          
	          
	        },			    
			    // 如果需要滚动条
			    scrollbar: '.swiper-scrollbar',
			    clickable:true,
			    navigation: {
		          nextEl: '.swiper-button-next',
		          prevEl: '.swiper-button-prev',
		        },
			})  
	  },
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
    getData(){
    	courseDatail().then(res=>{
    		var data2 = [];
    		let obj = res.data	
				let name = this.$route.params.name
				let pname = this.$route.params.pname
    	  this.cateList = obj[pname][name].sections
    	  if(this.cateList.length>3){
    	  	this.prevnextShow = true;
    	  }
    	})
    },
    showDetail(src,title){
    	let that = this;
      that.centerDialogVisible=true;
      that.specific_pic = src
      that.specific_title = title
    }

	},
	mounted(){
		let that = this;
	  this.menuText = this.$route.params.pname+'-'+this.$route.params.name
	  that.category_id = this.$route.params.id;
		that.$nextTick(function(){
			that.swiper();
			that.getvisit();
			that.getData();
		})
		window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
		
	},
	destroyed() {
    window.onresize = null;
   }
}
