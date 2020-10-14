<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent" @click="noShowAmount()">
      <div class="mainBox" >
      	
      	<div class="userinfo" v-for="(item,index) in userList" :key="index">
      		 <div class="d-user" @click.stop>
            <div class="d-icon" @click="showAmount(item)"><img :src="item.isWarning?item.warnIcon:item.icon"/></div>
            <p class="d-name">{{item.name}}</p>
          </div>
      	</div>
      	
      	<!--
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
         -->
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
     :pageName="pageName" :isShowAmount="isShowAmount" :balance="balance"
      @showdel="showdel"  @enter="enter" @leave="leave" :transNumber="transNumber">
     
	</comFooter>
	<!--右边步骤提示-->
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" :lineDraw51Show="lineDraw51Show"
		@tipSure="tipSure" :singleStep="singleStep" :wprogress51="wprogress51" :upComputeUser="upComputeUser" 
    @sureUpCompute = "sureUpCompute" 
    @sureTransfer = "sureTransfer"
    @sureBale = "sureBale" @del="del" @canc="canc" @showUserAmount="showUserAmount"
    @hideLineDrawShow = "hideLineDrawShow"
    :userList="userList"
    
	>
		
	</rightTips>	
		
 </div>
</template>

<script src="../../function/a-attack51.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/a-attack51.less");
.eaWrap .mainContent .d-user{margin: 0 auto;}
</style>
