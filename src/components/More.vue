<template>
	<div>
		<div v-if="islogin">
			<div>
				<img class="user_headimg" v-if="usersex == '男'" src="../assets/user_man.png">
				<img class="user_headimg" v-else-if="usersex == '女'" src="../assets/user_woman.png">
				<img class="user_headimg" v-else src="../assets/user_man.png">
			</div>
			<el-button class="button_logout" size="medium" round @click="logout">退出登录</el-button>
		</div>
		<div v-else>
			<div class="div_main">
			<h5 class="h_loginup">还没有账号，点击<span><a  href="LoginUp">注册</a></span>吧！</h5>
			</div>
			<div class="div_main">
				<h5 class="h_loginup">有账号？下方登录吧！</h5>
			</div>
			<div>
				<form @submit.prevent="login($event)">
					<el-input class="input_username" v-model="username" placeholder="输入账号">
					</el-input>
					<form-item v-if="showP" label="showpassword">
						<el-input  v-model="userpassword" :type="text" placeholder="请输入密码">
							<img
								class="password"
								slot="suffix"
								src="../assets/password_show.png"
								@click="showPassword">
						</el-input>
					</form-item>
					<form-item v-else label="hidepassword">
						<el-input  v-model="userpassword" type="password" placeholder="请输入密码（数字和英文的随机组合，不少于六位）">
							<img
								class="password"
								slot="suffix"
								src="../assets/password_hide.png"
								@click="showPassword">
						</el-input>
					</form-item>
				</form>
				<el-button size="medium" round class="button_login" @click="login($event)">登录</el-button>
			</div>
		</div>
		<mt-popup
			class="toppopup"
			v-model="popupVisible"
			popup-transition="popup-fade"
			position="top">
			<div class="div_popup">
				<h5>{{popupTitle}}</h5>
			</div>
		</mt-popup>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				islogin:false,
				username: '',
				usersex: '',
				userpassword:'',
				showP: false,
				popupVisible: false,
				popupTitle:'',
			}
		},
		components:{

		},
		methods:{
			submit:function(event){
				event.preventDefault();
			},
			
			showPassword:function(){
				if(this.showP){
					this.showP = false;
				}else{
					this.showP = true;
				}	
			},
			login:function(event){
				event.preventDefault();
				let formData = new FormData();
					if(this.utils.isNull(this.username)){
						this.showPopuTitle('用户名不能为空');
						return;
					}
					if(!this.utils.isTrueUserName(this.username)){
						this.showPopuTitle('用户名不符合规则');
						return;
					}
					if(this.utils.isNull(this.userpassword)){
						this.showPopuTitle('密码不能为空');
						return;
					}
					if(!this.utils.isTrueUserPassword(this.userpassword)){
						this.showPopuTitle('密码不符合规则');
						return;
					}
					formData.append('username',this.username);
					formData.append('password',this.userpassword);
					console.log(this.username)
					console.log(this.userpassword)
				this.$http.post(this.utils.getUrl() + '/api/user_login', formData)
		      	.then((response) => {
					  var res = JSON.parse(response.bodyText)
			     	  console.log(res)
					  if(res['error_name'] == 203){
							this.showPopuTitle('登录成功');
							this.setCapsuleCookie(res['sex']);
							this.islogin = true;
							this.usersex = res['sex'];
							this.setUpdate(this.islogin, this.username);
							this.clearInputString();
					  }else if(res['error_name'] == 202){
						  	this.showPopuTitle('该账号尚未注册');
					  }else if(res['error_name'] == 204){
						  	this.showPopuTitle('账号密码不匹配');
					  }
				},
		        (response) => {
					   this.popupVisible = true;
					   this.popupTitle = '登录失败';
		            }
		      	)
			},
			showPopuTitle: function(title){
				this.popupVisible = true;
				this.popupTitle = title;
			},
			setCapsuleCookie: function(sex){
				this.$cookies.set('capsule_username',this.username,60 * 60 *60 *24 *15);
				this.$cookies.set('capsule_password',this.userpassword,60 * 60 *60 *24 *15);
				this.$cookies.set('capsule_usersex',sex, 60 *60 *24 *15);
			},
			clearCapsuleCookie:function(){
				this.$cookies.remove('capsule_username');
				this.$cookies.remove('capsule_password');
				this.$cookies.remove('capsule_usersex');
				this.islogin = false;
				console.log('zzzzzz','out');
			},
			clearInputString:function(){
				this.userpassword = '';
				this.username = '';
			},
			logout:function(){
				this.islogin = false;
				this.username = '';
				this.clearCapsuleCookie();
				this.setUpdate(this.islogin, this.username);
			},
			setUpdate(islogin, username){
				this.$store.commit('setIslogin',islogin);
				this.$store.commit('setUsername',username);
			}
			

		},
		mounted:function(){
			 this.islogin = this.$cookies.isKey('capsule_username');
			 if(this.islogin){
				 this.usersex = this.$cookies.get('capsule_usersex');
				 console.log('zzzzzzzzzzzzMore',this.usersex);
			 }
	    },
	    watch: {

		}
	}
</script>
<style lang="scss" type="text/css">
	.div_main{
		background: pink;
	}
	.h_normal{
		width: 50%;
		text-align: right
	}
	.h_jump{
		width: 50%;
		text-align: left;
	}
	.div_login{
		margin: 0 auto;
		display: -webkit-box;
		//background: green;
	}
	.h_loginup{
		width: 100%;
		text-align: center;
		//background: red;
	}
	.password{
		width: 10%;
		margin: 10px 0;
		float: right;
	}
	.toppopup{
		height:7%;
		width: 100%;
	}
	.button_login{
		width: 100%;
		margin: 20px 0;
		color: #ffffff;
		background-color: #1DB0B8;
	}
	.input_username{
		margin-top: 10px;
		margin-bottom: 5px;
	}
	.user_headimg{
		width: 50px;
		height: 50px;
		margin: 0px 0;
		margin-top: 20px;
		//background: #1256df
	}
	.button_logout{
		background: #1DB0B8
	}
	
</style>