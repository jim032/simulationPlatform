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
						 		<p  class="cursorPoint" :class="{'arrow':item.children && item.children.length}" @click="linkRouter(item,index)"><span class="snum">0{{index+1}}</span>{{item.name}}</p>
						 	  <div class="listbox" v-if="item.ishow">
						 	 	  <span class="ii-item cursorPoint" v-for="(iitem,index) in item.children" @click="linkRouter(iitem,index)">{{iitem.name}}</span> 
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
			if (window.history.length <= 1) {
         this.$router.push({ path: "/" });
         return false;
      } else {
         this.$router.go(-1);
      }
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
			 			//单人模式发币
						if(text=='0f2f5394-f985-11ea-adc1-0242ac120002'){			 				
			 					that.$router.push({name:'smartContract',params:{id:obj.id,name:obj.name}})
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
			 		   let tmp = obj.name;//.replace(/%/g, '')
			 				that.$router.push({name:'51attack',params:{id:obj.id,name:tmp}})	
			 			}
			 		 
				 	  //软分叉
				 		if(text=='16cc493a-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'softFork',params:{id:obj.id,name:obj.name}})
	            }
				 	  //硬分叉
				 		if(text=='af63aaa3-2c63-f61e-d805-74b7d80c01ee'){
	              that.$router.push({name:'hardFork',params:{id:obj.id,name:obj.name}})
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
					let tmp = that.cataList
					for(var i=0;i<tmp.length;i++){
						//console.log(tmp[i].ishow)
						this.$set(that.cataList[i],'ishow',false)
					}
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
@import url("../../assets/teachCss/subCatalogue.less");
</style>