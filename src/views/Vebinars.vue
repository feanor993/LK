<template>
    <div class="wrapper" v-cloak>

        <div class="top">
            <header-lk></header-lk>
        </div>
        <div v-if="this.isLogin">
            <div class="content content_user">
                <user-nav></user-nav>
                <div class="main main_user">
                    <div class="vebinars-content">
                        <h1 class="vebinars-title">{{title}}</h1>
                        <div v-if="!this.items">
                            у вас нет актиных вебинаров
                        </div>
                        <div v-else>
                            <section class="vebinars-section vebinars-section_now" v-if="this.lessonNow.length">
                                <div class="vebinars-block vebinars-block_live"
                                     v-for="now in this.lessonNow"
                                     @click="getId(vebinar)"
                                     :key="now.id">
                                    <div class="vebinars-block__top"
                                         :style="{ backgroundImage: 'url(' + now.item.img + ')' }">
                                        <div class="vebinars-block__label">{{now.item.type}}</div>
                                    </div>
                                    <div class="vebinars-block__bottom">
                                        <div class="vebinars-block__lesson">{{now.item.subject}}</div>
                                        <div class="vebinars-block__title">{{now.item.name}}</div>
                                        <div class="vebinars-block__live"><span>Прямой эфир</span></div>
                                        <div class="vebinars-block__liveBtn">
                                            Зайти в {{now.item.type}}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="vebinars-section">
                                <div class="vebinars-block"
                                     :data-ref="vebinar.item.id"
                                     v-for="vebinar in this.lessonsNotNow" :key="vebinar.id"
                                     @click="getId(vebinar)"
                                     :class="{ 'vebinars-block_vebinar': !vebinar.isKurs }">
                                    <div class="vebinars-block__top"
                                         :style="{ backgroundImage: 'url(' + vebinar.item.img + ')' }">
                                        <div class="vebinars-block__label">{{vebinar.item.type}}</div>
                                        <!--<div class="vebinars-block__done" >75</div>-->
                                    </div>
                                    <div class="vebinars-block__bottom">
                                        <div class="vebinars-block__lesson">{{vebinar.item.subject}}</div>
                                        <div class="vebinars-block__title">{{vebinar.item.name}}</div>
                                        <div class="vebinars-block__info" v-if="!vebinar.finished">Следующее: <span
                                                class="vebinars-block__info_orange">{{vebinar.rusDate}}</span>
                                        </div>
                                        <div class="vebinars-block__info" v-else="">Закончился {{vebinar.rusDate}}</div>
                                        <counter v-if="vebinar.isKurs"
                                                 :total="vebinar.item.items.full"
                                                 :now="vebinar.item.items.done"
                                        ></counter>
                                        <div class="vebinars-block__statuses" v-else style="display: none;">
                                            <div class="vebinars-block__left">
                                                <div class="vebinars-block__status vebinars-block__status_book">
                                                    <img src="../assets/bookList.svg" alt="">
                                                </div>
                                                <div class="vebinars-block__status vebinars-block__status_skrepka">
                                                    <img src="../assets/skrepkaList.svg" alt="">
                                                </div>
                                            </div>
                                            <span class="vebinars-block__link">Запись</span>
                                        </div>
                                    </div>
                                </div>
                                <a href="https://school-olymp.ru/scripttest/webinar/" target="_blank"
                                   class="vebinars-block vebinars-block_add">
                                    <div class="vebinars-block_add__icon">+</div>
                                    <div class="vebinars-block_add__text">
                                        ДОБАВИТЬ НОВЫЙ
                                        ВЕБИНАР
                                    </div>
                                </a>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import headerLK from '@/components/header.vue'
import userNav from '@/components/userNav.vue'
import counter from '@/components/counter.vue'
import gmn from '@/mixins/getMonthName'

