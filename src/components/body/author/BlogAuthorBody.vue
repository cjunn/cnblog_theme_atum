<template>
  <div>
    <BlogAuthorIng></BlogAuthorIng>
    <BlogAuthorAside></BlogAuthorAside>
  </div>
</template>

<script>
    import BlogAuthorIng from "./BlogAuthorIng";
    import BlogAuthorAside from "./BlogAuthorAside";

    export default {
        name: "BlogAuthorBody",
        components: {BlogAuthorAside, BlogAuthorIng}
    }
</script>

<style scoped>

</style>
