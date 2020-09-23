<template>
	<div class="pageWrap consolePage boxSizing" @click="autoFocus()">
		<div class="consoleMain">	 
			 <div class="consoleBox">
			 	  <div class="command boxSizing" >
			 	  	 <div class="tipsBox">
			 	  	 	  <p>请输入指令进行操作：</p>
			 	  	 	  <p>
			 	  	 	  	<span>tds height：查看当前区块高度</span>
			 	  	 	  	<span>tds miner start：开启挖矿</span>
			 	  	 	  </p>
			 	  	 	  
			 	  	 	  <p>
			 	  	 	  	<span>tds accounts：所有账户列表</span>
			 	  	 	  	<span>tds miner stop：关闭挖矿</span>
			 	  	 	  </p>
			 	  	 	  
			 	  	 	  <p>tds newAccounts("password")：通过密码生成账号，password为参数</p>
			 	  	 	  <p>tds getBalance("address”)：通过地址查询余额，address为参数</p>
			 	  	 </div>
			 	  	 
			 	  	 <div class="comm-main">
			 	  	 	 <ul>
			 	  	 	    <li class="r-item" v-for="(item,index) in total">{{item}}</li>
			 	  	 	 </ul>
			 	  	 	 <input autofocus="autofocus" class="incommand" id="in"  v-model="command" v-focus resize="none"
                 @keyup.enter="enter()"/>
			 	  	 </div>
			 	  	 
			 	  	 <div class="blockList">
			 	  	    <div class="dblock">
			 	  	      <span>区块1</span>
			 	  	      <span>hash高度</span>
			 	  	      <span>78</span>
			 	  	    </div>
			 	  	    <div class="line"></div>
			 	  	    <div class="dblock">
			 	  	      <span>区块1</span>
			 	  	      <span>hash高度</span>
			 	  	      <span>78</span>
			 	  	    </div>
			 	  	    <div class="line"></div>
			 	  	    <div class="dblock">
			 	  	      <span>区块1</span>
			 	  	      <span>hash高度</span>
			 	  	      <span>78</span>
			 	  	    </div>
			 	  	    <div class="line"></div>
			 	  	    <div class="dblock">
			 	  	      <span>区块1</span>
			 	  	      <span>hash高度</span>
			 	  	      <span>78</span>
			 	  	    </div>
			 	  	    <div class="line"></div>
			 	  	    <div class="dblock">
			 	  	      <span>区块1</span>
			 	  	      <span>hash高度</span>
			 	  	      <span>78</span>
			 	  	    </div>
			 	  	    <div class="line"></div>
			 	  	    <div class="dblock">
			 	  	      <span>区块1</span>
			 	  	      <span>hash高度</span>
			 	  	      <span>78</span>
			 	  	    </div>
			 	  	    <div class="line"></div>
			 	  	    <div class="dblock">
			 	  	      <span>区块1</span>
			 	  	      <span>hash高度</span>
			 	  	      <span>78</span>
			 	  	    </div>
			 	  	    <div class="line"></div>
			 	  	 </div>
			 	  </div>
			 </div>
		</div>
	  <!----头部-->
		<comHeader ref="header" :courseId="courseId" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	</div>
</template>

<script src="../../function/console.js"></script>

<style scoped lang="less">
@import url("../../assets/teachCss/style.less");

.boxSizing{
	-moz-box-sizing: border-box;  
   -webkit-box-sizing: border-box; 
     -o-box-sizing: border-box; 
     -ms-box-sizing: border-box; 
     box-sizing: border-box; 
}

.consolePage{background: url(../../assets/teachImg/index_bg.png) left center no-repeat;
 background-size:cover; -webkit-background-size:cover; display:table;
 padding-top:150px; padding-bottom:30px;
  
 
 
 .consoleMain{display: table-cell; vertical-align: middle;}
 .consoleBox{width:1000px; height: 600px;margin: 0 auto;background: rgba(255, 255, 255, 0.5);
 .borderRadius(10px,10px,10px,10px);overflow:hidden; padding:10px;
 .command{width:100%;height: 100%; background:#000;.borderRadius(5px,5px,5px,5px);
 position: relative;
   
 }
 }
 
 
 .tipsBox{border-bottom:2px dashed #fff; margin: 0 20px;font-size:16px;color:#fff; padding:10px 0;
   p{padding:5px 0;}
   p span{width:48%;display: inline-block;}
 }
 .blockList{text-align:center; position: absolute;width:100%;left:0px;bottom:30px;}
 .dblock{
 	 width:8%;border:1px dashed #fff;display: inline-block; vertical-align:middle;text-align: left;
 	 span{font-size:14px;color:#fff;display: block; white-space:nowrap; padding-left:10px;}
 	 
 }
 .line{width:4%;height:2px;background:#fff;display: inline-block; vertical-align:middle;
 margin: 0 8px;}
  .line:last-child{display: none;}
  
 .comm-main{height:240px;overflow: auto; margin-top:15px; margin: 10px 0px 10px 20px;}
 .incommand{background:0 none; color:#fff;font-size:16px; width:300px;}

 .r-item{font-size:16px;color:#fff;}
}

</style>