<template>
  <div class="pageWrap eaWrap">
    <!--中间hash算法内容布局-->
    <div class="mainContent">
      <div class="userinfo" style="text-align: center" v-if="!isUpgrade">
        <div class="d-user">
          <div class="d-icon"><img :src="iconUrl_1" /></div>
          <div class="el-button" style="color: blue" @click="gotoStep(3)">
            upgrade
          </div>
        </div>
      </div>

      <div class="blockDescription" v-if="isUpgrade">
        <p class="p1">It's the genesis block</p>
        <p class="p2">Block out of the original rule for the original chain</p>
        <p class="p3">
          It is the new rule block after hard branching of the original chain
        </p>
      </div>
      <!--A链-->
      <div class="divList a-soft-list" v-if="isUpgrade">
        <div class="divList-box">
          <div
            class="divA"
            :class="{
              firstDivA: index == 0,
              warningDivA: index == 3 || index == 5
            }"
            v-for="(item, index) in AchainList"
            :key="index"
          >
            <div class="divC1" v-if="index == 0">
              <div class="tabcel">
                <img src="../../assets/teachImg/icon_newBlock.png" />
                <p>genesis block</p>
              </div>
            </div>

            <div class="divC1" v-if="index != 0">
              <div class="tabcel">
                <p class="blockname">{{ "block" + index }}</p>
                <p class="desrc">
                  {{ index == 3 || index == 5 ? "NEW" : "OLD" }}
                </p>
              </div>
            </div>
            <div class="lineBorder" v-if="index > 0"></div>
          </div>
        </div>

        <!--<div class="along-line divline1" :style="{width:chainNuber<7?(120*chainNuber+'px'):'480px;'}"></div>-->
      </div>

      <p class="blockMess" v-if="showMess">
        The new rule of soft bifurcation is a subset of the old rule, and all
        blocks that are considered legal by the new version will also be
        considered legal by the old version. The old version will accept the
        blocks created by the new version. The new and old versions are
        compatible.
      </p>
    </div>

    <!--左侧拖拽工具箱-->
    <div class="leftTool">
      <div class="showbox" :class="{ showTool: showTool }">
        <!--<div class="tool1" ><span class="tool_icon" >加密</span></div>-->
        <!--<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon">解密</span></div>-->
        <!--<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon" ></span></div>-->
      </div>
      <div class="icon" @click.stop="clickTool"><span></span></div>
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
      :isPrompt="isPrompt"
      :promptText="promptText"
      @surePrompt="surePrompt"
      :singleStep="singleStep"
    >
    </rightTips>
  </div>
</template>

<script src="../../function/a-soft-fork.js"></script>

<style scoped="" lang="less">
@import url("../../assets/teachCss/abnormal.less");
</style>
