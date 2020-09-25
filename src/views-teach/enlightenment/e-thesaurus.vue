<template>
	 <div class="pageWrap e-pageWrap">
	 	
	 	<div class="e-mainbox">
	 		<div class="e-swiperBox">
	 		<div class="swiper-container thesaurus-swiper swiper-no-swiping">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide turn-box turn-shadow" v-for="(item,index) in cateList" :key="index">
			        	 <div class="slide-main front">
			        	 	  <div class="tab-box">
					        	 	  <div class="number">
					        	 	  	{{index+1 | sortNumber}}
					        	 	  	<span class="line"></span>
					        	 	  </div>
					        	 	  <p class="name">
					        	 	  	 {{item.name | ellipsis}}
					        	 	  	 
					        	 	  </p>
			        	 	  </div>
			        	 </div>
			        	 
			        	 <div class="back">
			        	 	  <div class="tab-box">
			        	 	  	  <p class="intro">{{item.intro}}</p>
			        	 	  </div>
			        	 	
			        	 </div>
			        	 
			        </div>
			        
			    </div>

			    
			</div>
			 <div class="swiper-button-prev"slot="button-prev" v-if="cateList.length>3"></div>
       <div class="swiper-button-next"slot="button-next" v-if="cateList.length>3"></div>
			</div>			   
   </div>
			<!----头部-->
		<comHeader ref="header" :courseId="courseId" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
			
	 </div>
</template>

<script src="../../function/e-thesaurus.js"></script>
<style scoped="scoped" lang="less">
		@import url("../../assets/teachCss/e-enlightenment.less");
</style>
<style lang="less">
@import url("../../assets/teachCss/e-common.less");
</style>