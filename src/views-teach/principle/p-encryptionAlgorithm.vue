<template>
  <div class="pageWrap eaWrap">
    <!--中间hash算法内容布局-->
    <div class="mainContent">
      <div class="eamain">
        <div class="letter simBox">
          <div>
            <h3>Alphabet permutation table</h3>
            <div class="eacontent">
              <ul>
                <li v-for="(item, index) in letterTable" :key="index">
                  <div class="ditem">{{ item.number }}</div>
                  <div class="ditem ditem-last">{{ item.letter }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="arrow" v-if="isEncryption == true"></div>
        <div class="arrow" v-if="isDecrypt == true"></div>
        <div class="letter simBox" v-if="isEncryption == true">
          <div>
            <h3>encryption</h3>
            <div class="formbox">
              <p class="pmess">
                Encrypted content: {{ encryptedContent.text }}
              </p>
              <p class="funmess">
                Please encrypt the content above and input it into the box below
                according to the "alphabet replacement table" on the left.
              </p>
              <div class="pawin">
                <div v-if="!isEncryptionSuc">
                  <input type="text" v-model="encryptionText" />
                </div>
                <div v-if="isEncryptionSuc">
                  <p class="p-result">{{ encryptionText }}</p>
                </div>
              </div>
              <p class="resultmess" v-if="isEncryptionSuc">
                The encrypted content is as follows:{{
                  encryptedContent.result
                }}
              </p>
              <div class="com-btnBox">
                <span class="com-btn cursorPoint" @click="sureContent"
                  >determine</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="letter simBox" v-if="isDecrypt == true">
          <div>
            <h3>decrypt</h3>
            <div class="formbox">
              <p class="pmess">
                decryption content: {{ encryptedContent.result }}
              </p>
              <p class="funmess">
                Please decrypt the content above and input it into the box below
                as shown in the "alphabet substitution table" on the left.
              </p>
              <div class="pawin">
                <div v-if="!isDecryptSuc">
                  <input type="text" v-model="decryptText" />
                </div>
                <div v-if="isDecryptSuc">
                  <p class="p-result">{{ decryptText }}</p>
                </div>
              </div>
              <p class="resultmess" v-if="isDecryptSuc">
                After decryption, the content is as follows:{{
                  encryptedContent.text
                }}
              </p>
              <div class="com-btnBox">
                <span class="com-btn" @click="surefContent">determine</span>
              </div>
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
            <p class="n_ltips">encryption</p>
          </span>
        </div>
        <div class="tool2" style="display: none;">
          <span class="tool_icon"> </span>
        </div>
        <div class="tool3" @click.stop="poinfun(2)">
          <span class="tool_icon">
            <p class="n_ltips">decrypt</p>
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
      :isPrompt="isPrompt"
      :promptText="promptText"
      @surePrompt="surePrompt"
      :isRight="isRight"
      :singleStep="singleStep"
    >
    </rightTips>
  </div>
</template>

<script src="../../function/p-encryptionAlgorithm.js"></script>

<style scoped lang="less">
@import url("../../assets/teachCss/p-encryptionAlgorithm.less");
.p-result {
  padding: 0 20px;
  background: #fff;
  text-align: left;
  color: #444;
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
  box-sizing: border-box;
}
</style>
