<template>
  <div class="catalog-container">
    <a-modal
      v-model="visible"
      class="catalog-dialog-container"
      :closable="false"
      :footer="null"
      dialogClass="cata-dialog"
      :dialogStyle="{
        'margin-left': marginLeft + 'px'
      }"
    >
      <div class="header-wrapper">
        <div class="catalog-head">
          <div class="book-cover" :style="getCover"></div>
          <div class="book-info">
            <div class="book-name">{{ info.book_name }}</div>
            <div class="book-author">{{ info.author_name }}</div>
            <div class="read-speed">{{ '上次更新 ' + info.uptime }}</div>
          </div>
        </div>
        <div class="catalog-button-container">
          <i class="ri-sort-asc catalog-button"></i>
        </div>
      </div>
      <div class="scroll-wrapper" ref="bsWrapper">
        <div class="catalog-content">
          <div
            class="catalog"
            v-for="(chapter, index) in chapters"
            :key="index"
            @click="getContent(chapter.chapter_id)"
          >
            <div class="chaper-title" :class="{ 'chapter-title-selected': index === currentChapter }">
              {{ chapter.chapter_title }}
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
export default {
  name: 'Catalog',
  props: {
    chapters: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentChapter: {
      type: Number,
      default: 0
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    reverse: {
      type: Boolean,
      default: false
    },
    marginLeft: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      cataScroll: null
    }
  },
  computed: {
    getCover: function() {
      return `background: url(${this.info.cover}) no-repeat;background-size: cover;`
    }
  },
  created() {},
  watch: {
    marginLeft(newValue) {
      this.$forceUpdate()
    },
    currentChapter(newValue) {
      this.$forceUpdate()
    }
  },
  methods: {
    showCatalog() {
      this.visible = true
      this.$nextTick(() => {
        this.cataScroll = new PerfectScrollbar(this.$refs.bsWrapper, {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        })
        this.$refs.bsWrapper.scrollTop = 52 * (this.currentChapter - 1)
      })
    },
    hideCatalog() {
      this.visible = false
    },
    initScroll() {},
    getContent(index) {
      this.hideCatalog()
      this.$emit('getContent', index)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .ant-modal {
  position: unset;
  padding-bottom: 0;
  .ant-modal-content {
    width: 520px;
    height: 100%;
    // transform: translateX(-120px);
    .ant-modal-body {
      padding: 0;
    }
  }
}
.cata-dialog {
  .header-wrapper {
    padding-top: 36px;
    .catalog-head {
      padding: 0 36px;
      display: flex;
      .book-cover {
        width: 64px;
        height: 92px;
        margin-right: 20px;
      }
      .book-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: 'Noto Sans SC', serif, PingFang SC, -apple-system, SF UI Text, Lucida Grande, STheiti,
          Microsoft YaHei, sans-serif;
        .book-name {
          font-size: 18px;
          font-weight: 600;
          color: #212832;
        }
        .book-author {
          color: #5d646e;
          margin-top: 7px;
          font-size: 14px;
          font-weight: 600;
        }
        .read-speed {
          color: #858c96;
          margin-top: 6px;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
  .catalog-button-container {
    height: 40px;
    margin-bottom: 8px;
    padding: 0 36px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .catalog-button {
      font-size: 18px;
      opacity: 0.5;
      cursor: pointer;
    }
  }
  .scroll-wrapper {
    height: calc(~'100vh - 176px');
    overflow: hidden;
    position: relative;
    .catalog-content {
      height: fit-content;
      padding-bottom: 12px;
      .catalog {
        height: 52px;
        line-height: 52px;
        padding-left: 36px;
        padding-right: 36px;
        .chaper-title {
          cursor: pointer;
          display: flex;
          align-items: center;
          border-top: 1px solid rgb(238, 240, 244);
          color: #353c46;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: break-all;
          font-size: 15px;
        }
        .chapter-title-selected {
          color: #1b88ee;
        }
      }
    }
  }
}
</style>
