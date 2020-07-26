<script>
export default {
  name: 'Paragraph',
  data() {
    return {}
  },
  created() {},
  props: [
    // 'chapterTitle',
    'paragraphs',
    'isDark',
    'size'
  ],
  render() {
    if (this.paragraphs.length > 0) {
      return (
        <div class="content" style={{ color: +this.isDark ? '#d0d3d8' : '#0d141e' }}>
          <div class="chapter-title tssukomi-wrapper" style={{ 'font-size': +this.size + 8 + 'px' }}>
            {this.paragraphs[0].text}
            {this.paragraphs[0].tsukkomi_num > 0 ? (
              <span
                class="tssukomi"
                onClick={() => {
                  this.$emit('showTsu', 0, this.paragraphs[0].tsukkomi_num)
                }}
              >
                {this.paragraphs[0].tsukkomi_num}
                <i>
                  <cite></cite>
                </i>
              </span>
            ) : null}
          </div>
          {this.paragraphs.map((a, i) => {
            if (i !== 0) {
              return (
                <p class="tssukomi-wrapper" style={{ 'font-size': +this.size + 'px' }}>
                  <span class="content-text">{a.text}</span>
                  {a.tsukkomi_num > 0 ? (
                    <span
                      class="tssukomi"
                      onClick={() => {
                        this.$emit('showTsu', i, a.tsukkomi_num)
                      }}
                    >
                      {a.tsukkomi_num}
                      <i>
                        <cite></cite>
                      </i>
                    </span>
                  ) : null}
                </p>
              )
            }
          })}
          <div class="content-footer"></div>
        </div>
      )
    } else {
      return <div></div>
    }
  },
  computed: {
    show() {
      return true
    }
  },
  watch: {
    paragraphs(newValue) {
      // console.log(newValue)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding-bottom: 16px;
  min-height: 100vh;
  padding-bottom: 0.67vh;
  transition: all ease 0.5s;
  .tssukomi-wrapper {
    .tssukomi {
      font-size: 14px;
      line-height: 14px;
      position: relative;
      z-index: 1;
      display: inline-block;
      min-width: 34px;
      height: 16px;
      margin-left: 14px;
      text-align: center;
      vertical-align: 1px;
      color: #999;
      border: 1px solid #999;
      border-radius: 2px;
      user-select: none;
      cursor: pointer;
      i {
        position: absolute;
        top: 50%;
        left: -5px;
        width: 0;
        height: 0;
        margin-top: -3px;
        border-top: 3px solid transparent;
        border-right: 4px solid #999;
        border-bottom: 3px solid transparent;
        border-left: 0 none;
        cite {
          position: absolute;
          top: -3px;
          left: 1px;
          width: 0;
          height: 0;
          border-top: 3px solid transparent;
          border-right: 4px solid #fff;
          border-bottom: 3px solid transparent;
          border-left: 0 none;
        }
      }
    }
  }
  .chapter-title {
    font-family: 'Noto Sans SC', serif, PingFang SC, -apple-system, SF UI Text, Lucida Grande, STheiti, Microsoft YaHei,
      sans-serif;
    margin: 0px 0 56px 72px;
    max-width: 616px;
    font-weight: bold;
  }
  p {
    font: 19px / 34px 'PingFang SC', -apple-system, 'SF UI Text', 'Lucida Grande', STheiti, 'Microsoft YaHei',
      sans-serif;
    line-height: 1.8;
    overflow: hidden;
    word-break: break-all;
    padding: 0 72px;
    margin: 0.8em auto;
  }
  .content-footer {
    height: 42px;
    width: 100%;
  }
}
</style>
