<template>
    <managelogin v-if="this.state == 0"></managelogin>
    <managelogup v-else-if="this.state == 1"></managelogup>
    <managemain  v-else-if="this.state == 2" ></managemain>
    <managelogin v-else="this.state == 0"></managelogin>
</template>

<script>
    import managemain from './ManageMain';
    import managelogin from './ManageLogin';
    import managelogup from './ManageLogup';
    
    export default {
        data(){
            return{
                state:1,
            }
        },
        components:{
            managemain,
            managelogin,
            managelogup
        },
        beforeCreate(){
            document.querySelector('body').setAttribute('style', 'background-color:aqua')
        },
        beforeDestroy(){
			document.querySelector('body').removeAttribute('style')
		}
    }
</script>

<style>
    .h_main{
        margin-top: 0;
        background-color: aqua;
    }
</style>