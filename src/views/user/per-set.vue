<template>
	<div class="pageWrap">
	  <comheader ref="header" :pageNum="pageNum"></comheader>
	  <div class="mainbox">
    		<div class="mmain mmain-set">
    			 <div class="left-nav">
    			 	 <div class="title">个人设置页面</div>
    			 	 <div class="ava">
    			 	   <div class="avabox"><img src="../../assets/img/ava.png"/></div>
    			 	   <p class="prole">管理员</p>
    			 	  
    			 	 </div>
    			 	  <ul class="nav-ul">
    			 	   	 <li class="active" @click="linkrouter('changePaw')"><span>修改密码</span></li>
    			 	   	 <li @click="linkrouter('function')"><span>其他功能</span></li>
    			 	   	 <li @click="linkrouter('function')"><span>其他功能</span></li> 
    			 	   	 <li @click="linkrouter('function')"><span>其他功能</span></li> 
    			 	   </ul>
    			 	   
    			 </div>
    			 <router-view ></router-view>
    		</div>
    </div>
	</div>
</template>

<script>
	import comheader from '@/components/sheader';
	export default{
		data(){
			return{
				pageNum:4,
			}
		},
		components:{
			comheader
		},
		methods:{
			linkrouter(path){
				this.$router.push({name:path})
			}
		}
	}
</script>

<style scoped lang="less">
@import url("../../assets/css/per-set.less");
</style>