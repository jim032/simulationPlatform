<template>
	<div class="pageWrap subcatWrap cutomSubcatWrap"  ref="pageWrap" >
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
					
					<div class="scataList customCataList">
						 <div class="scat-table">
								 <ul >
								 	<li class="sitem" v-for="(item,index) in cataList" :key="index" >
								 		<p :class="{'arrow':item.category_list && item.category_list.length}" @click="linkRouter(item,item.course_name)"><span class="snum">{{index+1 | catIndex}}</span>{{item.course_name}}</p>
								 	  <div class="listbox" v-if="item.ishow">
								 	 	  <span class="ii-item" v-for="(iitem,index) in item.category_list" @click="linkRouter(iitem,item.course_name)">{{iitem.category_name_en}}</span> 
								 	 	</div>
								 	</li>
		      
								 </ul>
						 </div>
						 <div class="btnbox cutomCatBtnBox" v-if="totalPages>1">
						   <el-pagination :background="false"
						      
						      @current-change="handleCurrentChange"
						      :current-page.sync="curPage"
						     
						      :page-size="per_page"
						      layout="prev, pager, next"
						      :page-count=5
						 
						      :total="totalElements">
						    </el-pagination>
						 </div>
					</div>
					
			 </div>
		</div>
		
 </div>
</template>

