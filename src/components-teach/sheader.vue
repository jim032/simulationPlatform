<template>
	<div class="headerbox" ref="header">
		<div class="staDiv" :class="{'showCatalog':menuShow}">
			<div class="stabox">
				<p class="line1">{{menuText}}</p>
			    <span class="menu"  @click="clickMenu"></span>
			</div>
			<div class="catalogBox">
				<div v-for="(item,index) in cataList" :key="index">
					<p class="pt"><span>{{item.title}}</span></p>
					<div class="colbox"><span class="scol" v-for="(iitem,index) in item.data">{{iitem}}</span></div>
				</div>
				
			</div>
		</div>
		<div class="funbox">
			<a class="btn btn_console" v-if="consoleShow"><span></span><em>控制台</em></a>
			<a class="btn btn_reset" @click="Pagereload " v-if="courseId!=1"><span></span><em>重置</em></a>
			<a class="btn btn_back" @click="back"><span></span><em>返回</em></a>
			<a class="arrow"></a>
		</div>
	</div>
</template>

<script>
	export default{
		 inject:['reload'], //注入app的方法
		data(){
			return{
				cataList:[
				 {title:'区块链的整体系统架构',
				  data:['区块的组成','梅克尔树的典型架构','交易事务的数据结构','内存池的介绍与设计','节点启动','P2P网络模拟','共识过程模拟','出块流程','密码算法应用','智能合约部署','区块集成开发工具',
				  '区块链运维工具','区块链浏览器']
				  },
				  {title:'区块链中的密码学',
				  data:['哈希算法和哈希值的基本概率','哈希算法的特点','哈希算法的应用','对称加密算法和非对称加密算法','椭圆曲线密码学','梅克尔树','数字签名个数字证书','keyStore基本概率和作用',
				  '模拟生成keyStore','模拟利用KeyStore']
				  }
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
    	}
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
.headerbox{position:fixed;width:100%;  left:0px;z-index:2; top:30px;z-index:99;
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
     .arrow{width:18px;height:36px;display: inline-block; vertical-align: top; background: url(../assets/teachImg/arrow_right.png) center no-repeat;
     background-size: cover;-webkit-background-size: cover; margin-top:30px; margin-left:20px;}
  }
  
  .catalogBox{
  	color:@basecolor;
  	position: absolute;top:90px;left:0px;border:2px solid #fff;.borderRadius(5px,5px,5px,5px);
  right:0px; background: url(../assets/teachImg/catalog_bg.png) left center repeat-x;
     overflow-y: auto;z-index: 1;padding:30px 0;max-height:400px;
    
   -webkit-transform: scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform: scale(0);
  -webkit-transform-origin:93% 0;-ms-transform-origin:93% 0;-o-transform-origin:93% 0;transform-origin:93% 0;
  
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
	-o-transition: all 0.3s ease-out;
	-ms-transition: all 0.3s ease-out;
	transition: all 0.3s ease-out;
  	.pt{font-size:20px;	padding:15px 30px 0 30px;}
  	.colbox{padding: 0 22px; font-size:16px;}
  	.scol{margin-top:15px; padding: 0 8px; white-space: nowrap; display: inline-block;border-right:2px solid #fff;
  	height: 12px;line-height: 12px;}
  	.scol:last-child{border:0 none}
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

 @media screen and (max-width:1440px) {
  	.headerbox {
    .stabox{font-size:24px; height: 50px;;}
    .staDiv{width:70%;left:15%; margin-left: 0px;}
    .funbox{right:8px;}
    .funbox .btn span{margin-top: 0px;width:40px;height: 40px;}
    .funbox .btn em{font-size:14px;}
    .funbox .arrow{margin-top: 0px;margin-left: 8px;width:12px;height: 24px;}
    .catalogBox{top:70px}
    }
 }
</style>