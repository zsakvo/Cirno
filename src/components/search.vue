<template>
  <div>
    <a-modal v-model="visible" :footer="null" dialogClass="search" width="50vw" title="搜索">
      <div class="search-container">
        <a-input-search id="searchBox" placeholder="搜索书籍或作者" @search="onSearch" />
      </div>
      <div class="books-container">
        <div class="books">
          <div class="book" v-for="book in book_list" :key="book.id">
            <div class="book-cover"><img :src="book.cover" alt="" /></div>
            <div class="book-name">{{ book.book_name }}</div>
            <a-button @click="addToShelf(book)">添加到书架</a-button>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    currentShelfId: {
      type: String,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      visible: false,
      loadingBooks: 0,
      book_list: []
    }
  },
  methods: {
    showSearch() {
      this.visible = true
    },
    onSearch(value) {
      this.$get({
        url: '/bookcity/get_filter_search_book_list',
        urlParas: {
          key: value,
          category_index: 0,
          count: 12,
          page: 0
        }
      }).then(
        res => {
          // console.log(res)
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
          this.$message.info(book.book_name + ' 已经被添加到书架 ' + this.currentShelfId)
          this.$emit('refresh')
        },
        err => {}
      )
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .ant-modal {
  top: 40px;
}
.search {
  .books-container {
    padding-top: 16px;
    max-height: 100%;
    overflow: hidden;
    position: relative;
    .books {
      grid-row-gap: 20px;
      grid-column-gap: 8px;
      display: grid;
      grid-template-columns: repeat(auto-fill, 108px);
      justify-content: space-between;
      .book {
        width: 108px;
        cursor: pointer;
        .book-cover {
          width: 108px;
          height: 144px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .book-name {
          margin: 8px 0px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
</style>
