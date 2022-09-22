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
              <span class="lab">Name of donation:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.name"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Donation contents:</span>
              <div>
                <i-select v-model="rgisteInfo.goodName" style="width:200px">
                  <i-option
                    v-for="(item, index) in goodList"
                    :value="item.label"
                    :key="index"
                    >{{ item.label }}</i-option
                  >
                </i-select>
                <div class="sub_in">
                  <i-input
                    placeholder="input amount"
                    v-model="rgisteInfo.goodNumer"
                    maxlength="10"
                  ></i-input>
                </div>
                <div class="sub_in">
                  <i-input
                    placeholder="input info"
                    v-model="rgisteInfo.goodAbout"
                    maxlength="15"
                  ></i-input>
                </div>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Donation address:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.address"
                  maxlength="24"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">beneficiary:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.beneficiary"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Donors:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.mechanism"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="funstep1"
                >Deposit certificate on the chain</a
              >
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
                donate block height：{{ rgisteInfo.blockHeight }}
              </p>
              <p class="result-p">
                donate block hash:{{ rgisteInfo.blocHash }}
              </p>
              <p class="result-p">donate tx hash:{{ rgisteInfo.affairHash }}</p>
            </div>
            <div class="userInfo">
              <p class="pTitle">donation information</p>
              <p class="result-p">
                donation informationname:{{ rgisteInfo.name }}
              </p>
              <p class="result-p">
                Donation contents:{{ rgisteInfo.goodName }},&nbsp;{{
                  rgisteInfo.goodNumer
                }},&nbsp;{{ rgisteInfo.goodAbout }}
              </p>
              <p class="result-p">Donation address:{{ rgisteInfo.address }}</p>
              <p class="result-p">beneficiary:{{ rgisteInfo.beneficiary }}</p>
              <p class="result-p">Donors:{{ rgisteInfo.mechanism }}</p>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="funstep2"
                >Deposit certificate on the chain</a
              >
            </div>
          </div>
        </div>

        <!--查证处查询-->
        <div
          class="opr-col cr-main resultBox serachBox"
          v-if="step == 3 && showNav == false && searchStep == 0"
        >
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="searchIn">
              <input
                type="text"
                placeholder="Please input hash to query"
                v-model="searchHash"
              />
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="serach">Query</a>
            </div>
          </div>
        </div>

        <!--信息查询-->
        <div
          class="opr-col cr-main resultBox searchResult"
          v-if="searchStep != 0 && showNav == false"
        >
          <div class="bg">
            <div class="rest-tilte">
              <a class="sback" @click="searchStep = 1"></a>
              <p>info query</p>
            </div>
            <div class="stepIcon">
              <span class="s-icon" :class="{ active: searchStep == 1 }">1</span
              ><span class="s-icon" :class="{ active: searchStep == 2 }"
                >2</span
              >
            </div>
            <div class="info" v-if="searchStep == 1">
              <p class="result-p">
                {{ rgisteInfo.time | formatDate }} &nbsp;&nbsp;&nbsp;Donor{{
                  rgisteInfo.name
                }}Registration of donation information
              </p>
              <p class="result-p">
                Donation contents:{{ rgisteInfo.goodName }},&nbsp;{{
                  rgisteInfo.goodNumer
                }},&nbsp;{{ rgisteInfo.goodAbout }}
              </p>
              <p class="result-p">Donation address:{{ rgisteInfo.address }}</p>
              <p class="result-p">beneficiary:{{ rgisteInfo.beneficiary }}</p>
              <p class="result-p">Donors:{{ rgisteInfo.mechanism }}</p>
            </div>
            <div class="info" v-if="searchStep == 1">
              <p class="result-p">
                Registered block height:{{ rgisteInfo.blockHeight }}
              </p>
              <p class="result-p">block hash:{{ rgisteInfo.blocHash }}</p>
              <p class="result-p">tx hash:{{ rgisteInfo.affairHash }}</p>
            </div>

            <div class="info" v-if="searchStep == 2">
              <p class="result-p">
                {{ press.time | formatDate }}
                &nbsp;&nbsp;&nbsp;Red Cross evidence on the chain
              </p>
              <p class="result-p">
                Donation contents:{{ rgisteInfo.goodName }},&nbsp;{{
                  rgisteInfo.goodNumer
                }},&nbsp;{{ rgisteInfo.goodAbout }}
              </p>
              <p class="result-p">Donation address:{{ rgisteInfo.address }}</p>
              <p class="result-p">beneficiary:{{ rgisteInfo.beneficiary }}</p>
              <p class="result-p">Donors:{{ rgisteInfo.mechanism }}</p>
            </div>
            <div class="info" v-if="searchStep == 2">
              <p class="result-p">
                Registered block height:{{ press.blockHeight }}
              </p>
              <p class="result-p">block hash:{{ press.blocHash }}</p>
              <p class="result-p">tx hash:{{ press.affairHash }}</p>
            </div>

            <div class="com-btnBox" v-if="searchStep == 1">
              <a class="com-btn" @click="nextSearch(1)">next</a>
            </div>
            <div class="com-btnBox" v-if="searchStep == 2">
              <a class="com-btn" @click="nextSearch(2)">i got it</a>
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

<script src="../../function/s-publicWelfare.js"></script>
<style scoped lang="less">
@import url("../../assets/teachCss/p-keyStore.less");
@import url("../../assets/teachCss/s-copyRight.less");
.sub_in {
  display: inline-block;
  vertical-align: middle;
  width: 146px;
}
.cr-main .com-btnBox {
  padding-top: 15px;
}
</style>
<style>
.sub_in input {
  font-size: 14px;
}
</style>
