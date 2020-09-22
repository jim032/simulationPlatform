<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent">
		</div>
		
	<!--左侧拖拽工具箱-->
	 <div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<div class="tool1" ><span class="tool_icon" >加密</span></div>
			<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon">解密</span></div>
			<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon" ></span></div>
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
	</div>
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo" >
	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" 
		@tipSure="tipSure" :singleStep="singleStep"
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-attack51.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
</style>