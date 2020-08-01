<template>
  <div id="app">
    <router-view @getInfo="getInfo" />
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
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$get({
        url: '/my_info'
      }).then(
        async res => {
          let my_info = res
          this.$store.commit('setPropInfo', my_info.data.prop_info)
          this.$store.commit('setReaderInfo', my_info.data.reader_info)
        },
        err => {
          switch (err.code) {
            case 200100:
              //需要登入
              this.$router.push({
                name: 'Login'
              })
              break
          }
        }
      )
    }
  }
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
