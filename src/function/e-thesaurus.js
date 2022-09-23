import comHeader from '@/components-teach/sheader';
/*
import Swiper , { Navigation, Pagination }from 'swiper';
Swiper.use([Navigation, Pagination]);
*/
import {visitCourse,courseDatail} from '@/API/api-teach'
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default{
	data(){
		return{
			menuShow:false,//上方菜单按钮是否显示
	  	funNum:0,//左侧点击判断工具箱
	    showTool:false,//左侧工具箱是否显示	 
	    menuText:'启蒙篇-名词库',
	    courseId:1,
	    
	    cateList:[
	      {name:'Blockchain',intro:'Blockchain is a new application mode of distributed data storage, point-to-point transmission, consensus mechanism, encryption algorithm and other computer technologies. Is a shared distributed ledger in which transactions are executed through additional blocks'},
	      {name:'Block',intro:'The connection between blockchain and big data'},
	      {name:'Block Headers',intro:'The connection between blockchain and big data'},
	      {name:'Mr Nakamoto',intro:'The connection between blockchain and big data'},
	      {name:'Cryptocurrency',intro:'The connection between blockchain and big data'},
	      {name:'Node',intro:'The connection between blockchain and big data'},
	      {name:'Oracles',intro:'The connection between blockchain and big data'},
	      {name:'Decentralization',intro:'The connection between blockchain and big data'},
	    ],
	  category_id:'',
	  cat_index:'',
     prevnextShow:false,
     
    swiperOption: {
        slidesPerView:3,
			  spaceBetween:50,
			   slidesPerGroup:3,
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
	filters: {
    //超过15位显示 ...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 15) {
        return value.slice(0, 15) + "...";
      }
      return value;
    },
    sortNumber:function(value){
    	if(value<10){
    		return '0'+value
    	}else{
    		return value;
    	}
    }
    
    
    
 },
	components:{
		comHeader,swiper, swiperSlide
	},
	computed: {
		 
	},
	methods:{
		//点击菜单图标
	  clickMenu(){
	 	  this.menuShow = !this.menuShow
	  },
	  swiper(){
	  		var swiper=new Swiper ('.swiper-container', {
	  			observer:true,//修改swiper自己或子元素时，自动初始化swiper
	        observeParents:true,//修改swiper的父元素时，自动初始化swiper
	  			 effect : 'fade',
				  fadeEffect: {
				    crossFade: true,
				  },
			    slidesPerView:3,
			    spaceBetween:50,
			    slidesPerGroup:3,// 每屏滚动几个

			    // 如果需要分页器
			     pagination:{
	          el:'.swiper-pagination',
	          clickable:true,
	          
	          renderBullet: function (index, className) {
		          return '<span class="' + className + '">' + (index + 1) + '</span>';
		        },
	          
	          
	        },	
	         navigation: {
		          nextEl: '.swiper-button-next',
		          prevEl: '.swiper-button-prev',
		        },

			    // 如果需要滚动条
			    scrollbar: '.swiper-scrollbar',



			})  
	  },
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
    	courseDatail().then(res=>{
    		var data2 = [];
    		let obj = res.data	
				let name = this.$route.params.name
				let pname = this.$route.params.pname
			  if(obj){
				   this.cateList = obj[pname][name]
				   if(this.cateList.length>3){
	    	  	this.prevnextShow = true;
	    	  }
		  	}
    	 
    	})
    }
    

	},
	mounted(){
		let that = this;
		this.menuText = this.$route.params.pname+'-'+this.$route.params.name
		that.category_id = this.$route.params.id;
		
		that.$nextTick(function(){
			//this.swiper();
			that.getvisit();
			that.getDataList();
		})
		
	}
}
