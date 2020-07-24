<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="header">
      <div class="header-title">
        <div class="title-text">Cirno</div>
      </div>
      <div class="search-container">
        <div class="components-input-demo-presuffix">
          <a-input id="searchBox" v-model="searchStr" placeholder="搜索书籍或作者">
            <a-icon slot="prefix" type="search" class="search-icon" />
          </a-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      searchStr: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .header {
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    position: relative;
    z-index: 10;
    max-width: 100%;
    height: 64px;
    user-select: none;
    display: flex;
    align-items: center;
    .header-title {
      height: 100%;
      width: fit-content;
      display: flex;
      align-items: center;
      margin: 0 40px;
      width: 180px;
      .title-text {
        color: #000000;
        font-weight: 500;
        display: inline-block;
        font-size: 20px;
        line-height: 24px;
        vertical-align: middle;
      }
    }
    .search-container {
      border-left: 1px solid #ebedf0;
      border-right: 1px solid #ebedf0;
      .search-icon {
        color: #ced4d9;
        margin: 0 8px;
      }
      &::v-deep #searchBox {
        border: none;
        padding: 0 48px;
        width: 330px;
        &:focus {
          box-shadow: none;
        }
      }
    }
  }
}
</style>
