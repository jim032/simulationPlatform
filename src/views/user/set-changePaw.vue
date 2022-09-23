<template>
  <div class="rightMain">
    <div class="frombox">
      <el-form status-icon ref="ruleForm2" label-width="0" class="edit-from">
        <el-form-item label="" prop="oldPaw">
          <el-input
            type="password"
            v-model="ruleForm2.password"
            auto-complete="off"
            maxlength="20"
            placeholder="Please enter the old password"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm2.newPassword"
            auto-complete="off"
            maxlength="20"
            placeholder="Please enter the new password"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            auto-complete="off"
            placeholder="Please enter the new password again"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="submitBtn" @click="editPass"
            >submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/API/api";
export default {
  data() {
    return {
      ruleForm2: {
        password: "",
        newPassword: "",
        checkPass: ""
      }
    };
  },
  methods: {
    editPass() {
      let that = this;
      let obj = {};
      obj.id = that.$store.state.userId || sessionStorage.getItem("user_id");
      obj.password = that.ruleForm2.password;
      obj.newPassword = that.ruleForm2.newPassword;

      var reg = /^[0-9a-zA-Z]+$/;

      if (that.ruleForm2.password == "") {
        that.$toast("Please enter the old password", 3000);
        return;
      }
      if (that.ruleForm2.newPassword == "") {
        that.$toast("Please enter the new password", 3000);
        return;
      }
      if (
        that.ruleForm2.newPassword.length > 20 ||
        that.ruleForm2.newPassword.length < 6
      ) {
        that.$toast("Please enter a password of 6 to 20 characters", 3000);
        return;
      }

      if (!reg.test(that.ruleForm2.newPassword)) {
        that.$toast("The password can only be numbers or letters", 3000);
        return;
      }

      if (that.ruleForm2.checkPass == "") {
        that.$toast("Please enter the confirmation password", 3000);
        return;
      }
      if (that.ruleForm2.newPassword != that.ruleForm2.checkPass) {
        that.$toast("The two passwords are inconsistent", 3000);
        return;
      }

      updateUser(obj).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: "login" });
        } else {
          that.$toast(res.message, 3000);
        }
      });
    },
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.editPass();
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  }
};
</script>

<style>
.edit-from .el-input__inner {
  font-size: 16px;
  border: 1px solid #666;
}
.edit-from .el-input__inner:hover {
  border: 1px solid #666;
}
.edit-from .submitBtn {
  width: 100%;
  height: 40px;
  background: #4484fd;
  font-size: 18px;
  -moz-border-radius: 20px;
  -o-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
}
</style>
<style scoped lang="less">
.rightMain {
  width: 100%;
  height: 100%;
  display: table;
}
.frombox {
  display: table-cell;
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.edit-from {
  width: 400px;
  margin: 0 auto;
  font-size: 16px;
}

@media screen and (max-width: 978px) {
  .edit-from {
    width: 80%;
  }
}
</style>
