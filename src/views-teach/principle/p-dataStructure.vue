<template>
  <div class="pageWrap ketStoreWrap">
    <!--中间的keyStore布局-->
    <div class="mainContent">
      <div class="data-box">
        <div
          class="d-col d-box1 cursorPoint"
          @click="showBlock"
          v-if="!showContent"
        >
          <img src="../../assets/teachImg/block_icon.png" />
        </div>
        <div class="d-col d-box2" v-if="showContent">
          <div><img src="../../assets/teachImg/block_main.png" /></div>
        </div>
      </div>
    </div>

    <!--左侧拖拽工具箱-->
    <div class="leftTool">
      <div class="showbox" :class="{ showTool: showTool }">
        <div class="tool1"><span class="tool_icon"></span></div>
        <div class="tool2" :class="{ animaImg2: funNum == 2 }">
          <span class="tool_icon"></span>
        </div>
        <div class="tool3" :class="{ animaImg3: funNum == 3 }">
          <span class="tool_icon"></span>
        </div>
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
    <comFooter
      ref="bottom"
      :operaInfo="operaInfo"
      :blockPro="blockPro"
      :isBlcok="isBlcok"
      :step="step"
      :pageName="pageName"
    >
    </comFooter>
    <!--右边步骤提示-->
    <rightTips
      :step="step"
      :confirShow="confirShow"
      :stepTips="stepTips"
      :pageName="pageName"
      @tipSure="tipSure"
      :winNum="winNum"
      :isPrompt="isPrompt"
      :promptText="promptText"
      @surePrompt="surePrompt"
    >
    </rightTips>
  </div>
</template>

<script src="../../function/p-dataStructure.js"></script>
<style scoped lang="less">
@import url("../../assets/teachCss/p-keyStore.less");
.d-col {
  display: inline-block;
  text-align: center;
}
.data-box {
  text-align: center;
  font-size: 0px;
  width: 1400px;
  margin: 0 auto;
}
.d-box1 {
  width: 25%;
  height: 100%;
}
.d-box2 {
  width: 80%;
  overflow: hidden;
  position: relative;
}
.data-box img {
  max-width: 100%;
}
.d-box2 div {
  padding-top: -40px;
}

@media only screen and (max-width: 1400px) {
  .data-box {
    width: 90%;
    margin: 0 40px;
  }
}
</style>
