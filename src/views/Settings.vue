<template>
  <div class="settings-wrapper">
    <div class="top-bar">
      <div class="title" @click="goBack">
        <i class="ri-arrow-left-line icon"></i>
        <div class="text">设置</div>
        <div class="decoration"></div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="api-wrapper" @click="() => (apiModal = true)">
        {{ apiUrl ? `当前 api-host：${apiUrl}` : '请设置您的 api-host' }}
      </div>
      <div class="user-wrapper" v-if="isLogin"></div>
      <div class="no-user" v-else @click="gotoLogin">
        <div class="user-text">{{ account ? `已登入账户：${account}` : '请登入您的刺猬猫账户' }}</div>
      </div>
    </div>
    <a-modal
      title="设置 api-host"
      :closable="false"
      v-model="apiModal"
      centered
      @ok="saveApi"
      class="api-modal"
      okText="确定"
      cancelText="取消"
      :confirm-loading="confirmLoading"
    >
      <div class="check-failed" v-if="checkFailed">api-host 验证失败，请重新尝试</div>
      <div class="api-input">
        <a-input placeholder="http://xxx.xxx/api" v-model="apiUrl" />
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
      apiModal: false,
      apiUrl: null,
      confirmLoading: false,
      checkFailed: false,
      account: null
    }
  },
  async created() {
    this.apiUrl = localStorage.getItem('baseUrl') ? localStorage.getItem('baseUrl') : 'https://app.hbooker.com'
    this.account = localStorage.getItem('account')
  },
  computed: {},
  methods: {
    goBack() {
      this.$router.back()
    },
    gotoLogin() {
      this.$router.push({ name: 'Login' })
    },
    saveApi() {
      this.confirmLoading = true
      localStorage.setItem('baseUrl', this.apiUrl)
      this.$get({
        url: '/meta/get_meta_data'
      }).then(
        res => {
          this.checkFailed = false
          this.confirmLoading = false
          this.apiModal = false
          this.$message.success('api-host 设置成功')
        },
        err => {
          localStorage.removeItem('baseUrl')
          this.checkFailed = true
          this.confirmLoading = false
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.settings-wrapper {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  .top-bar {
    z-index: 200;
    padding: 36px 0;
    position: fixed;
    width: 80%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      cursor: pointer;
      width: fit-content;
      height: fit-content;
      font-size: 24px;
      font-weight: 600;
      user-select: none;
      display: flex;
      align-items: center;
      .icon {
        line-height: 24px;
      }
      .text {
        margin-left: 16px;
      }
    }
  }

  .content-wrapper {
    padding-top: 120px;
    .api-wrapper {
      cursor: pointer;
      background: #ffccc7;
      padding: 16px;
      border-radius: 30px;
      padding-left: 32px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      display: flex;
      align-items: center;
    }
    .no-user {
      cursor: pointer;
      background: #ffd8bf;
      padding: 16px;
      padding-left: 32px;
      border-radius: 30px;
      display: flex;
      align-items: center;
      margin-top: 24px;
      .default-avatar {
        width: 64px;
        border-radius: 50%;
      }
      .user-text {
        font-size: 16px;
        font-weight: 500;
        color: #fff;
      }
    }
  }

  .bottom-bar {
    height: 36px;
    width: 80%;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 20;
  }
}

::v-deep .ant-modal-content {
  .ant-modal-header {
    border-bottom: 0;
    user-select: none;
  }
  .ant-modal-footer {
    border-top: 0;
    user-select: none;
  }
  .check-failed {
    color: #ff7875;
    padding: 0 0 16px 2px;
  }
}
</style>
