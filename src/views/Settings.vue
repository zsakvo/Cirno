<template>
  <div class="home">
    <div class="header">
      <div class="header-title">
        <div class="title-text">Cirno</div>
      </div>
      <div class="right-container">
        <div class="menu-container">
          <div class="menu">书架</div>
          <div class="menu menu-selected">设置</div>
          <div class="menu">关于</div>
        </div>
      </div>
    </div>
    <div class="page"></div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  async created() {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
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
        color: #464646;
        font-weight: 500;
        display: inline-block;
        font-size: 20px;
        line-height: 24px;
        vertical-align: middle;
      }
    }
    .right-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 40px;
      .menu-container {
        display: flex;
        &::v-deep .ant-menu {
          border-bottom: none;
          .ant-menu-item {
            border-bottom: 0;
          }
        }
        .menu {
          font-size: 15px;
          margin: 0 24px;
          cursor: pointer;
        }
        .menu-selected {
          color: #1b88ee;
        }
      }
    }
  }
  .page {
    width: 100%;
    max-height: 100vh;
    height: calc(~'100vh - 64px');
    display: flex;
  }
}

&::v-deep .ant-popover {
  .ant-popover-content {
    .ant-popover-title {
      padding: 16px;
      text-align: center;
    }
  }
}
</style>
