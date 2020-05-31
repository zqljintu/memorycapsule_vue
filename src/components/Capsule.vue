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
    import { Loadmore } from 'mint-ui';
	import ItemCapsule from './Item_Capsule.vue'
	export default{
		data(){
			return{
				username :'',
				currentPage: 0,
				allPages: 1,
				isloadtop:true,
				canload:true,
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
				this.currentPage = 0;
				this.allPages = 1;
				this.canload = true;
				this.isloadtop = true;
				this.loadCapsuleList();
			},
			/**
			 * 更新item
			 */
			updateCapsules: function(){
				console.log("通知更新了");
				this.showCapsules();
			},
			/**
			 * 向服务器请求数据
			 */
			loadCapsuleList:function(){
				if (this.currentPage == this.allPages){
					this.canload = false;
					return
				}
				if (this.isloadtop){
					this.currentPage = 1;
				}else{
					this.currentPage = this.currentPage+1;
				}
				if (!this.canload){
					this.canload = false;
					return;
				}
				this.$http.get(this.utils.getUrl()+ '/api/show_capsules' + '?page=' + this.currentPage)
							.then((response) => {
							var res = JSON.parse(response.bodyText)
							console.log(res)
							this.allPages = res["pagecount"]
							this.currentPage = res["page"]
							if(res['code'] == 207){
								if (this.isloadtop){
									this.capsules = []
									this.capsules = res['list']
								}else{
									var aar = res['list'];
									let len = aar.length;
									for(var i=0;i<len;i++){
										this.capsules.push(aar[i]);
									}
								}
								this.canload = true;
								console.log(this.capsules)
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
			/**
			 * 向下加载更多
			 */
			onScroll() {
                    //可滚动容器的高度
                    let innerHeight = document.querySelector('#app').clientHeight;
                    //屏幕尺寸高度
                    let outerHeight = document.documentElement.clientHeight;
                    //可滚动容器超出当前窗口显示范围的高度
                    let scrollTop = document.documentElement.scrollTop;
                    //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
                    if (innerHeight < (outerHeight + scrollTop)) {
                        //加载更多操作
						this.isloadtop = false;
						this.loadCapsuleList();
                    }
                }

		},
		created:function(){
 			window.addEventListener('scroll', this.onScroll);
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
					console.log("zzzzzzzzz该请求数据了")
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