<template>
	<div>
		<div v-for = "item in capsules" :key="item.pk">
			<ItemCapsule :item = "item" @updateCapsules= "updateCapsules"></ItemCapsule>
		</div>
		<div id="div_space">
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import ItemCapsule from './Item_Capsule.vue'
	export default{
		data(){
			return{
				username :'',
				capsules:[
					  /*{id:1,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},
					  {id:2,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},
					  {id:3,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},
					  {id:4,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},
					  {id:5,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},
					  {id:6,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},
					  {id:7,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},
					  {id:8,
					  type:"旅行",
					  content:"今天天气不错，非常适合出去游玩",
					  time:"2019.08.18"},*/
					  ]
			}
		},
		components:{
			ItemCapsule
		},
		methods:{
			showCapsules () {
				this.$http.get(this.utils.getUrl()+ '/api/show_capsules' + '?page=1')
				.then((response) => {
				var res = JSON.parse(response.bodyText)
				console.log(res)  
				if(res['code'] == 207){
					this.capsules = []
					this.capsules = res['list']
				} else if(res['code'] == 221){
					/**
					 * 这是一个全局广播，当改变登录状态，所有登录相关的状态都会改变
					 */
					this.$store.commit('setIslogin',false);
				}else {
					this.$message.error('查询capsules失败')
					console.log(res['msg'])
				}
				})
			},
			updateCapsules: function(){
				console.log("通知更新了");
				this.showCapsules();
			},

		},
		mounted:function(){
			this.showCapsules();
		},
		computed:{
			shouldUpdate: function() {
				return this.$store.getters.getIsLogin
			}
		},
	    watch: {
			shouldUpdate() {
				if (this.$store.getters.getIsLogin){
					this.showCapsules();
				} else{
					this.capsules = [];
				}
			}
		}
	}
</script>
<style lang="scss" type="text/css">
	#div_space{
		height: 50px;
	}
</style>