<template>
	<div class="pageWrap eaWrap">
		<!--中间内容布局-->
		<div class="mainContent">
      <div class="mainBox">
        <div class="userinfo" style="text-align: center">
          <div class="d-user">
            <div class="d-icon"><img :src="iconUrl_1"/></div>
            <div class="d-name" style="color: white">User A</div>
            <div class="d-name"  >
              <p class="d-n-info borderRadius5" >Balance: {{inputMoney}}(range 0-256)</p>
            </div>
          </div>
          
        </div>
      <div class="userinfo"   style="text-align: center;margin-top: 20px;">
          <div class="d-user">
            <a class="el-button" @click="clickCash">Withdrawal</a>
          </div>
        </div>
      </div>
    </div>
	<!--左侧拖拽工具箱-->
	 <div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}" >
			<!--<div class="tool1" ><span class="tool_icon"  @click.stop="poinfun(1)" >提现</span></div>
			<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon"></span></div>
			<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon" ></span></div>-->
		</div>
		<div class="icon" @click.stop="clickTool"><span></span></div>
	</div>
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>

	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo" >

	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" :D1="D1"
		@tipSure="tipSure" @D1clickfinish="D1clickfinish" :inputMoney="inputMoney"
		:isPrompt="isPrompt" :promptText="promptText" @surePrompt="surePrompt"
		:singleStep="singleStep"
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-smart-contract-loophole.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
.el-button{color:#1A71F5;font-size:16px;}
.d-n-info{color:#446EDE;;background-color: white;
font-size:14px;width: 200px;margin:8px auto 0 auto; padding: 4px 0;
}
</style>
