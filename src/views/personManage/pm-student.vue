<template>
  <div class="pageWrap">
    <comheader ref="header" :pageNum="pageNum"></comheader>
    <div class="mainbox mainbox_per">
      <div class="mmain mmain_per">
  
        <template v-if="dataList.length>0 || isSearch == true">
          <div class="htitle">
            <div class="search">
              <input type="text" placeholder="请输入学号或姓名" v-model="searchText" maxlength="20"/>
              <a class="btn-search" @click="searchUser"></a>
            </div>
            <h3>{{roleId =='1'?'老师列表':'学员列表'}}</h3>
          </div>
          <el-table class="customer-table personlist-table"
                    header-row-class-name="tab-th"
                    :header-cell-class-name="cellClass"
                    cell-class-name="tab-td"
                    :row-class-name="tableRowClassName"
                    ref="multipleTable"
                    :data="dataList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="500"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection"  label="全选" width='100'> </el-table-column>
            <el-table-column prop="user_id" label="学号" align="center">  </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">  </el-table-column>
            <el-table-column prop="identification_number" label="证件号码" align="center">  </el-table-column>
            <el-table-column label="性别" width="90" align="center">
              <template slot-scope="scope">{{ scope.row.gender==0?'男':'女' }}</template>
            </el-table-column>
            <el-table-column prop="phone" label="电话" align="center"> </el-table-column>
            <el-table-column prop="department" label="院系" show-overflow-tooltip align="center"> </el-table-column>
            <el-table-column prop="major" label="专业" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="grade" label="年级" width="90" align="center"></el-table-column>
            <el-table-column prop="classes" label="班级" width='90' align="center"></el-table-column>
            <el-table-column

              label="操作"
              width="140" align="center">
              <template slot-scope="scope">

                <a type="text" class="tab-edit" @click="editInfo(scope.row)">修改信息</a>
              </template>
            </el-table-column>
          </el-table>
          <div class="tab-operation">
            <div class="btn-box">

              <a class="sbtn-default" @click="deleteUser">删除</a>
              <a class="sbtn-default"  @click="editPassword()">重置密码</a>
              <a class="sbtn-default" @click="uploadExcel">下载信息模板</a>
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

                :headers="{'Authorization': jwt}"
              >
                <a class="sbtn-default sbtn-uoload" type="text" @click.prevent="$refs.upload.active = true">
                  点击上传
                </a>
              </file-upload>

            </div>
            <div class="page-block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="per_page"
                layout="prev, pager, next, jumper"
                :total="totalElements">
              </el-pagination>
            </div>
          </div>
        </template>
        <template v-if="dataList.length==0 && isSearch == false && showUpload">
          <p class="m_title">一键导入学员信息</p>
          <upload @inputFile="inputFile"  :pageNum="roleId"></upload>
        </template>
      </div>
    </div>
    <!--修改信息弹出框-->
    <el-dialog
      title="学生信息修改"
      :visible.sync="editDialog"
      :width="dialogWidth"
      class="personDialog"
      :before-close="handleClose">
      <div class="editMain">
        <el-form ref="form"  label-width="80px">

          <el-form-item label="姓名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="userInfo.gender==0?'男':'女'" placeholder="请选择" @change="changeSex">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="userInfo.identification_number"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
		    <button class="editbtn" @click="editDialog=false">取消</button>
		    <button class="editbtn" @click="editUserInfo">确认修改</button>
		  </span>
    </el-dialog>

    <!--点击多选学生重置密码-->
    <el-dialog title="学生密码重置"
               :visible.sync="resetDialog"
               :width="dialogWidth"
               class="personDialog"
               :before-close="handleClose">
      <div class="editMain">
        <el-form ref="form" :model="userInfo" label-width="80px">

          <el-form-item label="新密码">
            <el-input v-model="newPas"></el-input>
          </el-form-item>
          <el-form-item label="密码确认">
            <el-input v-model="confirmMewPas"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
		    <button class="editbtn" @click="resetDialog=false">取消</button>
		    <button class="editbtn" @click="editUserPassword">确认修改</button>
		  </span>
    </el-dialog>

  </div>
</template>

