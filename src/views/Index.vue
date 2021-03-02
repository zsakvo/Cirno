<template>
  <div class="index-wrapper">
    <div class="top-bar">
      <div class="title">
        <div class="text">我的书架</div>
        <div class="decoration"></div>
      </div>
      <div class="options">
        <div class="change-shelf option-icon" @click="changeDeleteMode">
          <i class="ri-delete-bin-line"></i>
        </div>
        <div class="change-shelf option-icon" @click="openShelfModal">
          <i class="ri-loader-4-line"></i>
        </div>
        <div class="change-shelf option-icon" @click="beginCheckIn(checkIn)">
          <i :class="{ 'ri-calendar-check-line': checkIn, 'ri-calendar-line': !checkIn }"></i>
        </div>
        <div class="change-shelf option-icon" @click="gotoSearch">
          <i class="ri-search-2-line"></i>
        </div>
        <div class="change-shelf option-icon" @click="gotoSettings">
          <i class="ri-settings-line"></i>
        </div>
        <!-- <img class="avatar" :src="avatar ? avatar : require('@/assets/d_avatar.jpg')" alt="用户头像" /> -->
      </div>
    </div>
    <a-spin size="large" v-if="loadStatus === 0" />
    <div class="books-wrapper" v-else-if="loadStatus === 1">
      <div class="books">
        <div class="book" v-for="book in book_list" :key="book.id">
          <img class="book-cover" :src="book.book_info.cover" @click="gotoBook(book)" />
          <div class="book-name">{{ book.book_info.book_name }}</div>
          <a-button type="danger" v-show="deleteMode" @click="deleteBook(book)">从书架中删除</a-button>
        </div>
      </div>
    </div>
    <div class="err-wrapper" v-else>
      <div class="err-title">
        获取数据失败，原因可能是与后端 api 通信出错，您可以尝试
        <font class="clickable" color="#ff4d4f" @click="refreshPage">刷新</font>
        或者
        <font class="clickable" color="#ff4d4f" @click="gotoSettings">设置 api-host</font>
      </div>
      <div class="err-text">
        {{ errText }}
      </div>
    </div>
    <!-- <div class="bottom-bar"></div> -->
    <a-modal
      :footer="null"
      title="切换书架"
      :closable="false"
      v-model="shelfModal"
      centered
      @ok="() => (shelfModal = false)"
      class="shelf-modal"
    >
      <div class="shelf-wrapper">
        <div class="shelf" v-for="shelf in shelves" :key="shelf.shelf_id" @click="changeShelf(shelf.shelf_id)">
          {{ shelf.shelf_name }}
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Shelf',
  data() {
    return {
      shelves: [],
      book_list: [],
      currentShelfId: null,
      avatar: this.$store.state.reader_info.avatar_thumb_url,
      checkIn: false,
      shelfModal: false,
      deleteMode: false,
      loadStatus: 0,
      errText: ''
    }
  },
  async created() {
    console.log('----')
    console.log(this.$route.params.forceReload)
    if (this.$route.params.forceReload) {
      this.refreshBooks()
    }
    let info = await this.getInfo()
    if (info) {
      this.refreshBooks()
    }
  },
  mounted() {},
  computed: {},
  methods: {
    changeDeleteMode(){
      this.deleteMode = !this.deleteMode
    },
    deleteBook(book){
      this.$get({
        url: '/bookshelf/delete_shelf_book',
        urlParas: {
          shelf_id: this.currentShelfId,
          book_id: book.book_info.book_id
        }
      }).then(
        res => {
          this.$message.info(book.book_info.book_name+' 已从书架 '+this.currentShelfId+' 中删除')
          this.refreshBooks()
        },
        err => {}
      )
    },
    async refreshBooks() {
      this.isCheckIn()
      let shelves = await this.getShelves()
      if (shelves === null) {
        this.loadStatus = -1
      } else {
        this.shelves = shelves
        this.currentShelfId === null ? (this.currentShelfId = this.shelves[0]['shelf_id']) : null
        this.getBooks()
      }
    },
    refreshPage() {
      this.loadStatus = 0
      this.currentShelfId = null
      this.shelves = []
      this.refreshBooks()
    },
    async getInfo() {
      return this.$get({
        url: '/reader/get_my_info'
      }).then(
        async res => {
          this.avatar = res.data.reader_info.avatar_thumb_url
          this.$store.commit('setPropInfo', res.data.prop_info)
          this.$store.commit('setReaderInfo', res.data.reader_info)
          return true
        },
        err => {
          this.loadStatus = -1
          this.errText = err
          return false
        }
      )
    },
    async isCheckIn() {
      let sign_record_list = await this.$get({
        url: '/task/get_sign_record'
      })
      sign_record_list = sign_record_list.data.sign_record_list
      console.log(sign_record_list)
      let date = new Date()
      let today = date.getDay()
      let dayArr = [6, 0, 1, 2, 3, 4, 5]
      this.checkIn = sign_record_list[dayArr[today]]['is_signed'] === '1'
    },
    async beginCheckIn(checkIn) {
      if (checkIn) {
        this.$message.warn(`请勿重复签到。`)
      } else {
        let sign_recommend = await this.$get({
          url: '/reader/get_task_bonus_with_sign_recommend',
          urlParas: {
            task_type: 1
          }
        }).then(res => {
          this.checkIn = true
          let my_info = res.data
          let bonus = my_info.bonus
          this.$store.commit('setPropInfo', my_info.prop_info)
          this.$store.commit('setReaderInfo', my_info.reader_info)
          this.$message.success(`签到成功，${bonus.hlb}代币，${bonus.exp}经验,获得${bonus.recommend}推荐票。`)
        })
      }
    },
    openShelfModal() {
      this.shelfModal = true
    },
    changeShelf(id) {
      this.shelfModal = false
      if (id === this.currentShelfId) {
        // this.$refs.booksContainer.scrollTo(0, 0)
      } else {
        // this.loadingBooks = 0
        this.currentShelfId = id
        this.getBooks()
      }
    },
    async getShelves() {
      return this.$get({
        url: '/bookshelf/get_shelf_list',
        urlParas: {}
      }).then(
        res => {
          console.log(res.data.shelf_list)
          return res.data.shelf_list
        },
        err => {
          this.loadStatus = -1
          this.errText = err
          return null
        }
      )
    },
    async getBooks() {
      this.$get({
        url: '/bookshelf/get_shelf_book_list_new',
        urlParas: {
          shelf_id: this.currentShelfId,
          count: 9999,
          page: 0,
          order: 'last_read_time'
        }
      }).then(
        res => {
          this.book_list = res.data.book_list
          this.$nextTick(() => {
            this.loadStatus = 1
          })
        },
        err => {
          this.loadStatus = -1
          this.errText = err
        }
      )
    },
    gotoBook(book) {
      this.$router.push({
        name: 'Book',
        query: {
          bid: book.book_info.book_id,
          cid: book.last_read_chapter_id
        }
      })
    },
    gotoSearch() {
      this.$router.push({ name: 'Search' })
    },
    gotoSettings() {
      this.$router.push({ name: 'Settings' })
    }
  }
}
</script>

