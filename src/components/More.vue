<template>
	<div class="div_more">
		<div v-if="islogin">
			<div class="div_userinfo">
				<div class="div_mtop">
					<div class="div_head">
						<div v-if = "userimg == ''">
							<img class="user_headimg" v-if="usersex == '男'" src="../assets/user_man.png">
							<img class="user_headimg" v-else-if="usersex == '女'" src="../assets/user_woman.png">
							<img class="user_headimg" v-else src="../assets/user_man.png">
						</div>
						<div v-else>
							<el-avatar class="user_headimg" shape="circle" :size="50" :fit= "scaletype" :src="getUserImg()"></el-avatar>
						</div>
					</div>
					<div class="div_name">
						<h4 class="h_username" @click="editNickname">{{usernickname}}</h4>
						<h6 class="h_username">{{username}}</h6>
						<h5 class="h_username" @click="editUsertitle">{{usertitle}}</h5>
					</div>
				</div>
			</div>
			<div class="div_out">
				<div class="div_signout">
					<el-button class="button_signout"  round size="medium" @click="signout">退出登录</el-button>
				</div>
				<div class="div_logout">
					<el-button class="button_logout"  round size="medium" @click="showLogoutMessageBox">注销账号</el-button>
				</div>
			</div>
		</div>
		<div v-else>
			<div>
				<img class="img_cap" src="../assets/icon_memorycapsule.png">
				<form @submit.prevent="login($event)">
					<el-input class="input_username" v-model="username" placeholder="输入账号" suffix-icon="el-icon-user">
					</el-input>
					<div v-if="showP" label="showpassword">
						<el-input  class="input_password" v-model="userpassword" :type="text" placeholder="请输入密码">
							<img
								class="password"
								slot="suffix"
								src="../assets/password_show.png"
								@click="showPassword">
						</el-input>
					</div>
					<div v-else label="hidepassword">
						<el-input  class="input_password" v-model="userpassword" type="password" placeholder="请输入密码">
							<img
								class="password"
								slot="suffix"
								src="../assets/password_hide.png"
								@click="showPassword">
						</el-input>
					</div>
				</form>
				<div class="div_main">
					<h5 class="h_loginup">还没有账号，点击<span><a  href="LoginUp">注册</a></span>吧！</h5>
				</div>
				<el-button size="medium" round class="button_login" @click="login($event)">登录</el-button>
			</div>
		</div>
		<h6 class="h_about">————关于记忆胶囊————</h6>
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
import { timeout } from 'q';
	export default{
		data(){
			return{
				islogin:false,
				username: '',
				usersex: '',
				usernickname: '昵称',
				usertitle: '个性签名',
				userimg: '',
				userpassword:'',
				showP: false,
				popupVisible: false,
				popupTitle:'',
				scaletype : 'cover',
				closeTime: timeout,
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
					  if(res['code'] == 203){
							this.showPopuTitle('登录成功');
							this.setCapsuleCookie(this.username,res['token'],res['sex'],res['nickname'],res['usertitle'],res['userimage']);
							this.setUpdate(true, this.username);
					  }else if(res['code'] == 202){
						  	this.showPopuTitle('该账号尚未注册');
					  }else if(res['code'] == 204){
						  	this.showPopuTitle('账号密码不匹配');
					  }
				},
		        (response) => {
						this.showPopuTitle('登录失败');
		            }
		      	)
			},
			showPopuTitle: function(title){
				this.popupVisible = true;
				this.popupTitle = title;
				this.closePopup();
			},
			setCapsuleCookie: function(name,token,sex,nickanme,usertitle,userimg){
				this.usersex = sex;
				this.username= name;
				this.usernickname = nickanme;
				this.usertitle = usertitle;
				this.userimg = userimg;
				this.$cookies.set('capsule_username',name,60 * 60 *60 *24 *15);
				this.$cookies.set('capsule_token',token, 60 *60 *24 *15);
				this.$cookies.set('capsule_usersex',sex, 60 *60 *24 *15);
				this.$cookies.set('capsule_nickname',nickanme, 60 *60 *24 *15);
				this.$cookies.set('capsule_usertitle',usertitle, 60 *60 *24 *15);
				this.$cookies.set('capsule_userimg',userimg, 60 *60 *24 *15);
			},
			clearCapsuleCookie:function(){
				this.$cookies.remove('capsule_username');
				this.$cookies.remove('capsule_token');
				this.$cookies.remove('capsule_usersex');
				this.$cookies.remove('capsule_nickname');
				this.$cookies.remove('capsule_usertitle');
				this.$cookies.remove('capsule_userimg');
				console.log('zzzzzz','out');
			},
			clearInputString:function(){
				this.userpassword = '';
				this.username = '';
			},
			signout:function(){
				this.username = '';
				this.clearCapsuleCookie();
				this.clearInputString();
				this.setUpdate(false, this.username);
			},
			setUpdate(islogin, username){
				this.$store.commit('setIslogin',islogin);
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
					this.username = this.$cookies.get('capsule_username');
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
						if(res['code'] == 219){
							this.signout();
						}else if(res['code'] == 216){
							this.showPopuTitle('没有该账号');
						}else if(res['code'] == 218){
							this.showPopuTitle('账号密码不匹配');
						}
				},
				(response) => {
					this.showPopuTitle('注销账号失败');
				})
				this.userpassword = ''
			},
			editNickname:function(){
				MessageBox.prompt('修改昵称','请输入你的昵称',  {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputType: 'text',
				}).then(({ value }) => {
					this.postUserInfo(0,value)
				}).catch(() => {});
			},
			editUsertitle:function(){
				MessageBox.prompt('修改个性签名','请输入签名（不超过20字）',  {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputType: 'text',
				}).then(({ value }) => {
					this.postUserInfo(1,value)
				}).catch(() => {});
			},
			postUserInfo:function(type, str){
				let form = new FormData();
				if (type == 0){
					form.append('nickname',str);
					this.$http.post(this.utils.getUrl() + '/api/edit_nickname', form)
					.then((response) => {
							var res = JSON.parse(response.bodyText)
							console.log(res)
							if(res['code'] == 223){
								this.usernickname = res['nickname']
								this.$cookies.set('capsule_nickname',this.usernickname, 60 *60 *24 *15);
							}else{

							}
					},
					(response) => {
						this.showPopuTitle('注销账号失败');
					})

				}else if(type == 1){
					form.append('usertitle',str);
					this.$http.post(this.utils.getUrl() + '/api/edit_usertitle', form)
					.then((response) => {
							var res = JSON.parse(response.bodyText)
							console.log(res)
							if(res['code'] == 225){
								this.usertitle = res['usertitle']
								this.$cookies.set('capsule_usertitle',this.usertitle, 60 *60 *24 *15);
							}else {

							}
					},
					(response) => {
						this.showPopuTitle('注销账号失败');
					})
				}
			},
			closePopup: function(){
				this.closeTime = setTimeout(
					this.close,1000)
				
			},
			close: function(){
				this.popupVisible = false;
				window.clearTimeout(this.closeTime);
			},
			getUserImg: function(){
		       return this.utils.getUrl() + "/static"+ this.userimg;
			}

		},
		mounted:function(){
				this.islogin = this.$store.getters.getIsLogin
				if(this.islogin){
					this.usernickname = this.$cookies.get('capsule_nickname');
					this.usertitle = this.$cookies.get('capsule_usertitle');
					this.usersex = this.$cookies.get('capsule_usersex');
					this.username = this.$cookies.get('capsule_username');
					this.userimg = this.$cookies.get('capsule_userimg');
					console.log('zzzzzzzzzzzzMore', "登录了");
				}
	    },
	    computed:{
			shouldUpdate: function() {
				return this.$store.getters.getIsLogin
			}
		},
	    watch: {
			shouldUpdate() {
				if (this.$store.getters.getIsLogin){
					this.islogin = true;
				} else{
					this.islogin = false;
					console.log('zzzzzzzzWatch',"false");
				}
			}
		}
	}
