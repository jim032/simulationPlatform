<template>
<div class="pageWrap ketStoreWrap crWrap">
	
	<div class="mainContent">
		   <div class="operaBpox" >
		   	  <div class="opr-col"  v-if="showNav" v-for="(item,index) in navList" :key="index" @click="functionStep(index+1)">
		   	  	 <div class="bg">
		   	  	    <div class="o-icon"><img :src="item.icon"/></div>
		   	  	    <p class="title">{{item.title}}</p>
		   	  	 </div>
		   	  </div>
		   	
		   	  <div class="opr-col cr-main" v-if="step==1 && showNav==false && chainFinsh==false">
		   	  	 <div class="bg">
		   	  	 	   <a class="sback" @click="stepBack"></a>
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">捐赠姓名：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.name" maxlength="20"></i-input></div>
		   	  	 	   </div>
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">捐赠内容：</span>
		   	  	 	   	   <div>
		   	  	 	   	   	<i-select v-model="rgisteInfo.goodName" style="width:200px">
								        <i-option v-for="(item,index) in goodList" :value="item.label" :key='index'>{{ item.label }}</i-option>
								     </i-select>
								     <div class="sub_in">
								        <i-input  placeholder="请输入数量" v-model="rgisteInfo.goodNumer" maxlength="10"></i-input>
								     </div>
								     <div class="sub_in"> 
								     	  <i-input  placeholder="请输入简介信息" v-model="rgisteInfo.goodAbout" maxlength="15"></i-input>
								     </div>
		   	  	 	   	   </div>
		   	  	 	   </div>
		   	  	 	    <div class="cr_din">
		   	  	 	   	  <span class="lab">捐赠地址：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.address" maxlength="24"></i-input></div>
		   	  	 	   </div>
		   	  	 	    <div class="cr_din">
		   	  	 	   	  <span class="lab">受益人：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.beneficiary" maxlength="20"></i-input></div>
		   	  	 	   </div>
		   	  	 	   <div class="cr_din">
		   	  	 	   	  <span class="lab">捐赠机构：</span>
		   	  	 	   	   <div><i-input  placeholder="" v-model="rgisteInfo.mechanism" maxlength="20"></i-input></div>
		   	  	 	   </div>
		   	  	 	   <div class="com-btnBox"><a class="com-btn" @click="funstep1">存证上链</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   	  <div class="opr-col cr-main resultBox" v-if="chainFinsh">
		   	  	 <div class="bg"> 
		   	  	 	   <div class="suc_icon"></div>
		   	  	 	   <div class="mess">
		   	  	 	      <p class="result-p">{{step==1?resultMess:resultMess1}}</p>
		   	  	 	      <p class="result-p">{{step==1?rgisteInfo.affairHash:step==2?press.affairHash:''}}</p>
		   	  	 	   </div>
		   	  	 	   <div class="com-btnBox"><a class="com-btn" @click="sureChain">确认</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   	  <!--登记完点击出版社-->
		   	   <div class="opr-col cr-main resultBox" v-if="step==2 &&　showNav==false && chainFinsh==false">
		   	  	 <div class="bg"> 
		   	  	 	   <a class="sback" @click="stepBack"></a>
		   	  	 	   <div class="blockInfo">
		   	  	 	   	  <p class="result-p">捐赠区块高度：{{rgisteInfo.blockHeight}}</p>
		   	  	 	   	  <p class="result-p">捐赠区块哈希：{{rgisteInfo.blocHash}}</p>
		   	  	 	   	  <p class="result-p">捐赠事务哈希：{{rgisteInfo.affairHash}}</p>
		   	  	 	   </div>
		   	  	 	   <div class="userInfo">
		   	  	 	   	  <p class="pTitle">捐赠信息</p>
		   	  	 	   	  <p class="result-p">捐赠姓名：{{rgisteInfo.name}}</p>
		   	  	 	   	  <p class="result-p">捐赠内容：{{rgisteInfo.goodName}},&nbsp;{{rgisteInfo.goodNumer}},&nbsp;{{rgisteInfo.goodAbout}}</p>
		   	  	 	   	  <p class="result-p">捐赠地址：{{rgisteInfo.address}}</p>
		   	  	 	   	  <p class="result-p">受益人：{{rgisteInfo.beneficiary}}</p>
		   	  	 	   	  <p class="result-p">捐赠机构：{{rgisteInfo.mechanism}}</p>
		   	  	 	   </div>
		   	  	 	   <div class="com-btnBox"><a class="com-btn" @click="funstep2">存证上链</a></div>
		   	  	 </div>
		   	  </div>
		   	  
		   	  <!--查证处查询-->
		   	  <div class="opr-col cr-main resultBox serachBox" v-if="step==3 &&　showNav==false && searchStep==0">
		   	  	  <div class="bg">
		   	  	  	 <a class="sback" @click="stepBack"></a>
		   	  	  	 <div class="searchIn">
		   	  	  	 	  <input type="text" placeholder="请输入登记哈希进行查询" v-model="searchHash"/>
		   	  	  	 </div>
		   	  	  	 <div class="com-btnBox"><a class="com-btn" @click="serach">查询</a></div>
		   	  	  </div>
		   	  </div>
		   	  
		   	  <!--信息查询-->
		   	  <div class="opr-col cr-main resultBox searchResult" v-if="searchStep!=0 && showNav==false">
		   	  	 <div class="bg">
		   	  	  	 <div class="rest-tilte"><a class="sback" @click="searchStep=1"></a><p>信息查询</p></div>
		   	  	  	 <div class="stepIcon">
		   	  	  	 	 
		   	  	  	 	  <span class="s-icon" :class="{'active':searchStep==1}">1</span><span class="s-icon" :class="{'active':searchStep==2}">2</span>
		   	  	  	 </div>
		   	  	  	 <div class="info" v-if="searchStep==1">
		   	  	  	 	  <p class="result-p" >{{rgisteInfo.time | formatDate }} &nbsp;&nbsp;&nbsp;捐赠人{{rgisteInfo.name}}登记捐赠信息</p>
				   	  	 	  <p class="result-p">捐赠内容：{{rgisteInfo.goodName}},&nbsp;{{rgisteInfo.goodNumer}},&nbsp;{{rgisteInfo.goodAbout}}</p>
		   	  	 	   	  <p class="result-p">捐赠地址：{{rgisteInfo.address}}</p>
		   	  	 	   	  <p class="result-p">受益人：{{rgisteInfo.beneficiary}}</p>
		   	  	 	   	  <p class="result-p">捐赠机构：{{rgisteInfo.mechanism}}</p>
		   	  	 	   </div>
		   	  	 	   <div class="info" v-if="searchStep==1">
		   	  	 	   	   <p class="result-p">登记区块高度：{{rgisteInfo.blockHeight}}</p>
		   	  	 	   	  <p class="result-p">区块哈希：{{rgisteInfo.blocHash}}</p>
		   	  	 	   	  <p class="result-p">事务哈希：{{rgisteInfo.affairHash}}</p>
		   	  	  	 </div>
		   	  	  	 
		   	  	  	 <div class="info" v-if="searchStep==2">
		   	  	  	 	  <p class="result-p" >{{press.time | formatDate }} &nbsp;&nbsp;&nbsp;红十字会佐证存证上链</p>
				   	  	 	  <p class="result-p">捐赠内容：{{rgisteInfo.goodName}},&nbsp;{{rgisteInfo.goodNumer}},&nbsp;{{rgisteInfo.goodAbout}}</p>
		   	  	 	   	  <p class="result-p">捐赠地址：{{rgisteInfo.address}}</p>
		   	  	 	   	  <p class="result-p">受益人：{{rgisteInfo.beneficiary}}</p>
		   	  	 	   	  <p class="result-p">捐赠机构：{{rgisteInfo.mechanism}}</p>
		   	  	 	   </div>
		   	  	 	   <div class="info" v-if="searchStep==2">
		   	  	 	   	   <p class="result-p">登记区块高度：{{press.blockHeight}}</p>
		   	  	 	   	  <p class="result-p">区块哈希：{{press.blocHash}}</p>
		   	  	 	   	  <p class="result-p">事务哈希：{{press.affairHash}}</p>
		   	  	  	 </div>
		   	  	  	 
		   	  	  	 <div class="com-btnBox" v-if="searchStep==1"><a class="com-btn" @click="nextSearch(1)">下一页</a></div>
		   	  	  	 <div class="com-btnBox" v-if="searchStep==2"><a class="com-btn" @click="nextSearch(2)">我知道了</a></div>
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

<script src="../../function/s-publicWelfare.js"></script>
<style scoped lang="less">
	@import url("../../assets/teachCss/p-keyStore.less");
	@import url("../../assets/teachCss/s-copyRight.less");
	.sub_in{display:inline-block; vertical-align:middle; width: 146px;}
	.cr-main .com-btnBox {padding-top:15px;}
	
	
</style>
<style>
	.sub_in input{font-size:14px;}
</style>