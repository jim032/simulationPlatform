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

        <!--用户授权列表是否显示-->
        <div class="opr-col cr-main resultBox" v-if="showAuthorize">
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <ul class="hospitalList">
              <li>
                <div class="li-col h-name">{{ hospitalA.name }}</div>
                <div class="li-col h-info">
                  <p class="pt">Medical information</p>
                  <div class="" v-if="hospitalA.authorized">
                    <p>block height:{{ rgisteInfo.blockHeight }}</p>
                    <p>block hash:{{ rgisteInfo.blocHash }}</p>
                    <p>tx hash：{{ rgisteInfo.affairHash }}</p>
                    <p>on chain time:{{ rgisteInfo.linkTime | formatDate }}</p>
                  </div>
                </div>
                <div class="li-col com-btnBox">
                  <a class="com-btn" @click="hauthorize(1)">{{
                    hospitalA.authorized ? "Cancel authorization" : "authorize"
                  }}</a>
                </div>
              </li>
              <li>
                <div class="li-col h-name">{{ hospitalB.name }}</div>
                <div class="li-col h-info">
                  <p class="pt">Medical information</p>
                  <div class="" v-if="hospitalB.authorized">
                    <p>block height:{{ rgisteInfo.blockHeight }}</p>
                    <p>block hash:{{ rgisteInfo.blocHash }}</p>
                    <p>tx hash：{{ rgisteInfo.affairHash }}</p>
                    <p>on chain time:{{ rgisteInfo.linkTime | formatDate }}</p>
                  </div>
                </div>
                <div class="li-col com-btnBox">
                  <a class="com-btn" @click="hauthorize(2)">{{
                    hospitalB.authorized ? "Cancel authorization" : "authorize"
                  }}</a>
                </div>
              </li>
              <li>
                <div class="li-col h-name">{{ hospitalC.name }}</div>
                <div class="li-col h-info">
                  <p class="pt">Medical information</p>
                  <div class="" v-if="hospitalC.authorized">
                    <p>block height:{{ rgisteInfo.blockHeight }}</p>
                    <p>block hash:{{ rgisteInfo.blocHash }}</p>
                    <p>tx hash：{{ rgisteInfo.affairHash }}</p>
                    <p>on chain time:{{ rgisteInfo.linkTime | formatDate }}</p>
                  </div>
                </div>
                <div class="li-col com-btnBox">
                  <a class="com-btn" @click="hauthorize(3)">{{
                    hospitalC.authorized ? "Cancel authorization" : "authorize"
                  }}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="opr-col cr-main operation-box" v-if="searchFunction">
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="o-box">
              <div class="o-col">
                <span class="s-search cursorPoint" @click="f_showSearch"
                  >Inquiring about patients</span
                >
              </div>
              <div
                class="o-col"
                v-if="rgisteInfo.name == '' || cur_Hospital.islinked"
              >
                <span class="s-sl cursorPoint" @click="LinkedForm"
                  >on chain</span
                >
              </div>
            </div>
          </div>
        </div>

        <!--点击上链的表单信息-->
        <div class="opr-col cr-main" v-if="showForm">
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="cr_din" style="margin-top:30px;">
              <span class="lab">Patient name:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.name"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Visit time:</span>
              <div>
                <Date-picker
                  type="date"
                  v-model="rgisteInfo.medicalTime"
                  format="yyyy-MM-dd"
                  placeholder="Please select time"
                  style="width:100%"
                  @on-change="rgisteInfo.medicalTime = $event"
                >
                </Date-picker>
              </div>
            </div>

            <div class="cr_din">
              <span class="lab">Visiting doctor:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.doctor"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Treatment Description:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.medicalDescription"
                  maxlength="18"
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
              <p class="result-p">{{ resultMess }}</p>
              <p class="result-p">
                {{
                  step == 1
                    ? rgisteInfo.affairHash
                    : step == 2
                    ? collectionPoint.affairHash
                    : logistics.affairHash
                }}
                (please keep it properly)
              </p>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="sureChain">Confirm</a>
            </div>
          </div>
        </div>

        <!--查证处查询-->
        <div class="opr-col cr-main resultBox serachBox" v-if="showSearch">
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="searchIn">
              <input
                type="text"
                placeholder="Please input tx hash"
                v-model="searchText"
              />
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="serach">Query</a>
            </div>
          </div>
        </div>

        <!--信息查询-->
        <div class="opr-col cr-main resultBox searchResult" v-if="showResult">
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="info">
              <p class="title">patient information</p>
              <p class="result-p">patient information：{{ rgisteInfo.name }}</p>
              <p class="result-p">block height:{{ rgisteInfo.blockHeight }}</p>
              <p class="result-p">tx hash：{{ rgisteInfo.affairHash }}</p>
              <p class="result-p">on chain time:{{ rgisteInfo.linkTime }}</p>
              <p class="title">Medical information</p>
              <p class="result-p">{{ rgisteInfo.medicalTime | formatDate }}</p>
              <p class="result-p">Visit time:{{ rgisteInfo.medicalTime }}</p>
              <p class="result-p">
                The hospital that you visited: Hospital{{ rgisteInfo.hid }}
              </p>
              <p class="result-p">Visiting doctor:{{ rgisteInfo.doctor }}</p>
              <p class="result-p">
                Treatment Description:{{ rgisteInfo.medicalDescription }}
              </p>
            </div>

            <div class="com-btnBox">
              <a class="com-btn" @click="nextSearch">i got it</a>
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

<script src="../../function/s-medicalCare.js"></script>
<style scoped lang="less">
@import url("../../assets/teachCss/p-keyStore.less");
@import url("../../assets/teachCss/s-copyRight.less");
.crWrap .operaBpox {
  width: 1200px;
}
.crWrap .cr-main .bg {
  min-height: 260px;
}
.crWrap .cr-main {
  width: 900px;
  margin: 0 auto;
}
.crWrap .cr-main .com-btnBox {
  padding-top: 30px;
}

.crWrap .searchResult .info {
  width: 750px;
}
.crWrap .cr-main {
  position: relative;
}
.crWrap .cr-main .sback {
  position: absolute;
  top: 40px;
  left: 40px;
}
.crWrap .cr-main {
  .hospitalList {
    margin: 0 60px;
    text-align: left;
    padding-top: 30px;
    li {
      border: 3px solid #ffffff;
      text-align: center;
      color: #fff;
      margin-top: 30px;
      padding: 20px 0;
    }
    .li-col {
      display: inline-block;
      vertical-align: middle;
    }
    .h-name {
      font-size: 36px;
      width: 150px;
    }
    .h-info {
      width: 450px;
      text-align: left;
    }
    .pt {
      font-size: 24px;
    }
    .com-btnBox {
      padding-top: 0px;
    }
  }
}

.operation-box {
  .o-box {
    padding-top: 40px;
  }
  .o-col {
    margin: 0 100px;
    border: 3px solid #fff;
    font-size: 24px;
    color: #fff;
    margin-top: 30px;
  }
  .o-col span {
    display: inline-block;
    padding: 50px 0;
  }
  .o-col .s-search {
    background: url(../../assets/teachImg/media_ss.png) left center no-repeat;
    padding-left: 120px;
  }
  .o-col .s-sl {
    background: url(../../assets/teachImg/media_sl.png) left center no-repeat;
    padding-left: 120px;
  }
}

.searchResult .info .title {
  font-size: 24px;
  color: #fff;
  text-align: center;
}
</style>
