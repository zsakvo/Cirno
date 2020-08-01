<template>
  <div class="home">
    <div class="header">
      <div class="header-title">
        <div class="title-text">Cirno</div>
      </div>
      <div class="right-container">
        <div class="menu-container">
          <div class="menu" @click="gotoShelf">书架</div>
          <div class="menu" @click="gotoSettings">设置</div>
          <div class="menu menu-selected" @click="gotoAbout">关于</div>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="cirno" :style="{ background: `bottom / contain no-repeat url(${cirno})` }"></div>
      <div class="desc-box">
        <div class="title">
          Cirno
          <div class="title-katakana">
            チルノ
          </div>
        </div>
        <div class="sub-title">
          一个网页版刺猬猫第三方阅读器
        </div>
        <div class="buttons">
          <div class="git-btn">
            <i class="ri-github-fill icon"></i>
            <div class="text-1">GitHub</div>
            <div class="text-2">GPLv3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      cirno: require('@/assets/cirno.png')
    }
  },
  async created() {},
  watch: {},
  methods: {
    gotoShelf() {
      this.$router.push({
        name: 'Shelf'
      })
    },
    gotoSettings() {
      this.$router.push({
        name: 'Settings'
      })
    },
    gotoAbout() {
      this.$router.push({
        name: 'About'
      })
    }
  }
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
    .cirno {
      width: 30vw;
      height: calc(~'(100vh - 64px) * 0.7');
      position: absolute;
      bottom: 0;
      right: 24px;
    }
    .desc-box {
      margin-left: 14vw;
      margin-top: 24vh;
      .title {
        font-size: 4rem;
        font-weight: normal;
        letter-spacing: 0.1rem;
        margin: 0;
        user-select: none;
        line-height: 1.2;
        color: inherit;
        font-family: 'Rubik', Helvetica, Arial, sans-serif;
        display: flex;
        align-items: baseline;

        .title-katakana {
          letter-spacing: 0.1rem;
          line-height: 1.4;
          margin-left: 24px;
          font-size: 18px;
          color: #6f6f6f;
        }
      }
      .sub-title {
        font-size: 1.6rem;
        margin: 1rem 0 0 0;
        user-select: none;
        line-height: 1.4;
        margin-top: 36px;
        padding-left: 4px;
      }
      .buttons {
        margin-top: 72px;
        .git-btn {
          cursor: pointer;
          font-size: 18px;
          position: relative;
          height: 48px;
          background: #2f71da;
          border-radius: 32px;
          color: #fff;
          user-select: none;
          display: flex;
          width: fit-content;
          align-items: center;
          .icon {
            position: absolute;
            left: 24px;
            font-size: 20px;
            line-height: 48px;
          }
          .text-1 {
            font-weight: 500;
            padding-left: 54px;
            font-size: 1rem;
          }
          .text-2 {
            padding-right: 24px;
            color: #ececec;
            margin-left: 0.5rem;
            font-size: 0.5em;
            font-weight: normal;
          }
        }
      }
    }
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
