<template>
  <div class="home">
    <div class="header">
      <div class="header-title">
        <div class="title-text" @click="gotoIndex">Cirno</div>
      </div>
      <div class="search-container">
        <div class="components-input-demo-presuffix">
          <a-input-search id="searchBox" placeholder="搜索书籍或作者" @search="OnSearch"/>
        </div>
      </div>
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
            <div class="book" v-for="book in book_list" :key="book.id">
              <div class="book-cover"><img :src="book.cover" alt="" /></div>
              <div class="book-name">{{ book.book_name }}</div>
              <a-button @click="addToShelf(book)">添加到书架</a-button>
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
  name: 'Search',
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
    this.$get({
      url: '/bookshelf/get_shelf_list',
      urlParas: {}
    }).then(
      res => {
        console.log(res)
        let hbooker_shelves = res
        this.hbooker_shelves = hbooker_shelves.data.shelf_list
        this.currentShelfId = this.hbooker_shelves[0].shelf_id
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
    OnSearch(value){
      this.$get({
        url: '/bookcity/get_filter_search_book_list',
        urlParas: {
          key: value,
          category_index: 0,
          count: 10,
          page: 0
        }
      }).then(
        res => {
          console.log(res)
          this.book_list = res.data.book_list
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
        err => {}
      )
    },
    addToShelf(book) {
      this.$get({
        url: '/bookshelf/favor',
        urlParas: {
          shelf_id: this.currentShelfId,
          book_id: book.book_id
        }
      }).then(
        res => {
          this.$message.info(book.book_name+' 已经被添加到书架 '+this.currentShelfId)
        },
        err => {}
      )
    },
    clickShelfItem(id) {
        this.currentShelfId = id
    },
    gotoLogin() {
      this.$router.push({
        name: 'Login'
      })
    },
    gotoIndex() {
      this.$router.push({
        name: 'Index'
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
              height: 36px;
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
