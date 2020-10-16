<template>
	 <div class="pageWrap e-pageWrap">
	 	
	 	<div class="e-mainbox">
	 		<div class="e-swiperBox">
			<swiper class="swiper-container swiper-no-swiping"  ref="mySwiper" :options="swiperOption">
	        <div class="swiper-slide turn-box turn-shadow" v-for="(item,index) in cateList" :key="index">
	        	 <div class="slide-main front">
	        	 	  <div class="tab-box">
			        	 	  <div class="icon">
			        	 	  	  <img :src="item.card_pic" />
			        	 	  </div>
			        	 	  <p class="name">{{item.section_title | ellipsis}}</p>
	        	 	  </div>
	        	 </div>
	        	 
	        	 <div class="slide-main back">
	        	 	  <div class="tab-box">
	        	 	  	  <p class="name" v-for="(iitem,index) in item.section" :key="index" v-if="index<6">{{iitem}}</p>
	        	 	  
	        	 	      <div class="btnbox">
	        	 	      	  <span class="btnDetail" @click="showDetail(item.specific_pic,item.section_title)">查看详情>></span>
	        	 	      </div>
	        	 	  </div>
	        	 	
	        	 </div>
	        	 
	        </div>
			</swiper>
			<div class="swiper-button-prev" slot="button-prev" v-show="prevnextShow"></div>
      <div class="swiper-button-next" slot="button-next" v-show="prevnextShow"></div>
	    </div>
   </div>
			<!----头部-->
		<comHeader ref="header" :courseId="courseId" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
		
		
		<el-dialog
		  :title="specific_title"
		  :visible.sync="centerDialogVisible"
		 :width="dialogWidth" class="dialog-detail"
		  center>
		  <div slot="header"></div>
		  <div class="detail-box">
		  	 <div class="d-img"><img :src="specific_pic" /></div>
		  </div>
		  <span slot="footer" class="dialog-footer">
		   
		  </span>
		</el-dialog>
		
	 </div>
</template>

<script src="../../function/e-knowBlockchain.js"></script>
<style scoped="scoped" lang="less">
		@import url("../../assets/teachCss/e-enlightenment.less");
</style>
<style lang="less">
@import url("../../assets/teachCss/e-common.less");
</style>