<template>
	<div class="pageWrap">
		<comHeader ref="header" :menuShow="menuShow" @clickMenu="clickMenu" :consoleShow="consoleShow" :menuText="menuText"></comHeader>
		<div class="pointInfo" ref="pointInfo" :style="{'min-height':mainheight+'px'}">
			<div class="box_point" ref="box_point" :style="{'padding-top':top+'px'}">
				<div class="pointBox clearfix" ref="pointBox">
					<div class="pointDiv">
						<div class="info info1 " data-div='1' ref="info1" @click="showPointInfo(1)">
							<div class="p_info cursorPoint">
								<p class="pname">{{divInfo1.pointText}}</p>
								<div class="picon" v-if="divInfo1.icon"><img :src="divInfo1.icon" /></div>
								<div class="d_sta" v-if="divInfo1.nodeStatus">
									<span>{{divInfo1.nodeStatus}}</span> <img src="../../assets/teachImg/wifi.png" />
								</div>

								<div class="p_pro" v-show="divInfo1.prowidth!='100' && divInfo1.prowidth">
									<div class="p_progress"></div>
								</div>
								<div class="p_sta" v-if="!divInfo1.nodeStatus">
									<div class="dp_sta">
										<p v-for="(item,index) in divInfo1.statusList" :key="index">{{item}}</p>
									</div>
								</div>
								<span class="winIcon " :class="{'show':divInfo1.beat==true}"></span>
								<span class="moneyIcon" :class="{'show':divInfo1.beat==true &&　step==4}"></span>
							</div>
						</div>

						<div class="sblock cursorPoint" v-if="divInfo1.prowidth==100" @click="showBlock(1)"> 创世<br>区块 </div>
						<div class="sblock sblock1 cursorPoint" v-if="divInfo1.broadcast==true" @click="showBlock(2)"> 区块1 </div>
					</div>

					<div class="pointDiv">
						<div class="info  info2" data-div='2' ref="info2" @click="showPointInfo(2)">
							<div class="p_info cursorPoint">
								<p class="pname">{{divInfo2.pointText}}</p>
								<div class="picon" v-if="divInfo2.icon"><img :src="divInfo2.icon" /></div>
								<div class="d_sta" v-if="divInfo2.nodeStatus">
									<span>{{divInfo2.nodeStatus}}</span> <img src="../../assets/teachImg/wifi.png" />
								</div>

								<div class="p_pro" v-show="divInfo2.prowidth!='100' && divInfo2.prowidth">
									<div class="p_progress"></div>
								</div>
								<div class="p_sta" v-if="!divInfo2.nodeStatus">
									<div class="dp_sta">
										<p v-for="(item,index) in divInfo2.statusList" :key="index">{{item}}</p>
									</div>
								</div>
								<span class="winIcon " :class="{'show':divInfo2.beat==true}"></span>
								<span class="moneyIcon" :class="{'show':divInfo2.beat==true &&　step==4}"></span>
							</div>
						</div>

						<div class="sblock cursorPoint" v-if="divInfo2.prowidth==100"  @click="showBlock(1)"> 创世<br>区块 </div>
						<div class="sblock sblock1 cursorPoint" v-if="divInfo2.broadcast==true" @click="showBlock(2)"> 区块1 </div>
					</div>

					<div class="pointDiv">
						<div class="info  info3 " data-div='3' ref="info3" @click="showPointInfo(3)">
							<div class="p_info cursorPoint">
								<p class="pname">{{divInfo3.pointText}}</p>
								<div class="picon" v-if="divInfo3.icon"><img :src="divInfo3.icon" /></div>
								<div class="d_sta" v-if="divInfo3.nodeStatus">
									<span>{{divInfo3.nodeStatus}}</span> <img src="../../assets/teachImg/wifi.png" />
								</div>

								<div class="p_pro" v-show="divInfo3.prowidth!='100' && divInfo3.prowidth">
									<div class="p_progress"></div>
								</div>
								<div class="p_sta" v-if="!divInfo3.nodeStatus">
									<div class="dp_sta">
										<p v-for="(item,index) in divInfo3.statusList" :key="index">{{item}}</p>
									</div>
								</div>
								<span class="winIcon " :class="{'show':divInfo3.beat==true}"></span>
								<span class="moneyIcon" :class="{'show':divInfo3.beat==true &&　step==4}"></span>
							</div>
						</div>

						<div class="sblock cursorPoint"  v-if="divInfo3.prowidth==100" @click="showBlock(1)"> 创世<br>区块 </div>
						<div class="sblock sblock1 cursorPoint" v-if="divInfo3.broadcast==true" @click="showBlock(2)"> 区块1 </div>
					</div>

					<div class="pointDiv">
						<div class="info info4" data-div='4' ref="info4" @click="showPointInfo(4)">
							<div class="p_info cursorPoint">
								<p class="pname">{{divInfo4.pointText}}</p>
								<div class="picon" v-if="divInfo4.icon"><img :src="divInfo4.icon" /></div>
								<div class="d_sta" v-if="divInfo4.nodeStatus">
									<span>{{divInfo4.nodeStatus}}</span> <img src="../../assets/teachImg/wifi.png" />
								</div>

								<div class="p_pro" v-show="divInfo4.prowidth!='100' && divInfo4.prowidth">
									<div class="p_progress"></div>
								</div>
								<div class="p_sta" v-if="!divInfo4.nodeStatus">
									<div class="dp_sta">
										<p v-for="(item,index) in divInfo4.statusList" :key="index">{{item}}</p>
									</div>
								</div>
								<span class="winIcon " :class="{'show':divInfo4.beat==true}"></span>
								<span class="moneyIcon" :class="{'show':divInfo4.beat==true &&　step==4}"></span>
							</div>
						</div>
						<div class="sblock cursorPoint" v-if="divInfo4.prowidth==100" @click="showBlock(1)">创世<br>区块</div>
						<div class="sblock sblock1 cursorPoint" v-if="divInfo4.broadcast==true" @click="showBlock(2)">区块1</div>
					</div>

					<svg class="lineBox" id="lineBox" xmlns="http://www.w3.org/2000/svg" version="1.1" ref="lineBox"></svg>
          
          <!--
					<div class="s_linebox " :class="{'animate':broadcast}">
						<div class="sendLine sendLine1"></div>
						<div class="sendLine sendLine2"></div>
						<div class="sendLine sendLine3"></div>	
					</div>
					-->
					 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="s_linebox " ref="s_linebox" id="b_line" v-if="broadcasting">
		        
		        <defs>
						    
						 <marker id="markerArrow" 
								markerUnits="strokeWidth" 
								markerWidth="10" 
								markerHeight="12" 
								viewBox="0 0 12 12" 
								refX="6" 
								refY="6" 
								orient="auto">
						        <path d="M2,2 L10,6 L2,10  L2,2" style="fill: #fff;" />
						</marker>
						</defs>
					
						<path id="chart" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke="white" stroke-width="2" d="" />
						<path id="arrow" fill="white" d="M0,0L0,-6L14,0L0,6" style="display: none;"/>
					
						
						<path id="chart1" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke="white" stroke-width="2" d="" />
						<path id="arrow1" fill="white" d="M0,0L0,-6L14,0L0,6" style="display: none;"/>
				
					
						  <path id="chart2" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke="white" stroke-width="2" d="" />
						  <path id="arrow2" fill="white" d="M0,0L0,-6L14,0L0,6" style="display: none;"/>
						
					</svg>

				</div>
			</div>

		</div>
		<!--左边工具箱-->
		<div class="leftTool">
			<div class="showbox" :class="{'showTool':showTool}">
				<div class="tool2" :class="{'animaImg2':funNum==2}"><span class="tool_icon" @click="poinfun(2)"><p class="n_ltips">节点出块</p></span></div>
				<div class="tool1">
					<span class="tool_icon"></span>
					<span class="tool_icon droppoint" v-bind:data-id="item.id" v-for="(item,index) in pointInto" :key="item.id" >
						 <p class="n_ltips">节点拖拽</p>
					</span>
				</div>
				<div class="tool3 " :class="{'animaImg3':funNum==3}">
					<span class="tool_icon" @click="poinfun(3)" > <p class="n_ltips">节点广播</p></span>
				</div>
			</div>
			<div class="icon" @click="showTool=!showTool;menuShow = false"><span></span></div>
		</div>
    
    <!--底部提示-->
		<comFooter ref="bottom" :pageName="pageName" :operaInfo="operaInfo" :blockPro="blockPro" :isBlcok="isBlcok" :step="step" ></comFooter>

		<!--右边步骤提示-->
		<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" @tipSure="tipSure" :winNum="winNum"></rightTips>

	</div>
</template>

<script src="../../function/p-nodeRun.js">
</script>	

<style scoped lang="less">
	@import url("../../assets/teachCss/p-nodeRun.less");
</style>
<style>
@import url("../../assets/teachCss/p-nodeRunAnimate.css");
</style>