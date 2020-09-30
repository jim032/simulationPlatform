<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
    <div class="mainContent" @click="noShowAmount()">
      <div class="mainBox">
        <div class="userinfo">
          <div class="d-user" @click.stop>
            <div class="d-icon" @click="showAmount(1)"><img :src="iconUrl_1"/></div>
            <p class="d-name">用户A</p>
          </div>
        </div>
        <div class="userinfo1">
          <div class="d-user" @click.stop>
            <div class="d-icon" @click="showAmount(2)"><img :src="iconUrl_2"/></div>
            <p class="d-name">用户B</p>
          </div>
        </div>
        <div class="userinfo2">
          <div class="d-user" @click.stop>
            <div class="d-icon" @click="showAmount(3)"><img :src="iconUrl_3"/></div>
            <p class="d-name">用户C</p>
          </div>
        </div>
      </div>
    </div>
		
	<!--左侧拖拽工具箱-->
	 <div class="leftTool mall_leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<div class="tool1" :class="{'animaImg1':funNum==1}" @click.stop="poinfun(1)">
				<span class="tool_icon"><p class="n_ltips">转账</p></span>
			</div>
			<div class="tool2" :class="{'animaImg2':funNum==2}" @click.stop="poinfun(2)">
				<span class="tool_icon"><p class="n_ltips">修改</p></span>
			</div>
			<div class="tool3" :class="{'animaImg3':funNum==3}" @click.stop="poinfun(3)">
				<span class="tool_icon"><p class="n_ltips">打包</p></span>
			</div>
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
	</div>
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo"
             :step="step" :tansferInfo="tansferInfo" :tansferInfoEdit="tansferInfoEdit"
             :pageName="pageName" :isShowAmount="isShowAmount" :balance="balance">

	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" :lineDrawMalleabilityShow="lineDrawMalleabilityShow"
		@tipSure="tipSure" :singleStep="singleStep" :selectIndexDataM="selectIndexDataM" :balance="balance" :wprogressmalleability="wprogressmalleability"
    @sureEditAmount = "sureEditAmount"
    @sureTransfer = "sureTransfer" @showUserAmount="showUserAmount"
    @upToEditAmount="upToEditAmount" :toEditAmount="toEditAmount"
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-malleability-attack.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/a-attack51.less");
.mall_leftTool{
	.tool2 .tool_icon{background:url(../../assets/teachImg/51_4.png) center no-repeat;}
}
</style>
