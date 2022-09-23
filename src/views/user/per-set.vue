<template>
  <div class="pageWrap">
    <comheader ref="header" :pageNum="pageNum"></comheader>
    <div class="mainbox">
      <div class="mmain mmain-set">
        <div class="left-nav">
          <div class="title">Personal settings page</div>
          <div class="ava">
            <div class="avabox"><img src="../../assets/img/ava.png" /></div>
            <p class="prole">admin</p>
          </div>
          <ul class="nav-ul">
            <li class="active" @click="linkrouter('changePaw')">
              <span>Change Password</span>
            </li>
            <li @click="linkrouter('function')">
              <span>Other functions</span>
            </li>
            <li @click="linkrouter('function')">
              <span>Other functions</span>
            </li>
            <li @click="linkrouter('function')">
              <span>Other functions</span>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import comheader from "@/components/sheader";
export default {
  data() {
    return {
      pageNum: 4
    };
  },
  components: {
    comheader
  },
  methods: {
    linkrouter(path) {
      this.$router.push({ name: path });
    }
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = "admin-body";
  },
  beforeDestroy() {
    document.body.removeAttribute("class", "admin-body");
  }
};
</script>

<style scoped lang="less">
@import url("../../assets/css/per-set.less");
</style>
