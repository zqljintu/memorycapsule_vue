<template>
	<div>
		<div v-if="islogin">
			<div class="div_userinfo">
				<div class="div_top">
					<div class="div_head">
						<img class="user_headimg" v-if="usersex == '男'" src="../assets/user_man.png">
						<img class="user_headimg" v-else-if="usersex == '女'" src="../assets/user_woman.png">
						<img class="user_headimg" v-else src="../assets/user_man.png">
					</div>
					<div class="div_name">
						<h4 class="h_username">{{username}}</h4>
					</div>
				</div>
			</div>
			<div>
				<el-button class="button_signout" size="medium" round @click="signout">退出登录</el-button>
				<el-button class="button_logout" size="medium" round @click="showLogoutMessageBox">注销账号</el-button>
			</div>
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
					<div v-if="showP" label="showpassword">
						<el-input  v-model="userpassword" :type="text" placeholder="请输入密码">
							<img
								class="password"
								slot="suffix"
								src="../assets/password_show.png"
								@click="showPassword">
						</el-input>
					</div>
					<div v-else label="hidepassword">
						<el-input  v-model="userpassword" type="password" placeholder="请输入密码（数字和英文的随机组合，不少于六位）">
							<img
								class="password"
								slot="suffix"
								src="../assets/password_hide.png"
								@click="showPassword">
						</el-input>
					</div>
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
import {MessageBox} from 'mint-ui';
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
			signout:function(){
				this.islogin = false;
				this.username = '';
				this.clearCapsuleCookie();
				this.setUpdate(this.islogin, this.username);
			},
			setUpdate(islogin, username){
				this.$store.commit('setIslogin',islogin);
				this.$store.commit('setUsername',username);
			},
			showLogoutMessageBox: function(){
				MessageBox.confirm('',{
						title:'确定注销该账号',
						message:'注销之后不可恢复，相关提交记录也会被删除',
						confirmButtonText:'确认',
						cancelButtonText:'取消'
						}).then(action => {
							if (action == 'confirm') {
								this.reputPassword();
							}
						}).catch(error =>{
							if(error == 'cancel'){
							
							}
						});
			},
			reputPassword:function(){
				MessageBox.prompt('请重新提交账号密码','验证身份',  {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputType: 'password',
				}).then(({ value }) => {
					this.userpassword = value
					this.logout();
				}).catch(() => {});
			},
			logout:function(){
				console.log("zzzzzz",this.username + this.userpassword)
				let form = new FormData();
				form.append('username',this.username);
				form.append('password',this.userpassword);
				this.$http.post(this.utils.getUrl() + '/api/user_logout', form)
				.then((response) => {
						var res = JSON.parse(response.bodyText)
						console.log(res)
						if(res['error_name'] == 203){
							
						}else if(res['error_name'] == 202){
							this.showPopuTitle('该账号尚未注册');
						}else if(res['error_name'] == 204){
							this.showPopuTitle('账号密码不匹配');
						}
				},
				(response) => {
						this.popupVisible = true;
						this.popupTitle = '注销账号失败';
				})
				this.userpassword = ''
				this.username = ''
			},

				

			},
			mounted:function(){
					this.islogin = this.$cookies.isKey('capsule_username');
					if(this.islogin){
						this.usersex = this.$cookies.get('capsule_usersex');
						this.username = this.$cookies.get('capsule_username');
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
	.div_userinfo{
		display: flex;
	}
	.div_top{
		margin: auto;
		background: #1256df;
		display: -webkit-box;
	}
	.div_head{
		display: flex;
		background: coral;
	}
	.user_headimg{
		margin: auto;
		top: 0;
		bottom: 0;
		width: 50px;
		height: 50px;
		background: #125658;
	}
	.div_name{
		display: flex;
		background: red;
		margin-left: 20px;
	}
	.h_username{
		margin: auto;
		top: 0;
		bottom: 0;
	}
	.button_signout{
		background: #1DB0B8;
		margin-top: 20px;
	}
	
</style>