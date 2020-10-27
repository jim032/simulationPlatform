<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent">

      <div class="userinfo" style="text-align: center" v-if="!isUpgrade">
        <div class="d-user">
          <div class="d-icon"><img :src="iconUrl_1"/></div>
          <div class="el-button" style="color: blue" @click="gotoStep(3)">升级</div>
        </div>
      </div>
       
      <div class="blockDescription" v-if="isUpgrade">
      	 <p class="p1">为创世区块</p><p class="p2">为原链原规则出的块</p><p class="p3">为原链硬分叉后新规则出的区块</p>
      </div>
      <!--A链-->
        <div class="divList a-soft-list" v-if="isUpgrade">
        	<div class="divList-box">
            
            <div class="divA" :class="{'firstDivA':index==0}" v-for="(item,index) in AchainList" :key="index" 
            	
            >
              <div class="divC1" v-if="index==0">
              	<div class="tabcel">
	              	 	<img src="../../assets/teachImg/icon_newBlock.png" />
	              	 	<p>创世区块</p>
              	</div>
              </div>
              
              <div class="divC1" v-if="index!=0">
              	<div class="tabcel">
              	   <p class="blockname">{{'区块'+index}}</p>
              	   <p class="desrc">OLD</p>
              	</div>
              </div>
              <div class="lineBorder" v-if="index>0"></div>
            </div>
         </div>
        </div>
       
       <!--新链-->
       <div class="divList a-soft-list a-hard-attack-list" v-if="isUpgrade">
        	<div class="divList-box">
            
            <div class="divA" :class="{'firstDiv':index==0}" v-for="(item,index) in attackChainList" :key="index" >
              <div class="divC1" >
              	<div class="tabcel">
              	   <p class="blockname">{{item.name}}</p>
              	   <p class="desrc">NEW</p>
              	</div>
              </div>
              <div class="line1">
              	
              </div>
              <div class="line2"></div>
              <div class="lineBorder" v-if="index>0"></div>
            </div>
         </div>
        </div>
       
       
       <p class="blockMess" v-if="showMess">旧版本不会接受新版本创建的合法区块，认为新版本的合法区块是不合法的。所以很明显硬分叉 是不向前兼容。
       	要实现硬分叉所有的用户（矿工，交易所，普通用户）都要切换的新的协议版本上。</p>
		</div>
		
	<!--左侧拖拽工具箱-->
	 <div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<!--<div class="tool1" ><span class="tool_icon" >加密</span></div>-->
			<!--<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon">解密</span></div>-->
			<!--<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon" ></span></div>-->
		</div>
		<div class="icon" @click.stop="clickTool"><span></span></div>
	</div>
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo" >

	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" 
		@tipSure="tipSure" :isPrompt="isPrompt" :promptText="promptText" @surePrompt="surePrompt"
		:singleStep="singleStep"
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-hard-fork.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
</style>
