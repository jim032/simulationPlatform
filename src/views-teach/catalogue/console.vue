<template>
	<div class="pageWrap consolePage">
	  <!----头部-->
		<comHeader ref="header" :courseId="courseId" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
	</div>
</template>

<script>
	import comHeader from '@/components-teach/sheader';
	export default{
		data(){
			return{
				 menuShow:false,//上方菜单按钮是否显示
				 menuText:'控制台',
				 courseId:0,
			}
		},
		components:{
		   comHeader
	  },
	  methods:{
	  	//点击菜单图标
		  clickMenu(){
		 	  this.menuShow = !this.menuShow
		  },
	  }
	}
</script>

<style scoped lang="less">
@import url("../../assets/teachCss/style.less");
.consolePage{background: url(../../assets/teachImg/index_bg.png) left center no-repeat;
 background-size:cover; -webkit-background-size:cover; display:table;
}
</style>