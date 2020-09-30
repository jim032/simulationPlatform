<template>
	<div class="pageWrap eaWrap">
		<!--中间内容布局-->
		<div class="mainContent">
      <div class="mainBox">
        <div class="userinfo" style="text-align: center">
          <div class="d-user">
            <div class="d-icon"><img :src="iconUrl_1"/></div>
            <div class="d-name" style="color: white">用户A</div>
            <div class="d-name"  >
              <p style="color: darkblue;background-color: white;border-radius:5px;width: 200px;margin: 0 auto ">余额：{{inputMoney}}元(范围0-256)</p>
            </div>
          </div>
          
        </div>
      <div class="userinfo"   style="text-align: center;margin-top: 20px;">
          <div class="d-user">
            <div class="el-button" style="color: blue" @click="poinfun(1)">提现</div>
          </div>
        </div>
      </div>
    </div>
	<!--左侧拖拽工具箱-->
	 <div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<!--<div class="tool1" ><span class="tool_icon"  @click.stop="poinfun(1)" >提现</span></div>
			<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon"></span></div>
			<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon" ></span></div>-->
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
	</div>
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>

	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo" >

	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" :D1="D1"
		@tipSure="tipSure" @D1clickfinish="D1clickfinish" :inputMoney="inputMoney"
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-smart-contract-loophole.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
</style>
