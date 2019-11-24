<template>
	<dev class = "div_item">
		<div id="div_item_left">
			<div id ="div_item_type">
				<h5 class="h_type">
				   {{item.fields.capsule_type}}
				</h5>
			</div>
			<div id ="div_item_content">
				{{showContent(item.fields.capsule_content)}}
			</div>
			<div id ="div_item_time">
				{{showTime(item.fields.capsule_create_time)}}
			</div>
		</div>
		<div id ="div_item_type_image">
			<img id="image_type" slot="icon" src="../assets/icon_diary.png" v-if="item.fields.capsule_type == '日记'">
			<img id="image_type" slot="icon" src="../assets/icon_live.png" v-else-if="item.fields.capsule_type == '生活'">
			<img id="image_type" slot="icon" src="../assets/icon_study.png" v-else-if="item.fields.capsule_type == '学习'">
			<img id="image_type" slot="icon" src="../assets/icon_travel.png" v-else-if="item.fields.capsule_type == '旅行'">
			<img id="image_type" slot="icon" src="../assets/icon_work.png" v-else-if="item.fields.capsule_type ==='工作'">
			<img id="image_type" slot="icon" src="../assets/icon_diary.png" v-else>
		</div>
	</dev>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
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
        //justify-content: center;
        //align-items: center;
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
	}
	#image_type{
		width: 100%;
		max-width: 50px;
		height: 100%;
		margin-top: 5px;
	}

</style>