<template></template>
  
<script>
export default {
  name: "IndexPage",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  async created() {
    await this.$nuxt.$router.push({ name: "space" });
  }
};


</script>
  
<style lang="scss" scoped></style>