export default {
  name: 'vebinars',
  components: {
    'header-lk': headerLK,
    'user-nav': userNav,
    counter
  },
  data () {
    return {
      items: [],
      path: '',
      title: '',
      indexes: [],
      userInformation: {}
    }
  },
  mounted () {
    if (localStorage.ID && !localStorage.getItem('searchObj')) {
      let idData = new FormData()
      idData.append('user_id', localStorage.ID)
      console.log('передаю этот id на обработчик:' + localStorage.ID)
      axios.post('http://lk-test.school-olymp.com/app/ajax/listWebinars.php', idData).then(response => {
        console.log('обработчик мне возвращает:')
        console.log(response.data)
        let unique = [...new Set(response.data.items.map(item => item.id))]
        function buildUnique () {
          let test = []
          let len = []
          response.data.items.map((value, index, self) => {
            let pred = []
            test.map(item => {
              pred.push(item.id === value.id)
            })
            pred = pred.filter(a => a !== true)
            len.push(pred.length)

            len = len.filter((v, i, a) => a.indexOf(v) === i).splice(0, unique.length)
            if (self[index].id === value.id) {
              test.push(value)
            }
          })
          return len
        }

        let uniqueArr = []
        let uniqueIndexes = buildUnique()
        uniqueIndexes.map(index => uniqueArr.push(response.data.items[index]))

        this.indexes = unique
        this.items = uniqueArr
        this.path = response.data.path
        this.title = response.data.title
      })
        .catch(err => {
          throw new Error(err)
        })
    }
    if (localStorage.getItem('searchObj')) {
      let formDataAdd = new FormData()
      let searchObj = JSON.parse(localStorage.getItem('searchObj'))
      let webinarId = searchObj['webinar_id']
      let userId = searchObj['user_id']
      formDataAdd.append('webinar_id', webinarId)
      formDataAdd.append('user_id', userId)
      axios.post('http://lk-test.school-olymp.com/app/ajax/webinar_add.php', formDataAdd).then(response => {
        console.log('обработчик webinar_add возвращает')
        console.log(response.data)

        let data = new FormData()
        data.append('user_id', localStorage.getItem('ID'))
        axios
          .post('http://lk-test.school-olymp.com/app/ajax/profiles.php', data)
          .then(response => {
            let userInformation = {
              surname: response.data.surname,
              name: response.data.name,
              photo: response.data.photo
            }
            localStorage.setItem('userInformation', JSON.stringify(userInformation))
            location.reload()
          })
          .catch(err => {
            throw new Error(err)
          })
      })
    }
  },
  methods: {
    setParams (items) {
      let global = []
      items.map(item => {
        let date = item.date

        let time = parseInt(item.time)
        let newDate = date.split(' ')
        let bigDate = newDate[0].split('.')

        let littleDate = newDate[1].split(':')
        let year = parseInt(bigDate[2])

        let month = parseInt(bigDate[1]) - 1

        let day = parseInt(bigDate[0])

        let hours = parseInt(littleDate[0])

        let minutes = parseInt(littleDate[1])
        let jsDate = new Date(year, month, day, hours, minutes, 0, 0)
        let less = new Date(year, month, day, hours, minutes, 0, 0)
        less.setHours(less.getHours() + parseInt(time / 60))
        less.setMinutes(less.getMinutes() + (time % 60))
        let dateNow = new Date()

        let finish = jsDate - dateNow
        finish > 0 ? (finish = false) : (finish = true)
        dateNow - less > jsDate - less && dateNow - less < 0
          ? (less = true)
          : (less = false)
        let rusMonth = gmn.getMonthName(jsDate)
        let rusDate = jsDate.getDate() + ' ' + rusMonth + ' ' + newDate[1]
        let isKurs
        item.type === 'курс' ? (isKurs = true) : (isKurs = false)
        global.push({
          item: item,
          finished: finish,
          now: less,
          rusDate: rusDate,
          isKurs: isKurs
        })
      })
      return global
    },
    getNow (items) {
      return items.filter(item => item.now === true)
    },
    getNotNow (items) {
      return items.filter(item => item.now !== true)
    },
    getId (elem) {
      localStorage.setItem('vebinarId', elem.item.id)
      let rout = '/vebinar/' + elem.item.path
      this.$router.push(rout)
    }
  },
  computed: {
    itemsWithParams () {
      return this.setParams(this.items)
    },
    lessonNow () {
      return this.getNow(this.itemsWithParams)
    },
    lessonsNotNow () {
      return this.getNotNow(this.itemsWithParams)
    },
    isLogin () {
      return localStorage.ID
    }
  }

}
</script>
<style lang="scss">
    .vebinars-block_vebinar {
        transition: .4s ease;
        &:hover {
            box-shadow: 0 20px 25px 3px hsla(0, 0%, 84%, 0.23) !important;
        }

    }

    .vebinars-block__done {
        width: 80px;
        height: 79px;
        background-color: #b1cd43;
        position: absolute;
        border-radius: 50%;
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 13px;
        padding-top: 10px;
        right: -20px;
        top: -10px;
    }
