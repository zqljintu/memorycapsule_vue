<template>
    <div>
        <mt-header class="detail_mc" id="detail_mc" fixed title="详情">
			<mt-button  id="add_back" icon = "back" slot = "left" @click="back">返回</mt-button>
    	</mt-header>
        <div class="div_top">
            <h3 v-if = "capsuleItem.fields" class="hd_year">{{showYear(capsuleItem.fields.capsule_create_time)}}</h3>
            <div>
                <h2 v-if = "capsuleItem.fields" class="hd_mounth">{{showMD(capsuleItem.fields.capsule_create_time)}}</h2>
                <h2 v-if = "capsuleItem.fields" class="hd_week">{{showWeek(capsuleItem.fields.capsule_create_time)}}</h2>
            </div>
            <div class="div_type" v-if = "capsuleItem.fields">
                <img class="imgd_type" slot="icon" src="../assets/icon_diary.png"  v-if = "capsuleItem.fields.capsule_type == '日记'">
                <img class="imgd_type" slot="icon" src="../assets/icon_live.png" v-else-if = "capsuleItem.fields.capsule_type == '生活'">
                <img class="imgd_type" slot="icon" src="../assets/icon_study.png" v-else-if = "capsuleItem.fields.capsule_type == '学习'">
                <img class="imgd_type" slot="icon" src="../assets/icon_travel.png" v-else-if = "capsuleItem.fields.capsule_type == '旅行'">
                <img class="imgd_type" slot="icon" src="../assets/icon_work.png" v-else-if = "capsuleItem.fields.capsule_type ==='工作'">
                <img class="imgd_type" slot="icon" src="../assets/icon_diary.png" v-else>
            </div>
        </div>
        <h3 class="hd_content" v-if = "capsuleItem.fields" >{{capsuleItem.fields.capsule_content}}</h3>
        <div class="div_mbage" v-if = "capsuleItem.fields" >
            <mt-badge size="large" v-if="capsuleItem.fields.capsule_type !='' "  >{{capsuleItem.fields.capsule_type}}</mt-badge>
            <mt-badge size="large" v-if="capsuleItem.fields.capsule_location !='' " >{{capsuleItem.fields.capsule_location}}</mt-badge>
            <mt-badge size="large" v-if="capsuleItem.fields.capsule_person !='' " >{{capsuleItem.fields.capsule_person}}</mt-badge>
            <mt-badge size="large" v-if="capsuleItem.fields.capsule_time !='' " >{{capsuleItem.fields.capsule_time}}</mt-badge>
        </div>
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
				this.$router.back();
            },
            showYear:function(str){
                return this.utils.getYear(str) + '/';
            },
            showWeek:function(str){
                return this.utils.getWeekDay(str);
            },
            showMD:function(str){
                return this.utils.getMounth(str) + '/' + this.utils.getDay(str) 
            }
        },
        mounted:function(){
            this.capsuleItem = this.$store.getters.getCapsuleitem
        }

    }
</script>
<style lang="scss" type="text/css">
	.detail_mc{
        color:#ffffff;
        //background: #1DB0B8;
        position: fixed;
        font-size: 18px;
        }
    .div_top{
        //background: rebeccapurple;
        display: flex;
        margin-top: -15px;
    }
    .div_type{
        right: 0;
        position: fixed;
        margin-right: 15px;
    }
    .hd_year{
        margin: 0;
        //background: red;
        font-size: 40px;
        margin-left: 15px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: lighter;
    }
    .hd_mounth{
        margin: 0;
       // background: green;
        text-align: left;
        padding-left: 5px;
        margin-top: 2px;
        font-size: 18px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: lighter;
    }
    .hd_week{
        margin: 0;
       // background: green;
        text-align: left;
        padding-left: 2px;
        font-size: 18px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: lighter;
    }
    .hd_content{
        margin: 0;
        margin-top: 10px;
        min-height: 250px;
        font-size: 16px;
        text-align: left;
        overflow-wrap: break-word;
        padding: 10px;
        text-indent: 10px;
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		color: #1a1a1afb;
        background: rgba(94, 213, 209, 0.39);
        border-radius: 0.4em;
        box-shadow:  0px 2px 0px 0px #e5e5e5;
    }
    .imgd_type{
        width: 30px;
        height: 30px;
        margin-top: 5px;
    }
    .div_mbage{
        //background: rebeccapurple;
        margin-top: 20px;
        padding: 10px;
        text-align: left;
    }

</style>