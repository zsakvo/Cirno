<template>
  <div class="book-page" ref="book" :class="{ 'book-page-tsu': showTsukkomi }">
    <div class="content-container" ref="contentContainer">
      <div v-show="loading === 1" class="book-content" ref="bookContent">
        <div class="top-bar">
          <i class="ri-arrow-left-line icon-button" @click="goBack"></i>
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
          <div class="subtitle">
            本章节需 {{ chapterAmount }} 币，当前剩余 {{ prop_info.rest_hlb }} 币，共 {{ buyAmount }} 人购买
          </div>
          <div class="buy-chapter-button" @click="buyChapter">购买本章</div>
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
                  :class="{ 'like-selected': tsukkomi.is_like + '' !== '0' }"
                  @click="tsukkomiOperate(0, tsukkomi.tsukkomi_id)"
                >
                  <i class="ri-thumb-up-line"></i>
                  <div class="num">{{ tsukkomi.like_amount }}</div>
                </div>
                <div
                  class="option-button"
                  :class="{ 'unlike-selected': tsukkomi.is_unlike + '' !== '0' }"
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
      <div class="control-button-container" @click="noAccess">
        <i class="ri-settings-line control-button"></i>
      </div>
      <div class="control-button-container" @click="noAccess">
        <i class="ri-download-cloud-2-line control-button"></i>
      </div>
      <div class="control-button-container" @click="giveTickets">
        <i class="ri-coupon-3-line control-button"></i>
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
    <Tickets ref="tickets" />
  </div>
</template>

<script>
import crypto from 'crypto'
import { mapState } from 'vuex'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import Paragraph from '../components/paragraph.vue'
import Catalog from '../components/catalog.vue'
import Picture from '../components/picture.vue'
import Tsukkomi from '../components/tsukkomi.vue'
import Tickets from '../components/tickets.vue'
export default {
  name: 'Reader',
  components: {
    Paragraph,
    Catalog,
    Picture,
    Tsukkomi,
    Tickets
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
    if (this.cid != 0) {
      this.getContent(this.cid)
    }
    let book_info = await this.$get({
      url: '/book/get_info_by_id',
      urlParas: {
        book_id: this.bid
      }
    })
    this.book_info = book_info.data.book_info
    let book_chapters = await this.$get({
      url: '/book/get_division_list',
      urlParas: {
        book_id: this.bid
      }
    }).then(async res => {
      let chapters = []
      let division_list = res.data.division_list
      let i = 0
      for (let division of division_list) {
        let division_id = division['division_id']
        let chapters_res = await this.$get({
          url: '/chapter/get_updated_chapter_by_division_id',
          urlParas: {
            division_id: division_id,
            last_update_time: 0
          }
        })
        if (i === 0 && this.cid == 0) {
          this.cid = chapters_res.data.chapter_list[0].chapter_id
          this.$router.replace({ query: { bid: this.bid, cid: this.cid } })
          this.getContent(this.cid)
        }
        chapters.push(...chapters_res.data.chapter_list)
        i++
      }
      return chapters
    })
    this.book_chapters = book_chapters
    this.book_chapterids = this.book_chapters.map(chapter => {
      return chapter['chapter_id']
    })
    this.chapterIndex = this.book_chapterids.indexOf(this.cid)
    // if (this.cid == 0) {
    //   this.cid = this.book_chapterids[0]
    //   this.$router.replace({ query: { bid: this.bid, cid: this.cid } })
    // }
  },
  mounted() {
    this.contentDiv = this.$refs.contentContainer
    window.addEventListener('resize', this.windowSizeHandler)
  },
  watch: {
    contentWidth(newValue) {}
  },
  computed: {
    ...mapState(['prop_info', 'reader_info'])
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
      let keyRes = await this.$get({
        url: '/chapter/get_chapter_cmd',
        urlParas: {
          chapter_id: cid
        }
      })
      let key = keyRes.data.command
      let chapter_info = await this.$get({
        url: '/chapter/get_cpt_ifm',
        urlParas: {
          chapter_id: cid,
          chapter_command: key
        }
      })
      chapter_info.data.chapter_info.txt_content = this.decrypt(chapter_info.data.chapter_info.txt_content, key)
      this.chapter_info = chapter_info.data.chapter_info
      console.log(this.chapter_info)
      if (this.chapter_info.auth_access == 1) {
        this.auth = true
        this.setLastRead()
      } else {
        this.auth = false
      }
      this.chapterAmount = this.chapter_info.unit_hlb
      this.buyAmount = this.chapter_info.buy_amount
      this.chapterTitle = this.chapter_info.chapter_title
      let txt_content = this.chapter_info.txt_content
      let content_arr = txt_content.split('\n')
      content_arr.pop()
      let author_say = this.chapter_info.author_say
      let contentArray = [this.chapterTitle, ...content_arr, ...author_say.split('\n')]
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
    decrypt(data, key) {
      if (key == null) {
        key = crypto
          .createHash('sha256')
          .update('zG2nSeEfSHfvTCHy5LCcqtBbQehKNLXn')
          .digest()
      } else {
        key = crypto
          .createHash('sha256')
          .update(key)
          .digest()
      }
      let decipher = crypto.createDecipheriv('aes-256-cbc', key, new Uint8Array(16))
      decipher.setAutoPadding(false)
      let decrypted = decipher.update(data, 'base64', 'utf8')
      return decrypted
    },
    async getTsukkomiNum(cid) {
      typeof cid === 'string' ? null : (cid = `${cid}`)
      let tsukkomi_num_info = await this.$get({
        url: '/chapter/get_tsukkomi_num',
        urlParas: {
          chapter_id: cid
        }
      })
      return tsukkomi_num_info.data.tsukkomi_num_info
    },
    async getTsukkomiList(paragraph_index) {
      let tsukkomi_list = await this.$get({
        url: '/chapter/get_paragraph_tsukkomi_list_new',
        urlParas: {
          chapter_id: this.cid,
          paragraph_index: paragraph_index,
          count: 20,
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
        this.tsukkomiScroll ? this.tsukkomiScroll.destroy() : null
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
        url = '/chapter/unlike_tsukkomi'
      } else {
        url = '/chapter/like_tsukkomi'
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
      this.tsukkomi_num++
    },
    newTsukkomi() {
      let text = this.chapterContentData[this.tsukkomiIndex].text
      this.$refs.tsukkomiWriter.show(text, this.bid, this.cid, this.tsukkomiIndex)
    },
    showPic(url) {
      this.$refs.picture.showPic(url)
    },
    async buyChapter() {
      let buy_result = await this.$get({
        url: '/chapter/buy',
        urlParas: {
          chapter_id: this.cid
        }
      })
      let prop_info = buy_result.data.prop_info
      let reader_info = buy_result.data.reader_info
      this.$store.commit('setPropInfo', prop_info)
      this.$store.commit('setReaderInfo', reader_info)
      this.getContent(this.cid)
    },
    giveTickets() {
      this.$refs.tickets.show(this.bid)
    },
    setLastRead() {
      this.$get({
        url: '/bookshelf/set_last_read_chapter',
        urlParas: {
          book_id: this.bid,
          last_read_chapter_id: this.cid
        }
      })
    },
    noAccess() {
      this.$message.info('此功能尚未开放')
    },
    goBack() {
      this.$router.back()
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
          cursor: pointer;
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
