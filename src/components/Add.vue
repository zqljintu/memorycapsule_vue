<template>
	<div>
		<mt-header class="add_mc" id="add_mc" fixed title="添加">
			<mt-button  id="add_back" icon = "back" slot = "left" @click="back">返回</mt-button>
    	</mt-header>
		<div class="add_nav">
			<mt-button id="add_button_content" size = "small" @click.native.prevent="active = 'tab_addcontent'">添加内容</mt-button>
			<mt-button id="add_button_other" size="small" @click.native.prevent="active = 'tab_addother'">添加其他</mt-button>
		</div>
		<form @submit.prevent="submit($event)">
			<mt-tab-container class="add_tab" v-model="active">
				<mt-tab-container-item  id="tab_addcontent">
						<el-select class="add_select" v-model="capsule_type" placeholder="请选择类型">
							<el-option v-for="item in capsuletypes" 
											:key="item.value" 
											:label="item.label" 
											:value="item.value">
							</el-option>
						</el-select>
						<el-input
					    id="textinput_capsule_content"
					    type="textarea" :rows="5"
						name="capsule_context" 
						v-model = "capsule_content" 
						placeholder="请输入内容"
						clearable ></el-input>
				</mt-tab-container-item>
				<mt-tab-container-item id="tab_addother">
					<el-input class="input_other" 
						type="text" 
						name="capsule_time" 
						suffix-icon="el-icon-date"
						v-model = "capsule_time" 
						placeholder="请输入指定日期"
						clearable ></el-input>
						<el-input class="input_other" 
						type="text" 
						name="capsule_date" 
						suffix-icon="el-icon-time"
						v-model = "capsule_date" 
						placeholder="请输入指定时间"
						clearable ></el-input>
						<el-input class="input_other"
						type="text" 
						name="capsule_person" 
						suffix-icon="el-icon-person"
						v-model = "capsule_person" 
						placeholder="请输入相关人物"
						clearable ></el-input>
						<el-input class="input_other"
						type="text" 
						name="capsule_location" 
						suffix-icon="el-icon-location"
						v-model = "capsule_location" 
						placeholder="请输入指定地点"
						clearable ></el-input>
						<el-input class="input_other"
						type="text" 
						name="capsule_image" 
						suffix-icon="el-icon-image"
						v-model = "capsule_image" 
						placeholder="请输入相关照片"
						clearable ></el-input>
				</mt-tab-container-item>
			</mt-tab-container>
			<mt-button id="button_submint"  size = "large" @click="submit($event)">提交</mt-button>
		</form>
	</div>
</template>
<script type="text/javascript">
	import {Toast} from 'mint-ui';
	export default {
		data(){
			return{
				islogin:false,
				username:'',
				active : 'tab_addcontent',
				capsule_type: '',
				capsule_content: '',
				capsule_time: '',
				capsule_date: '',
				capsule_person: '',
				capsule_location: '',
				capsule_image: '',
				update : 0,
				capsuletypes: [{
					value: '工作',
					label: '工作'
					}, {
					value: '学习',
					label: '学习'
					}, {
					value: '生活',
					label: '生活'
					}, {
					value: '日记',
					label: '日记'
					}, {
					value: '旅行',
					label: '旅行'
				}],
			}
		} ,
		components:{
	
		},
		methods:{
			back:function (argument) {
				// body...
				this.$router.back();
			},
			submit:function(event){
				event.preventDefault();
				let formData = new FormData();
				if (this.utils.isNull(this.capsule_type)){
					Toast("请选择创建类型");
					return;
				}
				if (this.utils.isNull(this.capsule_content)){
					Toast("请输入具体内容");
					return;
				}
				formData.append('capsule_id',this.username);
				formData.append('capsule_type',this.capsule_type);
				formData.append('capsule_content',this.capsule_content);
				formData.append('capsule_time',this.capsule_time);
				formData.append('capsule_date',this.capsule_date);
				formData.append('capsule_location',this.capsule_location);
				formData.append('capsule_person',this.capsule_person);
				formData.append('capsule_image',this.capsule_image);

				this.$http.post(this.utils.getUrl() + '/api/add_capsule', formData)
		      	.then((response) => {
					var res = JSON.parse(response.bodyText)
			     	console.log(res)
					if(res['error_name'] == 206){
			           Toast("提交成功");
					   //this.$emit('updateCapsules',this.update)
					   this.back();
			        }else{
					   Toast("提交失败");
					}
		        },
		        (response) => {
					   Toast("提交失败");
		            }
		      	)
			},
			showToast: function(){
				Toast("kkkk");
			}
		},
		mounted:function(){
      	    this.islogin = this.$cookies.isKey('capsule_username');
			if(this.islogin){
				this.username = this.$cookies.get('capsule_username');
				console.log('zzzzz',this.username)
			}
		}
	}
</script>
<style lang="scss" type="text/css">
	.add_mc{color:#ffffff;
			background: #1DB0B8;
			position: fixed;
			font-size: 18px;}
	.add_nav{
		margin: 0 auto;
		margin-top: -15px;
		flex: none;
		display: -webkit-box;
		width: 90%
	}
	.add_button_content{
		width: 200px;
		float: right;
	}
	.add_button_other{
		width: 200px;
		float: left;
	}
	.add_back{
			font-size: 15px
	}
	.add_select{
			width: 90%;
			margin: 0 auto;
	}
	.add_tab{
		margin-top: 10px;
	}
	.input_other{
		width: 90%;
		margin: 0 auto;
		margin-top: 5px;
	}
	#textinput_capsule_content{
		height:300px;
		min-height: 50%;
		width: 90%;
		margin: 0 auto;
		margin-top: 5px;
	}
	#button_submint{
		width: 80%;
		margin: 0 auto;
		margin-top: 50px;
		background: #1DB0B8;
	}
</style>