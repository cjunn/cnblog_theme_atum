<template>
  <div>
    <router-view></router-view>
    <BlogWorksAside></BlogWorksAside>
  </div>
</template>

<script>
    import BlogWorksAside from "./BlogWorksAside";

    export default {
        name: "BlogWorksBody",
        components: {BlogWorksAside},
    }
</script>

<style scoped>

</style>
