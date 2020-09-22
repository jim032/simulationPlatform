<template>
	<div class="pageWrap homePageWrap"  ref="pageWrap" >
		<div class="headerFun">
		  <a class="bindex" @click="signOut">
		  	<span class="icon"></span>
		  	<em>退出</em>
		  </a>
		  <a class="bback"></a>
		</div>
		<div class="cataBox" ref="cataBox">
			
			<div class="cataMain">
				<div class="cata-main">
						<div class="pcat pcat1" @click="linkSubCatalog(catlog1.id)" >
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" src="../../assets/teachImg/cat_icon.png" />
								<p class="pt">{{catlog1.title}}</p>
							</div>
						</div>
						
						<div class="pcat pcat2" @click="linkSubCatalog(catlog2.id)">
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" src="../../assets/teachImg/cat_icon.png" />
								<p class="pt">{{catlog2.title}}</p>
							</div>	
						</div>
						<div class="pcat pcat-zdy" @click="linkSubCatalog(catlog5.id)">
						   <img src="../../assets/teachImg/circle.png"/>
							 <div class="intro">
								 <img class="introIcon" src="../../assets/teachImg/cat_icon.png" />
								 <p class="pt">{{catlog5.title}}</p>
							 </div>
						</div>
						<div class="pcat pcat-yl pcat1" @click="linkSubCatalog(catlog3.id)">
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" src="../../assets/teachImg/cat_icon.png" />
								<p class="pt">{{catlog3.title}}</p>
							</div>
						</div>
						<div class="pcat pcat-yl pcat2" @click="linkSubCatalog(catlog4.id)">
						   <img src="../../assets/teachImg/circle.png"/>
							 <div class="intro">
								 <img class="introIcon" src="../../assets/teachImg/cat_icon.png" />
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
	 export default{
	 	data(){
	 		return{
	 			catalogNum:0,//当前显示菜单项
	 			
	 		
	 			
	 			catlog1:{title:'启蒙篇',id:'1'}, 
	 			catlog2:{title:'场景篇',id:'2'},
	 			catlog3:{title:'原理篇',id:'3'},
	 			catlog4:{title:'异常篇',id:'4'},
	 			catlog5:{title:'自定义篇',id:'5'},
		 		boxheight: 0,
		 		bodyH:0,
		 		index: 0,
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
	 		//退出
    	signOut(){   		
    		let that = this;   		
    		logout().then(res=>{
    			if(res.code==200){
    				sessionStorage.removeItem('stu_userId')
		    		sessionStorage.removeItem('stu_role_id')
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
	 		//目录三点击跳转
	 		linkRouter(text){
	 			let that = this;
	 	
	 			
	 		},
	 		//点击分类跳转
	 		linkSubCatalog(id){
	 			this.$router.push({name:'subCatalogue',params:{id:id}})
	 			
	 		},
	 	
	 	},
	 	mounted(){
	 		
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
    
    .bback{width:18px;height:36px;display: inline-block; background: url(../../assets/teachImg/arrow_right.png) center no-repeat;
      background-size:contain;-webkit-background-size:contain;
      margin-left:8px;margin-top:12px;
    }
    
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
  
}

@media only screen and (max-width:1400px ) {
.pageWrap{
	.cataMain{width: 100%;}
	.pcat{width:26%;height: auto;}
	.headerFun .icon{width:50px;height: 50px;}
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