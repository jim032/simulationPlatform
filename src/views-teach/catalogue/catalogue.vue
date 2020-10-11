<template>
	<div class="pageWrap homePageWrap"  ref="pageWrap" >
		<div class="headerFun">
		 <div class="hed-fun-box" :class="{'fadeIn':isOperate}">
			 <a class="btn btn_console"  @click="linkConsole"><span></span><em>控制台</em></a>
			  <a class="bindex" @click="signOut">
			  	<span class="icon"></span>
			  	<em>退出</em>
			  </a>
		  </div>
		  <a class="bback" @click="isOperate=!isOperate"></a>
		</div>
		<div class="cataBox" ref="cataBox">
			
			<div class="cataMain" :class="{'cataMain-4':isTab4}">
				<div class="cata-main" >
						<div class="pcat pcat1 cursorPoint" @click="linkSubCatalog(catlog1.id,catlog1.title)" v-if="catlog1.title!=''">
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" src="../../assets/teachImg/cat_icon1.png" />
								<p class="pt">{{catlog1.title}}</p>
							</div>
						</div>
						
						<div class="pcat pcat2 cursorPoint" @click="linkSubCatalog(catlog2.id,catlog2.title)" v-if="catlog2.title!=''">
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" src="../../assets/teachImg/cat_icon2.png" />
								<p class="pt">{{catlog2.title}}</p>
							</div>	
						</div>
						<div class="pcat pcat-zdy cursorPoint" :style="model==2?'width:auto':''" @click="linkCustCatalog" v-if="!isTab4 || model==2">
						   <img src="../../assets/teachImg/circle.png"/>
							 <div class="intro">
								 <img class="introIcon" src="../../assets/teachImg/cat_icon5.png" />
								 <p class="pt">{{catlog5.title}}</p>
							 </div>
						</div>
						<div class="pcat pcat-yl pcat1 cursorPoint" @click="linkSubCatalog(catlog3.id,catlog3.title)" v-if="catlog3.title!=''">
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" src="../../assets/teachImg/cat_icon3.png" />
								<p class="pt">{{catlog3.title}}</p>
							</div>
						</div>
						<div class="pcat pcat-yl pcat2 cursorPoint" @click="linkSubCatalog(catlog4.id,catlog4.title)" v-if="catlog4.title!=''">
						   <img src="../../assets/teachImg/circle.png"/>
							 <div class="intro">
								 <img class="introIcon" src="../../assets/teachImg/cat_icon4.png" />
								 <p class="pt">{{catlog4.title}}</p>
							 </div>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {logout} from '@/API/api'
	import Cookies from 'js-cookie'
	import {pcategoryTree,getCourseClass} from '@/API/api-teach'
	 export default{
	 	data(){
	 		return{
	 			
	 			isOperate:false,
	 			
	 			catalogNum:0,//当前显示菜单项	 			
	 			catlog1:{title:'',id:''}, 
	 			catlog2:{title:'',id:''},
	 			catlog3:{title:'',id:''},
	 			catlog4:{title:'',id:''},
	 			catlog5:{title:'自定义篇',id:''},
		 		boxheight: 0,
		 		bodyH:0,
		 		index: 0,
		 		
		 		isTab4:true,//判断当前自定义篇幅不存在为true,否则为false
		 		
		 		model:'',//当前登录的模式
		 		
		 		courseList:[]//自定义课程列表
	 		}
	 	},
	 	filters:{
	 		handleText(value) {
		      if (!value) return ''
		      if (value.length > 78) {
		        return value.slice(0, 78) + '...'
		      }
		      return value
		    }
	 	},
	 	methods:{
	 		
	 		//获取目录
	 		getData(){
	 			let that = this;
	 			let obj = {};
	 			obj.type = 0;//type为0表示中文名
	      let loginModal = sessionStorage.getItem('loginModal'); //1表示单人，2表示多人
	 			pcategoryTree(obj).then(res=>{
          if(res.code==200){
          	let tmpArray = res.data;
          	let temp = [];
          	console.log(tmpArray);
          	for(let i=0;i<tmpArray.length;i++){
          		if(loginModal &&　loginModal==1 && tmpArray[i].id=="e72d3a24-f983-11ea-adc1-0242ac120002"){
          			//console.log('单人模式')
          			temp = res.data[i].children;
          		
          		}
          		if(loginModal &&　loginModal==2 && tmpArray[i].id=="e72d3a88-f983-11ea-adc1-0242ac120002"){
          		
          			//temp = res.data[i].children;
          			temp = [];
          		}
          	}
            
            
          	for (let j = 0; j < temp.length; j++) {   	         
	            if(temp[j].name=='启蒙篇'){
	            	that.catlog1.title = temp[j].name
	            	that.catlog1.id = temp[j].id
	            	
	            }
	            if(temp[j].name=='场景篇'){
	            	that.catlog2.title = temp[j].name
	            	that.catlog2.id = temp[j].id
	            }
	            if(temp[j].name=='原理篇'){
	            	that.catlog3.title = temp[j].name
	            	that.catlog3.id = temp[j].id
	            }
	            if(temp[j].name=='异常篇'){
	            	that.catlog4.title = temp[j].name
	            	that.catlog4.id = temp[j].id
	            }
	            
            }	
          }else{
          	 that.$toast(res.message,3000)
          }
        })
	 		},
	 		
	 		//退出
    	signOut(){   		
    		let that = this;   		
    		logout().then(res=>{
    			if(res.code==200){
    				sessionStorage.removeItem('stu_userId')
		    		sessionStorage.removeItem('stu_role_id')
		    		sessionStorage.removeItem('loginModal');
		        Cookies.remove('stu_jwt');
						that.$router.push({'path':'/login'})
    			}else{
            that.$toast(res.message,3000)
          }
    		})

    	},
	 		
	 		showCat(num) {
	 			let that = this;
	 			if(that.catalogNum == num) {
	 				that.catalogNum = 0
	 				$(".homePageWrap").stop().animate({height:that.boxheight},500);
	 			}else{
	 				that.catalogNum = num;
	 				if (!that.index) {
	 					$(".cataMain").stop().animate({'padding-bottom':'0'},500)
	 				}
	 				if(num == 3 || num == 4){	 					

	 			        $(".cataMain").stop().animate({'padding-bottom':'100px'},500)

	 			    }else{
	 			    	$(".cataMain").stop().animate({'padding-bottom':'0'},500)
	 			    	
	 			    }
	 				that.index++
	 			}
	 			
	 		},
	 		
	 		//获取自定义篇
	 		getCustomize(){
	 			let that = this;
	 			let obj = {};
	 			obj.type = that.model;
	
	 			getCourseClass(obj).then(res=>{
	 				//console.log(res)
	 				if(res.code==200){
//	 					console.log(res.data.length);
	 					if(res.data.length>0){
		 					this.isTab4 = false
		 					this.courseList = res.data
		 				}
	        }else{
	        	 that.$toast(res.message,3000)
	        }
	 			})
	 		},
	 		//目录三点击跳转
	 		linkRouter(text){
	 			let that = this;
	 	
	 			
	 		},
	 		//点击分类跳转
	 		linkSubCatalog(id,title){
	 			this.$router.push({name:'subCatalogue',params:{id:id,name:title}})
	 			
	 		},
	 		//跳转到自定义篇
	 		linkCustCatalog(){
	 			let that = this;
	 			if(that.courseList.length>0){
	 				that.$router.push({name:'customizeCatalogue'})
	 			}else{
	 				that.$toast('暂无多人模式课程',3000)
	 			}
	 			
	 		},
	 		//点击跳转控制台
	 		linkConsole(){
	 			let that = this;
	 			this.$router.push({name:'console'})
	 		}
	 	
	 	},
	 	mounted(){
	 		this.getData();//获取课程目录
	 		this.model = sessionStorage.getItem('loginModal');
	 		if(this.modal!=''){
	 		   this.getCustomize();
	 		}
	 	}
	 }
