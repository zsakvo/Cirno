<template>
  <div class="book-page" ref="book" :class="{ 'book-page-tsu': showTsukkomi }">
    <div class="content-container" ref="contentContainer">
      <div v-show="loading === 1" class="book-content" ref="bookContent">
        <div class="top-bar">
          <i class="ri-bookmark-fill icon-button"></i>
          <div class="topbar-title">{{ chapterTitle }}</div>
        </div>
        <paragraph
          class="text-content"
          ref="paragraph"
          :paragraphs="chapterContentData"
          :isDark="false"
          :size="16"
          @showTsu="showTsu"
          @showPic="showPic"
        ></paragraph>
        <div class="buy-container" v-show="!auth">
          <div class="title">
            本章是 VIP 章节，购买后才能阅读
          </div>
          <div class="subtitle">本章节需 {{ chapterAmount }} 币，共 {{ buyAmount }} 人购买</div>
          <div class="buy-chapter-button" @click="buyChapter">购买本章</div>
          <div class="auto-buy"><a-radio>遇到收费章节自动购买</a-radio></div>
        </div>
        <div class="book-footer" v-show="auth">
          <div class="next-chapter-button" @click="nextChapter">下一章</div>
        </div>
      </div>
      <div v-show="loading === 1 && showTsukkomi" class="tsukkomi-container" :style="{ right: tsukkomiRight + 'px' }">
        <div v-show="tsukkomi_list.length === 0" class="skeleton-container">
          <a-skeleton active />
        </div>
        <div v-show="tsukkomi_list.length !== 0">
          <div class="title-container">
            <div class="title-text" @click="toTsukkomiTop">共 {{ tsukkomi_num }} 条帖子</div>
            <div class="title-button" @click="closeTsu"><i class="ri-close-line"></i></div>
          </div>
          <div class="tsukkomis" ref="tsukkomi">
            <div class="tsukkomi" v-for="tsukkomi in tsukkomi_list" :key="tsukkomi.tsukkomi_id">
              <div class="tsukkomi-info">
                <div class="avatar">
                  <img
                    :src="
                      tsukkomi.reader_info.avatar_thumb_url.length !== 0
                        ? tsukkomi.reader_info.avatar_thumb_url
                        : tempAvatar
                    "
                  />
                </div>
                <div class="tsukkomi-info-text">
                  <div class="user-name">{{ tsukkomi.reader_info.reader_name }}</div>
                  <div class="time">{{ tsukkomi.ctime }}</div>
                </div>
              </div>
              <div class="tsukkomi-content">
                {{ tsukkomi.tsukkomi_content }}
              </div>
              <div class="tsukkomi-options">
                <div
                  class="option-button"
                  :class="{ 'like-selected': tsukkomi.is_like }"
                  @click="tsukkomiOperate(0, tsukkomi.tsukkomi_id)"
                >
                  <i class="ri-thumb-up-line"></i>
                  <div class="num">{{ tsukkomi.like_amount }}</div>
                </div>
                <div
                  class="option-button"
                  :class="{ 'unlike-selected': tsukkomi.is_unlike }"
                  @click="tsukkomiOperate(1, tsukkomi.tsukkomi_id)"
                >
                  <i class="ri-thumb-down-line"></i>
                  <div class="num">{{ tsukkomi.unlike_amount }}</div>
                </div>
              </div>
            </div>
            <div class="pagination-container">
              <a-pagination
                size="small"
                @change="changeTsukkomiPage"
                v-model="tsukkomiPage"
                :total="tsukkomi_num"
                :defaultPageSize="20"
                :hideOnSinglePage="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-show="loading === 0" class="skeleton-container">
        <a-skeleton active />
      </div>
    </div>
    <div
      v-show="loading === 1"
      class="control-bar-container content-bar"
      :style="{ 'margin-left': controlBarLeftMargin + 'px' }"
    >
      <div class="control-button-container" @click="showCatalog">
        <i class="ri-menu-line control-button"></i>
      </div>
      <div class="control-button-container" @click="showTsu">
        <i class="ri-font-size-2 control-button"></i>
      </div>
      <div class="control-button-container">
        <i class="ri-pantone-line control-button"></i>
      </div>
      <div class="control-button-container">
        <i class="ri-moon-line control-button"></i>
      </div>
      <div class="control-button-container" @click="toChapterTop">
        <i class="ri-arrow-up-s-line control-button"></i>
      </div>
    </div>
    <div
      class="control-bar-container tsukkomi-bar"
      :class="{ 'tsukkomi-bar-show': showTsukkomi }"
      :style="{ 'margin-right': controlBarLeftMargin + 'px' }"
    >
      <div class="control-button-container" @click="newTsukkomi">
        <i class="ri-edit-circle-line control-button"></i>
      </div>
    </div>
    <catalog
      :info="book_info"
      :currentChapter="chapterIndex"
      :marginLeft="tsukkomiRight"
      :chapters="book_chapters"
      @getContent="jumpChapter"
      ref="catalog"
    ></catalog>
    <Picture ref="picture" />
    <Tsukkomi ref="tsukkomiWriter" @refreshTsukkomi="refreshTsukkomi" @refreshPara="refreshPara" />
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import Paragraph from '../components/paragraph.vue'
import Catalog from '../components/catalog.vue'
import Picture from '../components/picture.vue'
import Tsukkomi from '../components/tsukkomi.vue'
export default {
  components: {
    Paragraph,
    Catalog,
    Picture,
    Tsukkomi
  },
  data() {
    return {
      bid: null,
      cid: null,
      contentDiv: null,
      contentWidth: 0,
      controlBarLeftMargin: 0,
      loading: 0,
      chapterTitle: '',
      book_info: {},
      book_chapters: [],
      book_chapterids: [],
      chapterIndex: 0,
      chapter_info: {},
      chapterContentData: [],
      containerScroll: null,
      tsukkomi_num: 0,
      tsukkomi_list: [],
      showTsukkomi: false,
      tsukkomiRight: 0,
      tsukkomiPage: 1,
      tsukkomiScroll: null,
      tsukkomiIndex: 0,
      tempAvatar: require('@/assets/d_avatar.jpg'),
      cataMarginLeft: 0,
      auth: true,
      chapterAmount: 0,
      buyAmount: 0
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
    if (this.cid == 0) {
      this.cid = this.book_chapterids[0]
      this.$router.replace({ query: { bid: this.bid, cid: this.cid } })
    }
    this.getContent(this.cid)
  },
  mounted() {
    this.contentDiv = this.$refs.contentContainer
    window.addEventListener('resize', this.windowSizeHandler)
  },
  watch: {
    contentWidth(newValue) {}
  },
  methods: {
    windowSizeHandler() {
      let windowWidth = window.innerWidth
      let contentWidth = this.contentDiv.clientWidth
      this.controlBarLeftMargin = -(contentWidth / 2 + 96)
      this.tsukkomiRight = (windowWidth - contentWidth) / 2
    },
    async getContent(cid) {
      typeof cid === 'string' ? null : (cid = `${cid}`)
      this.cid = cid
      this.loading = 0
      this.chapterIndex = this.book_chapterids.indexOf(cid)
      let chapter_info = await this.$get({
        url: '/chapter_ifm',
        urlParas: {
          chapter_id: cid
        }
      })
      this.chapter_info = chapter_info.data.chapter_info
      this.chapter_info.auth_access === '1' ? (this.auth = true) : (this.auth = false)
      this.chapterAmount = this.chapter_info.unit_hlb
      this.buyAmount = this.chapter_info.buy_amount
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
        let pIndex = tsukkomi_num['paragraph_index']
        if (pIndex < contentArray.length) {
          contentArray[tsukkomi_num['paragraph_index']].tsukkomi_num = tsukkomi_num.tsukkomi_num
        }
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
    async getTsukkomiList(paragraph_index) {
      let tsukkomi_list = await this.$get({
        url: '/tsukkomi_list',
        urlParas: {
          chapter_id: this.cid,
          paragraph_index: paragraph_index,
          page: this.tsukkomiPage - 1
        }
      })
      this.tsukkomi_list = tsukkomi_list.data.tsukkomi_list
      this.$nextTick(() => {
        this.tsukkomiScroll = new PerfectScrollbar(this.$refs.tsukkomi, {
          wheelSpeed: 1,
          wheelPropagation: false,
          minScrollbarLength: 20
        })
      })
    },
    toChapterTop() {
      this.$refs.book.scrollTo(0, 0)
    },
    toTsukkomiTop() {
      this.$refs.tsukkomi.scrollTo(0, 0)
    },
    showTsu(index, num, page, noSkeleton) {
      this.tsukkomiIndex = index
      num ? (this.tsukkomi_num = parseInt(num)) : null
      page ? (this.tsukkomiPage = page) : (this.tsukkomiPage = 1)
      this.tsukkomiScroll ? this.tsukkomiScroll.destroy() : null
      if (!noSkeleton) {
        this.tsukkomi_list = []
        this.showTsukkomi = true
        this.toTsukkomiTop()
      }
      this.getTsukkomiList(index)
      this.$nextTick(() => {
        this.windowSizeHandler()
      })
    },
    closeTsu() {
      this.showTsukkomi = false
      this.toTsukkomiTop()
      this.$nextTick(() => {
        this.windowSizeHandler()
      })
    },
    nextChapter() {
      if (this.chapterIndex < this.book_chapters.length - 1) {
        this.showTsukkomi = false
        this.loading = 0
        this.toChapterTop()
        this.toTsukkomiTop()
        this.containerScroll.destroy()
        this.chapterIndex++
        let cid = this.book_chapterids[this.chapterIndex]
        this.getContent(cid)
        this.$router.replace({ query: { bid: this.bid, cid: cid } })
      } else {
        this.$message.error('已经是最后一章了')
      }
    },
    jumpChapter(cid) {
      this.showTsukkomi = false
      this.loading = 0
      this.toChapterTop()
      this.toTsukkomiTop()
      this.containerScroll.destroy()
      this.getContent(cid)
      this.$router.replace({ query: { bid: this.bid, cid: cid } })
    },
    changeTsukkomiPage(page) {
      this.showTsu(this.tsukkomiIndex, null, page)
    },
    showCatalog() {
      this.$refs.catalog.showCatalog()
    },
    async tsukkomiOperate(unlike, tsukkomi_id) {
      let url = ''
      if (unlike) {
        url = '/unlike_tsukkomi'
      } else {
        url = '/like_tsukkomi'
      }
      let result = await this.$get({
        url: url,
        urlParas: {
          tsukkomi_id: tsukkomi_id
        }
      })
      this.refreshTsukkomi()
    },
    refreshTsukkomi() {
      this.showTsu(this.tsukkomiIndex, this.tsukkomi_num, this.tsukkomiPage, true)
    },
    refreshPara(pid) {
      this.chapterContentData[pid].tsukkomi_num++
    },
    newTsukkomi() {
      console.log('撰写新间贴')
      let text = this.chapterContentData[this.tsukkomiIndex].text
      this.$refs.tsukkomiWriter.show(text, this.bid, this.cid, this.tsukkomiIndex)
    },
    showPic(url) {
      this.$refs.picture.showPic(url)
    },
    async buyChapter() {
      let buy = await this.$get({
        url: '/chapter_buy',
        urlParas: {
          chapter_id: this.cid
        }
      })
      console.log(buy)
      this.getContent(this.cid)
    }
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
        z-index: 20;
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
      .buy-container {
        position: absolute;
        bottom: 0;
        width: @contentWidth;
        max-width: 760px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 36px;
        border-top: 1px solid #e8e8e8;
        background: #fff;
        z-index: 30;
        .title {
          font-size: 24px;
          padding: 36px 0 24px 0;
        }
        .subtitle {
          padding-bottom: 24px;
        }
        .buy-chapter-button {
          width: 400px;
          background-color: #f6f7f9;
          height: 60px;
          line-height: 60px;
          margin: 0 auto 24px;
          border-radius: 6px;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          color: #1b88ee;
          cursor: pointer;
        }
      }
      .book-footer {
        height: 164px;
        width: 100%;
        display: flex;
        justify-content: center;
        .next-chapter-button {
          width: 400px;
          background-color: #f6f7f9;
          height: 60px;
          line-height: 60px;
          margin: 0 auto 24px;
          border-radius: 6px;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          color: #1b88ee;
          cursor: pointer;
        }
      }
    }
    .tsukkomi-container {
      width: 400px;
      height: 100vh;
      position: fixed;
      padding-top: 90px;
      border-left: 1px solid #e0e0e0;
      top: 0;
      z-index: 16;
      background: rgb(255, 255, 255);
      .title-container {
        color: #a6a6a6;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e0e0e0;
        margin: 0 16px 0 16px;
        align-items: center;
        padding-bottom: 14px;
        .title-text {
          font-size: 12px;
          cursor: pointer;
        }
        .title-button {
          font-size: 14px;
          cursor: pointer;
        }
      }
      .tsukkomis {
        padding: 0 16px;
        height: calc(~'100vh - 128px');
        position: relative;
        overflow: hidden;
        .tsukkomi {
          display: flex;
          flex-direction: column;
          padding: 16px 0;
          border-bottom: 1px solid #e0e0e0;
          .tsukkomi-info {
            display: flex;
            align-items: center;
            .avatar {
              img {
                width: 45px;
                border-radius: 50%;
              }
            }
            .tsukkomi-info-text {
              margin-left: 16px;
              .user-name {
                font-size: 13px;
                font-weight: 700;
                line-height: 13px;
                display: block;
                margin-bottom: 8px;
                color: #333;
              }
              .time {
                font-size: 13px;
                color: #a6a6a6;
              }
            }
          }
          .tsukkomi-content {
            font-size: 14px;
            line-height: 22px;
            color: #262626;
            padding: 10px 0;
          }
          .tsukkomi-options {
            font-size: 14px;
            color: #a6a6a6;
            display: flex;
            justify-content: flex-end;
            .option-button {
              display: flex;
              align-items: center;
              margin-right: 18px;
              cursor: pointer;
            }
            .like-selected {
              color: #1890ff;
            }
            .unlike-selected {
              color: #f5222d;
            }
            &::v-deep .num {
              padding-left: 6px;
              font-size: 13px;
            }
          }
        }
      }
      .pagination-container {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 18px 0;
        &::v-deep .ant-pagination-item {
          border: none;
        }
      }
    }
  }
  .control-bar-container {
    width: 48px;
    height: 336px;
    position: fixed;
    bottom: 48px;
    flex-direction: column;
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
  .content-bar {
    left: 50%;
    display: flex;
    justify-content: space-between;
  }
  .tsukkomi-bar {
    right: 50%;
    display: none;
    justify-content: flex-end;
  }
  .tsukkomi-bar-show {
    display: flex;
  }
}
.book-page-tsu {
  .content-container {
    max-width: 1160px;
    .book-content {
      max-width: 760px;
      .top-bar {
        max-width: 1160px;
      }
    }
  }
}
</style>
