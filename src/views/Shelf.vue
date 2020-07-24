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
      <div class="right-container">
        <div class="menu-container">
          <a-menu v-model="currentMenu" mode="horizontal">
            <a-menu-item key="shelf">
              <div class="item-content">书架</div>
            </a-menu-item>
            <a-menu-item key="rss">
              <div class="item-content">RSS</div>
            </a-menu-item>
            <a-menu-item key="about">
              <div class="item-content">关于</div>
            </a-menu-item>
          </a-menu>
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
      searchStr: '',
      currentMenu: ['shelf']
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
    .right-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 40px;
      .menu-container {
        transform: rotateX(180deg);
        &::v-deep .ant-menu {
          border-bottom: none;
          .item-content {
            transform: rotateX(180deg);
          }
        }
      }
    }
  }
}
</style>
