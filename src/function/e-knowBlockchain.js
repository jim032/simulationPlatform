import comHeader from '@/components-teach/sheader';
/*
import Swiper , { Navigation, Pagination }from 'swiper';
Swiper.use([Navigation, Pagination]);
*/
import {visitCourse,courseDatail} from '@/API/api-teach'

import { swiper, swiperSlide } from "vue-awesome-swiper";
//import "swiper/dist/css/swiper.css";
export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示	 
	    menuText:'Enlightenment - first knowledge of blockchain',
	    courseId:1,
	    
	    cateList:[
	      {icon:require('../assets/teachImg/logi4.png'),name:'Blockchain and bitcoin',intro:['Blockchain technology is the underlying technology of bitcoin','Bitcoin is the first application based on blockchain technology']},
	      {icon:require('../assets/teachImg/logi4.png'),name:'Blockchain and big data',intro:['The connection between blockchain and big data','The difference between the two']},
	      {icon:require('../assets/teachImg/logi4.png'),name:'Blockchain and database',intro:['Distributed control','Historical Technology','Scope of application']},
	      {icon:require('../assets/teachImg/logi4.png'),name:'Blockchain and network',intro:['Blockchain from the perspective of Internet','Internet from the perspective of blockchain']},
	    ],
	    dialogWidth:0,
	    //点击详情弹出框
	    centerDialogVisible:false,
      
      category_id:'',
      specific_pic:'',//点击查看详情显示的文字
      specific_title:'',//点击查看详情的标题
      
      prevnextShow:false,//左右滑动按钮是否显示
      swiperOption: {
        slidesPerView:3,
        slidesPerGroup:3,
			  spaceBetween:50,
			  
        notNextTick: true,
        autoplay:false,
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
      
		}
		
	},
	computed: {
 
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
		comHeader,swiper,
    swiperSlide
	},
	
	methods:{
		//设置弹出框宽度
	    setDialogWidth() {

	      var val = document.body.clientWidth
	      const def = 900 // 默认宽度
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
    getDataList(){
    	//console.log(123)
    	courseDatail().then(res=>{
    		var data2 = [];
    		let obj = res.data	
				let name = this.$route.params.name
				let pname = this.$route.params.pname
    	  this.cateList = obj[pname][name].sections;
   
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
			//that.swiper();
			that.getvisit();
			that.getDataList();
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