</script>

<style scoped lang="less">
@import url("../../assets/teachCss/style.less");
.pageWrap{background:url(../../assets/teachImg/index_bg.png) center no-repeat;overflow:auto;
   background-size:cover; -webkit-background-size:cover; display:table;color:#fff;
  -ms-user-select: none;
  user-select: none; 
  -webkit-user-select: none;
  -moz-user-select: none; 
  -o-user-select: none; 
  
  .headerFun{position:fixed;right:30px; top:30px;z-index:999;
    a{display: inline-block; vertical-align: top;}
    .icon{width:64px;height: 64px;display: block; margin: 0 auto; background: url(../../assets/teachImg/simu_exit.png) center no-repeat;
       background-size: cover;-webkit-background-size: cover;
    }
    em{display: block; text-align: center;font-size:18px;color:#fff;}
    .bindex em{ margin-top: -10px;}
    
    .bback{width:18px;height:36px;display: inline-block; background: url(../../assets/teachImg/hed_arrow.png) center no-repeat;
      background-size:contain;-webkit-background-size:contain;
      margin-left:8px;margin-top:12px;
    }
    .btn_console{margin-right:15px;}
    .btn_console span{width:64px;height:64px; display: block; margin: 0 auto;
      background: url(../../assets/teachImg/btn_console.png) center no-repeat;background-size:cover;-webkit-background-size:cover;}
    .btn_console em{margin-top: -10px; }
  }
  .cataBox{display:table-cell; width: 100%;vertical-align: middle;}
  .cataMain{width:1400px; text-align: center; margin: 0 auto;  display: table;}
   .cata-main{display: table-cell; vertical-align: middle;}
   
  .pcat{
  	
  	
  	width:322px;display: inline-block;margin:30px 0;position: relative;
  	.intro{
  		position: absolute;width:100%; height: 100%;left:0px;top:0px;
  		opacity: 1;
  		transition: opacity .5s linear;
	   -moz-transition: opacity .5s linear;
	    -webkit-transition: opacity .5s linear;
	   -o-transition: opacity .5s linear;
	    -ms-transition: opacity .5s linear;
  	
  	}
  	.pcat:nth-of-type(1){margin-bottom: 40px;}
  	.pcat:nth-of-type(2){margin-bottom: 40px;}
  	.pintro{position: absolute;width:80%;left:10%;top:50%; max-height:80%; overflow: hidden;
  	   opacity: 0;
  		transition: opacity .5s linear;
	   -moz-transition: opacity .5s linear;
	   -webkit-transition: opacity .5s linear;
	  -o-transition: opacity .5s linear;
	  -ms-transition: opacity .5s linear;
	  
  	  -ms-transform:translate(0,-50%); 	
	 -moz-transform:translate(0,-50%); 	
	 -webkit-transform:translate(0,-50%);
	 -o-transform:translate(0,-50%); 
     transform:translate(0,-50%);
     font-size:16px;color:#fff;
       h4{font-size:20px; padding: 10px 0;};
     }
  	
  	.introIcon{width:60%; vertical-align: bottom; margin-top:19%;}
  	p.pt{font-size:32px;color: #F5F6F7; opacity: .5;  line-height:30px;}
  }
  .pcat img{width:100%; vertical-align: top; height: auto;}
  

  
  .pcat-yl li p{line-height: 20px;}
  
  /*自定义篇*/
  .pcat-zdy{display: block; margin: 0 auto; position: absolute; left:50%;margin-left:-161px;top:50%;margin-top:-161px;
  }
  .pcat-yl{margin-top:160px;}
  
  .pcat1{margin-right:15%;}
  .pcat2{margin-left: 15%;}
  
  /*自定义篇不在的篇章*/
  .cataMain-4 {
  	width:1200px;
  	.pcat{width:340px;}
  	.pcat-yl{margin-top:80px;}
  	.pcat1{margin-right:8%;}
  	.pcat2{margin-left: 8%;}
  }
  
  /*头部点击箭头*/
  .hed-fun-box{position: absolute;white-space: nowrap; right:40px; overflow: hidden; }
  .fadeIn{width:0px;}
  
}

@media only screen and (max-width:1400px ) {
.pageWrap{
	.cataMain{width: 90%;}
	.pcat{width:26%;height: auto;}
	.headerFun .icon{width:50px;height: 50px;}
	.headerFun  .btn_console span{width:50px;height:50px;}
	.headerFun em{font-size:16px; line-height:40px;}
	.headerFun .bback{ height:24px;}

	 .pcat p.pt{font-size:18px;}
	 .pcat-zdy{ top: 50%; /*偏移*/ margin-top: 0px; margin-left: 0px;
       transform: translate(-50%,-50%);
       transform:translate(-50%,-50%);
			-ms-transform:translate(-50%,-50%);
			-moz-transform:translate(-50%,-50%);
			-webkit-transform:translate(-50%,-50%);
			-o-transform:translate(-50%,-50%); 
       
       
    }
}
}

@media only screen and (max-width:978px ){
	
	.pageWrap{
	.cataMain{width:978px}
	.pcat{width:32%}
	.pcat p{font-size:18px;}
	.catList li p{font-size:12px;}
	.pcat .pintro h4{font-size: 18px;}
	.pcat .pintro{font-size:14px;}
	
  }

}

</style>