<template>
  <div class="index-wrapper">
    <div class="top-bar">
      <div class="title">
        <div class="text">我的书架</div>
        <div class="decoration"></div>
      </div>
      <div class="options">
        <div class="change-shelf option-icon">
          <i class="ri-loader-4-line"></i>
        </div>
        <div class="change-shelf option-icon" @click="beginCheckIn(checkIn)">
          <i :class="{ 'ri-calendar-check-line': checkIn, 'ri-calendar-line': !checkIn }"></i>
        </div>
        <div class="change-shelf option-icon">
          <i class="ri-search-2-line"></i>
        </div>
        <div class="change-shelf option-icon">
          <i class="ri-settings-line"></i>
        </div>
        <!-- <img class="avatar" :src="avatar ? avatar : require('@/assets/d_avatar.jpg')" alt="用户头像" /> -->
      </div>
    </div>
    <div class="books-wrapper">
      <div class="books">
        <div class="book" v-for="book in book_list" :key="book.id" @click="gotoBook(book)">
          <img class="book-cover" :src="book.book_info.cover" />
          <div class="book-name">{{ book.book_info.book_name }}</div>
        </div>
      </div>
    </div>
    <!-- <div class="bottom-bar"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      book_list: [],
      currentShelfId: 0,
      avatar: this.$store.state.reader_info.avatar_thumb_url,
      checkIn: false
    }
  },
  created() {
    this.getInfo()
    this.isCheckIn()
    this.$get({
      url: '/bookshelf/get_shelf_list',
      urlParas: {}
    }).then(
      res => {
        this.hbooker_shelves = res.data.shelf_list
        this.currentShelfId = this.hbooker_shelves[0].shelf_id
        this.getBooks()
      },
      err => {}
    )
  },
  computed: {},
  methods: {
    getInfo() {
      this.$get({
        url: '/reader/get_my_info'
      }).then(
        async res => {
          this.avatar = res.data.reader_info.avatar_thumb_url
          this.$store.commit('setPropInfo', res.data.prop_info)
          this.$store.commit('setReaderInfo', res.data.reader_info)
        },
        err => {
          console.log(err)
          switch (err.code) {
            case 200001:
              //需要登入
              this.$router.push({
                name: 'Login'
              })
              break
          }
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
      console.log(this.checkIn)
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
    async getBooks() {
      let book_list = await this.$get({
        url: '/bookshelf/get_shelf_book_list_new',
        urlParas: {
          shelf_id: this.currentShelfId,
          count: 9999,
          page: 0,
          order: 'last_read_time'
        }
      })
      this.book_list = book_list.data.book_list
    },
    gotoBook(book) {
      this.$router.push({
        name: 'Book',
        query: {
          bid: book.book_info.book_id,
          cid: book.last_read_chapter_id
        }
      })
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
      }
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
</style>