<script >
import {getCourseClass} from '@/API/api-teach';
let that;
export default{
	data(){
		return{	
			isOperate:false,//头部返回按钮是否隐藏
			cataList:[],
			courseId:'',
			courName:'',
			
			iconSrc:'',
			curPage:1,//分页的当前页
			per_page:5,//当前每页的数据
			
			totalPages:0,//总共页数
			totalElements:0//总条数
		}
	},
	beforeCreate(){
		that = this;
	},
	filters:{
			catIndex: function (val) {
				let str = ''
				let value = val
		   
			  value=parseInt(value+(that.curPage-1)*that.per_page)
		
				if(value<9){
					str=0+value
				}else{
					str=value
				}
			  return str
			}
		},
	methods:{
		
		
		//获取目录
 		getData(){
 			let that = this;
 			//that.courseId = this.$route.params.id
 			//that.courName = this.$route.params.name
      that.courName = '自定义篇'
      that.iconSrc=require('../../assets/teachImg/cat_icon5.png')
      that.getCourseList();
 			
 		},
 		//点击分页
 		handleCurrentChange(val){
 			that.curPage = val;
 			 that.getCourseList();
 		},
	 	
	 	//获取自定义课程列表
	 	getCourseList(){
	 		let that = this;
	 		let obj = {};
 			obj.type = sessionStorage.getItem('loginModal');
 			obj.page = that.curPage-1;
 			//console.log(that.curPage);
 			that.cataList=[];
      obj.per_page = that.per_page;
 			getCourseClass(obj).then(res=>{
          if(res.code==200){
          	that.cataList = res.data.content;
          	for(var i =0;i<that.cataList.length;i++){
          		if(that.cataList[i].category_list!=null){
          			this.$set(that.cataList[i],'ishow',false)	
          		}	
          	}
            that.totalPages = res.data.totalPages
            that.totalElements = res.data.totalElements
//          console.log(that.cataList);
            
          }else{
          	 that.$toast(res.message,3000)
        }
      })
	 	},
		
		goBack(){
			this.$router.go(-1);
		},
		

		linkRouter(obj,pname){
			let that = this;
			let text = obj.category_id
			let name =obj.category_name_en
			pname = '启蒙篇';
				if(!obj.category_list){
					  
					  				//名词库
						if(text=='e8d78d7e-f984-11ea-adc1-0242ac120002'){
			 			   that.$router.push({name:'thesaurus',params:{id:text,name:name,pname:pname}})
			 		  }	
			 		  //初始区块链
			 		  if(text=='a3c5cdfe-f984-11ea-adc1-0242ac120002'){
			 		  	 that.$router.push({name:'knowBlockchain',params:{id:text,name:name,pname:pname}})
			 		  }
			 		  //区块链的分类
			 		  if(text=='b6251572-f984-11ea-adc1-0242ac120002'){
			 		  	 that.$router.push({name:'knowBlockchain',params:{id:text,name:name,pname:pname}})
			 		  }
			 		  //区块链经典产品
			 		  if(text=='c11f35ca-f984-11ea-adc1-0242ac120002'){
			 		  	 that.$router.push({name:'knowBlockchain',params:{id:text,name:name,pname:pname}})
			 		  }
			 		  //区块链的发展
			 		  if(text=='a0681f36-f984-11ea-adc1-0242ac120002'){
			 		  	 that.$router.push({name:'develop',params:{id:text,name:name,pname:pname}})
			 		  }
					
						//节点共识模拟				
						if(text=='0bdec04e-f985-11ea-adc1-0242ac120002'){
			 			   that.$router.push({name:'nodeRun',params:{id:text,name:name}})
			 			} 
			 			//数据结构
			 			if(text=='08a7ce0c-f985-11ea-adc1-0242ac120002'){
			 			   that.$router.push({name:'dataStructure',params:{id:text,name:name}})
			 			}
						if(text=='0f2f5394-f985-11ea-adc1-0242ac120002'){			 				
			 			
			 					that.$router.push({name:'smartContract',params:{id:text,name:name}})
			 				
			 			} 
			 			//多人模式发币
			 			if(text=='0f2f5388-f985-11ea-adc1-0242ac120002'){
			 				  that.$router.push({name:'multipleSmartContract',params:{id:text,name:name}})	
			 				 
			 			}
			 			if(text=='152eeb56-f985-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'hashAlgorithm',params:{id:text,name:name}})	
			 			} 
			 			//keyStore
			 			if(text=='0eda79cc-f98b-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'keyStore',params:{id:text,name:name}})	
			 			}
			 			//椭圆线
			 			if(text=='1807f1ba-f985-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'ellipticCurveCryptography',params:{id:text,name:name}})	
			 			}
			 			//对称
			 			if(text=='03ca5372-f98b-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'encryptionAlgorithm',params:{id:text,name:name}})	
			 			}
			 			//版权
			 			
			 		   if(text=='fa082928-f984-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'copyRight',params:{id:text,name:name}})	
			 		  }
			 		  //物流
			 			if(text=='fd55f8f8-f984-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'logistics',params:{id:text,name:name}})	
			 		  }
			 			//捐赠
			     	if(text=='f64ff4e6-f984-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'publicWelfare',params:{id:text,name:name}})	
			 			}
			     	//保单
			 			 if(text=='0543b9d8-f985-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'insurancePolicy',params:{id:text,name:name}})	
			 			}
			 			 //金融
			 			if(text=='fff96d42-f984-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'finance',params:{id:text,name:name}})	
			 			}
			 			//病历信息共享
			 			if(text=='ee3642f6-f984-11ea-adc1-0242ac120002'){
			 				that.$router.push({name:'medicalCare',params:{id:text,name:name}})	
			 			}
			 			
			 			//51%攻击
			 		 if(text=='12d4a962-f98b-11ea-adc1-0242ac120002'){
			 		  
			 				that.$router.push({name:'51attack',params:{id:text,name:name.replace(/%/g, '')}})	
			 			}
			 		 
				 		//软分叉
				 		if(text=='16cc493a-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'softFork',params:{id:text,name:name}})
	            }
				 	  //硬分叉
				 		if(text=='af63aaa3-2c63-f61e-d805-74b7d80c01ee'){
	              that.$router.push({name:'hardFork',params:{id:text,name:name}})
	          }
				 		
				 		//重放攻击
				 		if(text=='1c6ddc1e-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'replayAttack',params:{id:text,name:name}})
	            }
				 	  //延展性攻击
				 		if(text=='1f4dd650-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'malleabilityAttack',params:{id:text,name:name}})
	            }
				 	  //长程攻击
				 		if(text=='223590f6-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'longRangeAttack',params:{id:text,name:name}})
	            }
				 	   //智能合约漏洞
				 		if(text=='25771b22-f98b-11ea-adc1-0242ac120002'){
	              that.$router.push({name:'smartContractLoophole',params:{id:text,name:name}})
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
.btnbox{
	text-align: center; 
	.btnPage{
	border: none;
	background-color: transparent;
	outline: none; font-size:18px; color: #fff;margin:0 30px;cursor: pointer;
	
	}
	
}
</style>
<style lang="less">
	.cutomCatBtnBox 
	{
		.el-pager li{ background:0 none; color:#fff;font-size:18px;}
		.el-pager li.active{color:#999;}
		.el-pager li:hover{background: 0 none; }
		.el-pagination .btn-next, .el-pagination .btn-prev{background:0 none; color:#fff; }
		.el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{font-size:18px;}
		.el-pagination button:disabled{color:#999;}
		.el-pagination button:hover .el-icon{color:#fff;}
	}

 .cutomSubcatWrap .scataList{height: 720px; position: relative;}
	.cutomCatBtnBox{position: absolute;bottom: 0px;left:260px;}
	
	.scat-table{ 
		display: table; height: 100%;
		ul{display: table-cell;vertical-align: middle; height: 100%;}
	}
	
	
</style>
<style scoped lang="less">

	
	.customCataList{
		ul li.sitem{min-height: 90px;}
	}
</style>