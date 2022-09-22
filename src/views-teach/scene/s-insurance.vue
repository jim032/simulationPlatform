<template>
  <div class="pageWrap ketStoreWrap crWrap">
    <div class="mainContent">
      <div class="operaBpox">
        <div
          class="opr-col cursorPoint"
          v-if="showNav"
          v-for="(item, index) in navList"
          :key="index"
          @click="functionStep(index + 1)"
        >
          <div class="bg">
            <div class="o-icon"><img :src="item.icon" /></div>
            <p class="title">{{ item.title }}</p>
          </div>
        </div>

        <div
          class="opr-col cr-main"
          v-if="step == 1 && showNav == false && chainFinsh == false"
        >
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="cr_din">
              <span class="lab">UserName</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.name"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Flight information:：</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.flightInfo"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Starting time:</span>
              <div>
                <Date-picker
                  type="datetime"
                  v-model="rgisteInfo.startTime"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="Select date and time (excluding seconds)"
                  style="width:100%"
                  @on-change="rgisteInfo.startTime = $event"
                  :options="timeOptions"
                >
                </Date-picker>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Policy number:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.policyNumbe"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="funstep1">on chain</a>
            </div>
          </div>
        </div>

        <div class="opr-col cr-main resultBox" v-if="chainFinsh">
          <div class="bg">
            <div class="suc_icon"></div>
            <div class="mess">
              <p class="result-p">{{ step == 1 ? resultMess : resultMess1 }}</p>
              <p class="result-p">
                {{
                  step == 1
                    ? rgisteInfo.affairHash
                    : step == 2
                    ? press.affairHash
                    : ""
                }}
              </p>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="sureChain">Confirm</a>
            </div>
          </div>
        </div>

        <!--登记完点击出版社-->
        <div
          class="opr-col cr-main resultBox"
          v-if="step == 2 && showNav == false && chainFinsh == false"
        >
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="blockInfo">
              <p class="result-p">
                Registered block height：{{ rgisteInfo.blockHeight }}
              </p>
              <p class="result-p">block hash：{{ rgisteInfo.blocHash }}</p>
              <p class="result-p">tx hash：{{ rgisteInfo.affairHash }}</p>
            </div>
            <div class="userInfo">
              <p class="pTitle">User info</p>
              <p class="result-p">UserName{{ rgisteInfo.name }}</p>
              <p class="result-p">
                Flight information:{{ rgisteInfo.flightInfo }}
              </p>
              <p class="result-p">Starting time:{{ rgisteInfo.startTime }}</p>
              <p class="result-p">
                Delay or not:{{ rgisteInfo.isDelay ? "yes" : "no" }}
              </p>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="funstep2">on chain</a>
            </div>
          </div>
        </div>

        <!--查证处Query-->
        <div
          class="opr-col cr-main resultBox serachBox"
          v-if="step == 3 && showNav == false && searchStep == 0"
        >
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="searchIn">
              <input
                type="text"
                placeholder="Please input hash to Query"
                v-model="searchHash"
              />
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="serach">Query</a>
            </div>
          </div>
        </div>

        <div class="opr-col cr-main resultBox" v-if="searchStep == 3">
          <div class="bg">
            <div class="suc_icon"></div>
            <div class="mess">
              <p class="result-p">
                Successful claim settlement for flight delay of user
                {{ rgisteInfo.name }}
              </p>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="nextSearch(3)">Confirm</a>
            </div>
          </div>
        </div>

        <!--信息Query-->
        <div
          class="opr-col cr-main resultBox searchResult"
          v-if="searchStep != 0 && showNav == false && searchStep != 3"
        >
          <div class="bg">
            <div class="rest-tilte">
              <a class="sback" @click="searchBack"></a>
              <p>info Query</p>
            </div>
            <div class="stepIcon">
              <span class="s-icon" :class="{ active: searchStep == 1 }">1</span
              ><span class="s-icon" :class="{ active: searchStep == 2 }"
                >2</span
              >
            </div>
            <div class="info" v-if="searchStep == 1">
              <p class="result-p">
                {{ rgisteInfo.time | formatDate }} &nbsp;&nbsp;&nbsp;User{{
                  rgisteInfo.name
                }}flight delay insurance on chain
              </p>
              <p class="result-p">UserName{{ rgisteInfo.name }}</p>
              <p class="result-p">
                Flight information:：{{ rgisteInfo.flightInfo }}
              </p>
              <p class="result-p">Starting time:{{ rgisteInfo.startTime }}</p>
            </div>
            <div class="info" v-if="searchStep == 1">
              <p class="result-p">
                Registered block height：{{ rgisteInfo.blockHeight }}
              </p>
              <p class="result-p">block hash：{{ rgisteInfo.blocHash }}</p>
              <p class="result-p">tx hash：{{ rgisteInfo.affairHash }}</p>
            </div>

            <div class="info" v-if="searchStep == 2">
              <p class="result-p" v-if="searchStep == 2">
                {{ press.time | formatDate }} &nbsp;&nbsp;&nbsp;The airline has
                confirmed the flight delay of {{ rgisteInfo.name }}
              </p>
              <p class="result-p">UserName{{ rgisteInfo.name }}</p>
              <p class="result-p">
                Flight information:：{{ rgisteInfo.flightInfo }}
              </p>
              <p class="result-p">Starting time:{{ rgisteInfo.startTime }}</p>
            </div>
            <div class="info" v-if="searchStep == 2">
              <p class="result-p">
                Registered block height：{{ press.blockHeight }}
              </p>
              <p class="result-p">block hash：{{ press.blocHash }}</p>
              <p class="result-p">tx hash：{{ press.affairHash }}</p>
            </div>

            <div class="com-btnBox" v-if="searchStep == 1">
              <a class="com-btn" @click="nextSearch(1)">next </a>
            </div>
            <div class="com-btnBox" v-if="searchStep == 2">
              <a class="com-btn" @click="nextSearch(2)">Confirm</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--左侧拖拽工具箱
	<div class="leftTool">
		<div class="showbox" :class="{'showTool':showTool}">
			<div class="tool1" ><span class="tool_icon"></span></div>
			<div class="tool2" :class="{'animaImg2':funNum==2}" ><span class="tool_icon"></span></div>
			<div class="tool3" :class="{'animaImg3':funNum==3}"><span class="tool_icon"></span></div>
		</div>
		<div class="icon" @click.stop="menuShow = false"><span></span></div>
	</div>
	-->
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
      :singleStep="singleStep"
    >
    </rightTips>
  </div>
</template>

<script src="../../function/s-insurance.js"></script>
<style scoped lang="less">
@import url("../../assets/teachCss/p-keyStore.less");
@import url("../../assets/teachCss/s-copyRight.less");
</style>
