<template>
	<div>
		<mt-header class="loginin_mc"  fixed title="注册">
			<mt-button  id="loginin_back" icon = "back" slot = "left" @click="back">返回</mt-button>
		</mt-header>
		<h3 class="h_title">请按照以下要求注册账号!</h3>
		<div class="div_uptop" @submit.prevent="submit($event)">
			<el-input class="select" v-model="username" placeholder="请自定义一个用户名（数字和英文的组合，不少于六位）">
			</el-input>
			<el-input class="select" v-model="useremail" placeholder="请输入邮箱"></el-input>
			<el-select class="select" v-model="usersex" placeholder="请选择性别">
				<el-option v-for="item in sexs" 
						:key="item.value" 
						:label="item.lable"
						:value="item.value">
				</el-option>
			</el-select>
			<div v-if="showP" label="showpassword">
				<el-input class="select" v-model="userpassword" :type="text" placeholder="请输入密码（数字和英文的随机组合，不少于六位）">
					<img
						class="password"
						slot="suffix"
						src="../assets/password_show.png"
						 @click="showPassword">
				</el-input>
			</div>
			<div v-else label="hidepassword">
				<el-input class="select" v-model="userpassword" type="password" placeholder="请输入密码（数字和英文的随机组合，不少于六位）">
					<img
						class="password"
						slot="suffix"
						src="../assets/password_hide.png"
						 @click="showPassword">
				</el-input>
			</div>
			<div v-if="showP"  label = "showpassword_r">
					<el-input class="select" v-model="userpassword_r" type="text" placeholder="请确认密码">
						<img
						class="password"
						slot="suffix"
						src="../assets/password_show.png"
						 @click="showPassword">
					</el-input>
			</div>
			<div v-else  label="hidepassword_r">
					<el-input class="select" v-model="userpassword_r" type="password" placeholder="请确认密码">
						<img
							class="password"
						slot="suffix"
						src="../assets/password_hide.png"
						 @click="showPassword">
					</el-input>
			</div>
		</div>
		<ElButton class="button_logup" type="button" @click="submit($event)">提交</ElButton>
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
	import {Toast} from 'mint-ui';
	import {Popup} from 'mint-ui';
	export default{
		data(){
			return {
				username:'',
				userpassword:'',
				userpassword_r: '',
				useremail:'',
				usersex:'',
				popupVisible: false,
				popupTitle:'',
				showP: false,
				sexs: [
					{
					 value: '男',
					 label: '男'
					},	{
					 value: '女',
					 label: '女'
					},
				],
			}
		},
		components:{
	
		},
		methods:{
			back:function (argument) {
				// body...
				this.$router.back();
			},
			showPassword(){
				if(this.showP){
					this.showP = false;
				}else{
					this.showP = true;
				}	
			},
			submit:function(event){
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
					if(this.utils.isNull(this.useremail)){
						this.showPopuTitle('请输入邮箱');
						return;
					}

					if(!this.utils.isTrueUserEmail(this.useremail)){
						this.showPopuTitle('邮箱不符合规则');
						return;
					}

					if(this.utils.isNull(this.usersex)){
						this.showPopuTitle('请选择性别');
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
					if(this.utils.isNull(this.userpassword_r)){
						this.showPopuTitle('请再次输入密码');
						return;
					}

					if(!this.utils.isSameStr(this.userpassword,this.userpassword_r)){
						this.showPopuTitle('两个密码不一致');
						return;
					}
					formData.append('username',this.username);
					formData.append('password',this.userpassword);
					formData.append('email',this.useremail);
					formData.append('sex',this.usersex);
					console.log(this.usersex);
				this.$http.post(this.utils.getUrl() + '/api/user_loginup', formData)
		      	.then((response) => {
					  var res = JSON.parse(response.bodyText)
			     	  console.log(res)
					  if(res['code'] == 0){
							this.showPopuTitle('注册成功');
							this.setCapsuleCookie(res['token'],res['sex']);
							this.$emit('updateCapsules',this.update);
							/**
							 * 全局广播，告诉其他组件已经注册成功了
							 */
							//this.$store.commit('setIslogin',true);//全局广播有的话，就不需要使用传值方法了
					   		this.back();
					  }else if(res['code'] == 201){
						  	this.showPopuTitle('账号名已重复');
					  }
		        },
		        (response) => {
					   this.popupVisible = true;
					   this.popupTitle = '注册失败';
		            }
		      	)
			},
			showToast: function(title){
				Toast(title);
			},
			showPopuTitle: function(title){
				this.popupVisible = true;
				this.popupTitle = title;
			},
			setCapsuleCookie: function(token,sex){
				this.$cookies.set('capsule_username',this.username,60 * 60 *60 *24 *15);
				this.$cookies.set('capsule_password',this.userpassword,60 * 60 *60 *24 *15);
				this.$cookies.set('capsule_token',token, 60 *60 *24 *15);
				this.$cookies.set('capsule_usersex',sex, 60 *60 *24 *15);
			},
		},
		mounted:function(){		
		}
	}
	
</script>
<style lang="scss" type="text/css">
	.loginin_mc{
			color:#ffffff;
			position: fixed;
			font-size: 18px;}
	.loginin_back{
			font-size: 10px
	}
	.toppopup{
		height:7%;
		width: 100%;
	}
	.password{
		width: 10%;
		margin: 10px 0;
		float: right;
	}
	.select{
		width: 100%;
		margin: 0 auto;
		margin-top: 3px;
	}
	.button_logup{
		width: 95%;
		margin: 0 auto;
		color: #ffffff;
		margin-top: 30px;
		background-color: #1DB0B8;
	}
	.div_uptop{
		margin-top: 20px;
	}
	.h_title{
		margin: 0;
		text-align: left;
		font-family: 'Courier New', Courier, monospace;
		font-size: 15px;
		padding-left: 15px;
		color:  #F44336;;
	}
</style>