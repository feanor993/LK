<template>
    <div>
        <div class="chart">
            <div class="persent">{{this.persent}}</div>
            <svg width="70" height="70" viewPort="0 0 0 0" version="1.1"
                 xmlns="http://www.w3.org/2000/svg">
                <circle class="outer" cx="33.25" cy="33.25" :r="this.radius"/>
                <circle  class="inner" cx="33.25" cy="33.25" :r="this.radius" stroke-dasharray="186.8" :stroke-dashoffset="this.setStroke" v-if="this.persent"/>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
  name: 'chart',
  props: {
    persent: {
      type: Number,
      default: 0
    },
    radius: {
      type: Number,
      default: 0
    }
  },
  computed: {
    setStroke () {
      return (
        Math.PI * (this.radius * 2) -
        (Math.PI * (this.radius * 2) * this.persent) / 100
      )
    }
  }
}
</script>
<style lang="sass">
    @import "../globalStyles/variables"
    .chart
        position: relative
        width: max-content
        height: max-content
        max-width: 70px
        max-height: 70px
        margin-top: -3px
        .persent
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-58%, -40%)
            font-family: $bold
            font-size: 24px
            color: #8E9399

        .outer
            stroke: #EFEFEF
            stroke-width: 2px
            transition: stroke-dashoffset 1s
            fill: transparent

        .inner
            fill: transparent
            stroke: #B1CD43
            stroke-width: 2
            transition: stroke-dashoffset 1s

        svg
            transform: scale(-1, -1) rotate(90deg)
            width: 70px
            height: 70px
            min-width: 70px
            min-height: 70px

</style>
