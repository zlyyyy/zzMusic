<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {},
  components: {},
  computed: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
@import "./style/common";
#app {
  position: relative;
  height: 100%;
  max-width: 1100px;
  overflow: hidden;
}
#music {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
