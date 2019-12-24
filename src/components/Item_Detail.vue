<template>
    <div>
        <mt-header class="detail_mc" id="detail_mc" fixed title="详情">
			<mt-button  id="add_back" icon = "back" slot = "left" @click="back">返回</mt-button>
    	</mt-header>
        <h1 v-if = "capsuleItem.fields">{{capsuleItem.fields.capsule_type}}</h1>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return{
                capsuleItem: ''
            }
        },
        components:{
            
        },
        methods:{
            back:function (argument) {
				// body...
				this.$router.back();
			}
        },
        mounted:function(){
            this.capsuleItem = this.$store.getters.getCapsuleitem
        }

    }
</script>
<style lang="scss" type="text/css">
	.detail_mc{color:#ffffff;
			background: #1DB0B8;
			position: fixed;
			font-size: 18px;}
</style>