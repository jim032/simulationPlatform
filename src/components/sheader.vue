<template>
	<div class="headerbox" ref="header">
		<div class="wmain">
			<div class="h_top">
				<div class="sysName">
					<div class="logo"><img src="../assets/img/logo.png"/></div>
					<h3 class="sysTitle">仿真教学后台管理平台</h3>
				</div>
				<div class="h_info">
					<a class="aPreview" @click="preView">预览</a>
					<div class="loginRole" @click="linkPerCenter"><p class="role-sel">你好,{{roleId =='1'?'管理员':'老师'}}</p></div>
					<a class="exit" @click="signOut">退出</a>
				</div>
			</div>
			<ul class="nav">
				<li class="curItem" :class="{'cur':pageNum==1}" @click="linkRoute(1)">数据统计</li>
				<li class="curItem" :class="{'cur':pageNum==2}" @click="linkRoute(2)">人员管理</li>
				<!--<li class="curItem" :class="{'cur':pageNum==3}" @click="linkRoute(3)">自定义课程</li>-->
				<li class="curItem" :class="{'cur':pageNum==3}" @click="linkRoute(3)">课程管理</li>
			</ul>
		</div>
	</div>
</template>

<script>

	 import Cookies from 'js-cookie'
	 import {logout} from '@/API/api'

export default{
	 inject:['reload'], //注入app的方法
		data(){
			return{

			}
    },
    computed: {
	  	roleId:function(){

	  		return sessionStorage.getItem('role_id');


	    }
	  },
    props:['pageNum'],
    methods:{
    	/*
    	clickMenu(){
    		this.$emit('clickMenu')
    	}*/
    	linkRoute(num){
    		switch(num){
    			case 1:
    			  this.$router.push({name:'index'})
    			  break;
    			case 2:
    			  this.$router.push({name:'personManage'})
    			  break;
    			case 3:
    			  this.$router.push({name:'course'})

    			  break;

    		}
    	},
    	linkPerCenter(){
    		this.$router.push({name:'perSet'})
    	},
    	//退出
    	signOut(){
    		let that = this;
    		let obj ={};
    		obj.user_id = sessionStorage.getItem('user_id')
    		logout(obj).then(res=>{
    			if(res.code==200){
    				sessionStorage.removeItem('user_id')
		    		sessionStorage.removeItem('role_id')
		    		sessionStorage.removeItem('jwt')
		        //Cookies.remove('jwt');
						that.$router.push({'path':'/login'})
    			}else{
            that.$toast(res.message,3000)
          }
    		})



    	},
    	
    	//预览
    	preView(){
    		let that = this;
    		that.$router.push({'path':'/login',query:{isPreview:true}})
    	}
    	
    }
}
</script>

<style scoped lang="less">
ul,li{list-style:none;}
.borderRadius(@param1,@param2,@param3,@param4){
   border-radius:@param1 @param2 @param3 @param4;
   -webkit-border-radius:@param1 @param2 @param3 @param4;
   -moz-border-radius:@param1 @param2 @param3 @param4;
   -ms-border-radius:@param1 @param2 @param3 @param4;
   -o-border-radius:@param1 @param2 @param3 @param4;
};

@headerColor:#3182FF;
@navbg:rgba(255,255,255,.1);
@navcolor:#fff;
@navhovecolor:#3182FF;

.headerbox{
	background:@headerColor; height:310px; .borderRadius(0,0,40px,40px); position: relative; z-index: 1;
	.wmain{width:1400px;margin:0 auto;}
	.h_top{height:100px;width:100%; display: table;position: relative;}

	.sysName{
		display: table-cell;height: 100%;vertical-align: middle;
		.logo{width:60px;height:60px; display: inline-block;vertical-align: middle;}
		.logo img{width:100%;height: 100%;}
	    .sysTitle{font-size:24px;color:#fff; font-weight: 500;display: inline-block;vertical-align: middle; margin-left:20px;}
	}

	.h_info{height:44px; position: absolute;right:0px;top:50%; margin-top: -22px;}
	.loginRole{font-size:18px;color:#fff;background: url(../assets/img/top_person.png)left center no-repeat;
	padding:8px 10px 8px 50px; display: inline-block; vertical-align: middle;cursor:default;
	background-size: 40px; -moz-background-size: 40px; -webkit-background-size: 40px; -o-background-size: 40px;
	.role-sel{background: url(../assets/img/sel_white.png) right center no-repeat; padding-right:25px;}
  }

    .exit{
    font-size:18px;color:#fff;background: url(../assets/img/top_exit.png)left center no-repeat;
	padding:8px 0 8px 32px; margin-left: 15px;
	background-size: 24px;
	-moz-background-size: 24px;
    -webkit-background-size: 24px;
    -o-background-size:24px;
    }

    .nav{
    	height:60px; background:@navbg;.borderRadius(30px,30px,30px,30px); margin:30px 0;
    	.curItem{width:33.33%;float: left; text-align: center; line-height: 60px; font-size:22px; color:@navcolor; cursor: pointer;}
    	.curItem:hover,.curItem.cur{background:#fff;color:#3182FF;.borderRadius(30px,30px,30px,30px);}
    }
}

.aPreview{font-size:18px; color:#fff; display: inline-block; vertical-align: middle;
background: url(../assets/img/icon_preview.png) left center no-repeat; padding-left: 58px; padding-top:20px; padding-bottom: 20px;
margin-right:20px;}

@media screen and (max-width:1420px){
    .headerbox{
      .wmain{width:88%;}
    }
}
</style>
