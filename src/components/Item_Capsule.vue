<template>
	<div class = "div_item">
		<div id="div_item_left">
			<div id ="div_item_type">
				<h5 class="h_type">
				   {{item.fields.capsule_type}}
				</h5>
			</div>
			<div id ="div_item_content" @click="detailCapsuleItem">
				{{showContent(item.fields.capsule_content)}}
			</div>
			<div id ="div_item_time">
				{{showTime(item.fields.capsule_create_time)}}
			</div>
		</div>
		<div id ="div_item_type_image" >
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
			showContent: function(str){
				return this.utils.cropTheCpasuleContent(str);
			},
			showActionSheet(){
				this.actionVisiable = true
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
		min-height: 70px;
		color: #000000;
		background: #F8F2DC;
		display: -webkit-box;
	}
	#div_item_left{
		background:pink;
		width: 90%;
		position: relative;

	}
	#div_item_type{
		display: flex;
		font-size: 20px;
	}
	.h_type{
		text-align: left;
		margin: 0px;
		padding: 0px;
	}
	#div_item_content{
		min-height: 40px;
		background: brown;
		text-align:	left;
		text-indent: 20px;
		font-size: 16px;
		overflow-wrap: break-word;
		margin: 10px;
	}
	#div_item_time{
		margin-top: 10px;
		bottom: 10px;
		background: yellow;
	}
	#div_item_type_image{
		width: 10%;
		background: blue;
		position: relative;
	}
	#image_type{
		width: 100%;
		max-width: 30px;
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
		margin-bottom: 15px;
		background: orangered;
	}

</style>