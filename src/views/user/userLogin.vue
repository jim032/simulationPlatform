<template>
  <div class="pageWrap">
    <div class="loginMain">
      <div class="formBox">
        <div class="introPic">
          <img src="../../assets/img/login_intro.png" />
        </div>
        <div class="formMain">
          <div class="formTitle">
            <div class="logo"></div>
            <div class="ftitle">
              <h3>simulation</h3>
              <p>-Blockchain virtual simulation learning platform</p>
            </div>
          </div>

          <div
            class="selbox"
            :class="{ showTransModal: showmodelList }"
            @click="showmodelList = !showmodelList"
            v-if="loginType == 1"
          >
            <div class="din din-ms">
              <span class="lab"></span>
              <p class="sel">{{ model }}</p>
            </div>
            <div class="transModal">
              <p
                class="pcel"
                v-for="(item, index) in modelList"
                :key="item.type"
                @click.stop="choModel(item)"
              >
                {{ item.text }}
              </p>
            </div>
          </div>

          <div class="din din-zh " :class="{ 'din-tea-zh': loginType == 2 }">
            <span class="lab"></span>
            <input type="text" placeholder="account number" v-model="account" />
          </div>
          <div class="din din-mm">
            <span class="lab"></span>
            <input type="password" placeholder="password" v-model="password" />
          </div>
          <div class="btnbox">
            <button @click="login">login</button>
          </div>

          <p class="fun">
            <a @click="linkFrontLogin"
              >Switch to{{
                loginType == 1 ? "teacher login" : "student login"
              }}</a
            >
          </p>
        </div>
      </div>
    </div>

    <p class="botcompany"></p>
  </div>
</template>

<script>
import { login, createToken } from "@/API/api";
import Cookies from "js-cookie";
import { jwt } from "@/API/api";
import store from "@/store/store1";
export default {
  data() {
    return {
      model: "Selection mode",
      showmodelList: false,
      modelList: [
        { type: 1, text: "single mode" },
        { type: 2, text: "multi mode " }
      ],
      modalType: 0, //登陆模式
      account: "",
      password: "",
      modal1: false,
      modalTitle: "",
      modalMess: "",
      jwt: "",
      loginType: 1, //1表示学生登录  2表示教师登陆

      ispreview: false //是否老师预览
    };
  },

  methods: {
    choModel(obj) {
      let that = this;
      that.model = obj.text;
      that.modalType = obj.type;
      that.showmodelList = false;
    },
    //点击登陆
    login() {
      let that = this;
      /*
        if(that.loginType==1){
	         	let token = sessionStorage.getItem('stu_userToken')
	          if(token==null || token =='') {
	          	createToken({id:that.account}).then(res=>{
	          		if(res.code==200){
	          			sessionStorage.setItem('stu_userToken',res.data.token)
	          		}else{
	          			that.$toast(res.message,3000)
	          		}

	          	})
	          }
        }
        */

      if (that.model == "Selection mode" && that.loginType == 1) {
        that.$toast("Selection mode", 3000);
      } else if (that.account == "") {
        that.$toast("please enter account number", 3000);
      } else if (that.password == "") {
        that.$toast("please enter password", 3000);
      } else {
        //清除cookie缓存
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (let i = keys.length; i--; )
            document.cookie =
              keys[i] + "=0;expires=" + new Date(0).toUTCString();
        }
        this.login1();
      }
    },
    login1() {
      let that = this;
      that.getJwt(that.account);
    },
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.login();
      }
    },

    //用户登陆
    userLogin() {
      let obj = {};
      let that = this;
      obj.id = that.account;
      obj.password = that.password;
      obj.loginType = that.loginType; //1学生登录 2老师登陆  3老师预览登陆
      if (this.ispreview) {
        obj.loginType = 3;
      } else {
        obj.loginType = that.loginType; //1学生登录 2老师登陆  3老师预览登陆
      }
      login(obj).then(res => {
        if (res.code == 200) {
          if (this.ispreview) {
            let role_id = res.data.role_id;
            let id = res.data.id;
            //console.log(res.data.role_id)
            sessionStorage.setItem("stu_userId", res.data.id);
            sessionStorage.setItem("stu_role_id", res.data.role_id);
            sessionStorage.setItem("loginModal", that.modalType);
            //sessionStorage.setItem('custom_course_size',res.data.custom_course_size)
            this.$router.replace({ name: "catalogue" }).catch(err => err);
          } else {
            let role_id = res.data.role_id;
            let id = res.data.id;
            if (role_id == 3) {
              //console.log(res.data.role_id)
              sessionStorage.setItem("stu_userId", res.data.id);
              sessionStorage.setItem("stu_role_id", res.data.role_id);
              sessionStorage.setItem("loginModal", that.modalType);
              //sessionStorage.setItem('custom_course_size',res.data.custom_course_size)
              this.$router.replace({ name: "catalogue" }).catch(err => err);
            } else {
              sessionStorage.setItem("user_id", res.data.id);
              sessionStorage.setItem("role_id", res.data.role_id);
              this.$router.replace({ name: "index" }).catch(err => err);
            }
          }
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },

    getJwt(id) {
      //let id = sessionStorage.getItem(id);
      let obj = {};
      obj.id = id;
      if (this.loginType == 1) {
        jwt(JSON.stringify(obj)).then(res => {
          if (res.code == 200) {
            //this.jwt = res.data.jwt
            //Cookies.set('stu_jwt', res.data.jwt, { expires:1});
            sessionStorage.setItem("stu_jwt", res.data.jwt);
            this.userLogin();
          } else {
            this.$toast(res.message, 2000);
          }
        });
      } else {
        jwt(JSON.stringify(obj)).then(res => {
          if (res.code == 200) {
            //this.jwt = res.data.jwt
            //Cookies.set('jwt', res.data.jwt, { expires:1});
            sessionStorage.setItem("jwt", res.data.jwt);
            this.userLogin();
          } else {
            this.$toast(res.message, 2000);
          }
        });
      }
    },
    linkFrontLogin() {
      let that = this;
      if (that.loginType == 1) {
        that.loginType = 2;
        sessionStorage.setItem("loginType", 2);
      } else {
        that.loginType = 1;
        sessionStorage.setItem("loginType", 1);
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
    this.loginType = sessionStorage.getItem("loginType")
      ? sessionStorage.getItem("loginType")
      : 1;

    this.ispreview = this.$route.query.isPreview
      ? this.$route.query.isPreview
      : false;
    if (this.ispreview) {
      this.loginType = 1;
      sessionStorage.setItem("loginType", 1);
    } else {
      this.loginType = sessionStorage.getItem("loginType")
        ? sessionStorage.getItem("loginType")
        : 1;
    }
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  }
};
</script>

<style scoped lang="less">
@import url("../../assets/css/style.less");

@import url("../../assets/css/login.less");
</style>
