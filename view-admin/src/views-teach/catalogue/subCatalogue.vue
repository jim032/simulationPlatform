<template>
	<div class="pageWrap subcatWrap"  ref="pageWrap" >
		<div class="headerFun">
		  <a class="bindex" @click="goBack">
		  	<span class="icon"></span>
		  	<em>返回</em>
		  </a>
		  <a class="bback"></a>
		</div>
		
		<div class="wrapMain">
			 <div class="w1400">
			 	  <div class="pcat"  v-for="(item,index) in cataList" :key="index" v-if="item.id==courseId">
							<img src="../../assets/teachImg/circle.png"/>
							<div class="intro">
								<img class="introIcon" src="../../assets/teachImg/cat_icon.png" />
								<p class="pt">{{item.name}}</p>
							</div>
					</div>
					
					<div class="scataList">
						 <ul v-for="(item,index) in cataList" :key="index" v-if="item.id==courseId">
						 	 <li class="sitem"  v-for="(iitem,index) in item.children">
						 	 	<p :class="{'arrow':iitem.children && iitem.children.length}" @click="linkRouter(iitem)"><span class="snum">0{{index+1}}</span>{{iitem.name}}</p>
						 	 	   <div class="listbox" v-if="iitem.ishow">
						 	 	   	 <span class="ii-item" v-for="(iiitem,index) in iitem.children" @click="linkRouter(iiitem)">{{iiitem.name}}</span> 
						 	 	   </div>
						 	 </li>
						 </ul>
					</div>
					
			 </div>
		</div>
		
 </div>
</template>

<script >
export default{
	data(){
		return{	
			cataList:[{
				id:'1',
				name:'启蒙篇',
				children:[
				  {id:'1-1',name:'区块链发展史',children:[]},
				  {id:'1-2',name:'初识区块链',
				     children:[
				     {id:'1-2-1',name:'区块链与比特币'},{id:'1-2-2',name:'区块链与大数据'},
				     {id:'1-2-3',name:'区块链与数据库'},{id:'1-2-4',name:'区块链与网络'}
				     ],
				      ishow:false
				  },
				  {id:'1-3',name:'区块链的分类',
				      children:[
				        {id:'1-3-1',name:'公有与私有'},{id:'1-3-2',name:'许可与非许可'},
				        {id:'1-3-3',name:'侧链与主链'}
				     ],
				      ishow:false
				  },
				  {id:'1-4',name:'区块链的经典产品',
				     children:[
				        {id:'1-4-1',name:'比特币'},{id:'1-4-2',name:'以太坊'},
				        {id:'1-4-3',name:'EOS'},{id:'1-4-4',name:'hyperledger'},{id:'1-4-5',name:'Wisdomchain'}
				     ],
				      ishow:false
				  },
				  {id:'1-5',name:'名词库',children:[]},
				],
			},
			{
				id:'2',
				name:'场景篇',
				children:[
				  {id:'2-1',name:'病历信息共享',children:[]},
				  {id:'2-2',name:'捐赠数据确权',children:[]},
				  {id:'2-3',name:'作品版权存证',children:[]},
				  {id:'2-4',name:'物流过程追溯',children:[]},
				  {id:'2-5',name:'供应链金融审计',children:[]},
				  {id:'2-6',name:'快速保单处理',children:[]},
				],
			},
			{
				id:'3',
				name:'原理篇',
				children:[
				  {id:'3-1',name:'数据结构原理',children:[]},
				  {id:'3-2',name:'节点共识模拟',children:[]},
				  {id:'3-3',name:'智能合约部署与调用',children:[]},
				  {id:'3-4',name:'区块链密码学',
				     children:[
				        {id:'3-4-1',name:'哈希算法',children:[]},{id:'3-4-2',name:'椭圆线密码算法',children:[]},
				        {id:'3-4-3',name:'对称密钥算法',children:[]},{id:'3-4-4',name:'keystore',children:[]}
				     ],
				     ishow:false
				  }
				],
			},
			{
				id:'4',
				name:'异常篇',
				children:[
				  {id:'4-1',name:'51%攻击',children:[]},
				  {id:'4-2',name:'软硬分叉',children:[]},	
				  {id:'4-3',name:'重放攻击',children:[]},
				  {id:'4-4',name:'延展性攻击',children:[]},
				  {id:'4-5',name:'长程攻击',children:[]},
				  {id:'4-6',name:'智能合约漏洞',children:[]},
				]
			},
		],
			courseId:''
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		linkRouter(obj){
			let that = this;
			let text = obj.name
			//表示启蒙篇
		
			if(that.courseId=='1'){
				if(text.indexOf('名词库')!=-1){
	 			   that.$router.push({name:'thesaurus'})
	 		  }	
	 		  else if(text.indexOf('初识区块链')!=-1){
	 		  	 that.$router.push({name:'knowBlockchain'})
	 		  }
	 		  else if(text.indexOf('发展')!=-1){
	 		  	 that.$router.push({name:'develop'})
	 		  }
			}else{
				if(!obj.children.length){
					
					
						if(text.indexOf('节点')!=-1){
			 			   that.$router.push({name:'nodeRun'})
			 			}else if(text.indexOf('数据结构')!=-1){
			 			   that.$router.push({name:'dataStructure'})
			 			}
						else if(text.indexOf('智能合约')!=-1){
			 				that.$router.push({name:'smartContract'})
			 			}else if(text.indexOf('哈希算法')!=-1){
			 				that.$router.push({name:'hashAlgorithm'})
			 				
			 			}else if(text.indexOf('keystore')!=-1){
			 				that.$router.push({name:'keyStore'})	
			 			}
			 			else if(text.indexOf('椭圆线')!=-1){
			 				that.$router.push({name:'ellipticCurveCryptography'})	
			 			}
			 			else if(text.indexOf('对称')!=-1){
			 				that.$router.push({name:'encryptionAlgorithm'})	
			 			}
			 			
			 			else if(text.indexOf('版权')!=-1){
			 				that.$router.push({name:'copyRight'})	
			 			}else if(text.indexOf('物流')!=-1){
			 				that.$router.push({name:'logistics'})	
			 			}else if(text.indexOf('捐赠')!=-1){
			 				that.$router.push({name:'publicWelfare'})	
			 			}else if(text.indexOf('保单')!=-1){
			 				that.$router.push({name:'insurancePolicy'})	
			 			}else if(text.indexOf('金融审计')!=-1){
			 				that.$router.push({name:'finance'})	
			 			}else if(text.indexOf('病历')!=-1){
			 				that.$router.push({name:'medicalCare'})	
			 			}
			 			
			 			else if(text.indexOf('51攻击')){
			 				that.$router.push({name:'51attack'})	
			 			}
			 			
			 			
				}else{
					 obj.ishow =  !obj.ishow
				}
			}
		}
	},
	mounted(){
		let that = this;
		that.courseId = this.$route.params.id

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
    
    .bback{width:18px;height:36px;display: inline-block; background: url(../../assets/teachImg/arrow_right.png) center no-repeat;
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
	ul li.sitem{height: 120px;}
	
	
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
  

@media only screen and (max-width:1400px ) {
.pageWrap{
	.cataMain{width: 100%;}
	.pcat{width:26%;height: auto;}
	.headerFun .icon{width:50px;height: 50px;}
	.headerFun em{font-size:16px; line-height:40px;}
	.headerFun .bback{ height:24px;}
}
}

</style>