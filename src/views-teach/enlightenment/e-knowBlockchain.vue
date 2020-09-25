<template>
	 <div class="pageWrap e-pageWrap">
	 	
	 	<div class="e-mainbox">
	 		<div class="e-swiperBox">
			<div class="swiper-container swiper-no-swiping" >
			    <div class="swiper-wrapper">
			        <div class="swiper-slide turn-box turn-shadow" v-for="(item,index) in cateList" :key="index">
			        	 <div class="slide-main front">
			        	 	  <div class="tab-box">
					        	 	  <div class="icon">
					        	 	  	  <img :src="item.icon" />
					        	 	  </div>
					        	 	  <p class="name">{{item.name | ellipsis}}</p>
			        	 	  </div>
			        	 </div>
			        	 
			        	 <div class="back">
			        	 	  <div class="tab-box">
			        	 	  	  <p class="name" v-for="(iitem,index) in item.intro" :key="index" v-if="index<6">{{iitem}}</p>
			        	 	  
			        	 	      <div class="btnbox">
			        	 	      	  <span class="btnDetail" @click="centerDialogVisible=true">查看详情>></span>
			        	 	      </div>
			        	 	  </div>
			        	 	
			        	 </div>
			        	 
			        </div>
			        
			    </div>
			    
			</div>
			<div class="swiper-button-prev" slot="button-prev" v-if="cateList.length>3"></div>
      <div class="swiper-button-next" slot="button-next" v-if="cateList.length>3"></div>
	    </div>
   </div>
			<!----头部-->
		<comHeader ref="header" :courseId="courseId" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
		
		
		<el-dialog
		  title="区块链与比特币"
		  :visible.sync="centerDialogVisible"
		 :width="dialogWidth" class="dialog-detail"
		  center>
		  <div slot="header"></div>
		  <div class="detail-box">
		  	 <div class="d-img"><img src="../../assets/pic/detail-img.png" /></div>
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