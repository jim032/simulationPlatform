<template>
<div class="pageWrap" >
	<!--中间拖拽区域样式-->
    <div class="pointInfo" ref="pointInfo" :style="{'min-height':mainheight+'px'}">
        <div class="box_point" ref="box_point" :style="{'padding-top':top+'px'}">
				<div class="pointBox clearfix " ref="pointBox">		
					
					<p class="onlineUser">
						在线人数({{onlineNumber}}/4)<br><span style="font-size:18px;">你好，{{onlineName}}</span>
					</p>
					<div class="s_linebox">	
						
					  <img class="i-img" :class="animateCss" :src="animateUrl+'?+' + time" v-if="showPic"/>
					</div>
					
					<div class="info" ref="info1"   v-for="(item,index) in userList" :key="index">
						<div class="fz-icon" v-if="item.type==1"></div>
						<img :src="item.onlineStatus?item.icon_1:item.icon" class="userIcon"  @click.stop="showPointInfo(item)"/>
						<p class="userName">{{item.name}}</p>
						<div class="btnbox" v-if="item.amount>0 &&　coin_name!='' && userId==item.userId || (item.type==2 && item.amount>0)"><span class="button" @click.stop="showFb(item,index+1)">转账</span></div>
					</div>

				</div>
		</div>
		
	</div>
	
	<!--点击设置弹出框-->
	<div class="transFb" v-if="setShow" @click="setShow=false;hasSettedShowUser=false">
		<div class="transMain" >
			<div class="formBox formBox_Set" @click.stop="setShow=true" >
				<span class="f_icon"></span>
				<div class="for_main ">
					<div class="col">
						<p class="lab">币种名称：</p>
						<div class="for_din">
							<input id="coinName" v-model="coinName" ref="coinName" type="text" placeholder="币种名称" autocomplete="off" maxlength="8" @change="validateCoinName($event)" :validate-event="true"/>
						</div>
					</div>
					<div class="col">
						<p class="lab">币种数量：</p>
						<div class="for_din">
							<input id="coinNumber" ref="moneyNumber"  placeholder="币种数量" autocomplete="off" maxlength="4" v-model="moneyNumber" @change="validateNum($event)" :validate-event="true"/>
						</div>
					</div>
					<div class="col">
						<p class="lab">初始拥有者：</p>
						<div class="for_din">
							<div class="dsel" >
								<!--<p @click.stop="showUser=!showUser">{{chooseUserObj.name==''?'初始拥有者':chooseUserObj.name}}</p>-->
								<p class="noselect">{{initialOwner.name}}</p>
								<ul class="userList" v-if="showUser">
									<li v-for="(item,index) in transUserList" @click.stop="chooseUser(item.userId,item.name)">{{item.name}}</li>
								</ul>
							</div>
						</div>
					</div>
					
					<div class="col">
						<button class="cashBtn" @click.stop="chooseCompleted()">发币</button>
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
	
	<!--点击转账弹出框-->
	<div class="transFb" v-if="transferShow" @click="transferShow=false">
		<div class="transMain">
			<div class="formBox" @click.stop="transferShow=true">
				<span class="f_icon"></span>
				<div class="for_main">
					<div class="col">
						<p class="lab">币种信息：</p>
						<div class="for_din">
							<p class="ptext">{{coin_name}}</p>
						</div>
					</div>
					<div class="col">
						<p class="lab">账户余额：</p>
						<div class="for_din">
							<p class="ptext">{{transUser.amount}}</p>
						</div>
					</div>
					<div class="col">
						<p class="lab">转账对象：</p>
						<div class="for_din">
							<div class="dsel" >
								<p @click.stop="showUser=!showUser">{{chooseUserObj.name==''?'请选择转账对象':chooseUserObj.name}}</p>
								<ul class="userList" v-if="showUser">
									<li v-for="(item,index) in transUserList" @click.stop="chooseUser(item.userId,item.name)">{{item.name}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col">
						<p class="lab">转账金额：</p>
						<div class="for_din">
							<input id="transferAmount" ref="transferAmount" v-model="transAmout" placeholder="请输入转账金额" autocomplete="off" maxlength="4" @change="validateNum1($event)" :validate-event="true"/>
						</div>
					</div>
					<div class="col">
						<button class="cashBtn"  @click.stop="submitTranfer()">确定转账</button>
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
	
	<!--左侧拖拽工具箱-->
	<div class="leftTool multipleLeftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon" @click.stop="poinfun(2)"><p class="n_ltips">币种设置</p></span></div>
			<div class="tool1" >
				<span class="tool_icon" ></span>
				<span class="tool_icon droppoint" @click.stop="poinfun(1)"><p class="n_ltips">添加机器人</p></span>
			</div>
			<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon"  @click.stop="poinfun(3)"><p class="n_ltips">智能合约部署</p></span></div>
		</div>
		<div class="icon" @click.stop="showTool=!showTool;menuShow = false"><span></span></div>
	</div>
	
    <comHeader ref="header" 
    	 :menuShow="menuShow" @clickMenu="clickMenu" :consoleShow="consoleShow" :menuText="menuText"
    	 :showReset="showReset"
    	 >
    	
    </comHeader>
    <!--右边步骤提示-->
    <comFooter ref="bottom" :pageName="pageName" :operaInfo="operaInfo" :blockPro="blockPro" :isBlcok="isBlcok" :step="step" ></comFooter>
	<rightTips :step="step" :confirShow="confirShow" :stepTips="stepTips" :pageName="pageName" @tipSure="tipSure" :winNum="winNum"></rightTips>	

</div>

</template>

<script src="../../function/p-smartContract-multiple.js"></script>


<style scoped lang="less">
@import url("../../assets/teachCss/p-smartContract.less");

.multipleLeftTool{
	.tool1 .tool_icon{
		background: url(../../assets/teachImg/icon_robot.png) center no-repeat;
	}
}
.pointBox .info{border:0 none; position: relative;}
.onlineUser{font-size:24px;color:#fff; text-align: center;
position: absolute;width:100%;left:0px;top:0px}

.fz-icon{width:64px;height: 52px;
background:url(../../assets/teachImg/icon_tiara.png); position: absolute;left:50%;margin-left: -32px;top:-36px;;}
.transFb .dsel p.noselect::after{border:0 none}

</style>

<style>
.g-rect-IE1 {
      fill: none;
      stroke-width: 2;
      stroke: #E2E2E2;
      stroke-linejoin: round;
      stroke-linecap: round;
  }
</style>