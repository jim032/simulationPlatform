<template>
<div class="staDiv bottomDiv" >
   
</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		//isBlcok是否展示进度，blockPro具体进度值
		props:['operaInfo','blockPro','isBlcok','step','invisable'],
		watch:{
			'operaInfo':function(){
				let that = this;
			
			}
		}
		
	}
</script>

<style scoped lang="less">
@basecolor:#fff;
a,i,em{font-style:normal; text-decoration:0 none;}

.borderRadius(@param1,@param2,@param3,@param4){
   border-radius:@param1 @param2 @param3 @param4; 
   -webkit-border-radius:@param1 @param2 @param3 @param4; 
   -moz-border-radius:@param1 @param2 @param3 @param4;
   -ms-border-radius:@param1 @param2 @param3 @param4;
   -o-border-radius:@param1 @param2 @param3 @param4;
}


</style>