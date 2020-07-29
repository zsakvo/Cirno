<template>
  <div class="tsukkomi">
    <a-modal v-model="visible" title="发表间贴" :footer="null">
      <p>demodemode</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'Tsukkomi',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped></style>
