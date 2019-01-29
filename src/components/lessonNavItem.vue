<template>
    <div class="nav__item"
         :class="{nav__item_showed: this.showed }">
        <div class="nav__heading"
             @click="toggleShow">
            <div class="nav__left">
                <div class="nav__icon">{{index + 1}}</div>
            </div>
            <div class="nav__right">
                <h4 class="nav__heading-title">{{title}}</h4>
                <span class="nav__date">{{date}}</span>
            </div>
        </div>
        <div class="nav__item-content">
            <nav-punkt
                    v-for="item in getItems"
                    :item="item"
                    @getMenu="getMenu"
                    v-bind:key="item.id"></nav-punkt>
        </div>
    </div>
</template>
<script>
import navPunkt from '../components/navPunct'
export default {
  name: 'lessonNavItem',
  components: {
    'nav-punkt': navPunkt
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showed: true
    }
  },
  methods: {
    trimTitle (elem) {
      return elem.length > 30 ? elem.slice(0, 30) + '...' : elem
    },
    toggleShow () {
      this.showed = !this.showed
    },
    getMenu (resp) {
      this.$emit('getD', resp)
    }
  },
  computed: {
    getItems () {
      return this.items
    }
  }
}
</script>
<style lang="sass">
    @import "../globalStyles/variables"
    .nav
        &__left
            position: relative
        &__date
            font-size: 12px
            color: #B4B4B4
            display: block
        &__punkt
            display: flex
            padding: 17px 21px 17px 33px
            background-color: #fcfcfc
            align-items: center
            overflow: hidden
            cursor: pointer
            .nav__right
                display: flex
                justify-content: space-between
                width: calc(100% - 54px)
            &:last-of-type
                .nav__itemIcon:after
                    display: none
        &__title
            font-size: 13px
            color: #2F2F2F
            margin-bottom: 8px
        &__itemIcon
            width: 11px
            height: 11px
            border-radius: 50%
            background-color: #EBECED
            position: relative

        &__item.nav__item_done
            .nav__icon
                font-size: 0
                background: rgba(177, 205, 67, 0.25) url("../assets/check.svg") no-repeat center center
                background-size: 60%
        &__item.nav__item_showed
            .nav__heading:before
                transform: rotate(180deg)
            .nav__item-content
                opacity: 1
                max-height: 1000px
        &__item-content
            transition: .3s ease
            max-height: 0
            overflow: hidden
            opacity: 0
            position: relative
            &:before
                content: ''
                display: block
                position: absolute
                height: 100%
                width: 4px
                top: 0
                left: 44px
                z-index: 1
                background-color: #EBECF0

</style>
