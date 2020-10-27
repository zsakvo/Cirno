<template>
  <div id="app">
    <keep-alive include="Shelf">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {},
  created() {
    if (!localStorage.getItem('baseUrl')) {
      this.$router.push({
        name: 'Settings'
      })
    }
  },
  methods: {}
}
</script>

<style>
#app {
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
