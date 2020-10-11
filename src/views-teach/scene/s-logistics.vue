<template>
<div class="pageWrap ketStoreWrap crWrap">
	
	<div class="mainContent">
		   <div class="operaBpox" >
		   	  <div class="opr-col cursorPoint"  v-if="showNav" v-for="(item,index) in navList" :key="index" @click="functionStep(index+1)">
		   	  	 <div class="bg">
		   	  	    <div class="o-icon"><img :src="item.icon"/></div>
		   	  	    <p class="title">{{item.title}}</p>
		   	  	 </div>
		   	  </div>
		   	
		   	  <div class="opr-col cr-main" v-if="step==1 && showNav==false && chainFinsh==false">
		   	  	 <div class="bg">
		   	  	 	   <a class="sback" @click="stepBack"></a>
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">物品类型：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.type" maxlength="20"></i-input></div>
		   	  	 	   </div>
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">真实姓名：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.name" maxlength="20"></i-input></div>
		   	  	 	   </div>		   	  	 	  
		   	  	 	    <div class="cr_din">
		   	  	 	   	  <span class="lab">身份证号：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.id" maxlength='18'></i-input></div>
		   	  	 	   </div>
		   	  	 	    <div class="cr_din">
		   	  	 	   	  <span class="lab">电话号码：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.phoneNumber" maxlength='11'></i-input></div>
		   	  	 	   </div>
		   	  	 	   
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">简单说明：</span>
		   	  	 	   	   <div><i-input  placeholder="" type="textarea" :rows="4" v-model="rgisteInfo.intro" maxlength="150"></i-input></div>
		   	  	 	   </div>
		   	  	 	   <div class="com-btnBox"><a class="com-btn" @click="funstep1">存证上链</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   	  <!--点击代收点-->
		   	  <div class="opr-col cr-main" v-if="step==2 && showNav==false && chainFinsh==false">
		   	  	 <div class="bg">
		   	  	 	   <a class="sback" @click="stepBack"></a>
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">单 &nbsp;&nbsp;号：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="collectionPoint.oddNumber"></i-input></div>
		   	  	 	   </div>
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">始发地：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="collectionPoint.orgin" maxlength="20"></i-input></div>
		   	  	 	   </div>		   	  	 	  
		   	  	 	    <div class="cr_din">
		   	  	 	   	  <span class="lab">目的地：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="collectionPoint.destination" maxlength="20"></i-input></div>
		   	  	 	   </div>

		   	  	 	   <div class="com-btnBox"><a class="com-btn" @click="funstep2">存证上链</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   	  <div class="opr-col cr-main resultBox" v-if="chainFinsh">
		   	  	 <div class="bg"> 
		   	  	 	   <div class="suc_icon"></div>
		   	  	 	   <div class="mess">
		   	  	 	      <p class="result-p">{{resultMess}}</p>
		   	  	 	      <p class="result-p">{{step==1?rgisteInfo.affairHash:step==2?collectionPoint.affairHash:logistics.affairHash}} （请妥善保管）</p>
		   	  	 	   </div>
		   	  	 	   <div class="com-btnBox"><a class="com-btn" @click="sureChain">确认</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   	  <!--登记完点击出版社-->
		   	   <div class="opr-col cr-main resultBox" v-if="step==3 &&　showNav==false && chainFinsh==false">
		   	  	 <div class="bg"> 
		   	  	 	   <a class="sback" @click="stepBack"></a>
		   	  	 	   <div class="daddress">
		   	  	 	   	  <span>{{collectionPoint.orgin}}</span><span class="line"></span><span>{{collectionPoint.destination}}</span>
		   	  	 	   	  <ul class="addressList">
		   	  	 	   	  	 <li v-for="(item,index) in addresList" :key=""index>{{item}}</li>
		   	  	 	   	  </ul>
		   	  	 	   </div>
		   	  	 	   <div class="com-btnBox"><a class="com-btn" @click="funstep3">存证上链</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   	  <!--查证处查询-->
		   	  <div class="opr-col cr-main resultBox serachBox" v-if="step==4 &&　showNav==false && searchStep==0">
		   	  	  <div class="bg">
		   	  	  	 <a class="sback" @click="stepBack"></a>
		   	  	  	 <div class="searchIn">
		   	  	  	 	  <input type="text" placeholder="请输入寄件人上链哈希" v-model="searchText"/>
		   	  	  	 </div>
		   	  	  	 <div class="com-btnBox"><a class="com-btn" @click="serach">查询</a></div>
		   	  	  </div>
		   	  </div>
		   	  
		   	  <!--信息查询-->
		   	  <div class="opr-col cr-main resultBox searchResult" v-if="searchStep!=0 && showNav==false">
		   	  	 <div class="bg">
		   	  	  	 <div class="rest-tilte"><a class="sback" @click="searchBack"></a><p>信息查询</p></div>
		   	  	  	 <div class="stepIcon">	 
		   	  	  	 	  <span class="s-icon" :class="{'active':searchStep==1}">1</span>
		   	  	  	 	  <span class="s-icon" :class="{'active':searchStep==2}">2</span>
		   	  	  	 	  <span class="s-icon" :class="{'active':searchStep==3}">3</span>
		   	  	  	 </div>
		   	  	  	 <div class="info" v-if="searchStep==1">
		   	  	  	 	  <p class="result-p" >{{rgisteInfo.time | formatDate }} &nbsp;&nbsp;&nbsp;寄件人登记快递物件</p>
		   	  	  	 	  <p class="result-p">登记姓名：{{rgisteInfo.name}}</p>
		   	  	 	   	  <p class="result-p">物品类型：{{rgisteInfo.type}}</p>
		   	  	 	   	  <p class="result-p">电话号码：{{rgisteInfo.phoneNumber}}</p>
		   	  	 	   	  <p class="result-p">身份证号：{{rgisteInfo.id}}</p>
		   	  	 	   	  <p class="result-p">创意说明：{{rgisteInfo.intro}}</p>
		   	  	 	  </div>
		   	  	 	   <div class="info" v-if="searchStep==1">
		   	  	 	   	   <p class="result-p">登记区块高度：{{rgisteInfo.blockHeight}}</p>
		   	  	 	   	  <p class="result-p">区块哈希：{{rgisteInfo.blocHash}}</p>
		   	  	 	   	  <p class="result-p">事务哈希：{{rgisteInfo.affairHash}}</p>
		   	  	  	 </div>
		   	  	  	 
		   	  	  	 
		   	  	  	 <div class="info" v-if="searchStep==2">
		   	  	  	 	  <p class="result-p" v-if="searchStep==2">{{collectionPoint.time | formatDate }} &nbsp;&nbsp;&nbsp;代收点存证上链</p>
		   	  	  	 	  <p class="result-p">单&nbsp;&nbsp;号：{{collectionPoint.oddNumber}}</p>
		   	  	 	   	  <p class="result-p">始发地：{{collectionPoint.orgin}}</p>
		   	  	 	   	  <p class="result-p">目的地：{{collectionPoint.destination}}</p>
		   	  	 	  </div>
		   	  	 	   <div class="info" v-if="searchStep==2">
		   	  	 	   	   <p class="result-p">登记区块高度：{{collectionPoint.blockHeight}}</p>
		   	  	 	   	  <p class="result-p">区块哈希：{{collectionPoint.blocHash}}</p>
		   	  	 	   	  <p class="result-p">事务哈希：{{collectionPoint.affairHash}}</p>
		   	  	  	 </div>
		   	  	  	 
		   	  	  	
		   	  	  	 	  <div class="info" v-if="searchStep==3">
		   	  	  	 	  <p class="result-p" v-if="searchStep==2">{{logistics.time | formatDate }} &nbsp;&nbsp;&nbsp;物流运输信息</p>
		   	  	  	 	  <p class="result-p" v-for="(item,index) in addresList" :key=""index>{{item}}</p>
		   	  	 	  </div>
		   	  	 	   <div class="info" v-if="searchStep==3">
		   	  	 	   	   <p class="result-p">区块高度：{{logistics.blockHeight}}</p>
		   	  	 	   	  <p class="result-p">区块哈希：{{logistics.blocHash}}</p>
		   	  	 	   	  <p class="result-p">事务哈希：{{logistics.affairHash}}</p>
		   	  	  	 </div>
		   	  	  	 
		   	  	  	 <div class="com-btnBox" v-if="searchStep==1"><a class="com-btn" @click="nextSearch(1)">下一页</a></div>
		   	  	  	 <div class="com-btnBox" v-if="searchStep==2"><a class="com-btn" @click="nextSearch(2)">下一页</a></div>
		   	  	  	 <div class="com-btnBox" v-if="searchStep==3"><a class="com-btn" @click="nextSearch(3)">我知道了</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   </div>
	</div>
	
	<!--左侧拖拽工具箱
	<div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<div class="tool1" ><span class="tool_icon"></span></div>
			<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon"></span></div>
			<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon"></span></div>
		</div>
		<div class="icon" @click.stop="menuShow = false"><span></span></div>
	</div>
	-->
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo" 
		:blockPro="blockPro" :isBlcok="isBlcok" 
		:step="step"
		:pageName="pageName">
	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" 
		@tipSure="tipSure" :winNum="winNum" :singleStep="singleStep"
		
		>
		
	</rightTips>
</div>
</template>

<script src="../../function/s-logistics.js"></script>
<style scoped lang="less">
	@import url("../../assets/teachCss/p-keyStore.less");
  @import url("../../assets/teachCss/s-copyRight.less");
  .crWrap .operaBpox{width:1200px}
  .crWrap .cr-main .bg{min-height:400px;}
  .crWrap .cr-main{width:900px; margin: 0 auto;}
  .crWrap .cr-main .com-btnBox{padding-top: 30px;}
  .resultBox .daddress span{display: inline-block; font-size:24px;color:#fff; vertical-align: middle;}
  .resultBox .daddress .line{width:100px;height:2px;background: #fff; margin: 0 40px;}
  .resultBox .addressList{padding-top:40px;}
   .resultBox .addressList li{width:700px;margin: 0 auto; text-align: left; font-size:18px; color:#fff;
   padding:6px 0;}
  .crWrap .searchResult .info{width:750px}
</style>