</style>
<style lang="sass" scoped>
    @import "../globalStyles/variables"
    [v-cloak]
        display: none

    .vebinars-content
        width: 1016px
        max-width: 90%
        margin-left: auto
        margin-right: auto

    .vebinars-title
        font-family: $bold
        font-size: 35px
        color: #1D1D1D
        margin-bottom: 60px

    .vebinars-section
        padding-bottom: 75px
        padding-top: 55px
        border-bottom: 1px solid #EAEAEA
        display: flex
        flex-wrap: wrap
        &:first-of-type
            padding-top: 0
        &:last-of-type
            border-bottom: none
            padding-bottom: 0

    .vebinars-block
        background-color: #fff
        border-radius: 8px
        width: 305px
        min-width: 230px
        position: relative
        margin-right: 1.7%
        margin-left: 1.4%
        max-width: 33%
        margin-bottom: 44px
        box-shadow: 0 15px 21px 0 rgba(215, 215, 215, 0.07)
        display: block
        cursor: pointer
        overflow: hidden
        &:after
            content: ''
            display: block
            position: absolute
            left: 50%
            transform: translateX(-50%)
            width: 80%
            bottom: -4px
            height: 100%
            box-shadow: 0 9px 19px 0 rgba(52, 52, 52, 0.06)
            background-color: #f5f5f5
            border-radius: 8px

        &_add
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            background-color: #F5F5F5
            padding: 0 5%
            cursor: pointer
            transition: .4s ease
            min-height: 467px
            &:hover
                background-color: #e6e6e6
            &:after
                display: none
            &__icon
                font-family: $basic
                font-size: 59px
                color: #C6C6C6
                letter-spacing: 3.69px
                line-height: 23px
                margin-bottom: 26px
            &__text
                font-family: $bold
                font-size: 16px
                color: #A5A5A5
                letter-spacing: 1px
                line-height: 27px
                text-align: center
        &_live
            box-shadow: 0 15px 21px 0 rgba(255, 72, 72, 0.08)
            &:after
                content: ''
                display: block
                position: absolute
                width: 80%
                height: 100%
                z-index: 1
                background-color: #f6f6f6
                box-shadow: 0 15px 23px 0 rgba(255, 21, 21, 0.06)
                border-radius: 8px
                left: 50%
                transform: translateX(-50%)
                bottom: -4px
        &_vebinar
            .vebinars-block__label
            background-color: #8247ff
            .vebinars-block__top
                background-color: #D1E6C1
        &__top
            background: #A3CAE1
            border-radius: 8px 8px 0 0
            width: 100%
            height: 217px
            position: relative
            z-index: 2
        &__bottom
            padding: 18px 21px 33px 21px
            background-color: #fff
            border-radius: 0 0 8px 8px
            position: relative
            z-index: 2
            min-height: 250px

        &__lesson
            font-family: $eb
            font-size: 10px
            color: #A7A7A7
            letter-spacing: 1.26px
            margin-bottom: 13px
            text-transform: uppercase
        &__title
            font-family: $bold
            font-size: 16px
            color: #1D1D1D
            letter-spacing: 0
            line-height: 1.25
            margin-bottom: 15px
        &__live
            background: #FFFFFF
            border: 1px solid #E04242
            border-radius: 3px
            font-family: $basic
            font-size: 13px
            color: #E04242
            width: 138px
            height: 28px
            display: flex
            align-items: center
            justify-content: center
            text-align: center
            margin-bottom: 35px
            span
                display: block
                position: relative
                &:before
                    content: ''
                    position: absolute
                    background: #E04242
                    width: 8px
                    height: 8px
                    border-radius: 50%
                    left: -14px
                    top: calc(50% - 4px)
                    transition: .3s ease-in-out
                    animation: pulse 1s infinite
        &__liveBtn
            display: flex
            justify-content: center
            align-items: center
            background-color: #E04242
            border-radius: 3px
            height: 48px
            font-family: $bold
            font-size: 14px
            color: #fff
            transition: .3s ease-in-out
            &:hover
                background-color: rgba(224, 66, 66, 0.94)
        &__label
            background-color: #FFBB30
            border-radius: 100px
            position: absolute
            top: 20px
            left: 20px
            font-family: $eb
            font-size: 11px
            color: #FFFFFF
            letter-spacing: 1.4px
            text-transform: uppercase
            padding: 8px 12px
        &__info
            font-family: $bold
            font-size: 13px
            color: #A7A7A7
            letter-spacing: 0
            line-height: 17px
            margin-bottom: 48px
            &_orange
                color: #e3981b
                display: inline-block
                margin-left: 10px
        &__statuses
            display: flex
            justify-content: space-between
            position: absolute
            bottom: 25px
            left: 50%
            transform: translateX(-50%)
            width: 100%
            padding: 0 21px

        &__left
            display: flex
        &__status
            position: relative
            margin-right: 17px
            &:last-of-type
                margin-right: 0
        &__link
            background: #FFFFFF
            border: 1px solid #B1CD43
            border-radius: 3px
            width: 109px
            height: 32px
            display: flex
            align-items: center
            justify-content: center
            font-family: $bold
            font-size: 13px
            color: #B1CD43
            transition: .4s ease
            &:hover
                color: #ffffff
                background-color: #B1CD43

    @keyframes pulse
        from
            transform: scale(1)
        to
            transform: scale(1.1)

</style>
