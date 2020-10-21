<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent">
      <div class="mainBox" >
      	
      	<div class="userinfo" v-for="(item,index) in userList" :key="index">
      		 <div class="d-user" @click.stop>
            <div class="d-icon"><img :src="item.isWarning?item.warnIcon:item.icon"/></div>
            <p class="d-name">{{item.name}}</p>
          </div>
      	</div>
      </div>
     
		</div>
		
	<!--左侧拖拽工具箱-->
	 <div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<div class="tool1" :class="{'animaImg1':funNum==1}">
				<span class="tool_icon" @click.stop="poinfun(1)"><p class="n_ltips">转账</p></span>
			</div>
			<div class="tool2" :class="{'animaImg2':funNum==2}">
				<span class="tool_icon" @click.stop="poinfun(2)"><p class="n_ltips">截获</p></span>
			</div>
			<div class="tool3" :class="{'animaImg3':funNum==3}">
				<span class="tool_icon" @click.stop="poinfun(3)"><p class="n_ltips">打包</p></span>
			</div>
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
	</div>
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo" :pageName="pageName" :tansferInfo="tansferInfo" :step="step">

	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" :D2="D2"
		@tipSure="tipSure" @D2clickfinish="D2clickfinish" :lineDraw53Show="lineDraw53Show" :wprogress="wprogress"
		:singleStep="singleStep" @hideTrans="hideTrans" 
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-replay-attack.js">
</script>

<style scoped lang="less">

@import url("../../assets/teachCss/a-attack51.less");
.tool2 .tool_icon{background:url(../../assets/teachImg/icon_intercept.png) center no-repeat;}
.tool2 .n_ltips{top:25px;right:36px;}
</style>
