<template>
  <div class="pageWrap">
    <comheader ref="header" :pageNum="pageNum"></comheader>
    <div class="mainbox mainbox_per">
      <div class="mmain mmain_per">
        <template v-if="dataList.length > 0 || isSearch == true">
          <div class="htitle">
            <div class="search">
              <input
                type="text"
                placeholder="Please input student number or name"
                v-model="searchText"
                maxlength="20"
              />
              <a class="btn-search" @click="searchUser"></a>
            </div>
            <h3>{{ roleId == "1" ? "Teacher list" : "Student list" }}</h3>
          </div>
          <el-table
            class="customer-table personlist-table"
            header-row-class-name="tab-th"
            :header-cell-class-name="cellClass"
            cell-class-name="tab-td"
            :row-class-name="tableRowClassName"
            ref="multipleTable"
            :data="dataList"
            tooltip-effect="dark"
            style="width: 100%"
            height="500"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" label="Select all" width="100">
            </el-table-column>
            <el-table-column
              prop="user_id"
              label="Student number"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="name" label="name" align="center">
            </el-table-column>
            <el-table-column
              prop="identification_number"
              label="Identification Number"
              align="center"
            >
            </el-table-column>
            <el-table-column label="sex" width="90" align="center">
              <template slot-scope="scope">{{
                scope.row.gender == 0 ? "male" : "female"
              }}</template>
            </el-table-column>
            <el-table-column prop="phone" label="Telephone" align="center">
            </el-table-column>
            <el-table-column
              prop="department"
              label="Department"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="major"
              label="major"
              show-overflow-tooltip
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="grade"
              label="grade"
              width="90"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="classes"
              label="class"
              width="90"
              align="center"
            ></el-table-column>
            <el-table-column label="operation" width="140" align="center">
              <template slot-scope="scope">
                <a type="text" class="tab-edit" @click="editInfo(scope.row)"
                  >Modify information</a
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="tab-operation">
            <div class="btn-box">
              <a class="sbtn-default" @click="deleteUser">delete</a>
              <a class="sbtn-default" @click="editPassword()">reset password</a>
              <a class="sbtn-default" @click="uploadExcel"
                >Download information template</a
              >
              <file-upload
                class="stu_upload"
                style="overflow:visible"
                :maximum="3"
                :multiple="true"
                　
                　ref="upload"
                　　
                v-model="files"
                extensions="xlsx,xls"
                　　
                :post-action="getuploadUrl"
                　　
                @input-file="uploadFile"
                　　
                @input-filter="inputFilter"
                name="excel_file"
                :headers="{ Authorization: jwt }"
              >
                <a
                  class="sbtn-default sbtn-uoload"
                  type="text"
                  @click.prevent="$refs.upload.active = true"
                >
                  Click upload
                </a>
              </file-upload>
            </div>
            <div class="page-block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="per_page"
                layout="prev, pager, next, jumper"
                :total="totalElements"
              >
              </el-pagination>
            </div>
          </div>
        </template>
        <template
          v-if="dataList.length == 0 && isSearch == false && showUpload"
        >
          <p class="m_title">Import student information with one click</p>
          <upload @inputFile="inputFile" :pageNum="roleId"></upload>
        </template>
      </div>
    </div>
    <!--修改信息弹出框-->
    <el-dialog
      title="学生信息修改"
      :visible.sync="editDialog"
      :width="dialogWidth"
      class="personDialog"
      :before-close="handleClose"
    >
      <div class="editMain">
        <el-form ref="form" label-width="80px">
          <el-form-item label="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="sex">
            <el-select
              v-model="userInfo.gender == 0 ? 'male' : 'female'"
              placeholder="select"
              @change="changeSex"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ID number">
            <el-input v-model="userInfo.identification_number"></el-input>
          </el-form-item>
          <el-form-item label="Telephone">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="editbtn" @click="editDialog = false">cancel</button>
        <button class="editbtn" @click="editUserInfo">confirm</button>
      </span>
    </el-dialog>

    <!--点击多选学生重置密码-->
    <el-dialog
      title="Student password reset"
      :visible.sync="resetDialog"
      :width="dialogWidth"
      class="personDialog"
      :before-close="handleClose"
    >
      <div class="editMain">
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="New password">
            <el-input v-model="newPas"></el-input>
          </el-form-item>
          <el-form-item label="Password confirmation">
            <el-input v-model="confirmMewPas"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="editbtn" @click="resetDialog = false">cancel</button>
        <button class="editbtn" @click="editUserPassword">confirm</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import comheader from "@/components/sheader";
