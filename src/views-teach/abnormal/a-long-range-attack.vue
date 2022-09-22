<template>
  <div class="pageWrap eaWrap">
    <!--中间hash算法内容布局-->
    <div class="mainContent">
      <div class="mainBox">
        <!--A链-->
        <div class="divList" v-if="step != 5">
          <div class="divList-box">
            <div
              class="divA"
              :class="{
                firstDivA: index == 0 || index == AchainList.length - 6
              }"
              v-for="(item, index) in AchainList"
              :key="index"
              v-if="
                (AchainList.length > 7 && index >= AchainList.length - 7) ||
                  AchainList.length <= 7
              "
            >
              <div class="divC1" v-if="index == 0">
                <div class="tabcel">
                  <p>genesis</p>
                  <p>block</p>
                </div>
              </div>

              <div class="divC1" v-if="index != 0">
                <div class="tabcel">
                  <p class="blockname">{{ "区块" + index }}</p>
                </div>
              </div>
              <div class="lineBorder" v-if="index > 0"></div>
            </div>
            <div class="divTitle">Chain A(10s)</div>
          </div>

          <!--<div class="along-line divline1" :style="{width:chainNuber<7?(120*chainNuber+'px'):'480px;'}"></div>-->
        </div>
        <!--B链-->
        <div
          class="divList attackList"
          v-if="attackList.length > 0 && step != 5"
        >
          <div class="divList-box">
            <div
              class="divA"
              :class="{
                firstDivA: index == 0,
                firstDivA1: click_attackNumber == 1 && index == 0
              }"
              v-for="(item, index) in attackList"
              :key="index"
            >
              <div class="divC1">
                <div class="tabcel">
                  {{ item.name }}
                </div>
              </div>
              <div class="lineBorderH" v-if="index == 0"></div>
              <div class="lineBorder" v-if="index > 0"></div>
            </div>
            <div class="divTitle">Chain B(8s)</div>
          </div>

          <!--<div class="along-line divline1" :style="{width:chainNuber<5?(150*chainNuber+'px'):'480px;'}"></div>-->
        </div>

        <!--覆盖A链的B链-->
        <div
          class="divList mergedChainList"
          v-if="mergedChainList.length > 0 && step == 5"
        >
          <div class="divList-box">
            <div class="divTitle">Chain B</div>
            <div
              class="divA"
              :class="{
                warnChian: index > 1 || (click_attackNumber == 1 && index > 0),
                firstDivA: index == 0
              }"
              v-for="(item, index) in mergedChainList"
              :key="index"
            >
              <div class="divC1">
                <div class="tabcel">
                  {{ item.name }}
                </div>
              </div>
              <div class="lineBorder" v-if="index > 0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--左侧拖拽工具箱-->
    <div class="leftTool symmetryTool">
      <div
        class="showbox"
        :class="{
          showTool: showTool,
          showBox1: funNum == 1,
          showBox2: funNum == 2
        }"
      >
        <div class="tool1" @click.stop="poinfun(1)">
          <span class="tool_icon">
            <p class="n_ltips">attack</p>
          </span>
        </div>
        <div class="tool2" style="display: none;">
          <span class="tool_icon"> </span>
        </div>
        <div class="tool3" @click.stop="poinfun(2)">
          <span class="tool_icon">
            <p class="n_ltips">cover</p>
          </span>
        </div>
      </div>
      <div
        class="icon"
        @click.stop="
          showTool = !showTool;
          menuShow = false;
        "
      >
        <span></span>
      </div>
    </div>
    <!----头部-->
    <comHeader
      ref="header"
      :menuShow="menuShow"
      @clickMenu="clickMenu"
      :menuText="menuText"
    ></comHeader>
    <!--底部-->
    <comFooter ref="bottom" :operaInfo="operaInfo"> </comFooter>
    <!--右边步骤提示-->
    <rightTips
      :step="step"
      :confirShow="confirShow"
      :stepTips="stepTips"
      :pageName="pageName"
      @tipSure="tipSure"
      :singleStep="singleStep"
    >
    </rightTips>
  </div>
</template>

<script src="../../function/a-long-range-attack.js"></script>

<style scoped lang="less">
@import url("../../assets/teachCss/abnormal.less");
@import url("../../assets/teachCss/p-encryptionAlgorithm.less");
.tool1 .tool_icon {
  background: url(../../assets/teachImg/icon_attack.png);
  background-size: contain;
  -webkit-background-size: contain;
}
.tool1,
.tool3 {
  background: 0 none;
}
.tool3 .tool_icon {
  background: url(../../assets/teachImg/icon_cover.png);
  background-size: contain;
  -webkit-background-size: contain;
}
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
