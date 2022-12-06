<template>
</template>

<script>
export default {
    //路由重定向
    activated() {
        this.$router.push({
            path: this.$route.query.router.path,
            query: {
                content: this.$route.query.router.content
            }
        })
    }
}
</script>

<style>

</style>