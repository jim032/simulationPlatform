<template>
  <div id="app"> 
    <router-view v-if="isRouterHide" />
  </div>
</template>

<script>
export default {
  name: 'App',
  
  // 父组件中返回要传给下级的数据，来实现点同一路由刷新
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterHide: true
    };
  },
  methods: {
    reload() {
    	
      this.isRouterHide = false;
      this.$nextTick(function() {
        this.isRouterHide = true;
      });
    }
  },
  
  created () {
    /*
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    */
  }
}
</script>


<style lang="less">

@font-face {
  font-family: "SourceHanSansCN-Regular";
  src: url("assets/fonts/SourceHanSansCN-Regular.woff2") format("woff2"),
       url("assets/fonts/SourceHanSansCN-Regular.woff") format("woff"),
       url("assets/fonts/SourceHanSansCN-Regular.ttf") format("truetype"),
       url("assets/fonts/SourceHanSansCN-Regular.eot") format("embedded-opentype"),
       url("assets/fonts/SourceHanSansCN-Regular.svg") format("svg");
}

#app {
  font-family: 'SourceHanSansCN-Regular', Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:100%;height: 100%;
  
}
html,body{width:100%;height:100%;}

@backgroundColor:#E6E9F0;


body{
	background:@backgroundColor;
}

</style>
<style>
@import url("assets/css/common.css");
</style>
