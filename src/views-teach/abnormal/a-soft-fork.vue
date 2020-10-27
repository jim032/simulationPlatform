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
      	 <p class="p1">为创世区块</p><p class="p2">为原链原规则出的块</p><p class="p3">为原链软分叉后新规则出的区块</p>
      </div>
      <!--A链-->
        <div class="divList a-soft-list" v-if="isUpgrade">
        	<div class="divList-box">
            
            <div class="divA" :class="{'firstDivA':index==0 , 'warningDivA':index==3 || index==5}" v-for="(item,index) in AchainList" :key="index" 
            	
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
              	   <p class="desrc">{{index==3 || index==5?'NEW':'OLD'}}</p>
              	</div>
              </div>
              <div class="lineBorder" v-if="index>0"></div>
            </div>
          </div>
          
          <!--<div class="along-line divline1" :style="{width:chainNuber<7?(120*chainNuber+'px'):'480px;'}"></div>-->
        </div>

       <p class="blockMess" v-if="showMess">软分叉的新的规则是以前旧规则的子集，所有被新版本认为是合法的区块也会被以前旧版本认 为是合法的。旧版本会接受新版本创建的区块。新版本和旧版本是兼容的。</p>
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

<script src="../../function/a-soft-fork.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
</style>
