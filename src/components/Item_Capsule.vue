<template>
	<div class = "div_item">
		<div id="div_item_start">
			<h2 class="h_day">{{showDay(item.fields.capsule_create_time)}}</h2>
			<h5 class="h_mounth">{{showMounth(item.fields.capsule_create_time)}}</h5>
			<h6 class="h_week">{{showWeekDay(item.fields.capsule_create_time)}}</h6>
		</div>
		<div id="div_item_mid">
			<div id ="div_item_content" @click="detailCapsuleItem">
				{{showContent(item.fields.capsule_content)}}
			</div>
			<div id ="div_item_other">
				<h6 class="h_wordsize">{{showContentSize(item.fields.capsule_content)}}</h6>
			</div>
		</div>
		<div id ="div_item_end" >
			<img id="image_type" slot="icon" src="../assets/icon_diary.png" v-if="item.fields.capsule_type == '日记'">
			<img id="image_type" slot="icon" src="../assets/icon_live.png" v-else-if="item.fields.capsule_type == '生活'">
			<img id="image_type" slot="icon" src="../assets/icon_study.png" v-else-if="item.fields.capsule_type == '学习'">
			<img id="image_type" slot="icon" src="../assets/icon_travel.png" v-else-if="item.fields.capsule_type == '旅行'">
			<img id="image_type" slot="icon" src="../assets/icon_work.png" v-else-if="item.fields.capsule_type ==='工作'">
			<img id="image_type" slot="icon" src="../assets/icon_diary.png" v-else>
			<img id="img_menu" slot="icon" src="../assets/menu.png" @click="showActionSheet">
		</div>
		<mt-actionsheet
        	:actions= "actionData"
			 v-model="actionVisiable">
		</mt-actionsheet>
	</div>
</template>
<script type="text/javascript">
	import {Actionsheet} from 'mint-ui'
	import {MessageBox} from 'mint-ui';
	export default{
		data(){
			return{
				actionVisiable: false,
				actionData: [
					{name: '修改',
					method: this.editCapsuleItem},
					{name: '详情',
					method: this.detailCapsuleItem},
					{name: '删除',
					method: this.showMessageBox},
				]
				/*item:{id:1,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"}*/
			}
		},
		props: ['item'],
		methods:{
			showTime: function(str){
				return '创建时间:' +  this.utils.changeTime(str);
			},
			showDay: function(str){
				var day = this.utils.getDay(str);
				if (day < 10){
					day = '0' + day 
				}
				return day;
			},
			showWeekDay: function(str){
				return this.utils.getWeekDay(str);
			},
			showMounth: function(str){
				return this.utils.getMounth(str) + "月";
			},
			showContent: function(str){
				return this.utils.cropTheCpasuleContent(str);
			},
			showActionSheet(){
				this.actionVisiable = true
			},
			showContentSize(str){
				return this.utils.getStrLength(str) + ' 字';
			},
			editCapsuleItem(){
				this.$store.commit('setCapsuleItem', this.item);
				this.$router.push({name:'Edit' });
			},
			detailCapsuleItem(){
				this.$store.commit('setCapsuleItem', this.item);
				this.$router.push({
              		name:'ItemDetail' });
			},
			deleateCapauleItem(){
				let formData = new FormData()
				formData.append('username',this.item.fields.capsule_id);
			    formData.append('capsulepk',this.item.pk);
				this.$http.post(this.utils.getUrl() + '/api/delete_capsule', formData)
						.then((response) => {
								var res = JSON.parse(response.bodyText)
								console.log(res)
								if(res['error_name'] == 213){
									console.log("删除成功")
									this.$emit('updateCapsules')
								}else if(res['error_name'] == 202){
									console.log("没有该账号")
								}else if(res['error_name'] == 214){
									console.log("该条记录不是该用户创建")
								}else if(res['error_name'] == 2111){
									console.log("没有该记录")
								}else{
									console.log("删除失败")
								}
						},(response) => {
							console.log(response)
							}
						)
				},
				showMessageBox(){
					MessageBox.confirm('',{
						title:'确定删除',
						message:'删除之后不可恢复',
						confirmButtonText:'确认',
						cancelButtonText:'取消'
						}).then(action => {
							if (action == 'confirm') {
								console.log('点击确认');
								this.deleateCapauleItem();
							}
						}).catch(error =>{
							if(error == 'cancel'){
								console.log('点击取消');
							}
						});
				}
		},
		mounted:function(){
			
	    },
	}
	
</script>
<style lang="scss" scoped="" type="text/css">
	.div_item{
		width: 100%;
		margin-bottom: 10px;
		min-height: 80px;
		color: #000000;
		background: rgba(94, 213, 209, 0.39);
		border-radius: 0.2em;
		display: -webkit-box;
		box-shadow:  0px 2px 0px 0px #e5e5e5;
	}
	#div_item_start{
		width: 12%;
		height: 100%;
	//	background: chocolate;
		position: relative;

	}
	#div_item_mid{
		//background:pink;
		width: 78%;
		height: 100%;
		//background: rebeccapurple;
		position: relative;
		border-left-style: solid;
		border-left-color: rgba(76, 179, 231, 0.699);
		border-left-width: 0.5px;

	}
	#div_item_end{
		width: 10%;
		//background: blue;
		position: relative;
	}
	.h_type{
		text-align: left;
		margin: 0px;
		padding: 0px;
	}
	#div_item_content{
		min-height: 70px;
		text-align:	left;
		//background: red;
		text-indent: 10px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		color: #1a1a1afb;
		font-size: 16px;
		overflow-wrap: break-word;
		margin: 3px;
		margin-top: 5px;
		margin-left: 5px;
	}
	#div_item_other{
		height: 100%;
		//background: yellow;
		display: -webkit-box;
	}
	#image_type{
		width: 30px;
		height: 30px;
		height: 100%;
		margin-top: 5px;
	}
	#img_menu{
		position: absolute;
		width: 22px;
		margin: 0 auto;
		bottom: 0;
		left: 0;
		right: 0;
		margin-bottom: 10px;
		//background: orangered;
	}
	.h_day{
		margin: 0 auto;
		margin-top: 3px;
		color: #82A6F5;
		font-size: 28px;
		padding-left: 5px;
		//background: #000000;
		text-align: left;
	}
	.h_mounth{
		width: 100%;
		margin: 0 auto;
		font-size: 18px;
		color: #82A6F5;
		margin-top: -5px;
		padding-left: 5px;
		//background: #000000;
		text-align: left;
	}
	.h_week{
		margin: 0 auto;
		font-size: 8.5px;
		color:#82A6F5;
		padding-left: 6px;
		//background: #000000;
		text-align: left;
	}
	.h_wordsize{
		margin: 0;
		height: 100%;
		margin-top: 5px;
		margin-left: 5px;
		margin-bottom: 2px;
		color: #82A6F5;
		//background: red;
	}

</style>