</script>
<style lang="scss" type="text/css">
	.div_main{
		margin: 0 auto;
		width: 80%;
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
		margin: 0px;
		text-align: right;
		padding-right: 5px;
		margin-top: 8px;
		font-size: 12px;
		//background: red;
	}
	.password{
		width: 8%;
		margin: 10px 0;
		margin-right: 4px;
		float: right;
	}
	.toppopup{
		height:7%;
		width: 100%;
	}
	.button_login{
		width: 80%;
		margin: 20px 0;
		margin-top: 25PX;
		color: #ffffff;
		background-color: #1DB0B8;
		box-shadow:  0px 2px 0px 0px #e5e5e5;
	}
	.input_username{
		margin-top: 25px;
		width: 80%;
		box-shadow:  0px 2px 0px 0px #e5e5e5;
	}
	.input_password{
		margin-top: 5px;
		width: 80%;
		box-shadow:  0px 2px 0px 0px #e5e5e5;
	}
	.div_userinfo{
		display: flex;
		width: 90%;
		margin: 0 auto;
		margin-top: 20px;
		background: rgba(94, 213, 209, 0.39);
		box-shadow:  0px 2px 0px 0px #e5e5e5;
		border-radius: 0.3em;
	}
	.div_mtop{
		margin: auto;
		margin-top: 20px;
		margin-bottom: 30px;
		margin-left: 20%;
		//background: #1256df;
		display: -webkit-box;
	}
	.div_out{
		position: fixed;
		//background: red;
		bottom: 0;
		left: 0;
		right: 0;
		margin-bottom: 150px;
	}
	.div_signout{
		width: 80%;
		margin: 0 auto;
	}
	.div_logout{
		width: 80%;
		margin: 0 auto; 
	}
	.div_head{
		display: flex;
	}
	.user_headimg{
		margin: auto;
		top: 0;
		bottom: 0;
		width: 50px;
		height: 50px;
		background: rgba(94, 213, 209, 0.39);
	}
	.div_name{
		//display: flex;
		margin: auto;
		//background: red;
		margin-left: 20px;
	}
	.h_username{
		text-align: left;
		margin: auto;
		margin-top: 5px;
		//top: 0;
		//bottom: 0;
	}
	.button_signout{
		margin: 0 auto;
		margin-top: 20px;
		color: #ffffff;
		background-color: #1DB0B8;
		box-shadow:  0px 2px 0px 0px #e5e5e5;
		width: 100%;
	}
	.button_logout{
		margin: 0 auto;
		margin-top: 20px;
		margin-left: 0px;
		left: 0px;
		color: #ffffff;
		background-color: #F44336;
		box-shadow:  0px 2px 0px 0px #e5e5e5;
		width: 100%;

	}
	.img_cap{
		width: 64px;
		height: 64px;
		margin-top: 30px;
		box-shadow:  0px 2px 0px 0px #e5e5e5;
	}
	.h_about{
		position: fixed;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin-bottom: 80px;
		font-size: 8px;
		color: #615f5f;
	}
	
</style>