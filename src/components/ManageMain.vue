<template>
    <el-container>
        <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                    <el-container>
                        <el-main>Main</el-main>
                        <el-footer>Footer</el-footer>
                    </el-container>
            </el-container>
    </el-container>
</template>

<script>
    export default {

    }
</script>

<style>
    .h_main{
        margin-top: 0;
        background-color: aqua;
    }
</style>