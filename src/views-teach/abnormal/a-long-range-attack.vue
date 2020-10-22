<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent">

      <div class="mainBox">
      	<!--A链-->
        <div class="divList" >
        	<div class="divList-box">
            
            <div class="divA" :class="{'firstDivA':index==0 || index==AchainList.length-5}" v-for="(item,index) in AchainList" :key="index" 
            	v-if="(AchainList.length>5 && index>=AchainList.length-5) || AchainList.length<=5"
            >
              <div class="divC1" v-if="index==0">
              	<div class="tabcel">
	              	 	<p>创世</p>
	              	 	<p>区块</p>
              	</div>
              </div>
              
              <div class="divC1" v-if="index!=0">
              	<div class="tabcel">
              	   <p class="blockname">{{'区块'+index}}</p>
              	</div>
              </div>
              
            </div>
            <div class="divTitle">A链(10s)</div>
          </div>
          
          <div class="along-line divline1" :style="{width:chainNuber<5?(150*chainNuber+'px'):'480px;'}"></div>
        </div>
        <!--B链-->
        <div class="divList attackList"  v-if="attackList.length>0">
        	<div class="divList-box">
           
            <div class="divA" :class="{'firstDivA':index==0}" v-for="(item,index) in attackList" :key="index" 
            	v-if="(attackList.length>5 && index>=attackList.length-5) || attackList.length<=5"
            > 
              <div class="divC1">
              	<div class="tabcel">
              	 {{item.name}}
              	</div>
              </div>
              
            </div>
            <div class="divTitle">B链(8s)</div>
          </div>
          
           <!--<div class="along-line divline1" :style="{width:chainNuber<5?(150*chainNuber+'px'):'480px;'}"></div>-->
        </div>
        
        <div  v-if="step==2 ||step==3" class="divline2" ></div>
        <div  v-if="step==2 ||step==3" class="divline3"></div>
        <div class="divList" v-if="step==4"  >
          <div class="divTitle">
            B链
          </div>
          <div class="divA" >
            <div class="divC1">创世区块</div>
            <div class="divC2">当前哈希：</div>
            <div class="divC3">78236468354</div>
          </div>
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
          <div class="divB" >
            <div class="divC1">区块五</div>
            <div class="divC2">当前哈希：</div>
            <div class="divC3">78236468354</div>
          </div>
          <div class="divB" >
            <div class="divC1">区块六</div>
            <div class="divC2">当前哈希：</div>
            <div class="divC3">78236468354</div>
          </div>
        </div>
        <div  v-if="step==4" class="divline4" ></div>

      </div>


		</div>
		
	<!--左侧拖拽工具箱-->
	<div class="leftTool symmetryTool">
		<div class="showbox" :class="{'showTool':showTool,'showBox1':funNum==1,'showBox2':funNum==2}" >
			<div class="tool1" @click.stop="poinfun(1)">
				 <span class="tool_icon" >
				 	  <p class="n_ltips">攻击</p>
			   </span>
			</div>
			<div class="tool2" style="display: none;" >
				<span class="tool_icon">
					
		   	</span>
			</div>
			<div class="tool3" @click.stop="poinfun(2)">
				<span class="tool_icon"  >
					<p class="n_ltips">覆盖</p>
				</span>
				
			</div>
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

<script src="../../function/a-long-range-attack.js">
</script>

<style scoped lang="less">
@import url("../../assets/teachCss/abnormal.less");
	@import url("../../assets/teachCss/p-encryptionAlgorithm.less");
	.tool1 .tool_icon{background:url(../../assets/teachImg/icon_attack.png);
	background-size: contain;-webkit-background-size: contain;}
	.tool1,.tool3{background:0 none;}
	.tool3 .tool_icon{background:url(../../assets/teachImg/icon_cover.png);background-size: contain;-webkit-background-size: contain;}
</style>
<!--<style>-->
  <!--.divList{-->
    <!--width: 980px;-->
    <!--display: flex;-->
    <!--margin: 0 auto;-->
    <!--position: relative;-->
    <!--z-index: 2;-->
  <!--}-->
  <!--.divTitle{-->
    <!--width: 98px;-->
    <!--height: 98px;-->
    <!--font-size: 30px;-->
    <!--color: white;-->
    <!--text-align:center;-->
    <!--line-height: 100px;-->
  <!--}-->
  <!--.divA{-->
    <!--width: 98px;-->
    <!--height: 98px;-->
    <!--border-radius: 2px;-->
    <!--background-color: white;-->
    <!--border:4px lightseagreen solid;-->
    <!--margin-left: 25px;-->
    <!--color: black;-->
    <!--text-align: left;-->
    <!--padding: 3px;-->
  <!--}-->
  <!--.divB{-->
    <!--width: 98px;-->
    <!--height: 98px;-->
    <!--border-radius: 2px;-->
    <!--background-color: white;-->
    <!--border:4px red solid;-->
    <!--margin-left: 25px;-->
    <!--color: black;-->
    <!--text-align: left;-->
    <!--padding: 3px;-->
  <!--}-->

  <!--.divC1{-->
     <!--font-size: 16px;-->
     <!--font-weight: bold;-->
     <!--line-height: 35px;-->
   <!--}-->
  <!--.divC2{-->
    <!--font-size: 12px;-->
    <!--line-height: 20px;-->
  <!--}-->
  <!--.divC3{-->
    <!--font-size: 12px;-->
  <!--}-->
  <!--.divline1{-->
    <!--width: 500px;height: 2px;border:2px white solid; position: relative;top: -50px; left: -50px; margin: 0 auto;z-index: 0-->
  <!--}-->
  <!--.divline2{-->
    <!--width: 630px;height: 2px;border:2px white solid; position: relative;top: -50px; left: 80px; margin: 0 auto;z-index: 0-->
  <!--}-->
  <!--.divline4{-->
    <!--width: 800px;height: 2px;border:2px white solid; position: relative;top: -50px; left: 60px; margin: 0 auto;z-index: 0-->
  <!--}-->
  <!--.divline3{width:50px; height:50px; border-bottom:4px solid #fff; -webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-->
    <!--position: relative;top: -160px; left: -243px;z-index: 0; margin: 0 auto;-->
  <!--}-->
<!--</style>-->
