<template>
  <div class="pageWrap">
    <comheader ref="header" :pageNum="pageNum"></comheader>
    <div class="mainbox">
      <div class="mmain nnh_main">
        <div class="staMain clearfix">
          <div class="left sm_left">
            <div class="con_nav clearfix">
              <div class="cn_col">
                <div class="dinfo">
                  <p class="pt line1">Hardware CPU</p>
                  <div class="line"></div>
                  <p class="pdata">{{ cpuUse }}</p>
                </div>
              </div>
              <div class="cn_col cn_col2">
                <div class="dinfo">
                  <p class="pt line1">Hardware Memory</p>
                  <div class="line"></div>
                  <p class="pdata">{{ memoryUse }}</p>
                </div>
              </div>
              <!--<div class="cn_col cn_col2" @click="showLine">
	    			   	    <div class="dinfo">
	    			   	    	 <p class="pt line1">在线人数</p>
	    			   	       <div class="line"></div>
	    			   	       <p class="pdata">15898</p>
	    			   	    </div>
	    			   	  </div>
	    			   -->
            </div>
            <div class="listMain listMain-number clearfix">
              <div class="per_title">
                <div class="dateBox">
                  <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="to"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :picker-options="pickerOptions"
                    @change="dateSearch"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                  <el-input
                    v-model="searchInput"
                    placeholder="Please input knowledge points"
                  ></el-input>
                  <span class="n-searchbtn" @click="searchCategory"></span>
                </div>
                <h3>Number of course visits</h3>
              </div>
              <el-table
                class="customer-table total-table"
                header-row-class-name="tab-th"
                cell-class-name="tab-td"
                :row-class-name="tableRowClassName"
                ref="multipleTable"
                :data="operaRecord"
                tooltip-effect="dark"
                style="width: 100%"
                height="336"
              >
                <el-table-column prop="created_at" label="Time" align="center">
                </el-table-column>
                <el-table-column
                  prop="category_name_chs"
                  label="Knowledge points"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="frequency"
                  label="Number of visits"
                  align="center"
                ></el-table-column>
              </el-table>
              <div class="tab-operation">
                <div class="page-block">
                  <el-pagination
                    @current-change="handleCourseChange"
                    :current-page.sync="currentPage"
                    :page-size="coursePageSize"
                    layout="prev, pager, next, jumper"
                    :total="totalCourse"
                  >
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>

          <div class="right sm_right online-box">
            <div class="title">
              <span
                >Number of people online:{{ onlineNumber
                }}<span id="online"></span></span
              >Number of people online
            </div>
            <el-table
              class="customer-table total-table online-table"
              header-row-class-name="tab-th"
              cell-class-name="tab-td"
              :row-class-name="tableRowClassName"
              ref="multipleTable"
              height="504"
              :data="onLineList"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column prop="grade_name" label="grade" align="center">
              </el-table-column>
              <el-table-column prop="class_name" label="class" align="center">
              </el-table-column>
              <el-table-column prop="name" label="name" align="center">
              </el-table-column>
            </el-table>
            <div class="tab-operation">
              <div class="page-block">
                <el-pagination
                  @current-change="handleOnlineChange"
                  :current-page.sync="onlinePage"
                  :page-size="onlinePageSize"
                  layout="prev, pager, next,jumper"
                  :pager-count="5"
                  :total="totalUser"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="transTotal" v-if="showEchatrs" @click="showEchatrs = false">
      <div class="listMain clearfix" @click.stop="showEchatrs = true">
        <div class="htitle">
          Number of people online
          <div class="p-sel" @click="showDataType = true">
            {{ datatype | dataName }}
            <ul class="sel-list" v-if="showDataType">
              <li @click.stop="showType(1)">week</li>
              <li @click.stop="showType(2)">month</li>
            </ul>
          </div>
        </div>
        <div id="d_echarts" ref="d_echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { online, onlineUsers, hardware, courseFrequency } from "@/API/api";
