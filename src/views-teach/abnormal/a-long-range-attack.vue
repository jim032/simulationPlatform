<template>
	<div class="pageWrap eaWrap">
		<!--中间hash算法内容布局-->
		<div class="mainContent">

      <div class="mainBox">

        <div class="divList" v-if="step==2 ||step==3">
            <div class="divTitle">

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
          <div class="divTitle">
            A链
          </div>
          </div>
        <div  v-if="step==2 ||step==3" class="divline1" ></div>
        <div class="divList" v-if="step==2 ||step==3" style="margin-top: 25px">
          <div class="divTitle">

          </div>
          <div style="width: 98px;height: 98px;margin-left: 25px;padding: 3px" >

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
          <div class="divTitle">
            B链
          </div>
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

        <div class="userinfo" v-if="step==2 || step==3" style="text-align: center;">
          <div class="d-user">
            <div class="el-button" style="color: blue" @click="poinfun(2)">测速</div>
          </div>
        </div>
      </div>


		</div>
		
	<!--左侧拖拽工具箱-->
	 <div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<!--<div class="tool1" :class="{'animaImg2':funNum==1}" ><span class="tool_icon" ></span></div>-->
			<!--<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon"  @click.stop="poinfun(2)">测速</span></div>-->
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

<script src="../../function/a-long-range-attack.js">
</script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
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
