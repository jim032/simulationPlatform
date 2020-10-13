<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent">
      <div class="divList divList-replay" v-if="step>=2  " style="margin-top: 25px">
        <div class="divTitle">
          硬分叉
        </div>
        <div class="divA" >
          <div class="divC1">创世区块</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divA" >
          <div class="divC1">区块一</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divA" >
          <div class="divC1">区块二</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divA" >
          <div class="divC1">区块三</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divA" >
          <div class="divC1">区块四</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
        </div>
        <div class="divC"  v-if="step>=4">
          <div class="divC1">区块五</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
          <div class="divC3">提现金额:20</div>
        </div>
        <!--
        <div class="divTitle">
          A链
        </div>
        -->
      </div>
      <div  v-if="step>=2  " class="divline2_2" ></div>
      <div  v-if="step>=4  " class="divline2_2_1" ></div>
      <div class="divList divList-replay" v-if="step>=2" style="margin-top:20px "  >
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
        <div class="divC"  v-if="step>=6">
          <div class="divC1">区块五</div>
          <div class="divC2">当前哈希：</div>
          <div class="divC3">78236468354</div>
          <div class="divC3">提现金额:20</div>
        </div>
        <!--
        <div class="divTitle">
          B链
        </div>
        -->
      </div>
      <div  v-if="step>=2" class="divline4_1" ></div>
      <div  v-if="step>=2" class="divline3_2" ></div>
      <div  v-if="step>=6" class="divline4_1_1" ></div>
		</div>
		
	<!--左侧拖拽工具箱-->
	 <div class="leftTool replay-lefttool">
		<div class="showbox" :class="{'showTool':showTool,'showBox1':funNum==1,'showBox2':funNum==2}">
			<div class="tool1" >
				 <span class="tool_icon"  @click.stop="poinfun(1)" ><p class="n_ltips">提现</p></span>
			</div>
			<div class="tool2"  style="display: none;">
				  <span class="tool_icon"  @click.stop="poinfun(2)" ><p class="n_ltips">广播</p></span>
		 </div>
			<div class="tool3"><span class="tool_icon"  @click.stop="poinfun(2)" ><p class="n_ltips">广播</p></span></div>
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
	</div>
	<!----头部-->
	<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	<!--底部-->
	<comFooter ref="bottom" :operaInfo="operaInfo" >

	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" :D2="D2"
		@tipSure="tipSure" @D2clickfinish="D2clickfinish" :lineDraw53Show="lineDraw53Show" :wprogress="wprogress"
		:singleStep="singleStep"
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-replay-attack.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
.replay-lefttool {
	.showbox{background:url(../../assets/teachImg/tool22n.png);}
	.showBox1{background: url(../../assets/teachImg/tool21h.png);}
	.showBox2{ background: url(../../assets/teachImg/tool22h.png);}
	.tool1{
		width:41px;height: 41px; background:0 none;
		.tool_icon{
			width: 41px;background:url(../../assets/teachImg/51_tx.png);left:31px
		}
	}
	.tool3{
		width:41px;height: 41px;background:0 none;
		.tool_icon{
			width: 41px;background:url(../../assets/teachImg/icon_broadcast.png);
			left:60px;bottom:60px;
		}
	}
}
.divList-replay{width:960px;}
</style>
