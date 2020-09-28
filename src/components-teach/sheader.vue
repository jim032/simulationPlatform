<template>
	<div class="headerbox" ref="header">
		<div class="staDiv" :class="{'showCatalog':menuShow}">
			<div class="stabox">
				<p class="line1">{{menuText}}</p>
			    <span class="menu"  @click="clickMenu"></span>
			</div>
			<div class="catalogBox">
				<div class="icata_box" v-for="(item,index) in cataList" :key="index" >
					<p class="pt"><span>{{item.name}}</span></p>
					<div class="slide_cata clearfix">
						<div class="colbox"  v-for="(iitem,index) in item.children" :key="index">
							  <span class="scol" :class="{'noBorder':iitem.children}" @click="linkRouter(iitem)" v-if="iitem.id!='12a7c38a-f985-11ea-adc1-0242ac120002'">{{iitem.name}}</span>
							  <div class="icolbox " 
							  	v-for="(iiitem,index) in iitem.children" :key="index" 
							  	v-if="iitem.children && item.id!='890affa2-f984-11ea-adc1-0242ac120002'">
							  	<span class="iscol" @click="item.id!='890affa2-f984-11ea-adc1-0242ac120002'?linkRouter(iiitem):''">{{iiitem.name}}</span>
							  </div>
							
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<div class="funbox">
			<div class="hed-fun-box" :class="{'fadeIn':isOperate}">
				<a class="btn btn_console" v-if="consoleShow"><span></span><em>控制台</em></a>
				<a class="btn btn_reset" @click="Pagereload " v-if="courseId!=1"><span></span><em>重置</em></a>
				<a class="btn btn_back" @click="back"><span></span><em>返回</em></a>
			</div>
			<a class="arrow" @click="isOperate=!isOperate"></a>
		</div>
	</div>
</template>

<script>
  import {pcategoryTree} from '@/API/api-teach'
	export default{
		 inject:['reload'], //注入app的方法
		data(){
			return{
				isOperate:false,
				
				cataList:[
				 
				],
			}
       },
    props:{
    	menuShow:null,
    	consoleShow:{type:Boolean,default:false},
    	menuText:{
    		type:null,
    		default:'',
    	},
    	courseId:{
    		type:null,
    		default:'',
    	}
    },
    methods:{
    	clickMenu(){
    		this.$emit('clickMenu')
    	},
    	back(){
    		this.$router.go(-1)
    	},
    	Pagereload(){
    		this.reload();
    	},
    	
    	//获取目录结构
    	getData(){
	 			let that = this;
	 			let obj = {};
	 			obj.type = 0 ,//type为0表示中文名
	 			pcategoryTree(obj).then(res=>{
          if(res.code==200){
          	console.log(res)
          	if(res.data[0].children){
          		that.cataList = res.data[0].children
          	}
          	
          }else{
          	 that.$toast(res.message,3000)
          }
        })
    	},
    	//点击路由跳转
    	linkRouter(obj){
			let that = this;
			let text = obj.id
		   		//名词库
				if(text=='e8d78d7e-f984-11ea-adc1-0242ac120002'){
	 			   that.$router.push({name:'thesaurus',params:{id:obj.id,name:obj.name}})
	 		  }	
	 		  //初始区块链
	 		  if(text=='a3c5cdfe-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'knowBlockchain',params:{id:obj.id,name:obj.name}})
	 		  }
	 		  //区块链的分类
	 		  if(text=='b6251572-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'knowBlockchain',params:{id:obj.id,name:obj.name}})
	 		  }
	 		  //区块链经典产品
	 		  if(text=='c11f35ca-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'knowBlockchain',params:{id:obj.id,name:obj.name}})
	 		  }
	 		  //区块链的发展
	 		  if(text=='a0681f36-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'develop',params:{id:obj.id,name:obj.name}})
	 		  }

				//节点共识模拟				
				if(text=='0bdec04e-f985-11ea-adc1-0242ac120002'){
	 			   that.$router.push({name:'nodeRun',params:{id:obj.id,name:obj.name}})
	 			} 
	 			//数据结构
	 			if(text=='08a7ce0c-f985-11ea-adc1-0242ac120002'){
	 			   that.$router.push({name:'dataStructure',params:{id:obj.id,name:obj.name}})
	 			}
				if(text=='0f2f5394-f985-11ea-adc1-0242ac120002'){			 				
	 				let loginModal = sessionStorage.getItem('loginModal');
	 				if(loginModal==1){
	 					that.$router.push({name:'smartContract',params:{id:obj.id,name:obj.name}})
	 				}else{
	 					that.$router.push({name:'multipleSmartContract',params:{id:obj.id,name:obj.name}})	
	 				}	
	 			} 
	 			if(text=='152eeb56-f985-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'hashAlgorithm',params:{id:obj.id,name:obj.name}})	
	 			} 
	 			//keyStore
	 			if(text=='0eda79cc-f98b-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'keyStore',params:{id:obj.id,name:obj.name}})	
	 			}
	 			//椭圆线
	 			if(text=='1807f1ba-f985-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'ellipticCurveCryptography',params:{id:obj.id,name:obj.name}})	
	 			}
	 			//对称
	 			if(text=='03ca5372-f98b-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'encryptionAlgorithm',params:{id:obj.id,name:obj.name}})	
	 			}
	 			//版权
	 			
	 		   if(text=='fa082928-f984-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'copyRight',params:{id:obj.id,name:obj.name}})	
	 		  }
	 		  //物流
	 			if(text=='fd55f8f8-f984-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'logistics',params:{id:obj.id,name:obj.name}})	
	 		  }
	 			//捐赠
	     	if(text=='f64ff4e6-f984-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'publicWelfare',params:{id:obj.id,name:obj.name}})	
	 			}
	     	//保单
	 			 if(text=='0543b9d8-f985-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'insurancePolicy',params:{id:obj.id,name:obj.name}})	
	 			}
	 			 //金融
	 			if(text=='fff96d42-f984-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'finance',params:{id:obj.id,name:obj.name}})	
	 			}
	 			//病历信息共享
	 			if(text=='ee3642f6-f984-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'medicalCare',params:{id:obj.id,name:obj.name}})	
	 			}
	 			
	 			
	 		 if(text=='12d4a962-f98b-11ea-adc1-0242ac120002'){
	 				that.$router.push({name:'51attack',params:{id:obj.id,name:obj.name}})	
	 			}
			 			
			 	this.reload();		
	
			
		}
    },
    mounted(){
    	let that = this;
    
    	that.getData();
    }
	}
