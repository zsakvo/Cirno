<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div class="header">
      <div class="header-title">
        <div class="title-text">Cirno</div>
      </div>
      <div class="search-container">
        <div class="components-input-demo-presuffix">
          <a-input id="searchBox" v-model="searchStr" placeholder="搜索书籍或作者">
            <a-icon slot="prefix" type="search" class="search-icon" />
          </a-input>
        </div>
      </div>
      <div class="right-container">
        <div class="menu-container">
          <a-menu v-model="currentTopMenu" mode="horizontal">
            <a-menu-item key="shelf">
              <div class="item-content">书架</div>
            </a-menu-item>
            <a-menu-item key="rss">
              <div class="item-content">RSS</div>
            </a-menu-item>
            <a-menu-item key=" settings">
              <div class="item-content">设置</div>
            </a-menu-item>
            <a-menu-item key="about">
              <div class="item-content">关于</div>
            </a-menu-item>
          </a-menu>
        </div>
      </div>
    </div>
    <div class="page">
      <a-affix :offset-top="0">
        <div class="nav-container">
          <a-menu v-model="currentSideItemSelected" :open-keys="sideOpenKeys" mode="inline">
            <a-sub-menu key="hbooker">
              <span slot="title">
                <span>刺猬猫</span>
              </span>
              <a-menu-item
                v-for="shelf in hbooker_shelves"
                :key="shelf.shelf_id"
                @click="clickShelfItem(shelf.shelf_id)"
              >
                {{ shelf.shelf_name }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-affix>
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      searchStr: '',
      currentTopMenu: ['shelf'],
      sideOpenKeys: ['hbooker'],
      currentSideItemSelected: [],
      hbooker_shelves: [],
      loadingBooks: 0,
      book_list: [],
      shelfScroll: null
    }
  },
  async created() {
    let my_info = await this.$get({
      url: '/my_info'
    })
    this.$store.commit('setPropInfo', my_info.data.prop_info)
    this.$store.commit('setReaderInfo', my_info.data.reader_info)
    let hbooker_shelves = await this.$get({
      url: '/bookshelves'
    })
    this.hbooker_shelves = hbooker_shelves.data.shelf_list
    this.currentSideItemSelected = [this.hbooker_shelves[0].shelf_id]
    let book_list = await this.$get({
      url: '/shelf_books',
      urlParas: {
        shelf_id: this.currentSideItemSelected[0]
      }
    })
    this.book_list = book_list.data.book_list
    this.loadingBooks = 1
    this.$nextTick(() => {
      this.shelfScroll = new PerfectScrollbar(this.$refs.booksContainer, {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
      })
    })
  },
  watch: {},
  methods: {
    clickShelfItem(id) {
      if (id === this.currentSideItemSelected[0]) {
        this.$refs.booksContainer.scrollTo(0, 0)
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
        color: #000000;
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
        &::v-deep .ant-menu {
          border-bottom: none;
          .ant-menu-item {
            border-bottom: 0;
          }
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
</style>
