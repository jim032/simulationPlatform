<template>
	<div class="staDiv bottomDiv">
		<div class="stabox" :class="{'attackStabox':pageName==51,'replay-staBox':pageName==53}">
			<p class="pt" >{{operaInfo.mess}}</p>
			<template v-if="(pageName==2 || pageName=='2-multiple')"> 
				<div class="progress" v-if="isBlcok">
					<div class="curPro">
						<div class="proIcon" :style="{'width':blockPro+'%'}"></div>
					</div>
				</div>
			</template>
			
			<ul class="clearfix">
				<li v-for="(item,index) in operaInfo.infolist ">{{item}}</li>
			</ul>
			<template v-if="pageName==1">
				<p class="protext" v-if="isBlcok && step==2">Node difficulty calculation in progress：{{blockPro}}%</p>
			  <p class="protext" v-if="isBlcok && step==3 ">The node is in the process of packaging broadcast operation：{{blockPro}}%</p>
			  <div class="progress" v-if="isBlcok">
				<div class="curPro">
					<div class="proIcon" :style="{'width':blockPro+'%'}"></div>
				</div>
			</div>
			</template>
			
			<template v-if="pageName==3">	
			<p class="protext" v-if="isBlcok && step==1">Hash value generating：{{blockPro}}%</p>
			<p class="protext" v-if="isBlcok && (step==31 ||step==33)">Generating hash from Merkel tree and verifying：{{blockPro}}%</p>
			<div class="progress" v-if="isBlcok">
				<div class="curPro">
					<div class="proIcon" :style="{'width':blockPro+'%'}"></div>
				</div>
			</div>
			</template>
			
			<div class="blockBox" v-if="isShowBlock">

				<div class="col_block">
					<p>block height：</p>
					<p>{{this.height}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 2">
					<p>block height：</p>
					<p>{{this.height - 1}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 3">
					<p>block height：</p>
					<p>{{this.height - 2}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 4">
					<p>block height：</p>
					<p>{{this.height - 3}}</p>
				</div>
				<div class="col_more" v-if="this.height >7 ">
					<p>...</p>
				</div>
				<div class="col_block" v-if="this.height >= 5">
					<p>block height：</p>
					<p>{{this.height - 4 > 3 ? 3: this.height - 4}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 6">
					<p>block height：</p>
					<p>{{this.height - 5 > 2 ? 2: this.height - 5}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 7">
					<p>block height：</p>
					<p>{{this.height - 6 > 1 ? 1: this.height - 6}}</p>
				</div>
			</div>
			
			
			<!---51%攻击-->
			<template v-if="pageName==51 && isShowAmount==false">
				<div class="bottomMess" v-if="isShowAmount==false && transNumber>=1">
				 	  <span class="span1">Unpackaged transactions</span><span class="span2">Packaged transactions</span><span class="span3">Transaction deleted</span>
				</div>
				<ul class="affairsList affairsList51" v-if="transNumber>=1">
      		 <li class="affairItem " :class="{'affairItem-blocked':step==12,'deleteAffairItem':item.isDelete}" v-for="(item,index) in tansferInfo" :key="index"@mouseenter="enter(index)" @mouseleave="leave()">
      		 	 <div class="affairName">transactions{{index+1}}</div>
              <div >{{item.initiate}} transfer {{item.amount}} to {{item.object}}</div>
              <div class="deltrans" v-if="tansferInfo.length>1 && step>=3 && step!=12 && !item.isDelete"><a class="chooseBtn" @click="showdel(index)" >delete</a></div>
      		 </li>
      	</ul>
		
      </template>
      <!--交易延展性攻击-->
      <template v-if="pageName==54 && isShowAmount==false">
      	<div class="bottomMess malleBottomMess" v-if="isShowAmount==false && tansferInfo.length > 0">
				 	  <span class="span1">Unpackaged transactions</span><span class="span2">Packaged transactions</span>
				 	  <span class="span3">Unpackaged transaction modified</span><span class="span4">Packaged transaction modified</span>
				</div>
      	<ul class="affairsList malle-affairsList" >
      		 <li class="affairItem affairDefault " :class="{'finshAffair':step==12 && !item.isEdit}" v-for="(item,index) in tansferInfo" :key="index">
      		 	 <div  class="affairName">{{item.name}}</div>
              <div >{{item.initiate}} transfer {{item.amount}} to {{item.object}}</div>
              <div>Transaction id：{{item.id}}</div>
      		 </li>
      		 <li class="affairItem editAffairItem" :class="{'finshAffair':step==12}" v-for="(item,index1) in tansferInfoEdit" :key="item.id" v-if="tansferInfoEdit.length > 0">
      		 	 <div class="affairName">{{item.name}}</div>
              <div >{{item.initiate}} transfer {{item.amount}} to {{item.object}}</div>
              <div>Transaction id：{{item.id}}</div>
      		 </li>
      	</ul>
      

      </template>
      
      <!--重放攻击-->
      
      <template v-if="pageName==53">
      	
      	<div class="bottomMess malleBottomMess " >
				 	  <span class="span1">Unpackaged transactions</span>
				 	  <span class="span3">Unpackaged transaction modified</span><span class="span4">Packaged transaction modified</span>
				</div>
				
      	<ul class="affairsList replay-affairsList A-replay-affairsList" >
      		 <li class="r-chainName">
      		 	 A
      		 </li>
      		 <li class="affairItem blockItem finshAffair"  v-for="(item,index) in AChainList" :key="index">
      		 	 <div class="blockItem-box"  >
      		 	    <div class="item-box">{{item.name}}</div>
      		 	 </div>
              <!--<div >{{item.initiate}}给{{item.object}}转账{{item.amount}}</div>-->
             <div class="lineBorder" v-if="index>0"></div>
      		 </li>
            <li class="affairItem blockItem" :class="{'finshAffair':step==12}" v-for="(item,index) in tansferInfo" :key="'info2'+index" v-if="step>=3">
      		 	 <div class="blockItem-box">
      		 	    <div class="item-box">
      		 	    	 <div class="affairName">{{item.initiate}} to {{item.object}}</div>
                   <div >Transfer {{item.amount}}</div>
      		 	    </div>
      		 	 </div>
              <!--<div >{{item.initiate}}给{{item.object}}转账{{item.amount}}</div>-->
             <div class="lineBorder" ></div>
      		 </li>
      		
      	</ul>
      	<ul class="affairsList replay-affairsList B-replay-affairsList">
      		<li class="r-chainName">
      		 	 B
      		 </li>
      		<li class="affairItem blockItem finshAffair" :class="{'b-first':index==0}" v-for="(item,index) in BChainList" :key="index">
      		 	 <div class="blockItem-box">
      		 	 	 <div class="item-box">{{item.name}}</div>
      		 	 </div>
      		 	 <div class="lineBorder" v-if="index>0"></div>
              <!--<div >{{item.initiate}}给{{item.object}}转账{{item.amount}}</div>-->
             <div class="lineBorderH" v-if="index==0"></div>
             <div class="lineBorder lineBorderV" v-if="index==0"></div>
      		 </li>
      		 <li class="affairItem blockItem"  :class="{'finshAffair':step==12}" v-for="(item,index) in tansferInfo" :key="'info2'+index" v-if="step>=5">
      		 	 <div class="blockItem-box"  >
      		 	    <div class="item-box">
      		 	    	 <div class="affairName">{{item.initiate}} to {{item.object}}</div>
                   <div >Transfer {{item.amount}}</div>
      		 	    </div>
      		 	 </div>
              <!--<div >{{item.initiate}}给{{item.object}}转账{{item.amount}}</div>-->
             <div class="lineBorder" ></div>
      		 </li>
      	</ul>
      

      </template>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				height: 1,
				timer: '',
				isShowBlock:false,
			}
		},
		//isBlcok是否展示进度，blockPro具体进度值
		props: {operaInfo:null, blockPro:null, isBlcok:null, step:null,
			isShowMess:{
				type: null,
	      default:true
			},
			pageName:{
				type: null,
	      default: 0
			},
			isshowdel: null,
			tansferInfo: {
	      initiate: '',
	      object: '',
	      amount: ''
	    },
	    tansferInfoEdit: {
	      initiate: '',
	      object: '',
	      amount: ''
	    },
	    wprogressmalleability:{
	      type:null,
	      default:0
	    },
	    isShowAmount: {
	      type:Boolean,
	      default:false
	    },
	    //51%攻击转账次数
	    transNumber:{
	    	type:null,
	    	default:0
	    },
	    AChainList:{
	    	type:Array,
		    default:function(){
            return []
        }
	    },
	    BChainList:{
	    	type:Array,
		    default:function(){
            return []
        }
	    }
		},
		watch: {
			'operaInfo': function() {
				let that = this;

			}
		},
		methods: {
			//51%攻击
      showdel(index) {
        let that = this;
        that.$emit('showdel', index)
      },
      enter(index) {
        let that = this;
        that.$emit('enter', index)
      },
      leave() {
        let that = this;
        that.$emit('leave')
      }
   },
		mounted() {
			let that = this

			that.timer = setInterval(() => {
				that.height++
			}, 3000)

		},

		beforeDestroy() {
			let that = this;
			clearInterval(that.timer);
		}

	}
</script>

<style scoped lang="less">
	@basecolor: #fff;
	a,
	i,
	em {
		font-style: normal;
		text-decoration: 0 none;
	}
	
	.borderRadius(@param1, @param2, @param3, @param4) {
		border-radius: @param1 @param2 @param3 @param4;
		-webkit-border-radius: @param1 @param2 @param3 @param4;
		-moz-border-radius: @param1 @param2 @param3 @param4;
		-ms-border-radius: @param1 @param2 @param3 @param4;
		-o-border-radius: @param1 @param2 @param3 @param4;
	}
	
	.stabox {
		width: 100%;
		height: 70px;
		background: rgba(67, 67, 67, 0.8);
		.borderRadius(5px, 5px, 5px, 5px);
		background: rgba(67, 67, 67, .8);
		text-align: center;
		color: @basecolor;
		display: table-cell;
		vertical-align: middle;
		position: relative;
	}
	
	.staDiv {
		padding: 10px;
		width: 880px;
		background: rgba(255, 255, 255, .5);
		margin: 0 auto;
		.borderRadius(10px, 10px, 10px, 10px);
		display: table;
	}
	
	ul,
	li {
		list-style: none;
	}
	
	.stabox {
		width: 100%;
		height: 70px;
		background: rgba(67, 67, 67, 0.8);
		.borderRadius(5px, 5px, 5px, 5px);
		background: rgba(67, 67, 67, .8);
		text-align: center;
		color: @basecolor;
		display: table-cell;
		vertical-align: middle;
		position: relative;
	}
	
	.bottomDiv {
		padding: 10px;
		width: 880px;
		background: rgba(255, 255, 255, .5);
		margin: 0 auto;
		.borderRadius(10px, 10px, 10px, 10px);
		display: table;
	}
	
	.bottomDiv {
		position: fixed;
		bottom: 0px;
		left: 50%;
		margin-left: -440px;
		z-index: 99
	}
	
	.bottomDiv .stabox {
		height: 168px;
	}
	
	.bottomDiv .pt {
		font-size: 20px;
		color: #fff;
		padding-bottom: 6px;
	}
	
	.bottomDiv ul {
		font-size: 0px;
		padding: 0 25px;
		text-align: left;
	}
	
	.bottomDiv li {
		display: inline-block;
		font-size: 18px;
		margin: 2px 0;
		white-space: nowrap;
		margin: 0 25px;
		user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
		-webkit-user-select: text;
		-o-user-select: text;
	}
	
	.progress {
		width: 70%;
		height: 40px;
		margin: 0 auto;
		.borderRadius(10px, 10px, 10px, 10px);
		background: linear-gradient(1deg, rgba(27, 27, 27, 1), rgba(51, 51, 51, 1));
		margin-top: 10px;
		box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.35), 0px 3px 8px 0px rgba(0, 0, 0, 0.55);
	}
	
	.curPro {
		padding: 5px;
		width: 100%;
		height: 40px;
	}
	
	.proIcon {
		width: 100%;
		height: 100%;
		background: #0E94D4 url(../assets/teachImg/progress.png) left center repeat-x;
		background-size: auto 100%;
		-webkit-background-size: auto 100%;
		.borderRadius(10px, 10px, 10px, 10px);
	}
	
	.protext {
		font-size: 18px;
		color: #fff;
		text-align: center;
		margin-top: 15px;
	}
	/*底部节点区块*/
	
	.blockBox {
		font-size: 0px;
		text-align: left;
		padding: 0 2%; white-space:nowrap;
		.col_block {
			width: 12%;
			border: 1px solid #dcdcdc;
			display: inline-block;
			margin: 0 1%;
			font-size: 16px;
			color: #fff;
			text-align: left;
			.borderRadius(5px, 5px, 5px, 5px);
			padding: 10px 0;
			height: 92px;
			box-sizing: content-box;
			-webkit-box-sizing: border-box;
			vertical-align: top;
		}
		.col_block p {
			margin: 0 5px;
			height: 24px;
			line-height: 24px;
			white-space: nowrap;
		}
		.col_more {
			display: inline-block;
			vertical-align: top;
		}
		.col_more p {
			font-size: 18px;
			color: #fff;
			line-height: 82px;
			white-space: nowrap;
		}
	}

/*50%攻击事务*/

.affairsList{
	.affairItem{
		width: 130px;height:100px;.borderRadius(3px,3px,3px,3px); margin-right: 0px;
    background-color: white;border: 4px dashed #5175f9;margin-left: 25px;color: black;text-align:center;padding: 3px;
    cursor: pointer;display: inline-block;
    vertical-align: middle; position: relative;
    }
  .affairItem-blocked{border: 4px solid #5175f9;}
  .deleteAffairItem{border:4px dashed red}
  
  .deltrans{display:none;}
  .affairItem:hover .deltrans{background: rgba(255, 0, 0, 0.75); position: absolute;width:130px;height:100px;
  left:-4px;top:-4px; display: block;.borderRadius(2px,2px,2px,2px);}
  .chooseBtn{width:85px;height:30px; display: block; position: absolute;
  left:50%;margin-left:-44px;top:50%;margin-top:-15px; line-height: 30px;
  background:#fff;.borderRadius(5px,5px,5px,5px); overflow: hidden;
  }
  .affairDefault{cursor: default;}
  .affairName{
		text-align: center;font-weight:bold;font-size:20px;
	}
	
	.editAffairItem{border: 4px dashed red;}
	
	.affairItem.finshAffair{border: 4px solid #5175f9;}
	.editAffairItem.finshAffair{border: 4px solid red;}
	
}

.affairsList51{
	.affairItem{
		height: 88px;
	}
	.affairItem:hover .deltrans{
		height:88px;
	}
	.affairName{
		 margin-top:8px;
	}
}

/*底部提醒*/
.bottomMess{
	text-align: center; font-size:18px;color:#fff; padding-bottom:10px;
	span{display:inline-block; margin: 0 20px;}
	.span1{background: url(../assets/teachImg/att1.png) left center no-repeat;
	 padding-left: 34px;}
	.span2{
		background: url(../assets/teachImg/att4.png) left center no-repeat;
	 padding-left: 34px;
	}
	.span3{
		background: url(../assets/teachImg/att3.png) left center no-repeat;
	 padding-left: 34px;
	}
	.span4{
		background: url(../assets/teachImg/att2.png) left center no-repeat;
	 padding-left: 34px;
	}
}
/*延展性*/
.malleBottomMess.bottomMess{
	span{margin: 0 10px; font-size:16px;}
}
.malle-affairsList{
	li{font-size:17px;}
}

/*重放攻击*/
.replay-staBox{padding:20px 0;}
.bottomDiv .replay-affairsList{

	ul{width: 100%;}
	.blockItem{height:60px;width:66px;margin-left:32px; position: relative;}
	.lineBorder{width:32px;height: 4px;position: absolute;background:#fff;left:-36px;top:50%;margin-top: -4px; z-index: 1;}
.lineBorderH{width:4px;height:78px;position: absolute;
left:50%;margin-left:-50px;top:-52px; background:#fff;z-index:1}

	.blockItem-box{display: table;width:100%; height: 100%;}
	.blockItem.finshAffair{border:4px solid #5175f9}
	
	.item-box{display: table-cell;width:100%;height: 100%; vertical-align: middle; font-size: 14px;;}
	.r-chainName{margin-right: 0px; font-size:24px;margin-left: 70px;}
	
	.b-first{margin-left:226px;}
	
	.lineBorderV{width:16px;left:-20px}
	.affairName{font-size:16px; font-weight:normal;}
	
}
.bottomDiv .A-replay-affairsList{margin-top:10px;}
.bottomDiv .B-replay-affairsList{
	margin-top: 15px;
  .blockItem{border: 4px dashed red;}
  .blockItem.finshAffair{border: 4px solid red;}
}


	@media screen and (max-width:1440px) {
		.bottomDiv .pt {
			font-size: 18px;
		}
		.bottomDiv li {
			font-size: 16px;
		}
		.bottomDiv {
			width: 70%;
			left: 15%;
			margin-left: 0px;
			.stabox {
				height: 128px;
			}
			.attackStabox{
				height:168px;
			}
			
		}
	}
	
	@media screen and (max-width:1200px) {
		.blockBox {
			.col_block {
				font-size: 13px;
			}
		}
	}
</style>