<template>
  <div class="tsukkomi">
    <a-modal
      v-model="visible"
      cancelText=""
      okText="发表"
      @cancel="cancel"
      title="发表间贴"
      width="42vw"
      :maskClosable="false"
      :allowClear="true"
    >
      <template slot="footer">
        <a-button key="submit" type="primary" :loading="confirmLoading" @click="post" :disabled="postDisabled">
          发表
        </a-button>
      </template>
      <div class="text-area" ref="text">{{ text }}</div>
      <div class="input-area">
        <a-textarea class="input" placeholder="来写点什么吧" :rows="3" v-model="tsukkomiContent" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
export default {
  name: 'Tsukkomi',
  data() {
    return {
      visible: false,
      text: '',
      textScroll: null,
      tsukkomiContent: '',
      confirmLoading: false,
      bid: 0,
      cid: 0,
      pid: 0,
      postDisabled: true
    }
  },
  watch: {
    tsukkomiContent(newValue) {
      newValue = newValue.trim()
      if (newValue.length > 0) {
        this.postDisabled = false
      } else {
        this.postDisabled = true
      }
    }
  },
  methods: {
    show(text, bid, cid, pid) {
      this.visible = true
      this.bid = bid
      this.cid = cid
      this.pid = pid
      this.text = text.trim()
      this.$nextTick(() => {
        this.textScroll = new PerfectScrollbar(this.$refs.text, {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        })
      })
    },
    cancel() {
      this.tsukkomiContent = ''
      this.$refs.text.scrollTo(0, 0)
      this.textScroll.destroy()
    },
    post() {
      console.log(this.tsukkomiContent)
      this.confirmLoading = true
      this.$post({
        url: '/add_tsukkomi',
        paras: {
          book_id: this.bid,
          chapter_id: this.cid,
          paragraph_index: this.pid,
          tsukkomi_content: this.tsukkomiContent
        }
      }).then(res => {
        let tsukkomi_info = res.data.tsukkomi_info
        let pid = tsukkomi_info.paragraph_index
        this.confirmLoading = false
        this.cancel()
        this.$emit('refreshTsukkomi')
        this.$emit('refreshPara', pid)
        this.visible = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .ant-modal {
  .ant-modal-content {
    .ant-modal-body {
      padding: 24px 0;
      .text-area {
        max-height: 120px;
        overflow: hidden;
        position: relative;
        padding: 0 24px;
      }
      .input-area {
        padding-top: 24px;
        padding: 24px 24px 0 24px;
        .input {
          resize: none;
        }
      }
    }
    .ant-modal-footer {
      border-top: none;
      padding: 10px 24px 18px 24px;
      .ant-btn {
        display: none;
      }
      .ant-btn-primary {
        display: unset;
      }
    }
  }
}
</style>
