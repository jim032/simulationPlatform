<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent" @click="noShowAmount()">
      <div class="mainBox" >
      	
      	<div class="userinfo" v-for="(item,index) in userList" :key="index">
      		 <div class="d-user" @click.stop>
            <div class="d-icon" >
            	<img :src="item.isWarning?item.warnIcon:item.icon" @click="showAmount(item)"/>
            	 <el-tooltip class="item" effect="light" content="已收到转账记录，但钱未到账" placement="right-start" v-if="item.isAva">
						      <div class="icon-quest"><img src="../../assets/teachImg/icon_question.png"/></div>
						    </el-tooltip>
            </div>
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
				<span class="tool_icon" @click.stop="poinfun(2)"><p class="n_ltips">提升算力</p></span>
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
	<comFooter ref="bottom" :operaInfo="operaInfo"
     :step="step" :tansferInfo="tansferInfo" :isshowdel="isshowdel"
     :pageName="pageName" :isShowAmount="isShowAmount" 
      @showdel="showdel"  @enter="enter" @leave="leave" :transNumber="transNumber">    
	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" :lineDraw51Show="lineDraw51Show"
		@tipSure="tipSure" :singleStep="singleStep" :wprogress51="wprogress51" :upComputeUser="upComputeUser" 
    @sureUpCompute = "sureUpCompute" 
    @sureTransfer = "sureTransfer"
    @sureBale = "sureBale" @del="del" @canc="canc"
    @hideLineDrawShow = "hideLineDrawShow"
    :userList="userList"
    :isShowDelete="isShowDelete"
    :D1="D1"
    
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-attack51.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/a-attack51.less");
.eaWrap .mainContent .d-user{margin: 0 auto;}
.d-icon{position: relative;}
.icon-quest{position: absolute; right:26px;top:0px}
</style>
