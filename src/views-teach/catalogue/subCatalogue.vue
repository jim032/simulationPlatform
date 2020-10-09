<template>
	<div class="pageWrap subcatWrap"  ref="pageWrap" >
		<div class="headerFun">
			<div class="hed-fun-box" :class="{'fadeIn':isOperate}">  
			  <a class="bindex" @click="goBack" >
			  	<span class="icon"></span>
			  	<em>返回</em>
			  </a>
		 </div>
		  <a class="bback" @click="isOperate=!isOperate"></a>
		</div>
		
		<div class="wrapMain">
			 <div class="w1400">
			 	  <div class="pcat" >
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" :src="iconSrc" />
								<p class="pt">{{courName}}</p>
							</div>
					</div>
					
					<div class="scataList">
						 <ul >
						 	<li class="sitem" v-for="(item,index) in cataList" :key="index" >
						 		<p :class="{'arrow':item.children && item.children.length}" @click="linkRouter(item,index)"><span class="snum">0{{index+1}}</span>{{item.name}}</p>
						 	  <div class="listbox" v-if="item.ishow">
						 	 	  <span class="ii-item" v-for="(iitem,index) in item.children" @click="linkRouter(iitem,index)">{{iitem.name}}</span> 
						 	 	</div>
						 	</li>

						 </ul>
					</div>
					
			 </div>
		</div>
		
 </div>
</template>

