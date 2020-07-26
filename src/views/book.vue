<template>
  <div class="book-page" ref="book">
    <div class="content-container" ref="content">
      <div v-show="loading === 1" class="book-content">
        <div class="top-bar">
          <i class="ri-bookmark-fill icon-button"></i>
          <div class="topbar-title">{{ chapterTitle }}</div>
        </div>
        <paragraph
          class="text-content"
          ref="paragraph"
          @showTsu="showTsu"
          :paragraphs="chapterContentData"
          :isDark="false"
          :size="16"
        ></paragraph>
      </div>
      <div v-show="loading === 0" class="skeleton-container">
        <a-skeleton active />
      </div>
    </div>
    <div v-show="loading === 1" class="control-bar-container" :style="{ 'margin-left': controlBarLeftMargin + 'px' }">
      <div class="control-button-container">
        <i class="ri-menu-line control-button"></i>
      </div>
      <div class="control-button-container">
        <i class="ri-font-size-2 control-button"></i>
      </div>
      <div class="control-button-container">
        <i class="ri-pantone-line control-button"></i>
      </div>
      <div class="control-button-container">
        <i class="ri-moon-line control-button"></i>
      </div>
      <div class="control-button-container" @click="toTop">
        <i class="ri-arrow-up-s-line control-button"></i>
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import Paragraph from '../components/paragraph.vue'
export default {
  components: {
    Paragraph
  },
  data() {
    return {
      bid: null,
      cid: null,
      contentWidth: 0,
      controlBarLeftMargin: 0,
      loading: 0,
      chapterTitle: '',
      book_info: {},
      book_chapters: [],
      book_chapterids: [],
      chapter_info: {},
      chapterContentData: [],
      containerScroll: null
    }
  },
  async created() {
    this.bid = this.$route.query.bid
    this.cid = this.$route.query.cid
    let book_info = await this.$get({
      url: '/book_info',
      urlParas: {
        book_id: this.bid
      }
    })
    this.book_info = book_info.data.book_info
    let book_chapters = await this.$get({
      url: '/book_chapters',
      urlParas: {
        book_id: this.bid
      }
    })
    this.book_chapters = book_chapters.data
    this.book_chapterids = this.book_chapters.map(chapter => {
      return chapter['chapter_id']
    })
    this.getContent(this.cid)
  },
  mounted() {
    window.addEventListener('resize', this.windowSizeHandler)
  },
  watch: {
    contentWidth(newValue) {
      console.log(newValue)
    }
  },
  methods: {
    windowSizeHandler() {
      let contentWidth = this.$refs.content.clientWidth
      this.controlBarLeftMargin = -(contentWidth / 2 + 96)
    },
    async getContent(cid) {
      typeof cid === 'string' ? null : (cid = `${cid}`)
      this.cid = cid
      this.loading = 0
      let chapter_info = await this.$get({
        url: '/chapter_content',
        urlParas: {
          chapter_id: cid
        }
      })
      this.chapter_info = chapter_info.data.chapter_info
      this.chapterTitle = this.chapter_info.chapter_title
      let txt_content = this.chapter_info.txt_content
      let contentArray = [this.chapterTitle, ...txt_content.split('\n')]
      contentArray = contentArray.map(ca => {
        let obj = {}
        obj.text = ca
        obj.tsukkomi_num = 0
        return obj
      })
      let tsukkomi_nums = await this.getTsukkomiNum(cid)
      for (let tsukkomi_num of tsukkomi_nums) {
        contentArray[tsukkomi_num['paragraph_index']].tsukkomi_num = tsukkomi_num.tsukkomi_num
      }
      this.chapterContentData = contentArray
      this.loading = 1
      this.$nextTick(() => {
        this.windowSizeHandler()
        this.containerScroll = new PerfectScrollbar(this.$refs.book, {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        })
      })
    },
    async getTsukkomiNum(cid) {
      typeof cid === 'string' ? null : (cid = `${cid}`)
      let tsukkomi_num_info = await this.$get({
        url: '/tsukkomi_num',
        urlParas: {
          chapter_id: cid
        }
      })
      return tsukkomi_num_info.data.tsukkomi_num_info
    },
    toTop() {
      this.$refs.book.scrollTo(0, 0)
    },
    showTsu() {}
  }
}
</script>

<style lang="less" scoped>
@contentWidth: calc(~'100% - 288px');
.book-page {
  width: 100%;
  height: 100%;
  background: #f6f7f9;
  overflow: hidden;
  position: relative;
  .content-container {
    background: #fff;
    max-width: 760px;
    width: @contentWidth;
    min-height: 100%;
    margin: 0 auto;
    .skeleton-container {
      padding: 0 64px;
      height: 72vh;
      display: flex;
      align-items: center;
    }
    .book-content {
      .top-bar {
        position: fixed;
        top: 0;
        z-index: 10;
        height: 73px;
        width: @contentWidth;
        max-width: 760px;
        background: #fff;
        border-bottom: 1px solid rgba(33, 40, 50, 0.1);
        display: flex;
        align-items: center;
        .icon-button {
          font-size: 24px;
          margin-left: 32px;
        }
        .topbar-title {
          color: #0d141e;
          opacity: 0.7;
          font-size: 16px;
          font-weight: 500;
          line-height: 16px;
          margin-left: 16px;
        }
      }
      .text-content {
        padding-top: 128px;
      }
    }
  }
  .control-bar-container {
    width: 48px;
    height: 336px;
    position: fixed;
    left: 50%;
    bottom: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .control-button-container {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #fff;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(0, 25, 104, 0.1);
      .control-button {
        font-size: 24px;
        line-height: 48px;
        opacity: 0.7;
      }
      &:hover {
        .control-button {
          opacity: 1;
        }
      }
    }
  }
}
</style>
