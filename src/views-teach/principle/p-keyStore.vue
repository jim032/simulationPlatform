<template>
	<div class="pageWrap ketStoreWrap">
		
		  <!--中间的keyStore布局-->
		<div class="mainContent">
			  <div class="nav">
			  	 <div class="dstep " :class="{'active':step==index+1}" v-for="(item,index) in operaStep" :key="index">
			  	 	  <p class="snum">{{index+1}}</p>
			  	 	  <p class="sintro">{{item}}</p>
			  	 </div>
			  	
			  </div>
			  <div class="operBox">
			  	<div class="ioperBox">
			  		 <p>{{operaTips.mess}}</p>
			  		 <p v-for="(item,index) in operaTips.info">{{item}}</p>
			  		 <div class="din" v-if="step==1">
			  		 	 <input placeholder="请在此输入密码" type="password" autocomplete="off" v-model="ipassword"/>
			  		 </div>
			  		  <p class="progressMess" v-if="step==2 || step==3">
			  		  	 {{progressMess}} {{(hashProgress!=100)?hashProgress+'%':''}}
			  		  </p>
			  	  	<div class="progress" v-if="isShowProgress">
								<div class="curPro">
									<div class="proIcon" :style="{'width':hashProgress+'%'}"></div>
								</div>
							</div>
			  		 <div class="btnbox">
			  		 	  <button class="btn cursorPoint" v-if="step==1" @click="surePasword">确定</button>
			  		 	  <button class="btn cursorPoint" v-if="step==2 && hashProgress>=0 && hashProgress<100" @click="sureHash(1)">哈希计算</button>
			  		 	  <button class="btn cursorPoint" v-if="step==2 && hashProgress==100" @click="surePath">下一步</button>
			  		 	  <button class="btn cursorPoint" v-if="step==3 && hashProgress>=0 && hashProgress<100" @click="sureHash(2)">加密</button>
			  		 	  <button class="btn cursorPoint" v-if="step==3 && hashProgress==100" @click="surefinsh">下一步</button>
			  		 	   <button class="btn cursorPoint" v-if="step>=4"  @click="sureResult">我知道了</button>
			  		 </div>
			  	</div>
			  </div>
		</div>
		  
		  <!--左侧拖拽工具箱-->
			<div class="leftTool">
				<div class="showbox" :class="{'showTool':showTool}">
					<div class="tool1" ><span class="tool_icon"></span></div>
					<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon"></span></div>
					<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon"></span></div>
				</div>
				<div class="icon" @click.stop="clickTool"><span></span></div>
			</div>
		
		<!----头部-->
		<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
		<!--底部-->
		<comFooter ref="bottom" :operaInfo="operaInfo" 
			:blockPro="blockPro" :isBlcok="isBlcok" 
			:step="step"
			:pageName="pageName">
		</comFooter>
		<!--右边步骤提示-->
		<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" 
			@tipSure="tipSure" :winNum="winNum" :isPrompt="isPrompt" :promptText="promptText" @surePrompt="surePrompt"
			:singleStep="singleStep"
			
			>
			
		</rightTips>	
		

	</div>
</template>

<script src="../../function/p-keyStore.js"></script>
<style scoped lang="less">
	@import url("../../assets/teachCss/p-keyStore.less");
	
</style>
