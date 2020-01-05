<template>
	<div id="tab_bar">
		<mt-header id="header_mc" class="main_head" fixed title="记忆胶囊">
    	</mt-header>
	    <mt-tab-container class="main_con"  flixed v-model="selected">
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
		<div class="div_add">
			<img class="img_add" slot="icon"  @click="addCapsule" src="../assets/icon_add.png">
		</div>
	</div>
</template>
<script type="text/javascript">
	import capsule from './Capsule'
	import more from './More'
	export default{
		data(){
			return{
				selected:'capsule',
				isLogin: false
			}
		},
		components:{
			capsule,
			more,
		},
		methods:{
			addCapsule:function(){
				if(this.$cookies.isKey('capsule_username')){
					this.$router.push({name:'Add' });
				}else{
					this.selected='more';
				}
			}
		},
		mounted:function(){
			  this.selected='capsule';
		},
		beforeMount:function() {
	          this.isLogin = this.$cookies.isKey('capsule_username');
			  if (this.isLogin){
				  	this.$store.commit('setIslogin',true);
			  }
		},
		beforeCreate(){
 			document.querySelector('body').setAttribute('style', 'background-color:#F2F2F2')

		},
		beforeDestroy(){
			document.querySelector('body').removeAttribute('style')
		}
	}
	
</script>
<style lang="scss" scoped="" type="text/css" >
	.main_head{
		    position: fixed;
		 	font-size: 18px;
			margin: 0px;
	}
	.main_con{
		margin-top: 0px;
		padding: 0px;
	}
	.main_mc{
			position: fixed;
			color: rgba(126, 228, 224, 0.8);
			font-size: 18px;
	}
	#header_mc{
		margin: 0 auto;
		font-size: 18px;
	}
	#tab_bar{
		overflow: scroll;
	}
	.div_add{
		height: 35px;
		width: 35px;
		position: fixed;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: rgba(126, 228, 224, 0.8);
		display: flex;
		margin: 0 auto;
		border-radius: 8em;
		margin-bottom: 12px;
	}
	.img_add{
		width: 20px;
		height: 20px;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	
</style>