<script>
  import comheader from '@/components/sheader';
  import upload from '@/components/upload';

  import "vue-upload-component/dist/vue-upload-component.part.css";
  import FileUpload from "vue-upload-component";

  import {jwt,updateUserPassword} from '@/API/api'
  import {search_user,modify_user,delete_user} from '@/API/api'
  import Cookies from 'js-cookie'

  import store from '@/store/store1'

  export default{

    data(){
      return{
        pageNum:2,
        personPage:1,

        showUpload:false,//默认上传页面不显示
        limit: 3,  // 上传excell时，同时允许上传的最大数


        isUpload:false,
        dataList:[],//
        editDialog:false, //学生修改弹出框
        userInfo:{},//学生修改信息
        dialogWidth: 0,
        files:[],

        resetDialog:false,//学生密码重置弹出框
        newPas:'',
        confirmMewPas:'',

        per_page:10,
        currentPage:1,//表示当前分页
        totalElements:0,

        searchText:'',
        isSearch:false,
        jwt:'',

        options: [{
          value: '0',
          label: '男'
        }, {
          value: '1',
          label: '女'
        }]
      }
    },
    computed: {
      getUrl(){

        return store.templateurl
      },
      getuploadUrl(){
        return store.uploadurl
      },
      roleId:function(){
        return sessionStorage.getItem('role_id');
      }
    },
    components:{comheader,upload,FileUpload},
    created() {
      this.setDialogWidth()
    },
    methods:{

      //上传前的钩子函数
      inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          const extension = newFile.name.substring(newFile.name.lastIndexOf(".") + 1);

          if (extension =='xlsx' ||extension =='xls' ) {

          } else {
            this.$toast('只能上传后缀是.xlsx或xls的文件',2000)
            return prevent();
          }
        }
      },

      //上传的回调函数，每次上传回调都不一样
      uploadFile(newFile, oldFile) {
        let that = this;

        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true
          }
        }
        //that.$emit('inputFile',newFile.response)
        if (newFile && oldFile) {
          if (newFile && oldFile && !newFile.active && oldFile.active) {
            //console.log('response', newFile.response)
            let  response = newFile.response
            if(response.code==200){
              this.search_user();
            }else{
              this.$toast(response.message,3000)
            }
            if (newFile.xhr) {
              //  Get the response status code
              console.log('status', newFile.xhr.status)
            }
          }
        }


      },


      //表格酒奇偶行显示不一样
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'odd-row';
        } else if (rowIndex%2 === 0) {
          return 'even-row';
        }

      },
      //表头单元格的className的回调方法
      cellClass(row){
        if(row.columnIndex==0){
          return 'ntab-checkbox';
        }

      },
      //设置弹出框宽度
      setDialogWidth() {

        var val = document.body.clientWidth
        const def = 580 // 默认宽度
        if (val < def) {
          this.dialogWidth =  '80%'
        } else {
          this.dialogWidth = def + 'px'

        }
      },
      //修改学生信息
      editInfo(obj){
        let that = this;
        that.editDialog = true;

        that.userInfo =  Object.assign({}, obj)

      },

      //修改学生信息
      editPassword(obj){
        let that = this;
        that.resetDialog = true;

        that.userInfo =  Object.assign({}, obj)

      },
      //性别改变
      changeSex(selVal){
        let that =  this;
        //元素修改
        that.userInfo.gender = selVal
      },
      //点击关闭修改弹出框
      handleClose(){
        let that = this;
        that.editDialog = false;
        that.resetDialog = false;
      },

      /*当前页改变的时候触发*/
      handleCurrentChange(val) {
        let that = this;
        that.currentPage =val
        that.search_user();
      },

      //选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 文件上传成功
      handleSuccess(res, file, fileList) {
        this.$message.success('文件上传成功')
      },
      // 覆盖默认的上传行为，自定义上传的实现
      inputFile(data) {
        this.search_user();
      },

      //搜索用户列表
      search_user(){
        let that = this;
        let obj = {};
        obj.per_page = that.per_page;
        obj.page = that.currentPage-1;
        obj.search = that.searchText.replace(/\s*/g,'');
        search_user(obj).then(res=> {
          //console.log(res)
          if(res.code==200){
            this.dataList = res.data.content
            that.totalElements = res.data.totalElements
            if(res.data.content.length==0){
            	that.showUpload=true;
            }
          }else{
            that.$toast(res.message,3000)
          }
        })

      },
      //根据搜索文字搜索用户
      searchUser(){
        let that = this;
        that.search_user();
        that.isSearch = true
      },
      uploadExcel(){
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
      editUserInfo(){
        let that = this;
        modify_user(JSON.stringify(that.userInfo)).then(res=>{
          if(res.code==200){
            that.editDialog = false;
            that.search_user();
          }else{
            this.$toast(res.message,2000)
          }
        })
      },

      //用户密码重置
      editUserPassword(){
        let temp = this.multipleSelection;
        let that = this;
        let user_id_list = []
        for(let j = 0,len=temp.length; j < len; j++) {
          user_id_list.push(temp[j].user_id)
        }
        let obj ={};
        obj.user_id_list = user_id_list;
        obj.password = that.newPas;
        var reg = /^[0-9a-zA-Z]+$/
        if(that.newPas==''){
          that.$toast('请输入新密码',3000)
          return;
        }
        if(that.confirmMewPas==''){
          that.$toast('请输入确认密码',3000)
          return;
        }
        if(that.newPas.length>20 || that.confirmMewPas.length<6){
          that.$toast('请输入密码个数为6到20位',3000)
          return;
        }
        if(!reg.test(that.newPas)) {
          that.$toast('密码只可以是数字或者英文字母', 3000)
          return;
        }
        if(that.newPas!=that.confirmMewPas){
          that.$toast('两次密码输入不一致',3000)
          return;
        }
        updateUserPassword(JSON.stringify(obj)).then(res=> {
          if(res.code==200){
            that.newPas= '';
            that.confirmMewPas= '';
            that.resetDialog = false;
            that.search_user();
          }else{
            that.$toast(res.message,3000)
          }
        })
      },
      //用户删除
      deleteUser(){



        this.$confirm('是否确认删除学生?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let temp = this.multipleSelection;
          let that = this;
          let user_id_list = []
          for(let j = 0,len=temp.length; j < len; j++) {
            user_id_list.push(temp[j].user_id)
          }
          let obj ={};
          obj.user_id_list = user_id_list;
          delete_user(JSON.stringify(obj)).then(res=>{
            if(res.code==200){
              that.search_user();
            }else{
              this.$toast(res.message,2000)
            }
          })


        }).catch(() => {
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
          this.setDialogWidth()
        })()
      }
      this.search_user();
      /*
      if(Cookies.get('jwt')) {

      }else{
        this.getJwt()
      }
      */
      this.jwt = Cookies.get('jwt')
      document.getElementsByTagName("body")[0].className="admin-body";
    },
    beforeDestroy() {
	    document.body.removeAttribute("class","admin-body");
	  },
    destroyed() {
      window.onresize = null;
    }

  }
</script>

<style scoped="" lang="less">
  @import url("../../assets/css/personManage.less");

</style>
<style>
  .el-button--primary{background:#4484FD !important;}
</style>
