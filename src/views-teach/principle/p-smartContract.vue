<template>
  <div class="pageWrap">
    <!--中间拖拽区域样式-->
    <div
      class="pointInfo"
      ref="pointInfo"
      :style="{ 'min-height': mainheight + 'px' }"
    >
      <div
        class="box_point"
        ref="box_point"
        :style="{ 'padding-top': top + 'px' }"
      >
        <div class="pointBox clearfix " ref="pointBox">
          <!--金币动画-->
          <div class="s_linebox">
            <img
              class="i-img"
              :class="animateCss"
              :src="animateUrl + '?+' + time"
              v-if="showPic"
            />
          </div>

          <div class="info info1" ref="info1" data-div="1">
            <img
              :src="divInfo1.icon"
              class="userIcon"
              v-if="divInfo1.icon"
              @click.stop="showPointInfo(1)"
            />
            <p class="userName" v-if="divInfo1.userName">
              {{ divInfo1.userName }}
            </p>
            <div
              class="btnbox"
              v-if="divInfo1.operable == 1 && step == 4 && divInfo1.balance > 0"
            >
              <span class="button" @click.stop="showFb(1, divInfo1.userId)"
                >Transfer</span
              >
            </div>
          </div>
          <div class="info info2" ref="info2" data-div="2">
            <img
              :src="divInfo2.icon"
              class="userIcon"
              v-if="divInfo2.icon"
              @click.stop="showPointInfo(2)"
            />
            <p class="userName" v-if="divInfo2.userName">
              {{ divInfo2.userName }}
            </p>
            <div
              class="btnbox"
              v-if="divInfo2.operable == 1 && step == 4 && divInfo2.balance > 0"
            >
              <span class="button" @click.stop="showFb(2, divInfo2.userId)"
                >Transfer</span
              >
            </div>
          </div>
          <div class="info info3" ref="info3" data-div="3">
            <img
              :src="divInfo3.icon"
              class="userIcon"
              v-if="divInfo3.icon"
              @click.stop="showPointInfo(3)"
            />
            <p class="userName" v-if="divInfo3.userName">
              {{ divInfo3.userName }}
            </p>
            <div
              class="btnbox"
              v-if="divInfo3.operable == 1 && step == 4 && divInfo3.balance > 0"
            >
              <span class="button" @click.stop="showFb(3, divInfo3.userId)"
                >Transfer</span
              >
            </div>
          </div>
          <div class="info info4" ref="info4" data-div="4">
            <img
              :src="divInfo4.icon"
              class="userIcon"
              v-if="divInfo4.icon"
              @click.stop="showPointInfo(4)"
            />
            <p class="userName" v-if="divInfo4.userName">
              {{ divInfo4.userName }}
            </p>
            <div
              class="btnbox"
              v-if="divInfo4.operable == 1 && step == 4 && divInfo4.balance > 0"
            >
              <span class="button" @click.stop="showFb(4, divInfo4.userId)"
                >Transfer</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--点击设置弹出框-->
    <div
      class="transFb"
      v-if="setShow"
      @click="
        setShow = false;
        hasSettedShowUser = false;
      "
    >
      <div class="transMain">
        <div class="formBox formBox_Set" @click.stop="setShow = true">
          <span class="f_icon"></span>
          <div class="for_main ">
            <div class="col">
              <p class="lab">Currency name:</p>
              <div class="for_din">
                <input
                  id="coinName"
                  type="text"
                  placeholder="Currency name"
                  autocomplete="off"
                  maxlength="20"
                />
              </div>
            </div>
            <div class="col">
              <p class="lab">Currency quantity:</p>
              <div class="for_din">
                <input
                  id="coinNumber"
                  placeholder="Currency quantity"
                  autocomplete="off"
                  maxlength="9"
                  v-model="moneyNumber"
                  @change="validateNum($event)"
                  :validate-event="true"
                />
              </div>
            </div>
            <div class="col">
              <p class="lab">Initial owner:</p>
              <div class="for_din">
                <div class="dsel">
                  <p @click.stop="showUser = !showUser">
                    {{
                      chooseUserObj == ""
                        ? "Please select Initial owner"
                        : "User" + chooseUserObj
                    }}
                  </p>
                  <ul class="userList" v-if="showUser">
                    <li
                      v-for="(item, index) in userList"
                      @click.stop="chooseUser(item.userId)"
                    >
                      {{ item.userName }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col">
              <button
                class="cashBtn cursorPoint"
                @click.stop="chooseCompleted()"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--点击转账弹出框-->
    <div class="transFb" v-if="transferShow" @click="transferShow = false">
      <div class="transMain">
        <div class="formBox" @click.stop="transferShow = true">
          <span class="f_icon"></span>
          <div class="for_main">
            <div class="col">
              <p class="lab">Currency info:</p>
              <div class="for_din">
                <p class="ptext">{{ coinName }}</p>
              </div>
            </div>
            <div class="col">
              <p class="lab">Balance:</p>
              <div class="for_din">
                <p class="ptext">
                  {{ getCurrentTranferBalance(this.currentLocation) }}
                </p>
              </div>
            </div>
            <div class="col">
              <p class="lab">Transfer object:</p>
              <div class="for_din">
                <div class="dsel">
                  <p @click.stop="showUser = !showUser">
                    {{
                      chooseUserObj == ""
                        ? "Please select Transfer object"
                        : chooseUserObj | userName
                    }}
                  </p>
                  <ul class="userList" v-if="showUser">
                    <li
                      v-for="(item, index) in transUserList"
                      @click.stop="chooseUser(item.userId)"
                    >
                      {{ item.userName }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col">
              <p class="lab">Transfer amount:</p>
              <div class="for_din">
                <input
                  id="transferAmount"
                  v-model="transAmout"
                  placeholder="Please input Transfer amount:"
                  autocomplete="off"
                  maxlength="9"
                  @change="validateNum1($event)"
                  :validate-event="true"
                />
              </div>
            </div>
            <div class="col">
              <button class="cashBtn cursorPoint" @click.stop="submitTranfer()">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--左侧拖拽工具箱-->
    <div class="leftTool">
      <div class="showbox" :class="{ showTool: showTool }">
        <div class="tool2" :class="{ animaImg2: funNum == 2 }">
          <span class="tool_icon" @click.stop="poinfun(2)"
            ><p class="n_ltips">Currency setting</p></span
          >
        </div>
        <div class="tool1">
          <span class="tool_icon"></span>
          <span
            class="tool_icon droppoint"
            v-bind:data-id="item.id"
            v-for="(item, index) in userInfo"
            :key="item.id"
            ><p class="n_ltips">User drag and drop</p></span
          >
        </div>
        <div class="tool3" :class="{ animaImg3: funNum == 3 }">
          <span class="tool_icon" @click.stop="poinfun(3)"
            ><p class="n_ltips">Deployment of smart contract</p></span
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

    <comHeader
      ref="header"
      :menuShow="menuShow"
      @clickMenu="clickMenu"
      :consoleShow="consoleShow"
      :menuText="menuText"
    ></comHeader>
    <!--右边步骤提示-->
    <comFooter
      ref="bottom"
      :pageName="pageName"
      :operaInfo="operaInfo"
      :blockPro="blockPro"
      :isBlcok="isBlcok"
      :step="step"
      :invisable="invisable"
    ></comFooter>
    <rightTips
      :step="step"
      :confirShow="confirShow"
      :stepTips="stepTips"
      :pageName="pageName"
      @tipSure="tipSure"
      :winNum="winNum"
    ></rightTips>
    <div class="toast" v-show="toastShow">
      {{ toastText }}
    </div>
  </div>
</template>

<script src="../../function/p-smartContract.js"></script>

<style scoped lang="less">
@import url("../../assets/teachCss/p-smartContract.less");
</style>

<style>
.g-rect-IE1 {
  fill: none;
  stroke-width: 2;
  stroke: #e2e2e2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>
