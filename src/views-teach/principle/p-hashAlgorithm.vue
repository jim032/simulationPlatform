<template>
<div class="pageWrap hashWrap">
	
	<!--中间hash算法内容布局-->
	<div class="mainContent">
		
		<div class="mainBox">
			 <div class="userinfo">
			 	   <div class="d-user">
			 	   	 <div class="d-icon"><img :src="iconUrl_1"/></div>
			 	   	 <p class="d-name">用户A</p>
			 	   </div>
			 	   <div class="d-file cursorPoint" @click="showHash(1)">文件A</div>
			 </div>
			 
			  <div class="userinfo1">
			 	   <div class="d-user">
			 	   	 <div class="d-icon"><img :src="iconUrl_2"/></div>
			 	   	 <p class="d-name">用户B</p>
			 	   </div>
			 	   <div class="d-file cursorPoint" v-if="fileFinsh" @click="showHash(2)">{{isAttack==1?'文件B':'文件A'}}</div>
			 </div>
			 
			 <div class="userinfo2">
			 	   <div class="d-user">
			 	   	 <div class="d-icon"><img :src="iconUrl_3"/></div>
			 	   	 <p class="d-name">用户C</p>
			 	   </div>  
			 </div>
			 
			 <div class="f-line f-line1" :class="{'animate':line1Show}"></div>
			 <div class="f-line f-line2" :class="{'animate':line2Show}"></div>
		</div>
	</div>
		<!--左侧拖拽工具箱-->
	<div class="leftTool hashTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<div class="tool1" :class="{'animaImg1':funNum==1}">
				 <span class="tool_icon" @click.stop="poinfun(1)"><p class="n_ltips">生成哈希</p></span>
		  </div>
			<div class="tool2" :class="{'animaImg2':funNum==2}" >
				<span class="tool_icon" @click.stop="poinfun(2)"><p class="n_ltips">发送文件</p></span>	
			</div>
			<div class="tool3" :class="{'animaImg3':funNum==3}">
				<span class="tool_icon"  @click.stop="poinfun(3)"><p class="n_ltips">校验哈希</p></span>
		  </div>
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
	</div>
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
		@tipSure="tipSure" :winNum="winNum"
		:isShowAttack="isShowAttack" 
		@attackMode = "attackMode"
		>
		
	</rightTips>	
	
</div>
</template>

<script src="../../function/p-hashAlgorithm.js"></script>

<style scoped lang="less">
	@import url("../../assets/teachCss/p-hashAlgorithm.less");
</style>
