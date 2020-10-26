<template>
  <div class="index-wrapper">
    <div class="top-bar">
      <div class="title">
        <div class="text">我的书架</div>
        <div class="decoration"></div>
      </div>
      <div class="options">
        <div class="change-shelf option-icon">
          <i class="ri-stack-line"></i>
        </div>
        <div class="change-shelf option-icon">
          <i class="ri-keynote-line"></i>
        </div>
        <div class="change-shelf option-icon">
          <i class="ri-search-2-line"></i>
        </div>
        <img class="avatar" :src="avatar ? avatar : require('@/assets/d_avatar.jpg')" alt="用户头像" />
      </div>
    </div>
    <div class="books-wrapper">
      <div class="books">
        <div class="book">
          <img
            class="book-cover"
            src="http://c1.kuangxiangit.com/uploads/allimg/c180824/24-08-18170353-43659-100076156.jpg"
            alt=""
          />
          <div class="book-name">神的调色盘</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book_list: [],
      currentShelfId: 0,
      avatar: this.$store.state.reader_info.avatar_thumb_url
    }
  },
  created() {
    this.getInfo()
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
    }
  }
}
</script>

<style lang="less" scoped>
.index-wrapper {
  width: 80%;
  margin: 0 auto;
  padding: 24px 0;
  .top-bar {
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
      width: 20%;
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
    padding-top: 72px;
    height: 800px;
    width: 100%;
    .books {
      height: 800px;
      width: 100%;
      .book {
        width: 108px;
        .book-cover {
          width: 100%;
        }
        .book-name {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
