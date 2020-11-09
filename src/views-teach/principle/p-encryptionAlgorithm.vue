<template>
<div class="pageWrap eaWrap">
	
	<!--中间hash算法内容布局-->
	<div class="mainContent">
		
	   <div class="eamain">
	   	  <div class="letter simBox">
	   	  	 <div>
	   	  	 	 <h3>字母置换表</h3>
	   	  	 	 <div class="eacontent">
	   	  	 	 	 <ul>
	   	  	 	 	 	 <li v-for="(item,index) in letterTable" :key="index">
	   	  	 	 	 	 	 <div class="ditem">{{item.number}}</div><div class="ditem ditem-last">{{item.letter}}</div>
	   	  	 	 	 	 </li>
	   	  	 	 	 </ul>
	   	  	 	 </div>
	   	  	 </div>
	   	  </div>
	   	  <div class="arrow" v-if="isEncryption==true"></div>
	   	  <div class="arrow" v-if="isDecrypt==true"></div>
	   	  <div class="letter simBox" v-if="isEncryption==true">
	   	  	 <div>
	   	  	 	  <h3>加密</h3>
	   	  	 	  <div class="formbox">
	   	  	 	  	 <p class="pmess">加密内容: {{encryptedContent.text}}</p>
	   	  	 	  	 <p class="funmess">
	   	  	 	  	 	'请按照左侧“字母置换表”所示，将上方内容加密 并输入到下方框内。
	   	  	 	  	 	 
	   	  	 	  	 </p>
	   	  	 	  	 <div class="pawin">
	   	  	 	  	 	 <div v-if="!isEncryptionSuc"><input type="text" v-model="encryptionText" /></div>
	   	  	 	  	 	 <div v-if="isEncryptionSuc">
	   	  	 	  	 	 	  
	   	  	 	  	 	 	  <p class="p-result">{{encryptionText}}</p>
	   	  	 	  	 	 </div>
	   	  	 	  	 </div>
	   	  	 	  	 <p class="resultmess" v-if="isEncryptionSuc">加密后内容为：{{encryptedContent.result}}</p>
	   	  	 	  	 <div class="com-btnBox">
	   	  	 	  	 	  <span class="com-btn cursorPoint" @click="sureContent">确定</span>
	   	  	 	  	 </div>
	   	  	 	  </div>
	   	  	 </div>
	   	  </div>
	   	  <div class="letter simBox" v-if="isDecrypt==true">
	   	  	 <div>
	   	  	 	  <h3>解密</h3>
	   	  	 	  <div class="formbox">
	   	  	 	  	 <p class="pmess">解密内容: {{encryptedContent.result}}</p>
	   	  	 	  	 <p class="funmess">
	   	  	 	  	 	'请按照左侧“字母置换表”所示，将上方内容解密 并输入到下方框内。
	   	  	 	  	 	 
	   	  	 	  	 </p>
	   	  	 	  	 <div class="pawin">
	   	  	 	  	 	 <div v-if="!isDecryptSuc"><input  type="text" v-model="decryptText" /></div>
	   	  	 	  	 	 <div v-if="isDecryptSuc">
	   	  	 	  	 	 	<p class="p-result">{{decryptText}}</p>
	   	  	 	  	 	 </div>
	   	  	 	  	 </div>
	   	  	 	  	 <p class="resultmess" v-if="isDecryptSuc">解密后内容为：{{encryptedContent.text}}</p>
	   	  	 	  	 <div class="com-btnBox">
	   	  	 	  	 	  <span class="com-btn" @click="surefContent">确定</span>
	   	  	 	  	 </div>
	   	  	 	  </div>
	   	  	 </div>
	   	  </div>
	   	  
	   </div>
		
	</div>
		<!--左侧拖拽工具箱-->
	<div class="leftTool symmetryTool">
		<div class="showbox" :class="{'showTool':showTool,'showBox1':funNum==1,'showBox2':funNum==2}" >
			<div class="tool1" @click.stop="poinfun(1)">
				 <span class="tool_icon" >
				 	  <p class="n_ltips">加密</p>
			   </span>
			</div>
			<div class="tool2" style="display: none;" >
				<span class="tool_icon">
					
		   	</span>
			</div>
			<div class="tool3" @click.stop="poinfun(2)">
				<span class="tool_icon"  >
					<p class="n_ltips">解密</p>
				</span>
				
			</div>
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
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
		@tipSure="tipSure" :isPrompt="isPrompt" :promptText="promptText" @surePrompt="surePrompt"
		:isRight = "isRight" :singleStep="singleStep"
	>
		
	</rightTips>	
	
</div>
</template>

<script src="../../function/p-encryptionAlgorithm.js"></script>

<style scoped lang="less">
	@import url("../../assets/teachCss/p-encryptionAlgorithm.less");
	.p-result{padding: 0 20px; background:#fff; text-align: left; color: #444;
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -ms-border-radius: 5px 5px 5px 5px;
    -o-border-radius: 5px 5px 5px 5px;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;}
</style>
