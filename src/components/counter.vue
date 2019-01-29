<template>
    <div class="counter__wrap">
        <div class="counter">
            <div class="counter-top"><span class="counter__count">{{now}}/{{total}}</span> <span class="counter-text">{{text}}</span></div>
            <div class="counter__line">
                <div class="counter__subLine" :style="{width: this.setWidth }"></div>
            </div>
        </div>
        <div class="counter__flag"></div>
    </div>
</template>
<script>
export default {
  name: 'counter',
  props: {
    total: {
      type: Number,
      default: 1
    },
    now: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    setWidth () {
      return (this.now / this.total) * 100 + '%'
    }
  }
}
</script>
<style lang="sass">
    @import "../globalStyles/variables"
    .counter
        width: 90%
        &__line
            width: 260px
            height: 6px
            background-color: #F1F2F2
            border-radius: 4px
            position: relative
            max-width: 90%

        &__count
            font-family: $bold
            font-size: 13px
            color: #C1C1C1
            margin-bottom: 7px
            display: block
        &__subLine
            height: 100%
            border-radius: 4px
            position: absolute
            left: 0
            top: 0
            background-color: #B1CD43
            transition: width 1s ease-in-out
        &__wrap
            display: flex
            justify-content: space-between
            align-items: center
        &__flag
            border-radius: 50%
            width: 32px
            height: 32px
            background: #F1F2F2 url("../assets/flag2.svg") no-repeat center center
            background-size: 45%
            margin-top: 20px
            min-width: 32px

</style>
