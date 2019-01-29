<template>
    <div class="wrapper">
        <div class="top">
            <header-lk></header-lk>
            <go-back></go-back>
        </div>
        <div class="content">
            <div v-if="this.nav">
                <lesson-nav
                        :class="{ 'nav_unvis': this.full }"
                        :rt="this.strId"
                        :info="getNav"
                ></lesson-nav>
            </div>

            <main class="main" :class="{ 'main_full': !this.nav }">
                <div class="main-content">
                    <div class="toggleNav"
                         @click="toggleNav"
                         :style="{'top': this.scrollNav + 30 + 'px'}"
                    ></div>
                    <singleTop
                            :chartParams="chartParams"
                            :maxFileSize="maxFileSize"
                            :information="information"
                            :buttons="buttons"
                            :mainButton="mainButton"
                            :backgroundImage="backgroundImage"
                            :title="title">
                    </singleTop>
                    <div class="main__conspekt">
                        <div class="main-information">
                            <h1 class="main__title">{{ information.title}}</h1>
                            <section class="main-information__section" v-html="text"></section>
                        </div>
                    </div>
                </div>
            </main>

        </div>

    </div>
</template>

<script>
import headerLK from '@/components/header.vue'
import goBack from '@/components/goBack.vue'
import singleTop from '@/components/singleTop.vue'
import lessonNav from '@/components/lessonNav.vue'

import axios from 'axios'

export default {
  name: 'vebinar',
  components: {
    'header-lk': headerLK,
    'go-back': goBack,
    singleTop,
    'lesson-nav': lessonNav

  },
  data () {
    return {
      buttons: [],
      chartParams: {},
      information: {},
      maxFileSize: 0,
      backgroundImage: '',
      full: false,
      scrollNav: 0,
      text: '',
      title: '',
      id: null,
      path: null,
      mainButton: null,
      linkPathes: {},
      nav: {},
      allData: {}
    }
  },
  mounted () {
    if (localStorage.ID) {
      this.update()
    }
    window.onscroll = () => (this.scrollNav = window.pageYOffset)
  },
  watch: {
    '$route' (to, from) {
      let path = to.params.path
      let iskVebinar = this.linkPathes.filter(lp => lp.CODE === path)
      let id = String(iskVebinar[0].ID)
      this.update(id)
      let puncts = document.querySelectorAll('.nav__punkt')
      puncts = [...puncts]
      let active = puncts.filter(punkt => punkt.dataset.path === path)
      puncts.map(p => p.classList.remove('active'))
      active[0].classList.add('active')
    }
  },
  methods: {
    toggleNav () {
      this.full = !this.full
    },
    buildPathes (arr) {
      let pathes = []
      if (arr) {
        arr.map(elem => pathes.push(elem.CODE))
        return pathes
      } else {
        return false
      }
    },
    update (webinarID = localStorage.vebinarId) {
      let idData = new FormData()
      idData.append('user_id', localStorage.ID)
      idData.append('webinar_id', webinarID)
      axios.post('http://lk-test.school-olymp.com/app/ajax/pageWebinar.php', idData)
        .then(response => {
          this.linkPathes = response.data.linkPathes
          this.text = response.data.text
          this.information = response.data.information
          this.backgroundImage = response.data.background
          this.title = response.data.title
          this.id = response.data.id
          this.path = response.data.path
          this.mainButton = response.data.mainButton
          this.nav = response.data.nav
          let path = location.pathname.split('/')[location.pathname.split('/').length - 1]
          if (response.data.linkPathes) {
            if (!this.buildPathes(response.data.linkPathes).includes(path)) {
              console.log(this.$route)
              this.$router.push('/error')
            }
          }
        })
        .catch(err => {
          throw new Error(err)
        })
    }

  },
  computed: {
    parsePercent () {
      return parseInt(this.chartParams.persent.toFixed(0))
    },
    watchScroll () {
      return window.pageYOffset + 30
    },
    strId (ee) {
      return localStorage.vebinarId
    },
    getNav () {
      return this.nav
    }
  }

}
</script>
<style lang="scss">
    .main_full{
        transition: none !important;
    }
</style>
<style lang="sass">
    @import "../globalStyles/variables"
    .main-information
        padding-top: 0
        padding-bottom: 70px
        border-top: none
    .main
        &__singleBanner
            width: 100%
            height: 268px
            background-color: #B3D1D6
            border-radius: 4px 4px 0 0
            margin-bottom: 36px
            background-size: cover
            background-repeat: no-repeat
            background-position: center center
        &__main
            width: 98%
            margin-left: auto
            margin-right: auto
            padding-left: 105px
            padding-right: 105px
            border-bottom: 1px solid #f5f5f5
            margin-bottom: 35px
            padding-bottom: 14px
        &__blocks
            display: flex
            justify-content: space-between
        &__left
            width: 70%
        &__information
            display: flex
            font-size: 13px
            color: #8E9399
            letter-spacing: 0
            line-height: 17px
            margin-bottom: 19px
        &__time
            padding-left: 25px
            position: relative
            line-height: 17px
            margin-right: 35px
            &:before
                content: ''
                display: block
                position: absolute
                left: 0
                top: 0
                background: transparent url("../assets/clock.svg") no-repeat center center
                background-size: contain
                width: 17px
                height: 17px
        &__name
            position: relative
            line-height: 17px
            &:before
                content: ''
                display: block
                position: absolute
                top: 50%
                transform: translateY(-56%)
                left: -12px
                width: 5px
                height: 5px
                border-radius: 50%
                background-color: #8e9399
        &__title
            font-family: $bold
            font-size: 22px
            color: #1D1D1D
            line-height: 30px
            margin-bottom: 41px
        &__buttons
            display: flex
        &__button
            display: flex
            justify-content: center
            align-items: center
            background-color: #F8F9F9
            border: 1px solid #E6EAEB
            border-radius: 3px
            font-family: $bold
            font-size: 13px
            color: #41454D
            margin-right: 18px
            min-width: 149px
            min-height: 36px
        &__right
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
        &__link
            display: block
            position: relative
            &:before
                content: ''
                display: block
                position: absolute
                left: 0
                top: 50%
                transform: translateY(-50%)
        &__task
            &:before
                background: transparent url("../assets/book.svg") no-repeat center center
                background-size: contain
                width: 10px
                height: 15px
        &__tab
            display: block
            font-family: $bold
            font-size: 11px
            color: rgba(70, 70, 70, 0.3)
            letter-spacing: 1.19px
            position: relative
            text-transform: uppercase
            margin-right: 27px
            overflow: hidden
            transition: .3s ease-in-out
            height: 23px
            cursor: pointer
            &:last-of-type
                margin-right: 0
            &:after
                content: ''
                display: block
                position: absolute
                width: 100%
                height: 2px
                background-color: transparent
                left: 0
                bottom: 0
                transition: .3s ease-in-out
                transform: translateX(-110%)
            &_active
                color: #B1CD43
                &:after
                    background: #B1CD43
                    transform: none
        &__tabs
            display: flex
            margin-bottom: -14px

</style>
<style lang="scss" scoped>
    .main__conspekt {
        width: 98%;
        margin-left: auto;
        margin-right: auto;
        padding-left: 105px;
        padding-right: 105px;
        font-family: Geometria,sans-serif;
        font-size: 16px;
        color: #1d1d1d;
        letter-spacing: 0;
        line-height: 26px;
    }
</style>
