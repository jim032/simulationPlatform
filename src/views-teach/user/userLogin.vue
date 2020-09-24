<template>
	<div class="pageWrap">
		<div class="loginMain">
			
			<div class="formBox">
				
				<div class="introPic">
					<img src="../../assets/img/login_intro.png" />
				</div>
				<div class="formMain">
					<div class="formTitle">
						<div class="logo"></div>
						<div class="ftitle">
							<h3>仿真</h3>
							<p>-区块链虚拟仿真学习平台</p>
						</div>
					</div>
					<div class="selbox" :class="{'showTransModal':showmodelList}" @click="showmodelList=!showmodelList">
						<div class="din din-ms" >
							<span class="lab"></span>
							<p class="sel">{{model}}</p>
							
						</div>
						<div class="transModal">
							<p class="pcel" v-for="(item,index) in modelList" :key='item.type' @click.stop="choModel(item)">{{item.text}}</p>
						</div>
					</div>
					
					<div class="din din-zh" >
						<span class="lab"></span>
						<input type="text" placeholder="账号" v-model="account"/>
					</div>
					<div class="din din-mm" >
						<span class="lab"></span>
						<input type="password" placeholder="密码" v-model="password"/>
					</div>
					<div class="btnbox">
					   <button @click="login">登陆</button>
					</div>
					<p class="fun">
						<a @click="linkAdminLogin">切换教师端登录</a>	
					</p>
				</div>
				
			</div>
		</div>
		

		<p class="botcompany"></p>
		 <Modal v-model="modal1"
        
        :title="modalTitle"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>{{modalMess}}</p>

      </Modal>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				model:'选择模式',
				showmodelList:false,
				modelList:[{type:'1',text:'单人模式'},{type:'2',text:'多人模式'}],
				account:'',
				password:'',
				modal1: false,
				modalTitle:'',
				modalMess:''
			}
		},
		methods:{
			choModel(obj){
				let that = this;
				that.model = obj.text;
				that.showmodelList = false;
				
				
			},
			//点击登陆
			login(){
				let that = this;
				
				if(that.model == '选择模式'){
					that.modal1 = true;
					that.modalTitle = "请选择模式"
					that.modalMess = "请先选择模式，才可以登陆！"
					console.log(1)
				}
				else if(that.account == ''){
					that.modal1 = true;
					that.modalTitle = "请输入账号"
					that.modalMess = "账号未输入不可登陆！"
					console.log(2)
				}
				else if(that.password == ''){
					that.modal1 = true;
					that.modalTitle = "请输入密码"
					that.modalMess = "密码未输入不可登陆！"
					console.log(3)
				}else{
					this.$router.push({name:'catalogue'})
				}
			},
			ok () {
          //this.$Message.info('点击了确定');
      },
      cancel () {
          //this.$Message.info('点击了取消');
      },
     //跳转到后台登陆
		linkAdminLogin(){
			
			window.location.href=this.$store.state.adminlogin
		}
			
		},
	}
	
</script>

<style scoped lang="less">
@import url("../../assets/teachCss/login.less");
</style>