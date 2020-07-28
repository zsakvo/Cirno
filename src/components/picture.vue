<template>
  <div class="pic-dialog">
    <a-modal v-model="visible" title="" :footer="null" :closable="false">
      <div class="img-body">
        <img class="pic-img" :src="picImg" alt="" />
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Picture',
  data() {
    return {
      visible: false,
      picImg: ''
    }
  },
  methods: {
    showPic(url, desc) {
      this.picImg = url
      this.$nextTick(() => {
        this.visible = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .ant-modal {
  top: 0;
  padding-bottom: 0;
  .ant-modal-content {
    height: 100vh;
    background: transparent;
    box-shadow: none;
    width: fit-content;
    .ant-modal-body {
      height: 100%;
      padding: 0;
      .header {
        height: 36px;
      }
      .img-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        height: calc(~'100vh');
        display: flex;
        justify-content: center;
        align-items: center;
        .pic-img {
          width: auto;
          max-height: calc(~'100vh - 144px');
        }
        .footer {
          height: 72px;
          .img-desc {
            user-select: none;
            font-size: 15px;
            color: #ffffff;
            font-weight: 500;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>
