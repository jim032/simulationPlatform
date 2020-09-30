<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent">

      <div class="userinfo" v-if="step==2 || step==3" style="text-align: center">
        <div class="d-user">
          <div class="d-icon"><img :src="iconUrl_1"/></div>
          <div class="el-button" style="color: blue" @click="gotoStep(3)">升级</div>
        </div>
      </div>


      <div class="divList" v-if="step==4  ">
        <div class="divTitle">
          软分叉
        </div>
        <div class="divC" >
          <div class="divC1">创世区块</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块一</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块二</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块三</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divA" >
          <div class="divC1">区块四</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divA" >
          <div class="divC1">区块五</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divA" >
          <div class="divC1">区块六</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
      </div>
      <div v-if="step==4 "  class="divline1_1" ></div>
      <div class="divList" v-if="step==4  ">
        <div class="divTitle" style="height: 0px">
        </div>
      <div v-if="step==4 " class="divRemark">注：绿色区块向前兼容,可以被读取</div>
      </div>
      <div class="divList" v-if="step==4  " style="margin-top: 25px">
        <div class="divTitle">
          硬分叉
        </div>
        <div class="divC" >
          <div class="divC1">创世区块</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块一</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块二</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块三</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块四</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块五</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC" >
          <div class="divC1">区块六</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
      </div>
      <div  v-if="step==4  " class="divline2_1" ></div>
      <div class="divList" v-if="step==4" style="margin-top:20px "  >
        <div class="divTitle" >

        </div>
        <div style="width: 98px;height: 98px;margin-left: 25px;padding: 3px" ></div>
        <div class="divB" >
          <div class="divC1">区块一</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divB" >
          <div class="divC1">区块二</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divB" >
          <div class="divC1">区块三</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divB" >
          <div class="divC1">区块四</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
      </div>
      <div  v-if="step==4" class="divline4_1" ></div>

      <div class="divList" v-if="step==4  ">
        <div class="divTitle" style="height: 0px">
        </div>
        <div v-if="step==4 " class="divRemark">注：红色区块不能向前兼容,可以被读取</div>
      </div>
      <div  v-if="step==4" class="divline3_1" ></div>
		</div>
		
	<!--左侧拖拽工具箱-->
	 <div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<!--<div class="tool1" ><span class="tool_icon" >加密</span></div>-->
			<!--<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon">解密</span></div>-->
			<!--<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon" ></span></div>-->
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
		@tipSure="tipSure"
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-soft-hard-fork.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
</style>
