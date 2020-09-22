<template>
	<div class="funbox">
	    <div class="funcol">
	    	  <div class="icon"></div>
	    	  <p class="mess">下载模板</p>
	    	  <!--点击按钮触发请求window.location.href-->
	    	  <a class="btn" @click="uploadExcel()">
	    	  	 {{pageNum | dowloadTitle}}
	    	  	<span class="icon"></span>
	    	  </a>
	    </div>
	    <div class="funcol funcol-upload">
	    	 <div class="icon"></div>
	    	 <p class="mess">上传Excel表格</p>
	    	<file-upload
            class="stu_upload"
            style="overflow:visible"
            :maximum="3"
            :multiple="true"
              　         　ref="upload"
              　　        v-model="files"
            extensions="xlsx,xls"
              　　       :post-action="getuploadUrl"
              　　       @input-file="inputFile"
              　　       @input-filter="inputFilter"
            
             name="excel_file"
             
             :headers="{'Authorization': jwt}"
            >
            <el-button class="btn btn-upload" type="text" @click.prevent="$refs.upload.active = true">
	      	  {{ pageNum | btnTitle}}
	      	 <span class="icon"></span>
	      </el-button>
        </file-upload>
	    </div>

	 </div>
</template>

<script>
import "vue-upload-component/dist/vue-upload-component.part.css";
import FileUpload from "vue-upload-component";
import {jwt} from '@/API/api'
import Cookies from 'js-cookie'
  import store from '@/store/store1'
export default{
  components: {
    FileUpload
  },
 	data(){
 		return{
 		  files: [],// excel文件列表
 		  
 		  uploadUrl:'http://192.168.1.52:8080/upload_excel',
 		  jwt:''
 		}
 	},
 	filters:{
 		btnTitle(value){
 			let str = value==2?'上传学生信息':'上传老师信息'
 			return str;
 		},
 		dowloadTitle(value){
 			let str = value==2?'下载学员信息模板':'下载老师信息模板'
 			return str;
 		}
 	},
 	props:['limit','pageNum']
 	,
 	computed: {
		getUrl(){	
			return store.templateurl
		},
		getuploadUrl(){
			return store.uploadurl
		}
	},
 	methods:{
 	

    uploadExcel(){
      window.location.href = this.getUrl;
    },


    upLoad() {
         this.$refs.upload.active = true;
    },
    //上传前的钩子函数
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        const extension = newFile.name.substring(newFile.name.lastIndexOf(".") + 1);

        if (extension =='xlsx' ||extension =='xls' ) {

        } else {
          this.$toast('只能上传后缀是.xlsx或xls的文件',2000)
          return prevent();
        }
      }
    },
    //上传的回调函数，每次上传回调都不一样
    inputFile(newFile, oldFile) {
    	let that = this;	

    	if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true
        }
      }
    	//that.$emit('inputFile',newFile.response)
      if (newFile && oldFile) {
         if (newFile && oldFile && !newFile.active && oldFile.active) {
		        //console.log('response', newFile.response)
		         let  response = newFile.response
		        if(response.code==200){  	
		        	 this.$emit('inputFile')
		        }else{
		        	this.$toast(response.message,3000)
		        }
		        if (newFile.xhr) {
		          //  Get the response status code
		          console.log('status', newFile.xhr.status)
		        }
		      }
      }
     
      
    },
    getJwt(){
 			let id = sessionStorage.getItem('user_id');
 			let obj={};
 			obj.id=id
 			 jwt(JSON.stringify(obj)).then(res=> {
 				if(res.code==200){
            this.jwt = res.data.jwt
            Cookies.set('jwt', res.data.jwt, { expires:1 });
          }else{
            this.$toast(res.message,2000)
          }
 			})
 		},


 	},
 	mounted(){
 		if(!Cookies.get('jwt')){
    		this.getJwt();
    }else{
    	this.jwt = Cookies.get('jwt')
    }
 	
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
