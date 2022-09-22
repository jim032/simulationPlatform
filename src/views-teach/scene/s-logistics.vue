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
              <span class="lab">Item type:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.type"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Real name:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.name"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">ID number:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.id"
                  maxlength="18"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">tel number:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="rgisteInfo.phoneNumber"
                  maxlength="11"
                ></i-input>
              </div>
            </div>

            <div class="cr_din">
              <span class="lab">Brief description:</span>
              <div>
                <i-input
                  placeholder=""
                  type="textarea"
                  :rows="4"
                  v-model="rgisteInfo.intro"
                  maxlength="150"
                ></i-input>
              </div>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="funstep1">on chain</a>
            </div>
          </div>
        </div>

        <!--点击代收点-->
        <div
          class="opr-col cr-main"
          v-if="step == 2 && showNav == false && chainFinsh == false"
        >
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="cr_din">
              <span class="lab">Tracking &nbsp;&nbsp;Numbers：</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="collectionPoint.oddNumber"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Origin:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="collectionPoint.orgin"
                  maxlength="20"
                ></i-input>
              </div>
            </div>
            <div class="cr_din">
              <span class="lab">Destination:</span>
              <div>
                <i-input
                  placeholder=""
                  v-model="collectionPoint.destination"
                  maxlength="20"
                ></i-input>
              </div>
            </div>

            <div class="com-btnBox">
              <a class="com-btn" @click="funstep2">on chain</a>
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

        <!--登记完点击出版社-->
        <div
          class="opr-col cr-main resultBox"
          v-if="step == 3 && showNav == false && chainFinsh == false"
        >
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="daddress">
              <span>{{ collectionPoint.orgin }}</span
              ><span class="line"></span
              ><span>{{ collectionPoint.destination }}</span>
              <ul class="addressList">
                <li v-for="(item, index) in addresList" :key="" index>
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="com-btnBox">
              <a class="com-btn" @click="funstep3">on chain</a>
            </div>
          </div>
        </div>

        <!--查证处查询-->
        <div
          class="opr-col cr-main resultBox serachBox"
          v-if="step == 4 && showNav == false && searchStep == 0"
        >
          <div class="bg">
            <a class="sback" @click="stepBack"></a>
            <div class="searchIn">
              <input
                type="text"
                placeholder="Please input hash"
                v-model="searchText"
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
              <a class="sback" @click="searchBack"></a>
              <p>info query</p>
            </div>
            <div class="stepIcon">
              <span class="s-icon" :class="{ active: searchStep == 1 }">1</span>
              <span class="s-icon" :class="{ active: searchStep == 2 }">2</span>
              <span class="s-icon" :class="{ active: searchStep == 3 }">3</span>
            </div>
            <div class="info" v-if="searchStep == 1">
              <p class="result-p">
                {{ rgisteInfo.time | formatDate }} &nbsp;&nbsp;&nbsp;Sender
                registers Express items
              </p>
              <p class="result-p">Registered name:{{ rgisteInfo.name }}</p>
              <p class="result-p">Item type:{{ rgisteInfo.type }}</p>
              <p class="result-p">Tel number:{{ rgisteInfo.phoneNumber }}</p>
              <p class="result-p">ID number:{{ rgisteInfo.id }}</p>
              <p class="result-p">Creative note:{{ rgisteInfo.intro }}</p>
            </div>
            <div class="info" v-if="searchStep == 1">
              <p class="result-p">
                Registered block height:{{ rgisteInfo.blockHeight }}
              </p>
              <p class="result-p">block hash:{{ rgisteInfo.blocHash }}</p>
              <p class="result-p">tx hash:{{ rgisteInfo.affairHash }}</p>
            </div>

            <div class="info" v-if="searchStep == 2">
              <p class="result-p" v-if="searchStep == 2">
                {{
                  collectionPoint.time | formatDate
                }}
                &nbsp;&nbsp;&nbsp;collection point on chain
              </p>
              <p class="result-p">
                Tracking&nbsp;&nbsp;numbers：{{ collectionPoint.oddNumber }}
              </p>
              <p class="result-p">Origin:{{ collectionPoint.orgin }}</p>
              <p class="result-p">
                Destination:{{ collectionPoint.destination }}
              </p>
            </div>
            <div class="info" v-if="searchStep == 2">
              <p class="result-p">
                Registered block height:{{ collectionPoint.blockHeight }}
              </p>
              <p class="result-p">block hash:{{ collectionPoint.blocHash }}</p>
              <p class="result-p">tx hash:{{ collectionPoint.affairHash }}</p>
            </div>

            <div class="info" v-if="searchStep == 3">
              <p class="result-p" v-if="searchStep == 2">
                {{ logistics.time | formatDate }} &nbsp;&nbsp;&nbsp;Logistics
                transportation information
              </p>
              <p
                class="result-p"
                v-for="(item, index) in addresList"
                :key=""
                index
              >
                {{ item }}
              </p>
            </div>
            <div class="info" v-if="searchStep == 3">
              <p class="result-p">block height:{{ logistics.blockHeight }}</p>
              <p class="result-p">block hash:{{ logistics.blocHash }}</p>
              <p class="result-p">tx hash:{{ logistics.affairHash }}</p>
            </div>

            <div class="com-btnBox" v-if="searchStep == 1">
              <a class="com-btn" @click="nextSearch(1)">next</a>
            </div>
            <div class="com-btnBox" v-if="searchStep == 2">
              <a class="com-btn" @click="nextSearch(2)">next</a>
            </div>
            <div class="com-btnBox" v-if="searchStep == 3">
              <a class="com-btn" @click="nextSearch(3)">i got it</a>
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

<script src="../../function/s-logistics.js"></script>
<style scoped lang="less">
@import url("../../assets/teachCss/p-keyStore.less");
@import url("../../assets/teachCss/s-copyRight.less");
.crWrap .operaBpox {
  width: 1200px;
}
.crWrap .cr-main .bg {
  min-height: 400px;
}
.crWrap .cr-main {
  width: 900px;
  margin: 0 auto;
}
.crWrap .cr-main .com-btnBox {
  padding-top: 30px;
}
.resultBox .daddress span {
  display: inline-block;
  font-size: 24px;
  color: #fff;
  vertical-align: middle;
}
.resultBox .daddress .line {
  width: 100px;
  height: 2px;
  background: #fff;
  margin: 0 40px;
}
.resultBox .addressList {
  padding-top: 40px;
}
.resultBox .addressList li {
  width: 700px;
  margin: 0 auto;
  text-align: left;
  font-size: 18px;
  color: #fff;
  padding: 6px 0;
}
.crWrap .searchResult .info {
  width: 750px;
}
</style>
