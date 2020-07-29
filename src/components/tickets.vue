<template>
  <div class="tickets">
    <a-modal v-model="visible" @cancel="cancel" title="打赏投票" width="30vw" :allowClear="true">
      <template slot="footer">
        <a-button key="submit" type="primary" :loading="confirmLoading" @click="post">
          确定
        </a-button>
      </template>
      <div class="container">
        <div class="tickets">
          <div class="ticket">
            <div class="title">推荐票</div>
            <a-input-number v-model="recommandNum" :min="0" :max="prop_info.rest_recommend" size="small" />
          </div>
          <div class="ticket">
            <div class="title">投月票</div>
            <a-input-number v-model="ypNum" :min="0" :max="prop_info.rest_yp" size="small" />
          </div>
          <div class="ticket">
            <div class="title">投刀片</div>
            <a-input-number v-model="bladeNum" :min="0" :max="prop_info.rest_month_blade" size="small" />
          </div>
        </div>
        <div class="info">
          <div class="info-line">剩余推荐票 {{ prop_info.rest_recommend }}</div>
          <div class="info-line">剩余月票 {{ prop_info.rest_yp }}</div>
          <div class="info-line">剩余刀片 {{ prop_info.rest_month_blade }}</div>
          <div class="info-line">剩余欢乐币 {{ prop_info.rest_hlb }}</div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tickets',
  data() {
    return {
      visible: false,
      recommandNum: 0,
      ypNum: 0,
      bladeNum: 0,
      confirmLoading: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['prop_info'])
  },
  methods: {
    show() {
      this.visible = true
      this.restHlb = restHlb
      this.maxRecommand = maxRecommand
    },
    cancel() {},
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
      padding-bottom: 0;
      .container {
        display: flex;
        .tickets {
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          .ticket {
            margin-bottom: 24px;
            display: flex;
            .title {
              font-size: 14px;
              font-weight: 500;
            }
            .ant-input-number {
              margin-left: 24px;
            }
          }
        }
        .info {
          padding-bottom: 30px;
          margin-left: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
    }
    .ant-modal-footer {
      border-top: none;
      padding: 0 24px 18px 24px;
    }
  }
}
</style>
