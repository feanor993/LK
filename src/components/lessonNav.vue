<template>
  <nav class="nav" v-if="info.lessonInformation">
    <div class="nav__top">
      <h3 class="nav__descr">{{info.lessonInformation.type}}</h3>
      <h1 class="nav__topTitle">{{info.lessonInformation.name}}</h1>
      <counter-line
        :total="info.counter.total"
        :now="info.counter.now"></counter-line>
    </div>
    <div class="nav__items">
      <div v-if="this.info.lessonInformation.group">
        <lesson-nav-item
          v-for="(punkt, index) in buildArr(info.navigation)"
          @getD="getD"
          :index="index"
          :title="punkt.name"
          :date="punkt.date"
          :items="setProps(punkt.lessons)"
          :key=" punkt.idd "
        ></lesson-nav-item>
      </div>
      <div v-else>
        <nav-punkt
                v-for="item in setProps(info.navigation)"
                :item="item"
                @getMenu="getMenu"
                :key="item.idd"></nav-punkt>
      </div>
    </div>
  </nav>
</template>
<script>
import counter from '@/components/counter.vue'
import lessonNavItem from '@/components/lessonNavItem.vue'
import gmn from '@/mixins/getMonthName'
import navPunkt from '../components/navPunct'
export default {
  name: 'lessonNav',
  components: {
    'counter-line': counter,
    'lesson-nav-item': lessonNavItem,
    'nav-punkt': navPunkt
  },
  props: {
    rt: {
      type: String,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      counter: {},
      lessonInformation: {},
      datas: [],
      navigation: []
    }
  },
  methods: {
    buildArr (obj) {
      let arr = []
      for (let nav in obj) {
        arr.push(this.info.navigation[nav])
      }
      return arr
    },
    setProps (arr) {
      let arrWithProps = []
      arr.map(item => {
        let date = item.date

        let time = parseInt(item.time)

        let point = item.point
        let newDate = date.split(' ')
        let bigDate = newDate[0].split('.')

        let littleDate = newDate[1].split(':')
        let year = parseInt(bigDate[2])

        let month = parseInt(bigDate[1]) - 1

        let day = parseInt(bigDate[0])

        let hours = parseInt(littleDate[0])

        let minutes = parseInt(littleDate[1])
        let jsDate = new Date(year, month, day, hours, minutes, 0, 0)
        let dayName = gmn.getWeekDay(jsDate)
        let rusMonth = gmn.getMonthName(jsDate)
        let less = new Date(year, month, day, hours, minutes, 0, 0)
        less.setHours(less.getHours() + parseInt(time / 60))
        less.setMinutes(less.getMinutes() + (time % 60))
        let dateNow = new Date()

        let finish = jsDate - dateNow
        finish > 0 ? (finish = false) : (finish = true)
        dateNow - less > jsDate - less && dateNow - less < 0
          ? (less = true)
          : (less = false)
        item.name = this.trimTitle(item.name)
        item.now = less
        item.rusDate =
            jsDate.getDate() + ' ' + rusMonth + ', ' + dayName + ' ' + newDate[1]
        let clName = ''
        if (point > 90) {
          clName = 'green'
        } else if (point <= 90 && point > 50) {
          clName = 'yellow'
        } else if (point <= 50) {
          clName = 'red'
        }
        item.clName = clName
        if (item.id.toString() === localStorage.vebinarId.toString()) {
          item.active = ' active'
        } else {
          item.active = ' '
        }
        arrWithProps.push(item)
      })
      return arrWithProps
    },

    trimTitle (elem) {
      return elem.length > 30 ? elem.slice(0, 30) + '...' : elem
    },
    getD (resp) {
      let arr = []
      for (let nav in resp.nav.navigation) {
        arr.push(resp.nav.navigation[nav])
      }
      this.datas = arr
    },
    getMenu (resp) {
      this.counter = resp.counter
      this.lessonInformation = resp.lessonInformation
      this.navigation = resp.navigation
    }
  }
}
</script>
<style lang="sass">
  @import "../globalStyles/variables"
  .nav
    background: #FFFFFF
    border-right: 1px solid #F2F2F2
    border-radius: 3px
    overflow: scroll
    width: 395px
    height: calc(100vh - 128px)
    position: fixed
    left: 0
    top: 145px
    transition: .3s ease-in-out
    z-index: 10
    &_unvis
      transform: translateX(-100%)
    &__top
      padding: 34px
      border-bottom: 1px solid #F2F2F2
    &__descr
      font-family: $bold
      font-size: 10px
      color: #CBCBCB
      letter-spacing: 0.56px
      line-height: 24px
      text-transform: uppercase
    &__topTitle
      font-family: $bold
      font-size: 18px
      color: #0B0B0B
      letter-spacing: 0
      line-height: 24px
      margin-bottom: 25px
    &__heading
      background-color: #FFFFFF
      border: 1px solid #F6F6F6
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02)
      padding: 21px 100px 18px 33px
      display: flex
      position: relative
      cursor: pointer
      &-title
        font-family: $eb
        font-size: 14px
        color: #1D1D1D
        line-height: 18px
        margin-bottom: 8px
      &:before
        content: ''
        display: block
        position: absolute
        width: 15px
        height: 18px
        background: transparent url("../assets/arrowDown.svg") no-repeat center center
        background-size: contain
        right: 34px
        top: 21px
        transition: .3s ease-in-out
    &__icon
      display: flex
      align-items: center
      justify-content: center
      font-family: $eb
      font-size: 10px
      color: #2F2F2F
      width: 24px
      height: 24px
      border-radius: 50%
      background-color: #ebeced
    &__date
      font-size: 12px
      color: #B4B4B4
    &__left
      display: flex
      justify-content: center
      width: 25px
      margin-right: 21px
    &__title
      font-size: 13px
      color: #2F2F2F
      margin-bottom: 8px
    &__quantity
      border-radius: 50%
      width: 34px
      height: 34px
      min-width: 34px
      border: 1px solid #EFEFEF
      font-family: $bold
      font-size: 12px
      color: #8E9399
      display: flex
      justify-content: center
      align-items: center
      &_cull
        border: 1px solid #B1CD43
        color: #B1CD43

  .nav__itemIcon
    position: relative
    z-index: 3
    &:after
      z-index: 1

  .nav__itemIcon.done
    width: 27px
    height: 27px
    min-width: 27px
    background: #EEF6CE url("../assets/check.svg") no-repeat center center
    background-size: 50%

  .nav__itemIcon.close
    width: 27px
    height: 27px
    min-width: 27px
    background: #EBECED url("../assets/padlock.svg") no-repeat center center
    background-size: 39%

  .nav__quantity.yellow
    border: 1px solid #F3BC1F
    color: #F3BC1F

  .nav__quantity.red
    border: 1px solid #D0021B
    color: #D0021B

  .nav__quantity.green
    border: 1px solid #B1CD43
    color: #B1CD43
  .nav__punkt.active
    .nav__title
      font-family: $eb
      color: #B1CD43
</style>