<style lang="less" scoped>
.index-wrapper {
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
      width: fit-content;
      height: fit-content;
      font-size: 24px;
      font-weight: 600;
      user-select: none;
    }
    .options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // width: 20%;
      width: 220px;
      .avatar {
        width: 48px;
        border-radius: 50%;
      }
      .option-icon {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }

  .ant-spin {
    position: absolute;
    top: 45%;
    left: 50%;
  }

  .err-wrapper {
    width: 100%;
    padding-top: 120px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
    .err-title {
      color: #8c8c8c;
      font-size: 16px;
      font-weight: 500;
      user-select: none;
      .clickable {
        cursor: pointer;
      }
    }
    .err-text {
      border-left: 5px solid #ff7875;
      padding-left: 12px;
      margin-top: 32px;
      color: #8c8c8c;
    }
  }

  .books-wrapper {
    padding-top: 120px;
    position: absolute;
    top: 0;
    width: 80%;
    padding-bottom: 36px;
    background: #fff;
    .books {
      width: 100%;
      grid-row-gap: 36px;
      grid-column-gap: 32px;
      display: grid;
      grid-template-columns: repeat(auto-fill, 108px);
      justify-content: space-between;
      .book {
        width: 108px;
        cursor: pointer;
        .book-cover {
          width: 100%;
          height: 144px;
        }
        .book-name {
          margin-top: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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
  .ant-modal-body {
    padding: 0px 24px 16px 24px;
  }
  .shelf-wrapper {
    display: flex;
    flex-direction: column;
    .shelf {
      font-size: 14px;
      padding: 8px 0;
      cursor: pointer;
    }
  }
}
</style>
