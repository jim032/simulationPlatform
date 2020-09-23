<template>
	<div class="funbox">
	    <div class="funcol">
	    	  <div class="icon"></div>
	    	  <p class="mess">下载模板</p>
	    	  <!--点击按钮触发请求window.location.href-->
	    	  <a class="btn">
	    	  	 {{pageNum | dowloadTitle}}
	    	  	<span class="icon"></span>
	    	  </a>
	    </div>
	    <div class="funcol funcol-upload">
	    	 <div class="icon"></div>
	    	 <p class="mess">上传Excel表格</p>
	    	 <el-upload multiple :show-file-list="false"
		      ref="upload"
		      class="stu_upload"
		      :http-request="uploadFile"
		      :action= 'actionUrl'	
		      accept=".xlsx,.xls"
		      :auto-upload="true"
		      :before-upload="beforeUpload"
		      :on-exceed="handleExceed"
		      :on-success="handleSuccess"
		      :on-error="handleError"
		      :limit=limit
		    >
	      <el-button class="btn btn-upload" type="text" >
	      	  {{ pageNum | btnTitle}}
	      	 <span class="icon"></span>
	      </el-button>
	    </el-upload>
	    </div>
	    
	 </div>
</template>

<script>
export default{
 	data(){
 		return{
 			actionUrl:'http://www.baidu.com',
 		  fileList: [],   // excel文件列表      
 		}
 	},
 	filters:{
 		btnTitle(value){
 			let str = value==1?'上传学生信息':'上传老师信息'
 			return str;
 		},
 		dowloadTitle(value){
 			let str = value==1?'下载学员信息模板':'下载老师信息模板'
 			return str;
 		}
 	},
 	props:['limit','pageNum']
 	,methods:{
 		// 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUpload(file) {
      	let extension = file.name.substring(file.name.lastIndexOf('.')+1)
        let size = file.size / 1024 / 1024
        if(!(extension == 'xlsx' || extension == 'xls')) {
          this.$message.warning('只能上传后缀是.xlsx的文件')
        }
        if(size > 10) {
          this.$message.warning('文件大小不得超过10M')
        }
      },


      // 文件超出个数限制
      handleExceed(files, fileList) {
        this.$message.warning(`只能选择 ${this.limit} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
      },
      
      //文件上传成功
      handleSuccess(){
      	let that = this;
      	that.$emit('handlesuccess');
      },
      
     // 覆盖默认的上传行为，自定义上传的实现
      uploadFile(file){
      	let that = this
      	that.$emit('uploadfile',file,that.fileList);
      },
      // 文件上传失败
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败')
      },
 	}
 }
</script>

<style lang="less">
.borderRadius(@param1,@param2,@param3,@param4){
   border-radius:@param1 @param2 @param3 @param4; 
   -webkit-border-radius:@param1 @param2 @param3 @param4; 
   -moz-border-radius:@param1 @param2 @param3 @param4;
   -ms-border-radius:@param1 @param2 @param3 @param4;
   -o-border-radius:@param1 @param2 @param3 @param4;
};
.funbox{text-align: center; padding-bottom:94px;}
.funcol{width:44%;  display:inline-block; vertical-align: middle; margin: 0 1.5%;
background:#f6f7fb; border:3px dashed #d7d7d7;.borderRadius(10px,10px,10px,10px)
}

.m_title{font-size:20px;color:#000; background: url(../assets/img/per_in.png) left center no-repeat;
margin: 0 4%; padding:40px 0 40px 45px; margin: 0 4%;}

.funcol{padding-top:99px;  height: 432px;
  .icon{width:110px;height:70px; background: url(../assets/img/per_download.png) center; margin: 0 auto;}
  .mess{font-size:18px;color:#666; padding-top: 15px; padding-bottom: 43px;}
  
  .btn{width:283px;height:58px; display: block; margin: 0 auto;.borderRadius(29px,29px,29px,29px);background:#3282FF; cursor: pointer;
  position: relative; font-size:20px; color:#fff; text-align: left; padding-left: 40px;line-height: 58px;}
  .btn .icon{width:58px;height:58px;display: block;position: absolute;;right:0px;top:0px;.borderRadius(29px,29px,29px,29px);
  background:#2652FF url(../assets/img/btn_dowload.png) center no-repeat;}
  
}

.funcol-upload{
  .icon{background: url(../assets/img/per_upload.png) center;}
  .btn{padding-left: 62px; line-height: normal;} 
  .btn .icon{background:#2652FF url(../assets/img/btn_upload.png) center no-repeat;} 
}
</style>