<script >
import {categoryTree} from '@/API/api-teach'
export default{
	data(){
		return{	
			isOperate:false,//头部返回按钮是否隐藏
			cataList:[],
			courseId:'',
			courName:'',
			
			iconSrc:'',
		}
	},
	methods:{
		
		//获取目录
	 		getData(){
	 			let that = this;
	 			that.courseId = this.$route.params.id
	 			that.courName = this.$route.params.name

    		if(that.courseId=='890affa2-f984-11ea-adc1-0242ac120002'){
    			that.iconSrc=require('../../assets/teachImg/cat_icon1.png')
    		}
    		if(that.courseId=='44c07268-f98f-11ea-adc1-0242ac120002'){
    			that.iconSrc=require('../../assets/teachImg/cat_icon2.png')
    		}
    		if(that.courseId=='93e73ec2-f984-11ea-adc1-0242ac120002'){
    			that.iconSrc=require('../../assets/teachImg/cat_icon3.png')
    		}
    		if(that.courseId=='9982d8aa-f984-11ea-adc1-0242ac120002'){
    			that.iconSrc=require('../../assets/teachImg/cat_icon4.png')
    		}
    		if(that.courseId=='890affa3-f984-11ea-adc1-0242ac120002'){
    			that.iconSrc=require('../../assets/teachImg/cat_icon2.png')
    		}
	 			
	 			
	 			let obj = {};
	 			obj.type = 0 ,//type为0表示中文名
	 			obj.category_id = that.courseId
	 			categoryTree(obj).then(res=>{
          if(res.code==200){
          	that.cataList = res.data;
          	for(var i =0;i<that.cataList.length;i++){
          		if(that.cataList[i].children!=null){
          			this.$set(that.cataList[i],'ishow',false)	
          		}	
          	}
          
          }else{
          	 that.$toast(res.message,3000)
          }
        })
	 		},
		
		goBack(){
			this.$router.go(-1);
		},
		linkRouter(obj,index){
			let that = this;
			let text = obj.id
			//表示启蒙篇
	
			if(that.courseId=='890affa2-f984-11ea-adc1-0242ac120002'){
				//名词库
				if(text=='e8d78d7e-f984-11ea-adc1-0242ac120002'){
	 			   that.$router.push({name:'thesaurus',params:{id:obj.id,name:obj.name,pname:that.courseName}})
	 		  }	
	 		  //初始区块链
	 		  if(text=='a3c5cdfe-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'knowBlockchain',params:{id:obj.id,name:obj.name,pname:that.courseName}})
	 		  }
	 		  //区块链的分类
	 		  if(text=='b6251572-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'knowBlockchain',params:{id:obj.id,name:obj.name,pname:that.courseName}})
	 		  }
	 		  //区块链经典产品
	 		  if(text=='c11f35ca-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'knowBlockchain',params:{id:obj.id,name:obj.name,pname:that.courseName}})
	 		  }
	 		  //区块链的发展
	 		  if(text=='a0681f36-f984-11ea-adc1-0242ac120002'){
	 		  	 that.$router.push({name:'develop',params:{id:obj.id,name:obj.name,pname:that.courseName}})
	 		  }
			}else{
				if(!obj.children){
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
			 			
			 			//51%攻击
			 		 if(text=='12d4a962-f98b-11ea-adc1-0242ac120002'){
			 		   let tmp = obj.name;
			 				that.$router.push({name:'51attack',params:{id:obj.id,name:tmp.replace(/%/g, '')}})	
			 			}
			 		 
				 	
				 		if(text=='16cc493a-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'softHardFork',params:{id:obj.id,name:obj.name}})
	            }
				 		//重放攻击
				 		if(text=='1c6ddc1e-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'replayAttack',params:{id:obj.id,name:obj.name}})
	            }
				 	  //延展性攻击
				 		if(text=='1f4dd650-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'malleabilityAttack',params:{id:obj.id,name:obj.name}})
	            }
				 	  //长程攻击
				 		if(text=='223590f6-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'longRangeAttack',params:{id:obj.id,name:obj.name}})
	            }
				 	   //智能合约漏洞
				 		if(text=='25771b22-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'smartContractLoophole',params:{id:obj.id,name:obj.name}})
	            }
			 			
			 			
				}else{
					this.$set(obj,'ishow',!obj.ishow)
				}
			}
		}
	},
	mounted(){
		let that = this;
		//that.courseId = this.$route.params.id
		that.courseName = this.$route.params.name
		//获取子目录
		that.getData()

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
  
  .headerFun{position:fixed;right:30px; top:30px; z-index:999;
    a{display: inline-block; vertical-align: top;}
    .icon{width:64px;height: 64px;display: block; margin: 0 auto; background: url(../../assets/teachImg/btn_back.png) center no-repeat;
       background-size: cover;-webkit-background-size: cover;
    }
    em{display: block; text-align: center;font-size:18px;color:#fff;}
    .bindex em{ margin-top: -10px;}
    
    .bback{width:18px;height:36px;display: inline-block; background: url(../../assets/teachImg/hed_arrow.png) center no-repeat;
      background-size:contain;-webkit-background-size:contain;
      margin-left:8px;margin-top:12px;
    }
    
  }
}

.subcatWrap{
	display: table; text-align: center;
	.wrapMain{display: table-cell; vertical-align: middle;}
	.w1400{width:1400px; margin: 0 auto;}
}

.pcat{ 	
  	width:322px;display: inline-block;margin:30px 0;position: relative; text-align:  center; vertical-align: middle;
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
.scataList{
	display:inline-block; padding-left:196px; vertical-align: middle; padding-top: 30px; text-align: left;
	ul{width:500px;}
	ul li.sitem > p {font-size:36px; position: relative; padding:15px 0 8px 140px; display: inline-block;} 
	ul li.sitem > p .snum{width:88px;height:88px;display:block;font-size:48px; background: #FFA427;
	position: absolute;left:0px;top:50%;margin-top:-44px;text-align: center; line-height: 88px;
	.borderRadius(5px,5px,5px,5px)}
	ul li p.arrow{background: url(../../assets/teachImg/arrow_right.png) right 34px no-repeat; padding-right:28px;
	}
	ul li.sitem{height: 110px;}
	.listbox{padding-top:10px;}
	.ii-item{font-size: 24px; padding: 0 8px; border-right:2px solid #fff;
	display: inline-block; line-height:20px; height: 20px; cursor: default;}
	.ii-item:last-child{border:0 none}	
	.packup{font-size:16px; color:#FFA427;}	
} 
  
.subcatWrap{
	.w1400{width:1400px; margin: 0 auto; min-width: 1000px; display: inline-block;}
	ul li.sitem > p {font-size:36px; padding-left:90px; }
	ul li.sitem > p .snum{width:60px;height:60px;text-align: center; line-height:60px; font-size:36px;
	margin-top: -30px;}
	.ii-item{font-size:18px;}
}
/*头部箭头点击*/
.hed-fun-box{position: absolute;white-space: nowrap; right:40px; overflow: hidden; }
.fadeIn{width:0px;}  

@media only screen and (max-width:1400px ) {
.pageWrap{
	.cataMain{width: 100%;}
	.w1400{width:100%;}
	.pcat{width:26%;height: auto;}
	.headerFun .icon{width:50px;height: 50px;}
	.headerFun em{font-size:16px; line-height:40px;}
	.headerFun .bback{ height:24px;}
}
}

</style>