import upload from "@/components/upload";

import "vue-upload-component/dist/vue-upload-component.part.css";
import FileUpload from "vue-upload-component";

import { jwt, updateUserPassword } from "@/API/api";
import { search_user, modify_user, delete_user } from "@/API/api";
import Cookies from "js-cookie";

import store from "@/store/store1";

export default {
  data() {
    return {
      pageNum: 2,
      personPage: 1,

      showUpload: false, //默认上传页面不显示
      limit: 3, // 上传excell时，同时允许上传的最大数

      isUpload: false,
      dataList: [], //
      editDialog: false, //学生修改弹出框
      userInfo: {}, //学生修改信息
      dialogWidth: 0,
      files: [],

      resetDialog: false, //学生密码重置弹出框
      newPas: "",
      confirmMewPas: "",

      per_page: 10,
      currentPage: 1, //表示当前分页
      totalElements: 0, //一共多少页
      totalPages: 0, //总条数totalPages
      searchText: "",
      isSearch: false,
      jwt: "",

      options: [
        {
          value: "0",
          label: "male"
        },
        {
          value: "1",
          label: "female"
        }
      ],
      multipleSelection: [] //多选
    };
  },
  computed: {
    getUrl() {
      return store.templateurl;
    },
    getuploadUrl() {
      return store.uploadurl;
    },
    roleId: function() {
      return sessionStorage.getItem("role_id");
    }
  },
  components: { comheader, upload, FileUpload },
  created() {
    this.setDialogWidth();
  },
  methods: {
    //上传前的钩子函数
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        const extension = newFile.name.substring(
          newFile.name.lastIndexOf(".") + 1
        );

        if (extension == "xlsx" || extension == "xls") {
        } else {
          this.$toast(
            "Only files with suffix. Xlsx or XLS can be uploaded",
            2000
          );
          return prevent();
        }
      }
    },

    //上传的回调函数，每次上传回调都不一样
    uploadFile(newFile, oldFile) {
      let that = this;

      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
      //that.$emit('inputFile',newFile.response)
      if (newFile && oldFile) {
        if (newFile && oldFile && !newFile.active && oldFile.active) {
          //console.log('response', newFile.response)
          let response = newFile.response;
          if (response.code == 200) {
            this.search_user();
          } else {
            if (response.message == "jwt is valid") {
              this.$router.push({ path: "/login" });
            } else {
              this.$toast(response.message, 3000);
            }
          }
          if (newFile.xhr) {
            //  Get the response status code
            console.log("status", newFile.xhr.status);
          }
        }
      }
    },

    //表格酒奇偶行显示不一样
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "odd-row";
      } else if (rowIndex % 2 === 0) {
        return "even-row";
      }
    },
    //表头单元格的className的回调方法
    cellClass(row) {
      if (row.columnIndex == 0) {
        return "ntab-checkbox";
      }
    },
    //设置弹出框宽度
    setDialogWidth() {
      var val = document.body.clientWidth;
      const def = 580; // 默认宽度
      if (val < def) {
        this.dialogWidth = "80%";
      } else {
        this.dialogWidth = def + "px";
      }
    },
    //修改学生信息
    editInfo(obj) {
      let that = this;
      that.editDialog = true;

      that.userInfo = Object.assign({}, obj);
    },

    //修改学生信息
    editPassword(obj) {
      let that = this;
      that.resetDialog = true;
      that.confirmMewPas = "";
      that.newPas = "";
      that.userInfo = Object.assign({}, obj);
    },
    //性别改变
    changeSex(selVal) {
      let that = this;
      //元素修改
      that.userInfo.gender = selVal;
    },
    //点击关闭修改弹出框
    handleClose() {
      let that = this;
      that.editDialog = false;
      that.resetDialog = false;
    },

    /*当前页改变的时候触发*/
    handleCurrentChange(val) {
      let that = this;
      that.currentPage = val;

      that.search_user();
    },

    //选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 文件上传成功
    handleSuccess(res, file, fileList) {
      this.$message.success("file upload success");
    },
    // 覆盖默认的上传行为，自定义上传的实现
    inputFile(data) {
      this.search_user();
    },

    //搜索用户列表
    search_user() {
      let that = this;
      let obj = {};

      obj.per_page = that.per_page;
      obj.page = that.currentPage - 1;
      obj.search = that.searchText
        .replace(/\s*/g, "")
        .replace(/\#/g, "%23")
        .replace(/\&/g, "%26")
        .replace(/\+/g, "%2B");
      search_user(obj).then(res => {
        //console.log(res)
        if (res.code == 200) {
          this.dataList = res.data.content;
          that.totalElements = res.data.totalElements;
          that.totalPages = res.data.totalPages;

          if (res.data.content.length == 0) {
            that.showUpload = true;
          }
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },
    //根据搜索文字搜索用户
    searchUser() {
      let that = this;
      that.currentPage = 1;
      that.search_user();
      that.isSearch = true;
    },
    uploadExcel() {
      window.location.href = this.getUrl;
    },
    /*
      getJwt(){
        let id = sessionStorage.getItem('user_id');
        let obj={};
        obj.id=id
        jwt(JSON.stringify(obj)).then(res=> {
          if(res.code==200){
            this.jwt = res.data.jwt
            Cookies.set('jwt', res.data.jwt, { expires:1 });
          }else{
            this.$toast(res.message,2000)
          }
        })
      },
      */
    //学生信息修改
    editUserInfo() {
      let that = this;
      if (that.userInfo.name == "") {
        return that.$toast("Student name cannot be empty", 2000);
      }
      if (that.userInfo.identification_number == "") {
        return that.$toast("Student ID number can not be empty.", 2000);
      }
      if (that.userInfo.phone == "") {
        return that.$toast("Student phone cannot be empty.", 2000);
      }
      modify_user(JSON.stringify(that.userInfo)).then(res => {
        if (res.code == 200) {
          that.editDialog = false;
          that.search_user();
        } else {
          this.$toast(res.message, 2000);
        }
      });
    },

    //用户密码重置
    editUserPassword() {
      let temp = this.multipleSelection;
      let that = this;
      let user_id_list = [];
      for (let j = 0, len = temp.length; j < len; j++) {
        user_id_list.push(temp[j].user_id);
      }
      let obj = {};
      obj.user_id_list = user_id_list;
      obj.password = that.newPas;
      var reg = /^[0-9a-zA-Z]+$/;
      if (that.newPas == "") {
        that.$toast("Please enter a new password", 3000);
        return;
      }
      if (that.confirmMewPas == "") {
        that.$toast("Please enter the confirmation password", 3000);
        return;
      }
      if (that.newPas.length > 20 || that.confirmMewPas.length < 6) {
        that.$toast("Please enter a password of 6 to 20 characters", 3000);
        return;
      }
      if (!reg.test(that.newPas)) {
        that.$toast("The password can only be numbers or letters", 3000);
        return;
      }
      if (that.newPas != that.confirmMewPas) {
        that.$toast("The two passwords are inconsistent", 3000);
        return;
      }
      updateUserPassword(JSON.stringify(obj)).then(res => {
        if (res.code == 200) {
          that.newPas = "";
          that.confirmMewPas = "";
          that.resetDialog = false;
          that.search_user();
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },
    //用户删除
    deleteUser() {
      if (this.multipleSelection.length == 0 && this.multipleSelection) {
        return this.$toast("Student list not checked", 2000);
      }

      this.$confirm("Are you sure you want to delete students??", "confirm", {
        confirmButtonText: "confirm",
        cancelButtonText: "cancel",
        type: "warning"
      })
        .then(() => {
          let temp = this.multipleSelection;
          let that = this;
          let user_id_list = [];
          for (let j = 0, len = temp.length; j < len; j++) {
            user_id_list.push(temp[j].user_id);
          }
          let obj = {};
          obj.user_id_list = user_id_list;
          delete_user(JSON.stringify(obj)).then(res => {
            if (res.code == 200) {
              /*整页删除判断*/

              if (user_id_list.length == that.dataList.length) {
                if (that.currentPage == that.totalPages) {
                  that.currentPage =
                    that.currentPage > 1
                      ? parseInt(that.currentPage - 1)
                      : that.currentPage;
                }
              }
              that.search_user();
            } else {
              this.$toast(res.message, 2000);
            }
          });
        })
        .catch(() => {
          /*
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
          */
        });
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setDialogWidth();
      })();
    };
    this.search_user();
    /*
      if(Cookies.get('jwt')) {

      }else{
        this.getJwt()
      }
      */
    this.jwt = sessionStorage.getItem("jwt");
    document.getElementsByTagName("body")[0].className = "admin-body";
  },
  beforeDestroy() {
    document.body.removeAttribute("class", "admin-body");
  },
  destroyed() {
    window.onresize = null;
  }
};
</script>

<style scoped="" lang="less">
@import url("../../assets/css/personManage.less");
</style>
<style>
.el-button--primary {
  background: #4484fd !important;
}
</style>