</script>

<style scoped lang="less">
@import url("../assets/teachCss/style.less");
.stabox{width:100%;height: 70px;background:rgba(67,67,67,0.8);.borderRadius(5px,5px,5px,5px);
    background:rgba(67,67,67,.8); text-align:center; color:@basecolor;
    display: table-cell; vertical-align: middle;position: relative;
  }
.staDiv{padding:10px;width:880px;background:rgba(255,255,255,.5);margin:0 auto;
    .borderRadius(10px,10px,10px,10px); display: table;
  }
.headerbox{position:fixed;width:100%;  left:0px;z-index:2; top:30px;z-index:999;
   .staDiv{position: relative; }
   .stabox{ font-size:36px;position:relative; z-index: 2;}
   .stabox p{width:80%; margin: 0 auto;}
   .menu{width:34px;height:33px;position: absolute;background: url(../assets/teachImg/list_n.png) center no-repeat;
   background-size:34px 33px;-webkit-background-size:34px 33px; right:30px;top:50%;margin-top:-16px;
       transition: all .2s ease;
    -moz-transition: all .2s ease; /* Firefox 4 */
    -webkit-transition: all .2s ease; /* Safari 和 Chrome */
    -o-transition: all .2s ease; /* Opera */
    -ms-transition: all .2s ease;}
   
   .showCatalog .menu{
   	opacity: 1;
   	background: url(../assets/teachImg/list_h.png) center no-repeat;
   background-size:34px 33px;-webkit-background-size:34px 33px;
    transition: all .2s ease;
    -moz-transition: all .2,s ease; /* Firefox 4 */
    -webkit-transition: all .2s ease; /* Safari 和 Chrome */
    -o-transition: all .2s ease; /* Opera */
    -ms-transition: all .2s ease;
   }
   
  .funbox{position: absolute;right:30px;top:0px;z-index:2;
     .btn{display: inline-block; margin:0 2px;}
     .btn span{width:64px;height:64px;display:block;margin:12px auto 0 auto; ;}
     .btn_reset span{background: url(../assets/teachImg/btn_set.png) center no-repeat;background-size:cover;-webkit-background-size:cover;}
     .btn_back span{background: url(../assets/teachImg/btn_back.png) center no-repeat;background-size:cover;-webkit-background-size:cover;}
     .btn_console span{background: url(../assets/teachImg/btn_console.png) center no-repeat;background-size:cover;-webkit-background-size:cover;}
     .btn em{font-size:18px;color:#fff;text-shadow:0px 5px 7px rgba(19,49,127,0.15); line-height:20px; margin-top: -5px;
            -webkit-text-shadow:0px 5px 7px rgba(19,49,127,0.15);display: block;text-align: center;
     }
     .arrow{width:18px;height:36px;display: inline-block; vertical-align: top; background: url(../assets/teachImg/hed_arrow.png) center no-repeat;
     background-size: cover;-webkit-background-size: cover; margin-top:20px; margin-left:20px;}
  }
  
  .catalogBox{
  	color:@basecolor;
  	position: absolute;top:90px;left:0px;border:2px solid #fff;.borderRadius(5px,5px,5px,5px);
  right:0px; background: url(../assets/teachImg/catalog_bg.png) left center repeat-x;
     overflow-y: auto;z-index: 1;padding-bottom:30px;max-height:450px;
    
   -webkit-transform: scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform: scale(0);
  -webkit-transform-origin:93% 0;-ms-transform-origin:93% 0;-o-transform-origin:93% 0;transform-origin:93% 0;
  
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
	-o-transition: all 0.3s ease-out;
	-ms-transition: all 0.3s ease-out;
	transition: all 0.3s ease-out;
  	.pt{font-size:20px;	padding-top:10px; color:#FF9A0E; margin-bottom: 10px;}
  	.icata_box{margin: 0 30px;word-break:break-all;}
  	.colbox{ font-size:16px; display:inline-block; vertical-align: middle;}
  	.colbox::after{content: '|';}
  	.colbox:last-child{display: inline;}
  	.colbox:last-child::after{content:'';}
  	.icolbox {display: inline-block;}
  	.icolbox::after{content: '|';}
  	.icolbox:last-child::after{content:'';}
  	.scol{ padding: 0 8px; white-space: nowrap; display: inline-block;
  	height: 12px;line-height: 12px;}
  	.colbox:last-child .scol{border:0 none}
  	.scol.noBorder{border:0 none;padding-right: 0px;}
  	/*.iscol::after{content:'、';}
  	.icolbox:last-child .iscol::after{content:'>'; margin-left:5px; margin-right: 8px;}
  	.scol.noBorder::after{content:'<'; margin-left:5px;}*/
  	.iscol{padding: 0 8px;}
  	
  	.slide_cata{}
  	
  }
  
  .showCatalog{
  	.catalogBox{
	
	 -webkit-transform: scale(1);-ms-transform:scale(1);-o-transform:scale(1);transform: scale(1);
     -webkit-transform-origin:93% 0;-ms-transform-origin:93% 0;-o-transform-origin:93% 0;transform-origin:93% 0;
	
  	-webkit-transition: all  0.3s ease-out;
     -moz-transition: all 0.3s ease-out;
	 -o-transition: all 0.3s ease-out;
	 -ms-transition: all 0.3s ease-out;
	 transition: all 0.3s ease-out;
  	}
  }
  
}

.hed-fun-box{position: absolute;white-space: nowrap; right:40px; overflow: hidden; }
.fadeIn{width:0px;}

 @media screen and (max-width:1440px) {
  	.headerbox {
    .stabox{font-size:24px; height: 50px;;}
    .staDiv{width:70%;left:15%; margin-left: 0px;}
    .funbox{right:8px;}
    .funbox .btn span{margin-top: 0px;width:40px;height: 40px;}
    .funbox .btn em{font-size:14px;}
    .funbox .arrow{margin-top:4px;margin-left: 8px;width:12px;height: 24px;}
    .catalogBox{top:70px}
    }
    .hed-fun-box{right:20px;}
 }
</style>