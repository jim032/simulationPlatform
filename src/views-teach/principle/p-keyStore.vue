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
			  		 <p>{{operaTips.mess}}
			  		   	<el-tooltip class="item" effect="light" content='' placement="top-start" v-if="step>=4">
	                 <div slot="content">
	                  	{</br>
	                  	  &nbsp;&nbsp;"address":"WX13f2BUuMRWfSsd49EUB7khmAcrZaWh42ns",</br>
	                  		&nbsp;&nbsp;"kdfparams":{</br>
	                  		&nbsp;&nbsp;&nbsp;&nbsp;"salt":"3f78d45853cea5733fbba35bcf293f7622876f121e90ab24be0043fef6475047",</br>
	                  		&nbsp;&nbsp;&nbsp;&nbsp;"memoryCost":20480,</br>
	                  		&nbsp;&nbsp;&nbsp;&nbsp;"parallelism":2,</br>
	                  		&nbsp;&nbsp;&nbsp;&nbsp;"timeCost":4</br>
	                  	  &nbsp;&nbsp;},</br>
	                  	 &nbsp;&nbsp;"id":"5d024e76-77a1-4d49-a9be-54538530d488",</br>
	                  	 &nbsp;&nbsp;"kdf":"argon2id",</br>
	                  	 &nbsp;&nbsp;"version":"2",</br>
	                  	 &nbsp;&nbsp;"mac":"4ea737543ce3349b24b470e902db6a0caead8abad3e8371c8d99ed6a22253cdc",</br>
	                  	 &nbsp;&nbsp;"crypto":{</br>
	                  		&nbsp;&nbsp;&nbsp;&nbsp;"cipher":"aes-256-ctr",</br>
	                  		&nbsp;&nbsp;&nbsp;&nbsp;"ciphertext":"0ff1bee4a2b5d03d0160cb6eb561b1d039a249e86ccaa6d914416e1228c7be84",</br>
	                  		&nbsp;&nbsp;&nbsp;&nbsp;"cipherparams":{</br>
	                  			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"iv":"f9eeed3e3e545f036c057501e1deb827"</br>
	                  	 &nbsp;&nbsp;&nbsp;&nbsp;}</br>
	                    &nbsp;&nbsp;}</br>
	                  }
	                 	
	                 </div>
	                 <span class="see-keystore">(check keyStore)</span>
	              </el-tooltip>
			  		 </p>
			  		 <p v-for="(item,index) in operaTips.info">{{item}}</p>
			  		 <div class="din" v-if="step==1">
			  		 	 <input placeholder="Please enter your password here" type="password" autocomplete="off" v-model="ipassword" maxlength='20'/>
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
			  		 	  <button class="btn cursorPoint" v-if="step==1" @click="surePasword">determine</button>
			  		 	  <button class="btn cursorPoint" v-if="step==2 && hashProgress>=0 && hashProgress<100" @click="sureHash(1)">Hash computation</button>
			  		 	  <button class="btn cursorPoint" v-if="step==2 && hashProgress==100" @click="surePath">next step</button>
			  		 	  <button class="btn cursorPoint" v-if="step==3 && hashProgress>=0 && hashProgress<100" @click="sureHash(2)">encryption</button>
			  		 	  <button class="btn cursorPoint" v-if="step==3 && hashProgress==100" @click="surefinsh">next step</button>
			  		 	   <button class="btn cursorPoint" v-if="step>=4"  @click="sureResult">I got it!</button>
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
	.see-keystore{font-size:16px;color: #fff;}
</style>
