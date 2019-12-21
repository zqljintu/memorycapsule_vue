<template>
	<div>
		<div v-for = "item in capsules" :key="item.pk">
			<ItemCapsule :item = "item"></ItemCapsule>
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
				islogin:false,
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
			   /*this.$ajax.get('http://127.0.0.1:8000/api/show_capsules').then((response)=>{
                    console.log(response.data)
                 }).catch((response)=>{
                    console.log(response)
                })*/
			   this.$http.get(this.utils.getUrl()+ '/api/show_capsules?username=' + this.username)
			    .then((response) => {
			      var res = JSON.parse(response.bodyText)
			      console.log(res)  
			      if(res['error_name'] == 207){
			        this.capsules = res['list']
			      } else {
			        this.$message.error('查询capsules失败')
			        console.log(res['msg'])
			      }
			    })
			},
			updateCapsules: function(update){
				this.showCapsules();
			},

		},
		mounted:function(){
			  this.islogin = this.$cookies.isKey('capsule_username');
			  if(this.islogin){
				  this.username = this.$cookies.get('capsule_username');
				  this.$store
				  this.showCapsules();
				  console.log('zzzzzisLogin',this.username);
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
					this.username = this.$store.getters.getUsername
					console.log('zzzzzzUser',this.username);
					this.showCapsules();
				} else{
					this.capsules = {};
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