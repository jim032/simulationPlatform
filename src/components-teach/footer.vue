<template>
	<div class="staDiv bottomDiv">
		<div class="stabox">
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
				<p class="protext" v-if="isBlcok && step==2">正在进行节点难度计算：{{blockPro}}%</p>
			  <p class="protext" v-if="isBlcok && step==3 ">节点正在进行打包广播操作：{{blockPro}}%</p>
			  <div class="progress" v-if="isBlcok">
				<div class="curPro">
					<div class="proIcon" :style="{'width':blockPro+'%'}"></div>
				</div>
			</div>
			</template>
			
			<template v-if="pageName==3">	
			<p class="protext" v-if="isBlcok && step==1">hash值正在生成：{{blockPro}}%</p>
			<p class="protext" v-if="isBlcok && (step==31 ||step==33)">正在通过梅克尔树生成hash并校验：{{blockPro}}%</p>
			<div class="progress" v-if="isBlcok">
				<div class="curPro">
					<div class="proIcon" :style="{'width':blockPro+'%'}"></div>
				</div>
			</div>
			</template>
			
			<div class="blockBox" v-if="isShowBlock">

				<div class="col_block">
					<p>区块高度：</p>
					<p>{{this.height}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 2">
					<p>区块高度：</p>
					<p>{{this.height - 1}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 3">
					<p>区块高度：</p>
					<p>{{this.height - 2}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 4">
					<p>区块高度：</p>
					<p>{{this.height - 3}}</p>
				</div>
				<div class="col_more" v-if="this.height >7 ">
					<p>...</p>
				</div>
				<div class="col_block" v-if="this.height >= 5">
					<p>区块高度：</p>
					<p>{{this.height - 4 > 3 ? 3: this.height - 4}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 6">
					<p>区块高度：</p>
					<p>{{this.height - 5 > 2 ? 2: this.height - 5}}</p>
				</div>
				<div class="col_block" v-if="this.height >= 7">
					<p>区块高度：</p>
					<p>{{this.height - 6 > 1 ? 1: this.height - 6}}</p>
				</div>
			</div>
			
			
			<!---51%攻击-->
			<template v-if="pageName==51 && isShowAmount==false">
				<ul class="affairsList" v-if="step >= 2">
      		 <li class="affairItem" v-for="(item,index) in tansferInfo" :key="index"
      		 	@mouseenter="enter(index)" @mouseleave="leave()"
      		 	>
      		 	 <div style="text-align: center;font-weight:bold;font-size: 25px">事务{{index+1}}</div>
              <div >{{item.initiate}}给{{item.object}}转账{{item.amount}}</div>
              <div class="deltrans" v-if="index!=0 && (step == 4 || step == 11)"><a class="chooseBtn" @click="showdel(index)" >删除</a></div>
      		 </li>
      	</ul>
		
      </template>

      <template v-if="pageName==54 && isShowAmount==false">
      	<ul class="affairsList" v-if="step >= 2">
      		 <li class="affairItem" v-for="(item,index) in tansferInfo" :key="index">
      		 	 <div style="text-align: center;font-weight:bold;font-size: 25px">事务{{index+1}}</div>
              <div >{{item.initiate}}给{{item.object}}转账{{item.amount}}</div>
      		 </li>
      	</ul>
      	<ul class="affairsList" v-if="tansferInfoEdit.length > 0">
      		 <li class="affairItem" v-for="(item,index) in tansferInfoEdit" :key="index">
      		 	 <div style="text-align: center;font-weight:bold;font-size: 25px">事务{{tansferInfo.length+1}}</div>
              <div >{{item.initiate}}给{{item.object}}转账{{item.amount}}</div>
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
	    }
		},
		watch: {
			'operaInfo': function() {
				let that = this;

			}
		},
		methods: {
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
		width: 120px;height: 100px;.borderRadius(2px,2px,2px,2px); margin-right: 0px;
    background-color: white;border: 4px solid lightblue;margin-left: 25px;color: black;text-align:center;padding: 3px;
    cursor: pointer;display: inline-block;
    vertical-align: middle; position: relative;
    }
  .deltrans{display:none;}
  .affairItem:hover .deltrans{background: rgba(255, 0, 0, 0.75); position: absolute;width:120px;height:100px;
  left:-4px;top:-4px; display: block;.borderRadius(2px,2px,2px,2px);}
  .chooseBtn{width:85px;height:30px; display: block; position: absolute;
  left:50%;margin-left:-44px;top:50%;margin-top:-15px; line-height: 30px;
  background:#fff;.borderRadius(5px,5px,5px,5px); overflow: hidden;
  }
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