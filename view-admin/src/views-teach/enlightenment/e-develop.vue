<template>
	 <div class="pageWrap e-pageWrap">
	 	
	 	<div class="e-mainbox">
	 		
     <div class="timeLine" style="overflow: hidden;">
        <div class="content">
            <p class="tit">{{timeLineList[timeIndex].year}}</p>
            <p>{{timeLineList[timeIndex].info}}</p>
        </div>
       
        <div class="ul_box">
            <ul class="my_timeline" ref="mytimeline" style="margin-left: 10px;">
                <li class="my_timeline_item" v-for="(item,index) in timeLineList" :key="index">
                    <!--圈圈节点-->
                    <div class="my_timeline_node" :style = " {backgroundColor: item.bgcolor, width: item.size + 'px', height: item.size + 'px'}" @click="changeActive(index)" :class="{active: index == timeIndex}"></div>
                    <!--线-->
                    <div class="my_timeline_item_line"></div>
                    <!--标注-->
                    <div class="my_timeline_item_content" :style="{color: item.color, fontSize: item.fontsize + 'px'}">
                        {{item.timestamp}}
                    </div>
                </li>
            </ul>
        </div>
        
    </div>
						   
   </div>
			<!----头部-->
		<comHeader ref="header" :courseId="courseId" :menuShow="menuShow" @clickMenu="clickMenu" :menuText="menuText"></comHeader>
			
	 </div>
</template>

<script src="../../function/e-develop.js"></script>
<style scoped="scoped" lang="less">
		@import url("../../assets/teachCss/e-enlightenment.less");
		@import url("../../assets/teachCss/e-develop.less");
</style>
