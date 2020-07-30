<template>
  <div class="login">
    <div class="side-pic">
      <div class="pic" :style="{ background: 'url(' + sidePic + ')' }"></div>
    </div>
    <div class="side-box">
      <div class="login-box">
        <div class="title">刺猬猫账户登录</div>
        <div class="input-box">
          <div class="user-name input">
            <a-input ref="userNameInput" size="large" v-model="userName" placeholder="手机号/邮箱">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </div>
          <div class="password input">
            <a-input-password placeholder="密码" size="large" v-model="password" />
          </div>
        </div>
        <div class="button">
          <div class="login-button">
            <a-button type="primary" :loading="confirmLoading" size="large" block shape="round" @click="login">
              登录
            </a-button>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidePic: require('@/assets/side.png'),
      confirmLoading: false,
      userName: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.confirmLoading = true
      let login_res = this.$post({
        url: '/login',
        paras: {
          name: this.userName,
          passwd: this.password
        }
      }).then(
        res => {
          this.confirmLoading = false
          this.$router.push({
            name: 'Shelf'
          })
        },
        err => {
          this.confirmLoading = false
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  .side-pic {
    width: 490px;
    .pic {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .side-box {
    flex: 1;
    background: #fafafa;
    .login-box {
      margin-top: 30%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 96px;
      padding: 0 12vw;
      .title {
        font-weight: 600;
        font-size: 24px;
        margin: 24px 0;
      }
      .input-box {
        margin-top: -12px;
        margin-bottom: 12px;
        .input {
          margin: 24px 0;
        }
      }
      .button {
        width: 40%;
        margin-top: 24px;
      }
    }
  }
}
</style>
