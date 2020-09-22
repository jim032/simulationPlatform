<template>
	<ul class="treebox">
	  <li class="m-course" :class="{'m-course1':index==0,'active-course':item.show==true}" v-for="(item,index) in menus" :key="index">
  		<div class="bg"></div>
  		<p class="line1" @click = "selectItem(item,index,1)">
  			  <span class="checkn" :class="{'checkh':(item.selectArr && item.selectArr.length)}" @click.stop = "checkItem(item)"></span>{{item.label}}
  	 </p>		
  	</li>
	  <ul class="i-course" v-if="courindex!=null && menus[courindex].children.length>0">
      <li  v-for="(item1,index) in menus[courindex].children">
      	 <div class="name" :class="{'i-active-course':item1.show==true}">
      	 	 <div class="ibg"></div>
      	 	 <p class="line1" :class="{'hasArrow':item1.children && item1.children.length>0}"  @click = "selectItem(item1,index,2)">
      	 	 	  <span class="checkn" :class="{'checkh':(item1.selectArr && item1.selectArr.length)}"
      	 	 	  	 @click.stop = "checkItem(item1)">
      	 	 	  </span>{{item1.label}}
      	 	</p>
      	 </div>
      	 <ul class="ii-course" v-if="item1.show==true">
      	 	<li v-for="(item2,index) in item1.children" :class="{'hasArrow':item2.children && item2.children.length>0}">
      	 		<div class="name line1" @click = "selectItem(item2,index,2)">
      	 			<span class="checkn" :class="{'checkh':(item2.selectArr && item2.selectArr.length)}"
      	 				 @click.stop = "checkItem(item2)">
      	 			</span>{{item2.label}}
      	 	 </div>
      	 		<ul class="iii-course" v-if="item2.show==true">
      	 				<li v-for="(item3,index) in item2.children">
      	 	       	<p class="line1 name" @click = "selectItem(item3,index,2)">
      	 	       		<span class="checkn" :class="{'checkh':(item3.selectArr && item3.selectArr.length)}"
      	 	       			 @click.stop = "checkItem(item3)">
      	 	       		</span>{{item3.label}}
      	 	       	</p>
      	 	      </li>
      	 		</ul>
      	 	</li>
      	 </ul>
      </li>
		</ul>	
  </ul>
  
</div>
</template>

<script>
export default{
		data(){
			return{
				courindex:null
			}
		},
		props:['menus'],
		methods:{
		
		    // 将selectItem方法暴露出去
		    selectItem(item,index,level){
		    	//level表示第一级
		    	if(level==1){
			    	if(item.show==false){
			    		this.courindex = index
			    	}else{
			    		this.courindex = null
			    	}
		    	}
		      this.$emit("selectItem",item,index,level);
		      
		    },
		    // 将checkItem方法暴露出去
		    checkItem(item){
		      this.$emit("checkItem",item);
		    }
		
		},
		mounted(){
			
		}
	}
</script>

<style scoped lang="less">
.line1{
     white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.borderRadius(@param1,@param2,@param3,@param4){
   border-radius:@param1 @param2 @param3 @param4; 
   -webkit-border-radius:@param1 @param2 @param3 @param4; 
   -moz-border-radius:@param1 @param2 @param3 @param4;
   -ms-border-radius:@param1 @param2 @param3 @param4;
   -o-border-radius:@param1 @param2 @param3 @param4;
};
ul,li{list-style:none;}
 .checkn{width:16px;height:16px;display: inline-block; vertical-align:top; padding:4px; -moz-box-sizing: border-box;  
     -webkit-box-sizing: border-box; 
     -o-box-sizing: border-box; 
     -ms-box-sizing: border-box; 
     box-sizing: border-box; }
 .m-course{margin-left:8px;cursor: default;width:117px;
    .checkn{ margin-top: 26px; margin-right:11px;
    background:url(../assets/img/checkn.png) left center no-repeat; background-size: 13px;-webkit-background-size: 13px;;}
    
    p{height:70px;line-height: 70px;font-size:20px;color:#fff;padding-left:12px;}
    .checkh{background:url(../assets/img/checked1.png) left center no-repeat; background-size: 13px;-webkit-background-size: 13px;
    }
    
  }
.m-course1{margin-top:90px;}
.m-course.active-course{
  position: relative;
  p{color:#3182FF;position: relative;z-index: 2;}
  .bg{background:url(../assets/img/course_active.png) left center no-repeat;background-size:contain;-webkit-background-size:contain;
  width:100%;height:110px;position: absolute;left:0px;top:50%;z-index: 1; margin-top:-58px;}
  .checkn{background:url(../assets/img/checkh.png) left center no-repeat; background-size: 13px;-webkit-background-size: 13px;;}
  .checkh{background:url(../assets/img/checked.png) left center no-repeat; background-size: 13px;-webkit-background-size: 13px;}
}

.i-course{
    position: absolute;left:125px;right:0px;top:0px;height: 100%;overflow-y: auto;width:225px; background:#fff;
    .borderRadius(0,20px,20px,0); padding-left:13px;
     > li:first-child{margin-top:30px;}
}

.i-course  li{margin: 3px 0;}
.i-course  li  .name{
    position: relative;cursor:default;
    
    > p{
        font-size:18px;color:#666;height:42px; line-height: 42px; position: relative;z-index: 2;
        padding-left:10px;
    }
    > .hasArrow{
    	display: inline-block;background: url(../assets/img/cat_arrow.png) 98% center  no-repeat; padding-right:28px;
  max-width: 96%;
    }
    .checkn{background:url(../assets/img/checki.png) left center no-repeat; background-size: 13px;-webkit-background-size: 13px;
    margin-top:12px; margin-right:8px;}
    .checkh{
    	background:url(../assets/img/checked.png) left center no-repeat; background-size: 13px;-webkit-background-size: 13px;
    }
}
.i-course li .i-active-course{
	> .ibg{
        width:100%;height: 72px;background: url(../assets/img/icourse_active.png)left center no-repeat;
        background-size:100%;-webkit-background-size:100%;position: absolute;left:0px;top:50%;margin-top: -36px;z-index:1;
    }
}

  .ii-course{margin-left:20px;}
  .ii-course > .hasArrow{}
  .ii-course > .hasArrow > .name{display: inline-block;background: url(../assets/img/cat_arrow.png) 96% 9px  no-repeat; padding-right:14%;
  max-width: 100%;}
  .ii-course > li > .name{
     font-size:16px;color:#666;height:32px; line-height: 32px; 
     .checkn{margin-top:7px;}
  }
  .iii-course{margin-left:20px;} 
  .iii-course > li > .name{
     font-size:14px;color:#666;height:32px; line-height:32px; 
     .checkn{margin-top:7px;}
  }
 
</style>