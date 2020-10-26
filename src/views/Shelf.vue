<template>
  <div class="home">
    <div class="header">
      <div class="header-title">
        <div class="title-text">Cirno</div>
      </div>
      <!-- <div class="search-container">
        <div class="components-input-demo-presuffix">
          <a-input id="searchBox" v-model="searchStr" placeholder="搜索书籍或作者">
            <a-icon slot="prefix" type="search" class="search-icon" />
          </a-input>
        </div>
      </div> -->
      <div class="right-container">
        <div class="menu-container">
          <!-- <a-popover>
            <template slot="content">
              <UserCard />
            </template>
            <div class="menu">
              <img :src="tempAvatar" class="avatar" />
            </div>
          </a-popover> -->
          <div class="menu">
            <img :src="tempAvatar" class="avatar" @click="gotoLogin" />
          </div>
          <a-dropdown>
            <a class="ant-dropdown-link menu" @click="e => e.preventDefault()">
              书架
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="shelf in hbooker_shelves"
                :key="shelf.shelf_id"
                @click="clickShelfItem(shelf.shelf_id)"
              >
                <div>{{ shelf.shelf_name }}</div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- <div class="menu">设置</div> -->
          <div class="menu" @click="gotoAbout">关于</div>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="content-container">
        <div v-show="loadingBooks === 0" class="skeleton-container">
          <a-skeleton active />
        </div>
        <div class="books-container" v-show="loadingBooks === 1" ref="booksContainer">
          <div class="books">
            <div class="book" v-for="book in book_list" :key="book.id" @click="gotoBook(book)">
              <div class="book-cover"><img :src="book.book_info.cover" alt="" /></div>
              <div class="book-name">{{ book.book_info.book_name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
// import UserCard from '../components/user-card.vue'

export default {
  name: 'Home',
  components: {
    // UserCard
  },
  data() {
    return {
      searchStr: '',
      currentShelfId: 0,
      hbooker_shelves: [],
      loadingBooks: 0,
      book_list: [],
      shelfScroll: null,
      tempAvatar: require('@/assets/d_avatar.jpg')
    }
  },
  async created() {
    let baseUrl = localStorage.getItem('baseUrl')
    console.log(baseUrl)
    if (!baseUrl) {
      this.$store.commit('baseUrl', baseUrl)
    }
    if (this.avatar) {
      this.tempAvatar = this.avatar
    }
    let sign_record_list = await this.$get({
      url: '/task/get_sign_record'
    })
    sign_record_list = sign_record_list.data.sign_record_list
    console.log(sign_record_list)
    let date = new Date()
    let today = date.getDay()
    let dayArr = [6, 0, 1, 2, 3, 4, 5]
    // if (sign_record_list[dayArr[today]]['is_signed'] !== 1) {
    //   console.log('开始签到。。。')
    //   let sign_recommend = await this.$get({
    //     url: '/reader/get_task_bonus_with_sign_recommend',
    //     urlParas: {
    //       task_type: 1
    //     }
    //   }).then(res => {
    //     let my_info = res.data
    //     let bonus = my_info.bonus
    //     this.$store.commit('setPropInfo', my_info.prop_info)
    //     this.$store.commit('setReaderInfo', my_info.reader_info)
    //     this.$message.success(`签到成功，${bonus.hlb}代币，${bonus.exp}经验,获得${bonus.recommend}推荐票。`)
    //   })
    // }
    this.$get({
      url: '/bookshelf/get_shelf_list',
      urlParas: {}
    }).then(
      res => {
        console.log(res)
        let hbooker_shelves = res
        this.hbooker_shelves = hbooker_shelves.data.shelf_list
        this.currentShelfId = this.hbooker_shelves[0].shelf_id
        this.getBooks()
      },
      err => {}
    )
  },
  watch: {
    avatar(newVal) {
      this.tempAvatar = newVal
    }
  },
  computed: {
    avatar() {
      return this.$store.state.reader_info.avatar_thumb_url
    }
  },
  methods: {
    async getBooks() {
      this.shelfScroll ? this.shelfScroll.destroy() : null
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
      this.loadingBooks = 1
      this.$nextTick(() => {
        try {
          this.shelfScroll = new PerfectScrollbar(this.$refs.booksContainer, {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20
          })
        } catch (err) {
          return null
        }
      })
    },
    clickShelfItem(id) {
      if (id === this.currentShelfId) {
        this.$refs.booksContainer.scrollTo(0, 0)
      } else {
        this.loadingBooks = 0
        this.currentShelfId = id
        this.getBooks()
      }
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
    gotoLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    gotoShelf() {
      this.$router.push({
        name: 'Shelf'
      })
    },
    gotoSettings() {
      this.$router.push({
        name: 'Settings'
      })
    },
    gotoAbout() {
      this.$router.push({
        name: 'About'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  .header {
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    position: relative;
    z-index: 10;
    max-width: 100%;
    height: 64px;
    user-select: none;
    display: flex;
    align-items: center;
    .header-title {
      height: 100%;
      width: fit-content;
      display: flex;
      align-items: center;
      margin: 0 40px;
      width: 180px;
      .title-text {
        color: #464646;
        font-weight: 500;
        display: inline-block;
        font-size: 20px;
        line-height: 24px;
        vertical-align: middle;
      }
    }
    .search-container {
      border-left: 1px solid #ebedf0;
      border-right: 1px solid #ebedf0;
      .search-icon {
        color: #ced4d9;
        margin: 0 8px;
      }
      &::v-deep #searchBox {
        border: none;
        padding: 0 48px;
        width: 330px;
        &:focus {
          box-shadow: none;
        }
      }
    }
    .right-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 40px;
      .menu-container {
        display: flex;
        align-items: center;
        &::v-deep .ant-menu {
          border-bottom: none;
          .ant-menu-item {
            border-bottom: 0;
          }
        }
        .menu {
          font-size: 15px;
          margin: 0 24px;
          cursor: pointer;
          .avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }
        }
        .menu-selected {
          color: #1b88ee;
        }
      }
    }
  }
  .page {
    width: 100%;
    max-height: 100vh;
    height: calc(~'100vh - 64px');
    display: flex;
    .nav-container {
      user-select: none;
      margin-top: 18px;
      width: 263px;
      &::v-deep .ant-menu {
        border-right: none;
        .ant-menu-item {
          border-radius: 0 25px 25px 0;
          &::after {
            border-right: none;
          }
          .item-content {
            margin-left: 16px;
          }
        }
      }
    }
    .content-container {
      flex: 1;
      .skeleton-container {
        padding: 32px 40px;
      }
      .books-container {
        padding: 32px 40px;
        max-height: 100%;
        overflow: hidden;
        position: relative;
        .books {
          grid-row-gap: 40px;
          grid-column-gap: 32px;
          display: grid;
          grid-template-columns: repeat(auto-fill, 108px);
          justify-content: space-between;
          .book {
            width: 108px;
            cursor: pointer;
            .book-cover {
              width: 108px;
              height: 156px;
              img {
                width: 100%;
                height: 100%;
              }
            }

            .book-name {
              font-size: 13px;
              margin-top: 16px;
              color: #6d6d6d;
              line-height: 18px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              overflow: hidden;
              user-select: none;
            }

            &:hover {
              .book-name {
                color: #333333;
              }
            }
          }
        }
      }
    }
  }
}

&::v-deep .ant-popover {
  .ant-popover-content {
    .ant-popover-title {
      padding: 16px;
      text-align: center;
    }
  }
}
</style>
