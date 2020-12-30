<template>
  <div>
    Hello World{{ num }}<br>
    <div v-html="countTime" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      num: 12001,
      countTime: ''
    }
  },
  mounted() {
    this.num = this.$mgUtils.formateNumberTip(this.num)
    this.timeCountDown()
  },
  methods: {
    test(string) {
      console.log(`hello ${string}`)
    },
    // 计算倒计时
    timeCountDown() {
      const date = '2020-12-31 18:00:00'
      this.$mgUtils.timeCountDown(date, (value, clear) => {
        this.countTime = value
        this.$once('hook:beforeDestroy', clear)
      })
    }
  }
}
</script>
<style>
  .time-tip {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .time-rect {
    padding: 10px 20px;
    background: #ccc;
  }
</style>
