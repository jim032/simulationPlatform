<template>
  <div class="pageWrap hashWrap">
    <!--中间hash算法内容布局-->
    <div class="mainContent">
      <div class="mainBox">
        <div class="userinfo">
          <div class="d-user cursorPoint" @click="showUserInfo(userA, 1)">
            <div class="d-icon"><img :src="iconUrl_1" /></div>
            <p class="d-name">User A</p>
          </div>
          <div class="d-file">data</div>
        </div>

        <div class="userinfo1">
          <div class="d-user cursorPoint" @click="showUserInfo(userB, 2)">
            <div class="d-icon"><img :src="iconUrl_2" /></div>
            <p class="d-name">User B</p>
          </div>
          <div class="d-file" v-if="fileFinsh">data</div>
        </div>

        <div class="userinfo2">
          <div class="d-user cursorPoint" @click="showUserInfo(userC, 3)">
            <div class="d-icon"><img :src="iconUrl_3" /></div>
            <p class="d-name">User C</p>
          </div>
        </div>

        <div class="f-line f-line1" :class="{ animate: line1Show }"></div>
        <div class="f-line f-line2" :class="{ animate: line2Show }"></div>
        <p class="failtext" v-if="isFail">Parsing failed</p>
      </div>
    </div>
    <!--左侧拖拽工具箱-->
    <div class="leftTool eccTool">
      <div class="showbox" :class="{ showTool: showTool }">
        <div class="tool1" :class="{ animaImg1: funNum == 1 }">
          <span class="tool_icon" @click.stop="poinfun(1)"
            ><p class="n_ltips">Generate hash</p></span
          >
        </div>
        <div class="tool2" :class="{ animaImg2: funNum == 2 }">
          <span class="tool_icon" @click.stop="poinfun(2)"
            ><p class="n_ltips">send data</p></span
          >
        </div>
        <div class="tool3" :class="{ animaImg3: funNum == 3 }">
          <span class="tool_icon" @click.stop="poinfun(3)"
            ><p class="n_ltips">Parsing data</p></span
          >
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
    <comFooter
      ref="bottom"
      :operaInfo="operaInfo"
      :blockPro="blockPro"
      :isBlcok="isBlcok"
      :step="step"
      :invisable="invisable"
      :pageName="pageName"
    >
    </comFooter>
    <!--右边步骤提示-->
    <rightTips
      :step="step"
      :confirShow="confirShow"
      :stepTips="stepTips"
      :pageName="pageName"
      :lineDrawShow="lineDrawShow"
      @tipSure="tipSure"
      :winNum="winNum"
      @sureLine="sureLine"
      @surePoint="surePoint"
      :wprogress="wprogress"
      :isParse="isParse"
      @sureParse="sureParse"
    >
    </rightTips>
  </div>
</template>

<script src="../../function/p-ellipticCurveCryptography.js"></script>

<style scoped lang="less">
@import url("../../assets/teachCss/p-hashAlgorithm.less");
.tool1 .tool_icon {
  left: 20px;
}
.failtext {
  font-size: 24px;
  color: #fff;
  position: absolute;
  left: 450px;
  top: 226px;
}
</style>
