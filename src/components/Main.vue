<template>
	<div id="tab_bar">
		<mt-header id="header_mc" class="main_head" fixed title="记忆胶囊">
			<mt-button v-if="selected == 'capsule'" slot = "right" @click="addCapsule">添加</mt-button>
    	</mt-header>
	    <mt-tab-container  flixed v-model="selected">
	    	<mt-tab-container-item id="capsule">
	        <capsule></capsule>
	      	</mt-tab-container-item>
	      	<mt-tab-container-item id="more">
	        <more></more>
	      	</mt-tab-container-item>
	    </mt-tab-container>
    	<mt-tabbar class="main_mc" id="tabbar_mc"  v-model="selected">
    		<mt-tab-item id="capsule">
			<img slot="icon" src="../assets/capsule_selected.png" v-if="this.selected == 'capsule'"/>
			<img slot="icon" src="../assets/capsule_normal.png" v-else>
			胶囊
    		</mt-tab-item>
    		<mt-tab-item id="more">
			<img class="img_more" slot="icon" src="../assets/more_selected.png" v-if="this.selected == 'more'">
			<img class="img_more" slot="icon" src="../assets/more_normal.png" v-else>
			更多
    		</mt-tab-item>
    	</mt-tabbar>
	</div>
</template>
<script type="text/javascript">
	import capsule from './Capsule'
	import more from './More'
	export default{
		data(){
			return{
				selected:'capsule',
			}
		},
		components:{
			capsule,
			more,
		},
		methods:{
			addCapsule:function(){
				this.$router.push({
              		name:'Add' });
			}
		},
		mounted:function(){
			  this.selected='capsule';
    	}
	}
	
</script>
<style lang="scss" scoped="" type="text/css" >
	.main_head{
		    position: fixed;
		 	font-size: 18px;
	}
	.main_mc{color:#ffffff;
			position: fixed;
			font-size: 18px;}
	#tab_bar{overflow: scroll;}
	
</style>