import comheader from "@/components/sheader";
import echarts from "@/common/echarts.js";
export default {
  data() {
    return {
      cpuUse: "",
      memoryUse: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "In recent week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "In recent month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "Last three months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },

      totalUser: 0,
      totalCourse: 0,
      mainHeight: 0,
      pageNum: 1, //参数代表传递给头部的是哪个页面
      operaRecord: [],
      onLineList: [], //在线人数

      datatype: 1, //数据显示方式 1表示周，2表示月
      showDataType: false, //柱状图显示时间范围

      currentPage: 1, //课程访问次数当前页
      onlinePage: 1, //在线人数分页

      coursePageSize: 10, //课程访问次数每页条数
      onlinePageSize: 10, //在线人数每页条数

      showEchatrs: false,
      dateRange: "",
      searchInput: "", //输入知识点检查
      onlineNumber: "",

      startTime: "", //知识点访问开始时间
      endTime: "" //知识点访问结束时间
    };
  },
  components: {
    comheader
  },
  filters: {
    dataName: function(value) {
      let str = "";
      str = value == 1 ? "week" : "month";
      return str;
    }
  },
  computed: {},
  methods: {
    //点击日期
    dateSearch(value) {
      let that = this;
      if (value) {
        that.startTime = value[0];
        that.endTime = value[1];
      }

      //      let obj = {}
      //      obj.per_page = that.coursePageSize;
      //    	obj.page = that.currentPage-1;
      //      obj.category_name = that.searchInput.replace(/\s*/g,'');
      /* obj.dateRangeStart=value[0];
        obj.dateRangeEnd=value[1]

       courseFrequency(obj).then(res=> {
         if(res.code==200){
           for(let i = 0 ;i < res.data.content.length; i++){
             let time  = res.data.content[i].created_at.toString().replace('T',' ');
             res.data.content[i].created_at = time.substring(0,19);
           }
           let that = this;
           that.totalCourse = res.data.totalElements;
           let operaRecord = res.data.content;
           this.operaRecord=operaRecord;
         }else{
           that.$toast(res.message,3000)
         }
       })*/
    },

    online() {
      let that = this;
      online().then(res => {
        if (res.code == 200) {
          let total = res.data;
          let that = this;
          that.totalUser = total;
          that.onlineNumber = res.data;
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },

    /*在线人数*/
    onlineUsers() {
      let that = this;
      let obj = {};
      obj.per_page = that.onlinePageSize;
      obj.page = that.onlinePage - 1;
      onlineUsers(obj).then(res => {
        if (res.code == 200) {
          let onLineList = res.data.content;
          this.onLineList = onLineList;
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },

    hardware() {
      let that = this;
      hardware().then(res => {
        if (res.code == 200) {
          that.cpuUse = res.data.cpu_user_current_utilization;
          that.memoryUse = res.data.memory_utilization;
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },
    //课程访问次数
    courseFrequency() {
      let that = this;
      let obj = {};
      obj.per_page = that.coursePageSize;
      obj.page = that.currentPage - 1;

      let temp = that.searchInput;
      obj.category_name = temp
        .replace(/\s*/g, "")
        .replace(/\#/g, "%23")
        .replace(/\&/g, "%26")
        .replace(/\+/g, "%2B");
      if (that.dateRange !== null) {
        /*let time = that.dateRange.toString().split(",");
          let start = new Date(time[0]);
          let yS = start.getFullYear();
          let mS = start.getMonth() + 1;
          mS = mS < 10 ? ('0' + mS) : mS;
          let dS = start.getDate();
          dS = dS < 10 ? ('0' + dS) : dS;
          obj.dateRangeStart = yS+'-'+mS+'-'+dS;
          let end = new Date(time[1]);
          let yE = end.getFullYear();
          let mE = end.getMonth() + 1;
          mE = mE < 10 ? ('0' + mE) : mE;
          let dE = end.getDate();
          dE = dE < 10 ? ('0' + dE) : dE;
          obj.dateRangeEnd = yE+'-'+mE+'-'+dE;
          */

        obj.dateRangeStart = that.startTime;
        obj.dateRangeEnd = that.endTime;
      } else {
        obj.dateRangeStart = "";
        obj.dateRangeEnd = "";
      }

      courseFrequency(obj).then(res => {
        if (res.code == 200) {
          for (let i = 0; i < res.data.content.length; i++) {
            let time = res.data.content[i].created_at
              .toString()
              .replace("T", " ");
            res.data.content[i].created_at = time.substring(0, 19);
          }
          let that = this;
          that.totalCourse = res.data.totalElements;
          let operaRecord = res.data.content;
          this.operaRecord = operaRecord;
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },

    //表格酒奇偶行显示不一样
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "odd-row";
      } else if (rowIndex % 2 === 0) {
        return "even-row";
      }
    },

    //根据搜索文字搜索课程访问次数
    searchCategory() {
      let that = this;
      that.courseFrequency();
    },

    /*课程当前页改变的时候触发*/
    handleCourseChange(val) {
      let that = this;
      that.currentPage = val;
      that.courseFrequency();
    },

    /*在线人数当前页改变的时候触发*/
    handleOnlineChange(val) {
      let that = this;
      that.onlinePage = val;
      that.onlineUsers();
    },

    //监听器
    showType(num) {
      let that = this;
      that.datatype = num;
      that.showDataType = false;
    }
  },

  watch: {},

  mounted() {
    let that = this;
    this.online();
    this.onlineUsers();
    this.hardware();
    this.courseFrequency();
    document.getElementsByTagName("body")[0].className = "admin-body";
  },
  beforeDestroy() {
    document.body.removeAttribute("class", "admin-body");
  }
};
</script>

<style scoped lang="less">
@import url("../../assets/css/index.less");
</style>
